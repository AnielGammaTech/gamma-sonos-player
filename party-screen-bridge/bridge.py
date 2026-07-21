"""Render Music Assistant Party mode and AirPlay it to an Apple TV.

The HTTP API is deliberately tiny so Home Assistant can expose it through
rest_command services without putting AirPlay credentials in Lovelace.
"""

from __future__ import annotations

import asyncio
import base64
import contextlib
import json
import logging
import os
import shutil
import signal
from ipaddress import IPv4Address
from pathlib import Path
from typing import Any

from aiohttp import ClientSession, WSMsgType, web
from pyatv import connect
from pyatv.conf import AirPlayService, AppleTV
from pyatv.const import Protocol
from pyatv.interface import BaseConfig
from pyatv.protocols.airplay.player import AirPlayPlayer


logging.basicConfig(
    level=os.getenv("LOG_LEVEL", "INFO"),
    format="%(asctime)s %(levelname)s %(message)s",
)
LOGGER = logging.getLogger("party-screen")

STATE_DIR = Path(os.getenv("STATE_DIR", "/state"))
HLS_DIR = STATE_DIR / "hls"
TOKEN_FILE = STATE_DIR / "ma_access_token"
CREDENTIALS_FILE = STATE_DIR / "airplay_credentials"

MA_PARTY_URL = os.getenv("MA_PARTY_URL", "http://192.168.1.54:8095/#/party")
PUBLIC_HLS_URL = os.getenv(
    "PUBLIC_HLS_URL", "http://192.168.1.54:8099/hls/party.m3u8"
)
APPLE_TV_ADDRESS = os.getenv("APPLE_TV_ADDRESS", "172.16.17.28")
APPLE_TV_NAME = os.getenv("APPLE_TV_NAME", "Lanai AppleTV")
APPLE_TV_IDENTIFIER = os.getenv("APPLE_TV_IDENTIFIER", "9C:3E:53:2E:DF:B0")
APPLE_TV_PORT = int(os.getenv("APPLE_TV_PORT", "7000"))
APPLE_TV_FEATURES = os.getenv(
    "APPLE_TV_FEATURES", "0x4A7FDFD5,0x3C175FDE"
)
APPLE_TV_FLAGS = os.getenv("APPLE_TV_FLAGS", "0x120644")
APPLE_TV_MODEL = os.getenv("APPLE_TV_MODEL", "AppleTV11,1")
APPLE_TV_PI = os.getenv(
    "APPLE_TV_PI", "85a33e55-dde1-409a-8594-048d1b1b4afc"
)
APPLE_TV_VV = os.getenv("APPLE_TV_VV", "1")

SCREEN_WIDTH = int(os.getenv("SCREEN_WIDTH", "1280"))
SCREEN_HEIGHT = int(os.getenv("SCREEN_HEIGHT", "720"))
SCREEN_FPS = int(os.getenv("SCREEN_FPS", "5"))
HTTP_PORT = int(os.getenv("HTTP_PORT", "8099"))


async def _keep_airplay_connection_open(_: AirPlayPlayer) -> None:
    """Avoid polling playback-info, which recent tvOS rejects for HLS mirroring."""

    await asyncio.Event().wait()


AirPlayPlayer._wait_for_media_to_end = _keep_airplay_connection_open


class PartyScreenBridge:
    def __init__(self) -> None:
        self.xvfb: asyncio.subprocess.Process | None = None
        self.chromium: asyncio.subprocess.Process | None = None
        self.ffmpeg: asyncio.subprocess.Process | None = None
        self.capture_task: asyncio.Task[None] | None = None
        self.airplay_task: asyncio.Task[None] | None = None
        self.apple_tv: Any | None = None
        self.last_error = ""
        self.render_ready = False

    async def start_renderer(self) -> None:
        STATE_DIR.mkdir(parents=True, exist_ok=True)
        HLS_DIR.mkdir(parents=True, exist_ok=True)
        for item in HLS_DIR.glob("*"):
            if item.is_file():
                item.unlink()

        display = os.getenv("DISPLAY", ":99")
        self.xvfb = await asyncio.create_subprocess_exec(
            "Xvfb",
            display,
            "-screen",
            "0",
            f"{SCREEN_WIDTH}x{SCREEN_HEIGHT}x24",
            "-nolisten",
            "tcp",
        )
        await asyncio.sleep(0.5)

        chromium_binary = shutil.which("chromium") or shutil.which("chromium-browser")
        if not chromium_binary:
            raise RuntimeError("Chromium is not installed")

        chromium_profile = STATE_DIR / "chromium"
        chromium_profile.mkdir(exist_ok=True)
        origin_url = MA_PARTY_URL.split("#", 1)[0]
        self.chromium = await asyncio.create_subprocess_exec(
            chromium_binary,
            "--no-sandbox",
            "--disable-dev-shm-usage",
            "--disable-gpu",
            "--disable-features=TranslateUI",
            "--disable-session-crashed-bubble",
            "--no-first-run",
            "--no-default-browser-check",
            "--autoplay-policy=no-user-gesture-required",
            "--remote-debugging-address=127.0.0.1",
            "--remote-debugging-port=9222",
            f"--user-data-dir={chromium_profile}",
            f"--window-size={SCREEN_WIDTH},{SCREEN_HEIGHT}",
            "--window-position=0,0",
            "--kiosk",
            origin_url,
            env={**os.environ, "DISPLAY": display},
        )

        await self._load_party_page()

        self.ffmpeg = await asyncio.create_subprocess_exec(
            "ffmpeg",
            "-hide_banner",
            "-loglevel",
            "warning",
            "-f",
            "image2pipe",
            "-framerate",
            str(SCREEN_FPS),
            "-vcodec",
            "mjpeg",
            "-i",
            "pipe:0",
            "-f",
            "lavfi",
            "-i",
            "anullsrc=channel_layout=stereo:sample_rate=44100",
            "-c:v",
            "libx264",
            "-preset",
            "ultrafast",
            "-tune",
            "zerolatency",
            "-profile:v",
            "baseline",
            "-pix_fmt",
            "yuv420p",
            "-vf",
            f"scale={SCREEN_WIDTH}:{SCREEN_HEIGHT}",
            "-g",
            str(SCREEN_FPS * 2),
            "-keyint_min",
            str(SCREEN_FPS * 2),
            "-sc_threshold",
            "0",
            "-c:a",
            "aac",
            "-b:a",
            "96k",
            "-f",
            "hls",
            "-hls_time",
            "2",
            "-hls_list_size",
            "5",
            "-hls_flags",
            "delete_segments+append_list+independent_segments",
            str(HLS_DIR / "party.m3u8"),
            stdin=asyncio.subprocess.PIPE,
        )
        self.capture_task = asyncio.create_task(
            self._capture_frames(), name="party-screen-capture"
        )

        for _ in range(30):
            if (HLS_DIR / "party.m3u8").exists():
                self.render_ready = True
                LOGGER.info("Party renderer ready at %s", PUBLIC_HLS_URL)
                return
            await asyncio.sleep(0.5)
        raise RuntimeError("FFmpeg did not create the Party HLS stream")

    async def _load_party_page(self) -> None:
        websocket_url = ""
        async with ClientSession() as session:
            for _ in range(40):
                try:
                    async with session.get("http://127.0.0.1:9222/json/list") as response:
                        tabs = await response.json()
                    if tabs:
                        websocket_url = tabs[0]["webSocketDebuggerUrl"]
                        break
                except Exception:
                    pass
                await asyncio.sleep(0.25)

            if not websocket_url:
                raise RuntimeError("Chromium debugging interface did not start")

            async with session.ws_connect(websocket_url) as socket:
                request_id = 1

                async def command(
                    method: str, params: dict[str, Any] | None = None
                ) -> dict[str, Any]:
                    nonlocal request_id
                    await socket.send_json(
                        {"id": request_id, "method": method, "params": params or {}}
                    )
                    expected_id = request_id
                    request_id += 1
                    while True:
                        message = await socket.receive(timeout=10)
                        if message.type != WSMsgType.TEXT:
                            raise RuntimeError(f"Chromium CDP closed during {method}")
                        payload = json.loads(message.data)
                        if payload.get("id") == expected_id:
                            if payload.get("error"):
                                raise RuntimeError(str(payload["error"]))
                            result = payload.get("result", {})
                            if result.get("exceptionDetails"):
                                raise RuntimeError(
                                    f"Chromium {method} failed: {result['exceptionDetails']}"
                                )
                            return result

                await command("Page.enable")
                await asyncio.sleep(4)

                if TOKEN_FILE.exists():
                    token = TOKEN_FILE.read_text(encoding="utf-8").strip()
                    if token:
                        expression = (
                            "localStorage.setItem('ma_access_token', "
                            + json.dumps(token)
                            + ")"
                        )
                        await command(
                            "Runtime.evaluate",
                            {"expression": expression, "returnByValue": True},
                        )
                else:
                    LOGGER.warning(
                        "%s is missing; Party view may show the sign-in screen", TOKEN_FILE
                    )

                await command(
                    "Runtime.evaluate",
                    {
                        "expression": "window.location.hash = '/party'",
                        "returnByValue": True,
                    },
                )
                await command("Page.reload", {"ignoreCache": True})
                await asyncio.sleep(8)

    async def _capture_frames(self) -> None:
        """Feed Chromium screenshots to FFmpeg without relying on X11 compositing."""

        if not self.ffmpeg or not self.ffmpeg.stdin:
            raise RuntimeError("FFmpeg capture pipe is unavailable")

        async with ClientSession() as session:
            async with session.get("http://127.0.0.1:9222/json/list") as response:
                tabs = await response.json()
            if not tabs:
                raise RuntimeError("Chromium has no page to capture")

            async with session.ws_connect(tabs[0]["webSocketDebuggerUrl"]) as socket:
                request_id = 1000
                while True:
                    await socket.send_json(
                        {
                            "id": request_id,
                            "method": "Page.captureScreenshot",
                            "params": {
                                "format": "jpeg",
                                "quality": 82,
                                "fromSurface": True,
                            },
                        }
                    )
                    while True:
                        message = await socket.receive(timeout=10)
                        if message.type != WSMsgType.TEXT:
                            raise RuntimeError("Chromium capture socket closed")
                        payload = json.loads(message.data)
                        if payload.get("id") != request_id:
                            continue
                        if payload.get("error"):
                            raise RuntimeError(str(payload["error"]))
                        frame = base64.b64decode(payload["result"]["data"])
                        self.ffmpeg.stdin.write(frame)
                        await self.ffmpeg.stdin.drain()
                        break
                    request_id += 1
                    await asyncio.sleep(1 / SCREEN_FPS)

    def _apple_tv_config(self) -> BaseConfig:
        if not CREDENTIALS_FILE.exists():
            raise RuntimeError(f"Missing paired AirPlay credentials: {CREDENTIALS_FILE}")
        credentials = CREDENTIALS_FILE.read_text(encoding="utf-8").strip()
        if not credentials:
            raise RuntimeError("Paired AirPlay credentials file is empty")

        properties = {
            "features": APPLE_TV_FEATURES,
            "flags": APPLE_TV_FLAGS,
            "model": APPLE_TV_MODEL,
            "pi": APPLE_TV_PI,
            "vv": APPLE_TV_VV,
            "deviceid": APPLE_TV_IDENTIFIER,
        }
        config = AppleTV(IPv4Address(APPLE_TV_ADDRESS), APPLE_TV_NAME)
        config.add_service(
            AirPlayService(
                APPLE_TV_IDENTIFIER,
                APPLE_TV_PORT,
                credentials=credentials,
                properties=properties,
            )
        )
        return config

    async def start_airplay(self) -> None:
        if self.airplay_task and not self.airplay_task.done():
            return
        if not self.render_ready:
            raise RuntimeError("Party renderer is not ready")

        self.last_error = ""
        config = self._apple_tv_config()
        self.apple_tv = await connect(config, asyncio.get_running_loop(), protocol=Protocol.AirPlay)

        async def play() -> None:
            try:
                LOGGER.info("Starting Party screen on %s", APPLE_TV_NAME)
                await self.apple_tv.stream.play_url(PUBLIC_HLS_URL)
            except asyncio.CancelledError:
                raise
            except Exception as error:
                self.last_error = str(error)
                LOGGER.exception("AirPlay failed")
            finally:
                if self.apple_tv:
                    self.apple_tv.close()
                self.apple_tv = None

        self.airplay_task = asyncio.create_task(play(), name="party-airplay")
        await asyncio.sleep(1)
        if self.airplay_task.done():
            await self.airplay_task

    async def stop_airplay(self) -> None:
        if self.apple_tv:
            with contextlib.suppress(Exception):
                await self.apple_tv.remote_control.stop()
        if self.airplay_task:
            self.airplay_task.cancel()
            with contextlib.suppress(asyncio.CancelledError):
                await self.airplay_task
        self.airplay_task = None
        if self.apple_tv:
            self.apple_tv.close()
        self.apple_tv = None
        LOGGER.info("Party screen stopped")

    async def close(self) -> None:
        await self.stop_airplay()
        if self.capture_task:
            self.capture_task.cancel()
            with contextlib.suppress(asyncio.CancelledError):
                await self.capture_task
        self.capture_task = None
        for process in (self.ffmpeg, self.chromium, self.xvfb):
            if process and process.returncode is None:
                process.terminate()
        for process in (self.ffmpeg, self.chromium, self.xvfb):
            if process and process.returncode is None:
                with contextlib.suppress(asyncio.TimeoutError):
                    await asyncio.wait_for(process.wait(), timeout=5)

    def status(self) -> dict[str, Any]:
        airplaying = bool(self.airplay_task and not self.airplay_task.done())
        return {
            "ok": self.render_ready and not self.last_error,
            "renderer_ready": self.render_ready,
            "airplaying": airplaying,
            "target": APPLE_TV_NAME,
            "error": self.last_error or None,
        }


async def create_app() -> web.Application:
    bridge = PartyScreenBridge()
    await bridge.start_renderer()

    async def health(_: web.Request) -> web.Response:
        return web.json_response(bridge.status())

    async def start(_: web.Request) -> web.Response:
        try:
            await bridge.start_airplay()
            return web.json_response(bridge.status())
        except Exception as error:
            bridge.last_error = str(error)
            LOGGER.exception("Unable to start Party screen")
            return web.json_response(bridge.status(), status=500)

    async def stop(_: web.Request) -> web.Response:
        await bridge.stop_airplay()
        return web.json_response(bridge.status())

    async def cleanup(_: web.Application) -> None:
        await bridge.close()

    app = web.Application()
    app.router.add_get("/health", health)
    app.router.add_post("/start", start)
    app.router.add_post("/stop", stop)
    app.router.add_static("/hls", HLS_DIR, show_index=False)
    app.on_cleanup.append(cleanup)
    return app


async def main() -> None:
    app = await create_app()
    runner = web.AppRunner(app)
    await runner.setup()
    site = web.TCPSite(runner, "0.0.0.0", HTTP_PORT)
    await site.start()
    LOGGER.info("Party screen bridge listening on %s", HTTP_PORT)

    stopping = asyncio.Event()
    loop = asyncio.get_running_loop()
    for signal_name in (signal.SIGINT, signal.SIGTERM):
        with contextlib.suppress(NotImplementedError):
            loop.add_signal_handler(signal_name, stopping.set)
    await stopping.wait()
    await runner.cleanup()


if __name__ == "__main__":
    asyncio.run(main())
