import {
  Component,
  input,
  signal,
  computed,
  effect,
  ElementRef,
  viewChild,
  AfterViewInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { NgIf, NgFor, isPlatformBrowser } from '@angular/common';
import {
  extractElementInfo,
  createResizeObserver,
  SHIMMER_CONTAINER_STYLES,
  type ElementInfo,
} from '@shimmer-from-structure/core';
import { injectShimmerConfig } from './shimmer-config.service';

/**
 * Shimmer component that creates loading skeleton overlays based on content structure.
 * Automatically measures projected content and creates matching shimmer blocks.
 *
 * @example
 * ```html
 * <shimmer [loading]="isLoading">
 *   <div class="card">
 *     <h2>{{ title }}</h2>
 *     <p>{{ description }}</p>
 *   </div>
 * </shimmer>
 * ```
 */
@Component({
  selector: 'shimmer',
  standalone: true,
  imports: [NgIf, NgFor],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <div style="position: relative;">
      <!-- Always render content -->
      <div
        #measureContainer
        [class.shimmer-measure-container]="loading()"
        [attr.aria-hidden]="loading() ? 'true' : null"
        [style.pointer-events]="loading() ? 'none' : null"
      >
        <ng-content></ng-content>
      </div>

      <!-- Shimmer overlay - only when loading -->
      @if (loading()) {
        <div
          style="
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            overflow: hidden;
            pointer-events: none;
          "
        >
          @for (element of elements(); track $index) {
            <div
              [style.position]="'absolute'"
              [style.left.px]="element.x"
              [style.top.px]="element.y"
              [style.width.px]="element.width"
              [style.height.px]="element.height"
              [style.backgroundColor]="resolvedBackgroundColor()"
              [style.borderRadius]="
                element.borderRadius === '0px'
                  ? resolvedFallbackBorderRadius() + 'px'
                  : element.borderRadius
              "
              [style.overflow]="'hidden'"
            >
              <div
                class="shimmer-animation-element"
                [style.background]="
                  'linear-gradient(90deg, transparent, ' + resolvedShimmerColor() + ', transparent)'
                "
                [style.animationDuration]="resolvedDuration() + 's'"
              ></div>
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: [
    SHIMMER_CONTAINER_STYLES,
    `
      :host {
        display: contents;
      }

      .shimmer-animation-element {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        animation: shimmer-animation 1.5s infinite;
      }

      @keyframes shimmer-animation {
        0% {
          transform: translateX(-100%);
        }
        100% {
          transform: translateX(100%);
        }
      }
    `,
  ],
})
export class ShimmerComponent implements AfterViewInit, OnDestroy {
  // Inputs using Angular signals
  loading = input<boolean>(true);
  shimmerColor = input<string | undefined>(undefined);
  backgroundColor = input<string | undefined>(undefined);
  duration = input<number | undefined>(undefined);
  fallbackBorderRadius = input<number | undefined>(undefined);

  // View child reference
  measureContainer = viewChild<ElementRef<HTMLDivElement>>('measureContainer');

  // Internal state
  elements = signal<ElementInfo[]>([]);

  // Inject dependencies
  private contextConfig = injectShimmerConfig();
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  // Resolved values (props > context > defaults)
  resolvedShimmerColor = computed(() => this.shimmerColor() ?? this.contextConfig.shimmerColor);
  resolvedBackgroundColor = computed(
    () => this.backgroundColor() ?? this.contextConfig.backgroundColor
  );
  resolvedDuration = computed(() => this.duration() ?? this.contextConfig.duration);
  resolvedFallbackBorderRadius = computed(
    () => this.fallbackBorderRadius() ?? this.contextConfig.fallbackBorderRadius
  );

  // Cleanup function for ResizeObserver
  private resizeCleanup: (() => void) | undefined;
  private mutationObserver: MutationObserver | undefined;

  constructor() {
    // Effect to re-measure when loading state changes
    effect((onCleanup) => {
      // Skip effect on server
      if (!this.isBrowser) return;

      const isLoading = this.loading();
      const container = this.measureContainer();

      if (isLoading && container) {
        // Clean up existing observers before setting up new ones
        this.cleanup();

        // Set up observers for this loading session
        this.setupObservers();

        // Defer measurement to next frame to ensure content is rendered
        requestAnimationFrame(() => this.measureElements());
      } else {
        // Cleanup when not loading
        this.cleanup();
      }

      // Cleanup on effect re-run or component destruction
      onCleanup(() => {
        this.cleanup();
      });
    });
  }

  ngAfterViewInit(): void {
    // Effect will handle setup when container becomes available
  }

  ngOnDestroy(): void {
    this.cleanup();
  }

  private setupObservers(): void {
    if (!this.isBrowser) return;

    const container = this.measureContainer()?.nativeElement;
    if (!container) return;

    // Set up ResizeObserver
    this.resizeCleanup = createResizeObserver(container, () => this.measureElements());

    // Set up MutationObserver for content changes
    this.mutationObserver = new MutationObserver(() => {
      if (this.loading()) {
        this.measureElements();
      }
    });

    this.mutationObserver.observe(container, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: false,
    });
  }

  private measureElements(): void {
    if (!this.isBrowser) return;

    const container = this.measureContainer()?.nativeElement;
    if (!container || !this.loading()) return;

    // Temporarily disconnect mutation observer to avoid recursion
    this.mutationObserver?.disconnect();

    const containerRect = container.getBoundingClientRect();
    const extractedElements: ElementInfo[] = [];

    Array.from(container.children).forEach((child) => {
      extractedElements.push(...extractElementInfo(child, containerRect));
    });

    this.elements.set(extractedElements);

    // Reconnect mutation observer
    if (this.mutationObserver && container) {
      this.mutationObserver.observe(container, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: false,
      });
    }
  }

  private cleanup(): void {
    if (this.resizeCleanup) {
      this.resizeCleanup();
      this.resizeCleanup = undefined;
    }
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
      this.mutationObserver = undefined;
    }
  }

  /**
   * Manually trigger re-measurement of elements.
   * Useful when content changes programmatically.
   */
  remeasure(): void {
    if (this.isBrowser) {
      this.measureElements();
    }
  }
}
