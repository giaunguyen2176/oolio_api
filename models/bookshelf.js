const config = require('../knexfile');
const knex = require('knex')(config);
const bookshelf = require('bookshelf')(knex);
const debug = require('debug')('mts-api:server');

bookshelf.plugin('bookshelf-case-converter-plugin');

const ModelBase = require('bookshelf-modelbase')(bookshelf);

knex.raw('SELECT 1').then(() => {
  debug('Database connected');
})
  .catch((e) => {
    debug('Database not connected');
    debug(e);
  });

module.exports = ModelBase;
