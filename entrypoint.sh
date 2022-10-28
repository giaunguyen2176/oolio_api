#!/bin/bash

set -e

node_modules/.bin/knex migrate:latest
node_modules/.bin/knex seed:run
npm start

exec "$@"
