const { findCypressSpecs } = require('find-cypress-specs')
const { defineConfig } = require('cypress')

function getChunk(values, totalChunks, chunkIndex) {
  // split all items into N chunks and take just a single chunk
  if (totalChunks < 0) {
    throw new Error('totalChunks must be >= 0')
  }

  if (chunkIndex < 0 || chunkIndex >= totalChunks) {
    throw new Error(
      `Invalid chunk index ${chunkIndex} vs all chunks ${totalChunks}`,
    )
  }

  const chunkSize = Math.ceil(values.length / totalChunks)
  const chunkStart = chunkIndex * chunkSize
  const chunkEnd = chunkStart + chunkSize
  const chunk = values.slice(chunkStart, chunkEnd)
  return chunk
}

module.exports = defineConfig({
  e2e: {
    // baseUrl, etc
    supportFile: false,
    fixturesFolder: false,
    setupNodeEvents(on, config) {
      if (config.specs) {
        console.log(config.specs)
      }
      if (process.env.SPLIT && process.env.SPLIT_INDEX) {
        const specs = findCypressSpecs(config)
        console.log('all specs %d', specs.length)
        console.log(specs)
        const splitN = Number(process.env.SPLIT)
        const splitIndex = Number(process.env.SPLIT_INDEX)
        console.log('split %d of %d', splitIndex, splitN)
        const splitSpecs = getChunk(specs, splitN, splitIndex)
        config.specs = splitSpecs
        return config
      }
    },
  },
})
