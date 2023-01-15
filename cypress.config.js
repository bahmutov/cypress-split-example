const { getSpecs } = require('find-cypress-specs')
const { defineConfig } = require('cypress')
const ghCore = require('@actions/core')
const cTable = require('console.table')

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

const isDefined = (x) => typeof x !== 'undefined'

module.exports = defineConfig({
  e2e: {
    // baseUrl, etc
    supportFile: false,
    fixturesFolder: false,
    setupNodeEvents(on, config) {
      if (config.specs) {
        console.log(config.specs)
      }

      // the user can specify the split flag / numbers
      // using either OS process environment variables
      // or Cypress env variables
      let SPLIT = process.env.SPLIT || config.env.split
      let SPLIT_INDEX = process.env.SPLIT_INDEX || config.env.splitIndex
      if (SPLIT === 'true' || SPLIT === true) {
        // the user wants us to determine the machine index
        // and the total number of machines, which is possible for some CI systems
        if (process.env.CIRCLECI) {
          SPLIT = process.env.CIRCLE_NODE_TOTAL
          SPLIT_INDEX = process.env.CIRCLE_NODE_INDEX
          console.log(
            '%s detected CircleCI machine %d of %d',
            label,
            SPLIT,
            SPLIT_INDEX,
          )
        } else {
          throw new Error('Do not know how to determine the correct split')
        }
      }

      if (isDefined(SPLIT) && isDefined(SPLIT_INDEX)) {
        const specs = getSpecs(config)
        console.log('%s there are %d found specs', label, specs.length)
        // console.log(specs)
        const splitN = Number(SPLIT)
        const splitIndex = Number(SPLIT_INDEX)
        console.log('%s split %d of %d', label, splitIndex, splitN)
        const splitSpecs = getChunk(specs, splitN, splitIndex)

        const specRows = splitSpecs.map((specName, k) => {
          return [String(k + 1), specName]
        })
        cTable(['k', 'spec'], specRows)

        if (process.env.GITHUB_ACTIONS) {
          // https://github.blog/2022-05-09-supercharging-github-actions-with-job-summaries/

          ghCore.summary
            .addHeading(
              `${label}: split ${splitIndex + 1} of ${splitN} (${
                splitSpecs.length
              } specs)`,
            )
            .addTable([
              [
                { data: 'k', header: true },
                { data: 'spec', header: true },
              ],
              ...specRows,
            ])
            .addLink('cypress-split', 'https://cypress.tips')
            .write()
        }

        config.specPattern = splitSpecs
        // TODO: if this is the first machine, it can output
        // the split chunks to the job summary
        return config
      }
    },
  },
})
