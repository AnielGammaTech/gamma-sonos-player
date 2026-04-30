# Gamma Sonos Player Agent Guide

This repo is a Home Assistant Lovelace card for Sonos and Music Assistant control.

- Keep this repo separate from `gamma-ha-cards`; music search/grouping is a larger product surface.
- Prefer standard HA media player services when possible.
- Use Music Assistant actions for search, richer queue playback, and library/provider playback.
- Do not copy code from other Sonos cards. Use them as behavioral references only.
- HACS serves the root `gamma-sonos-player.js`; run `npm run build` after source changes.
- Keep dashboard UI compact and useful on wall/tablet dashboards.
