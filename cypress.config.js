const { getSpecs } = require('find-cypress-specs')
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

const label = 'cypress-split:'

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
        const specs = getSpecs(config)
        console.log('%s there are %d found specs', label, specs.length)
        // console.log(specs)
        const splitN = Number(process.env.SPLIT)
        const splitIndex = Number(process.env.SPLIT_INDEX)
        console.log('%s split %d of %d', label, splitIndex, splitN)
        const splitSpecs = getChunk(specs, splitN, splitIndex)
        console.log(splitSpecs)
        config.specPattern = splitSpecs
        // TODO: if this is the first machine, it can output
        // the split chunks to the job summary
        return config
      }
    },
  },
})
