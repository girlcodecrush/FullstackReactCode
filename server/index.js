const express = require ('express');
const mongoose = require ('mongoose');
const cookieSession = require ('cookie-session'); //get an access to cookie-session
const passport = require ('passport'); // tell passpot to use cookie-session for auth

const keys = require ('./config/keys');
require ('./models/User');
require ('./services/passport');

//import authRoutes
//now, authRoutes is a function that takes the app object and attaches the routes to it
//last step is make sure to call authRoutes with the app obj **
//const authRoutes = require ('./routes/authRoutes');
//refactoring further ; delete the line 7 and move the require part to line 12

//instruct mongoose to connect to MongoDB
mongoose.connect (keys.mongoURI);

const app = express ();

app.use (
  cookieSession ({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);
// to get passport to make sure of using cookie-session for auth
// the following two lines of code are necessary
app.use (passport.initialize ());
app.use (passport.session ());

// ** the relevant code below
require ('./routes/authRoutes') (app);
// line 12(above) : index.js calls authRoutes(the require part),invoked with the app object

//take the passport library and inform it of how to make the use of GoogleStrategy inside the app
//two keys passed in to GoogleStrategy

const PORT = process.env.PORT || 5000;
app.listen (PORT);
