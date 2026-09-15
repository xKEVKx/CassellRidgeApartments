---
name: reCAPTCHA script readiness
description: Why the Google reCAPTCHA v2 loader must wait beyond the script load event.
---

Do not render a reCAPTCHA v2 widget immediately when Google's `api.js` element fires `load`; wait for `grecaptcha.ready()` and confirm `grecaptcha.render` exists.

**Why:** In production, `api.js` successfully loaded and then fetched Google's secondary runtime, but the script load event fired before that runtime was initialized. Calling `render` in that gap failed and made every contact form report that verification could not load.

**How to apply:** Preserve the explicit readiness wait whenever changing the shared reCAPTCHA loader, script URL, CSP, or form mounting behavior. Verify success by checking for Google's generated anchor iframe, not merely successful script requests.