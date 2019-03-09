// STEP3: remove routes/users.js  and create this new routes/api.js with blow content
const express = require('express');
const router = express.Router();
/**
 * Wrap a response JSON object with header & body parts as in Swagger/Loopback implementation
 * @param {Object} body
 */
function wrapJson(body) {
  if (body instanceof Error) {
    return {
      header: {
        status: 400,
        errorMessage: `${body.name}: ${body.message}`,
        currentDate: new Date()
      },
      body
    };
  }

  return {
    header: {
      status: 200,
      errorMessage: '',
      currentDate: new Date(),
      count: Array.isArray(body) ? body.length : body ? 1 : 0
    },
    body
  };
}

// a middleware to enhance res object
router.use((req, res, next) => {
  // attach a new method `sendRest` to res object for later use
  res.sendRest = body => {
    if (body instanceof Error) {
      res.statusCode = 400;
    }
    return res.json(wrapJson(body));
  };
  next();
});

/* API info */
router.get('/', function(req, res) {
  res.sendRest({
    version: '1.0.0',
    title: 'Nordic Shop RESTful API',
    description: 'RESTful API for Nordic Shop web app, OpenAPI compliance',
    contact: 'Thanh Tran <thanh.tran@nordiccoder.com'
  });
});

module.exports = router;

require('./api.admin')(router);
require('./api.users')(router);
require('./api.categories')(router);
require('./api.products')(router);
