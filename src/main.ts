import { Application, Sprite, Container } from 'pixi.js';
import { PrintedPaperFilter } from './PrintedPaperFilter';
import { domToTexture } from './htmlToTexture';

async function main() {
  // Get source HTML element and measure its actual size
  const sourceElement = document.getElementById('source-html');
  if (!sourceElement) return;

  const rect = sourceElement.getBoundingClientRect();
  const PADDING = 40;
  const WIDTH = Math.ceil(rect.width) + PADDING;
  const HEIGHT = Math.ceil(rect.height) + PADDING;

  // Initialize PixiJS application with size matching the source element
  const app = new Application();

  await app.init({
    width: WIDTH,
    height: HEIGHT,
    backgroundColor: 0xf5f5f5,
    antialias: true,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true,
  });

  // Add canvas to DOM
  const container = document.getElementById('app');
  if (!container) return;
  container.appendChild(app.canvas);

  // Create the printed paper filter with subtle vintage look
  const printedFilter = new PrintedPaperFilter({
    paperGrain: 0.25,
    halftoneSize: 2,
    inkSpread: 0.3,
    aging: 0.35,
    vignette: 0.25,
    resolution: { width: WIDTH, height: HEIGHT },
  });

  // Container for the rendered content
  const contentContainer = new Container();
  app.stage.addChild(contentContainer);

  // State for filter toggle
  let filterEnabled = true;

  // Function to render HTML to the stage
  async function renderHtmlToStage() {
    // Clear previous content
    contentContainer.removeChildren();

    // Get current element dimensions
    const currentRect = sourceElement.getBoundingClientRect();
    const texWidth = Math.ceil(currentRect.width);
    const texHeight = Math.ceil(currentRect.height);

    // Convert DOM to texture using actual element dimensions
    const texture = await domToTexture(sourceElement, {
      width: texWidth,
      height: texHeight,
    });

    // Create sprite from texture
    const sprite = new Sprite(texture);
    sprite.x = PADDING / 2;
    sprite.y = PADDING / 2;

    contentContainer.addChild(sprite);

    // Apply filter
    updateFilter();
  }

  function updateFilter() {
    contentContainer.filters = filterEnabled ? [printedFilter] : [];
  }

  // Initial render
  await renderHtmlToStage();

  // Button handlers
  document.getElementById('btn-refresh')?.addEventListener('click', renderHtmlToStage);

  document.getElementById('btn-toggle-filter')?.addEventListener('click', () => {
    filterEnabled = !filterEnabled;
    updateFilter();
  });

  // Animation loop for time-based effects
  app.ticker.add((ticker) => {
    printedFilter.update(ticker.deltaMS);
  });

  // Log success
  console.log('Pixi Paper initialized successfully');
  console.log('Filter settings:', {
    paperGrain: printedFilter.paperGrain,
    halftoneSize: printedFilter.halftoneSize,
    inkSpread: printedFilter.inkSpread,
    aging: printedFilter.aging,
    vignette: printedFilter.vignette,
  });
}

main();
