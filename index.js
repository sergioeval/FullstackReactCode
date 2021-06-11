const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const keys = require("./config/keys");
//require('./models/User')
require("./services/passport");

const client = new MongoClient(keys.mongoURI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

client.connect(function (err) {
	if (err) {
		console.log(err);
	} else {
		const collection = client.db("dev").collection("users");
		// perform collection actions
		client.close();
	}
});

/*
mongoose.connect(teys.mongoURI,
	{
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true
	}
);
*/

const app = express();

// we can do this because we are exporting a function from authRoutes
require("./routes/authRoutes")(app);

// using port from an env variable
const PORT = process.env.PORT || 5000;
app.listen(PORT);
