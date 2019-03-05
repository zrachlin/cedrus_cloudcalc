const router = require('express').Router();
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const expressionStr = req.query.expression;
    //do more robust checks to determine if expression is valid/safe
    const result = eval(expressionStr);

    res.send({ result });
  } catch (error) {
    res.send('invalid expression');
  }
});
