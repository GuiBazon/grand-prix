---
name: Pages namespace declaration order
description: Why `const Pages = {}` must be in router.js, not app.js
---

# Pages namespace must be declared in router.js

## The rule
`const Pages = {}` must be declared in `js/router.js`, NOT in `js/app.js`.

**Why:** The HTML loads scripts in this order: `config → state → accessibility → ui → router → pages/* → app`. The page scripts (`dash.js`, `demandas.js`, etc.) run BEFORE `app.js`. They assign to `Pages.dash`, `Pages.demandas`, etc. at parse time. If `Pages` is only declared in `app.js`, those assignments throw a ReferenceError silently and the content area stays blank.

**How to apply:** Any time a new script is added that needs to write to `Pages`, ensure `router.js` already declares `Pages` (it does). Never move the `const Pages = {}` line to `app.js` or any script that loads after `js/pages/`.
