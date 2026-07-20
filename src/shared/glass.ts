import { css } from 'lit';

/**
 * Gamma Glass — shared frosted-glass recipe for all Gamma HA cards.
 * Anchored on the eufy-s1-vacuum-card glass treatment.
 * Cards keep their own state-color glows; these tokens replace base surfaces only.
 */
export const glassTokens = css`
  :host {
    --gamma-glass-blur: blur(22px) saturate(1.35);
    --gamma-glass-bg: linear-gradient(
      145deg,
      color-mix(
        in srgb,
        var(--ha-card-background, var(--card-background-color, #252832)) 48%,
        transparent
      ),
      color-mix(
        in srgb,
        var(--ha-card-background, var(--card-background-color, #11141b)) 28%,
        transparent
      )
    );
    --gamma-glass-border-color: color-mix(
      in srgb,
      var(--primary-text-color) 18%,
      transparent
    );
    --gamma-shadow-drop: 0 18px 46px rgb(0 0 0 / 28%);
    --gamma-shadow-highlight: inset 0 1px 0 rgb(255 255 255 / 10%);
    --gamma-radius: var(--ha-card-border-radius, 16px);
    --gamma-motion-fast: 150ms;
    --gamma-motion: 250ms;
  }

  @supports not (
    (backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))
  ) {
    :host {
      --gamma-glass-blur: none;
      --gamma-glass-bg: linear-gradient(
        145deg,
        color-mix(
          in srgb,
          var(--ha-card-background, var(--card-background-color, #252832)) 96%,
          black 4%
        ),
        color-mix(
          in srgb,
          var(--ha-card-background, var(--card-background-color, #11141b)) 96%,
          black 4%
        )
      );
    }
  }
`;
