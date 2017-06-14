'use strict'

const client = require('rim-service-client')
const parseData = require('./lib/parse-data')
const saveDocuments = require('./lib/save-documents')
const updateStats = require('./lib/update-stats')
const logger = require('./lib/logger')
const config = require('./config')

const argOpts = {
  antallElevDokument: config.ANTALL_DOKUMENTER,
  fylke: config.FYLKE
}

const args = client.getDataToArchive(argOpts)

const clientOpts = {
  url: config.URL,
  username: config.USERNAME,
  password: config.PASSWORD,
  data: args
}

client(clientOpts)
  .then(parseData)
  .then(saveDocuments)
  .then(updateStats)
  .then((message) => {
    logger('info', ['index', 'finished'])
    process.exit(0)
  }).catch((error) => {
    logger('error', ['index', JSON.stringify(error)])
    process.exit(1)
  })
