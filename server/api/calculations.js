const router = require('express').Router();
const { Calculation } = require('../db/index');

module.exports = router;

// This will be served up at /api/calculations
router.get('/', async (req, res, next) => {
  try {
    const calculations = await Calculation.findAll();
    res.json(calculations);
  } catch (err) {
    next(err);
  }
});

router.get('/:calculationId', async (req, res, next) => {
  try {
    const id = req.params.calculationId;
    const calculation = await Calculation.findOne({
      where: { id },
    });
    res.json(calculation);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newCalculation = await Calculation.create(req.body);
    res.json(newCalculation);
  } catch (error) {
    next(error);
  }
});

router.delete('/:calculationId', async (req, res, next) => {
  try {
    const id = req.params.calculationId;
    const calculationToDelete = await Calculation.findOne({ where: { id } });
    await calculationToDelete.destroy();
    res.json(calculationToDelete);
  } catch (error) {
    next(error);
  }
});

router.put('/:calculationId', async (req, res, next) => {
  try {
    const id = req.params.calculationId;
    await Calculation.update(req.body, { where: { id } });
    const updatedCalculation = await Calculation.findOne({
      where: { id },
      include: [{ model: Student }],
    });
    res.json(updatedCalculation);
  } catch (error) {
    next(error);
  }
});
