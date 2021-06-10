const passport = require("passport");

module.exports = function (app) {
	// added in video 26 26
	app.get(
		"/auth/google",
		passport.authenticate("google", {
			scope: ["profile", "email"],
		})
	);

	// video 28
	app.get("/auth/google/callback", passport.authenticate("google"));
};
