const express = require('express');
const router = express.Router();
const { connection } = require('../config/database');
const upload = require('../middleware/upload');
const { sendRegistrationEmail } = require('../utils/email');

// GET all users
router.get('/', (req, res) => {
    const query = 'SELECT id, name, email, phone, profile_picture, created_at FROM users ORDER BY created_at DESC';
    connection.execute(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error', details: err.message });
        }
        res.json({ success: true, users: results });
    });
});

// GET single user
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT id, name, email, phone, profile_picture, created_at FROM users WHERE id = ?';
    connection.execute(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error', details: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ success: true, user: results[0] });
    });
});

// POST create new user
router.post('/', upload.single('profile_picture'), async (req, res) => {
    const { name, email, phone } = req.body;
    const profile_picture = req.file ? req.file.filename : null;

    if (!name || !email || !phone) {
        return res.status(400).json({ error: 'Name, email, and phone are required' });
    }

    const query = 'INSERT INTO users (name, email, phone, profile_picture) VALUES (?, ?, ?, ?)';
    connection.execute(query, [name, email, phone, profile_picture], async (err, results) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ error: 'Email already exists' });
            }
            return res.status(500).json({ error: 'Database error', details: err.message });
        }

        // Send registration email
        const emailSent = await sendRegistrationEmail(email, name);

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user: {
                id: results.insertId,
                name,
                email,
                phone,
                profile_picture
            },
            emailSent
        });
    });
});

// PUT update user
router.put('/:id', upload.single('profile_picture'), (req, res) => {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    const profile_picture = req.file ? req.file.filename : undefined;

    let query = 'UPDATE users SET name = ?, email = ?, phone = ?';
    let params = [name, email, phone];

    if (profile_picture) {
        query += ', profile_picture = ?';
        params.push(profile_picture);
    }

    query += ' WHERE id = ?';
    params.push(id);

    connection.execute(query, params, (err, results) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ error: 'Email already exists' });
            }
            return res.status(500).json({ error: 'Database error', details: err.message });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ success: true, message: 'User updated successfully' });
    });
});

// DELETE user
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM users WHERE id = ?';

    connection.execute(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error', details: err.message });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ success: true, message: 'User deleted successfully' });
    });
});

module.exports = router;
