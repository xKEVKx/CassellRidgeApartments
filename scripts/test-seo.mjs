import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";
import { build } from "esbuild";
import { JSDOM } from "jsdom";

// Run against a production build: node scripts/test-seo.mjs https://<dev-host>
const baseUrl = process.argv[2];
assert.ok(baseUrl, "Pass the running production-build URL as the first argument");
const routes = ["/", "/floor-plans", "/gallery", "/community", "/location", "/virtual-tours", "/contact"];
const sources = new Map();
const socialKeys = [
  "og:title", "og:description", "og:url", "og:image", "og:image:alt",
  "twitter:title", "twitter:description", "twitter:image",
];

function assertHead(document, route, description) {
  const canonical = `https://www.cassellridgeapts.com${route}`;
  assert.equal(document.querySelectorAll('link[rel="canonical"]').length, 1);
  assert.equal(document.querySelector('link[rel="canonical"]').href, canonical);
  assert.equal(document.querySelectorAll('meta[name="description"]').length, 1);
  if (description) {
    assert.equal(document.querySelector('meta[name="description"]').content, description);
  }
  for (const key of socialKeys) {
    const tags = document.querySelectorAll(`meta[name="${key}"], meta[property="${key}"]`);
    assert.equal(tags.length, 1, `Exactly one ${key} on ${route}`);
    assert.equal(tags[0].getAttribute("data-rh"), "true", `${key} must be Helmet-managed`);
  }
  assert.equal(document.querySelector('meta[property="og:url"]').content, canonical);
  assert.equal(document.querySelector('meta[name="twitter:image"]').content,
    document.querySelector('meta[property="og:image"]').content);
  const schemas = [...document.querySelectorAll('script[type="application/ld+json"]')]
    .map((script) => JSON.parse(script.textContent));
  assert.equal(schemas.filter((schema) => schema["@type"] === "ApartmentComplex").length, 1);
  assert.equal(schemas.filter((schema) => schema["@type"] === "FAQPage").length, route === "/" ? 1 : 0);
  assert.equal(document.querySelectorAll('meta[property="og:site_name"]').length, 1);
  assert.equal(document.querySelectorAll('link[rel="icon"]').length, 1);
  assert.equal(document.querySelectorAll('meta[name="robots"]').length, 1);
  assert.equal(document.querySelector('meta[name="robots"]').content, "index, follow");
}

for (const route of routes) {
  const response = await fetch(new URL(route, baseUrl));
  assert.equal(response.status, 200, route);
  const html = await response.text();
  sources.set(route, html);
  const dom = new JSDOM(html);
  assertHead(dom.window.document, route);
  assert.equal(dom.window.document.querySelector('link[rel="canonical"]').getAttribute("data-rh"), "true");
  assert.equal(dom.window.document.querySelector('meta[name="description"]').getAttribute("data-rh"), "true");
  for (const script of dom.window.document.querySelectorAll('script[type="application/ld+json"]')) {
    assert.equal(script.getAttribute("data-rh"), "true");
  }
  dom.window.close();
}

for (const missing of ["/missing-page.html", "/images/missing-photo.jpg", "/missing-sitemap.xml",
  "/assets/missing.js", "/missing-page", "/missing-page.html?test=1", "/missing-page.html/"]) {
  const response = await fetch(new URL(missing, baseUrl));
  assert.equal(response.status, 404, missing);
  assert.match(response.headers.get("x-robots-tag"), /noindex/);
  const dom = new JSDOM(await response.text());
  assert.equal(dom.window.document.querySelector('meta[name="robots"]').content, "noindex");
  assert.equal(dom.window.document.querySelector('link[rel="canonical"]'), null);
  dom.window.close();
}

const home = new JSDOM(sources.get("/"));
const builtAssets = [...home.window.document.querySelectorAll('script[src], link[rel="stylesheet"]')]
  .map((tag) => tag.getAttribute("src") || tag.getAttribute("href"))
  .filter((url) => url.startsWith("/assets/"));
assert.ok(builtAssets.length >= 2);
for (const asset of ["/robots.txt", "/sitemap.xml", "/favicon.svg",
  "/images/cassell-hero.jpg", ...builtAssets]) {
  const response = await fetch(new URL(asset, baseUrl));
  assert.equal(response.status, 200, asset);
  assert.doesNotMatch(response.headers.get("content-type"), /text\/html/, asset);
}
for (const route of ["/contact/", "/gallery/?test=1", "/admin"]) {
  assert.equal((await fetch(new URL(route, baseUrl))).status, 200, route);
}
home.window.close();

// Exercise the installed Helmet implementation against actual prerendered heads,
// without network scripts or changing documents between internal navigations.
const outputDir = path.resolve("node_modules/.cache/seo-tests");
await mkdir(outputDir, { recursive: true });
const bundlePath = path.join(outputDir, "page-metadata.cjs");
await build({
  entryPoints: ["client/src/components/page-metadata.tsx"],
  outfile: bundlePath,
  bundle: true,
  platform: "node",
  format: "cjs",
  packages: "external",
  jsx: "automatic",
});
const require = createRequire(import.meta.url);
for (const entryRoute of routes) {
  const dom = new JSDOM(sources.get(entryRoute), { pretendToBeVisual: true });
  globalThis.window = dom.window;
  globalThis.document = dom.window.document;
  Object.defineProperty(globalThis, "navigator", { value: dom.window.navigator, configurable: true });
  globalThis.requestAnimationFrame = dom.window.requestAnimationFrame.bind(dom.window);
  globalThis.cancelAnimationFrame = dom.window.cancelAnimationFrame.bind(dom.window);
  const React = require("react");
  const { createRoot } = require("react-dom/client");
  const { HelmetProvider } = require("react-helmet-async");
  const PageMetadata = require(bundlePath).default;
  const root = createRoot(document.getElementById("root"));
  for (const route of [entryRoute, "/gallery", "/contact", "/", "/virtual-tours", "/floor-plans", "/community", "/location"]) {
    const expected = new JSDOM(sources.get(route));
    const title = expected.window.document.title;
    const description = expected.window.document.querySelector('meta[name="description"]').content;
    const children = route === "/" ? [...expected.window.document.querySelectorAll('script[type="application/ld+json"]')]
      .map((script, index) => React.createElement("script", {
        type: "application/ld+json", key: index,
      }, script.textContent)) : undefined;
    root.render(React.createElement(HelmetProvider, null,
      React.createElement(PageMetadata, { path: route, title, description }, children)));
    await new Promise((resolve) => setTimeout(resolve, 80));
    assertHead(document, route, description);
    assert.equal(document.title, title);
    assert.equal(document.querySelector('meta[property="og:image"]').content,
      expected.window.document.querySelector('meta[property="og:image"]').content);
    assert.equal(document.querySelector('meta[property="og:image:alt"]').content,
      expected.window.document.querySelector('meta[property="og:image:alt"]').content);
    assert.equal(document.querySelector('meta[name="twitter:title"]').content, title);
    assert.equal(document.querySelector('meta[name="twitter:description"]').content, description);
    expected.window.close();
  }
  root.unmount();
  dom.window.close();
}
console.log("SEO regression checks passed: production status handling, static assets, all public heads, initial Helmet mount and internal navigation.");
