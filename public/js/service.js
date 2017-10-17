(function() {
    angular.module("RedditApp").service("RedditService", RedditService);

    function RedditService($http) {
        this.getPosts = getPosts;

        function getPosts(subreddit) {
            return $http.get('/api/' + subreddit)
                .then((response) => {
                    if (response.status === 404) {
                        return null;
                    }
                    return response.data;
                }).catch(() => {
                    return null;
                });
        }

    }
})();