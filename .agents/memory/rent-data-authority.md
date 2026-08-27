---
name: Rent data authority
description: The durable source-of-truth rule for public floor-plan pricing
---

**Rule:** Treat the current environment's floor-plan database records as the
authoritative rent source. Public React cards, metadata derived at runtime, and
production prerender content must use those records rather than fixed prices in
code.

**Why:** The user confirmed that rents are updated operationally in production
and expects those updates to propagate without code changes. Hardcoded pricing
can become stale and contradict the live floor-plan API.

**How to apply:** Keep static metadata price-neutral when database data is not
available. When displaying a rent or range, derive it from current available
floor plans. Do not modify rent records as part of SEO/content work.