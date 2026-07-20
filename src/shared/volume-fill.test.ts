import { describe, expect, it } from 'vitest';
import { volumeFillPercent } from './volume-fill';

describe('volumeFillPercent', () => {
  it('passes through in-range values', () => expect(volumeFillPercent(37)).toBe(37));
  it('accepts numeric strings', () => expect(volumeFillPercent('82')).toBe(82));
  it('clamps below 0', () => expect(volumeFillPercent(-5)).toBe(0));
  it('clamps above 100', () => expect(volumeFillPercent('140')).toBe(100));
  it('rounds fractions', () => expect(volumeFillPercent(49.6)).toBe(50));
  it('returns 0 for junk', () => expect(volumeFillPercent('abc')).toBe(0));
});
