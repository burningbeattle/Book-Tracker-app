const express = require('express');
const { pool } = require('./config/database');
const booksRouter = require('./routes/books');  // Make sure this path is correct
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// View engine
app.set('view engine', 'ejs');

// Use books router
app.use('/books', booksRouter);  // This should work now

// Home route
app.get('/', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM books ORDER BY date_read DESC');
        res.render('index', { books: rows });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});