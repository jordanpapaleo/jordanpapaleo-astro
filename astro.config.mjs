import { defineConfig } from 'astro/config'

import tailwind from '@astrojs/tailwind'

// https://astro.build/config
export default defineConfig({
  server: {
    port: 3001,
    host: true,
  },
  vite: {
    ssr: {
      external: ['svgo'],
    },
  },
  integrations: [tailwind()],
})
