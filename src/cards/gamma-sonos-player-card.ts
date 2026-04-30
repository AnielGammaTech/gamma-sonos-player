import { LitElement, css, html, nothing } from 'lit';
import type { CSSResultGroup, TemplateResult } from 'lit';

type EnqueueMode = 'replace' | 'play' | 'next' | 'add';
type MediaType = 'track' | 'album' | 'artist' | 'playlist' | 'radio';
type PanelTab = 'search' | 'speakers';

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

interface GammaSonosPlayerConfig {
  type?: string;
  entities?: string[];
  music_assistant_entities?: string[];
  music_assistant_config_entry_id?: string;
  entity?: string;
  name?: string;
  width?: string;
  height?: string;
  enqueue_mode?: EnqueueMode;
  search_limit?: number;
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
  album?: { name?: string };
  image?: string;
  thumb?: string;
};

const DEFAULT_CONFIG: Required<
  Pick<
    GammaSonosPlayerConfig,
    | 'width'
    | 'height'
    | 'enqueue_mode'
    | 'search_limit'
    | 'show_grouping'
    | 'show_search'
    | 'show_queue_hint'
    | 'background'
    | 'accent_color'
  >
> = {
  width: '420px',
  height: '620px',
  enqueue_mode: 'next',
  search_limit: 8,
  show_grouping: true,
  show_search: true,
  show_queue_hint: true,
  background: '#101722',
  accent_color: '#39d98a',
};

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

function titleCase(value: string): string {
  return value
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
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
    searchResults: { state: true },
    selectedGroupIds: { state: true },
  };

  public hass?: HomeAssistant;
  private config!: GammaSonosPlayerConfig;
  private selectedEntityId = '';
  private activeTab: PanelTab = 'search';
  private query = '';
  private searching = false;
  private searchError = '';
  private searchResults: SearchItem[] = [];
  private selectedGroupIds: string[] = [];

  static get styles(): CSSResultGroup {
    return css`
      :host {
        --gamma-sonos-width: 420px;
        --gamma-sonos-height: 620px;
        --gamma-sonos-background: #101722;
        --gamma-sonos-accent: #39d98a;

        display: block;
        max-width: var(--gamma-sonos-width);
        width: 100%;
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
        display: grid;
        gap: 14px;
        min-height: var(--gamma-sonos-height);
        overflow: hidden;
        padding: 18px;
        position: relative;
        width: 100%;
      }

      .player::before {
        background-image: var(--gamma-sonos-artwork);
        background-position: center;
        background-size: cover;
        content: '';
        filter: blur(28px) saturate(1.2);
        inset: -34px;
        opacity: 0.18;
        position: absolute;
      }

      .player > * {
        position: relative;
        z-index: 1;
      }

      .topbar,
      .rooms,
      .tabs,
      .controls,
      .volume-row,
      .group-row,
      .search-row,
      .result,
      .speaker-row {
        align-items: center;
        display: flex;
      }

      .topbar {
        gap: 10px;
        justify-content: space-between;
      }

      .title {
        display: grid;
        gap: 2px;
        min-width: 0;
      }

      .name {
        font-size: 16px;
        font-weight: 750;
        line-height: 1.1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .state {
        color: var(--secondary-text-color, #b7c0ce);
        font-size: 12px;
        line-height: 1.2;
      }

      .rooms,
      .tabs {
        background: rgb(255 255 255 / 6%);
        border: 1px solid rgb(255 255 255 / 9%);
        border-radius: 999px;
        padding: 3px;
      }

      .rooms {
        gap: 4px;
        overflow-x: auto;
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
        max-width: 250px;
        width: 68%;
      }

      .metadata {
        display: grid;
        gap: 5px;
        text-align: center;
      }

      .track {
        font-size: 22px;
        font-weight: 800;
        line-height: 1.12;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .artist {
        color: var(--secondary-text-color, #b7c0ce);
        font-size: 14px;
        line-height: 1.2;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .controls {
        gap: 14px;
        justify-content: center;
      }

      .icon-button,
      .play-button {
        align-items: center;
        background: rgb(255 255 255 / 7%);
        border: 1px solid rgb(255 255 255 / 10%);
        border-radius: 999px;
        display: inline-flex;
        justify-content: center;
      }

      .icon-button {
        height: 44px;
        width: 44px;
      }

      .play-button {
        background:
          radial-gradient(circle, color-mix(in srgb, var(--gamma-sonos-accent) 24%, transparent), transparent 74%),
          rgb(255 255 255 / 8%);
        box-shadow: 0 0 24px color-mix(in srgb, var(--gamma-sonos-accent) 18%, transparent);
        height: 58px;
        width: 58px;
      }

      ha-icon {
        --mdc-icon-size: 22px;
      }

      .play-button ha-icon {
        --mdc-icon-size: 28px;
      }

      .volume-row {
        gap: 10px;
      }

      input[type='range'] {
        accent-color: var(--gamma-sonos-accent);
        flex: 1;
      }

      .tabs {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .grouping,
      .search,
      .speakers {
        display: grid;
        gap: 10px;
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
        gap: 8px;
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .group-chip {
        background: rgb(255 255 255 / 6%);
        border: 1px solid rgb(255 255 255 / 10%);
        border-radius: 14px;
        color: var(--secondary-text-color, #b7c0ce);
        display: inline-grid;
        font-size: 12px;
        font-weight: 700;
        gap: 3px;
        grid-template-columns: auto minmax(0, 1fr);
        min-height: 48px;
        padding: 8px 10px;
        text-align: left;
      }

      .group-check {
        align-items: center;
        background: rgb(255 255 255 / 7%);
        border: 1px solid rgb(255 255 255 / 12%);
        border-radius: 999px;
        display: inline-flex;
        height: 22px;
        justify-content: center;
        width: 22px;
      }

      .group-chip.active .group-check {
        background: var(--gamma-sonos-accent);
        color: #06100b;
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
        font-size: 10px;
        font-weight: 750;
        grid-column: 2;
        text-transform: uppercase;
      }

      .group-actions {
        display: grid;
        gap: 8px;
        grid-template-columns: 1fr 1fr;
      }

      .speaker-list {
        display: grid;
        gap: 8px;
      }

      .speaker-row {
        background: rgb(255 255 255 / 5%);
        border: 1px solid rgb(255 255 255 / 8%);
        border-radius: 14px;
        gap: 10px;
        padding: 8px;
      }

      .speaker-name {
        flex: 0 0 112px;
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
        gap: 8px;
        max-height: 156px;
        overflow: auto;
      }

      .result {
        background: rgb(255 255 255 / 5%);
        border: 1px solid rgb(255 255 255 / 8%);
        border-radius: 12px;
        gap: 10px;
        min-width: 0;
        padding: 8px;
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

      .result button {
        background: color-mix(in srgb, var(--gamma-sonos-accent) 16%, transparent);
        border-radius: 999px;
        font-size: 12px;
        font-weight: 750;
        min-height: 30px;
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

  public setConfig(config: GammaSonosPlayerConfig): void {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.selectedEntityId =
      this.config.entity || this.config.entities?.[0] || this.config.music_assistant_entities?.[0] || '';
    this.style.setProperty('--gamma-sonos-width', this.config.width ?? DEFAULT_CONFIG.width);
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

  public getCardSize(): number {
    return 8;
  }

  private get allPlayers(): HassEntity[] {
    const configured = [
      ...(this.config.entities ?? []),
      ...(this.config.music_assistant_entities ?? []),
    ];

    if (configured.length > 0) {
      return configured
        .map((entityId) => this.hass?.states[entityId])
        .filter((entity): entity is HassEntity => Boolean(entity));
    }

    return Object.values(this.hass?.states ?? {})
      .filter((entity): entity is HassEntity => Boolean(entity))
      .filter((entity) => entity.entity_id.startsWith('media_player.'))
      .filter((entity) => {
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
      });
  }

  private get activePlayer(): HassEntity | undefined {
    return (
      this.hass?.states[this.selectedEntityId] ??
      this.allPlayers[0]
    );
  }

  private get activeEntityId(): string {
    return this.activePlayer?.entity_id ?? this.selectedEntityId;
  }

  private get activeName(): string {
    return this.activePlayer?.attributes.friendly_name ?? this.activeEntityId;
  }

  private get artworkUrl(): string {
    return String(
      this.activePlayer?.attributes.entity_picture ||
        this.activePlayer?.attributes.entity_picture_local ||
        this.activePlayer?.attributes.media_image_url ||
        '',
    );
  }

  private get isPlaying(): boolean {
    return this.activePlayer?.state === 'playing';
  }

  private get volume(): number {
    return Math.round(toNumber(this.activePlayer?.attributes.volume_level, 0) * 100);
  }

  private get groupMembers(): string[] {
    const members = this.activePlayer?.attributes.group_members;
    return Array.isArray(members) ? members : [this.activeEntityId].filter(Boolean);
  }

  private service(domain: string, service: string, data?: Record<string, unknown>): void {
    this.hass?.callService(domain, service, data);
  }

  private mediaService(service: string, data: Record<string, unknown> = {}): void {
    if (!this.activeEntityId || isUnavailable(this.activePlayer)) {
      return;
    }

    this.service('media_player', service, {
      entity_id: this.activeEntityId,
      ...data,
    });
  }

  private playPause(): void {
    this.mediaService(this.isPlaying ? 'media_pause' : 'media_play');
  }

  private setVolume(value: string): void {
    this.setPlayerVolume(this.activeEntityId, value);
  }

  private setPlayerVolume(entityId: string, value: string): void {
    if (!entityId) {
      return;
    }

    this.service('media_player', 'volume_set', {
      entity_id: entityId,
      volume_level: Math.max(0, Math.min(1, Number(value) / 100)),
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
      entity_id: entityId,
      is_volume_muted: !player.attributes.is_volume_muted,
    });
  }

  private toggleGroupSelection(entityId: string): void {
    if (this.selectedGroupIds.includes(entityId)) {
      this.selectedGroupIds = this.selectedGroupIds.filter((id) => id !== entityId);
      return;
    }

    this.selectedGroupIds = [...this.selectedGroupIds, entityId];
  }

  private groupSelected(): void {
    if (!this.activeEntityId || this.selectedGroupIds.length === 0) {
      return;
    }

    this.service('media_player', 'join', {
      entity_id: this.activeEntityId,
      group_members: this.selectedGroupIds.filter((id) => id !== this.activeEntityId),
    });
  }

  private ungroupActive(): void {
    this.mediaService('unjoin');
    this.selectedGroupIds = [];
  }

  private async searchMusicAssistant(): Promise<void> {
    const name = this.query.trim();

    if (!name || !this.hass?.callWS) {
      if (!this.hass?.callWS) {
        this.searchError = 'This Home Assistant frontend does not expose service responses here.';
      }
      return;
    }

    this.searching = true;
    this.searchError = '';

    try {
      if (!this.config.music_assistant_config_entry_id) {
        this.searchError = 'Add music_assistant_config_entry_id to this card config.';
        return;
      }

      const response = await this.hass.callWS<Record<string, unknown>>({
        type: 'call_service',
        domain: 'music_assistant',
        service: 'search',
        service_data: {
          config_entry_id: this.config.music_assistant_config_entry_id,
          name,
          media_type: ['track', 'album', 'artist', 'playlist'],
          limit: toNumber(this.config.search_limit, DEFAULT_CONFIG.search_limit),
        },
        return_response: true,
      });
      this.searchResults = this.extractSearchResults(response);
    } catch (error) {
      this.searchError = error instanceof Error ? error.message : 'Search failed';
    } finally {
      this.searching = false;
    }
  }

  private extractSearchResults(response: Record<string, unknown>): SearchItem[] {
    const serviceResponse = response.response as Record<string, unknown> | undefined;
    const source = serviceResponse ?? response;
    const buckets = ['tracks', 'albums', 'artists', 'playlists'];
    const items: SearchItem[] = [];

    buckets.forEach((bucket) => {
      const value = source[bucket];
      if (Array.isArray(value)) {
        value.forEach((item) => {
          if (typeof item === 'object' && item) {
            items.push({
              ...(item as SearchItem),
              media_type: (bucket === 'tracks' ? 'track' : bucket.slice(0, -1)) as MediaType,
            });
          }
        });
      }
    });

    return items.slice(0, toNumber(this.config.search_limit, DEFAULT_CONFIG.search_limit));
  }

  private playSearchResult(item: SearchItem): void {
    const mediaId = item.uri || item.name;

    if (!mediaId) {
      return;
    }

    this.service('music_assistant', 'play_media', {
      entity_id: this.activeEntityId,
      media_id: mediaId,
      media_type: item.media_type || item.type,
      enqueue: this.config.enqueue_mode ?? DEFAULT_CONFIG.enqueue_mode,
    });
  }

  private renderRooms(): TemplateResult | typeof nothing {
    const players = this.allPlayers;

    if (players.length < 2) {
      return nothing;
    }

    return html`
      <div class="rooms" aria-label="Players">
        ${players.map(
          (player) => html`
            <button
              class="room ${player.entity_id === this.activeEntityId ? 'active' : ''}"
              @click=${() => {
                this.selectedEntityId = player.entity_id;
                const members = player.attributes.group_members;
                this.selectedGroupIds = Array.isArray(members) ? [...members] : [player.entity_id];
              }}
            >
              ${player.attributes.friendly_name ?? titleCase(player.entity_id.split('.')[1])}
            </button>
          `,
        )}
      </div>
    `;
  }

  private renderGrouping(): TemplateResult | typeof nothing {
    if (!this.config.show_grouping || this.allPlayers.length < 2) {
      return nothing;
    }

    return html`
      <section class="grouping">
        <span class="section-title">Select Speakers To Group With ${this.activeName}</span>
        <div class="group-row">
          ${this.allPlayers.map((player) => {
            const selected =
              this.selectedGroupIds.includes(player.entity_id) ||
              this.groupMembers.includes(player.entity_id);
            const isAnchor = player.entity_id === this.activeEntityId;

            return html`
              <button
                class="group-chip ${selected ? 'active' : ''}"
                ?disabled=${isAnchor}
                @click=${() => this.toggleGroupSelection(player.entity_id)}
              >
                <span class="group-check">${selected ? '✓' : ''}</span>
                <span class="group-name">
                  ${player.attributes.friendly_name ?? titleCase(player.entity_id.split('.')[1])}
                </span>
                <span class="group-status">${isAnchor ? 'Main speaker' : selected ? 'Selected' : 'Tap to select'}</span>
              </button>
            `;
          })}
        </div>
        <div class="group-actions">
          <button
            class="group-chip active"
            ?disabled=${this.selectedGroupIds.filter((id) => id !== this.activeEntityId).length === 0}
            @click=${this.groupSelected}
          >
            <span class="group-check">+</span>
            <span class="group-name">
              Group ${this.selectedGroupIds.filter((id) => id !== this.activeEntityId).length} Speakers
            </span>
            <span class="group-status">Apply selection</span>
          </button>
          <button class="group-chip" @click=${this.ungroupActive}>
            <span class="group-check">×</span>
            <span class="group-name">Ungroup Current</span>
            <span class="group-status">Break group</span>
          </button>
        </div>
      </section>
    `;
  }

  private renderTabs(): TemplateResult {
    return html`
      <div class="tabs" aria-label="Player panels">
        <button
          class=${this.activeTab === 'search' ? 'active' : ''}
          @click=${() => {
            this.activeTab = 'search';
          }}
        >
          Search
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
        ${this.searchError ? html`<div class="error">${this.searchError}</div>` : nothing}
        ${this.searching ? html`<div class="hint">Searching...</div>` : nothing}
        ${this.searchResults.length > 0 ? this.renderResults() : nothing}
        ${this.config.show_queue_hint
          ? html`<div class="hint">Tap a result to add it next with Music Assistant.</div>`
          : nothing}
      </section>
    `;
  }

  private renderSpeakers(): TemplateResult {
    return html`
      <section class="speakers">
        ${this.renderGrouping()}
        <span class="section-title">Speaker Volume</span>
        <div class="speaker-list">
          ${this.allPlayers.map((player) => {
            const unavailable = isUnavailable(player);
            const volume = Math.round(toNumber(player.attributes.volume_level, 0) * 100);

            return html`
              <div class="speaker-row">
                <span class="speaker-name">
                  ${player.attributes.friendly_name ?? titleCase(player.entity_id.split('.')[1])}
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
      </section>
    `;
  }

  private renderResults(): TemplateResult {
    return html`
      <div class="results">
        ${this.searchResults.map((item) => {
          const artist =
            item.artist ||
            item.artists?.map((entry) => entry.name).filter(Boolean).join(', ') ||
            item.album?.name ||
            item.media_type ||
            item.type ||
            '';

          return html`
            <div class="result">
              <div class="result-main">
                <span class="result-name">${item.name ?? item.uri ?? 'Untitled'}</span>
                <span class="result-sub">${artist}</span>
              </div>
              <button @click=${() => this.playSearchResult(item)}>Next</button>
            </div>
          `;
        })}
      </div>
    `;
  }

  protected render(): TemplateResult {
    if (!this.config) {
      return html``;
    }

    const player = this.activePlayer;
    const unavailable = isUnavailable(player);
    const cover = this.artworkUrl ? `url("${this.artworkUrl}")` : 'none';
    const title = player?.attributes.media_title || 'No music selected';
    const artist =
      player?.attributes.media_artist ||
      player?.attributes.media_album_name ||
      player?.attributes.source ||
      'Ready';

    return html`
      <ha-card>
        <div
          class="player"
          style="
            --gamma-sonos-cover: ${cover};
            --gamma-sonos-artwork: ${cover};
          "
        >
          <div class="topbar">
            <div class="title">
              <span class="name">${this.config.name || this.activeName || 'Sonos'}</span>
              <span class="state">${unavailable ? 'Unavailable' : titleCase(player?.state ?? 'idle')}</span>
            </div>
          </div>
          ${this.renderRooms()}
          <div class="artwork" aria-label="Artwork"></div>
          <div class="metadata">
            <span class="track">${title}</span>
            <span class="artist">${artist}</span>
          </div>
          <div class="controls">
            <button class="icon-button" ?disabled=${unavailable} @click=${() => this.mediaService('media_previous_track')}>
              <ha-icon .icon=${'mdi:skip-previous'}></ha-icon>
            </button>
            <button class="play-button" ?disabled=${unavailable} @click=${this.playPause}>
              <ha-icon .icon=${this.isPlaying ? 'mdi:pause' : 'mdi:play'}></ha-icon>
            </button>
            <button class="icon-button" ?disabled=${unavailable} @click=${() => this.mediaService('media_next_track')}>
              <ha-icon .icon=${'mdi:skip-next'}></ha-icon>
            </button>
          </div>
          <div class="volume-row">
            <button class="icon-button" ?disabled=${unavailable} @click=${this.toggleMute}>
              <ha-icon .icon=${player?.attributes.is_volume_muted ? 'mdi:volume-off' : 'mdi:volume-high'}></ha-icon>
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
          ${this.activeTab === 'search' ? this.renderSearch() : this.renderSpeakers()}
        </div>
      </ha-card>
    `;
  }
}

if (!customElements.get('gamma-sonos-player-card')) {
  customElements.define('gamma-sonos-player-card', GammaSonosPlayerCard);
}

declare global {
  interface HTMLElementTagNameMap {
    'gamma-sonos-player-card': GammaSonosPlayerCard;
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
