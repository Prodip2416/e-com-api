const { Payment } = require("../models");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // Replace with your Stripe secret key

// Get list of all users
const createPayment = async (req, res) => {
  try {
    const { order_id, amount, currency } = req.body;

    // const paymentIntent = await stripe.paymentIntents.create({
    //   amount: amount * 100, // Stripe expects amounts in cents
    //   currency,
    //   metadata: { order_id }, // Attach order ID for tracking
    // });

    const payment = await Payment.create({
      order_id,
      payment_method: "credit_card",
      payment_status: "pending",
      payment_date: new Date(),
    });

    // Send client secret to the frontend for further processing
    res.status(200).json({
      data: payment,
      // data: paymentIntent.client_secret,
      message: "Payment intent created successfully",
    });
  } catch (error) {
    // console.log(error);
    res
      .status(500)
      .json({ status: "error", message: "Error fetching users.", error });
  }
};
const handleStripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET // Replace with your webhook secret
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res
      .status(400)
      .send({ status: "error", message: `Webhook error: ${err.message}` });
  }

  // Handle the event
  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;

    // Extract order_id from metadata
    const orderId = paymentIntent.metadata.order_id;

    // Update payment status in the database
    await Payment.update(
      { payment_status: "paid", payment_date: new Date() },
      { where: { order_id: orderId } }
    );

    console.log(`Payment for order ${orderId} succeeded.`);
  } else if (event.type === "payment_intent.payment_failed") {
    const paymentIntent = event.data.object;

    const orderId = paymentIntent.metadata.order_id;

    // Update payment status to failed
    await Payment.update(
      { payment_status: "failed" },
      { where: { order_id: orderId } }
    );

    console.log(`Payment for order ${orderId} failed.`);
  }

  res.json({ received: true });
};

module.exports = {
  createPayment,
  handleStripeWebhook,
};
