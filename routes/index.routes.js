const express = require('express');

const router = express.Router();

/**
 * @desc	Login/Landing page
 * @route	GET /
 */
router.get('/', (req, res, next) => {
	res.render('Login', {
		layout: 'login',
	})
});

/**
 * @desc	Dashboard
 * @route	GET /dashboard
 */
router.get('/dashboard', (req, res, next) => {
	res.render('dashboard')
});

module.exports = router;