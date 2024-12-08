// @ts-check
import { defineConfig, envField } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  experimental: {
    env: {
      schema: {
        REST_API_ENDPOINT: envField.string({ context: "client", access: "public", default: "" }),
        REST_API_KEY: envField.string({ context: "client", access: "public", default: "" })
      }
    }
  }
});
