
// config for local dev and github pages

import { defineConfig } from 'astro/config';

// only use base path for production (github pages)
const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
  site: 'https://frankiem-4.github.io',
  base: isProduction ? '/drone-strike-explorer' : '/',
});