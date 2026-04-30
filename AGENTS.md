# Gamma Sonos Player Agent Guide

This repo is a Home Assistant Lovelace custom card focused on Music Assistant search/playback plus speaker grouping and volume control. Read this before changing the card.

## Product Direction

- Keep this repo separate from `gamma-ha-cards`; music search, queue, speaker grouping, and provider behavior are a larger product surface.
- The primary screen is now-playing first: selected player, artwork, metadata, transport controls, and volume.
- Music search should use Music Assistant only. Spotify is assumed to be connected as a Music Assistant provider, not as a separate UI tab.
- Speakers are controlled through Home Assistant media player services. The Speakers panel should make grouping explicit: select speakers, then apply grouping.
- Per-speaker volume should remain visible in the Speakers panel, even when speakers are not grouped.
- Avoid making the card a clone of existing Sonos cards. Use other projects only as behavioral references.

## Current Architecture

- Entry point: `src/index.ts`
- Main card: `src/cards/gamma-sonos-player-card.ts`
- Demo harness: `demo/index.html`
- HACS root bundle: `gamma-sonos-player.js`
- Build output: `dist/gamma-sonos-player.js`

The card is a LitElement custom element registered as:

```text
gamma-sonos-player-card
```

Home Assistant YAML type:

```yaml
type: custom:gamma-sonos-player-card
```

## Home Assistant And Music Assistant Contract

### Required For Search

`music_assistant.search` requires a `config_entry_id`. The card option is:

```yaml
music_assistant_config_entry_id: 01JEXNDHT21V0BHJXM7A5SZANV
```

Users can find it in Home Assistant:

1. Developer Tools > Actions.
2. Select `music_assistant.search`.
3. Pick the Music Assistant instance from the dropdown.
4. Switch to YAML mode.
5. Copy `config_entry_id`.

If search fails, check that this option exists before changing service code.

### Music Assistant Search

Search uses websocket service response calls:

```ts
hass.callWS({
  type: 'call_service',
  domain: 'music_assistant',
  service: 'search',
  service_data: {
    config_entry_id,
    name,
    media_type: ['track', 'album', 'artist', 'playlist'],
    library_only: config.library_only ?? false,
    limit,
  },
  return_response: true,
});
```

The card extracts `tracks`, `albums`, `artists`, and `playlists` from the response. Keep extraction defensive because response shapes can vary between Music Assistant versions.

### Music Assistant Playback

Playback uses:

```ts
music_assistant.play_media
```

with:

```ts
{
  entity_id: activeEntityId,
  media_id: item.uri || item.name,
  media_type: item.media_type || item.type,
  enqueue: config.enqueue_mode ?? 'next'
}
```

Default enqueue mode is `next`, matching the user’s preference to add selected results after the current track.

### Speaker Control

Transport, volume, mute, grouping, and ungrouping use standard HA media player services:

- `media_player.media_play`
- `media_player.media_pause`
- `media_player.media_previous_track`
- `media_player.media_next_track`
- `media_player.volume_set`
- `media_player.volume_mute`
- `media_player.join`
- `media_player.unjoin`

Grouping is intentionally two-step:

1. User selects speaker tiles.
2. User taps `Group N Speakers`.

Do not return to immediate group-on-chip-click behavior.

## Player Discovery

When `entities` and `music_assistant_entities` are configured, the card uses those entities in order.

When no entities are configured, auto-discovery includes media players that look like speakers:

- `device_class: speaker`
- icon containing `speaker`
- `source` containing `Music Assistant`
- `mass_player_type: player`
- platform containing `sonos` or `music_assistant`
- entity ID containing `sonos` or `music_assistant`

Be careful not to include every TV by default unless it presents as a speaker/Music Assistant player.

## Artwork

Artwork should reflect the currently selected/playing media. The card checks, in order:

1. `entity_picture`
2. `entity_picture_local`
3. `media_image_url`

Do not remove `entity_picture_local`; Music Assistant often uses it.

## Scaling And Dashboard Layout

The card must resize cleanly in Home Assistant dashboard grids.

Defaults:

```yaml
fill_container: true
width: 100%
height: auto
```

`getGridOptions()` is implemented to guide HA’s section/grid dashboards. Avoid reintroducing fixed `max-width: 420px` or fixed `min-height: 620px` as defaults. Users can still force a height via YAML.

Use responsive CSS such as `clamp()`, `minmax()`, and `auto-fit` for controls. The card should work in narrow tablet columns without horizontal overflow.

## Visual Style

- Dark glass card with green accent by default.
- Artwork is centered and should not dominate narrow columns.
- Search and Speakers are tabs below transport and volume.
- Speaker grouping uses selectable tiles with checkmarks and explicit action buttons.
- Avoid decorative text explaining the card. UI labels should be functional.

## Build And Deployment

Run before committing:

```bash
npx tsc --noEmit
npm run build
```

Commit source, docs, demo, root bundle, and dist bundle together:

- `src/cards/gamma-sonos-player-card.ts`
- `README.md`
- `AGENTS.md`
- `demo/index.html`
- `dist/gamma-sonos-player.js`
- `dist/gamma-sonos-player.js.map`
- `gamma-sonos-player.js`
- `gamma-sonos-player.js.map`

HACS serves:

```text
gamma-sonos-player.js
```

Resource path:

```text
/hacsfiles/gamma-sonos-player/gamma-sonos-player.js
```

When testing in Home Assistant, use a cache bump after changes:

```text
/hacsfiles/gamma-sonos-player/gamma-sonos-player.js?v=<number>
```
