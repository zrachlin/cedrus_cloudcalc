const router = require('express').Router();
const { Student, Campus } = require('../db/index');

module.exports = router;

// This will be served up at /api/students
router.get('/', async (req, res, next) => {
  try {
    const students = await Student.findAll({ include: [{ model: Campus }] });
    res.json(students);
  } catch (err) {
    next(err);
  }
});

router.get('/:studentId', async (req, res, next) => {
  try {
    const id = req.params.studentId;
    const student = await Student.findOne({
      where: { id },
      include: [{ model: Campus }],
    });
    res.json(student);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newStudent = await Student.create(req.body);
    const student = await Student.findOne({
      where: { id: newStudent.id },
      include: [{ model: Campus }],
    });
    res.json(student);
  } catch (error) {
    next(error);
  }
});

router.delete('/:studentId', async (req, res, next) => {
  try {
    const id = req.params.studentId;
    const studentToDelete = await Student.findOne({ where: { id } });
    await studentToDelete.destroy();
    res.json(studentToDelete);
  } catch (error) {
    next(error);
  }
});

router.put('/:studentId', async (req, res, next) => {
  try {
    const id = req.params.studentId;
    await Student.update(req.body, { where: { id } });
    const updatedStudent = await Student.findOne({
      where: { id },
      include: [{ model: Campus }],
    });
    res.json(updatedStudent);
  } catch (error) {
    next(error);
  }
});
