const express = require('express');

const { ensureAuth, ensureGuest } = require('../middlewares/auth');

const router = express.Router();

/**
 * @desc	Login/Landing page
 * @route	GET /
 */
router.get('/', ensureGuest, (req, res, next) => {
	res.render('Login', {
		layout: 'login',
	})
});

/**
 * @desc	Dashboard
 * @route	GET /dashboard
 */
router.get('/dashboard', ensureAuth, (req, res, next) => {
	res.render('dashboard')
});

module.exports = router;