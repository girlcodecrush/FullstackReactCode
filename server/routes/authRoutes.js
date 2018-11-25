const passport = require ('passport'); // has nothing to do w passport.js, here 'passport' is an npm passport module

// in the two route hanlders, both are working on an Express app object
// haven't defined app, app is defined in index.js
// what to be done is make its way to authRoutes.js file, get these routes to attach to it
//so make a new arrow function and export it from this file
//the arrow function wraps the both route handlers
//we're exporting a function from here and assume we call this function with the Express app object
//so add app as an arg of the func
// then, go over to index.js and do sth
module.exports = app => {
  app.get (
    '/auth/google',
    passport.authenticate ('google', {
      scope: ['profile', 'email'],
    })
  );
  //add another router to handle users visiting /auth/google/callback
  //passport takes over the auth process using the starategy, 'google'
  app.get ('/auth/google/callback', passport.authenticate ('google'));

  app.get ('/api/logout', (req, res) => {
    req.logout (); //logout() is automatically attached to the req obj by passport
    res.send (req.user); //send back an acknowledgement to the user that they signed out
  });

  app.get ('/api/current_user', (req, res) => {
    //res.send (req.session.passport);
    // res.send (req.session);
    res.send (req.user);
  });
};
