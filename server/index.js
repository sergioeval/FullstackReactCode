const express = require("express");
const app = express();

app.get("/", (req, res) => {
	res.send({ hi: "There" });
});

// using port from an env variable
const PORT = process.env.PORT || 5000;
app.listen(PORT);
