const request = require('request-promise-native');
const Post = require('./Post');
const SubredditResponse = require('./SubredditResponse');

const _ = require('lodash');

module.exports.getSubreddit = getSubreddit;

//Get the subreddit
function getSubreddit(subreddit) {

    //make the request to the reddit API
    return request.get('http://reddit.com/r/' + subreddit + '/.json?limit=1')
        .then((res) => {
            const resData = JSON.parse(res).data;
            if (resData.children.length === 0) {
                throw new Error('Subreddit not found');
            } else {
                return cleanResponse(resData);
            }
        }).catch((err) => {
            if (err.message = 'Subreddit not found') {
                throw err;
            } else {
                console.error(err);
                throw new Error('Error GETing subreddit posts, check logs for more');
            }
        });
}


//Clean up the response before sending it back to the controller
function cleanResponse(res) {
    const children = res.children;
    //access to this is guaranteed because array is check for emptiness earlier
    const subreddit = res.children[0].data.subreddit;

    //filter out stickied posts
    _.remove(children, (child) => {
        return child.data.stickied;
    });

    const posts = _.map(children, (child) => {
        return new Post(child.data.title, child.data.score, child.data.thumbnail, child.data.url);
    });

    return new SubredditResponse(subreddit, posts);
}

