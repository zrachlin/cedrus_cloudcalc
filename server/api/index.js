'use strict'; //no undeclared variables;

const router = require('express').Router();

// NOTE: Any routes put here are ALREADY mounted on `/api`

// Internal APIs:
router.use('/students', require('./students'));
router.use('/campuses', require('./campuses'));

// External APIs:
router.use('/externalAPI', require('./externalAPI'));

// If someone makes a request that starts with `/api`,
// but there is not a corresponding router, this piece of
// middleware will generate a 404, and send it to the
// error-handling endware!
router.use((req, res, next) => {
  const err = new Error('API route not found!');
  err.status = 404;
  next(err);
});

module.exports = router;
