<script lang="ts">
  const demos = [
    {
      name: 'Basic Demo',
      href: 'index.html',
      description: 'Single library rendering with Pixi.js canvas effects',
      icon: '◈'
    },
    {
      name: 'Compare View',
      href: 'compare.html',
      description: 'Side-by-side comparison of all 4 libraries with diff mode',
      icon: '⇄'
    },
    {
      name: 'Stress Test',
      href: 'stress.html',
      description: 'Complex layouts, gradients, typography edge cases',
      icon: '✦'
    }
  ];

  const libraries = [
    { name: 'html2canvas', version: 'v1.4.1', icon: '◉' },
    { name: 'html-to-image', version: 'v1.11.11', icon: '◎' },
    { name: 'modern-screenshot', version: 'v4.5.0', icon: '◇' },
    { name: 'Satori', version: 'v0.18.3', icon: '◈' }
  ];

  function copyInstall() {
    navigator.clipboard.writeText('git clone https://github.com/doublej/pixi-paper.git && cd pixi-paper && npm install && npm run dev');
  }
</script>

<svelte:head>
  <title>pixi-paper — HTML to Canvas Screenshot Comparison</title>
  <meta name="description" content="Real-time comparison of html2canvas, html-to-image, modern-screenshot, and Satori for HTML to Canvas/Image conversion" />
</svelte:head>

<div class="noise"></div>

<main>
  <header class="hero">
    <div class="hero-content">
      <span class="pill">Live Benchmarking Suite</span>
      <h1>pixi<span class="highlight">-</span>paper</h1>
      <p class="tagline">
        Real-time comparison of HTML to Canvas/Image screenshot libraries.
        Benchmark rendering quality, performance, and browser compatibility.
      </p>
      <div class="actions">
        <button class="btn-primary" onclick={copyInstall}>
          <span class="btn-icon">↓</span>
          Clone & Run
        </button>
        <a href="https://github.com/doublej/pixi-paper" class="btn-secondary" target="_blank" rel="noopener">
          <span class="btn-icon">⌥</span>
          GitHub
        </a>
      </div>
    </div>
    <div class="hero-visual">
      <div class="canvas-preview">
        <div class="preview-row">
          <div class="preview-item html">HTML</div>
          <div class="preview-arrow">→</div>
          <div class="preview-item canvas">Canvas</div>
          <div class="preview-arrow">→</div>
          <div class="preview-item image">Image</div>
        </div>
      </div>
    </div>
  </header>

  <section class="demos">
    <div class="container">
      <h2>Interactive Demos</h2>
      <p class="section-lead">Run real tests in your browser — no installation required</p>
      <div class="demo-grid">
        {#each demos as demo, i}
          <a href={demo.href} class="demo-card" style="--delay: {i * 0.15}s" target="_blank" rel="noopener">
            <div class="demo-icon">{demo.icon}</div>
            <div class="demo-content">
              <h3>{demo.name}</h3>
              <p>{demo.description}</p>
            </div>
            <div class="demo-arrow">→</div>
          </a>
        {/each}
      </div>
    </div>
  </section>

  <section class="libraries">
    <div class="container">
      <h2>Libraries Compared</h2>
      <div class="lib-grid">
        {#each libraries as lib, i}
          <div class="lib-card" style="--delay: {i * 0.1}s">
            <div class="lib-icon">{lib.icon}</div>
            <div class="lib-info">
              <h3>{lib.name}</h3>
              <span class="lib-version">{lib.version}</span>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <section class="get-started">
    <div class="container">
      <div class="get-started-content">
        <h2>Ready to benchmark?</h2>
        <p>Clone the repository and run the comparison locally</p>
        <div class="install-command">
          <code>git clone https://github.com/doublej/pixi-paper.git && cd pixi-paper && npm install && npm run dev</code>
          <button onclick={copyInstall} aria-label="Copy command">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </section>

  <footer>
    <div class="container">
      <div class="footer-content">
        <a href="https://github.com/doublej/pixi-paper" target="_blank" rel="noopener">GitHub</a>
        <span class="divider">/</span>
        <span class="credits">Built with Pixi.js v8</span>
      </div>
    </div>
  </footer>
</main>

<style>
  :global(body) {
    margin: 0;
    background: #0a0a0a;
    color: #e5e5e5;
    font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
    overflow-x: hidden;
  }

  .noise {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1000;
    opacity: 0.03;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  }

  .container {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 28px;
  }

  /* Hero */
  .hero {
    min-height: 90vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: center;
    padding: 100px 28px;
    position: relative;
  }

  .hero-content {
    animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .pill {
    display: inline-block;
    padding: 6px 14px;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 100px;
    font-size: 0.8rem;
    font-weight: 500;
    letter-spacing: 0.02em;
    color: #888;
    margin-bottom: 24px;
  }

  h1 {
    font-size: clamp(3rem, 8vw, 5rem);
    font-weight: 700;
    letter-spacing: -0.04em;
    margin: 0 0 20px 0;
    line-height: 1;
  }

  h1 .highlight {
    color: #ff4757;
  }

  .tagline {
    font-size: 1.15rem;
    color: #888;
    max-width: 420px;
    margin-bottom: 36px;
    line-height: 1.7;
  }

  .actions {
    display: flex;
    gap: 14px;
  }

  .btn-primary, .btn-secondary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 14px 24px;
    border-radius: 8px;
    font-size: 0.95rem;
    font-weight: 500;
    text-decoration: none;
    transition: all 0.2s ease;
    cursor: pointer;
    border: none;
  }

  .btn-primary {
    background: #ff4757;
    color: white;
  }

  .btn-primary:hover {
    background: #ff6b7a;
    transform: translateY(-1px);
  }

  .btn-secondary {
    background: rgba(255, 255, 255, 0.06);
    color: #e5e5e5;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .btn-secondary:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
  }

  .btn-icon {
    font-size: 1.1rem;
  }

  .hero-visual {
    display: flex;
    justify-content: center;
    align-items: center;
    animation: fadeIn 1s ease-out 0.3s backwards;
  }

  .canvas-preview {
    background: linear-gradient(145deg, #1a1a1a, #0d0d0d);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 20px;
    padding: 40px;
    box-shadow:
      0 20px 60px rgba(0, 0, 0, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.05);
  }

  .preview-row {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .preview-item {
    width: 80px;
    height: 60px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.05em;
  }

  .preview-item.html {
    background: #2d2d2d;
    color: #e5e5e5;
  }

  .preview-item.canvas {
    background: linear-gradient(135deg, #ff4757 0%, #ff6b7a 100%);
    color: white;
  }

  .preview-item.image {
    background: linear-gradient(135deg, #3742fa 0%, #5352ed 100%);
    color: white;
  }

  .preview-arrow {
    color: #444;
    font-size: 1.2rem;
  }

  /* Demos Section */
  .demos {
    padding: 100px 0;
    background: linear-gradient(180deg, transparent 0%, rgba(255, 71, 87, 0.02) 50%, transparent 100%);
  }

  .demos h2 {
    font-size: 1.75rem;
    font-weight: 600;
    margin: 0 0 8px 0;
    letter-spacing: -0.02em;
  }

  .section-lead {
    color: #666;
    margin-bottom: 40px;
  }

  .demo-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  .demo-card {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    padding: 28px;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 16px;
    text-decoration: none;
    color: inherit;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) backwards;
    animation-delay: var(--delay);
  }

  .demo-card:hover {
    background: rgba(255, 255, 255, 0.04);
    border-color: rgba(255, 71, 87, 0.3);
    transform: translateY(-4px);
  }

  .demo-icon {
    font-size: 1.5rem;
    color: #ff4757;
    flex-shrink: 0;
  }

  .demo-content {
    flex: 1;
  }

  .demo-content h3 {
    font-size: 1rem;
    font-weight: 600;
    margin: 0 0 6px 0;
  }

  .demo-content p {
    font-size: 0.85rem;
    color: #888;
    margin: 0;
    line-height: 1.5;
  }

  .demo-arrow {
    color: #333;
    font-size: 1.2rem;
    transition: transform 0.2s ease;
  }

  .demo-card:hover .demo-arrow {
    transform: translateX(4px);
    color: #ff4757;
  }

  /* Libraries Section */
  .libraries {
    padding: 80px 0;
  }

  .libraries h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0 0 36px 0;
    letter-spacing: -0.02em;
  }

  .lib-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }

  .lib-card {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 20px 24px;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 12px;
    animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) backwards;
    animation-delay: var(--delay);
  }

  .lib-icon {
    font-size: 1.3rem;
    color: #888;
  }

  .lib-info h3 {
    font-size: 0.9rem;
    font-weight: 600;
    margin: 0 0 2px 0;
  }

  .lib-version {
    font-size: 0.75rem;
    color: #555;
    font-family: 'SF Mono', 'Fira Code', monospace;
  }

  /* Get Started */
  .get-started {
    padding: 100px 0;
  }

  .get-started-content {
    text-align: center;
    padding: 60px 40px;
    background: linear-gradient(145deg, rgba(255, 71, 87, 0.05) 0%, rgba(55, 66, 250, 0.03) 100%);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 24px;
  }

  .get-started-content h2 {
    font-size: 2rem;
    font-weight: 700;
    margin: 0 0 12px 0;
    letter-spacing: -0.03em;
  }

  .get-started-content > p {
    color: #888;
    margin: 0 0 32px 0;
  }

  .install-command {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    background: #0d0d0d;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    padding: 8px 8px 8px 20px;
    max-width: 100%;
    overflow-x: auto;
  }

  .install-command code {
    font-family: 'SF Mono', 'Fira Code', monospace;
    font-size: 0.85rem;
    color: #888;
    white-space: nowrap;
  }

  .install-command button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    background: rgba(255, 255, 255, 0.08);
    border: none;
    border-radius: 6px;
    color: #888;
    cursor: pointer;
    transition: all 0.2s ease;
    flex-shrink: 0;
  }

  .install-command button:hover {
    background: #ff4757;
    color: white;
  }

  /* Footer */
  footer {
    padding: 40px 0;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
  }

  .footer-content {
    display: flex;
    align-items: center;
    gap: 12px;
    justify-content: center;
    font-size: 0.9rem;
  }

  .footer-content a {
    color: #888;
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .footer-content a:hover {
    color: #e5e5e5;
  }

  .divider {
    color: #333;
  }

  .credits {
    color: #555;
  }

  /* Animations */
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  /* Responsive */
  @media (max-width: 900px) {
    .hero {
      grid-template-columns: 1fr;
      text-align: center;
      padding: 80px 28px;
      min-height: auto;
    }

    .tagline {
      margin-left: auto;
      margin-right: auto;
    }

    .actions {
      justify-content: center;
    }

    .hero-visual {
      display: none;
    }

    .demo-grid {
      grid-template-columns: 1fr;
    }

    .lib-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
</style>
