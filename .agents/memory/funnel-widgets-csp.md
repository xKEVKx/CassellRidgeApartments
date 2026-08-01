---
name: Funnel Leasing widgets and CSP
description: Non-obvious domains and constraints for the Funnel/Nestio chatbot, DNI, and lead-capture widgets.
---

- **Rule**: Funnel widgets depend on domains not guessable from their loader URLs: config APIs on `nestiolistings.com`, chat UI from `sierra.chat` (Sierra agent). All must be in CSP (script/style/font/img/frame/connect as applicable).
- **Why:** The chat bubble silently failed to render until CSP violations in the browser console revealed each domain one at a time (script → style). A 400 "Chat not enabled for this community" from the sierra-chatbot-config endpoint means the blocker is on Funnel's side, not the site's.
- **How to apply:** When a Funnel/Nestio widget doesn't appear, check browser console for CSP violations first, then curl the nestiolistings config endpoint to distinguish our-end vs their-end. The Nestio lead-capture vendor script requires its script tag id `nestio-lead-capture-frame` (getElementById-based placement) — two concurrent mounts conflict, so the React wrapper skips init if another instance is mounted.
