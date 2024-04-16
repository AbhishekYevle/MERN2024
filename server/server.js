require('dotenv').config();
const express = require("express");
const app = express();
const PORT = 5000;
const router = require("./router/auth-router");
const connectDB = require("./utils/db");

app.use(express.json());

app.use('/api/auth',router);

// app.get('/', (req,res) => {
//     res.status(200).send('Welcome to Home Page.');
// });
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}`);
    });
});

// app.get('/register', (req,res) => {
//     res.status(200).send("Hello Welcome to Register Page.");
// });