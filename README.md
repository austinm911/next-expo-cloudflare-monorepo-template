# Template for using Cloudflare with Next.js and Expo Router

Heavily inspired by [create-t3-turbo](https://github.com/t3-oss/create-t3-turbo)

-   [x] Add Expo 50
-   [x] Add Hono API
-   [x] Add tRPC

Optional

-   [ ] Add [feat: add no-restricted-properties](https://github.com/t3-oss/create-t3-turbo/pull/999)

## Inspiration/Code Examples

-   [create-t3-turbo](https://github.com/t3-oss/create-t3-turbo)
-   [Turborepo Tailwind Starter](https://github.com/vercel/turbo/tree/main/examples/with-tailwind)
-   [t3-cloudflare](https://github.com/van14U/t3-cloudflare)

## Structure

```text
.github
  └─ workflows (TBD)
        <!-- └─ CI with pnpm cache setup -->****
.vscode
  └─ Recommended extensions and settings for VSCode **users**
apps
  ├─ auth-**proxy**
  |   ├─ Nitro server to proxy OAuth requests in preview deployments
  |   └─ Uses Auth.js Core
  |   └─ Uses Auth.js Core
  ├─ expo
  |   ├─ Expo SDK 50
  |   ├─ React Native using React 18.2
  |   ├─ Navigation using Expo Router
  |   ├─ Tailwind using NativeWind
  |   └─ Typesafe API calls using tRPC and Hono
  | next.js
  |    ├─ Next.js 14
  |    ├─ React 18.2
  |    ├─ Tailwind CSS
  |    └─ Typesafe API calls using tRPC & Hono hosted on Cloudflare Workers, and Tanstack Query
  └─ spa
      ├─ Vite Single Page Application using React 18.2
      ├─ Tailwind CSS
      ├─ Tanstack Router for navigation
      └─ Typesafe API calls using tRPC and Hono hosted on Cloudflare Workers and Tanstack Query
packages
  ├─ api
  |   └─ Hono API using tRPC v11 router definition hosted on Cloudflare Workers
  ├─ db
  |   └─ Typesafe db calls using Drizzle & Postgres
  └─ ui
      └─ Start of a UI package for the webapp using shadcn-ui
tooling
  ├─ eslint
  |   └─ shared, fine-grained, eslint presets
  ├─ prettier
  |   └─ shared prettier configuration
  ├─ tailwind
  |   └─ shared tailwind configuration
  └─ typescript
      └─ shared tsconfig you can extend from
```

## Additional Setup

### When it's time to add a new package

To add a new package, simply run `pnpm turbo gen init` in the monorepo root. This will prompt you for a package name as well as if you want to install any dependencies to the new package (of course you can also do this yourself later).

The generator sets up the `package.json`, `tsconfig.json` and a `index.ts`, as well as configures all the necessary configurations for tooling around your package such as formatting, linting and typechecking. When the package is created, you're ready to go build out the package.
