# Changesets

Every PR that changes what the package ships adds a file here (`bunx changeset`): the bump level and a one-line,
user-facing summary. On merge to `main`, the release workflow opens or updates a "Version Packages" PR that applies
the pending changesets to `package.json` and `CHANGELOG.md`; merging that PR publishes to npm.
