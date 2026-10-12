---
name: Tailwind security exception
description: User-approved exception for the unpatched braces dependency in Tailwind 3.
---

Retain Tailwind 3 and leave GHSA-vfj7-8cjw-p6xm in `braces` unresolved unless the user changes this decision.

**Why:** The user explicitly selected “Keep Tailwind 3 and leave the vulnerability unresolved” when offered a Tailwind 4 migration to remove it.

**How to apply:** Report this remaining finding accurately during dependency remediation. Do not silently migrate Tailwind or treat this exception as permission to ignore other vulnerabilities.
