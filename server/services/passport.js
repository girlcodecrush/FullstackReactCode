const passport = require ('passport');
//passport-google-oauth20 exports a couple of properties, one of them is Strategy (see below)
//we'll use GoogleStrategy to instruct passport on how to authenticate users with Oauth
const GoogleStrategy = require ('passport-google-oauth20').Strategy;
//import keys.js into index.js;pass the keys to GoogleStrategy
//then, GoogleStratey can identify the app to the google Oauth api
const mongoose = require ('mongoose');
const keys = require ('../config/keys'); // CHECK!> in this file, adjust the path of keys.js NOt ./ BUT ../
// need to get access to the user model class
const User = mongoose.model ('users');
// you need to get access to mongoose model in this file
passport.serializeUser ((user, done) => {
  done (null, user.id);
});

passport.deserializeUser ((id, done) => {
  User.findById (id).then (user => {
    done (null, user);
  });
});

passport.use (
  new GoogleStrategy (
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true,
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne ({googleId: profile.id}).then (existingUser => {
        if (existingUser) {
          done (null, existingUser);
        } else {
          new User ({googleId: profile.id})
            .save ()
            .then (user => done (null, user));
        }
      });

      // new User ({googleId: profile.id}).save (); // create new model instances using the User model class
    }
  )
);
