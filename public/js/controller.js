(function() {
    angular.module("RedditApp").controller("RedditController", RedditController);

    function RedditController(RedditService) {
        const model = this;

        model.search = search;

        function init() {
            model.posts = [];
            model.notFound = false;
        }
        init();

        function search(subreddit) {
            RedditService.getPosts(subreddit)
                .then((posts) => {
                    //case for a 404
                    if (posts === null) {
                        model.notFound = true;
                    } else {
                        model.notFound = false;
                        model.posts = posts;
                    }
                });
        }
    }
})();