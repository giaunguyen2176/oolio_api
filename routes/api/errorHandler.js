const debug = require('debug')('oolio-api:server');

module.exports = function () {
  return function (err, req, res, next) {
    debug(err);

    let messages = [];
    let errorCode = 1001; // custom error start from 1000 as ok, > 1000 is error

    /* Will handle different case of errors here, so no need to worry about error in controller */
    switch (err.name) {
      case 'Error':
        messages.push('Server has encountered an unexpected error.');
        break;
      case 'CustomError':
        if (err.message === 'EmptyResponse') {
          // record not found
          messages.push('Record not found');
          errorCode = err.code || 1002;
        } else {
          messages.push(err.message);
          errorCode = err.code;
        }
        break;
      case 'ValidationError':
        errorCode = 1003;
        err.details.forEach((error) => {
          messages.push(error.message);
        });
        break;
      default:
        messages.push('Server has encountered an unexpected error.')
    }

    // Always return client 200 status for handled situation
    // Client basically just need to care (200, 404 & 500)
    // In case of 200 they need to check success variable to determine the
    res.status(200);
    res.originalJSONResponse({
      data: {},
      success: false,
      errorCode: errorCode,
      messages: messages
    });
  }
};
