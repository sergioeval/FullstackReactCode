const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys"); // modificado en video 31

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: "/auth/google/callback",
		},
		(accessToken, refreshToken, profile, done) => {
			// adding some of this in video 29
			console.log("Access Token: ", accessToken);
			console.log("Refresh Token", refreshToken);
			console.log("Profile: ", profile);
		}
	)
);
