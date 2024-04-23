const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const app = express();
app.use(express.json());

const db = new sqlite3.Database(':memory:');


db.serialize(() => {
  db.run('CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT UNIQUE, password TEXT)');
});

app.post('/register', async (req, res) => {
  try {

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    db.run('INSERT INTO users (username, password) VALUES (?, ?)', [req.body.username, hashedPassword], (err) => {
      if (err) {
        return res.status(500).send('Error registering user');
      }
      res.status(201).send('User registered successfully');
    });
  } catch (error) {
    res.status(500).send('Error registering user');
  }
});

app.post('/login', async (req, res) => {
  try {

    db.get('SELECT * FROM users WHERE username = ?', [req.body.username], async (err, row) => {
      if (err) {
        return res.status(500).send('Error logging in');
      }
      if (!row) {
        return res.status(404).send('User not found');
      }

      const validPassword = await bcrypt.compare(req.body.password, row.password);
      if (!validPassword) {
        return res.status(401).send('Invalid password');
      }

      const token = jwt.sign({ userId: row.id }, 'cPL7gPPldiKIYRQzGUpWgQvevWYDCmbZOqoCanQ5csx1D-NicKXcGTDefEkJkPCL');
      res.status(200).json({ token });
    });
  } catch (error) {
    res.status(500).send('Error logging in');
  }
});


// function verifyToken(req, res, next) {
//   const token = req.headers['authorization'];
//   if (!token) {
//     return res.status(401).send('Access denied. Token is required');
//   }
//   try {
//     const decoded = jwt.verify(token, 'cPL7gPPldiKIYRQzGUpWgQvevWYDCmbZOqoCanQ5csx1D-NicKXcGTDefEkJkPCL');
//     req.userId = decoded.userId;
//     next();
//   } catch (error) {
//     res.status(401).send('Invalid token');
//   }
// }

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
