const db = require('../models/db');

exports.markAttendance = (req, res) => {
  const { date, status, leave_note, class_id, student_id } = req.body;

  if (!date || !status || !class_id || !student_id) {
    return res.status(400).json({ error: 'Required fields are missing.' });
  }

  const sql = `
    INSERT INTO Attendance (Date, Status, Leave_Note, Class_ID, Student_ID)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [date, status, leave_note || null, class_id, student_id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({
      message: 'Attendance marked successfully',
      attendance_id: result.insertId
    });
  });
};

exports.getAttendanceByClassAndDate = (req, res) => {
  const { class_id, date } = req.query;

  const sql = `
    SELECT a.Attendance_ID, a.Date, a.Status, a.Leave_Note, s.Name AS Student_Name
    FROM Attendance a
    JOIN Student s ON a.Student_ID = s.Student_ID
    WHERE a.Class_ID = ? AND a.Date = ?
  `;

  db.query(sql, [class_id, date], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getAttendanceByStudent = (req, res) => {
  const { student_id } = req.params;

  const sql = `
    SELECT Attendance_ID, Date, Status, Leave_Note
    FROM Attendance
    WHERE Student_ID = ?
    ORDER BY Date DESC
  `;

  db.query(sql, [student_id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.updateAttendance = (req, res) => {
  const { attendance_id } = req.params;
  const { status, leave_note } = req.body;

  const sql = `
    UPDATE Attendance
    SET Status = ?, Leave_Note = ?
    WHERE Attendance_ID = ?
  `;

  db.query(sql, [status, leave_note || null, attendance_id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Attendance updated successfully' });
  });
};

exports.deleteAttendance = (req, res) => {
  const { attendance_id } = req.params;

  const sql = `
    DELETE FROM Attendance WHERE Attendance_ID = ?
  `;

  db.query(sql, [attendance_id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Attendance deleted successfully' });
  });
};



exports.getAllAttendance = (req, res) => {
  const sql = `
    SELECT a.Attendance_ID, a.Date, a.Status, a.Leave_Note,
           c.Class_Name, s.Name AS Student_Name
    FROM Attendance a
    JOIN Class c ON a.Class_ID = c.Class_ID
    JOIN Student s ON a.Student_ID = s.Student_ID
    ORDER BY a.Date DESC
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};
