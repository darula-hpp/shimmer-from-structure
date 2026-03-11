import { describe, it, expect } from 'vitest';
import { TestBed } from '@angular/core/testing';
import {
  provideShimmerConfig,
  injectShimmerConfig,
  shimmerDefaults,
  SHIMMER_CONFIG,
} from '../shimmer-config.service';

describe('shimmer-config.service', () => {
  describe('shimmerDefaults', () => {
    it('exports default values', () => {
      expect(shimmerDefaults).toBeDefined();
      expect(shimmerDefaults.shimmerColor).toBeDefined();
      expect(shimmerDefaults.backgroundColor).toBeDefined();
      expect(shimmerDefaults.duration).toBeDefined();
      expect(shimmerDefaults.fallbackBorderRadius).toBeDefined();
    });
  });

  describe('provideShimmerConfig', () => {
    it('creates a provider object', () => {
      const config = { shimmerColor: '#fff', duration: 2 };
      const provider = provideShimmerConfig(config);

      expect(provider.provide).toBe(SHIMMER_CONFIG);
      expect(provider.useValue).toBe(config);
    });
  });

  describe('injectShimmerConfig', () => {
    it('returns defaults when no provider is configured', () => {
      TestBed.configureTestingModule({});

      TestBed.runInInjectionContext(() => {
        const config = injectShimmerConfig();

        expect(config.shimmerColor).toBe(shimmerDefaults.shimmerColor);
        expect(config.backgroundColor).toBe(shimmerDefaults.backgroundColor);
        expect(config.duration).toBe(shimmerDefaults.duration);
        expect(config.fallbackBorderRadius).toBe(shimmerDefaults.fallbackBorderRadius);
      });
    });

    it('merges provided config with defaults', () => {
      TestBed.configureTestingModule({
        providers: [
          provideShimmerConfig({
            shimmerColor: 'rgba(255, 255, 255, 0.8)',
            duration: 3,
          }),
        ],
      });

      TestBed.runInInjectionContext(() => {
        const config = injectShimmerConfig();

        expect(config.shimmerColor).toBe('rgba(255, 255, 255, 0.8)');
        expect(config.duration).toBe(3);
        expect(config.backgroundColor).toBe(shimmerDefaults.backgroundColor);
        expect(config.fallbackBorderRadius).toBe(shimmerDefaults.fallbackBorderRadius);
      });
    });

    it('returns fully resolved ShimmerContextValue', () => {
      TestBed.configureTestingModule({
        providers: [
          provideShimmerConfig({
            shimmerColor: '#aaa',
            backgroundColor: '#bbb',
            duration: 1.5,
            fallbackBorderRadius: 10,
          }),
        ],
      });

      TestBed.runInInjectionContext(() => {
        const config = injectShimmerConfig();

        expect(config.shimmerColor).toBe('#aaa');
        expect(config.backgroundColor).toBe('#bbb');
        expect(config.duration).toBe(1.5);
        expect(config.fallbackBorderRadius).toBe(10);
      });
    });
  });
});
