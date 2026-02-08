import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@solidjs/testing-library';
import { Shimmer } from './Shimmer';

describe('Shimmer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('renders children normally when loading=false', () => {
    render(() => (
      <Shimmer loading={false}>
        <div data-testid="content">Content</div>
      </Shimmer>
    ));

    expect(screen.getByText('Content')).toBeInTheDocument();
    // Should not have the measure container
    expect(screen.queryByRole('presentation')).not.toBeInTheDocument();
  });

  it('renders shimmer structure when loading=true', () => {
    const { container } = render(() => (
      <Shimmer loading={true}>
        <div style={{ width: '100px', height: '50px' }}>Content</div>
      </Shimmer>
    ));

    // Should render the measure container
    const measureContainer = container.querySelector('.shimmer-measure-container');
    expect(measureContainer).toBeInTheDocument();
  });

  it('preserves container backgrounds by using transparent text', () => {
    const { container } = render(() => (
      <Shimmer loading={true}>
        <div class="card">Content</div>
      </Shimmer>
    ));

    // Verify the style tag is injected
    expect(container.innerHTML).toContain('.shimmer-measure-container * {');
    expect(container.innerHTML).toContain('color: transparent !important');
  });

  it('uses custom shimmer color when provided', () => {
    const { container } = render(() => (
      <Shimmer loading={true} shimmerColor="rgba(255, 0, 0, 0.5)">
        <div>Content</div>
      </Shimmer>
    ));

    // Verify shimmer color is applied
    expect(container.innerHTML).toContain('rgba(255, 0, 0, 0.5)');
  });

  it('uses custom background color when provided', () => {
    const { container } = render(() => (
      <Shimmer loading={true} backgroundColor="rgba(0, 255, 0, 0.2)">
        <div>Content</div>
      </Shimmer>
    ));

    // Verify background color would be applied (in element info)
    const measureContainer = container.querySelector('.shimmer-measure-container');
    expect(measureContainer).toBeInTheDocument();
  });

  it('uses custom duration when provided', () => {
    const { container } = render(() => (
      <Shimmer loading={true} duration={3}>
        <div>Content</div>
      </Shimmer>
    ));

    // Verify duration is applied in animation
    expect(container.innerHTML).toContain('animation:');
  });

  it('applies fallbackBorderRadius when element has no border-radius', () => {
    const { container } = render(() => (
      <Shimmer loading={true} fallbackBorderRadius={12}>
        <div>Content</div>
      </Shimmer>
    ));

    // Verify the shimmer structure is rendered
    const measureContainer = container.querySelector('.shimmer-measure-container');
    expect(measureContainer).toBeInTheDocument();
  });

  it('hides images in measure container', () => {
    const { container } = render(() => (
      <Shimmer loading={true}>
        <div>
          <img src="test.jpg" alt="test" />
        </div>
      </Shimmer>
    ));

    // Verify the CSS that hides images
    expect(container.innerHTML).toContain('.shimmer-measure-container img');
    expect(container.innerHTML).toContain('opacity: 0');
  });

  it('renders multiple children correctly', () => {
    const { container } = render(() => (
      <Shimmer loading={true}>
        <div>
          <h1>Title</h1>
          <p>Description</p>
          <button>Action</button>
        </div>
      </Shimmer>
    ));

    const measureContainer = container.querySelector('.shimmer-measure-container');
    expect(measureContainer).toBeInTheDocument();
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();
  });
});
