const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);  // Your Stripe secret key

// Create a payment intent
const stripeController = {
createPaymentIntent : async (req, res) => {
  try {
    const { amount } = req.body;

    // Create a payment intent with the specified amount
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // amount in cents
      currency: 'usd',  // Change this based on your currency
    });

    // Send the client secret to the frontend
    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating payment intent');
  }
}}

module.exports = stripeController;
