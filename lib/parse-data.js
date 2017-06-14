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
      logger('info', ['parse-data', 'ingen data', 'avslutter'])
      process.exit(0)
    } else if (error.FeilId !== '0') {
      logger('error', ['parse-data', 'FeilID', error.FeilId])
      logger('error', ['parse-data', 'Feiltype', error.Feiltype])
      logger('error', ['parse-data', 'DetaljertBeskrivelse', error.DetaljertBeskrivelse])
      if (error.FeilId !== '1') {
        const documentName = generateId('.json')
        const documentData = JSON.stringify(data, null, 2)
        const errorPath = `${config.ERRORS_DIRECTORY_PATH}/${documentName}`
        const jobOptions = {filePath: errorPath, fileData: documentData}
        saveData(jobOptions).then(() => {
          logger('error', ['parse-data', 'fil lagret', errorPath])
          reject(error)
        })
      } else {
        logger('info', ['parse-data', 'FeilID', error.FeilId, 'lagrer ikke fil'])
      }
    } else {
      const document = documents[0]
      logger('info', ['parse-data', 'data funnet', `${document.Fornavn} ${document.Etternavn}`])
      logger('info', ['parse-data', 'success'])
      resolve(documents.map(repackDocuments))
    }
  })
}
