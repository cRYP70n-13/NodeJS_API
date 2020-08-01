const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');

const connectDB = require('./config/db');

// Load config file
dotenv.config({path: './config/config.env'});

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

// Requiring my routes
const indexRoute = require('./routes/index.routes.js');

// Logging
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

// Static folder
app.use(express.static(path.join(__dirname)))

// Handlebars
app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

// Routes
app.use('/', indexRoute);

app.listen(PORT, () => console.log('this shit is up and running'));