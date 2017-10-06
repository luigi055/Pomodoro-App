require ('./config/config.js');
// even though you'd never use mongoose in this file.
// just require and let mongoose be in the scope of the server.js
// since in here there is the connect method which link the app with the mongodb db
const mongoose = require ('./db/mongoose');
const express = require ('express');
const bodyParser = require ('body-parser');
const authRoutes = require ('./routes/authRoutes');
const passport = require ('passport');
const cookieSession = require ('cookie-session');

require ('./services/passport');
const app = express ();
const PORT = process.env.PORT || 3000;

app.use (
  cookieSession ({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.cookieKey],
  })
);

app.use (bodyParser.json ());
app.use (
  bodyParser.urlencoded ({
    extended: false,
  })
);
app.use (passport.initialize ());
app.use (passport.session ());

authRoutes (app);

app.get ('/', (req, res) => {
  res.send ({
    app: 'Complete Pomodoro App',
  });
});

app.listen (PORT, () => {
  console.log (`server successfully listening on port ${PORT}`);
});
