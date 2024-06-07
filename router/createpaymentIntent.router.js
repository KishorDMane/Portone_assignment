const express = require("express");
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const payment_intent = express.Router();

payment_intent.post("/v1/create_intent", async (req, res) => {
    console.log(req)
    const { amount, currency } = req.body;

    if (!amount || !currency) {
        return res.status(400).json({ message: "Amount and currency are required." });
    }

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            automatic_payment_methods: {
                enabled: true,
            },
        });
        res.status(201).json(paymentIntent);
    } catch (error) {
        handleStripeError(res, error, 'Error creating payment intent');
    }
});

payment_intent.post("/v1/capture_intent/:id", async (req, res) => {
    const { id: intentId } = req.params;

    if (!intentId) {
        return res.status(400).json({ message: "Payment Intent ID is required." });
    }

    try {
        const paymentIntent = await stripe.paymentIntents.retrieve(intentId);
        res.status(200).json(paymentIntent);
    } catch (error) {
        handleStripeError(res, error, 'Error capturing payment intent');
    }
});

payment_intent.post("/v1/create_refund/:id", async (req, res) => {
    const { id: intentId } = req.params;



    if (!intentId) {
        return res.status(400).json({ message: "Payment Intent ID and amount are required." });
    }

    try {

        const paymentIntent = await stripe.paymentIntents.retrieve(intentId)


        amount =await paymentIntent.amount

        console.log(paymentIntent,amount)
        if (!amount) {
            return res.status(400).json({ message: "Payment Intent Not Present" });
        }

        // console.log(paymentIntent)


        const charge = await stripe.charges.create({
            amount,
            currency: 'usd',
            source: 'tok_visa',
        });
        // console.log(charge)
        const refund = await stripe.refunds.create({
            charge: charge.id,
        });
        res.status(201).json(refund);
    } catch (error) {
        handleStripeError(res, error, 'Error creating refund');
    }
});

payment_intent.get("/v1/get_intents", async (req, res) => {
    try {
        const paymentIntents = await stripe.paymentIntents.list({ limit: 3 });
        res.status(200).json(paymentIntents);
    } catch (error) {
        handleStripeError(res, error, 'Error retrieving payment intents');
    }
});

function handleStripeError(res, error, defaultMessage) {
    console.error(defaultMessage, error);
    if (error.type === 'StripeAuthenticationError') {
        res.status(401).json({ message: error.message });
    } else if (error.type === 'StripeInvalidRequestError') {
        res.status(400).json({ message: error.message });
    } else if (error.type === 'StripeAPIError') {
        res.status(502).json({ message: error.message });
    } else if (error.type === 'StripeConnectionError') {
        res.status(503).json({ message: error.message });
    } else if (error.type === 'StripeRateLimitError') {
        res.status(429).json({ message: error.message });
    } else {
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { payment_intent };
