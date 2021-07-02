const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const keys = require("./config/keys");
require("./models/User");
require("./services/passport");

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

//mongoose.connect(keys.mongoURI)

const app = express();

app.use(bodyParser.json());

//added in video 47
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

// we can do this because we are exporting a function from authRoutes
require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);

// using port from an env variable
const PORT = process.env.PORT || 5000;
app.listen(PORT);
