const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');

router.get('/', teacherController.getTeachers);
router.post('/', teacherController.addTeacher);

module.exports = router;
