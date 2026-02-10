import { Container, Text, TextStyle, TextStyleOptions } from 'pixi.js';

export interface CharacterVariationConfig {
  /** Max rotation in radians (e.g., 0.05 = ~3 degrees) */
  rotationJitter: number;
  /** Scale variation range [min, max] for X axis */
  scaleXRange: [number, number];
  /** Scale variation range [min, max] for Y axis */
  scaleYRange: [number, number];
  /** Letter spacing variation in pixels [-variance, +variance] */
  spacingVariance: number;
  /** Base letter spacing in pixels */
  baseSpacing: number;
  /** Ink density range [min, max] where 1 = full opacity */
  inkDensityRange: [number, number];
  /** Vertical offset variance in pixels */
  yOffsetVariance: number;
}

export const DEFAULT_VARIATION: CharacterVariationConfig = {
  rotationJitter: 0.03,
  scaleXRange: [0.95, 1.05],
  scaleYRange: [0.95, 1.05],
  spacingVariance: 1,
  baseSpacing: 0,
  inkDensityRange: [0.85, 1.0],
  yOffsetVariance: 1,
};

export const HEAVY_VARIATION: CharacterVariationConfig = {
  rotationJitter: 0.08,
  scaleXRange: [0.88, 1.12],
  scaleYRange: [0.9, 1.1],
  spacingVariance: 3,
  baseSpacing: 0,
  inkDensityRange: [0.7, 1.0],
  yOffsetVariance: 2,
};

export const SUBTLE_VARIATION: CharacterVariationConfig = {
  rotationJitter: 0.015,
  scaleXRange: [0.98, 1.02],
  scaleYRange: [0.98, 1.02],
  spacingVariance: 0.5,
  baseSpacing: 0,
  inkDensityRange: [0.92, 1.0],
  yOffsetVariance: 0.5,
};

function randomInRange(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

function randomSign(): number {
  return Math.random() > 0.5 ? 1 : -1;
}

export interface PrintedTextOptions {
  text: string;
  style?: TextStyleOptions;
  variation?: Partial<CharacterVariationConfig>;
  /** Seed for reproducible randomness (optional) */
  seed?: number;
}

/**
 * Seeded random number generator for reproducible results
 */
function seededRandom(seed: number): () => number {
  return () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };
}

/**
 * Creates a container with individually positioned characters
 * that have random print-like imperfections
 */
export function createPrintedText(options: PrintedTextOptions): Container {
  const { text, style = {}, variation = {}, seed } = options;
  const config: CharacterVariationConfig = { ...DEFAULT_VARIATION, ...variation };

  const container = new Container();
  const random = seed !== undefined ? seededRandom(seed) : Math.random.bind(Math);

  const baseStyle = new TextStyle({
    fontFamily: 'Georgia, serif',
    fontSize: 24,
    fill: 0x1a1a1a,
    ...style,
  });

  let xOffset = 0;

  for (const char of text) {
    if (char === ' ') {
      xOffset += (baseStyle.fontSize as number) * 0.35 + config.baseSpacing;
      continue;
    }

    if (char === '\n') {
      // Handle newlines - would need multi-line support
      continue;
    }

    const charText = new Text({ text: char, style: baseStyle });

    // Random rotation
    charText.rotation = randomInRange(-config.rotationJitter, config.rotationJitter);

    // Non-uniform scale
    charText.scale.x = randomInRange(config.scaleXRange[0], config.scaleXRange[1]);
    charText.scale.y = randomInRange(config.scaleYRange[0], config.scaleYRange[1]);

    // Position with variance
    charText.x = xOffset;
    charText.y = randomInRange(-config.yOffsetVariance, config.yOffsetVariance);

    // Set anchor to center for proper rotation
    charText.anchor.set(0.5, 0.5);
    charText.x += charText.width / 2;
    charText.y += (baseStyle.fontSize as number) / 2;

    // Ink density (alpha)
    charText.alpha = randomInRange(config.inkDensityRange[0], config.inkDensityRange[1]);

    container.addChild(charText);

    // Advance position with spacing variance
    const spacing = config.baseSpacing + randomInRange(-config.spacingVariance, config.spacingVariance);
    xOffset += charText.width + spacing;
  }

  return container;
}

/**
 * Creates multi-line printed text with variations
 */
export function createPrintedParagraph(options: PrintedTextOptions & { lineHeight?: number }): Container {
  const { text, lineHeight = 1.4, ...rest } = options;
  const lines = text.split('\n');
  const container = new Container();

  const style = new TextStyle({
    fontFamily: 'Georgia, serif',
    fontSize: 24,
    fill: 0x1a1a1a,
    ...rest.style,
  });

  const lineSpacing = (style.fontSize as number) * lineHeight;

  lines.forEach((line, index) => {
    const lineContainer = createPrintedText({ ...rest, text: line });
    lineContainer.y = index * lineSpacing;
    container.addChild(lineContainer);
  });

  return container;
}

/**
 * Font weight simulation through scale and alpha
 */
export interface FontWeightVariation {
  scaleMultiplier: number;
  alphaMultiplier: number;
}

export const FONT_WEIGHTS: Record<string, FontWeightVariation> = {
  light: { scaleMultiplier: 0.95, alphaMultiplier: 0.85 },
  regular: { scaleMultiplier: 1.0, alphaMultiplier: 1.0 },
  bold: { scaleMultiplier: 1.05, alphaMultiplier: 1.0 },
  heavy: { scaleMultiplier: 1.1, alphaMultiplier: 1.0 },
};
