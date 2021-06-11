const express = require("express");
const mongoose = require('mongoose')
const keys = require('./config/keys')
require('./models/User')
require("./services/passport");


mongoose.connect(keys.mongoURI,
	{
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true
	}
);

//mongoose.connect(keys.mongoURI)

const app = express();

// we can do this because we are exporting a function from authRoutes
require("./routes/authRoutes")(app);

// using port from an env variable
const PORT = process.env.PORT || 5000;
app.listen(PORT);
