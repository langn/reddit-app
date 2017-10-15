//Used to represent a post on a subreddit
class Post {

    constructor(title, score, thumbnail, link) {
        this.title = title;
        this.score = score;
        this.thumbnail = thumbnail;
        this.link = link;
    }

}

module.exports = Post;