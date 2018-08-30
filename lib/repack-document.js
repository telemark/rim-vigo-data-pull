'use strict'

const generateId = require('tfk-generate-unique-filename')

module.exports = (data) => {
  return Object.assign({ _id: generateId() }, data)
}
