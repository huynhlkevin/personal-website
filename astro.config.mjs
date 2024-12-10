// @ts-check
import { defineConfig, envField } from 'astro/config';

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  env: {
    schema: {
      REST_API_ENDPOINT: envField.string({ context: "client", access: "public", default: "" }),
      REST_API_KEY: envField.string({ context: "client", access: "public", default: "" })
    }
  },

  integrations: [mdx()]
});