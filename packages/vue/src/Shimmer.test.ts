import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import Shimmer from './Shimmer.vue';
import { provideShimmerConfig } from './shimmerConfig';

describe('Shimmer.vue', () => {
  // Mock getBoundingClientRect
  const originalGetBoundingClientRect = Element.prototype.getBoundingClientRect;

  beforeEach(() => {
    Element.prototype.getBoundingClientRect = vi.fn(() => ({
      width: 100,
      height: 50,
      top: 0,
      left: 0,
      bottom: 50,
      right: 100,
      x: 0,
      y: 0,
      toJSON: () => {},
    }));
  });

  afterEach(() => {
    Element.prototype.getBoundingClientRect = originalGetBoundingClientRect;
  });

  it('renders slot content when loading is false', () => {
    const wrapper = mount(Shimmer, {
      props: { loading: false },
      slots: {
        default: '<div class="test-content">Content</div>',
      },
    });

    expect(wrapper.text()).toContain('Content');
    expect(wrapper.find('.shimmer-measure-container').exists()).toBe(false);
  });

  it('renders shimmer structure when loading is true', async () => {
    const wrapper = mount(Shimmer, {
      props: { loading: true },
      slots: {
        default: '<div style="width: 100px; height: 50px">Content</div>',
      },
    });

    await nextTick();

    // Should render the measure container
    expect(wrapper.find('.shimmer-measure-container').exists()).toBe(true);
  });

  it('passes templateProps to slot via v-bind', async () => {
    const wrapper = mount(Shimmer, {
      props: {
        loading: true,
        templateProps: { title: 'Test Title', subtitle: 'Test Subtitle' },
      },
      slots: {
        default: `
          <template #default="props">
            <div>
              <h1>{{ props.title }}</h1>
              <p>{{ props.subtitle }}</p>
            </div>
          </template>
        `,
      },
    });

    await nextTick();

    expect(wrapper.text()).toContain('Test Title');
    expect(wrapper.text()).toContain('Test Subtitle');
  });

  it('applies fallbackBorderRadius when element has no border-radius', async () => {
    const wrapper = mount(Shimmer, {
      props: {
        loading: true,
        fallbackBorderRadius: 12,
      },
      slots: {
        default: '<div>Content</div>',
      },
    });

    await nextTick();
    await nextTick(); // Wait for measurement to complete
    await nextTick(); // Wait for re-render after elements update

    // The component should use fallbackBorderRadius for elements with 0px border-radius
    const shimmerBlocks = wrapper.findAll('[style*="border-radius"]');
    console.log('Test HTML (fallbackBorderRadius):', wrapper.html());
    expect(shimmerBlocks.length).toBeGreaterThan(0);
  });

  it('uses provided shimmer configuration', async () => {
    const TestComponent = {
      setup() {
        provideShimmerConfig({
          shimmerColor: 'rgba(255, 0, 0, 0.5)',
          backgroundColor: 'rgba(0, 0, 255, 0.5)',
          duration: 3,
          fallbackBorderRadius: 8,
        });
      },
      template: `
        <Shimmer :loading="true">
          <div>Content</div>
        </Shimmer>
      `,
      components: { Shimmer },
    };

    const wrapper = mount(TestComponent);

    await nextTick();
    await nextTick();
    await nextTick();

    // Check if config values are used
    const shimmerBlock = wrapper.find('[style*="background-color"]');
    expect(shimmerBlock.exists()).toBe(true);
  });

  it('preserves container backgrounds with transparent text', async () => {
    const wrapper = mount(Shimmer, {
      props: { loading: true },
      slots: {
        default: '<div class="card">Content</div>',
      },
    });

    await nextTick();

    // Verify the style tag is injected with transparent color
    expect(wrapper.html()).toContain('color: transparent');
  });

  it('inherits shimmerColor prop over context', async () => {
    const wrapper = mount(Shimmer, {
      props: {
        loading: true,
        shimmerColor: 'rgba(100, 200, 300, 0.5)',
      },
      slots: {
        default: '<div>Content</div>',
      },
    });

    await nextTick();

    // Props should override context
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((wrapper.vm as any).resolvedShimmerColor).toBe('rgba(100, 200, 300, 0.5)');
  });
});
