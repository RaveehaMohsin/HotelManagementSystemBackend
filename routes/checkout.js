const express = require('express');
const router = express.Router();
const Booking = require('../models/bookingcollection');
const stripe = require('stripe')('sk_test_51PrEzpFdjrY56P1cqjq3g45v43hCnxBJyfSDhCHVnnenfSol1Jn2vy4SKLzdVMzqOcOZuIDudHy76l22rxsVVDTo004kHibLxh');

router.post('/', async (req, res) => {
    const { personName, personEmail, roomNo, totalPayment, roomImage, bookingid } = req.body;

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'pkr',
                        product_data: {
                            name: `Room ${roomNo} - ${personName}`,
                            images: [roomImage],
                        },
                        unit_amount: totalPayment * 100, 
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `http://localhost:3000/checkout`,
            cancel_url: 'http://localhost:4000/cancel',
        });

        await changestatus(bookingid);


        res.json({ url: session.url });
    } catch (error) {
        console.error('Error creating Stripe checkout session:', error);
        res.status(500).json({ error: 'An error occurred during the checkout process.' });
    }
});


const changestatus = async (bookingId) => {
    try {
        const updatedBooking = await Booking.findByIdAndUpdate(
            bookingId, 
            { statusofBooking: 'Checkout' }, 
            { new: true }
        );

        if (updatedBooking) {
            console.log(`Booking ${bookingId} updated to 'Checkout':`, updatedBooking);
        } else {
            console.error(`Booking ${bookingId} not found`);
        }
    } catch (err) {
        console.error('Error updating booking:', err);
    }
}

module.exports = router;
