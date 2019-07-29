'use strict'

const fs = require('fs')
const logger = require('./logger')

module.exports = (options, callback) => {
  return new Promise((resolve, reject) => {
    if (!options) {
      const error = new Error('Missing required input: options object')
      if (callback) {
        return callback(error, null)
      }
      reject(error)
    }
    if (!options.filePath) {
      const error = new Error('Missing required input: options.filePath')
      if (callback) {
        return callback(error, null)
      }
      reject(error)
    }
    if (!options.fileData) {
      const error = new Error('Missing required input: options.fileData')
      if (callback) {
        return callback(error, null)
      }
      reject(error)
    }
    fs.writeFile(options.filePath, options.fileData, (error) => {
      if (error) {
        if (callback) {
          return callback(error, null)
        }
        reject(error)
      } else {
        const msg = `saved file: ${options.filePath}`
        logger('info', ['save-data', msg])
        if (callback) {
          return callback(null, msg)
        }
        resolve(msg)
      }
    })
  })
}
