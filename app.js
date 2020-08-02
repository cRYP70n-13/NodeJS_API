const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const passport = require('passport');
const session  = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');

const connectDB = require('./config/db');
const { formatDate } = require('./helpers/hbs');

// Load config file
dotenv.config({path: './config/config.env'});

// Passport config
require('./config/passport')(passport);

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

// Requiring my routes
const indexRoute = require('./routes/index.routes.js');
const authRoutes = require('./routes/auth.routes');
const storiesRoutes = require('./routes/stories.routes');
const { ppid } = require('process');

// Logging
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Sessions middleware
app.use(session({
	secret: 'cRYP70N',
	resave: false,
	saveUninitialized: false,
	store: new MongoStore({
		mongooseConnection: mongoose.connection
	})
}));

// the passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Handlebars
app.engine('.hbs', exphbs({helpers: {
	formatDate
}, defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

// Routes
app.use('/', indexRoute);
app.use('/auth', authRoutes);
app.use('/stories', storiesRoutes);

app.listen(PORT, () => console.log('this shit is up and running'));