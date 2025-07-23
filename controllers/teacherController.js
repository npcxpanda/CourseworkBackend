const db = require('../models/db');
const bcrypt = require('bcrypt');

exports.getTeachers = (req, res) => {
  db.query('SELECT * FROM Teacher', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
};

exports.addTeacher = async (req, res) => {
  const { name, email, password, contact_no, role_id = 2 } = req.body;

  if (!name || !email || !password || !contact_no) {
    return res.status(400).json({ error: 'Please fill in all required fields' });
  }

  const checkEmailSql = 'SELECT * FROM Teacher WHERE Email = ?';

  db.query(checkEmailSql, [email], async (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (results.length > 0) {
      return res.status(400).json({ error: 'Teacher with this email already exists' });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const insertSql = `
        INSERT INTO Teacher (Name, Email, Password, Contact_No, Role_ID)
        VALUES (?, ?, ?, ?, ?)
      `;

      db.query(
        insertSql,
        [name, email, hashedPassword, contact_no, role_id],
        (err, result) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          } else {
            res.status(201).json({
              message: 'Teacher added successfully',
              teacher: {
                id: result.insertId,
                name,
                email,
                contact_no,
                role_id
              }
            });
          }
        }
      );
    } catch (hashErr) {
      res.status(500).json({ error: 'Error hashing password' });
    }
  });
};
