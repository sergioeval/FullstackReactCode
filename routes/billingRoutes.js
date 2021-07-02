const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require("../middlewares/requireLogin");

module.exports = (app) => {
  app.post("/api/stripe", requireLogin, async (req, res) => {
    // creting the charge
    const charge = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      description: "$5 dollars for 5 credits",
      source: req.body.id,
    });

    //this will update the user database adding 5 credits
    req.user.credits += 5;
    const user = await req.user.save();

    res.send(user);
  });
};
