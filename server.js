const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());
const secretKey = 'your-secret-key';

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});

const users = [
  { id: 1, username: 'user1', password: '$2b$10$RDV6wYhVDmyURu9UcqBEfu7MabljwAAA6L6OCM/WP63R46emIHoUi' }, // Hashed password: "password1"
  { id: 2, username: 'user2', password: '$2b$10$CuX7I/zkjToLLj8NyJTsxuvYXVOzBe0PZEoUzhremTz04KFeUr7Aa' }, // Hashed password: "password2"
];

function authenticateUser(username, password) {
    const user = users.find(user => user.username === username);
    if (!user) {
        console.log(`User ${username} not found`);
        return null; // User not found
    }
    const match = bcrypt.compareSync(password, user.password);
    console.log(`Password match for ${username}:`, match);
    if (match) {
        return user; // Password is correct
    }
    return null // Password is incorrect
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
    if (!token) {
        return res.status(401).json({ error: 'Authentication token missing' });
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Token is invalid' });
        }
        req.user = user;
        next();
    });
}

app.get('/', (req, res) => {
    res.send('Hello Express Authentication, to create account make a post request to /auth/login');
});

app.post('/auth/login', (req, res) => {
    const { username, password } = req.body;
    const user = authenticateUser(username, password);

    if (!user) {
        return res.status(401).json({ error: 'Authentication failed' });
    }

    const token = jwt.sign({ userID: user.id, username: user.username }, secretKey, {
        expiresIn: '1h',
    });

    res.json({ token })
})

app.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});