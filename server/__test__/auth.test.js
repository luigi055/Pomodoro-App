const chai = require ('chai');
const chaiHTTP = require ('chai-http');
const User = require ('./../models/User');
const {users, populateUsers} = require ('./seed/seed');
const app = require ('./../server');

const expect = chai.expect;
chai.use (chaiHTTP);

beforeEach (populateUsers);

describe ('PATCH /auth/user/update', () => {
  it ('should change user name', done => {
    chai
      .request (app)
      .patch ('/auth/user/update')
      .send ({
        name: 'Pedro',
      })
      .end ((end, res) => {
        res.user = users[0];
        expect (res).to.have.status (200);
        done ();
      });
  });
});
