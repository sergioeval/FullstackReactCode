const mongoose = require("mongoose");
//const Schema = mongoose.Schema;
const { Schema } = mongoose; // this is the same as the one up we are going to be using this sintax

const userSchema = new Schema({
  googleId: String,
  credits: { type: Number, default: 0 },
});

// if the collection with the same name is in mongo ,
// it will not be deleted , it will just use the same collection a
// already created
mongoose.model("users", userSchema);
