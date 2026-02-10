import { w as head, x as ensure_array_like, y as attr, z as attr_style, F as stringify } from "../../chunks/index.js";
import { l as escape_html } from "../../chunks/context.js";
function _page($$renderer) {
  const features = [
    {
      title: "Side-by-Side Comparison",
      description: "Compare html2canvas, html-to-image, modern-screenshot, and Satori outputs in real-time with visual diffs."
    },
    {
      title: "Stress Testing",
      description: "Push screenshot libraries to their limits with complex DOM structures, nested elements, and edge cases."
    },
    {
      title: "Performance Benchmarking",
      description: "Measure and compare rendering times, memory usage, and output quality across all libraries."
    },
    {
      title: "Pixi.js Integration",
      description: "Leverage Pixi.js for high-performance 2D rendering with custom filters and texture handling."
    },
    {
      title: "TypeScript Support",
      description: "Fully typed codebase with comprehensive type definitions for all screenshot operations."
    },
    {
      title: "Vite-Powered",
      description: "Lightning-fast development experience with hot module replacement and optimized builds."
    }
  ];
  const demos = [
    {
      name: "Basic Demo",
      href: "index.html",
      description: "Single library comparison"
    },
    {
      name: "Compare View",
      href: "compare.html",
      description: "Multi-library side-by-side"
    },
    {
      name: "Stress Test",
      href: "stress.html",
      description: "Edge case testing"
    }
  ];
  head("1uha8ag", $$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>pixi-paper - HTML to Canvas/Image Screenshot Library Comparison</title>`);
    });
    $$renderer2.push(`<meta name="description" content="Real-time comparison of html2canvas, html-to-image, modern-screenshot, and Satori for HTML to Canvas/Image conversion using Pixi.js"/>`);
  });
  $$renderer.push(`<main class="svelte-1uha8ag"><section class="hero svelte-1uha8ag"><div class="container svelte-1uha8ag"><h1 class="svelte-1uha8ag">pixi-paper</h1> <p class="description svelte-1uha8ag">Real-time comparison of HTML to Canvas/Image screenshot libraries. Test and benchmark html2canvas, html-to-image, modern-screenshot, and Satori side-by-side with Pixi.js integration.</p></div></section> <section class="demos svelte-1uha8ag"><div class="container svelte-1uha8ag"><h2 class="svelte-1uha8ag">Live Demos</h2> <p class="section-description svelte-1uha8ag">Explore the interactive test pages to see each library in action</p> <div class="demo-grid svelte-1uha8ag"><!--[-->`);
  const each_array = ensure_array_like(demos);
  for (let i = 0, $$length = each_array.length; i < $$length; i++) {
    let demo = each_array[i];
    $$renderer.push(`<a${attr("href", demo.href)} class="demo-card svelte-1uha8ag"${attr_style(`animation-delay: ${stringify(i * 200)}ms`)} target="_blank" rel="noopener"><h3 class="svelte-1uha8ag">${escape_html(demo.name)}</h3> <p class="svelte-1uha8ag">${escape_html(demo.description)}</p> <span class="arrow svelte-1uha8ag">→</span></a>`);
  }
  $$renderer.push(`<!--]--></div></div></section> <section class="features svelte-1uha8ag"><div class="container svelte-1uha8ag"><h2 class="svelte-1uha8ag">Features</h2> <div class="grid svelte-1uha8ag"><!--[-->`);
  const each_array_1 = ensure_array_like(features);
  for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
    let feature = each_array_1[i];
    $$renderer.push(`<div class="feature-card svelte-1uha8ag"${attr_style(`animation-delay: ${stringify(i * 200)}ms`)}><h3 class="svelte-1uha8ag">${escape_html(feature.title)}</h3> <p class="svelte-1uha8ag">${escape_html(feature.description)}</p></div>`);
  }
  $$renderer.push(`<!--]--></div></div></section> <section class="install svelte-1uha8ag"><div class="container svelte-1uha8ag"><h2 class="svelte-1uha8ag">Get Started</h2> <div class="install-box svelte-1uha8ag"><code class="svelte-1uha8ag">git clone https://github.com/jurrejan/pixi-paper.git &amp;&amp; cd pixi-paper &amp;&amp; npm install &amp;&amp; npm run dev</code> <button aria-label="Copy install command" class="svelte-1uha8ag">Copy</button></div> <p class="install-note svelte-1uha8ag">Clone the repository, install dependencies, and start the development server to explore the comparison tools.</p></div></section> <section class="tech-stack svelte-1uha8ag"><div class="container svelte-1uha8ag"><h2 class="svelte-1uha8ag">Tech Stack</h2> <div class="tech-grid svelte-1uha8ag"><div class="tech-item svelte-1uha8ag">Pixi.js v8</div> <div class="tech-item svelte-1uha8ag">Vite</div> <div class="tech-item svelte-1uha8ag">TypeScript</div> <div class="tech-item svelte-1uha8ag">html2canvas</div> <div class="tech-item svelte-1uha8ag">html-to-image</div> <div class="tech-item svelte-1uha8ag">modern-screenshot</div> <div class="tech-item svelte-1uha8ag">Satori</div></div></div></section> <footer class="svelte-1uha8ag"><div class="container svelte-1uha8ag"><p><a href="https://github.com/jurrejan/pixi-paper" target="_blank" rel="noopener" class="svelte-1uha8ag">GitHub</a></p></div></footer></main>`);
}
export {
  _page as default
};
