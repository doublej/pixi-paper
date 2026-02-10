import { Filter, GlProgram, GpuProgram } from 'pixi.js';

/** Vertex shader - pass through with UV coordinates */
const vertex = `
  in vec2 aPosition;
  out vec2 vTextureCoord;

  uniform vec4 uInputSize;
  uniform vec4 uOutputFrame;
  uniform vec4 uOutputTexture;

  vec4 filterVertexPosition(void) {
    vec2 position = aPosition * uOutputFrame.zw + uOutputFrame.xy;
    position.x = position.x * (2.0 / uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0 * uOutputTexture.z / uOutputTexture.y) - uOutputTexture.z;
    return vec4(position, 0.0, 1.0);
  }

  vec2 filterTextureCoord(void) {
    return aPosition * (uOutputFrame.zw * uInputSize.zw);
  }

  void main(void) {
    gl_Position = filterVertexPosition();
    vTextureCoord = filterTextureCoord();
  }
`;

/** Fragment shader - the printed paper effect */
const fragment = `
  precision highp float;

  in vec2 vTextureCoord;
  out vec4 finalColor;

  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uPaperGrain;
  uniform float uHalftoneSize;
  uniform float uInkSpread;
  uniform float uAging;
  uniform float uVignette;
  uniform vec2 uResolution;

  // Noise functions for paper texture
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);

    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 4; i++) {
      value += amplitude * noise(p);
      p *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }

  // Halftone pattern (CMYK-style dots)
  float halftone(vec2 uv, float angle, float scale) {
    float s = sin(angle);
    float c = cos(angle);
    vec2 rotatedUV = vec2(
      uv.x * c - uv.y * s,
      uv.x * s + uv.y * c
    );
    vec2 grid = fract(rotatedUV * scale) - 0.5;
    return length(grid);
  }

  // Subtle newspaper-style halftone (grayscale dots, not full CMYK)
  vec3 newspaperHalftone(vec3 color, vec2 uv, float dotSize) {
    // Get luminance for dot sizing
    float luma = dot(color, vec3(0.299, 0.587, 0.114));

    // Single angle halftone pattern (like old newspaper)
    float dot = halftone(uv, 0.785398, dotSize); // 45 degrees

    // Threshold based on luminance - darker areas get bigger dots
    float darkness = 1.0 - luma;
    float dotThreshold = smoothstep(dot - 0.15, dot + 0.15, darkness * 0.4 + 0.1);

    // Apply subtle dot pattern - preserves most of original color
    vec3 result = color * (1.0 - dotThreshold * 0.25);

    // Add slight ink variation for realism
    result -= vec3(dotThreshold * 0.08);

    return result;
  }

  // Ink spread/bleed simulation
  vec3 inkBleed(sampler2D tex, vec2 uv, vec2 resolution, float spread) {
    vec2 texel = 1.0 / resolution;
    vec3 color = vec3(0.0);
    float total = 0.0;

    // Sample in a small radius with distance falloff
    for (float x = -2.0; x <= 2.0; x += 1.0) {
      for (float y = -2.0; y <= 2.0; y += 1.0) {
        float dist = length(vec2(x, y));
        float weight = exp(-dist * dist / (spread * spread + 0.001));
        color += texture(tex, uv + vec2(x, y) * texel * spread).rgb * weight;
        total += weight;
      }
    }

    return color / total;
  }

  void main() {
    vec2 uv = vTextureCoord;
    vec2 pixelCoord = uv * uResolution;

    // Sample original with optional ink bleed
    vec3 original = texture(uTexture, uv).rgb;
    vec3 color = uInkSpread > 0.0
      ? inkBleed(uTexture, uv, uResolution, uInkSpread)
      : original;

    // Apply aging (desaturation + sepia tint)
    float luminance = dot(color, vec3(0.299, 0.587, 0.114));
    vec3 sepia = vec3(
      luminance * 1.07,
      luminance * 0.95,
      luminance * 0.82
    );
    color = mix(color, sepia, uAging * 0.5);

    // Apply subtle halftone effect
    if (uHalftoneSize > 0.0) {
      float dotScale = uResolution.x / (uHalftoneSize * 4.0);
      color = newspaperHalftone(color, uv, dotScale);
    }

    // Paper grain texture
    float grain = fbm(pixelCoord * 0.05);
    grain += noise(pixelCoord * 0.5) * 0.3;
    grain = grain * 0.5 + 0.5;

    // Paper base color (slightly cream/yellow for aged paper)
    vec3 paperColor = mix(
      vec3(0.98, 0.97, 0.94),  // Fresh paper
      vec3(0.95, 0.91, 0.82),  // Aged paper
      uAging
    );

    // Blend color with paper texture
    color = mix(paperColor, color, 0.92);
    color *= mix(1.0, grain, uPaperGrain);

    // Add subtle paper fiber texture
    float fiber = noise(pixelCoord * 2.0 + vec2(uTime * 0.01, 0.0));
    color += (fiber - 0.5) * 0.02 * uPaperGrain;

    // Vignette effect (darker edges like old prints)
    vec2 vignetteUV = uv * 2.0 - 1.0;
    float vignette = 1.0 - dot(vignetteUV, vignetteUV) * uVignette * 0.3;
    color *= vignette;

    // Final contrast adjustment for print look
    color = pow(color, vec3(1.1));
    color = clamp(color, 0.0, 1.0);

    finalColor = vec4(color, texture(uTexture, uv).a);
  }
`;

/** WebGPU shader (WGSL) for modern rendering */
const source = `
  struct GlobalFilterUniforms {
    uInputSize: vec4<f32>,
    uInputPixel: vec4<f32>,
    uInputClamp: vec4<f32>,
    uOutputFrame: vec4<f32>,
    uGlobalFrame: vec4<f32>,
    uOutputTexture: vec4<f32>,
  };

  struct PrintedPaperUniforms {
    uTime: f32,
    uPaperGrain: f32,
    uHalftoneSize: f32,
    uInkSpread: f32,
    uAging: f32,
    uVignette: f32,
    uResolution: vec2<f32>,
  };

  @group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;
  @group(0) @binding(1) var uTexture: texture_2d<f32>;
  @group(0) @binding(2) var uSampler: sampler;
  @group(1) @binding(0) var<uniform> uniforms: PrintedPaperUniforms;

  fn hash(p: vec2<f32>) -> f32 {
    return fract(sin(dot(p, vec2<f32>(127.1, 311.7))) * 43758.5453);
  }

  fn noise(p: vec2<f32>) -> f32 {
    let i = floor(p);
    var f = fract(p);
    f = f * f * (3.0 - 2.0 * f);

    let a = hash(i);
    let b = hash(i + vec2<f32>(1.0, 0.0));
    let c = hash(i + vec2<f32>(0.0, 1.0));
    let d = hash(i + vec2<f32>(1.0, 1.0));

    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  fn fbm(p_in: vec2<f32>) -> f32 {
    var p = p_in;
    var value = 0.0;
    var amplitude = 0.5;
    for (var i = 0; i < 4; i++) {
      value += amplitude * noise(p);
      p *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }

  @fragment
  fn mainFragment(@location(0) uv: vec2<f32>) -> @location(0) vec4<f32> {
    let pixelCoord = uv * uniforms.uResolution;
    var color = textureSample(uTexture, uSampler, uv).rgb;

    // Aging effect
    let luminance = dot(color, vec3<f32>(0.299, 0.587, 0.114));
    let sepia = vec3<f32>(luminance * 1.07, luminance * 0.95, luminance * 0.82);
    color = mix(color, sepia, uniforms.uAging * 0.5);

    // Paper grain
    let grain = fbm(pixelCoord * 0.05) * 0.5 + 0.5;
    let paperColor = mix(
      vec3<f32>(0.98, 0.97, 0.94),
      vec3<f32>(0.95, 0.91, 0.82),
      uniforms.uAging
    );

    color = mix(paperColor, color, 0.92);
    color *= mix(1.0, grain, uniforms.uPaperGrain);

    // Vignette
    let vignetteUV = uv * 2.0 - 1.0;
    let vignette = 1.0 - dot(vignetteUV, vignetteUV) * uniforms.uVignette * 0.3;
    color *= vignette;

    color = pow(color, vec3<f32>(1.1));
    color = clamp(color, vec3<f32>(0.0), vec3<f32>(1.0));

    return vec4<f32>(color, textureSample(uTexture, uSampler, uv).a);
  }
`;

export interface PrintedPaperFilterOptions {
  /** Paper grain intensity (0-1), default 0.3 */
  paperGrain?: number;
  /** Halftone dot size in pixels, 0 = disabled, default 4 */
  halftoneSize?: number;
  /** Ink spread/bleed amount, default 0.5 */
  inkSpread?: number;
  /** Aging effect intensity (0-1), default 0.2 */
  aging?: number;
  /** Vignette intensity (0-1), default 0.3 */
  vignette?: number;
  /** Resolution for effects calculation */
  resolution?: { width: number; height: number };
}

export class PrintedPaperFilter extends Filter {
  public uniforms: {
    uTime: number;
    uPaperGrain: number;
    uHalftoneSize: number;
    uInkSpread: number;
    uAging: number;
    uVignette: number;
    uResolution: Float32Array;
  };

  constructor(options: PrintedPaperFilterOptions = {}) {
    const {
      paperGrain = 0.3,
      halftoneSize = 4,
      inkSpread = 0.5,
      aging = 0.2,
      vignette = 0.3,
      resolution = { width: 800, height: 600 },
    } = options;

    const glProgram = GlProgram.from({
      vertex,
      fragment,
      name: 'printed-paper-filter',
    });

    let gpuProgram: GpuProgram | undefined;

    // Only create GPU program if WebGPU is available
    if (typeof navigator !== 'undefined' && 'gpu' in navigator) {
      gpuProgram = GpuProgram.from({
        vertex: {
          source,
          entryPoint: 'mainVertex',
        },
        fragment: {
          source,
          entryPoint: 'mainFragment',
        },
      });
    }

    super({
      glProgram,
      gpuProgram,
      resources: {
        printedPaperUniforms: {
          uTime: { value: 0, type: 'f32' },
          uPaperGrain: { value: paperGrain, type: 'f32' },
          uHalftoneSize: { value: halftoneSize, type: 'f32' },
          uInkSpread: { value: inkSpread, type: 'f32' },
          uAging: { value: aging, type: 'f32' },
          uVignette: { value: vignette, type: 'f32' },
          uResolution: { value: new Float32Array([resolution.width, resolution.height]), type: 'vec2<f32>' },
        },
      },
    });

    this.uniforms = this.resources.printedPaperUniforms.uniforms;
  }

  get paperGrain(): number {
    return this.uniforms.uPaperGrain;
  }
  set paperGrain(value: number) {
    this.uniforms.uPaperGrain = value;
  }

  get halftoneSize(): number {
    return this.uniforms.uHalftoneSize;
  }
  set halftoneSize(value: number) {
    this.uniforms.uHalftoneSize = value;
  }

  get inkSpread(): number {
    return this.uniforms.uInkSpread;
  }
  set inkSpread(value: number) {
    this.uniforms.uInkSpread = value;
  }

  get aging(): number {
    return this.uniforms.uAging;
  }
  set aging(value: number) {
    this.uniforms.uAging = value;
  }

  get vignette(): number {
    return this.uniforms.uVignette;
  }
  set vignette(value: number) {
    this.uniforms.uVignette = value;
  }

  setResolution(width: number, height: number): void {
    this.uniforms.uResolution[0] = width;
    this.uniforms.uResolution[1] = height;
  }

  /** Update time uniform for animated effects */
  update(deltaTime: number): void {
    this.uniforms.uTime += deltaTime * 0.001;
  }
}
