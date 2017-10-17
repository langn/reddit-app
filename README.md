# reddit-app
A lightweight app to see the top posts on a subreddit.

For this app, I used NodeJS and AnuglarJS. I also used Boostrap for the CSS.

As far as node modules that I used, I included express, body-parser, lodash, request, and validator.

This app includes tests, using the mocha framework with chai. To run the tests, run `mocha` in the root directory.

### Some cool features
This app does a few cool things.
* Validates the input server-side to ensure that it it ASCII + alphanumeric, as subreddit names also need to meet this benchmarks.
* It gracefully handles errors querying reddit.
* Cleans up the response from the reddit API to prevent unneccessary data to be sent to the client.
* Correctly uses status codes depending on the issue (404 for subreddit not found, 400 for a bad request, 500 for other failure etc.)
* Responsive front end that will work on anything from a PC to a smartphone.
* Opens the post in a new tab so that the user won't have to search again.
* Extensible design following best practices.
* Gives self posts a default thumbnail so that the results returned from the backend are more consistent.
* ES6 + Promises for easy to read and understand code

### Running locally
To run this app locally, simple clone the repo, and run: `node app.js` in the root directory.

### Heroku deployment
This app is also deployed on Heroku!
[Click here to go to the app!](https://reddit-view.herokuapp.com)

### How is works
The app uses AngularJS as the front-end framework, which is configured to run as an SPA. In this case the app actually only has one page. The Angular front end queries the NodeJS backend with a GET request /api/:subreddit.

This path first checks to make sure the subreddit parameter is valid, and it not it returns a 400.
If it is, then it queries the top 20 posts of the reddit API for that subreddit, using the request module.
If the subreddit doesn't exist (the API returns an empty children array), then the app returns a 404.
If there is some other error, then the API returns a 500, and logs the error to the console.

The front end then resolves the promise for the response. 
If it contains an error code, then it displays an alert informing the user that the subreddit could not be found.
Otherwise, the posts are displayed in a (responsive) list, showing the thumbnail, the score, and the title of the post.
There is also a link to open the post in a new tab represented as a right arrow on the right side of a post lising.



