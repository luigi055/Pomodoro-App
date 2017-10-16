const passport = require ('passport');
const auth = require ('./../middlewares/auth');
const {
  getUser,
  getUsers,
  logout,
  updateUser,
} = require ('./../controllers/authController');

module.exports = app => {
  // Facebook Auth Routes
  app.get ('/auth/facebook', passport.authenticate ('facebook'));
  app.get (
    '/auth/facebook/callback',
    passport.authenticate ('facebook', {
      successRedirect: '/auth/user',
      failureRedirect: '/',
      // failureFlash: 'Invalid username or password.',
      // successFlash: 'Welcome!',
      // session: false,
    })
  );

  // Google Auth Routes
  app.get (
    '/auth/google',
    passport.authenticate ('google', {
      scope: ['profile', 'email'],
    })
  );
  app.get (
    '/auth/google/callback',
    passport.authenticate ('google', {
      successRedirect: '/auth/user',
      failureRedirect: '/',
      // failureFlash: 'Invalid username or password.',
      // successFlash: 'Welcome!',
      // session: false,
    })
  );

  app.get ('/auth/user', auth, getUser);
  app.get ('/auth/users', auth, getUsers);
  app.get ('/auth/logout', auth, logout);
  app.patch ('/auth/user/update', auth, updateUser);
};
