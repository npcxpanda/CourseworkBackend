const express = require('express');
const router = express.Router();
const controller = require('../controllers/subjectTeacherClassController');

// Assign a subject to a teacher in a class
router.post('/assign', controller.assignSubjectToTeacherInClass);

// Get all subjects taught by a specific teacher
router.get('/teacher/:teacher_id', controller.getSubjectsByTeacher);

// Get all subjects assigned in a specific class
router.get('/class/:class_id', controller.getSubjectsByClass);

module.exports = router;