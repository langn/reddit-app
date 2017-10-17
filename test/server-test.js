const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiAsPromised = require('chai-as-promised');
const server = require('../app.js');
const expect = chai.expect;

chai.use(chaiHttp);
chai.use(chaiAsPromised);

describe('RedditApp', function() {
   it('should 404 on bad subreddit', function(done) {
       let result = chai.request(server).get('/api/asdjgfa9ihgha');

       expect(result.then(res => res.status)).to.eventually.equal(404);
   });
   it('should reject invalid subreddit-name');
   it('should return response to valid subreddit');
});