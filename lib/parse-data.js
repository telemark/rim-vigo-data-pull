'use strict'

const generateId = require('tfk-generate-unique-filename')
const config = require('../config')
const saveData = require('./save-data')
const repackDocuments = require('./repack-document')
const logger = require('./logger')

module.exports = (data) => {
  return new Promise((resolve, reject) => {
    const response = data['HentDataForArkiveringResponseElm']
    const documents = response['Elevelement']
    const error = response['Feilmelding'] || {}

    if (error.FeilId === '0' && error.Feiltype !== '') {
      logger(['parse-data', 'ingen data', 'avslutter'])
      process.exit(0)
    } else if (error.FeilId !== '0') {
      logger(['parse-data', 'error', 'lagrer fil'])
      const documentName = generateId('.json')
      const documentData = JSON.stringify(document, null, 2)
      const errorPath = `${config.ERRORS_DIRECTORY_PATH}/${documentName}`
      const jobOptions = {filePath: errorPath, fileData: documentData}
      saveData(jobOptions).then(() => {
        logger(['parse-data', 'error', 'fil lagret', errorPath])
        reject(error)
      })
    }

    const document = documents[0]
    logger(['parse-data', 'data funnet', `${document.Fornavn} ${document.Etternavn}`])
    logger(['parse-data', 'everything ok'])
    resolve(documents.map(repackDocuments))
  })
}
