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
 * @desc	Show all the public stories
 * @route	GET /stories
 */
router.get('/', ensureAuth, async (req, res, next) => {
	try {
		const stories = await Story.find({ status: 'public' })
			.populate('user')
			.sort({ createdAt: 'desc'})
			.lean()
		res.render('stories/index', {
			stories
		});
	} catch (error) {
		console.error(error)
	}
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
});

/**
 * @desc	Show edit page
 * @route	GET /stories/edit/:id
 */
router.get('/edit/:id', ensureAuth, async (req, res, next) => {
	const story = await Story.findById({_id: req.params.id}).lean();
	if (!story) {
		return res.render('error/404');
	}

	if (story.user !== req.user.id) {
		res.redirect('stories');
	} else {
		res.render('story/edit', {
			story,
		})
	}
});

module.exports = router;