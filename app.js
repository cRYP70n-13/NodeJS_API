const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

const connectDB = require('./config/db');

// Load config file
dotenv.config({path: './config/config.env'});

connectDB();

const app = express();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('this shit is up and running'));