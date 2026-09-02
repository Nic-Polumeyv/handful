# handful

## 0.3.0

### Minor Changes

- [#5](https://github.com/Nic-Polumeyv/handful/pull/5) [`d7066ef`](https://github.com/Nic-Polumeyv/handful/commit/d7066ef58dbc1dac82a2438e7c8877bb714e9a4b) Thanks [@Nic-Polumeyv](https://github.com/Nic-Polumeyv)! - handful is now a Svelte utilities package. `sleep` and the `countdown` ticker are gone; in their place are
  `createCountdown`, `draggable`, `errorVisibility`, `isMobile` and `scrollReveal`, each on its own subpath, with
  `svelte` as a peer dependency. `createCountdown` schedules every tick from the clock, so a throttled background
  tab resumes on the seconds actually left.
