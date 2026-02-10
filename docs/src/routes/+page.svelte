<script lang="ts">
  const features = [
    {
      title: 'Side-by-Side Comparison',
      description: 'Compare html2canvas, html-to-image, modern-screenshot, and Satori outputs in real-time with visual diffs.'
    },
    {
      title: 'Stress Testing',
      description: 'Push screenshot libraries to their limits with complex DOM structures, nested elements, and edge cases.'
    },
    {
      title: 'Performance Benchmarking',
      description: 'Measure and compare rendering times, memory usage, and output quality across all libraries.'
    },
    {
      title: 'Pixi.js Integration',
      description: 'Leverage Pixi.js for high-performance 2D rendering with custom filters and texture handling.'
    },
    {
      title: 'TypeScript Support',
      description: 'Fully typed codebase with comprehensive type definitions for all screenshot operations.'
    },
    {
      title: 'Vite-Powered',
      description: 'Lightning-fast development experience with hot module replacement and optimized builds.'
    }
  ];

  const demos = [
    { name: 'Basic Demo', href: 'index.html', description: 'Single library comparison' },
    { name: 'Compare View', href: 'compare.html', description: 'Multi-library side-by-side' },
    { name: 'Stress Test', href: 'stress.html', description: 'Edge case testing' }
  ];

  function copyInstall() {
    navigator.clipboard.writeText('git clone https://github.com/jurrejan/pixi-paper.git && cd pixi-paper && npm install && npm run dev');
  }
</script>

<svelte:head>
  <title>pixi-paper - HTML to Canvas/Image Screenshot Library Comparison</title>
  <meta name="description" content="Real-time comparison of html2canvas, html-to-image, modern-screenshot, and Satori for HTML to Canvas/Image conversion using Pixi.js" />
</svelte:head>

<main>
  <section class="hero">
    <div class="container">
      <h1>pixi-paper</h1>
      <p class="description">Real-time comparison of HTML to Canvas/Image screenshot libraries. Test and benchmark html2canvas, html-to-image, modern-screenshot, and Satori side-by-side with Pixi.js integration.</p>
    </div>
  </section>

  <section class="demos">
    <div class="container">
      <h2>Live Demos</h2>
      <p class="section-description">Explore the interactive test pages to see each library in action</p>
      <div class="demo-grid">
        {#each demos as demo, i}
          <a href={demo.href} class="demo-card" style="animation-delay: {i * 200}ms" target="_blank" rel="noopener">
            <h3>{demo.name}</h3>
            <p>{demo.description}</p>
            <span class="arrow">→</span>
          </a>
        {/each}
      </div>
    </div>
  </section>

  <section class="features">
    <div class="container">
      <h2>Features</h2>
      <div class="grid">
        {#each features as feature, i}
          <div class="feature-card" style="animation-delay: {i * 200}ms">
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <section class="install">
    <div class="container">
      <h2>Get Started</h2>
      <div class="install-box">
        <code>git clone https://github.com/jurrejan/pixi-paper.git && cd pixi-paper && npm install && npm run dev</code>
        <button onclick={copyInstall} aria-label="Copy install command">Copy</button>
      </div>
      <p class="install-note">Clone the repository, install dependencies, and start the development server to explore the comparison tools.</p>
    </div>
  </section>

  <section class="tech-stack">
    <div class="container">
      <h2>Tech Stack</h2>
      <div class="tech-grid">
        <div class="tech-item">Pixi.js v8</div>
        <div class="tech-item">Vite</div>
        <div class="tech-item">TypeScript</div>
        <div class="tech-item">html2canvas</div>
        <div class="tech-item">html-to-image</div>
        <div class="tech-item">modern-screenshot</div>
        <div class="tech-item">Satori</div>
      </div>
    </div>
  </section>

  <footer>
    <div class="container">
      <p>
        <a href="https://github.com/jurrejan/pixi-paper" target="_blank" rel="noopener">GitHub</a>
      </p>
    </div>
  </footer>
</main>

<style>
  main {
    overflow-x: hidden;
  }

  .container {
    max-width: var(--container-max-width);
    margin: 0 auto;
    padding: 0 var(--container-padding);
  }

  h1 {
    font-size: 2.5rem;
    font-weight: 600;
    letter-spacing: -0.03em;
    margin-bottom: 1rem;
    animation: fadeSlideUp 0.5s ease-out forwards;
  }

  h2 {
    font-size: 1.75rem;
    font-weight: 600;
    letter-spacing: -0.02em;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .description {
    font-size: 1.15rem;
    color: var(--text-secondary);
    max-width: 700px;
    animation: fadeSlideUp 0.5s ease-out 0.1s forwards;
    opacity: 0;
  }

  .section-description {
    color: var(--text-secondary);
    margin-bottom: 2rem;
  }

  .hero {
    padding: 80px var(--container-padding);
    text-align: center;
    animation: fadeSlideUp 0.5s ease-out forwards;
  }

  .demos {
    padding: var(--section-padding) var(--container-padding);
    background: var(--bg-secondary);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
  }

  .demo-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--grid-gap);
  }

  .demo-card {
    display: block;
    background: var(--bg-primary);
    padding: 24px;
    border: 1px solid var(--border);
    border-radius: 8px;
    text-decoration: none;
    color: inherit;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    animation: fadeSlideUp 0.5s ease-out forwards;
    opacity: 0;
  }

  .demo-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }

  .demo-card p {
    color: var(--text-secondary);
    font-size: 0.95rem;
    margin-bottom: 1rem;
  }

  .arrow {
    color: var(--text-tertiary);
    font-size: 1.25rem;
    transition: transform 0.2s ease;
  }

  .demo-card:hover .arrow {
    transform: translateX(4px);
  }

  .features {
    padding: var(--section-padding) var(--container-padding);
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--grid-gap);
  }

  .feature-card {
    background: var(--bg-secondary);
    padding: 24px;
    border: 1px solid var(--border);
    border-radius: 8px;
    animation: fadeSlideUp 0.5s ease-out forwards;
    opacity: 0;
  }

  .feature-card p {
    color: var(--text-secondary);
    font-size: 0.95rem;
  }

  .install {
    padding: var(--section-padding) var(--container-padding);
    background: var(--bg-secondary);
    border-top: 1px solid var(--border);
  }

  .install-box {
    display: flex;
    align-items: center;
    gap: 12px;
    background: var(--bg-code);
    padding: 16px 20px;
    border-radius: 8px;
    margin-bottom: 1rem;
    animation: fadeSlideUp 0.5s ease-out forwards;
    opacity: 0;
    animation-delay: 0.2s;
  }

  .install-box code {
    flex: 1;
    font-size: 0.9rem;
    overflow-x: auto;
    white-space: nowrap;
  }

  .install-box button {
    padding: 8px 16px;
    background: var(--accent);
    color: white;
    border: none;
    border-radius: 4px;
    font-family: inherit;
    font-size: 0.85rem;
    font-weight: 500;
    cursor: pointer;
    transition: opacity 0.2s ease;
  }

  .install-box button:hover {
    opacity: 0.9;
  }

  .install-note {
    color: var(--text-secondary);
    font-size: 0.95rem;
  }

  .tech-stack {
    padding: var(--section-padding) var(--container-padding);
  }

  .tech-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    animation: fadeSlideUp 0.5s ease-out forwards;
    opacity: 0;
    animation-delay: 0.4s;
  }

  .tech-item {
    padding: 8px 16px;
    background: var(--bg-secondary);
    border: 1px solid var(--border);
    border-radius: 20px;
    font-size: 0.9rem;
    color: var(--text-secondary);
  }

  footer {
    padding: 40px var(--container-padding);
    text-align: center;
    animation: fadeSlideUp 0.5s ease-out forwards;
    opacity: 0;
    animation-delay: 0.6s;
  }

  footer a {
    color: var(--text-secondary);
    text-decoration: none;
    transition: color 0.2s ease;
  }

  footer a:hover {
    color: var(--text-primary);
  }

  @media (max-width: 1000px) {
    .demo-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 700px) {
    h1 {
      font-size: 2rem;
    }

    .demo-grid {
      grid-template-columns: 1fr;
    }

    .grid {
      grid-template-columns: 1fr;
    }

    .hero {
      padding: 60px var(--container-padding);
    }

    .install-box {
      flex-direction: column;
      align-items: stretch;
    }

    .install-box code {
      white-space: normal;
    }
  }
</style>
