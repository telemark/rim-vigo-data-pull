'use strict'

const tap = require('tap')
const saveData = require('../../lib/save-data')

tap.test('requires options to be specified', (test) => {
  const options = false
  const expectedErrorMessage = 'Missing required input: options object'
  saveData(options, (error, message) => {
    tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
    test.done()
  })
})

tap.test('requires options.filePath to be specified', (test) => {
  const options = {
    filepath: false
  }
  const expectedErrorMessage = 'Missing required input: options.filePath'
  saveData(options, (error, message) => {
    tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
    test.done()
  })
})

tap.test('requires options.fileData to be specified', (test) => {
  const options = {
    filePath: 'test/data/test/test.txt',
    fileData: false
  }
  const expectedErrorMessage = 'Missing required input: options.fileData'
  saveData(options, (error, message) => {
    tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
    test.done()
  })
})

tap.test('requires options.filePath to exist', (test) => {
  const options = {
    filePath: 'test/data/doesnotexist/test.txt',
    fileData: 'Data doomed to fail'
  }
  saveData(options, (error, message) => {
    tap.ok(error, 'error returned ok')
    test.done()
  })
})

tap.test('saves data', (test) => {
  const options = {
    filePath: 'test/data/test/test.txt',
    fileData: 'This is the test directory'
  }
  const expectedMessage = `saved file: ${options.filePath}`
  saveData(options, (error, message) => {
    if (error) {
      throw error
    }
    tap.equal(message, expectedMessage, expectedMessage)
    test.done()
  })
})
