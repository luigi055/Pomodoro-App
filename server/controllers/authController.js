'use strict';
const User = require ('./../models/User');

function getUser (req, res) {
  res.send (req.user);
}

async function getUsers (req, res) {
  try {
    const users = await User.find ({});
    res.send (users);
  } catch (err) {
    res.status (400).send ();
  }
}

function logout (req, res) {
  req.logout ();
  res.redirect ('/');
}

async function updateUser (req, res) {
  const {user: {_id}, body} = req;

  try {
    const user = await User.findUserByIdAndUpdate (_id, body);
    res.send (user);
  } catch (err) {
    res.status (404).send ();
  }
}

module.exports = {
  getUser,
  getUsers,
  logout,
  updateUser,
};
