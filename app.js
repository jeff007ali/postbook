const express = require('express');

const app = express();

// Middleware
app.use('/posts', () => {
    
});

// Routes
app.get('/', (req, res) => {
    res.send('home');
});

app.get('/posts', (req, res) => {
    res.send('posts');
});

// where we can listen the server
app.listen(3000);