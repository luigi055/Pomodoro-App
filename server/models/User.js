'use strict';

const mongoose = require ('mongoose');
const jwt = require ('jsonwebtoken');

mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema ({
  facebookID: String,
  googleID: String,
  name: String,
  email: String,
  avatar: String,
  Provider: String,
  signupDate: {
    type: Number,
    default: new Date ().getTime (),
  },
  lastLogin: Number,
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject ();

  const {
    _id,
    facebookID,
    googleID,
    name,
    email,
    avatar,
    Provider,
    signupDate,
    lastLogin,
  } = userObject;

  return {
    _id,
    facebookID,
    googleID,
    name,
    email,
    avatar,
    Provider,
    signupDate,
    lastLogin,
  };
};

userSchema.methods.updateLastLogin = function () {
  const user = this;

  // register new login date
  user.lastLogin = new Date ().getTime ();

  return user.save ();
};

userSchema.statics.findUserByIdAndUpdate = async function (id, body) {
  const User = this;

  try {
    const user = await User.findByIdAndUpdate (
      id,
      {
        $set: body,
      },
      {
        $new: true,
      }
    );

    return user;
  } catch (err) {
    return new Promise.reject ({
      status: 400,
    });
  }
};

const User = mongoose.model ('user', userSchema);

module.exports = User;
