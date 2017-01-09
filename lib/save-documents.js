'use strict'

const logger = require('./logger')
const saveData = require('./save-data')
const config = require('../config')

module.exports = (documents) => {
  return new Promise((resolve, reject) => {
    function next () {
      if (documents.length > 0) {
        const document = documents.pop()
        const documentName = `${document._id}.json`
        const documentData = JSON.stringify(document, null, 2)
        const jobPath = `${config.QUEUE_DIRECTORY_PATH}/${documentName}`
        const copyPath = `${config.COPIES_DIRECTORY_PATH}/${documentName}`
        const jobOptions = {filePath: jobPath, fileData: documentData}
        const copyOptions = {filePath: copyPath, fileData: documentData}

        logger(['save-documents', document._id, 'ready for saving'])
        saveData(jobOptions)
          .then(saveData(copyOptions))
          .then(() => {
            next()
          })
          .catch((error) => {
            logger(['save-documents', document._id, 'error'])
            reject(error)
          })
      } else {
        resolve('Documents saved')
      }
    }
    next()
  })
}
