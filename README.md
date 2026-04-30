# Gamma Sonos Player

A focused Home Assistant Lovelace card for Sonos rooms, Spotify/Sonos URI playback, grouping, and Music Assistant search/playback.

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
provider_mode: music_assistant
enqueue_mode: replace
```

## What Works In This First Build

- Select Sonos or Music Assistant players.
- Play, pause, previous, next, mute, and volume.
- Group and ungroup speakers with `media_player.join` and `media_player.unjoin`.
- Paste a Spotify/Sonos URI or link and play it through `media_player.play_media`.
- Search Music Assistant through `music_assistant.search` when HA exposes service responses to the card.
- Play Music Assistant search results with `music_assistant.play_media`.

## Options

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `entity` | `string` | First configured player | Initial selected player. |
| `entities` | `string[]` | Auto-discovered Sonos/MA players | Sonos/media players shown in room and grouping controls. |
| `music_assistant_entities` | `string[]` | `[]` | Optional MA-specific players. |
| `name` | `string` | Selected player name | Card title. |
| `provider_mode` | `string` | `music_assistant` | `music_assistant` or `sonos`. |
| `enqueue_mode` | `string` | `replace` | Passed to MA or media player playback. |
| `search_limit` | `number` | `8` | Music Assistant search result limit. |
| `show_grouping` | `boolean` | `true` | Show group chips. |
| `show_search` | `boolean` | `true` | Show search/play field. |
| `show_source_toggle` | `boolean` | `true` | Show provider toggle. |
| `width` | `string` | `420px` | Card width. |
| `height` | `string` | `620px` | Minimum card height. |
| `background` | `string` | `#101722` | Base background. |
| `accent_color` | `string` | `#39d98a` | Glow/accent color. |

## Notes

Sonos Spotify playback depends on your Spotify account already being available to Sonos. Music Assistant search/playback depends on the official Music Assistant integration and its HA actions.
