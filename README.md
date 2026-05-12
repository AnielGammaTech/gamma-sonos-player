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
```

To find `music_assistant_config_entry_id`, open Home Assistant Developer Tools > Actions, choose `music_assistant.search`, select your Music Assistant instance from the dropdown, switch the action editor to YAML, and copy the generated `config_entry_id`. If you only have one Music Assistant instance, search may work without it, but setting it is more reliable.

## What Works In This First Build

- Select speaker-like media players.
- Play, pause, previous, next, mute, and volume.
- Group and ungroup speakers with `media_player.join` and `media_player.unjoin`.
- Search Music Assistant for songs, albums, artists, and playlists.
- Tap a result to add it next with `music_assistant.play_media`.
- Use the Speakers tab for grouping, ungrouping, and a collapsible per-speaker volume mixer.

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
| `width` | `string` | `100%` | Card width when `fill_container` is false. |
| `fill_container` | `boolean` | `true` | Stretch to the full dashboard card/container width. |
| `compact` | `boolean` | `false` | Use a denser layout for narrow dashboard columns. |
| `height` | `string` | `auto` | Minimum card height. Use a CSS length to force a taller card. |
| `background` | `string` | `#101722` | Base background. |
| `accent_color` | `string` | `#39d98a` | Glow/accent color. |
| `live_activity_enabled` | `boolean` | `true` | Start/update an iOS Home Assistant Live Activity. Turn this off in the dashboard editor to disable it. |
| `live_activity_notify_service` | `string` | Optional | Your iPhone notify service, e.g. `notify.mobile_app_aniels_iphone`. |
| `live_activity_tag` | `string` | `gamma-sonos-player` | Stable Live Activity ID used for updates/end. Use letters, numbers, `_`, `-`. |
| `live_activity_auto_update` | `boolean` | `false` | Push Live Activity updates while the dashboard card is open. |

## iOS Live Activities

The card can start/update the generic Home Assistant iOS Live Activity for the selected media player. This shows the current room, track/artist, volume, playing state, icon, and progress on the Lock Screen / Dynamic Island.

Important limitation: the current Home Assistant iOS Live Activity is display-only and its payload has no album-art field. It does not expose custom Play/Pause/Next buttons or artwork inside the Live Activity unless the Home Assistant iOS app/widget is extended.

```yaml
type: custom:gamma-sonos-player-card
entity: media_player.lanai
entities:
  - media_player.lanai
  - media_player.kitchen
live_activity_enabled: true
# Set false in the dashboard editor/YAML to disable.
live_activity_notify_service: notify.mobile_app_aniels_iphone
live_activity_tag: gamma-sonos-player
live_activity_auto_update: true
```

`live_activity_auto_update` only runs while this dashboard card is open in a browser/app. For reliable background updates, create Home Assistant automations that call the same notify service when your media player changes:

```yaml
action: notify.mobile_app_aniels_iphone
data:
  message: "{{ state_attr('media_player.lanai', 'media_title') }} — {{ state_attr('media_player.lanai', 'media_artist') }} • Vol {{ (state_attr('media_player.lanai', 'volume_level') * 100) | round(0) }}%"
  data:
    command: live_activity
    live_update: true
    tag: gamma-sonos-player
    title: Lanai Music
    message: "{{ state_attr('media_player.lanai', 'media_title') }} — {{ state_attr('media_player.lanai', 'media_artist') }} • Vol {{ (state_attr('media_player.lanai', 'volume_level') * 100) | round(0) }}%"
    critical_text: "{{ 'PLAY' if is_state('media_player.lanai', 'playing') else 'PAUSE' }}"
    notification_icon: mdi:music-circle
    notification_icon_color: "#39d98a"
```

To end it:

```yaml
action: notify.mobile_app_aniels_iphone
data:
  message: end_live_activity
  data:
    command: end_live_activity
    tag: gamma-sonos-player
```

## Notes

Spotify should be configured as a Music Assistant music provider. This card uses Music Assistant for search/playback and Home Assistant media player services for transport, volume, and grouping.

Not every speaker can be grouped. Native Sonos grouping only works with Sonos speakers, and mixed-room grouping depends on Music Assistant exposing compatible player entities for those rooms.
