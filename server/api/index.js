'use strict'; //no undeclared variables;

const router = require('express').Router();

// NOTE: Any routes put here are ALREADY mounted on `/api`

// Internal APIs:
router.use('/calculations', require('./calculations'));
router.use('/evaluate', require('./evaluate'));
// router.use('/students', require('./students'));
// router.use('/campuses', require('./campuses'));

// External APIs:

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
