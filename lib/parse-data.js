'use strict'

const repackDocuments = require('./repack-document')
const logger = require('./logger')

module.exports = (data) => {
  return new Promise((resolve, reject) => {
    const response = data['HentDataForArkiveringResponseElm']
    const documents = response['Elevelement']
    const error = response['Feilmelding']

    if (error) {
      console.error(JSON.stringify(error, null, 2))
    }
    logger(['parse-data', 'everything ok'])
    resolve(documents.map(repackDocuments))
  })
}
