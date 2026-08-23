---
'handful': minor
---

handful is now a Svelte utilities package. `sleep` and the `countdown` ticker are gone; in their place are
`createCountdown`, `draggable`, `errorVisibility`, `isMobile` and `scrollReveal`, each on its own subpath, with
`svelte` as a peer dependency. `createCountdown` schedules every tick from the clock, so a throttled background
tab resumes on the seconds actually left.
