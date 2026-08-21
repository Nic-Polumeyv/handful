---
'handful': patch
---

`sleep` is built from `AbortSignal.timeout` + `AbortSignal.any` instead of a hand-wired `setTimeout`/`clearTimeout`
pair; same contract: resolves after `ms`, rejects with the caller's `signal.reason` the moment it aborts.
