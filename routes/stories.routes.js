const express = require('express');

const { ensureAuth } = require('../middlewares/auth');

const Story = require('../models/Story');

const router = express.Router();

/**
 * @desc	Show add page
 * @route	GET /stories/add
 */
router.get('/add', ensureAuth, (req, res, next) => {
	res.render('stories/add')
});

/**
 * @desc	Process and form
 * @route	POST /stories
 */
router.post('/', ensureAuth, async (req, res, next) => {
	try {
		req.body.user = req.user.id;
		const createdStory = await Story.create(req.body);
		console.log(createdStory);
		res.redirect('/dashboard');
	} catch (error) {
		console.error(error)
		res.render('error/500')
	}
})
module.exports = router;