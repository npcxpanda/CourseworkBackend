const db = require('../models/db');

exports.getStudents = (req, res) => {
  db.query('SELECT * FROM student', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
};

exports.addStudent = (req, res) => {
  const { name, class_id, date_of_birth, address, contact_no } = req.body;

  const sql = `
    INSERT INTO Student (Name, Class_ID, Date_of_Birth, Address, Contact_No)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [name, class_id, date_of_birth, address, contact_no],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).json({
          message: 'Student added successfully',
          student: {
            id: result.insertId,
            name,
            class_id,
            date_of_birth,
            address,
            contact_no
          }
        });
      }
    }
  );
};
