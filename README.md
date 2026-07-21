# Gamma Sonos Player

A focused Home Assistant Lovelace card for Music Assistant search/playback plus Sonos-style speaker grouping and per-room volume.

## Install

Add this repository as a HACS dashboard repository, then add this resource:

```text
/hacsfiles/gamma-sonos-player/gamma-sonos-player.js
```

Resource type:

```text
JavaScript module
```

## Basic YAML

```yaml
type: custom:gamma-sonos-player-card
name: Lanai Music
entity: media_player.lanai
entities:
  - media_player.lanai
  - media_player.kitchen
  - media_player.bedroom
music_assistant_entities:
  - media_player.lanai_music_assistant
music_assistant_config_entry_id: 01KQ7Z56D6PXQ6XT234VS65HGS
enqueue_mode: next
library_only: false
show_party: true
party_start_service: rest_command.party_screen_start
party_stop_service: rest_command.party_screen_stop
party_dashboard_url: https://music.example.com/#/party
party_screen_name: Living Room Apple TV
```

To find `music_assistant_config_entry_id`, open Home Assistant Developer Tools > Actions, choose `music_assistant.search`, select your Music Assistant instance from the dropdown, switch the action editor to YAML, and copy the generated `config_entry_id`. If you only have one Music Assistant instance, search may work without it, but setting it is more reliable.

## What Works In This First Build

- Select speaker-like media players.
- Play, pause, previous, next, mute, and volume.
- See the next three songs beside Now Playing on wide cards or stacked below it on narrow cards.
- Open a full numbered Up Next queue with the current track pinned above upcoming songs.
- Group and ungroup speakers with `media_player.join` and `media_player.unjoin`.
- Browse Music Assistant for songs, albums, artists, and playlists.
- Play a result immediately or use Next to add it to the queue with `music_assistant.play_media`.
- Use the Speakers tab for grouping, ungrouping, and a collapsible per-speaker volume mixer.
- Use the Party tab to show Music Assistant's Party queue and guest QR on a configured TV without changing music playback.

## Options

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `entity` | `string` | First configured player | Initial selected player. |
| `entities` | `string[]` | Auto-discovered Sonos/MA players | Sonos/media players shown in room and grouping controls. |
| `music_assistant_entities` | `string[]` | `[]` | Optional MA-specific players. |
| `music_assistant_config_entry_id` | `string` | Optional | Music Assistant integration instance ID used by `music_assistant.search`. Recommended when available. |
| `name` | `string` | Selected player name | Card title. |
| `enqueue_mode` | `string` | `next` | Passed to Music Assistant playback. |
| `search_limit` | `number` | `5` | Music Assistant search result limit. Lower values return faster. |
| `library_only` | `boolean` | `false` | Search only Music Assistant library items when true. |
| `show_grouping` | `boolean` | `true` | Show group chips. |
| `show_search` | `boolean` | `true` | Show search/play field. |
| `show_party` | `boolean` | `true` | Show the Party TV panel. |
| `party_start_service` | `string` | `rest_command.party_screen_start` | Home Assistant action that starts the external Party screen bridge. |
| `party_stop_service` | `string` | `rest_command.party_screen_stop` | Home Assistant action that stops the external Party screen bridge. |
| `party_dashboard_url` | `string` | `https://music.anieflix.com/#/party` | URL opened by the Party panel's dashboard button. |
| `party_screen_name` | `string` | `Lanai AppleTV` | Friendly TV name shown in the Party panel. |
| `width` | `string` | `100%` | Card width when `fill_container` is false. |
| `fill_container` | `boolean` | `true` | Stretch to the full dashboard card/container width. |
| `compact` | `boolean` | `false` | Use a denser layout for narrow dashboard columns. |
| `height` | `string` | `auto` | Minimum card height. Use a CSS length to force a taller card. |
| `background` | `string` | `#101722` | Base background. |
| `accent_color` | `string` | `#39d98a` | Glow/accent color. |

## Notes

Spotify should be configured as a Music Assistant music provider. This card uses Music Assistant for search/playback and Home Assistant media player services for transport, volume, and grouping.

Not every speaker can be grouped. Native Sonos grouping only works with Sonos speakers, and mixed-room grouping depends on Music Assistant exposing compatible player entities for those rooms.

## Party screen bridge

The optional `party-screen-bridge` container renders the Music Assistant Party dashboard, publishes it as HLS, and sends that screen to a paired Apple TV with AirPlay. It never issues a Music Assistant play command.

Its API is intended to stay on the local network:

- `GET /health`
- `POST /start`
- `POST /stop`

Configure Home Assistant to call it:

```yaml
rest_command:
  party_screen_start:
    url: http://YOUR_DOCKER_HOST:8099/start
    method: POST
  party_screen_stop:
    url: http://YOUR_DOCKER_HOST:8099/stop
    method: POST
```

The bridge expects `/state/airplay_credentials` and optionally `/state/ma_access_token` as root-only files. Do not put either value in Lovelace YAML or commit them to this repository. See `party-screen-bridge/docker-compose.example.yml` for the container settings.
