const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');

// Get all books
router.get('/', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM books ORDER BY date_read DESC');
        res.render('index', { books: rows });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Form for adding a new book
router.get('/new', (req, res) => {
    res.render('new-book');
});

// Add a new book
router.post('/', async (req, res) => {
    try {
        const { title, author, isbn, notes, rating, date_read } = req.body;
        const { rows } = await pool.query(
            'INSERT INTO books (title, author, isbn, notes, rating, date_read) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [title, author, isbn, notes, rating, date_read]
        );
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;  // Make sure this is the only export