FROM ghcr.io/postlund/pyatv:0.17.0

RUN apk add --no-cache \
    chromium \
    ffmpeg \
    font-noto \
    font-noto-emoji \
    ttf-dejavu \
    xvfb

WORKDIR /app
COPY bridge.py /app/bridge.py

ENV PYTHONUNBUFFERED=1 \
    DISPLAY=:99

EXPOSE 8099
CMD ["python", "/app/bridge.py"]
