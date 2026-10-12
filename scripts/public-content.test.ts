import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Router } from "wouter";
import Home from "../client/src/pages/home";
import Community from "../client/src/pages/community";
import { COMMUNITY_SECTIONS, HOME_FAQS, HOME_FAQ_SCHEMA, STUDENT_ELIGIBILITY } from "../shared/public-content";
import { escapeContent } from "../server/public-content-html";

// tsx uses the classic JSX transform for this project's preserve configuration.
Object.assign(globalThis, { React });

function renderPage(page: React.ReactElement, path: string) {
  const client = new QueryClient({ defaultOptions: { queries: { enabled: false, retry: false } } });
  try {
    return renderToStaticMarkup(
      React.createElement(QueryClientProvider, { client },
        React.createElement(HelmetProvider, {},
          React.createElement(Router, { ssrPath: path }, page))),
    );
  } finally {
    client.clear();
  }
}

function assertHomeContent(html: string) {
  const body = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "").replaceAll("&#x27;", "&#39;");
  for (const faq of HOME_FAQS) {
    assert.ok(body.includes(escapeContent(faq.question)), `Missing visible question: ${faq.question}`);
    assert.ok(body.includes(escapeContent(faq.answer)), `Missing visible answer: ${faq.question}`);
  }
  assert.ok(body.includes(escapeContent(STUDENT_ELIGIBILITY.introduction)));
  for (const exception of STUDENT_ELIGIBILITY.exceptions) {
    assert.ok(body.includes(escapeContent(exception)), `Missing student exception: ${exception}`);
  }
}

function assertCommunityContent(html: string) {
  html = html.replaceAll("&#x27;", "&#39;");
  for (const section of COMMUNITY_SECTIONS) {
    for (const destination of section.destinations) {
      assert.ok(html.includes(escapeContent(destination.title)), `Missing destination: ${destination.title}`);
      assert.ok(html.includes(escapeContent(destination.description)), `Missing description: ${destination.title}`);
    }
  }
}

async function main() {
const clientHome = renderPage(React.createElement(Home), "/");
assertHomeContent(clientHome);
for (const id of ["students", "faq"]) {
  const disclosure = clientHome.match(new RegExp(`<details\\b([^>]*)>[\\s\\S]*?id="${id}-toggle"[\\s\\S]*?<\\/details>`));
  assert.ok(disclosure, `Missing native ${id} disclosure`);
  assert.ok(!/\bopen(?:=|\s|$)/.test(disclosure[1]), `${id} should start collapsed`);
  assert.ok(disclosure[0].includes(`id="${id}-panel"`), `${id} panel must exist before clicking`);
}
assertCommunityContent(renderPage(React.createElement(Community), "/community"));
console.log("PASS: default React markup retains all FAQ, student, and community content.");

// Run the actual production build on an isolated port without changing app code
// or interrupting the preview workflow. Only the test child's listen port changes.
const child = spawn(process.execPath, ["--input-type=module", "--eval", `
  import net from "node:net";
  const listen = net.Server.prototype.listen;
  net.Server.prototype.listen = function(options, ...args) {
    return listen.call(this, { ...options, port: 5001 }, ...args);
  };
  await import("./dist/index.js");
`], { cwd: process.cwd(), env: { ...process.env, NODE_ENV: "production" }, stdio: ["ignore", "pipe", "pipe"] });
let logs = "";
child.stdout.on("data", (data) => { logs += data; });
child.stderr.on("data", (data) => { logs += data; });
const exit = once(child, "exit");
try {
  let ready = false;
  for (let attempt = 0; attempt < 100; attempt++) {
    if (child.exitCode !== null) throw new Error("Production test server exited before becoming ready.");
    if (logs.includes("serving on port")) { ready = true; break; }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  assert.ok(ready, "Production test server did not become ready");
  for (const path of ["/", "/community", "/community/"]) {
    const response = await fetch(`http://127.0.0.1:5001${path}`, { headers: { "User-Agent": "SEO-no-JavaScript-test" } });
    assert.equal(response.status, 200);
    const html = await response.text();
    if (path === "/") {
      assertHomeContent(html);
      const schemas = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
        .map((match) => JSON.parse(match[1]));
      const faqs = schemas.filter((schema) => schema["@type"] === "FAQPage");
      assert.equal(faqs.length, 1, "Expected exactly one home FAQPage schema");
      assert.deepEqual(faqs[0], HOME_FAQ_SCHEMA, "Production FAQ schema must match shared page copy");
    } else {
      assertCommunityContent(html);
    }
  }
  console.log("PASS: production HTTP responses contain all public content, and FAQ schema matches all eight answers.");
} finally {
  child.kill("SIGTERM");
  await exit;
}
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
