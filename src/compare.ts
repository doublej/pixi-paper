import html2canvas from 'html2canvas';
import * as htmlToImage from 'html-to-image';
import { domToPng } from 'modern-screenshot';
import satori from 'satori';
import { html } from 'satori-html';

// Fixed dimensions for fair comparison
const FIXED_WIDTH = 320;
const FIXED_HEIGHT = 200;
const PIXEL_RATIO = window.devicePixelRatio || 1;

const sourceElement = document.getElementById('source-html')!;

console.log(`Device pixel ratio: ${PIXEL_RATIO}`);

interface TestResult {
  name: string;
  time: number;
  success: boolean;
  error?: string;
}

function updateStatus(id: string, result: TestResult) {
  const statusEl = document.getElementById(`status-${id}`)!;
  const timingEl = document.getElementById(`timing-${id}`)!;

  if (result.success) {
    statusEl.className = 'status success';
    statusEl.textContent = 'Success';
    timingEl.textContent = `Render time: ${result.time.toFixed(0)}ms`;
  } else {
    statusEl.className = 'status error';
    statusEl.textContent = 'Error';
    timingEl.textContent = result.error || 'Unknown error';
  }
}

// Test html2canvas
async function testHtml2Canvas(): Promise<TestResult> {
  const start = performance.now();
  const resultEl = document.getElementById('result-html2canvas')!;

  const canvas = await html2canvas(sourceElement, {
    backgroundColor: '#ffffff',
    scale: PIXEL_RATIO,
    useCORS: true,
    logging: false,
  });

  // Scale canvas display size back down (actual pixels = FIXED * PIXEL_RATIO)
  canvas.style.width = `${FIXED_WIDTH}px`;
  canvas.style.height = `${FIXED_HEIGHT}px`;
  resultEl.appendChild(canvas);

  return {
    name: 'html2canvas',
    time: performance.now() - start,
    success: true,
  };
}

// Test html-to-image
async function testHtmlToImage(): Promise<TestResult> {
  const start = performance.now();
  const resultEl = document.getElementById('result-html-to-image')!;

  const dataUrl = await htmlToImage.toPng(sourceElement, {
    quality: 1,
    pixelRatio: PIXEL_RATIO,
  });

  const img = new Image();
  img.src = dataUrl;
  img.style.width = `${FIXED_WIDTH}px`;
  img.style.height = `${FIXED_HEIGHT}px`;
  resultEl.appendChild(img);

  return {
    name: 'html-to-image',
    time: performance.now() - start,
    success: true,
  };
}

// Test modern-screenshot
async function testModernScreenshot(): Promise<TestResult> {
  const start = performance.now();
  const resultEl = document.getElementById('result-modern-screenshot')!;

  const dataUrl = await domToPng(sourceElement, {
    scale: PIXEL_RATIO,
  });

  const img = new Image();
  img.src = dataUrl;
  img.style.width = `${FIXED_WIDTH}px`;
  img.style.height = `${FIXED_HEIGHT}px`;
  resultEl.appendChild(img);

  return {
    name: 'modern-screenshot',
    time: performance.now() - start,
    success: true,
  };
}

// Test Satori (renders at higher res, then SVG scales)
async function testSatori(): Promise<TestResult> {
  const start = performance.now();
  const resultEl = document.getElementById('result-satori')!;

  // Load Inter font
  const fontResponse = await fetch(
    'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff'
  );
  const fontData = await fontResponse.arrayBuffer();

  // Satori renders vector SVG, so we render at display size (SVG scales infinitely)
  const markup = html(`
    <div style="display: flex; flex-direction: column; width: ${FIXED_WIDTH}px; height: ${FIXED_HEIGHT}px; padding: 20px; background: white; border-radius: 8px; font-family: Inter; box-sizing: border-box;">
      <h2 style="margin: 0 0 10px 0; color: #333; font-size: 20px;">Breaking News</h2>
      <p style="margin: 0; color: #666; line-height: 1.5; font-size: 14px;">
        Scientists discover that WebGL shaders can make anything look like
        it was printed on vintage newspaper. Local developers rejoice!
      </p>
      <div style="display: flex; flex-direction: column; margin-top: 15px; padding: 10px; background: #f5f5f5; border-left: 3px solid #4a9eff;">
        <span style="font-size: 14px;"><strong>Quote:</strong> "This changes everything" - Anonymous Dev</span>
      </div>
    </div>
  `);

  const svg = await satori(markup, {
    width: FIXED_WIDTH,
    height: FIXED_HEIGHT,
    fonts: [
      {
        name: 'Inter',
        data: fontData,
        weight: 400,
        style: 'normal',
      },
    ],
  });

  // Convert SVG to high-res image for fair comparison
  const svgBlob = new Blob([svg], { type: 'image/svg+xml' });
  const svgUrl = URL.createObjectURL(svgBlob);

  const img = new Image();
  img.src = svgUrl;
  img.style.width = `${FIXED_WIDTH}px`;
  img.style.height = `${FIXED_HEIGHT}px`;
  await new Promise<void>((resolve) => {
    img.onload = () => resolve();
  });

  resultEl.appendChild(img);
  URL.revokeObjectURL(svgUrl);

  return {
    name: 'satori',
    time: performance.now() - start,
    success: true,
  };
}

// Run all tests
async function runTests() {
  // Clear previous results
  const resultIds = ['html2canvas', 'html-to-image', 'modern-screenshot', 'satori'];
  for (const id of resultIds) {
    const el = document.getElementById(`result-${id}`);
    if (el) el.innerHTML = '';
    const status = document.getElementById(`status-${id}`);
    if (status) {
      status.className = 'status loading';
      status.textContent = 'Rendering...';
    }
    const timing = document.getElementById(`timing-${id}`);
    if (timing) timing.textContent = 'Loading...';
  }

  const tests = [
    { id: 'html2canvas', fn: testHtml2Canvas },
    { id: 'html-to-image', fn: testHtmlToImage },
    { id: 'modern-screenshot', fn: testModernScreenshot },
    { id: 'satori', fn: testSatori },
  ];

  for (const test of tests) {
    try {
      const result = await test.fn();
      updateStatus(test.id, result);
      console.log(`${test.id}: ${result.time.toFixed(0)}ms`);
    } catch (err) {
      const error = err instanceof Error ? err.message : String(err);
      updateStatus(test.id, {
        name: test.id,
        time: 0,
        success: false,
        error,
      });
      console.error(`${test.id} failed:`, err);
    }
  }
}

// Update info displays
document.getElementById('pixel-ratio')!.textContent = `DPR: ${PIXEL_RATIO}`;
document.getElementById('render-size')!.textContent = `Render: ${FIXED_WIDTH}×${FIXED_HEIGHT} @ ${PIXEL_RATIO}x = ${FIXED_WIDTH * PIXEL_RATIO}×${FIXED_HEIGHT * PIXEL_RATIO}px`;

// Zoom control
const zoomSlider = document.getElementById('zoom') as HTMLInputElement;
const zoomValue = document.getElementById('zoom-value')!;
zoomSlider.addEventListener('input', () => {
  const zoom = parseFloat(zoomSlider.value);
  zoomValue.textContent = `${zoom}x`;

  document.querySelectorAll('.comparison-item .result').forEach((el) => {
    (el as HTMLElement).style.transform = `scale(${zoom})`;
    (el as HTMLElement).style.transformOrigin = 'top left';
  });
});

// Re-run button
document.getElementById('btn-rerun')!.addEventListener('click', runTests);

// Diff mode toggle - overlays original on each result for comparison
let diffMode = false;
document.getElementById('btn-toggle-diff')!.addEventListener('click', () => {
  diffMode = !diffMode;
  document.body.classList.toggle('diff-mode', diffMode);

  // Add/remove diff overlays (clone of original) to each result
  const resultContainers = document.querySelectorAll('.comparison-item .result');
  resultContainers.forEach((container, index) => {
    if (index === 0) return; // Skip the original itself

    let overlay = container.querySelector('.diff-overlay') as HTMLElement;

    if (diffMode && !overlay) {
      // Create overlay with clone of original
      overlay = document.createElement('div');
      overlay.className = 'diff-overlay';
      const originalClone = sourceElement.cloneNode(true) as HTMLElement;
      originalClone.style.width = '320px';
      originalClone.style.height = '200px';
      overlay.appendChild(originalClone);
      container.insertBefore(overlay, container.firstChild);
    }
  });
});

runTests();
