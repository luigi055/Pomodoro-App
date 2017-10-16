const chai = require ('chai');
const chaiHTTP = require ('chai-http');
const User = require ('./../models/User');
const {users, populateUsers} = require ('./seed/seed');
const app = require ('./../server');

const expect = chai.expect;
chai.use (chaiHTTP);

beforeEach (populateUsers);
