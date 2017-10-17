# reddit-app
A lightweight app to see the top posts on a subreddit.

For this app, I used NodeJS and AnuglarJS. I also used Boostrap for the CSS.

As far as node modules that I used, I included express, body-parser, lodash, request, and validator.

This app includes tests, using the mocha framework with chai. To run the tests, run `mocha` in the root directory.

### Some cool stuff
This app does a few cool things.
* Validates the input server-side to ensure that it it ASCII + alphanumeric, as subreddit names also need to meet this benchmarks.
* It gracefully handles errors querying reddit.
* Cleans up the response from the reddit API to prevent unneccessary data to be sent to the client.
* Correctly uses status codes depending on the issue (404 for subreddit not found, 400 for a bad request, 500 for other failure etc.)
* Responsive front end that will work on anything from a PC to a smartphone.

### Running locally
To run this app locally, simple clone the repo, and run: `node app.js` in the root directory.

### Heroku deployment
This app is also deployed on Heroku!
[Click here to go to the app!](https://reddit-view.herokuapp.com)


