import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4000',
    chromeWebSecurity: false, // ← ОТКЛЮЧАЕМ CORS!
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  }
});
