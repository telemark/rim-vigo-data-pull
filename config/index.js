'use strict'

const envs = process.env

module.exports = {
  COPIES_DIRECTORY_PATH: envs.COPIES_DIRECTORY_PATH || 'test/data/copies',
  ERRORS_DIRECTORY_PATH: envs.ERRORS_DIRECTORY_PATH || 'test/data/errors',
  QUEUE_DIRECTORY_PATH: envs.QUEUE_DIRECTORY_PATH || 'test/data/queue',
  URL: envs.URL || 'https://vigo.dummy.allthethings.win',
  USERNAME: envs.USERNAME || 'my-username',
  PASSWORD: envs.PASSWORD || 'my-password',
  ANTALL_DOKUMENTER: envs.ANTALL_DOKUMENTER || 1,
  FYLKE: envs.FYLKE || 8
}
