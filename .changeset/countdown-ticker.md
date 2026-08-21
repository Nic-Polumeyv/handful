---
'handful': patch
---

`countdown` is a start/stop ticker: `countdown(onTick)` returns `{ start(seconds), stop() }`; `start` reports the
value at once and one less every second down to `0`, ending any run in progress. The async-generator form is gone.
