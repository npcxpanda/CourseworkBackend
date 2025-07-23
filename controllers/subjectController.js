const db = require('../models/db');

exports.getSubjects = (req, res) => {
  const sql = `
    SELECT Subject_ID, Subject_Name
    FROM Subject
  `;

  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
};

exports.addSubject = (req, res) => {
  const { subject_name } = req.body;

  if (!subject_name) {
    return res.status(400).json({ error: 'Please provide subject name' });
  }

  const insertSql = `
    INSERT INTO Subject (Subject_Name)
    VALUES (?)
  `;

  db.query(insertSql, [subject_name], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({
        message: 'Subject added successfully',
        subject: {
          id: result.insertId,
          subject_name
        }
      });
    }
  });
};
