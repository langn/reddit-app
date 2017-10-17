const request = require('request-promise-native');
const Post = require('./Post');

const _ = require('lodash');

module.exports.getSubreddit = getSubreddit;

//Get the subreddit
function getSubreddit(subreddit) {

    //make the request to the reddit API
    return request.get('http://reddit.com/r/' + subreddit + '/.json?limit=20')
        .then((res) => {
            const resData = JSON.parse(res).data;
            if (resData.children.length === 0) {
                throw new Error('Subreddit not found');
            } else {
                return cleanResponse(resData);
            }
        }).catch((err) => {
            if (err.message === 'Subreddit not found') {
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

    //filter out stickied posts
    _.remove(children, (child) => {
        return child.data.stickied;
    });

    const posts = _.map(children, (child) => {
        //if its a self post add a default thumbnail
        if (child.data.thumbnail === 'self') {
            child.data.thumbnail = 'https://b.thumbs.redditmedia.com/feRJSnTxlM4uvfLUDrRGla5iudnXpHKbAFijOwp6aZo.jpg'
        }
        return new Post(child.data.title, child.data.score, child.data.thumbnail, child.data.url);
    });

    return posts;
}

