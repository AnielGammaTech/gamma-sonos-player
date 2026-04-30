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
music_assistant_config_entry_id: 01JEXNDHT21V0BHJXM7A5SZANV
enqueue_mode: next
library_only: false
```

To find `music_assistant_config_entry_id`, open Home Assistant Developer Tools > Actions, choose `music_assistant.search`, select your Music Assistant instance from the dropdown, switch the action editor to YAML, and copy the generated `config_entry_id`.

## What Works In This First Build

- Select speaker-like media players.
- Play, pause, previous, next, mute, and volume.
- Group and ungroup speakers with `media_player.join` and `media_player.unjoin`.
- Search Music Assistant for songs, albums, artists, and playlists.
- Tap a result to add it next with `music_assistant.play_media`.
- Use the Speakers tab for room chips, grouping, ungrouping, and always-visible per-speaker volume.

## Options

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `entity` | `string` | First configured player | Initial selected player. |
| `entities` | `string[]` | Auto-discovered Sonos/MA players | Sonos/media players shown in room and grouping controls. |
| `music_assistant_entities` | `string[]` | `[]` | Optional MA-specific players. |
| `music_assistant_config_entry_id` | `string` | Required for search | Music Assistant integration instance ID used by `music_assistant.search`. |
| `name` | `string` | Selected player name | Card title. |
| `enqueue_mode` | `string` | `next` | Passed to Music Assistant playback. |
| `search_limit` | `number` | `8` | Music Assistant search result limit. |
| `library_only` | `boolean` | `false` | Search only Music Assistant library items when true. |
| `show_grouping` | `boolean` | `true` | Show group chips. |
| `show_search` | `boolean` | `true` | Show search/play field. |
| `width` | `string` | `100%` | Card width when `fill_container` is false. |
| `fill_container` | `boolean` | `true` | Stretch to the full dashboard card/container width. |
| `height` | `string` | `auto` | Minimum card height. Use a CSS length to force a taller card. |
| `background` | `string` | `#101722` | Base background. |
| `accent_color` | `string` | `#39d98a` | Glow/accent color. |

## Notes

Spotify should be configured as a Music Assistant music provider. This card uses Music Assistant for search/playback and Home Assistant media player services for transport, volume, and grouping.
