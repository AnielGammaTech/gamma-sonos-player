import { LitElement, css, html, nothing } from 'lit';
import type { CSSResultGroup, TemplateResult } from 'lit';

type EnqueueMode = 'replace' | 'replace_next' | 'play' | 'next' | 'add';
type MediaType = 'track' | 'album' | 'artist' | 'playlist' | 'radio' | 'podcast';
type PanelTab = 'now' | 'search' | 'queue' | 'speakers';
type BrowserView = 'results' | 'artist' | 'album' | 'playlist';
type ResultAction = 'artist' | 'album' | 'playlist' | 'play';
type ResultContext = 'search' | 'artist' | 'album' | 'playlist' | 'favorites';

type HassEntity = {
  entity_id: string;
  state: string;
  attributes: {
    friendly_name?: string;
    entity_picture?: string;
    entity_picture_local?: string;
    media_image_url?: string;
    media_title?: string;
    media_artist?: string;
    media_album_name?: string;
    media_content_type?: string;
    media_duration?: number;
    media_position?: number;
    media_position_updated_at?: string;
    volume_level?: number;
    is_volume_muted?: boolean;
    group_members?: string[];
    source?: string;
    source_list?: string[];
    platform?: string;
    app_name?: string;
    supported_features?: number;
    [key: string]: unknown;
  };
};

type HomeAssistant = {
  states: Record<string, HassEntity | undefined>;
  callService: (
    domain: string,
    service: string,
    serviceData?: Record<string, unknown>,
    target?: Record<string, unknown>,
  ) => Promise<unknown> | void;
  callWS?: <T = unknown>(message: Record<string, unknown>) => Promise<T>;
};

type ConfigElement = HTMLInputElement & {
  checked?: boolean;
  configValue?: keyof GammaSonosPlayerConfig;
};

interface GammaSonosPlayerConfig {
  type?: string;
  entities?: string[];
  music_assistant_entities?: string[];
  music_assistant_config_entry_id?: string;
  entity?: string;
  name?: string;
  width?: string;
  height?: string;
  fill_container?: boolean;
  compact?: boolean;
  enqueue_mode?: EnqueueMode;
  search_limit?: number;
  library_only?: boolean;
  search_media_types?: MediaType[];
  show_grouping?: boolean;
  show_search?: boolean;
  show_queue_hint?: boolean;
  background?: string;
  accent_color?: string;
}

type SearchItem = {
  name?: string;
  uri?: string;
  media_type?: MediaType;
  type?: MediaType;
  artists?: Array<{ name?: string }>;
  artist?: string;
  album?: { name?: string; image?: string };
  image?: string;
  thumb?: string;
  queue_item_id?: string;
};

type BrowseMediaNode = {
  title?: string;
  name?: string;
  media_class?: string;
  media_content_id?: string;
  media_content_type?: string;
  thumbnail?: string;
  image?: string;
  can_play?: boolean;
  can_expand?: boolean;
  children?: BrowseMediaNode[];
};

type QueueServiceAttempt = {
  domain: string;
  service: string;
  data: Record<string, unknown>;
};

type PlaybackMemory = {
  title?: string;
  artist?: string;
  artwork?: string;
  state?: string;
  updatedAt: number;
};

const DEFAULT_CONFIG: Required<
  Pick<
    GammaSonosPlayerConfig,
    | 'width'
    | 'height'
    | 'fill_container'
    | 'compact'
    | 'enqueue_mode'
    | 'search_limit'
    | 'library_only'
    | 'show_grouping'
    | 'show_search'
    | 'show_queue_hint'
    | 'background'
    | 'accent_color'
  >
> = {
  width: '100%',
  height: 'auto',
  fill_container: true,
  compact: false,
  enqueue_mode: 'play',
  search_limit: 5,
  library_only: false,
  show_grouping: true,
  show_search: true,
  show_queue_hint: true,
  background: '#101722',
  accent_color: '#39d98a',
};

const MEDIA_PLAYER_GROUPING_FEATURE = 524288;
const LAST_PLAYER_STORAGE_KEY = 'gamma-sonos-player:last-player';
const PLAYBACK_MEMORY_STORAGE_KEY = 'gamma-sonos-player:playback-memory';
const FAVORITES_STORAGE_KEY = 'gamma-sonos-player:favorites';

function toNumber(value: unknown, fallback: number): number {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function isUnavailable(entity?: HassEntity): boolean {
  return !entity || entity.state === 'unavailable' || entity.state === 'unknown';
}

function supportsGrouping(entity?: HassEntity): boolean {
  const supportedFeatures = toNumber(entity?.attributes.supported_features, 0);

  return (
    Boolean(supportedFeatures & MEDIA_PLAYER_GROUPING_FEATURE) ||
    Array.isArray(entity?.attributes.group_members)
  );
}

function isMusicAssistantPlayer(entity?: HassEntity): boolean {
  const appId = String(entity?.attributes.app_id ?? '').toLowerCase();
  const platform = String(entity?.attributes.platform ?? '').toLowerCase();
  const source = String(entity?.attributes.source ?? '').toLowerCase();
  const sourceList = Array.isArray(entity?.attributes.source_list)
    ? entity.attributes.source_list.join(' ').toLowerCase()
    : '';

  return (
    entity?.attributes.mass_player_type === 'player' ||
    Boolean(entity?.attributes.active_queue) ||
    appId.includes('music_assistant') ||
    platform.includes('music_assistant') ||
    source.includes('music assistant') ||
    sourceList.includes('music assistant')
  );
}

function titleCase(value: string): string {
  return value
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function fireConfigChanged(
  element: HTMLElement,
  config: Partial<GammaSonosPlayerConfig>,
): void {
  element.dispatchEvent(
    new CustomEvent('config-changed', {
      detail: { config },
      bubbles: true,
      composed: true,
    }),
  );
}

export class GammaSonosPlayerCard extends LitElement {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
    selectedEntityId: { state: true },
    activeTab: { state: true },
    query: { state: true },
    searching: { state: true },
    searchError: { state: true },
    playbackError: { state: true },
    searchResults: { state: true },
    selectedGroupIds: { state: true },
    pendingGroupIds: { state: true },
    playbackPending: { state: true },
    groupPending: { state: true },
    browserView: { state: true },
    selectedArtist: { state: true },
    selectedAlbum: { state: true },
    selectedPlaylist: { state: true },
    albumTracks: { state: true },
    albumLoading: { state: true },
    albumError: { state: true },
    playlistTracks: { state: true },
    playlistLoading: { state: true },
    playlistError: { state: true },
    showVolumeMixer: { state: true },
    showCurrentGroup: { state: true },
    groupError: { state: true },
    queueItems: { state: true },
    queueLoading: { state: true },
    queueError: { state: true },
    playbackMemory: { state: true },
    transportPending: { state: true },
    favoriteItems: { state: true },
  };

  public hass?: HomeAssistant;
  private config!: GammaSonosPlayerConfig;
  private selectedEntityId = '';
  private activeTab: PanelTab = 'now';
  private query = '';
  private searchTimer?: number;
  private searching = false;
  private searchError = '';
  private playbackError = '';
  private searchResults: SearchItem[] = [];
  private selectedGroupIds: string[] = [];
  private pendingGroupIds: string[] = [];
  private playbackPending = false;
  private groupPending = false;
  private browserView: BrowserView = 'results';
  private selectedArtist?: SearchItem;
  private selectedAlbum?: SearchItem;
  private selectedPlaylist?: SearchItem;
  private albumTracks: SearchItem[] = [];
  private albumLoading = false;
  private albumError = '';
  private playlistTracks: SearchItem[] = [];
  private playlistLoading = false;
  private playlistError = '';
  private showVolumeMixer = false;
  private showCurrentGroup = false;
  private groupError = '';
  private queueItems: SearchItem[] = [];
  private queueLoading = false;
  private queueError = '';
  private playbackMemory: Record<string, PlaybackMemory> = {};
  private transportPending = false;
  private favoriteItems: SearchItem[] = [];
  private searchRequestId = 0;
  private albumRequestId = 0;
  private playlistRequestId = 0;
  private queueRefreshTimer?: number;
  private queueRefreshRetryTimer?: number;
  private initialQueueRefreshTimer?: number;
  private lastInitialQueueEntityId = '';
  private lastQueueSignature = '';

  static get styles(): CSSResultGroup {
    return css`
      :host {
        --gamma-sonos-width: 420px;
        --gamma-sonos-height: 620px;
        --gamma-sonos-background: #101722;
        --gamma-sonos-accent: #39d98a;

        display: block;
        box-sizing: border-box;
        width: var(--gamma-sonos-width);
        min-width: 0;
      }

      ha-card {
        background: transparent;
        border: 0;
        box-shadow: none;
      }

      .player {
        background:
          radial-gradient(circle at 50% 0%, color-mix(in srgb, var(--gamma-sonos-accent) 16%, transparent), transparent 38%),
          radial-gradient(circle at 16% 18%, rgb(255 255 255 / 7%), transparent 32%),
          linear-gradient(
            145deg,
            color-mix(in srgb, var(--gamma-sonos-background) 92%, #ffffff 8%),
            color-mix(in srgb, var(--gamma-sonos-background) 92%, #000000 14%)
          );
        border: 1px solid color-mix(in srgb, var(--gamma-sonos-accent) 20%, transparent);
        border-radius: 22px;
        box-shadow:
          inset 0 1px 0 rgb(255 255 255 / 9%),
          0 18px 36px rgb(0 0 0 / 28%),
          0 0 54px color-mix(in srgb, var(--gamma-sonos-accent) 9%, transparent);
        box-sizing: border-box;
        color: var(--primary-text-color, #f4f7fb);
        container-type: inline-size;
        display: grid;
        gap: clamp(7px, 1.5vw, 10px);
        min-height: var(--gamma-sonos-height);
        overflow: hidden;
        padding: clamp(12px, 2.6vw, 16px);
        position: relative;
        transition:
          border-color 180ms ease,
          box-shadow 180ms ease,
          background 180ms ease;
        width: 100%;
        max-width: 100%;
        min-width: 0;
      }

      .player.compact {
        gap: 10px;
      }

      .player.compact .artwork {
        max-width: min(190px, 62%);
        width: min(190px, 62%);
      }

      .player.compact .rooms {
        padding-bottom: 5px;
      }

      .player.compact .track {
        font-size: clamp(16px, 4.2vw, 20px);
      }

      .mini-player {
        align-items: center;
        background: rgb(255 255 255 / 6%);
        border: 1px solid rgb(255 255 255 / 9%);
        border-radius: 14px;
        display: grid;
        gap: 10px;
        grid-template-columns: 48px minmax(0, 1fr) auto;
        min-height: 64px;
        padding: 7px;
        transition:
          background 160ms ease,
          border-color 160ms ease,
          opacity 160ms ease;
      }

      .player.now-active .mini-player {
        display: none;
      }

      .mini-art {
        aspect-ratio: 1;
        background:
          radial-gradient(circle, rgb(255 255 255 / 9%), transparent 70%),
          rgb(255 255 255 / 5%);
        background-image: var(--gamma-sonos-cover);
        background-position: center;
        background-size: cover;
        border: 1px solid rgb(255 255 255 / 10%);
        border-radius: 12px;
      }

      .mini-meta {
        display: grid;
        gap: 2px;
        min-width: 0;
      }

      .mini-controls {
        align-items: center;
        display: inline-flex;
        gap: 8px;
      }

      .now-view {
        display: grid;
        gap: 10px;
        justify-items: center;
        min-height: 0;
      }

      .now-artwork {
        aspect-ratio: 1;
        background-color: rgb(255 255 255 / 5%);
        border: 1px solid rgb(255 255 255 / 10%);
        border-radius: 18px;
        box-shadow:
          inset 0 1px 0 rgb(255 255 255 / 12%),
          0 18px 34px rgb(0 0 0 / 24%);
        isolation: isolate;
        filter: none;
        max-width: min(340px, 76%);
        opacity: 1;
        position: relative;
        width: min(340px, 76%);
        transition:
          box-shadow 180ms ease,
          border-color 180ms ease,
          opacity 180ms ease;
      }

      .now-artwork img {
        border-radius: inherit;
        display: block;
        height: 100%;
        object-fit: cover;
        opacity: 1;
        position: relative;
        width: 100%;
        z-index: 1;
      }

      .player.playing .now-artwork {
        border-color: rgb(255 255 255 / 14%);
        filter: none;
        opacity: 1;
        box-shadow:
          0 22px 46px rgb(0 0 0 / 30%);
      }

      .now-artwork.has-art::before {
        background-image: var(--gamma-sonos-cover);
        background-position: center;
        background-size: cover;
        border-radius: inherit;
        content: '';
        filter: blur(28px) saturate(1.35);
        inset: -28px;
        opacity: 0.54;
        pointer-events: none;
        position: absolute;
        transform: scale(1.02);
        z-index: -1;
      }

      .artwork-empty {
        align-items: center;
        color: var(--secondary-text-color, #b7c0ce);
        display: flex;
        font-size: 12px;
        font-weight: 750;
        height: 100%;
        justify-content: center;
      }

      .now-view .metadata {
        width: 100%;
      }

      .progress {
        background: rgb(255 255 255 / 13%);
        border: 1px solid rgb(255 255 255 / 10%);
        border-radius: 999px;
        height: 6px;
        overflow: hidden;
        width: min(340px, 76%);
      }

      .progress-fill {
        background: color-mix(in srgb, var(--primary-text-color, #f4f7fb) 58%, var(--gamma-sonos-accent) 42%);
        border-radius: inherit;
        box-shadow: 0 0 14px rgb(255 255 255 / 16%);
        height: 100%;
        min-width: 0;
        transition: width 180ms ease;
      }

      @keyframes gamma-sonos-spin {
        to {
          transform: rotate(360deg);
        }
      }

      .play-button.loading ha-icon {
        animation: gamma-sonos-spin 900ms linear infinite;
      }

      .play-button.loading,
      .play-button.loading:disabled {
        opacity: 1;
      }

      .player::before {
        background:
          radial-gradient(circle at 22% 0%, color-mix(in srgb, var(--gamma-sonos-accent) 18%, transparent), transparent 38%),
          linear-gradient(180deg, rgb(255 255 255 / 4%), transparent 42%);
        content: '';
        inset: 0;
        opacity: 0.42;
        position: absolute;
      }

      .player > * {
        position: relative;
        z-index: 1;
      }

      .topbar,
      .rooms,
      .now-row,
      .now-speakers,
      .tabs,
      .controls,
      .volume-row,
      .group-row,
      .search-row,
      .result,
      .speaker-row {
        align-items: center;
        display: flex;
        min-width: 0;
      }

      .topbar {
        align-items: start;
        display: grid;
        gap: 8px 12px;
        grid-template-columns: minmax(120px, 0.8fr) minmax(0, 1.2fr);
        justify-content: initial;
      }

      .title {
        display: grid;
        gap: 2px;
        min-width: 0;
      }

      .state-line {
        align-items: center;
        display: flex;
        gap: 8px;
        min-width: 0;
      }

      .name {
        font-size: 18px;
        font-weight: 750;
        line-height: 1.1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-break: normal;
      }

      .state {
        color: var(--secondary-text-color, #b7c0ce);
        font-size: 13px;
        line-height: 1.2;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .rooms,
      .tabs {
        background: rgb(255 255 255 / 6%);
        border: 1px solid rgb(255 255 255 / 9%);
        border-radius: 999px;
        padding: 3px;
      }

      .rooms {
        align-items: stretch;
        background: transparent;
        border: 0;
        border-radius: 0;
        display: grid;
        gap: 4px;
        grid-template-columns: 1fr;
        padding: 0;
      }

      .room,
      .tabs button,
      .icon-button,
      .play-button,
      .group-chip,
      .result button {
        appearance: none;
        border: 0;
        color: inherit;
        cursor: pointer;
        font: inherit;
      }

      .room,
      .tabs button {
        background: transparent;
        border-radius: 999px;
        color: var(--secondary-text-color, #b7c0ce);
        font-size: 12px;
        font-weight: 700;
        min-height: 28px;
        padding: 0 10px;
        white-space: nowrap;
      }

      .now-row {
        gap: 8px;
        justify-content: space-between;
        min-width: 0;
      }

      .now-speakers {
        flex-wrap: wrap;
        gap: 6px;
        min-width: 0;
      }

      .now-label {
        color: var(--secondary-text-color, #b7c0ce);
        font-size: 10px;
        font-weight: 650;
        letter-spacing: 0;
        margin-bottom: -2px;
        text-transform: none;
      }

      .now-chip {
        background: color-mix(in srgb, var(--gamma-sonos-accent) 16%, transparent);
        border: 1px solid color-mix(in srgb, var(--gamma-sonos-accent) 24%, transparent);
        border-radius: 999px;
        color: var(--primary-text-color, #f4f7fb);
        font-size: 12px;
        font-weight: 750;
        min-height: 22px;
        padding: 0 8px;
      }

      .player-picker {
        align-items: center;
        background: rgb(255 255 255 / 6%);
        border: 1px solid rgb(255 255 255 / 9%);
        border-radius: 999px;
        display: inline-flex;
        gap: 6px;
        justify-self: end;
        min-width: 0;
        padding: 4px 8px;
      }

      .header-picker {
        border-color: rgb(255 255 255 / 11%);
        justify-self: start;
        max-width: 100%;
        min-height: 32px;
        padding: 5px 9px;
      }

      .player-picker select {
        appearance: none;
        background: transparent;
        border: 0;
        color: var(--primary-text-color, #f4f7fb);
        font: inherit;
        font-size: 12px;
        font-weight: 750;
        max-width: 150px;
        min-width: 0;
        outline: 0;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .header-picker select {
        font-size: 17px;
        font-weight: 800;
        max-width: 170px;
      }

      .room.active,
      .tabs button.active,
      .group-chip.active {
        background: color-mix(in srgb, var(--gamma-sonos-accent) 20%, transparent);
        color: var(--primary-text-color, #f4f7fb);
        box-shadow: 0 0 18px color-mix(in srgb, var(--gamma-sonos-accent) 16%, transparent);
      }

      .artwork {
        aspect-ratio: 1;
        background:
          radial-gradient(circle, rgb(255 255 255 / 9%), transparent 70%),
          rgb(255 255 255 / 5%);
        background-image: var(--gamma-sonos-cover);
        background-position: center;
        background-size: cover;
        border: 1px solid rgb(255 255 255 / 10%);
        border-radius: 18px;
        box-shadow:
          inset 0 1px 0 rgb(255 255 255 / 12%),
          0 14px 28px rgb(0 0 0 / 24%);
        justify-self: center;
        max-width: min(250px, 72%);
        width: min(250px, 72%);
      }

      .metadata {
        display: grid;
        gap: 4px;
        text-align: center;
      }

      .track {
        font-size: clamp(20px, 4.8vw, 28px);
        font-weight: 800;
        line-height: 1.12;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .artist {
        color: var(--secondary-text-color, #b7c0ce);
        font-size: clamp(13px, 3.3vw, 16px);
        line-height: 1.2;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .controls {
        gap: 12px;
        justify-content: center;
      }

      .icon-button,
      .play-button {
        align-items: center;
        background:
          radial-gradient(circle at 36% 28%, rgb(255 255 255 / 12%), transparent 28%),
          linear-gradient(145deg, rgb(255 255 255 / 8%), rgb(0 0 0 / 12%));
        border: 1px solid rgb(255 255 255 / 11%);
        border-radius: 999px;
        box-shadow:
          inset 0 1px 0 rgb(255 255 255 / 14%),
          inset 0 -10px 18px rgb(0 0 0 / 10%),
          0 10px 20px rgb(0 0 0 / 16%);
        display: inline-flex;
        justify-content: center;
        transition:
          box-shadow 140ms ease,
          transform 140ms ease,
          background 140ms ease;
      }

      .icon-button {
        height: clamp(36px, 8.5vw, 42px);
        width: clamp(36px, 8.5vw, 42px);
      }

      .play-button {
        background:
          radial-gradient(circle at 38% 30%, rgb(255 255 255 / 18%), transparent 28%),
          radial-gradient(circle, color-mix(in srgb, var(--gamma-sonos-accent) 34%, transparent), transparent 72%),
          linear-gradient(145deg, color-mix(in srgb, var(--gamma-sonos-accent) 18%, #ffffff 5%), rgb(0 0 0 / 13%));
        border-color: color-mix(in srgb, var(--gamma-sonos-accent) 42%, transparent);
        box-shadow:
          inset 0 1px 0 rgb(255 255 255 / 16%),
          inset 0 -12px 20px rgb(0 0 0 / 12%),
          0 0 28px color-mix(in srgb, var(--gamma-sonos-accent) 24%, transparent),
          0 12px 24px rgb(0 0 0 / 20%);
        height: clamp(48px, 11vw, 56px);
        width: clamp(48px, 11vw, 56px);
      }

      .icon-button:active,
      .play-button:active {
        transform: scale(0.96);
      }

      ha-icon {
        --mdc-icon-size: 22px;
        color: color-mix(in srgb, var(--primary-text-color, #f4f7fb) 90%, var(--gamma-sonos-accent) 10%);
        filter: drop-shadow(0 0 8px rgb(255 255 255 / 10%));
      }

      .play-button ha-icon {
        --mdc-icon-size: 28px;
        color: #ffffff;
        filter: drop-shadow(0 0 10px color-mix(in srgb, var(--gamma-sonos-accent) 34%, transparent));
      }

      .volume-row {
        gap: 9px;
        min-width: 0;
      }

      input[type='range'] {
        accent-color: var(--gamma-sonos-accent);
        flex: 1;
        min-width: 0;
      }

      .tabs {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
      }

      .grouping,
      .search,
      .speakers,
      .queue {
        display: grid;
        gap: 8px;
      }

      .section-title {
        color: var(--secondary-text-color, #b7c0ce);
        font-size: 11px;
        font-weight: 800;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .group-row {
        display: grid;
        gap: 6px;
        grid-template-columns: repeat(auto-fit, minmax(132px, 1fr));
      }

      .group-chip {
        background: rgb(255 255 255 / 5%);
        border: 1px solid rgb(255 255 255 / 8%);
        border-radius: 12px;
        color: var(--secondary-text-color, #b7c0ce);
        display: inline-grid;
        font-size: 12px;
        font-weight: 700;
        gap: 2px 7px;
        grid-template-columns: auto minmax(0, 1fr);
        min-height: 42px;
        padding: 7px 8px;
        text-align: left;
      }

      .group-check {
        align-items: center;
        background: rgb(255 255 255 / 5%);
        border: 1px solid rgb(255 255 255 / 12%);
        border-radius: 999px;
        display: inline-flex;
        font-size: 12px;
        font-weight: 850;
        height: 22px;
        justify-content: center;
        width: 22px;
      }

      .group-chip.active {
        background: color-mix(in srgb, var(--gamma-sonos-accent) 10%, rgb(255 255 255 / 5%));
        border-color: color-mix(in srgb, var(--gamma-sonos-accent) 34%, transparent);
        color: var(--primary-text-color, #f4f7fb);
        box-shadow: none;
      }

      .group-chip.active .group-check {
        background: var(--gamma-sonos-accent);
        color: #06100b;
      }

      .group-chip.anchor {
        background: rgb(255 255 255 / 5%);
        border-color: color-mix(in srgb, var(--gamma-sonos-accent) 22%, rgb(255 255 255 / 8%));
        color: var(--primary-text-color, #f4f7fb);
        opacity: 0.78;
      }

      .group-chip.anchor .group-check {
        background: transparent;
        border-color: color-mix(in srgb, var(--gamma-sonos-accent) 34%, rgb(255 255 255 / 10%));
        color: var(--gamma-sonos-accent);
      }

      .group-chip.action {
        align-items: center;
        background: rgb(255 255 255 / 5%);
        border-color: rgb(255 255 255 / 9%);
        border-radius: 12px;
        box-shadow: none;
        color: var(--primary-text-color, #f4f7fb);
        gap: 2px 7px;
        min-height: 44px;
        padding: 7px 8px;
      }

      .group-chip.action.continue {
        border-color: rgb(138 176 255 / 30%);
      }

      .group-chip.action.group {
        border-color: color-mix(in srgb, var(--gamma-sonos-accent) 36%, transparent);
      }

      .group-chip.action.ungroup {
        border-color: rgb(255 179 107 / 30%);
      }

      .group-chip.action.clear {
        border-color: rgb(255 139 139 / 30%);
      }

      .group-chip.action.continue .group-check {
        background: linear-gradient(145deg, #b8ccff, #769dff);
        color: #07111f;
      }

      .group-chip.action.group .group-check {
        background: linear-gradient(145deg, color-mix(in srgb, var(--gamma-sonos-accent) 72%, #ffffff), var(--gamma-sonos-accent));
        color: #06100b;
      }

      .group-chip.action.ungroup .group-check,
      .group-chip.action.clear .group-check {
        background: linear-gradient(145deg, rgb(255 255 255 / 20%), rgb(0 0 0 / 12%));
        color: #ffffff;
      }

      .group-chip.action .group-check {
        box-shadow: none;
        font-size: 14px;
        font-weight: 900;
        height: 26px;
        width: 26px;
      }

      .group-chip.action .group-name {
        font-size: 12px;
        font-weight: 850;
      }

      .group-chip.action .group-status {
        color: var(--secondary-text-color, #b7c0ce);
      }

      .group-name,
      .group-status {
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .group-status {
        color: var(--secondary-text-color, #b7c0ce);
        font-size: 9.5px;
        font-weight: 750;
        grid-column: 2;
        text-transform: uppercase;
      }

      .group-actions {
        display: grid;
        gap: 6px;
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .group-actions .continue,
      .group-actions .group {
        grid-column: span 1;
      }

      .group-actions .ungroup,
      .group-actions .clear {
        min-height: 44px;
      }

      .speaker-list {
        display: grid;
        gap: 8px;
      }

      .section-toggle {
        align-items: center;
        appearance: none;
        background: rgb(255 255 255 / 6%);
        border: 1px solid rgb(255 255 255 / 10%);
        border-radius: 14px;
        color: var(--primary-text-color, #f4f7fb);
        cursor: pointer;
        display: flex;
        font: inherit;
        font-size: 13px;
        font-weight: 800;
        justify-content: space-between;
        letter-spacing: 0.04em;
        min-height: 42px;
        padding: 0 12px;
        text-transform: uppercase;
      }

      .speaker-row {
        background: rgb(255 255 255 / 5%);
        border: 1px solid rgb(255 255 255 / 8%);
        border-radius: 14px;
        gap: 10px;
        padding: 8px;
      }

      .speaker-name {
        flex: 0 0 min(112px, 36%);
        font-size: 12px;
        font-weight: 750;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .search-row {
        background: rgb(255 255 255 / 6%);
        border: 1px solid rgb(255 255 255 / 10%);
        border-radius: 14px;
        gap: 8px;
        padding: 8px;
        min-width: 0;
      }

      input[type='search'] {
        background: transparent;
        border: 0;
        color: var(--primary-text-color, #f4f7fb);
        flex: 1;
        font: inherit;
        min-width: 0;
        outline: 0;
      }

      .results {
        display: grid;
        gap: 12px;
        max-height: 420px;
        overflow: auto;
      }

      .favorites {
        display: grid;
        gap: 7px;
      }

      .result-section {
        display: grid;
        gap: 7px;
      }

      .section-header {
        color: var(--secondary-text-color, #b7c0ce);
        font-size: 11px;
        font-weight: 800;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .result {
        background: rgb(255 255 255 / 5%);
        border: 1px solid rgb(255 255 255 / 8%);
        border-radius: 12px;
        gap: 10px;
        min-width: 0;
        padding: 8px;
      }

      .result.clickable {
        cursor: pointer;
      }

      .result.clickable:active {
        transform: scale(0.992);
      }

      .result-art {
        background:
          radial-gradient(circle, rgb(255 255 255 / 9%), transparent 68%),
          rgb(255 255 255 / 6%);
        background-position: center;
        background-size: cover;
        border: 1px solid rgb(255 255 255 / 8%);
        border-radius: 8px;
        flex: 0 0 auto;
        height: 42px;
        width: 42px;
      }

      .result-main {
        display: grid;
        flex: 1;
        gap: 2px;
        min-width: 0;
      }

      .result-name,
      .result-sub {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .result-name {
        font-size: 13px;
        font-weight: 750;
      }

      .result-sub {
        color: var(--secondary-text-color, #b7c0ce);
        font-size: 11px;
      }

      .result-actions button {
        background: color-mix(in srgb, var(--gamma-sonos-accent) 16%, transparent);
        border-radius: 999px;
        font-size: 12px;
        font-weight: 750;
        min-height: 30px;
        padding: 0 10px;
      }

      .result-actions {
        display: inline-flex;
        flex: 0 0 auto;
        gap: 6px;
      }

      .result-actions .now {
        background: color-mix(in srgb, var(--gamma-sonos-accent) 28%, transparent);
        color: var(--primary-text-color, #f4f7fb);
      }

      .result-actions .favorite-toggle,
      .favorite-toggle {
        align-items: center;
        background: rgb(255 255 255 / 6%);
        border: 1px solid rgb(255 255 255 / 9%);
        border-radius: 999px;
        display: inline-flex;
        height: 30px;
        justify-content: center;
        min-height: 30px;
        padding: 0;
        width: 30px;
      }

      .favorite-toggle ha-icon {
        --mdc-icon-size: 16px;
      }

      .favorite-toggle.active {
        background: color-mix(in srgb, var(--gamma-sonos-accent) 24%, transparent);
        border-color: color-mix(in srgb, var(--gamma-sonos-accent) 30%, transparent);
      }

      .artist-header {
        align-items: center;
        background: rgb(255 255 255 / 5%);
        border: 1px solid rgb(255 255 255 / 8%);
        border-radius: 16px;
        display: flex;
        gap: 12px;
        padding: 10px;
      }

      .artist-header .result-art {
        height: 64px;
        width: 64px;
      }

      .current-group {
        display: grid;
        gap: 8px;
      }

      .current-member {
        align-items: center;
        background: rgb(255 255 255 / 5%);
        border: 1px solid rgb(255 255 255 / 8%);
        border-radius: 12px;
        display: flex;
        gap: 8px;
        justify-content: space-between;
        padding: 8px 10px;
      }

      .queue-header {
        align-items: center;
        display: flex;
        gap: 10px;
        justify-content: space-between;
        min-width: 0;
      }

      .queue-list {
        display: grid;
        gap: 8px;
        max-height: 420px;
        overflow: auto;
      }

      .top-controls {
        align-items: start;
        display: grid;
        gap: 4px;
        justify-items: end;
        min-width: 0;
      }

      .header-state {
        color: var(--secondary-text-color, #b7c0ce);
        font-size: 12px;
        font-weight: 650;
        line-height: 1.1;
        max-width: 100%;
        overflow: hidden;
        text-align: right;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      @container (max-width: 340px) {
        .topbar {
          gap: 6px;
        }

        .name {
          font-size: 16px;
        }

        .state {
          font-size: 12px;
        }

        .top-controls {
          gap: 6px;
        }

        .player-picker {
          gap: 4px;
          padding: 4px 6px;
        }

        .player-picker select {
          max-width: 88px;
        }
      }

      .next-up {
        color: var(--primary-text-color, #f4f7fb);
        display: grid;
        font-size: 12px;
        font-weight: 720;
        gap: 2px;
        justify-items: end;
        line-height: 1.15;
        max-width: min(270px, 100%);
        min-width: 0;
        overflow: hidden;
        text-align: right;
      }

      .next-up .next-title {
        color: var(--primary-text-color, #f4f7fb);
        display: block;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
      }

      .next-up .next-label {
        color: var(--secondary-text-color, #b7c0ce);
        font-size: 10px;
        font-weight: 800;
        letter-spacing: 0.05em;
        text-transform: uppercase;
      }

      .small-action {
        appearance: none;
        background: rgb(255 255 255 / 7%);
        border: 1px solid rgb(255 255 255 / 10%);
        border-radius: 999px;
        color: inherit;
        cursor: pointer;
        font: inherit;
        font-size: 12px;
        font-weight: 750;
        min-height: 28px;
        padding: 0 10px;
      }

      .hint,
      .error {
        color: var(--secondary-text-color, #b7c0ce);
        font-size: 12px;
        line-height: 1.25;
        text-align: center;
      }

      .error {
        color: #ffb3ad;
      }

      button:disabled {
        cursor: default;
        opacity: 0.45;
      }
    `;
  }

  public static getStubConfig(_: unknown, entities: string[]) {
    return {
      entities: entities.filter((entity) => entity.startsWith('media_player.')),
    };
  }

  public static async getConfigElement(): Promise<HTMLElement> {
    return document.createElement('gamma-sonos-player-card-editor');
  }

  public setConfig(config: GammaSonosPlayerConfig): void {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.selectedEntityId =
      this.config.entity || window.localStorage.getItem(LAST_PLAYER_STORAGE_KEY) || '';
    this.playbackMemory = this.readPlaybackMemory();
    this.favoriteItems = this.readFavoriteItems();
    this.style.setProperty(
      '--gamma-sonos-width',
      this.config.fill_container ? '100%' : this.config.width ?? DEFAULT_CONFIG.width,
    );
    this.style.setProperty('--gamma-sonos-height', this.config.height ?? DEFAULT_CONFIG.height);
    this.style.setProperty(
      '--gamma-sonos-background',
      this.config.background ?? DEFAULT_CONFIG.background,
    );
    this.style.setProperty(
      '--gamma-sonos-accent',
      this.config.accent_color ?? DEFAULT_CONFIG.accent_color,
    );
  }

  protected updated(): void {
    this.rememberPlaybackState();
    this.scheduleInitialQueueRefresh();
    this.scheduleQueueRefreshForPlayback();
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    window.clearTimeout(this.searchTimer);
    window.clearTimeout(this.queueRefreshTimer);
    window.clearTimeout(this.queueRefreshRetryTimer);
    window.clearTimeout(this.initialQueueRefreshTimer);
  }

  public getCardSize(): number {
    return 8;
  }

  public getGridOptions() {
    return {
      rows: 7,
      columns: 6,
      min_rows: 5,
      max_rows: 12,
      min_columns: 4,
      max_columns: 12,
    };
  }

  private get mediaPlayers(): HassEntity[] {
    return Object.values(this.hass?.states ?? {})
      .filter((entity): entity is HassEntity => Boolean(entity))
      .filter((entity) => entity.entity_id.startsWith('media_player.'));
  }

  private isDiscoverablePlayer(entity: HassEntity): boolean {
    const platform = String(entity.attributes.platform ?? '').toLowerCase();
    const deviceClass = String(entity.attributes.device_class ?? '').toLowerCase();
    const icon = String(entity.attributes.icon ?? '').toLowerCase();
    const source = String(entity.attributes.source ?? '').toLowerCase();

    return (
      deviceClass === 'speaker' ||
      icon.includes('speaker') ||
      source.includes('music assistant') ||
      entity.attributes.mass_player_type === 'player' ||
      platform.includes('sonos') ||
      platform.includes('music_assistant') ||
      entity.entity_id.includes('sonos') ||
      entity.entity_id.includes('music_assistant')
    );
  }

  private dedupePlayers(players: HassEntity[]): HassEntity[] {
    const seen = new Set<string>();

    return players.filter((player) => {
      if (seen.has(player.entity_id)) {
        return false;
      }

      seen.add(player.entity_id);
      return true;
    });
  }

  private roomKey(player: HassEntity): string {
    return this.normalizedRoomName(String(player.attributes.friendly_name ?? player.entity_id));
  }

  private normalizedRoomName(value: string): string {
    return value
      .trim()
      .toLowerCase()
      .replace(/^media_player\./, '')
      .replace(/_/g, ' ')
      .replace(/\b(ma|mass)\b/g, '')
      .replace(/\b(sonos|music assistant|speaker|player)\b/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  private preferredRoomPlayer(current: HassEntity, candidate: HassEntity): HassEntity {
    if (isMusicAssistantPlayer(candidate) && !isMusicAssistantPlayer(current)) {
      return candidate;
    }

    if (!isUnavailable(candidate) && isUnavailable(current)) {
      return candidate;
    }

    return current;
  }

  private dedupeRoomPlayers(players: HassEntity[]): HassEntity[] {
    const byRoom = new Map<string, HassEntity>();

    players.forEach((player) => {
      const key = this.roomKey(player);
      const existing = byRoom.get(key);
      byRoom.set(key, existing ? this.preferredRoomPlayer(existing, player) : player);
    });

    return [...byRoom.values()];
  }

  private get allPlayers(): HassEntity[] {
    const configured = [
      ...(this.config.entities ?? []),
      ...(this.config.music_assistant_entities ?? []),
    ];

    if (configured.length > 0) {
      const configuredPlayers = configured
        .map((entityId) => this.hass?.states[entityId])
        .filter((entity): entity is HassEntity => Boolean(entity));
      const musicAssistantMatches = configuredPlayers
        .map((player) => this.matchingMusicAssistantPlayer(player))
        .filter((player): player is HassEntity => Boolean(player));

      return this.dedupeRoomPlayers(this.dedupePlayers([...configuredPlayers, ...musicAssistantMatches]));
    }

    return this.dedupeRoomPlayers(this.mediaPlayers.filter((entity) => this.isDiscoverablePlayer(entity)));
  }

  private get currentlyPlayingPlayer(): HassEntity | undefined {
    return this.allPlayers.find((player) => player.state === 'playing');
  }

  private get currentlyPlayingPlayers(): HassEntity[] {
    return this.allPlayers.filter((player) => player.state === 'playing');
  }

  private get activePlayer(): HassEntity | undefined {
    const selected = this.hass?.states[this.selectedEntityId];

    return selected ?? this.currentlyPlayingPlayer ?? this.allPlayers[0];
  }

  private get activeEntityId(): string {
    return this.activePlayer?.entity_id ?? this.selectedEntityId;
  }

  private get playbackPlayer(): HassEntity | undefined {
    const active = this.activePlayer;

    return active && (
      active.state === 'playing' ||
      active.attributes.media_title ||
      active.attributes.entity_picture ||
      active.attributes.entity_picture_local
    )
      ? active
      : undefined;
  }

  private get playbackEntityId(): string {
    return this.playbackPlayer?.entity_id ?? this.activeEntityId;
  }

  private get activeName(): string {
    return this.activePlayer?.attributes.friendly_name ?? this.activeEntityId;
  }

  private get artworkUrl(): string {
    return String(
      this.playbackPlayer?.attributes.entity_picture ||
        this.playbackPlayer?.attributes.entity_picture_local ||
        this.playbackPlayer?.attributes.media_image_url ||
        this.activeMemory?.artwork ||
        '',
    );
  }

  private get isPlaying(): boolean {
    return this.playbackPlayer?.state === 'playing';
  }

  private get activeMemory(): PlaybackMemory | undefined {
    return this.playbackMemory[this.activeEntityId];
  }

  private get volume(): number {
    return Math.round(toNumber(this.activePlayer?.attributes.volume_level, 0) * 100);
  }

  private get progressPercent(): number {
    const duration = toNumber(this.playbackPlayer?.attributes.media_duration, 0);
    let position = toNumber(this.playbackPlayer?.attributes.media_position, 0);
    const updatedAt = String(this.playbackPlayer?.attributes.media_position_updated_at ?? '');

    if (duration <= 0 || position < 0) {
      return 0;
    }

    if (this.isPlaying && updatedAt) {
      const updatedTimestamp = Date.parse(updatedAt);
      if (Number.isFinite(updatedTimestamp)) {
        position += Math.max(0, (Date.now() - updatedTimestamp) / 1000);
      }
    }

    return Math.max(0, Math.min(100, (position / duration) * 100));
  }

  private readPlaybackMemory(): Record<string, PlaybackMemory> {
    try {
      const parsed = JSON.parse(window.localStorage.getItem(PLAYBACK_MEMORY_STORAGE_KEY) || '{}');
      return typeof parsed === 'object' && parsed ? parsed as Record<string, PlaybackMemory> : {};
    } catch {
      return {};
    }
  }

  private writePlaybackMemory(memory: Record<string, PlaybackMemory>): void {
    try {
      window.localStorage.setItem(PLAYBACK_MEMORY_STORAGE_KEY, JSON.stringify(memory));
    } catch {
      // Local storage can be disabled in private browsing; the card still works without memory.
    }
  }

  private readFavoriteItems(): SearchItem[] {
    try {
      const parsed = JSON.parse(window.localStorage.getItem(FAVORITES_STORAGE_KEY) || '[]');
      if (!Array.isArray(parsed)) {
        return [];
      }

      return parsed
        .map((item) => (typeof item === 'object' && item ? item as SearchItem : undefined))
        .filter((item): item is SearchItem => Boolean(item?.name || item?.uri))
        .slice(0, 60);
    } catch {
      return [];
    }
  }

  private writeFavoriteItems(items: SearchItem[]): void {
    try {
      window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(items.slice(0, 60)));
    } catch {
      // Favorites are a convenience feature; playback should not depend on storage.
    }
  }

  private favoriteKey(item: SearchItem): string {
    const mediaType = item.media_type || item.type || 'track';
    const artist = this.itemArtist(item).toLowerCase();
    const name = String(item.name ?? '').toLowerCase();
    const uri = String(item.uri ?? '').toLowerCase();

    return `${mediaType}:${uri || `${name}:${artist}`}`;
  }

  private isFavorite(item: SearchItem): boolean {
    const key = this.favoriteKey(item);
    return this.favoriteItems.some((favorite) => this.favoriteKey(favorite) === key);
  }

  private normalizedFavorite(item: SearchItem): SearchItem {
    const mediaType = item.media_type || item.type || 'track';
    return {
      name: item.name,
      uri: item.uri,
      media_type: mediaType,
      type: mediaType,
      artists: item.artists,
      artist: this.itemArtist(item),
      album: item.album,
      image: item.image || item.thumb || item.album?.image,
      thumb: item.thumb,
    };
  }

  private toggleFavorite(item: SearchItem): void {
    const key = this.favoriteKey(item);
    const isFavorite = this.favoriteItems.some((favorite) => this.favoriteKey(favorite) === key);
    const next = isFavorite
      ? this.favoriteItems.filter((favorite) => this.favoriteKey(favorite) !== key)
      : [this.normalizedFavorite(item), ...this.favoriteItems.filter((favorite) => this.favoriteKey(favorite) !== key)];

    this.favoriteItems = next.slice(0, 60);
    this.writeFavoriteItems(this.favoriteItems);
  }

  private rememberPlaybackState(): void {
    const player = this.activePlayer;
    const title = String(player?.attributes.media_title ?? '');
    const artist = String(
      player?.attributes.media_artist ||
        player?.attributes.media_album_name ||
        player?.attributes.source ||
        '',
    );
    const artwork = String(
      player?.attributes.entity_picture ||
        player?.attributes.entity_picture_local ||
        player?.attributes.media_image_url ||
        '',
    );

    if (!player || (!title && !artwork)) {
      return;
    }

    const existing = this.playbackMemory[player.entity_id];
    if (
      existing &&
      existing.title === title &&
      existing.artist === artist &&
      existing.artwork === artwork &&
      existing.state === player.state
    ) {
      return;
    }

    const nextMemory = {
      ...this.playbackMemory,
      [player.entity_id]: {
        title,
        artist,
        artwork,
        state: player.state,
        updatedAt: Date.now(),
      },
    };

    this.playbackMemory = nextMemory;
    this.writePlaybackMemory(nextMemory);
  }

  private scheduleQueueRefreshForPlayback(): void {
    const player = this.playbackPlayer;
    const queueEntityId = this.queueTargetEntityId();

    if (!player || player.state !== 'playing' || !queueEntityId || !this.hass?.callWS) {
      return;
    }

    const signature = [
      queueEntityId,
      player.attributes.media_content_id,
      player.attributes.media_title,
    ].join(':');

    if (signature === this.lastQueueSignature) {
      return;
    }

    this.lastQueueSignature = signature;
    window.clearTimeout(this.queueRefreshTimer);
    this.queueRefreshTimer = window.setTimeout(() => {
      void this.refreshQueue({ silent: true });
    }, 700);
  }

  private scheduleInitialQueueRefresh(): void {
    const queueEntityId = this.queueTargetEntityId();

    if (!queueEntityId || !this.hass?.callWS || this.queueLoading) {
      return;
    }

    if (this.lastInitialQueueEntityId === queueEntityId) {
      return;
    }

    this.lastInitialQueueEntityId = queueEntityId;
    window.clearTimeout(this.initialQueueRefreshTimer);
    this.initialQueueRefreshTimer = window.setTimeout(() => {
      void this.refreshQueue({ silent: true });
    }, 500);
  }

  private get groupMembers(): string[] {
    const members = this.activePlayer?.attributes.group_members;
    return Array.isArray(members) ? members : [this.activeEntityId].filter(Boolean);
  }

  private get groupablePlayers(): HassEntity[] {
    const activeIsMusicAssistant = isMusicAssistantPlayer(this.activePlayer);
    const seen = new Set<string>();

    return this.allPlayers.filter((player) => {
      const musicAssistantMatch = this.matchingMusicAssistantPlayer(player);
      const canGroup =
        supportsGrouping(player) ||
        isMusicAssistantPlayer(player) ||
        Boolean(musicAssistantMatch);
      const playerKey = activeIsMusicAssistant && musicAssistantMatch
        ? musicAssistantMatch.entity_id
        : player.entity_id;

      if (!canGroup || seen.has(playerKey)) {
        return false;
      }

      seen.add(playerKey);
      return true;
    });
  }

  private matchingMusicAssistantPlayer(entity?: HassEntity): HassEntity | undefined {
    if (!entity) {
      return undefined;
    }

    if (isMusicAssistantPlayer(entity)) {
      return entity;
    }

    const [, objectId = ''] = entity.entity_id.split('.');
    const likelyEntityIds = [
      `media_player.${objectId}_2`,
      `media_player.ma_${objectId}`,
      `media_player.mass_${objectId}`,
      `media_player.${objectId}_music_assistant`,
    ];
    const friendlyName = this.normalizedRoomName(String(entity.attributes.friendly_name ?? entity.entity_id));

    return (
      this.mediaPlayers.find((player) => likelyEntityIds.includes(player.entity_id) && isMusicAssistantPlayer(player)) ??
      this.mediaPlayers.find((player) => (
        isMusicAssistantPlayer(player) &&
        this.normalizedRoomName(String(player.attributes.friendly_name ?? player.entity_id)) === friendlyName
      ))
    );
  }

  private resolveGroupPlayers(
    anchor: HassEntity,
    selectedPlayers: HassEntity[],
  ): { anchor: HassEntity; members: HassEntity[]; error?: string } {
    const requestedPlayers = [anchor, ...selectedPlayers];
    const hasMusicAssistant = requestedPlayers.some((player) => isMusicAssistantPlayer(player));
    const hasNative = requestedPlayers.some((player) => !isMusicAssistantPlayer(player));

    if (!hasMusicAssistant || !hasNative) {
      return { anchor, members: selectedPlayers };
    }

    const resolvedAnchor = this.matchingMusicAssistantPlayer(anchor);
    const resolvedMembers = selectedPlayers
      .map((player) => this.matchingMusicAssistantPlayer(player))
      .filter((player): player is HassEntity => Boolean(player));

    if (!resolvedAnchor) {
      return {
        anchor,
        members: [],
        error: `Use the Music Assistant version of ${anchor.attributes.friendly_name ?? anchor.entity_id} as the main speaker for mixed groups.`,
      };
    }

    return {
      anchor: resolvedAnchor,
      members: resolvedMembers.filter((player) => player.entity_id !== resolvedAnchor.entity_id),
    };
  }

  private service(
    domain: string,
    service: string,
    data?: Record<string, unknown>,
    target?: Record<string, unknown>,
  ): Promise<unknown> | void {
    return this.hass?.callService(domain, service, data, target);
  }

  private mediaService(
    service: string,
    data: Record<string, unknown> = {},
    entityId = this.activeEntityId,
  ): Promise<unknown> | void {
    const player = this.hass?.states[entityId];

    if (!entityId || isUnavailable(player)) {
      return;
    }

    return this.service('media_player', service, data, {
      entity_id: entityId,
    });
  }

  private playPause(): void {
    if (this.playbackPending) {
      return;
    }

    this.playbackError = '';
    this.playbackPending = true;
    const result = this.mediaService(
      this.isPlaying ? 'media_pause' : 'media_play',
      {},
      this.isPlaying ? this.playbackEntityId : this.activeEntityId,
    );
    const finish = () => {
      this.playbackPending = false;
    };

    if (result && typeof result.then === 'function') {
      result
        .catch((error: unknown) => {
          this.playbackError = error instanceof Error ? error.message : 'Playback control failed.';
        })
        .finally(finish);
      return;
    }

    window.setTimeout(finish, 650);
  }

  private transportService(service: 'media_previous_track' | 'media_next_track'): void {
    if (this.transportPending) {
      return;
    }

    const targetPlayer =
      this.matchingMusicAssistantPlayer(this.playbackPlayer) ??
      this.playbackPlayer ??
      this.activePlayer;
    const targetEntityId = targetPlayer?.entity_id ?? this.playbackEntityId;

    if (!targetEntityId || isUnavailable(this.hass?.states[targetEntityId])) {
      return;
    }

    this.transportPending = true;
    const result = this.service('media_player', service, {}, {
      entity_id: targetEntityId,
    });
    const finish = () => {
      this.transportPending = false;
      if (service === 'media_next_track') {
        this.refreshQueueAfterPlayback();
      }
    };

    if (result && typeof result.then === 'function') {
      result
        .catch((error: unknown) => {
          this.playbackError = error instanceof Error ? error.message : 'Playback control failed.';
        })
        .finally(finish);
      return;
    }

    window.setTimeout(finish, 650);
  }

  private setVolume(value: string): void {
    this.setPlayerVolume(this.isPlaying ? this.playbackEntityId : this.activeEntityId, value);
  }

  private setPlayerVolume(entityId: string, value: string): void {
    if (!entityId) {
      return;
    }

    this.service('media_player', 'volume_set', {
      volume_level: Math.max(0, Math.min(1, Number(value) / 100)),
    }, {
      entity_id: entityId,
    });
  }

  private toggleMute(): void {
    this.togglePlayerMute(this.activeEntityId);
  }

  private togglePlayerMute(entityId: string): void {
    const player = this.hass?.states[entityId];

    if (!player || isUnavailable(player)) {
      return;
    }

    this.service('media_player', 'volume_mute', {
      is_volume_muted: !player.attributes.is_volume_muted,
    }, {
      entity_id: entityId,
    });
  }

  private toggleGroupSelection(entityId: string): void {
    this.groupError = '';

    if (this.pendingGroupIds.includes(entityId)) {
      this.pendingGroupIds = this.pendingGroupIds.filter((id) => id !== entityId);
      return;
    }

    this.pendingGroupIds = [...this.pendingGroupIds, entityId];
  }

  private groupSelected(): void {
    this.groupError = '';

    if (
      this.groupPending ||
      !this.activeEntityId ||
      this.pendingGroupIds.length === 0
    ) {
      return;
    }

    const activePlayer = this.activePlayer;
    const selectedPlayers = this.pendingGroupIds
      .filter((id) => id !== this.activeEntityId)
      .map((id) => this.hass?.states[id])
      .filter((player): player is HassEntity => {
        if (!player) {
          return false;
        }

        return this.groupablePlayers.some((groupable) => groupable.entity_id === player.entity_id);
      });

    if (!activePlayer || selectedPlayers.length === 0) {
      return;
    }

    const resolved = this.resolveGroupPlayers(activePlayer, selectedPlayers);

    if (resolved.error) {
      this.groupError = resolved.error;
      return;
    }

    const groupMembers = resolved.members
      .map((player) => player.entity_id)
      .filter((entityId, index, ids) => (
        entityId !== resolved.anchor.entity_id &&
        ids.indexOf(entityId) === index
      ));

    if (groupMembers.length === 0) {
      this.groupError = 'Those selected speakers cannot be grouped with this main speaker.';
      return;
    }

    this.groupPending = true;
    const result = this.service('media_player', 'join', {
      group_members: groupMembers,
    }, {
      entity_id: resolved.anchor.entity_id,
    });

    const applySuccess = () => {
      this.selectedEntityId = resolved.anchor.entity_id;
      this.selectedGroupIds = [resolved.anchor.entity_id, ...groupMembers];
      this.pendingGroupIds = [];
      window.localStorage.setItem(LAST_PLAYER_STORAGE_KEY, resolved.anchor.entity_id);
    };

    if (result && typeof result.then === 'function') {
      result
        .then(applySuccess)
        .catch((error: unknown) => {
          this.groupError = error instanceof Error ? error.message : 'Grouping failed.';
        })
        .finally(() => {
          this.groupPending = false;
        });
      return;
    }

    applySuccess();
    window.setTimeout(() => {
      this.groupPending = false;
    }, 700);
  }

  private continueInSelectedRoom(): void {
    this.groupError = '';
    this.playbackError = '';

    const targetPlayer = this.selectedGroupIds
      .map((id) => this.hass?.states[id])
      .find((player): player is HassEntity => {
        if (!player) {
          return false;
        }

        return player.entity_id !== this.playbackEntityId;
      });
    const sourcePlayer = this.playbackPlayer;
    const sourceEntityId =
      this.matchingMusicAssistantPlayer(sourcePlayer)?.entity_id ?? this.playbackEntityId;
    const targetEntityId =
      this.matchingMusicAssistantPlayer(targetPlayer)?.entity_id ?? targetPlayer?.entity_id;

    if (!targetEntityId || !sourceEntityId) {
      return;
    }

    const result = this.service('music_assistant', 'transfer_queue', {
      source_player: sourceEntityId,
      auto_play: true,
    }, {
      entity_id: targetEntityId,
    });

    if (result && typeof result.then === 'function') {
      result.catch(() => {
        const source = sourcePlayer;
        const mediaId = String(source?.attributes.media_content_id ?? '');
        const mediaType = String(source?.attributes.media_content_type ?? 'music');

        if (!mediaId) {
          this.playbackError = 'That queue is not available anymore. Pick a song from search to start this room.';
          return;
        }

        this.service('music_assistant', 'play_media', {
          media_id: mediaId,
          media_type: mediaType,
          enqueue: 'play',
        }, {
          entity_id: targetEntityId,
        });
      });
    }
  }

  private ungroupActive(): void {
    if (this.groupPending) {
      return;
    }

    this.groupPending = true;
    const result = this.service('media_player', 'unjoin', {}, {
      entity_id: this.activeEntityId,
    });
    const finish = () => {
      this.selectedGroupIds = [];
      this.pendingGroupIds = [];
      this.groupPending = false;
    };

    if (result && typeof result.then === 'function') {
      result.finally(finish);
      return;
    }

    window.setTimeout(finish, 700);
  }

  private ungroupAll(): void {
    if (this.groupPending) {
      return;
    }

    this.groupPending = true;
    const results = this.groupMembers
      .map((entityId) => this.service('media_player', 'unjoin', {}, { entity_id: entityId }))
      .filter((result): result is Promise<unknown> => Boolean(result && typeof result.then === 'function'));
    const finish = () => {
      this.selectedGroupIds = [];
      this.pendingGroupIds = [];
      this.groupPending = false;
    };

    if (results.length > 0) {
      Promise.allSettled(results).finally(finish);
      return;
    }

    window.setTimeout(finish, 700);
  }

  private removeFromGroup(entityId: string): void {
    if (this.groupPending) {
      return;
    }

    this.groupPending = true;
    const result = this.service('media_player', 'unjoin', {}, { entity_id: entityId });
    const finish = () => {
      this.selectedGroupIds = this.selectedGroupIds.filter((id) => id !== entityId);
      this.pendingGroupIds = this.pendingGroupIds.filter((id) => id !== entityId);
      this.groupPending = false;
    };

    if (result && typeof result.then === 'function') {
      result.finally(finish);
      return;
    }

    window.setTimeout(finish, 700);
  }

  private musicAssistantSearchData(
    name: string,
    patch: Record<string, unknown> = {},
  ): Record<string, unknown> {
    const serviceData: Record<string, unknown> = {
      name,
      limit: toNumber(this.config.search_limit, DEFAULT_CONFIG.search_limit),
      library_only: Boolean(this.config.library_only ?? DEFAULT_CONFIG.library_only),
      ...patch,
    };

    if (this.config.music_assistant_config_entry_id) {
      serviceData.config_entry_id = this.config.music_assistant_config_entry_id;
    }

    if (!serviceData.media_type && this.config.search_media_types?.length) {
      serviceData.media_type = this.config.search_media_types;
    }

    return serviceData;
  }

  private async fetchMusicAssistantSearch(serviceData: Record<string, unknown>): Promise<SearchItem[]> {
    if (!this.hass?.callWS) {
      throw new Error('This Home Assistant frontend does not expose service responses here.');
    }

    const response = await this.hass.callWS<Record<string, unknown>>({
      type: 'call_service',
      domain: 'music_assistant',
      service: 'search',
      service_data: serviceData,
      return_response: true,
    });

    return this.extractSearchResults(response);
  }

  private async searchMusicAssistant(preserveArtist = false): Promise<void> {
    const name = this.query.trim();

    if (!name || !this.hass?.callWS) {
      if (!this.hass?.callWS) {
        this.searchError = 'This Home Assistant frontend does not expose service responses here.';
      }
      return;
    }

    const requestId = ++this.searchRequestId;
    this.searching = true;
    this.searchError = '';

    try {
      const results = await this.fetchMusicAssistantSearch(this.musicAssistantSearchData(name));
      if (requestId !== this.searchRequestId) {
        return;
      }

      this.searchResults = results;
      if (!preserveArtist) {
        this.browserView = 'results';
        this.selectedArtist = undefined;
        this.selectedAlbum = undefined;
        this.selectedPlaylist = undefined;
        this.albumTracks = [];
        this.albumError = '';
        this.playlistTracks = [];
        this.playlistError = '';
      }
    } catch (error) {
      if (requestId === this.searchRequestId) {
        this.searchError = error instanceof Error ? error.message : 'Search failed';
      }
    } finally {
      if (requestId === this.searchRequestId) {
        this.searching = false;
      }
    }
  }

  private scheduleSearch(): void {
    window.clearTimeout(this.searchTimer);

    if (this.query.trim().length < 2) {
      this.searching = false;
      return;
    }

    this.searchTimer = window.setTimeout(() => {
      void this.searchMusicAssistant();
    }, 350);
  }

  private openArtist(item: SearchItem): void {
    this.selectedArtist = item;
    this.selectedAlbum = undefined;
    this.selectedPlaylist = undefined;
    this.albumTracks = [];
    this.albumError = '';
    this.playlistTracks = [];
    this.playlistError = '';
    this.browserView = 'artist';
    this.query = item.name ?? this.query;
    void this.searchMusicAssistant(true);
  }

  private openAlbum(item: SearchItem): void {
    this.selectedAlbum = item;
    this.selectedArtist = undefined;
    this.selectedPlaylist = undefined;
    this.browserView = 'album';
    this.query = item.name ?? this.query;
    void this.loadAlbumTracks(item);
  }

  private openPlaylist(item: SearchItem): void {
    this.selectedPlaylist = item;
    this.selectedArtist = undefined;
    this.selectedAlbum = undefined;
    this.browserView = 'playlist';
    this.query = item.name ?? this.query;
    void this.loadPlaylistTracks(item);
  }

  private async loadAlbumTracks(album: SearchItem): Promise<void> {
    const requestId = ++this.albumRequestId;
    this.albumTracks = [];
    this.albumError = '';
    this.albumLoading = true;

    try {
      let tracks: SearchItem[] = [];

      try {
        tracks = await this.browseMediaTracks(album, 'album');
      } catch {
        tracks = [];
      }

      if (tracks.length === 0) {
        tracks = await this.searchAlbumTracks(album);
      }

      if (requestId !== this.albumRequestId) {
        return;
      }

      this.albumTracks = this.dedupeQueueItems(tracks);
      if (this.albumTracks.length === 0) {
        this.albumError = 'No tracks found for this album.';
      }
    } catch (error) {
      if (requestId === this.albumRequestId) {
        this.albumError = error instanceof Error ? error.message : 'Album tracks are unavailable.';
      }
    } finally {
      if (requestId === this.albumRequestId) {
        this.albumLoading = false;
      }
    }
  }

  private async browseMediaTracks(item: SearchItem, mediaType: 'album' | 'playlist'): Promise<SearchItem[]> {
    if (!this.hass?.callWS || !item.uri) {
      return [];
    }

    const entityId = this.queueTargetEntityId() || this.activeEntityId;
    if (!entityId) {
      return [];
    }

    const response = await this.hass.callWS<BrowseMediaNode>({
      type: 'media_player/browse_media',
      entity_id: entityId,
      media_content_id: item.uri,
      media_content_type: mediaType,
    });

    return this.extractBrowseTracks(response, item);
  }

  private async searchAlbumTracks(album: SearchItem): Promise<SearchItem[]> {
    const albumName = album.name ?? '';
    const artist = this.itemArtist(album);
    const name = artist || albumName;

    if (!name) {
      return [];
    }

    const serviceData = this.musicAssistantSearchData(name, {
      album: albumName,
      limit: Math.max(40, toNumber(this.config.search_limit, DEFAULT_CONFIG.search_limit)),
      media_type: ['track'],
    });

    if (artist) {
      serviceData.artist = artist;
    }

    return this.fetchMusicAssistantSearch(serviceData)
      .then((items) => items.filter((item) => (item.media_type || item.type) === 'track'));
  }

  private async loadPlaylistTracks(playlist: SearchItem): Promise<void> {
    const requestId = ++this.playlistRequestId;
    this.playlistTracks = [];
    this.playlistError = '';
    this.playlistLoading = true;

    try {
      const tracks = await this.browseMediaTracks(playlist, 'playlist');

      if (requestId !== this.playlistRequestId) {
        return;
      }

      this.playlistTracks = this.dedupeQueueItems(tracks);
      if (this.playlistTracks.length === 0) {
        this.playlistError = 'No tracks found for this playlist.';
      }
    } catch (error) {
      if (requestId === this.playlistRequestId) {
        this.playlistError = error instanceof Error ? error.message : 'Playlist tracks are unavailable.';
      }
    } finally {
      if (requestId === this.playlistRequestId) {
        this.playlistLoading = false;
      }
    }
  }

  private extractBrowseTracks(response: unknown, album: SearchItem): SearchItem[] {
    const tracks: SearchItem[] = [];
    const albumName = album.name ?? '';
    const albumArtist = this.itemArtist(album);
    const albumImage = album.image || album.thumb || album.album?.image || '';
    const visit = (node: unknown, depth = 0) => {
      if (typeof node !== 'object' || !node) {
        return;
      }

      const browseNode = node as BrowseMediaNode;
      const mediaType = this.normalizedMediaType(
        browseNode.media_content_type || browseNode.media_class,
        'track',
      );
      const mediaId = String(browseNode.media_content_id ?? '');
      const title = String(browseNode.title ?? browseNode.name ?? '');
      const children = Array.isArray(browseNode.children) ? browseNode.children : [];
      const playableTrack =
        depth > 0 &&
        Boolean(mediaId) &&
        Boolean(title) &&
        (mediaType === 'track' ||
          String(browseNode.media_class ?? '').toLowerCase().includes('track') ||
          (browseNode.can_play && !browseNode.can_expand && mediaType !== 'album'));

      if (playableTrack) {
        tracks.push({
          name: title,
          uri: mediaId,
          media_type: 'track',
          type: 'track',
          artist: albumArtist,
          album: albumName ? { name: albumName, image: albumImage } : album.album,
          image: String(browseNode.thumbnail ?? browseNode.image ?? albumImage) || undefined,
        });
      }

      children.forEach((child) => visit(child, depth + 1));
    };

    visit(response);
    return tracks;
  }

  private extractSearchResults(response: Record<string, unknown>): SearchItem[] {
    const serviceResponse = response.response as Record<string, unknown> | undefined;
    const source = serviceResponse ?? response;
    const buckets = ['tracks', 'albums', 'artists', 'playlists', 'radio', 'podcasts'];
    const items: SearchItem[] = [];

    buckets.forEach((bucket) => {
      const value = source[bucket];
      if (Array.isArray(value)) {
        value.forEach((item) => {
          if (typeof item === 'object' && item) {
            items.push(this.normalizeSearchItem(item as Record<string, unknown>, (bucket === 'tracks' ? 'track' : bucket.slice(0, -1)) as MediaType));
          }
        });
      }
    });

    return items;
  }

  private normalizedMediaType(value: unknown, fallback: MediaType): MediaType {
    const normalized = String(value ?? '').toLowerCase();

    if (normalized.includes('album')) {
      return 'album';
    }

    if (normalized.includes('artist')) {
      return 'artist';
    }

    if (normalized.includes('playlist')) {
      return 'playlist';
    }

    if (normalized.includes('radio')) {
      return 'radio';
    }

    if (normalized.includes('podcast')) {
      return 'podcast';
    }

    if (normalized.includes('track') || normalized.includes('song')) {
      return 'track';
    }

    return fallback;
  }

  private normalizeSearchItem(item: Record<string, unknown>, fallbackType: MediaType): SearchItem {
    const album = typeof item.album === 'object' && item.album
      ? item.album as { name?: string; image?: string }
      : undefined;
    const artists = Array.isArray(item.artists)
      ? item.artists as Array<{ name?: string }>
      : undefined;
    const mediaType = this.normalizedMediaType(item.media_type ?? item.type, fallbackType);
    const image = String(
      item.image ??
        item.thumb ??
        item.thumbnail ??
        item.image_url ??
        item.uri_image ??
        album?.image ??
        '',
    );

    return {
      ...(item as SearchItem),
      name: String(item.name ?? item.title ?? item.media_title ?? item.uri ?? ''),
      uri: String(item.uri ?? item.media_id ?? item.media_content_id ?? '') || undefined,
      media_type: mediaType,
      type: mediaType,
      artists,
      artist: String(item.artist ?? item.media_artist ?? artists?.map((entry) => entry.name).filter(Boolean).join(', ') ?? ''),
      album,
      image: image || undefined,
    };
  }

  private queueTargetEntityId(): string {
    const target = this.matchingMusicAssistantPlayer(this.activePlayer);
    return target && !isUnavailable(target) ? target.entity_id : '';
  }

  private queueServiceAttempts(entityId: string): QueueServiceAttempt[] {
    const activeQueue = String(this.hass?.states[entityId]?.attributes.active_queue ?? '');

    return [
      {
        domain: 'mass_queue',
        service: 'get_queue_items',
        data: { entity: entityId, limit: 40, limit_before: 0, limit_after: 40 },
      },
      {
        domain: 'music_assistant',
        service: 'get_queue',
        data: { entity_id: entityId },
      },
      ...(activeQueue
        ? [
            {
              domain: 'mass_queue',
              service: 'get_queue_items',
              data: { entity: entityId, queue_id: activeQueue, limit: 40, limit_before: 0, limit_after: 40 },
            },
            {
              domain: 'music_assistant',
              service: 'get_queue',
              data: { queue_id: activeQueue },
            },
          ]
        : []),
    ];
  }

  private async refreshQueue(options: { silent?: boolean } = {}): Promise<void> {
    const entityId = this.queueTargetEntityId();

    if (!entityId || !this.hass?.callWS) {
      this.queueItems = [];
      this.queueError = entityId
        ? 'Queue responses are not available in this Home Assistant view.'
        : 'Queue is only available for Music Assistant speaker entities.';
      return;
    }

    if (!options.silent) {
      this.queueLoading = true;
    }
    this.queueError = '';

    try {
      const errors: string[] = [];

      for (const attempt of this.queueServiceAttempts(entityId)) {
        try {
          const response = await this.hass.callWS<Record<string, unknown>>({
            type: 'call_service',
            domain: attempt.domain,
            service: attempt.service,
            service_data: attempt.data,
            return_response: true,
          });
          const items = this.extractQueueItems(response, entityId);

          if (attempt.domain === 'mass_queue') {
            errors.length = 0;
          }

          if (items.length > 0) {
            this.queueItems = items;
            return;
          }
        } catch (error) {
          errors.push(error instanceof Error ? error.message : `${attempt.domain}.${attempt.service} failed.`);
        }
      }

      this.queueItems = [];
      this.queueError = errors.length > 0
        ? errors[errors.length - 1]
        : 'Queue is empty or unavailable for this Music Assistant player.';
    } finally {
      if (!options.silent) {
        this.queueLoading = false;
      }
    }
  }

  private extractQueueItems(response: unknown, entityId = ''): SearchItem[] {
    const root = this.responsePayload(response);
    const roots = this.queueResponseRoots(root, entityId);

    for (const queueRoot of roots) {
      const current = this.normalizeQueueItem(this.valueAtPath(queueRoot, ['current_item']));
      const candidates = [
        Array.isArray(queueRoot) ? queueRoot : undefined,
        this.valueAtPath(queueRoot, ['next_items']),
        this.valueAtPath(queueRoot, ['upcoming_items']),
        this.valueAtPath(queueRoot, ['items']),
        this.valueAtPath(queueRoot, ['queue_items']),
        this.valueAtPath(queueRoot, ['queue']),
        this.valueAtPath(queueRoot, ['next_item']),
      ];

      for (const candidate of candidates) {
        const items = this.queueItemsFromUnknown(candidate)
          .filter((item) => !current || !this.sameQueueItem(item, current));
        if (items.length > 0) {
          return this.dedupeQueueItems(items);
        }
      }
    }

    return [];
  }

  private queueResponseRoots(root: unknown, entityId: string): unknown[] {
    const roots: unknown[] = [root];

    if (typeof root === 'object' && root) {
      const objectRoot = root as Record<string, unknown>;

      if (entityId && objectRoot[entityId]) {
        roots.unshift(objectRoot[entityId]);
      }

      Object.entries(objectRoot).forEach(([key, value]) => {
        if (
          key.startsWith('media_player.') ||
          (typeof value === 'object' && value && (
            'current_item' in value ||
            'next_item' in value ||
            'queue_items' in value ||
            'items' in value
          ))
        ) {
          roots.push(value);
        }
      });
    }

    return roots.filter((value, index, values) => values.indexOf(value) === index);
  }

  private responsePayload(response: unknown): unknown {
    if (typeof response === 'object' && response && 'response' in response) {
      const serviceResponse = (response as Record<string, unknown>).response;
      return serviceResponse ?? response;
    }

    return response;
  }

  private valueAtPath(value: unknown, path: string[]): unknown {
    return path.reduce<unknown>((current, key) => {
      if (typeof current !== 'object' || !current) {
        return undefined;
      }

      return (current as Record<string, unknown>)[key];
    }, value);
  }

  private queueItemsFromUnknown(value: unknown): SearchItem[] {
    if (Array.isArray(value)) {
      return value
        .map((item) => this.normalizeQueueItem(item))
        .filter((item): item is SearchItem => Boolean(item));
    }

    if (typeof value === 'object' && value) {
      const objectValue = value as Record<string, unknown>;
      const nestedKeys = ['next_items', 'upcoming_items', 'items', 'queue_items', 'queue', 'next_item'];

      for (const key of nestedKeys) {
        const nestedItems = this.queueItemsFromUnknown(objectValue[key]);
        if (nestedItems.length > 0) {
          return nestedItems;
        }
      }

      const directItem = this.normalizeQueueItem(objectValue);

      if (directItem) {
        return [directItem];
      }

      for (const nestedValue of Object.values(objectValue)) {
        const nestedItems = this.queueItemsFromUnknown(nestedValue);
        if (nestedItems.length > 0) {
          return nestedItems;
        }
      }
    }

    return [];
  }

  private isQueueContainer(value: Record<string, unknown>): boolean {
    return Boolean(
      value.current_item ||
        value.next_item ||
        value.next_items ||
        value.upcoming_items ||
        value.queue_items ||
        value.items ||
        value.active_queue ||
        (value.entity_id && value.attributes),
    );
  }

  private normalizeQueueItem(value: unknown): SearchItem | undefined {
    if (typeof value !== 'object' || !value) {
      return undefined;
    }

    const row = value as Record<string, unknown>;
    if (this.isQueueContainer(row)) {
      return undefined;
    }

    const mediaItem =
      (typeof row.media_item === 'object' && row.media_item
        ? row.media_item as Record<string, unknown>
        : undefined) ??
      (typeof row.item === 'object' && row.item ? row.item as Record<string, unknown> : undefined) ??
      row;
    const album = typeof mediaItem.album === 'object' && mediaItem.album
      ? mediaItem.album as { name?: string; image?: string }
      : undefined;
    const artists = Array.isArray(mediaItem.artists)
      ? mediaItem.artists as Array<{ name?: string }>
      : undefined;
    const name = String(
      mediaItem.name ??
        row.name ??
        row.title ??
        row.media_title ??
        '',
    );
    const uri = String(mediaItem.uri ?? row.uri ?? row.media_id ?? row.media_content_id ?? '');
    const mediaType = this.normalizedMediaType(mediaItem.media_type ?? row.media_type ?? row.type, 'track');
    const image = String(
      mediaItem.image ??
        row.image ??
        row.thumbnail ??
        row.entity_picture ??
        row.media_image ??
        row.local_image_encoded ??
        album?.image ??
        '',
    );

    if (!name && !uri) {
      return undefined;
    }

    return {
      name: name || uri,
      uri: uri || undefined,
      media_type: mediaType,
      type: mediaType,
      artists,
      artist: String(mediaItem.artist ?? row.artist ?? row.media_artist ?? ''),
      album,
      image: image || undefined,
      queue_item_id: String(row.queue_item_id ?? mediaItem.queue_item_id ?? ''),
    };
  }

  private dedupeQueueItems(items: SearchItem[]): SearchItem[] {
    const seen = new Set<string>();

    return items.filter((item) => {
      const key = `${item.uri ?? ''}:${item.name ?? ''}:${item.artist ?? ''}`;
      if (seen.has(key)) {
        return false;
      }

      seen.add(key);
      return true;
    });
  }

  private sameQueueItem(left: SearchItem, right: SearchItem): boolean {
    if (left.queue_item_id && right.queue_item_id) {
      return left.queue_item_id === right.queue_item_id;
    }

    if (left.uri && right.uri) {
      return left.uri === right.uri;
    }

    return Boolean(
      left.name &&
        right.name &&
        left.name === right.name &&
        (left.artist ?? '') === (right.artist ?? ''),
    );
  }

  private itemArtist(item: SearchItem): string {
    return String(
      item.artist ||
        item.artists?.map((entry) => entry.name).filter(Boolean).join(', ') ||
        '',
    );
  }

  private itemAlbum(item: SearchItem): string {
    return String(item.album?.name ?? '');
  }

  private shouldStartRadioForContext(item: SearchItem, context: ResultContext): boolean {
    const mediaType = item.media_type || item.type || 'track';
    return mediaType === 'track' && context !== 'album' && context !== 'playlist' && Boolean(this.itemArtist(item));
  }

  private refreshQueueAfterPlayback(): void {
    window.clearTimeout(this.queueRefreshTimer);
    window.clearTimeout(this.queueRefreshRetryTimer);
    const silent = this.activeTab !== 'queue';
    this.queueRefreshTimer = window.setTimeout(() => {
      void this.refreshQueue({ silent });
    }, 600);
    this.queueRefreshRetryTimer = window.setTimeout(() => {
      void this.refreshQueue({ silent: true });
    }, 1800);
  }

  private playSearchResult(
    item: SearchItem,
    enqueueOverride?: EnqueueMode,
    options: { startRadio?: boolean } = {},
  ): void {
    if (this.playbackPending) {
      return;
    }

    this.playbackError = '';
    const mediaId = item.uri || item.name;

    if (!mediaId) {
      return;
    }

    const configuredEnqueue = enqueueOverride ?? this.config.enqueue_mode ?? DEFAULT_CONFIG.enqueue_mode;
    const enqueue =
      (configuredEnqueue === 'next' || configuredEnqueue === 'add') && !this.isPlaying
        ? 'play'
        : configuredEnqueue;
    const targetPlayer = this.matchingMusicAssistantPlayer(this.activePlayer) ?? this.activePlayer;
    const targetEntityId = targetPlayer?.entity_id ?? this.activeEntityId;

    this.playbackPending = true;
    window.localStorage.setItem(LAST_PLAYER_STORAGE_KEY, targetEntityId);
    this.selectedEntityId = targetEntityId;
    const mediaType = item.media_type || item.type || 'track';
    const serviceData: Record<string, unknown> = {
      media_id: mediaId,
      media_type: mediaType,
      enqueue,
    };
    const artist = this.itemArtist(item);
    const album = this.itemAlbum(item);

    if (artist && !String(mediaId).includes('://') && (mediaType === 'track' || mediaType === 'album')) {
      serviceData.artist = artist;
    }

    if (album && !String(mediaId).includes('://') && mediaType === 'track') {
      serviceData.album = album;
    }

    if (options.startRadio && enqueue === 'play' && mediaType === 'track' && artist) {
      serviceData.radio_mode = true;
    }

    const result = this.service('music_assistant', 'play_media', serviceData, {
      entity_id: targetEntityId,
    });

    if (result && typeof result.then === 'function') {
      result
        .catch(async (error: unknown) => {
          if (serviceData.radio_mode) {
            const fallbackData = { ...serviceData };
            delete fallbackData.radio_mode;

            try {
              const fallback = this.service('music_assistant', 'play_media', fallbackData, {
                entity_id: targetEntityId,
              });

              if (fallback && typeof fallback.then === 'function') {
                await fallback;
              }

              return;
            } catch (fallbackError) {
              this.playbackError = fallbackError instanceof Error
                ? fallbackError.message
                : 'Music Assistant playback failed.';
              return;
            }
          }

          if (enqueue === 'next') {
            const fallback = this.service('music_assistant', 'play_media', {
              media_id: mediaId,
              media_type: mediaType,
              enqueue: 'add',
            }, {
              entity_id: targetEntityId,
            });

            if (fallback && typeof fallback.then === 'function') {
              return fallback.catch((fallbackError: unknown) => {
                this.playbackError = fallbackError instanceof Error
                  ? fallbackError.message
                  : 'Music Assistant queue add failed.';
              });
            }

            return undefined;
          }

          this.playbackError = error instanceof Error ? error.message : 'Music Assistant playback failed.';
          return undefined;
        })
        .finally(() => {
          this.playbackPending = false;
          this.refreshQueueAfterPlayback();
        });
      return;
    }

    window.setTimeout(() => {
      this.playbackPending = false;
      this.refreshQueueAfterPlayback();
    }, 900);
  }

  private queueSearchResult(item: SearchItem): void {
    this.playSearchResult(item, 'add', { startRadio: false });
  }

  private playQueueItem(item: SearchItem): void {
    const queueItemId = item.queue_item_id;
    const entityId = this.queueTargetEntityId();

    if (!queueItemId || !entityId || this.playbackPending) {
      this.playSearchResult(item, 'play');
      return;
    }

    this.playbackPending = true;
    this.playbackError = '';

    const result = this.service('mass_queue', 'play_queue_item', {
      entity: entityId,
      queue_item_id: queueItemId,
    });

    if (result && typeof result.then === 'function') {
      result
        .catch((error: unknown) => {
          this.playbackError = error instanceof Error ? error.message : 'Queue item playback failed.';
        })
        .finally(() => {
          this.playbackPending = false;
          window.setTimeout(() => this.refreshQueue(), 500);
        });
      return;
    }

    window.setTimeout(() => {
      this.playbackPending = false;
      void this.refreshQueue();
    }, 900);
  }

  private renderRooms(): TemplateResult | typeof nothing {
    const nowPlaying = this.currentlyPlayingPlayers;

    if (nowPlaying.length < 2) {
      return nothing;
    }

    return html`
      <div class="rooms">
        <span class="now-label">Playing in</span>
        <div class="now-row">
          <div class="now-speakers">
            ${nowPlaying.map(
              (player) => html`
                <span class="now-chip">
                  ${player.attributes.friendly_name ?? titleCase(player.entity_id.split('.')[1])}
                </span>
              `,
            )}
          </div>
        </div>
      </div>
    `;
  }

  private renderPlayerPicker(players: HassEntity[], header = false): TemplateResult {
    return html`
      <label class="player-picker ${header ? 'header-picker' : ''}">
        <ha-icon .icon=${'mdi:speaker'}></ha-icon>
        <select
          .value=${this.activeEntityId}
          @change=${(event: Event) => {
            const entityId = (event.target as HTMLSelectElement).value;
            const player = this.hass?.states[entityId];
            this.selectedEntityId = entityId;
            window.localStorage.setItem(LAST_PLAYER_STORAGE_KEY, entityId);
            const members = player?.attributes.group_members;
            this.selectedGroupIds = Array.isArray(members) ? [...members] : [entityId];
            this.pendingGroupIds = [];
            this.queueItems = [];
            this.queueError = '';
            this.lastInitialQueueEntityId = '';
            if (this.activeTab === 'queue') {
              void this.refreshQueue();
            }
          }}
        >
          ${players.map(
            (player) => html`
              <option
                .value=${player.entity_id}
                ?selected=${player.entity_id === this.activeEntityId}
              >
                ${player.attributes.friendly_name ?? titleCase(player.entity_id.split('.')[1])}
              </option>
            `,
          )}
        </select>
      </label>
    `;
  }

  private renderHeaderIdentity(): TemplateResult {
    const players = this.allPlayers;

    return html`
      <div class="title">
        ${players.length > 1
          ? this.renderPlayerPicker(players, true)
          : html`<span class="name">${this.activeName || 'Sonos'}</span>`}
      </div>
    `;
  }

  private renderTopControls(unavailable: boolean, player?: HassEntity): TemplateResult {
    return html`
      <div class="top-controls">
        <span class="header-state">${unavailable ? 'Unavailable' : titleCase(player?.state ?? 'idle')}</span>
        ${this.renderNextUp()}
      </div>
    `;
  }

  private renderNextUp(): TemplateResult | typeof nothing {
    const nextItem = this.queueItems[0];

    if (!nextItem) {
      return nothing;
    }

    return html`
      <span class="next-up">
        <span class="next-label">Next</span>
        <span class="next-title">${nextItem.name ?? nextItem.uri ?? 'Queue item'}</span>
      </span>
    `;
  }

  private renderMiniPlayer(
    title: string,
    artist: string,
    unavailable: boolean,
  ): TemplateResult {
    return html`
      <section class="mini-player">
        <div class="mini-art" aria-label="Artwork"></div>
        <div class="mini-meta">
          <span class="track">${title}</span>
          <span class="artist">${artist}</span>
        </div>
        <div class="mini-controls">
          <button
            class="icon-button"
            ?disabled=${unavailable || this.transportPending}
            @click=${() => this.transportService('media_previous_track')}
          >
            <ha-icon .icon=${'mdi:skip-previous'}></ha-icon>
          </button>
          <button
            class="play-button ${this.playbackPending ? 'loading' : ''}"
            ?disabled=${unavailable || this.playbackPending}
            @click=${this.playPause}
          >
            <ha-icon .icon=${this.playbackPending ? 'mdi:loading' : this.isPlaying ? 'mdi:pause' : 'mdi:play'}></ha-icon>
          </button>
          <button
            class="icon-button"
            ?disabled=${unavailable || this.transportPending}
            @click=${() => this.transportService('media_next_track')}
          >
            <ha-icon .icon=${'mdi:skip-next'}></ha-icon>
          </button>
        </div>
      </section>
    `;
  }

  private renderGrouping(): TemplateResult | typeof nothing {
    const groupablePlayers = this.groupablePlayers;

    if (!this.config.show_grouping || groupablePlayers.length < 2) {
      return nothing;
    }

    const activeCanGroup =
      groupablePlayers.some((player) => player.entity_id === this.activeEntityId) ||
      Boolean(this.matchingMusicAssistantPlayer(this.activePlayer));
    const pendingCount = this.pendingGroupIds.filter((id) => {
      const player = this.hass?.states[id];
      return (
        id !== this.activeEntityId &&
        groupablePlayers.some((groupable) => groupable.entity_id === player?.entity_id)
      );
    }).length;
    const moveTargetCount = this.selectedGroupIds.filter(
      (id) => id !== this.playbackEntityId,
    ).length;

    return html`
      <section class="grouping">
        <span class="section-title">Choose Speakers</span>
        ${this.groupError ? html`<div class="error">${this.groupError}</div>` : nothing}
        <div class="group-row">
          ${groupablePlayers.map((player) => {
            const inGroup =
              this.selectedGroupIds.includes(player.entity_id) ||
              this.groupMembers.includes(player.entity_id);
            const pending = this.pendingGroupIds.includes(player.entity_id);
            const selected = inGroup || pending;
            const isAnchor = player.entity_id === this.activeEntityId;

            return html`
	              <button
	                class="group-chip ${selected ? 'active' : ''} ${isAnchor ? 'anchor' : ''}"
	                ?disabled=${isAnchor || this.groupPending}
                  title=${isAnchor ? 'Current room' : selected ? 'Remove from selection' : 'Add to selection'}
                @click=${() => this.toggleGroupSelection(player.entity_id)}
              >
                <span class="group-check">${selected ? '✓' : ''}</span>
                <span class="group-name">
                  ${player.attributes.friendly_name ?? titleCase(player.entity_id.split('.')[1])}
                </span>
                <span class="group-status">${isAnchor ? 'This room' : inGroup ? 'In group' : pending ? 'Selected' : 'Available'}</span>
              </button>
            `;
          })}
        </div>
        <div class="group-actions">
          <button
            class="group-chip action continue"
            ?disabled=${this.groupPending || moveTargetCount !== 1}
            title="Move the current music to the selected speaker"
            @click=${this.continueInSelectedRoom}
          >
            <span class="group-check">▶</span>
            <span class="group-name">Move Music</span>
            <span class="group-status">${moveTargetCount === 1 ? 'To selected speaker' : 'Select one speaker'}</span>
          </button>
          <button
            class="group-chip action group"
            ?disabled=${this.groupPending || !activeCanGroup || pendingCount === 0}
            title="Add selected speakers to this group"
            @click=${this.groupSelected}
          >
            <span class="group-check">+</span>
            <span class="group-name">Add Selected</span>
            <span class="group-status">
              ${activeCanGroup ? `${pendingCount} selected` : 'Cannot group this speaker'}
            </span>
          </button>
          <button
            class="group-chip action ungroup"
            ?disabled=${this.groupPending}
            title="Remove this speaker from its group"
            @click=${this.ungroupActive}
          >
            <span class="group-check">×</span>
            <span class="group-name">Remove Room</span>
            <span class="group-status">This speaker</span>
          </button>
          <button
            class="group-chip action clear"
            ?disabled=${this.groupPending}
            title="Clear the whole group"
            @click=${this.ungroupAll}
          >
            <span class="group-check">×</span>
            <span class="group-name">Clear Group</span>
            <span class="group-status">All speakers</span>
          </button>
        </div>
      </section>
    `;
  }

  private renderCurrentGroup(): TemplateResult | typeof nothing {
    const members = this.groupMembers
      .map((entityId) => this.hass?.states[entityId])
      .filter((player): player is HassEntity => Boolean(player));

    if (members.length <= 1) {
      return nothing;
    }

    return html`
      <section class="current-group">
        <button
          class="section-toggle"
          @click=${() => {
            this.showCurrentGroup = !this.showCurrentGroup;
          }}
        >
          <span>Playing Together (${members.length})</span>
          <ha-icon .icon=${this.showCurrentGroup ? 'mdi:chevron-up' : 'mdi:chevron-down'}></ha-icon>
        </button>
        ${this.showCurrentGroup
          ? members.map(
              (player) => html`
                <div class="current-member">
                  <span class="speaker-name">
                    ${player.attributes.friendly_name ?? titleCase(player.entity_id.split('.')[1])}
                  </span>
                  <button
                    class="small-action"
                    ?disabled=${this.groupPending || player.entity_id === this.activeEntityId}
                    @click=${() => this.removeFromGroup(player.entity_id)}
                  >
                    Remove
                  </button>
                </div>
              `,
            )
          : nothing}
      </section>
    `;
  }

  private renderTabs(): TemplateResult {
    return html`
      <div
        class="tabs"
        aria-label="Player panels"
      >
        <button
          class=${this.activeTab === 'now' ? 'active' : ''}
          @click=${() => {
            this.activeTab = 'now';
          }}
        >
          Now
        </button>
        <button
          class=${this.activeTab === 'search' ? 'active' : ''}
          @click=${() => {
            this.activeTab = 'search';
          }}
        >
          Search
        </button>
        <button
          class=${this.activeTab === 'queue' ? 'active' : ''}
          @click=${() => {
            this.activeTab = 'queue';
            void this.refreshQueue();
          }}
        >
          Queue
        </button>
        <button
          class=${this.activeTab === 'speakers' ? 'active' : ''}
          @click=${() => {
            this.activeTab = 'speakers';
          }}
        >
          Speakers
        </button>
      </div>
    `;
  }

  private renderNowPlaying(title: string, artist: string, unavailable: boolean): TemplateResult {
    const artworkUrl = this.artworkUrl;

    return html`
      <section class="now-view">
        <div class="now-artwork ${artworkUrl ? 'has-art' : ''}" aria-label="Current album artwork">
          ${artworkUrl
            ? html`<img src=${artworkUrl} alt="" loading="eager" decoding="async" />`
            : html`<span class="artwork-empty">No artwork</span>`}
        </div>
        <div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow=${String(Math.round(this.progressPercent))}>
          <div class="progress-fill" style=${`width: ${this.progressPercent}%`}></div>
        </div>
        <div class="metadata">
          <span class="track">${title}</span>
          <span class="artist">${artist}</span>
        </div>
        <div class="controls">
          <button
            class="icon-button"
            ?disabled=${unavailable || this.transportPending}
            @click=${() => this.transportService('media_previous_track')}
          >
            <ha-icon .icon=${'mdi:skip-previous'}></ha-icon>
          </button>
          <button
            class="play-button ${this.playbackPending ? 'loading' : ''}"
            ?disabled=${unavailable || this.playbackPending}
            @click=${this.playPause}
          >
            <ha-icon .icon=${this.playbackPending ? 'mdi:loading' : this.isPlaying ? 'mdi:pause' : 'mdi:play'}></ha-icon>
          </button>
          <button
            class="icon-button"
            ?disabled=${unavailable || this.transportPending}
            @click=${() => this.transportService('media_next_track')}
          >
            <ha-icon .icon=${'mdi:skip-next'}></ha-icon>
          </button>
        </div>
      </section>
    `;
  }

  private renderQueue(): TemplateResult {
    return html`
      <section class="queue">
        <div class="queue-header">
          <span class="section-title">Queue</span>
          <button
            class="small-action"
            ?disabled=${this.queueLoading}
            @click=${() => this.refreshQueue()}
          >
            Refresh
          </button>
        </div>
        ${this.queueLoading ? html`<div class="hint">Loading queue...</div>` : nothing}
        ${this.queueError ? html`<div class="error">${this.queueError}</div>` : nothing}
        ${!this.queueLoading && this.queueItems.length === 0 && !this.queueError
          ? html`<div class="hint">Queue is empty or unavailable for this speaker.</div>`
          : nothing}
        ${this.queueItems.length > 0
          ? html`
              <div class="queue-list">
                ${this.queueItems.map((item) => this.renderQueueItem(item))}
              </div>
            `
          : nothing}
      </section>
    `;
  }

  private renderSearch(): TemplateResult | typeof nothing {
    if (!this.config.show_search) {
      return nothing;
    }

    return html`
      <section class="search">
        <span class="section-title">Music Assistant Search</span>
        <div class="search-row">
          <ha-icon .icon=${'mdi:magnify'}></ha-icon>
          <input
            type="search"
            .value=${this.query}
            placeholder="Search songs, albums, artists, playlists"
            @input=${(event: Event) => {
              this.query = (event.target as HTMLInputElement).value;
              this.scheduleSearch();
            }}
            @keydown=${(event: KeyboardEvent) => {
              if (event.key === 'Enter') {
                this.searchMusicAssistant();
              }
            }}
          />
          <button
            class="icon-button"
            title="Search"
            @click=${() => this.searchMusicAssistant()}
          >
            <ha-icon .icon=${'mdi:magnify'}></ha-icon>
          </button>
        </div>
        ${this.renderFavorites()}
        ${this.searchError ? html`<div class="error">${this.searchError}</div>` : nothing}
        ${this.playbackError ? html`<div class="error">${this.playbackError}</div>` : nothing}
        ${this.searching ? html`<div class="hint">Searching...</div>` : nothing}
        ${this.searchResults.length > 0
          ? this.browserView === 'artist'
            ? this.renderArtistView()
            : this.browserView === 'album'
              ? this.renderAlbumView()
              : this.browserView === 'playlist'
                ? this.renderPlaylistView()
            : this.renderResults()
          : nothing}
        ${this.config.show_queue_hint
          ? html`<div class="hint">Tap a result to start playback, or use Next to queue it after the current song.</div>`
          : nothing}
      </section>
    `;
  }

  private itemsByType(mediaType: MediaType): SearchItem[] {
    return this.searchResults.filter((item) => (item.media_type || item.type) === mediaType);
  }

  private renderFavorites(): TemplateResult | typeof nothing {
    if (this.favoriteItems.length === 0) {
      return nothing;
    }

    return html`
      <section class="favorites">
        <span class="section-header">Favorites</span>
        ${this.favoriteItems.map((item) => {
          const mediaType = item.media_type || item.type || 'track';
          const action: ResultAction =
            mediaType === 'artist'
              ? 'artist'
              : mediaType === 'album'
                ? 'album'
                : mediaType === 'playlist'
                  ? 'playlist'
                  : 'play';

          return this.renderResultItem(item, action, 'favorites');
        })}
      </section>
    `;
  }

  private renderResultSection(
    label: string,
    items: SearchItem[],
    action: ResultAction = 'play',
    limitResults = true,
    context: ResultContext = 'search',
  ): TemplateResult | typeof nothing {
    if (items.length === 0) {
      return nothing;
    }

    const visibleItems = limitResults
      ? items.slice(0, toNumber(this.config.search_limit, DEFAULT_CONFIG.search_limit))
      : items;

    return html`
      <section class="result-section">
        <span class="section-header">${label}</span>
        ${visibleItems.map((item) => this.renderResultItem(item, action, context))}
      </section>
    `;
  }

  private renderArtistView(): TemplateResult {
    const artist = this.selectedArtist;
    const image = artist?.image || artist?.thumb || '';
    const artistName = artist?.name ?? this.query;

    return html`
      <div class="results">
        <div class="artist-header">
          <div
            class="result-art"
            style=${image ? `background-image: url("${image}")` : ''}
          ></div>
          <div class="result-main">
            <span class="result-name">${artistName}</span>
            <span class="result-sub">Artist</span>
          </div>
          <button class="small-action" @click=${() => {
            this.browserView = 'results';
            this.selectedArtist = undefined;
          }}>
            Back
          </button>
        </div>
        ${this.renderResultSection('Songs', this.itemsByType('track'), 'play', true, 'artist')}
        ${this.renderResultSection('Albums', this.itemsByType('album'), 'album', true, 'artist')}
        ${this.renderResultSection('Playlists', this.itemsByType('playlist'), 'playlist', true, 'artist')}
      </div>
    `;
  }

  private renderAlbumView(): TemplateResult {
    const album = this.selectedAlbum;
    const image = album?.image || album?.thumb || '';
    const albumName = album?.name ?? this.query;
    const songs = this.albumTracks.length > 0
      ? this.albumTracks
      : this.itemsByType('track').filter((item) => (
          !albumName ||
          this.itemAlbum(item).toLowerCase() === albumName.toLowerCase()
        ));

    return html`
      <div class="results">
        <div class="artist-header">
          <div
            class="result-art"
            style=${image ? `background-image: url("${image}")` : ''}
          ></div>
          <div class="result-main">
            <span class="result-name">${albumName}</span>
            <span class="result-sub">Album</span>
          </div>
          ${album
            ? html`
                <button
                  class="small-action"
                  ?disabled=${this.playbackPending}
                  @click=${() => this.playSearchResult(album, 'play')}
                >
                  Play Album
                </button>
              `
            : nothing}
          <button class="small-action" @click=${() => {
            this.browserView = 'results';
            this.selectedAlbum = undefined;
            this.selectedPlaylist = undefined;
            this.albumTracks = [];
            this.albumError = '';
          }}>
            Back
          </button>
        </div>
        ${this.albumLoading ? html`<div class="hint">Loading album tracks...</div>` : nothing}
        ${this.albumError ? html`<div class="error">${this.albumError}</div>` : nothing}
        ${this.renderResultSection('Songs', songs, 'play', false, 'album')}
      </div>
    `;
  }

  private renderPlaylistView(): TemplateResult {
    const playlist = this.selectedPlaylist;
    const image = playlist?.image || playlist?.thumb || '';
    const playlistName = playlist?.name ?? this.query;

    return html`
      <div class="results">
        <div class="artist-header">
          <div
            class="result-art"
            style=${image ? `background-image: url("${image}")` : ''}
          ></div>
          <div class="result-main">
            <span class="result-name">${playlistName}</span>
            <span class="result-sub">Playlist</span>
          </div>
          ${playlist
            ? html`
                <button
                  class="small-action"
                  ?disabled=${this.playbackPending}
                  @click=${() => this.playSearchResult(playlist, 'play')}
                >
                  Play Playlist
                </button>
              `
            : nothing}
          <button class="small-action" @click=${() => {
            this.browserView = 'results';
            this.selectedPlaylist = undefined;
            this.playlistTracks = [];
            this.playlistError = '';
          }}>
            Back
          </button>
        </div>
        ${this.playlistLoading ? html`<div class="hint">Loading playlist tracks...</div>` : nothing}
        ${this.playlistError ? html`<div class="error">${this.playlistError}</div>` : nothing}
        ${this.renderResultSection('Songs', this.playlistTracks, 'play', false, 'playlist')}
      </div>
    `;
  }

  private renderSpeakers(): TemplateResult {
    return html`
      <section class="speakers">
        ${this.renderCurrentGroup()}
        ${this.renderGrouping()}
        <button
          class="section-toggle"
          @click=${() => {
            this.showVolumeMixer = !this.showVolumeMixer;
          }}
        >
          <span>Speaker Volumes</span>
          <ha-icon .icon=${this.showVolumeMixer ? 'mdi:chevron-up' : 'mdi:chevron-down'}></ha-icon>
        </button>
        ${this.showVolumeMixer
          ? html`
              <div class="speaker-list">
                ${this.allPlayers.map((player) => {
                  const unavailable = isUnavailable(player);
                  const volume = Math.round(toNumber(player.attributes.volume_level, 0) * 100);

                  return html`
                    <div class="speaker-row">
                      <span class="speaker-name">
                        ${player.attributes.friendly_name ??
                        titleCase(player.entity_id.split('.')[1])}
                      </span>
                      <button
                        class="icon-button"
                        ?disabled=${unavailable}
                        @click=${() => this.togglePlayerMute(player.entity_id)}
                      >
                        <ha-icon .icon=${player.attributes.is_volume_muted ? 'mdi:volume-off' : 'mdi:volume-high'}></ha-icon>
                      </button>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        .value=${String(volume)}
                        ?disabled=${unavailable}
                        @change=${(event: Event) =>
                          this.setPlayerVolume(
                            player.entity_id,
                            (event.target as HTMLInputElement).value,
                          )}
                      />
                      <span class="state">${volume}%</span>
                    </div>
                  `;
                })}
              </div>
            `
          : nothing}
      </section>
    `;
  }

  private renderResults(): TemplateResult {
    return html`
      <div class="results">
        ${this.renderResultSection('Artists', this.itemsByType('artist'), 'artist')}
        ${this.renderResultSection('Albums', this.itemsByType('album'), 'album')}
        ${this.renderResultSection('Songs', this.itemsByType('track'))}
        ${this.renderResultSection('Playlists', this.itemsByType('playlist'), 'playlist')}
        ${this.renderResultSection('Radio', this.itemsByType('radio'))}
        ${this.renderResultSection('Podcasts', this.itemsByType('podcast'))}
      </div>
    `;
  }

  private renderResultItem(
    item: SearchItem,
    action: ResultAction = 'play',
    context: ResultContext = 'search',
  ): TemplateResult {
    const artist =
      item.artist ||
      item.artists?.map((entry) => entry.name).filter(Boolean).join(', ') ||
      item.album?.name ||
      item.media_type ||
      item.type ||
      '';
    const image = item.image || item.thumb || item.album?.image || '';
    const favorite = this.isFavorite(item);
    const playNow = () => this.playSearchResult(item, 'play', {
      startRadio: this.shouldStartRadioForContext(item, context),
    });
    const openItem = action === 'artist'
      ? () => this.openArtist(item)
      : action === 'album'
        ? () => this.openAlbum(item)
        : action === 'playlist'
          ? () => this.openPlaylist(item)
          : playNow;

    return html`
      <div class="result clickable" @click=${openItem}>
        <div
          class="result-art"
          style=${image ? `background-image: url("${image}")` : ''}
        ></div>
        <div class="result-main">
          <span class="result-name">${item.name ?? item.uri ?? 'Untitled'}</span>
          <span class="result-sub">${artist}</span>
        </div>
        <span class="result-actions">
          <button
            class="favorite-toggle ${favorite ? 'active' : ''}"
            title=${favorite ? 'Remove favorite' : 'Favorite'}
            @click=${(event: Event) => {
              event.stopPropagation();
              this.toggleFavorite(item);
            }}
          >
            <ha-icon .icon=${favorite ? 'mdi:star' : 'mdi:star-outline'}></ha-icon>
          </button>
          ${action === 'artist' || action === 'album' || action === 'playlist'
            ? nothing
            : html`
                <button
                  class="now"
                  ?disabled=${this.playbackPending}
                  @click=${(event: Event) => {
                    event.stopPropagation();
                    playNow();
                  }}
                >
                  Now
                </button>
                <button
                  ?disabled=${this.playbackPending}
                  @click=${(event: Event) => {
                    event.stopPropagation();
                    this.queueSearchResult(item);
                  }}
                >
                  Next
                </button>
              `}
        </span>
      </div>
    `;
  }

  private renderQueueItem(item: SearchItem): TemplateResult {
    const artist =
      item.artist ||
      item.artists?.map((entry) => entry.name).filter(Boolean).join(', ') ||
      item.album?.name ||
      item.media_type ||
      item.type ||
      '';
    const image = item.image || item.thumb || item.album?.image || '';

    return html`
      <div class="result clickable" @click=${() => this.playQueueItem(item)}>
        <div
          class="result-art"
          style=${image ? `background-image: url("${image}")` : ''}
        ></div>
        <div class="result-main">
          <span class="result-name">${item.name ?? item.uri ?? 'Untitled'}</span>
          <span class="result-sub">${artist}</span>
        </div>
        ${item.uri
          ? html`
              <span class="result-actions">
                <button
                  class="now"
                  ?disabled=${this.playbackPending}
                  @click=${(event: Event) => {
                    event.stopPropagation();
                    this.playQueueItem(item);
                  }}
                >
                  Play
                </button>
              </span>
            `
          : nothing}
      </div>
    `;
  }

  protected render(): TemplateResult {
    if (!this.config) {
      return html``;
    }

    const player = this.playbackPlayer;
    const controlPlayer = this.activePlayer;
    const memory = this.activeMemory;
    const unavailable = isUnavailable(controlPlayer);
    const cover = this.artworkUrl ? `url("${this.artworkUrl}")` : 'none';
    const title = player?.attributes.media_title || memory?.title || 'No music selected';
    const artist =
      player?.attributes.media_artist ||
      player?.attributes.media_album_name ||
      player?.attributes.source ||
      memory?.artist ||
      'Ready';

    return html`
      <ha-card>
        <div
          class="player ${this.config.compact ? 'compact' : ''} ${this.isPlaying
            ? 'playing'
            : ''} ${this.playbackPending || this.transportPending
            ? 'pending'
            : ''} ${this.activeTab === 'now'
            ? 'now-active'
            : ''}"
          style="
            --gamma-sonos-cover: ${cover};
            --gamma-sonos-artwork: ${cover};
          "
        >
          <div class="topbar">
            ${this.renderHeaderIdentity()}
            ${this.renderTopControls(unavailable, player)}
          </div>
          ${this.renderRooms()}
          ${this.renderMiniPlayer(title, artist, unavailable)}
          <div class="volume-row">
            <button class="icon-button" ?disabled=${unavailable} @click=${this.toggleMute}>
              <ha-icon .icon=${(this.isPlaying ? this.playbackPlayer : this.activePlayer)?.attributes.is_volume_muted ? 'mdi:volume-off' : 'mdi:volume-high'}></ha-icon>
            </button>
            <input
              type="range"
              min="0"
              max="100"
              .value=${String(this.volume)}
              ?disabled=${unavailable}
              @change=${(event: Event) => this.setVolume((event.target as HTMLInputElement).value)}
            />
            <span class="state">${this.volume}%</span>
          </div>
	          ${this.renderTabs()}
	          ${this.activeTab === 'now'
	            ? this.renderNowPlaying(title, artist, unavailable)
	            : this.activeTab === 'search'
	              ? this.renderSearch()
	              : this.activeTab === 'queue'
	                ? this.renderQueue()
	                : this.renderSpeakers()}
        </div>
      </ha-card>
    `;
  }
}

if (!customElements.get('gamma-sonos-player-card')) {
  customElements.define('gamma-sonos-player-card', GammaSonosPlayerCard);
}

class GammaSonosPlayerCardEditor extends LitElement {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
  };

  public hass?: HomeAssistant;
  private config: Partial<GammaSonosPlayerConfig> = {};

  static get styles(): CSSResultGroup {
    return css`
      .editor {
        display: grid;
        gap: 14px;
      }

      .section {
        background: color-mix(in srgb, var(--primary-text-color) 4%, transparent);
        border: 1px solid color-mix(in srgb, var(--divider-color) 72%, transparent);
        border-radius: 10px;
        display: grid;
        gap: 10px;
        padding: 14px;
      }

      .grid {
        display: grid;
        gap: 10px;
        grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
      }

      .switch-row {
        align-items: center;
        color: var(--primary-text-color);
        display: inline-flex;
        gap: 8px;
        min-height: 34px;
      }

      ha-selector,
      ha-textfield,
      ha-select {
        width: 100%;
      }

      h3 {
        color: var(--primary-text-color);
        font-size: 15px;
        font-weight: 600;
        letter-spacing: 0;
        margin: 0;
      }
    `;
  }

  public setConfig(config: GammaSonosPlayerConfig): void {
    this.config = { ...config };
  }

  private updateConfig(patch: Partial<GammaSonosPlayerConfig>): void {
    const next = { ...this.config, ...patch };
    Object.keys(next).forEach((key) => {
      const typedKey = key as keyof GammaSonosPlayerConfig;
      if (next[typedKey] === '') {
        delete next[typedKey];
      }
    });
    this.config = next;
    fireConfigChanged(this, next);
  }

  private valueChanged(event: Event): void {
    const target = event.target as ConfigElement;
    const customEvent = event as CustomEvent<{ value?: unknown }>;

    if (!target.configValue) {
      return;
    }

    this.updateConfig({
      [target.configValue]:
        target.checked !== undefined
          ? target.checked
          : customEvent.detail?.value ?? target.value,
    } as Partial<GammaSonosPlayerConfig>);
  }

  private renderEntityPicker(
    label: string,
    key: keyof GammaSonosPlayerConfig,
    multiple = false,
  ): TemplateResult {
    return html`
      <ha-selector
        .hass=${this.hass}
        .label=${label}
        .selector=${{ entity: { domain: 'media_player', multiple } }}
        .value=${this.config[key] ?? (multiple ? [] : '')}
        .configValue=${key}
        @value-changed=${this.valueChanged}
      ></ha-selector>
    `;
  }

  private renderTextInput(
    label: string,
    key: keyof GammaSonosPlayerConfig,
    placeholder = '',
  ): TemplateResult {
    return html`
      <ha-textfield
        .label=${label}
        .placeholder=${placeholder}
        .value=${this.config[key] ?? ''}
        .configValue=${key}
        @input=${this.valueChanged}
      ></ha-textfield>
    `;
  }

  private renderNumberInput(
    label: string,
    key: keyof GammaSonosPlayerConfig,
    placeholder = '',
  ): TemplateResult {
    return html`
      <ha-textfield
        type="number"
        .label=${label}
        .placeholder=${placeholder}
        .value=${this.config[key] ?? ''}
        .configValue=${key}
        @input=${this.valueChanged}
      ></ha-textfield>
    `;
  }

  private renderSwitch(
    label: string,
    key: keyof GammaSonosPlayerConfig,
    defaultValue: boolean,
  ): TemplateResult {
    return html`
      <label class="switch-row">
        <ha-switch
          .checked=${Boolean(this.config[key] ?? defaultValue)}
          .configValue=${key}
          @change=${this.valueChanged}
        ></ha-switch>
        <span>${label}</span>
      </label>
    `;
  }

  private renderSelect(
    label: string,
    key: keyof GammaSonosPlayerConfig,
    options: string[],
    value: string,
  ): TemplateResult {
    return html`
      <ha-select
        .label=${label}
        .value=${this.config[key] ?? value}
        .configValue=${key}
        @selected=${this.valueChanged}
        @closed=${(event: Event) => event.stopPropagation()}
        fixedMenuPosition
        naturalMenuWidth
      >
        ${options.map(
          (option) => html`
            <mwc-list-item .value=${option}>${option}</mwc-list-item>
          `,
        )}
      </ha-select>
    `;
  }

  protected render(): TemplateResult {
    return html`
      <div class="editor">
        <section class="section">
          <h3>Main</h3>
          ${this.renderEntityPicker('Players', 'entities', true)}
          <div class="grid">
            ${this.renderTextInput('Name', 'name', 'Music')}
            ${this.renderTextInput(
              'Music Assistant Config Entry ID',
              'music_assistant_config_entry_id',
              '01KQ...',
            )}
            ${this.renderSelect('Enqueue Mode', 'enqueue_mode', ['play', 'next', 'replace', 'replace_next', 'add'], 'play')}
            ${this.renderNumberInput('Search Limit', 'search_limit', '8')}
          </div>
        </section>

        <section class="section">
          <h3>Layout</h3>
          <div class="grid">
            ${this.renderTextInput('Width', 'width', '100%')}
            ${this.renderTextInput('Height', 'height', 'auto')}
            ${this.renderTextInput('Background', 'background', '#101722')}
            ${this.renderTextInput('Accent Color', 'accent_color', '#39d98a')}
          </div>
          <div class="grid">
            ${this.renderSwitch('Fill Container', 'fill_container', false)}
            ${this.renderSwitch('Compact Layout', 'compact', false)}
            ${this.renderSwitch('Show Search', 'show_search', true)}
            ${this.renderSwitch('Show Grouping', 'show_grouping', true)}
            ${this.renderSwitch('Library Only', 'library_only', false)}
          </div>
        </section>
      </div>
    `;
  }
}

if (!customElements.get('gamma-sonos-player-card-editor')) {
  customElements.define('gamma-sonos-player-card-editor', GammaSonosPlayerCardEditor);
}

declare global {
  interface HTMLElementTagNameMap {
    'gamma-sonos-player-card': GammaSonosPlayerCard;
    'gamma-sonos-player-card-editor': GammaSonosPlayerCardEditor;
  }

  interface Window {
    customCards?: unknown[];
  }
}

window.customCards = window.customCards || [];
window.customCards.push({
  preview: true,
  type: 'gamma-sonos-player-card',
  name: 'Gamma Sonos Player',
  description: 'A Sonos and Music Assistant player card with search and grouping.',
});
