const {ObjectID} = require ('mongodb');
const jwt = require ('jsonwebtoken');
const mongoose = require ('./../../db/mongoose');
const User = require ('./../../models/User');

const userOneID = new ObjectID ();
const userTwoID = new ObjectID ();

const users = [
  {
    _id: userOneID,
    facebookID: '10155621005333815',
    googleID: '104111390419822488732',
    name: 'Pier Luigi Doganieri',
    email: 'test@email.com',
    avatar: null,
    tokens: [
      {
        access: 'auth',
        token: jwt
          .sign (
            {
              _id: userOneID.toHexString (),
              access: 'auth',
            },
            process.env.JWT_SECRET
          )
          .toString (),
      },
    ],
  },
  {
    _id: userTwoID,
    facebookID: '10155621005333815',
    googleID: '104111390419822488732',
    name: 'Pier Luigi Doganieri',
    email: 'test@email.com',
    avatar: null,
  },
];

function populateUsers (done) {
  User.remove ({})
    .then (() => {
      const userOne = new User (users[0]).save ();
      const userTwo = new User (users[1]).save ();

      return Promise.all ([userOne, userTwo]);
    })
    .then (() => done ())
    .catch (err => done (err));
}

module.exports = {
  users,
  populateUsers,
};
