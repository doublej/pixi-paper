import { w as head, x as ensure_array_like, y as attr, z as attr_style, F as stringify } from "../../chunks/index.js";
import { l as escape_html } from "../../chunks/context.js";
function _page($$renderer) {
  const demos = [
    {
      name: "Basic Demo",
      href: "index.html",
      description: "Single library rendering with Pixi.js canvas effects",
      icon: "◈"
    },
    {
      name: "Compare View",
      href: "compare.html",
      description: "Side-by-side comparison of all 4 libraries with diff mode",
      icon: "⇄"
    },
    {
      name: "Stress Test",
      href: "stress.html",
      description: "Complex layouts, gradients, typography edge cases",
      icon: "✦"
    }
  ];
  const libraries = [
    { name: "html2canvas", version: "v1.4.1", icon: "◉" },
    { name: "html-to-image", version: "v1.11.11", icon: "◎" },
    { name: "modern-screenshot", version: "v4.5.0", icon: "◇" },
    { name: "Satori", version: "v0.18.3", icon: "◈" }
  ];
  head("1uha8ag", $$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>pixi-paper — HTML to Canvas Screenshot Comparison</title>`);
    });
    $$renderer2.push(`<meta name="description" content="Real-time comparison of html2canvas, html-to-image, modern-screenshot, and Satori for HTML to Canvas/Image conversion" class="svelte-1uha8ag"/>`);
  });
  $$renderer.push(`<div class="noise svelte-1uha8ag"></div> <main class="svelte-1uha8ag"><header class="hero svelte-1uha8ag"><div class="hero-content svelte-1uha8ag"><span class="pill svelte-1uha8ag">Live Benchmarking Suite</span> <h1 class="svelte-1uha8ag">pixi<span class="highlight svelte-1uha8ag">-</span>paper</h1> <p class="tagline svelte-1uha8ag">Real-time comparison of HTML to Canvas/Image screenshot libraries.
        Benchmark rendering quality, performance, and browser compatibility.</p> <div class="actions svelte-1uha8ag"><button class="btn-primary svelte-1uha8ag"><span class="btn-icon svelte-1uha8ag">↓</span> Clone &amp; Run</button> <a href="https://github.com/doublej/pixi-paper" class="btn-secondary svelte-1uha8ag" target="_blank" rel="noopener"><span class="btn-icon svelte-1uha8ag">⌥</span> GitHub</a></div></div> <div class="hero-visual svelte-1uha8ag"><div class="canvas-preview svelte-1uha8ag"><div class="preview-row svelte-1uha8ag"><div class="preview-item html svelte-1uha8ag">HTML</div> <div class="preview-arrow svelte-1uha8ag">→</div> <div class="preview-item canvas svelte-1uha8ag">Canvas</div> <div class="preview-arrow svelte-1uha8ag">→</div> <div class="preview-item image svelte-1uha8ag">Image</div></div></div></div></header> <section class="demos svelte-1uha8ag"><div class="container svelte-1uha8ag"><h2 class="svelte-1uha8ag">Interactive Demos</h2> <p class="section-lead svelte-1uha8ag">Run real tests in your browser — no installation required</p> <div class="demo-grid svelte-1uha8ag"><!--[-->`);
  const each_array = ensure_array_like(demos);
  for (let i = 0, $$length = each_array.length; i < $$length; i++) {
    let demo = each_array[i];
    $$renderer.push(`<a${attr("href", demo.href)} class="demo-card svelte-1uha8ag"${attr_style(`--delay: ${stringify(i * 0.15)}s`)} target="_blank" rel="noopener"><div class="demo-icon svelte-1uha8ag">${escape_html(demo.icon)}</div> <div class="demo-content svelte-1uha8ag"><h3 class="svelte-1uha8ag">${escape_html(demo.name)}</h3> <p class="svelte-1uha8ag">${escape_html(demo.description)}</p></div> <div class="demo-arrow svelte-1uha8ag">→</div></a>`);
  }
  $$renderer.push(`<!--]--></div></div></section> <section class="libraries svelte-1uha8ag"><div class="container svelte-1uha8ag"><h2 class="svelte-1uha8ag">Libraries Compared</h2> <div class="lib-grid svelte-1uha8ag"><!--[-->`);
  const each_array_1 = ensure_array_like(libraries);
  for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
    let lib = each_array_1[i];
    $$renderer.push(`<div class="lib-card svelte-1uha8ag"${attr_style(`--delay: ${stringify(i * 0.1)}s`)}><div class="lib-icon svelte-1uha8ag">${escape_html(lib.icon)}</div> <div class="lib-info svelte-1uha8ag"><h3 class="svelte-1uha8ag">${escape_html(lib.name)}</h3> <span class="lib-version svelte-1uha8ag">${escape_html(lib.version)}</span></div></div>`);
  }
  $$renderer.push(`<!--]--></div></div></section> <section class="get-started svelte-1uha8ag"><div class="container svelte-1uha8ag"><div class="get-started-content svelte-1uha8ag"><h2 class="svelte-1uha8ag">Ready to benchmark?</h2> <p class="svelte-1uha8ag">Clone the repository and run the comparison locally</p> <div class="install-command svelte-1uha8ag"><code class="svelte-1uha8ag">git clone https://github.com/doublej/pixi-paper.git &amp;&amp; cd pixi-paper &amp;&amp; npm install &amp;&amp; npm run dev</code> <button aria-label="Copy command" class="svelte-1uha8ag"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="svelte-1uha8ag"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" class="svelte-1uha8ag"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" class="svelte-1uha8ag"></path></svg></button></div></div></div></section> <footer class="svelte-1uha8ag"><div class="container svelte-1uha8ag"><div class="footer-content svelte-1uha8ag"><a href="https://github.com/doublej/pixi-paper" target="_blank" rel="noopener" class="svelte-1uha8ag">GitHub</a> <span class="divider svelte-1uha8ag">/</span> <span class="credits svelte-1uha8ag">Built with Pixi.js v8</span></div></div></footer></main>`);
}
export {
  _page as default
};
