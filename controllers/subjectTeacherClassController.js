const db = require('../models/db');

exports.assignSubjectToTeacherInClass = (req, res) => {
  const { subject_id, teacher_id, class_id } = req.body;

  if (!subject_id || !teacher_id || !class_id) {
    return res.status(400).json({ error: 'subject_id, teacher_id, and class_id are required.' });
  }

  const sql = `
    INSERT INTO Subject_Teacher_Class (Subject_ID, Teacher_ID, Class_ID)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [subject_id, teacher_id, class_id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Assignment successful.' });
  });
};

exports.getSubjectsByTeacher = (req, res) => {
  const { teacher_id } = req.params;

  const sql = `
    SELECT stc.Subject_ID, s.Subject_Name, c.Class_ID, c.Class_Name
    FROM Subject_Teacher_Class stc
    JOIN Subject s ON stc.Subject_ID = s.Subject_ID
    JOIN Class c ON stc.Class_ID = c.Class_ID
    WHERE stc.Teacher_ID = ?
  `;

  db.query(sql, [teacher_id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

exports.getSubjectsByClass = (req, res) => {
  const { class_id } = req.params;

  const sql = `
    SELECT stc.Subject_ID, s.Subject_Name, t.Teacher_ID, t.Name AS Teacher_Name
    FROM Subject_Teacher_Class stc
    JOIN Subject s ON stc.Subject_ID = s.Subject_ID
    JOIN Teacher t ON stc.Teacher_ID = t.Teacher_ID
    WHERE stc.Class_ID = ?
  `;

  db.query(sql, [class_id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};
