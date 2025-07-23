const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

// POST - Mark attendance
router.post('/', attendanceController.markAttendance);

// GET - Attendance by class and date
router.get('/by-class-date', attendanceController.getAttendanceByClassAndDate);

// GET - Attendance by student ID
router.get('/student/:student_id', attendanceController.getAttendanceByStudent);

// PUT - Update attendance
router.put('/:attendance_id', attendanceController.updateAttendance);

// DELETE - Delete attendance
router.delete('/:attendance_id', attendanceController.deleteAttendance);

router.get('/', attendanceController.getAllAttendance);

module.exports = router;


