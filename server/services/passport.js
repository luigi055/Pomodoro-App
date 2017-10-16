const passport = require ('passport');
const FacebookStrategy = require ('passport-facebook');
const GoogleStrategy = require ('passport-google-oauth20');
const User = require ('./../models/User');

passport.serializeUser ((user, done) => {
  done (null, user.id);
});

passport.deserializeUser (function (id, done) {
  //console.log (id); // from mongodb _id
  User.findById (id).then (user => done (null, user));
});

// FACEBOOK AUTHENTICATION
passport.use (
  new FacebookStrategy (
    {
      clientID: process.env.facebookClientID,
      clientSecret: process.env.facebookClientSecret,
      callbackURL: '/auth/facebook/callback',
      profileFields: ['id', 'displayName', 'photos', 'email'],
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      const {id, displayName: name, emails, photos: avatar, provider} = profile;

      try {
        const userExist = await User.findOne ({
          facebookID: id,
        });
        // if user already exist pass in it.
        if (userExist) {
          userExist.updateLastLogin ();
          return done (null, userExist);
        } else {
          // if user doesnt exist but has his/her email assigned use this
          const emailExist = await User.findOne ({
            email: emails[0].value,
          });
          if (emailExist) {
            const updatedUser = await User.findByIdAndUpdate (emailExist._id, {
              $set: {
                facebookID: id,
              },
            });
            updatedUser.updateLastLogin ();
            return done (null, updatedUser);
          }
        }

        // if account doesnt exist and dont have an assotiated email to it neither...
        // Create a new one
        const newUser = new User ({
          facebookID: id,
          name,
          email: emails[0].value,
          avatar: avatar[0].value,
          provider,
        });

        const user = await newUser.save ();
        user.updateLastLogin ();
        done (null, user);
      } catch (err) {
        done (err);
      }
    }
  )
);

// GOOGLE AUTHENTICATION
passport.use (
  new GoogleStrategy (
    {
      clientID: process.env.googleClientID,
      clientSecret: process.env.googleClientSecret,
      callbackURL: '/auth/google/callback',
      // profileFields: ['id', 'displayName', 'photos', 'email'],
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      const {id, displayName: name, emails, photos: avatar, provider} = profile;
      try {
        const userExist = await User.findOne ({
          googleID: id,
        });
        // if user already exist pass in it.
        if (userExist) {
          userExist.updateLastLogin ();
          return done (null, userExist);
        } else {
          // if user doesnt exist but has his/her email assigned use this
          const emailExist = await User.findOne ({
            email: emails[0].value,
          });
          if (emailExist) {
            const updatedUser = await User.findByIdAndUpdate (emailExist._id, {
              $set: {
                googleID: id,
              },
            });
            updatedUser.updateLastLogin ();
            return done (null, updatedUser);
          }
        }

        const newUser = new User ({
          googleID: id,
          name,
          email: emails[0].value,
          avatar: avatar[0].value,
          provider,
        });

        const user = await newUser.save ();
        user.updateLastLogin ();
        done (null, user);
      } catch (err) {
        done (err);
      }
    }
  )
);
