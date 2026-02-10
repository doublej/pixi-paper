import html2canvas from 'html2canvas';
import * as htmlToImage from 'html-to-image';
import { domToPng } from 'modern-screenshot';
import satori from 'satori';
import { html } from 'satori-html';

const FIXED_WIDTH = 500;
const FIXED_HEIGHT = 700;
const PIXEL_RATIO = window.devicePixelRatio || 1;

const sourceElement = document.getElementById('source-html')!;
const renderArea = document.getElementById('render-area')!;
const renderedContent = document.getElementById('rendered-content')!;
const originalOverlay = document.getElementById('original-overlay')!;
const currentLabel = document.getElementById('current-label')!;
const viewLabel = document.getElementById('view-label')!;
const infoDpr = document.getElementById('info-dpr')!;
const infoTime = document.getElementById('info-time')!;

interface RenderResult {
  name: string;
  element: HTMLElement | null;
  time: number;
  success: boolean;
  error?: string;
}

const results: RenderResult[] = [];
let currentIndex = 0;
let diffMode = false;

// Update info displays
infoDpr.textContent = `DPR: ${PIXEL_RATIO}`;

// Helper to create a visible clone for rendering (html2canvas needs visible elements)
function createVisibleClone(): HTMLElement {
  const clone = sourceElement.cloneNode(true) as HTMLElement;
  // Keep the ID for CSS styling but override the positioning
  clone.id = 'source-html-clone';
  clone.setAttribute('style', `
    position: fixed !important;
    left: 0 !important;
    top: 0 !important;
    width: ${FIXED_WIDTH}px !important;
    height: ${FIXED_HEIGHT}px !important;
    z-index: 9999 !important;
    pointer-events: none !important;
    visibility: visible !important;
    opacity: 1 !important;
    background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%) !important;
    font-family: 'Inter', sans-serif !important;
    overflow: hidden !important;
    border-radius: 8px !important;
  `);
  document.body.appendChild(clone);
  return clone;
}

// Clone original for overlay
function setupOriginalOverlay() {
  const clone = sourceElement.cloneNode(true) as HTMLElement;
  clone.style.position = 'static';
  clone.style.left = '0';
  clone.style.top = '0';
  clone.style.width = `${FIXED_WIDTH}px`;
  clone.style.height = `${FIXED_HEIGHT}px`;
  originalOverlay.innerHTML = '';
  originalOverlay.appendChild(clone);
}

// Render with html2canvas
async function renderHtml2Canvas(): Promise<RenderResult> {
  const clone = createVisibleClone();
  const start = performance.now();

  const canvas = await html2canvas(clone, {
    backgroundColor: '#ffffff',
    scale: PIXEL_RATIO,
    useCORS: true,
    logging: false,
    width: FIXED_WIDTH,
    height: FIXED_HEIGHT,
  });

  clone.remove();

  canvas.style.width = `${FIXED_WIDTH}px`;
  canvas.style.height = `${FIXED_HEIGHT}px`;

  const container = document.createElement('div');
  container.appendChild(canvas);

  return {
    name: 'html2canvas',
    element: container,
    time: performance.now() - start,
    success: true,
  };
}

// Render with html-to-image
async function renderHtmlToImage(): Promise<RenderResult> {
  const clone = createVisibleClone();
  const start = performance.now();

  const dataUrl = await htmlToImage.toPng(clone, {
    quality: 1,
    pixelRatio: PIXEL_RATIO,
    width: FIXED_WIDTH,
    height: FIXED_HEIGHT,
  });

  clone.remove();

  const img = new Image();
  img.src = dataUrl;
  img.style.width = `${FIXED_WIDTH}px`;
  img.style.height = `${FIXED_HEIGHT}px`;

  const container = document.createElement('div');
  container.appendChild(img);

  return {
    name: 'html-to-image',
    element: container,
    time: performance.now() - start,
    success: true,
  };
}

// Render with modern-screenshot
async function renderModernScreenshot(): Promise<RenderResult> {
  const clone = createVisibleClone();
  const start = performance.now();

  const dataUrl = await domToPng(clone, {
    scale: PIXEL_RATIO,
    width: FIXED_WIDTH,
    height: FIXED_HEIGHT,
  });

  clone.remove();

  const img = new Image();
  img.src = dataUrl;
  img.style.width = `${FIXED_WIDTH}px`;
  img.style.height = `${FIXED_HEIGHT}px`;

  const container = document.createElement('div');
  container.appendChild(img);

  return {
    name: 'modern-screenshot',
    element: container,
    time: performance.now() - start,
    success: true,
  };
}

// Render with Satori (simplified newsletter markup)
async function renderSatori(): Promise<RenderResult> {
  const start = performance.now();

  // Load fonts
  const [interFont, playfairFont] = await Promise.all([
    fetch('https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff').then(r => r.arrayBuffer()),
    fetch('https://fonts.gstatic.com/s/playfairdisplay/v30/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvXDXbtY.woff').then(r => r.arrayBuffer()),
  ]);

  const markup = html(`
    <div style="display: flex; flex-direction: column; width: ${FIXED_WIDTH}px; height: ${FIXED_HEIGHT}px; background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%); font-family: Inter; overflow: hidden; border-radius: 8px;">
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); color: white; padding: 25px; text-align: center;">
        <h1 style="font-family: Playfair Display; font-size: 28px; margin: 0 0 5px 0; letter-spacing: 2px;">THE DAILY PIXEL</h1>
        <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 3px; opacity: 0.7;">Your source for design & tech news</div>
      </div>
      <div style="display: flex; background: #e63946; color: white; padding: 8px 20px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
        November 30, 2024 • Issue #247
      </div>
      <div style="display: flex; align-items: center; justify-content: center; height: 160px; background: linear-gradient(45deg, #667eea 0%, #764ba2 100%); position: relative;">
        <h2 style="font-family: Playfair Display; font-size: 24px; color: white; text-align: center; padding: 0 30px; line-height: 1.3;">WebGL Shaders Transform Digital Publishing Forever</h2>
      </div>
      <div style="display: flex; gap: 20px; padding: 12px 25px; background: #f0f4f8;">
        <div style="display: flex; flex-direction: column; align-items: center; flex: 1;">
          <div style="font-size: 18px; font-weight: 700; color: #1a1a2e;">12.4K</div>
          <div style="font-size: 9px; color: #666; text-transform: uppercase; letter-spacing: 0.5px;">Subscribers</div>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; flex: 1;">
          <div style="font-size: 18px; font-weight: 700; color: #1a1a2e;">847</div>
          <div style="font-size: 9px; color: #666; text-transform: uppercase; letter-spacing: 0.5px;">Articles</div>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; flex: 1;">
          <div style="font-size: 18px; font-weight: 700; color: #1a1a2e;">98%</div>
          <div style="font-size: 9px; color: #666; text-transform: uppercase; letter-spacing: 0.5px;">Open Rate</div>
        </div>
      </div>
      <div style="display: flex; flex-direction: column; flex: 1; padding: 20px 25px; gap: 15px;">
        <div style="display: flex; gap: 15px; padding-bottom: 15px; border-bottom: 1px solid #eee;">
          <div style="display: flex; align-items: center; justify-content: center; width: 80px; height: 80px; border-radius: 8px; background: linear-gradient(135deg, #4a9eff, #0066cc); font-size: 30px; flex-shrink: 0;">⚡</div>
          <div style="display: flex; flex-direction: column;">
            <h3 style="font-size: 14px; font-weight: 600; color: #1a1a2e; margin: 0 0 6px 0; line-height: 1.3;">PixiJS v8 Brings WebGPU Support to the Masses</h3>
            <p style="font-size: 12px; color: #666; margin: 0; line-height: 1.5;">The popular 2D rendering library now supports both WebGL and WebGPU.</p>
            <div style="display: flex; gap: 10px; margin-top: 8px;">
              <span style="font-size: 10px; color: #999; text-transform: uppercase;">5 min read</span>
              <span style="font-size: 10px; color: #999;">•</span>
              <span style="font-size: 10px; color: #999; text-transform: uppercase;">Technology</span>
            </div>
          </div>
        </div>
        <div style="display: flex; gap: 15px; padding-bottom: 15px; border-bottom: 1px solid #eee;">
          <div style="display: flex; align-items: center; justify-content: center; width: 80px; height: 80px; border-radius: 8px; background: linear-gradient(135deg, #2ecc71, #27ae60); font-size: 30px; flex-shrink: 0;">🎨</div>
          <div style="display: flex; flex-direction: column;">
            <h3 style="font-size: 14px; font-weight: 600; color: #1a1a2e; margin: 0 0 6px 0; line-height: 1.3;">CSS Container Queries Change Everything</h3>
            <p style="font-size: 12px; color: #666; margin: 0; line-height: 1.5;">Responsive design gets a major upgrade with native container queries.</p>
            <div style="display: flex; gap: 10px; margin-top: 8px;">
              <span style="font-size: 10px; color: #999; text-transform: uppercase;">3 min read</span>
              <span style="font-size: 10px; color: #999;">•</span>
              <span style="font-size: 10px; color: #999; text-transform: uppercase;">Design</span>
            </div>
          </div>
        </div>
        <div style="display: flex; gap: 15px;">
          <div style="display: flex; align-items: center; justify-content: center; width: 80px; height: 80px; border-radius: 8px; background: linear-gradient(135deg, #f39c12, #e67e22); font-size: 30px; flex-shrink: 0;">🚀</div>
          <div style="display: flex; flex-direction: column;">
            <h3 style="font-size: 14px; font-weight: 600; color: #1a1a2e; margin: 0 0 6px 0; line-height: 1.3;">The Rise of Edge Computing in 2024</h3>
            <p style="font-size: 12px; color: #666; margin: 0; line-height: 1.5;">How edge functions are reshaping modern web applications.</p>
            <div style="display: flex; gap: 10px; margin-top: 8px;">
              <span style="font-size: 10px; color: #999; text-transform: uppercase;">7 min read</span>
              <span style="font-size: 10px; color: #999;">•</span>
              <span style="font-size: 10px; color: #999; text-transform: uppercase;">Infrastructure</span>
            </div>
          </div>
        </div>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center; background: #f8f9fa; padding: 15px 25px; border-top: 1px solid #eee;">
        <div style="display: flex; gap: 10px;">
          <div style="display: flex; align-items: center; justify-content: center; width: 28px; height: 28px; border-radius: 50%; background: #1a1a2e; color: white; font-size: 12px;">𝕏</div>
          <div style="display: flex; align-items: center; justify-content: center; width: 28px; height: 28px; border-radius: 50%; background: #1a1a2e; color: white; font-size: 12px;">in</div>
          <div style="display: flex; align-items: center; justify-content: center; width: 28px; height: 28px; border-radius: 50%; background: #1a1a2e; color: white; font-size: 12px;">▶</div>
        </div>
        <div style="font-size: 10px; color: #999;">© 2024 The Daily Pixel • Unsubscribe</div>
      </div>
    </div>
  `);

  const svg = await satori(markup, {
    width: FIXED_WIDTH,
    height: FIXED_HEIGHT,
    fonts: [
      { name: 'Inter', data: interFont, weight: 400, style: 'normal' },
      { name: 'Inter', data: interFont, weight: 600, style: 'normal' },
      { name: 'Playfair Display', data: playfairFont, weight: 400, style: 'normal' },
      { name: 'Playfair Display', data: playfairFont, weight: 700, style: 'normal' },
    ],
  });

  const svgBlob = new Blob([svg], { type: 'image/svg+xml' });
  const svgUrl = URL.createObjectURL(svgBlob);

  const img = new Image();
  img.src = svgUrl;
  img.style.width = `${FIXED_WIDTH}px`;
  img.style.height = `${FIXED_HEIGHT}px`;

  await new Promise<void>((resolve) => {
    img.onload = () => resolve();
  });

  const container = document.createElement('div');
  container.appendChild(img);

  URL.revokeObjectURL(svgUrl);

  return {
    name: 'Satori',
    element: container,
    time: performance.now() - start,
    success: true,
  };
}

// Show original HTML
function showOriginal(): RenderResult {
  const clone = sourceElement.cloneNode(true) as HTMLElement;
  clone.style.position = 'static';
  clone.style.left = '0';
  clone.style.top = '0';
  clone.style.width = `${FIXED_WIDTH}px`;
  clone.style.height = `${FIXED_HEIGHT}px`;

  const container = document.createElement('div');
  container.appendChild(clone);

  return {
    name: 'Original HTML',
    element: container,
    time: 0,
    success: true,
  };
}

// Display current result
function displayResult(index: number) {
  const result = results[index];
  if (!result) return;

  renderedContent.innerHTML = '';
  if (result.element) {
    renderedContent.appendChild(result.element.cloneNode(true));
  } else if (!result.success) {
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = 'color: #f88; padding: 20px; text-align: center;';
    errorDiv.innerHTML = `<div style="font-size: 18px; margin-bottom: 10px;">❌ Failed</div><div style="font-size: 12px;">${result.error || 'Unknown error'}</div>`;
    renderedContent.appendChild(errorDiv);
  }

  currentLabel.textContent = `${result.name} (${index + 1}/${results.length})`;
  viewLabel.textContent = result.name;

  if (result.time > 0) {
    infoTime.textContent = `Time: ${result.time.toFixed(0)}ms`;
  } else {
    infoTime.textContent = 'Time: -';
  }
}

// Navigation
function navigate(direction: number) {
  currentIndex = (currentIndex + direction + results.length) % results.length;
  displayResult(currentIndex);
}

// Toggle diff mode
function toggleDiff() {
  diffMode = !diffMode;
  document.body.classList.toggle('diff-mode', diffMode);
  document.getElementById('btn-diff')?.classList.toggle('active', diffMode);
}

// Run all renders
async function runAllRenders() {
  results.length = 0;
  currentIndex = 0;

  // Show loading state
  currentLabel.textContent = 'Rendering...';
  renderedContent.innerHTML = '<div style="color: #888; padding: 20px;">Generating all outputs...</div>';

  // Original first
  results.push(showOriginal());

  // Then each library
  const renderers = [
    { name: 'html2canvas', fn: renderHtml2Canvas },
    { name: 'html-to-image', fn: renderHtmlToImage },
    { name: 'modern-screenshot', fn: renderModernScreenshot },
    { name: 'Satori', fn: renderSatori },
  ];

  for (const renderer of renderers) {
    try {
      const result = await renderer.fn();
      results.push(result);
      console.log(`${renderer.name}: ${result.time.toFixed(0)}ms`);
    } catch (err) {
      const error = err instanceof Error ? err.message : String(err);
      results.push({
        name: renderer.name,
        element: null,
        time: 0,
        success: false,
        error,
      });
      console.error(`${renderer.name} failed:`, err);
    }
  }

  // Setup overlay and show first result
  setupOriginalOverlay();
  displayResult(0);
}

// Wire up controls
document.getElementById('btn-prev')?.addEventListener('click', () => navigate(-1));
document.getElementById('btn-next')?.addEventListener('click', () => navigate(1));
document.getElementById('btn-diff')?.addEventListener('click', toggleDiff);
document.getElementById('btn-rerun')?.addEventListener('click', runAllRenders);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') navigate(-1);
  if (e.key === 'ArrowRight') navigate(1);
  if (e.key === 'd') toggleDiff();
});

// Initial run
runAllRenders();
