---
'handful': patch
---

`sleep` is removed: a timed loop is better served by its producer owning the clock (a `setTimeout` chain that returns
`stop`) than by a consumer sleeping between pulls. `new Promise((r) => setTimeout(r, ms))` covers the rest.
