import { defineConfig } from 'cypress'
import cypressSplit from 'cypress-split'

module.exports = defineConfig({
  e2e: {
    // baseUrl, etc
    supportFile: false,
    fixturesFolder: false,
    setupNodeEvents(on, config) {
      cypressSplit(on, config)
      // IMPORTANT: return the config object
      return config
    },
  },
})
