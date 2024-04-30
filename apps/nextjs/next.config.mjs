import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev'

// import createJiti from 'jiti'
// import { fileURLToPath } from "url";

// Here we use the @cloudflare/next-on-pages next-dev module to allow us to use bindings during local development
// (when running the application with `next dev`), for more information see:
// https://github.com/cloudflare/next-on-pages/blob/5712c57ea7/internal-packages/next-dev/README.md
if (process.env.NODE_ENV === 'development') {
	await setupDevPlatform()
}
// Import env files to validate at build time. Use jiti so we can load .ts files in here.

// TODO: add
// createJiti(fileURLToPath(import.meta.url))('./src/env')

/** @type {import('next').NextConfig} */
const nextConfig = {
	// reactStrictMode: true, // not supported by next-on-pages

	/** Enables hot reloading for local packages without a build step */
	transpilePackages: ['@acme/api', '@acme/db', '@acme/ui', '@acme/env', '@acme/core'],
}

export default nextConfig
