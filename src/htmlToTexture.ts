import satori from 'satori';
import { html } from 'satori-html';
import { Texture } from 'pixi.js';

/** Font data cache */
let fontDataCache: ArrayBuffer | null = null;

/** Load a font for Satori rendering */
async function loadFont(url: string): Promise<ArrayBuffer> {
  if (fontDataCache) return fontDataCache;

  const response = await fetch(url);
  fontDataCache = await response.arrayBuffer();
  return fontDataCache;
}

/** Default system font URL (Inter from Google Fonts) */
const DEFAULT_FONT_URL = 'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff';

export interface HtmlToTextureOptions {
  /** Width of the output texture */
  width?: number;
  /** Height of the output texture */
  height?: number;
  /** Font URL to load */
  fontUrl?: string;
  /** Font family name */
  fontFamily?: string;
}

/**
 * Convert an HTML string to a PixiJS Texture using Satori
 */
export async function htmlToTexture(
  htmlString: string,
  options: HtmlToTextureOptions = {}
): Promise<Texture> {
  const {
    width = 400,
    height = 300,
    fontUrl = DEFAULT_FONT_URL,
    fontFamily = 'Inter',
  } = options;

  // Load font
  const fontData = await loadFont(fontUrl);

  // Convert HTML string to Satori-compatible markup
  const markup = html(htmlString);

  // Generate SVG using Satori
  const svg = await satori(markup, {
    width,
    height,
    fonts: [
      {
        name: fontFamily,
        data: fontData,
        weight: 400,
        style: 'normal',
      },
    ],
  });

  // Convert SVG to image
  const svgBlob = new Blob([svg], { type: 'image/svg+xml' });
  const svgUrl = URL.createObjectURL(svgBlob);

  // Create image from SVG
  const image = new Image();
  image.src = svgUrl;

  await new Promise<void>((resolve, reject) => {
    image.onload = () => resolve();
    image.onerror = reject;
  });

  // Clean up blob URL
  URL.revokeObjectURL(svgUrl);

  // Create PixiJS texture from image
  return Texture.from(image);
}

/**
 * Convert a DOM element to a PixiJS Texture
 */
export async function domToTexture(
  element: HTMLElement,
  options: HtmlToTextureOptions = {}
): Promise<Texture> {
  // Get computed styles and create inline HTML
  const clone = element.cloneNode(true) as HTMLElement;

  // Inline all computed styles
  inlineStyles(element, clone);

  const htmlString = clone.outerHTML;
  return htmlToTexture(htmlString, options);
}

/**
 * Recursively inline computed styles to an element clone (Satori-compatible)
 */
function inlineStyles(source: Element, target: Element): void {
  const computed = window.getComputedStyle(source);
  const targetEl = target as HTMLElement;

  // Clear existing style and rebuild with Satori-safe properties
  targetEl.removeAttribute('style');

  // Satori-compatible style properties (avoid shorthand like 'border')
  const styleMap: Record<string, string> = {};

  // Colors
  const color = computed.getPropertyValue('color');
  if (color && color !== 'rgb(0, 0, 0)') styleMap['color'] = color;

  const bgColor = computed.getPropertyValue('background-color');
  if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)') styleMap['backgroundColor'] = bgColor;

  // Typography
  styleMap['fontSize'] = computed.getPropertyValue('font-size');
  const fontWeight = computed.getPropertyValue('font-weight');
  if (fontWeight && fontWeight !== '400') styleMap['fontWeight'] = fontWeight;
  styleMap['lineHeight'] = computed.getPropertyValue('line-height');

  // Spacing - convert to individual properties for Satori
  const paddingTop = computed.getPropertyValue('padding-top');
  const paddingRight = computed.getPropertyValue('padding-right');
  const paddingBottom = computed.getPropertyValue('padding-bottom');
  const paddingLeft = computed.getPropertyValue('padding-left');
  if (paddingTop !== '0px') styleMap['paddingTop'] = paddingTop;
  if (paddingRight !== '0px') styleMap['paddingRight'] = paddingRight;
  if (paddingBottom !== '0px') styleMap['paddingBottom'] = paddingBottom;
  if (paddingLeft !== '0px') styleMap['paddingLeft'] = paddingLeft;

  const marginTop = computed.getPropertyValue('margin-top');
  const marginBottom = computed.getPropertyValue('margin-bottom');
  if (marginTop !== '0px') styleMap['marginTop'] = marginTop;
  if (marginBottom !== '0px') styleMap['marginBottom'] = marginBottom;

  // Border (individual properties only)
  const borderLeftWidth = computed.getPropertyValue('border-left-width');
  const borderLeftColor = computed.getPropertyValue('border-left-color');
  if (borderLeftWidth !== '0px') {
    styleMap['borderLeftWidth'] = borderLeftWidth;
    styleMap['borderLeftColor'] = borderLeftColor;
    styleMap['borderLeftStyle'] = 'solid';
  }

  const borderRadius = computed.getPropertyValue('border-radius');
  if (borderRadius !== '0px') styleMap['borderRadius'] = borderRadius;

  // Layout - Satori uses flexbox
  styleMap['display'] = 'flex';
  styleMap['flexDirection'] = 'column';

  // Build style string
  const styleString = Object.entries(styleMap)
    .map(([key, value]) => {
      const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      return `${cssKey}: ${value}`;
    })
    .join('; ');

  if (styleString) {
    targetEl.setAttribute('style', styleString);
  }

  // Recurse into children
  const sourceChildren = source.children;
  const targetChildren = target.children;

  for (let i = 0; i < sourceChildren.length; i++) {
    inlineStyles(sourceChildren[i], targetChildren[i]);
  }
}

/**
 * Create an SVG string from HTML (useful for debugging)
 */
export async function htmlToSvg(
  htmlString: string,
  options: HtmlToTextureOptions = {}
): Promise<string> {
  const {
    width = 400,
    height = 300,
    fontUrl = DEFAULT_FONT_URL,
    fontFamily = 'Inter',
  } = options;

  const fontData = await loadFont(fontUrl);
  const markup = html(htmlString);

  return satori(markup, {
    width,
    height,
    fonts: [
      {
        name: fontFamily,
        data: fontData,
        weight: 400,
        style: 'normal',
      },
    ],
  });
}
