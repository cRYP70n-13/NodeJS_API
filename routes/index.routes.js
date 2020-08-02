const express = require('express');

const { ensureAuth, ensureGuest } = require('../middlewares/auth');

const Story = require('../models/Story');

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
router.get('/dashboard', ensureAuth, async (req, res, next) => {
	try {
		const stories = await Story.find({ user: req.user.id }).lean();
		res.render('dashboard', {
			name: req.user.firstName,
			stories
		});
	} catch (error) {
		console.error(error);
		res.render('error/500');
	}

});

module.exports = router;