// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://memric.ai',
  output: 'static',
  vite: { plugins: [tailwindcss()] },
  integrations: [sitemap({ filter: (page) => !page.includes('/fresh') })],
});
