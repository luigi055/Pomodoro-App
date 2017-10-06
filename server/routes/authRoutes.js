const passport = require ('passport');

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

  app.get ('/auth/logout', (req, res) => {
    req.logout ();
    res.redirect ('/');
  });

  app.get ('/auth/user', (req, res) => {
    res.send (req.user);
  });
};
