import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

const isGithubPages = process.env.GITHUB_PAGES === 'true' || process.env.CI === 'true';

// https://astro.build/config
export default defineConfig({
  site: isGithubPages ? 'https://adnanhisham7.github.io' : 'https://getbrift.com',
  base: isGithubPages ? '/brift' : '/',
  output: 'static',
  trailingSlash: 'never',
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap({
      filter: (page) => !page.includes('/404'),
    }),
  ],
});
