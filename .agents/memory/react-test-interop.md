---
name: Server-side React test interop
description: Node module compatibility when testing existing React pages outside Vite.
---

For standalone React render tests, bundle as CommonJS with automatic JSX rather than directly importing the pages with Node ESM.

**Why:** The installed react-helmet-async build works through Vite but does not expose its named exports to native Node ESM. Direct tsx execution fails before a page can render. This is a test-runtime limitation, not a browser application failure.

**How to apply:** Use the existing esbuild toolchain for standalone page-render tests; keep generated bundles in the ignored dist directory. Reconsider this constraint if the package's module exports change.
