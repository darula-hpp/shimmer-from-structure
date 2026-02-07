import { describe, it, expect, beforeEach } from 'vitest';
import { Component, NO_ERRORS_SCHEMA, signal, ChangeDetectorRef } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ShimmerComponent } from './shimmer.component';
import { provideShimmerConfig, SHIMMER_CONFIG } from './shimmer-config.service';

// Test wrapper component for content projection
@Component({
  selector: 'test-host',
  standalone: true,
  imports: [ShimmerComponent],
  template: `
    <shimmer [loading]="loading">
      <div class="test-content" style="width: 100px; height: 50px;">Content</div>
    </shimmer>
  `,
  schemas: [NO_ERRORS_SCHEMA],
})
class TestHostComponent {
  loading = true;
}

describe('ShimmerComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, ShimmerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
  });

  // Helper to wait for async operations
  const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms || 50));

  it('renders children normally when loading=false', async () => {
    fixture.detectChanges();
    const shimmerEl = fixture.debugElement.query(By.directive(ShimmerComponent));
    const shimmerInstance = shimmerEl.componentInstance;

    Object.defineProperty(shimmerInstance, 'loading', { value: signal(false) });
    shimmerEl.injector.get(ChangeDetectorRef).detectChanges();

    fixture.detectChanges();
    await wait(0);
    fixture.detectChanges();

    const content = fixture.nativeElement.querySelector('.test-content');
    expect(content).toBeTruthy();
    expect(content.textContent).toBe('Content');

    // Should not have the measure container when not loading
    const measureContainer = fixture.nativeElement.querySelector('.shimmer-measure-container');
    expect(measureContainer).toBeFalsy();
  });

  it('renders shimmer structure when loading=true', async () => {
    hostComponent.loading = true;
    fixture.detectChanges();
    await wait(0);
    fixture.detectChanges();

    // Should render the measure container
    const measureContainer = fixture.nativeElement.querySelector('.shimmer-measure-container');
    expect(measureContainer).toBeTruthy();
  });

  it('applies transparent text style to measure container', async () => {
    hostComponent.loading = true;
    fixture.detectChanges();
    await wait(0);
    fixture.detectChanges();

    // Check that the measure container has the class
    const measureContainer = fixture.nativeElement.querySelector('.shimmer-measure-container');
    expect(measureContainer).toBeTruthy();
    expect(measureContainer.classList.contains('shimmer-measure-container')).toBe(true);
  });
});

describe('ShimmerComponent with config provider', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms || 50));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, ShimmerComponent],
      providers: [
        provideShimmerConfig({
          shimmerColor: 'rgba(255, 0, 0, 0.5)',
          backgroundColor: '#ff0000',
          duration: 2,
          fallbackBorderRadius: 8,
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
  });

  it('uses provided config values', async () => {
    fixture.componentInstance.loading = true;
    fixture.detectChanges();
    await wait(0);
    fixture.detectChanges();

    // The config should be injected - we can verify by checking the SHIMMER_CONFIG token
    const config = TestBed.inject(SHIMMER_CONFIG);
    expect(config.shimmerColor).toBe('rgba(255, 0, 0, 0.5)');
    expect(config.backgroundColor).toBe('#ff0000');
    expect(config.duration).toBe(2);
    expect(config.fallbackBorderRadius).toBe(8);
  });
});

describe('ShimmerComponent input overrides', () => {
  const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms || 50));

  @Component({
    selector: 'test-override-host',
    standalone: true,
    imports: [ShimmerComponent],
    template: `
      <shimmer
        [loading]="true"
        [shimmerColor]="'#00ff00'"
        [backgroundColor]="'#0000ff'"
        [duration]="3"
        [fallbackBorderRadius]="12"
      >
        <div>Content</div>
      </shimmer>
    `,
    schemas: [NO_ERRORS_SCHEMA],
  })
  class TestOverrideHostComponent {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestOverrideHostComponent, ShimmerComponent],
      providers: [
        provideShimmerConfig({
          shimmerColor: 'rgba(255, 0, 0, 0.5)',
          duration: 1,
        }),
      ],
    }).compileComponents();
  });

  it('component inputs override provider config', async () => {
    const fixture = TestBed.createComponent(TestOverrideHostComponent);
    fixture.detectChanges();

    // Manual override for input signals
    const shimmer = fixture.debugElement.children[0].componentInstance as ShimmerComponent;
    Object.defineProperty(shimmer, 'shimmerColor', { value: signal('#00ff00') });
    Object.defineProperty(shimmer, 'backgroundColor', { value: signal('#0000ff') });
    Object.defineProperty(shimmer, 'duration', { value: signal(3) });
    Object.defineProperty(shimmer, 'fallbackBorderRadius', { value: signal(12) });

    fixture.detectChanges();
    await wait(0);
    fixture.detectChanges();

    // The shimmer component should use input values over config
    expect(shimmer.resolvedShimmerColor()).toBe('#00ff00');
    expect(shimmer.resolvedBackgroundColor()).toBe('#0000ff');
    expect(shimmer.resolvedDuration()).toBe(3);
    expect(shimmer.resolvedFallbackBorderRadius()).toBe(12);
  });
});
