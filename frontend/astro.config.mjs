// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";

import node from "@astrojs/node";

import qwikdev from "@qwikdev/astro";

// https://astro.build/config
export default defineConfig({
  vite: {
  plugins: [tailwindcss()],
},

  adapter: node({
    mode: "standalone",
  }),

  integrations: [qwikdev()],
});