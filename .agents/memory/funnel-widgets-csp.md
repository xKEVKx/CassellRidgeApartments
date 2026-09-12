---
name: Funnel Leasing widgets and CSP
description: Non-obvious domains and constraints for the remaining Funnel/Nestio DNI and appointment widgets.
---

- **Rule**: Nestio widgets depend on API calls to `nestiolistings.com`, a domain not apparent from their loader URL. It must be permitted by CSP.
- **Why:** The appointment widget can silently fail if its secondary API domain is blocked. The removed AI chatbot previously required Sierra domains, but those permissions should not be restored unless chat is intentionally reintroduced.
- **How to apply:** When the Nestio appointment widget does not appear, check browser console for CSP violations. The vendor script requires its script tag id `nestio-lead-capture-frame` (getElementById-based placement) — two concurrent mounts conflict, so the React wrapper skips initialization if another instance is mounted.
