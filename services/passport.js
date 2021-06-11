const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys"); // modificado en video 31

const User = mongoose.model("users");

passport.serializeUser(
	(user, done) => {
		//this is the id from the mongo db
		done(null, user.id);
	}
);


passport.deserializeUser(
	(id, done) => {
		User.findById(id).then(
			user => {
				done(null, user)
			}
		);	
	}
);


passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: "/auth/google/callback",
		},
		(accessToken, refreshToken, profile, done) => {
			// adding some of this in video 29
			//console.log("Access Token: ", accessToken);
			//console.log("Refresh Token", refreshToken);
			//console.log("Profile: ", profile);
			User.findOne({
				googleId: profile.id,
			}).then(existingUser => {
				if (existingUser) {
					//we already have a record with the given id
					done(null, existingUser);
				} else {
					// we dont have it , crete a new record
					new User({ googleId: profile.id })
						.save()
						.then(user => done(null, user));
				}
			});
		}
	)
);
