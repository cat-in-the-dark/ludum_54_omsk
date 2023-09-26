# LDJAM-54 entry

## TODO

- [ ] add name
- [ ] add spash image
- [ ] ad link to itchio

## What's inside?

This projects uses [pnpm](https://pnpm.io) as a package manager and [vite](https://vitejs.dev/) as a build tool, typescript, eslint and prettier.

I recommend install nodejs via [fnm](https://github.com/Schniz/fnm) version manager.

### Apps and packages

- `src/app`: Pixi.js application (game).
- `src/lib`: cat_in_the_dark library with common functions.

### Build

To build all apps and packages, run the following command:

```shell
pnpm run build
```

To run a development live-reload server, run the following command:

```shell
pnpm dev
```

Also you can check and auto-fix linter errors:

```shell
pnpm lint
pnpm lint:fix
```

## CI

To build and host app we use [Cloudflare pages](https://pages.cloudflare.com/).
