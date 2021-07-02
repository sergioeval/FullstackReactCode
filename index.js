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

// this is needed to express works correctly when it is in the production env
// this will run only in production
if (process.env.NODE_ENV === "production") {
  // express will serve up production assets
  app.use(express.static("client/build"));
  // express will serve up the index.html file if it doesn't recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// using port from an env variable
const PORT = process.env.PORT || 5000;
app.listen(PORT);
