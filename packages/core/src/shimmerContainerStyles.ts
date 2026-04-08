/**
 * CSS styles for the shimmer measure container.
 *
 * Makes all text transparent and hides media elements so only backgrounds
 * and borders are visible during loading — except for elements (and their
 * descendants) marked with data-shimmer-ignore, which remain fully visible.
 */
export const SHIMMER_CONTAINER_STYLES = `
  .shimmer-measure-container *:not([data-shimmer-ignore], [data-shimmer-ignore] *) {
    color: transparent !important;
  }
  .shimmer-measure-container img:not([data-shimmer-ignore], [data-shimmer-ignore] *),
  .shimmer-measure-container svg:not([data-shimmer-ignore], [data-shimmer-ignore] *),
  .shimmer-measure-container video:not([data-shimmer-ignore], [data-shimmer-ignore] *) {
    opacity: 0;
  }
  
  /* Hide backgrounds and borders of children inside data-shimmer-no-children elements */
  .shimmer-measure-container [data-shimmer-no-children] * {
    background: transparent !important;
    border-color: transparent !important;
    box-shadow: none !important;
  }
`;
