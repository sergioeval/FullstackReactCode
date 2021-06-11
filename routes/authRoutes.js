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

	// video 49.- logging out users 
	app.get('/api/logout', function(req, res){
		req.logout();
		return res.send(req.user)
	});


	// just to see what user is authenticated 
	app.get('/api/current_user', function(req, res) {
		return res.send(req.user);
	});
};
