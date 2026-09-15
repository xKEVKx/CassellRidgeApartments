---
name: reCAPTCHA script readiness
description: Why the Google reCAPTCHA v2 loader must wait beyond the script load event.
---

Do not render a reCAPTCHA v2 widget immediately when Google's `api.js` element fires `load`; wait for `grecaptcha.ready()` and confirm `grecaptcha.render` exists.

**Why:** In production, `api.js` successfully loaded and then fetched Google's secondary runtime, but the script load event fired before that runtime was initialized. Calling `render` in that gap failed and made every contact form report that verification could not load.

**How to apply:** Preserve the explicit readiness wait whenever changing the shared reCAPTCHA loader, script URL, CSP, or form mounting behavior. Verify success by checking for Google's generated anchor iframe, not merely successful script requests.

When reCAPTCHA is placed inside a Radix modal dialog, Google's image challenge is appended to the document body outside the dialog tree. The eligibility contact dialog must not use Radix's modal pointer lock; keep it non-modal and prevent outside dismissal so challenge images remain clickable without closing the form.

**Why:** The checkbox and image challenge rendered in production, but Radix's modal outside-pointer protection blocked clicks inside Google's separate challenge iframe.

**How to apply:** This exception applies to the eligibility contact dialog. The standard Contact Us page is not modal and did not have the problem.