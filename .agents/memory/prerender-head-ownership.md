---
name: Prerender head ownership
description: Why server-written route metadata must participate in client head reconciliation
---

Server-written route metadata and JSON-LD must participate in the same ownership mechanism as the client head manager. Keep only truly shared, route-independent tags outside that ownership.

**Why:** react-helmet-async only reconciles existing head nodes marked `data-rh`. Unmanaged prerender tags survive initial mounting and internal navigation, even when the client emits correct replacements. Direct HTTP checks alone miss this problem.

**How to apply:** When changing SEO tags or structured data, check both the non-JavaScript response and client mounting/navigation in the same document. Include a direct non-home entry followed by another public route and home; verify metadata uniqueness, route-specific social images, and removal of home-only schemas away from home.
