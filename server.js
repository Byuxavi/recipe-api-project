const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use('/', require('./routes'));

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        app.listen(port, () => {
            console.log(`🚀 Database connected and server running on port ${port}`);
        });
    })
    .catch((err) => {
        console.error('❌ Connection error:', err);
    });