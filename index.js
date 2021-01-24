const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const postRoutes = require("./routes/posts");
const commentRoutes = require("./routes/comments");
require('dotenv/config');

// MIDDLEWARE
// Configure bodyparser to handle post requests
app.use(bodyParser.json());
// Use different routes in the App
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

// Connect to Mongoose and set connection variable
mongoose.connect(process.env.DB_STRING, {useNewUrlParser: true, useUnifiedTopology: true}, () => 
    console.log("Connected to DB")
);

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with NodeJs and ExpressJs'));

// Launch app to listen to specified port
var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Running RestHub on port " + port);
});