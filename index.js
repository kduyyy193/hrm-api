const express = require('express')
const path = require('path');

const connectDB = require('./config/database')

const users = require('./routes/api/users')

require('dotenv').config();

const app = express()

const PORT = process.env.PORT || 3001

app.use(cors())

connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/users', users)

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`)
})