const subredditService = require('./service');
const validator = require('validator');

module.exports.getReddit = getReddit;

function getReddit(req, res) {
    const subreddit = req.params.subreddit;

    if (!validate(subreddit)) {
        return res.status(400).json('The subreddit name must be alphanumeric and ASCII');
    }

    subredditService.getSubreddit(subreddit)
        .then((response) => {
            return res.status(200).json(response);
        }).catch((err) => {
            if (err.message === 'Subreddit not found') {
                return res.sendStatus(404);
            } else {
                return res.sendStatus(500);
            }
    });
}

//Ensure that this subreddit has a valid name, otherwise error
function validate(subreddit) {
    return validator.isAscii(subreddit) && validator.isAlphanumeric(subreddit);
}
