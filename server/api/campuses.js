const router = require('express').Router();
const { Student, Campus } = require('../db/index');

module.exports = router;

// This will be served up at /api/campuses
router.get('/', async (req, res, next) => {
  try {
    const campuses = await Campus.findAll();
    res.json(campuses);
  } catch (err) {
    next(err);
  }
});

router.get('/:campusId', async (req, res, next) => {
  try {
    const id = req.params.campusId;
    const campus = await Campus.findOne({
      where: { id },
      include: [{ model: Student }],
    });
    res.json(campus);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newCampus = await Campus.create(req.body);
    res.json(newCampus);
  } catch (error) {
    next(error);
  }
});

router.delete('/:campusId', async (req, res, next) => {
  try {
    const id = req.params.campusId;
    const campusToDelete = await Campus.findOne({ where: { id } });
    await campusToDelete.destroy();
    res.json(campusToDelete);
  } catch (error) {
    next(error);
  }
});

router.put('/:campusId', async (req, res, next) => {
  try {
    const id = req.params.campusId;
    await Campus.update(req.body, { where: { id } });
    const updatedCampus = await Campus.findOne({
      where: { id },
      include: [{ model: Student }],
    });
    res.json(updatedCampus);
  } catch (error) {
    next(error);
  }
});
