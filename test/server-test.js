const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiAsPromised = require('chai-as-promised');
const server = require('../app.js');
const spies = require('chai-spies');

chai.should();

chai.use(chaiHttp);
chai.use(chaiAsPromised);
chai.use(spies);

describe('RedditApp', function() {
   it('should 404 on bad subreddit', function() {
       const spy = chai.spy();
       return chai.request(server)
           .get('/api/asdjgfa9ihgha')
           .then(spy)
           .catch((err) => {
                const res = err.response;
                res.should.have.status(404);
           })
           .then(() => {
                spy.should.not.have.been.called();
       });
   });
   it('should reject invalid subreddit-name', function() {
       const spy = chai.spy();
       return chai.request(server)
           .get('/api/@#$8')
           .then(spy)
           .catch((err) => {
                const res = err.response;
                res.should.have.status(400);
           })
           .then(() => {
                spy.should.not.have.been.called();
       });
   });
   it('should return response to valid subreddit', function() {
      return chai.request(server)
          .get('/api/aww')
          .then((response) => {
                response.res.body.should.have.length(20);
          });
   });
});