const express = require('express');
const controller = require('./controller');
const router = express.Router();

router.get('/api/:subreddit', controller.getReddit);

module.exports = router;
