const express = require("express");
const router = express.Router();
const Booking = require("../models/bookingcollection");

router.get('/', async (req, res) => {
    try {
        console.log('Fetching bookings...');
        const bookings = await Booking.find({});
        console.log('Bookings fetched:', bookings);
        res.status(200).json(bookings);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching bookings');
    }
});


router.get('/pending', async (req, res) => {
    try {
        console.log('Fetching pending bookings...');
        const pendingBookings = await Booking.find({ statusofBooking: "Pending" });
        console.log('Pending bookings fetched:', pendingBookings);
        res.status(200).json(pendingBookings);
    } catch (err) {
        console.error('Error fetching pending bookings:', err);
        res.status(500).send('Error fetching pending bookings');
    }
});


router.get('/approved-or-checkout', async (req, res) => {
    try {
        console.log('Fetching approved or checkout bookings...');
        const bookings = await Booking.find({ statusofBooking: { $in: ["Approved", "Checkout"] } });
        console.log('Approved or checkout bookings fetched:', bookings);
        res.status(200).json(bookings);
    } catch (err) {
        console.error('Error fetching approved or checkout bookings:', err);
        res.status(500).send('Error fetching approved or checkout bookings');
    }
});

router.get('/:id', async (req, res) => {
    try {
      const bookingId = req.params.id;
      console.log('Fetching booking...');
      const booking = await Booking.findById(bookingId); 
      if (booking) {
        console.log('booking fetched:', booking);
        res.status(200).json(booking);
      } else {
        res.status(404).send('booking not found');
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Error fetching booking');
    }
});


router.patch('/:id', async (req, res) => {
    try {
        const bookingId = req.params.id;
        const { statusofBooking } = req.body;
        const updatedBooking = await Booking.findByIdAndUpdate(
            bookingId, 
            { statusofBooking: statusofBooking }, 
            { new: true } 
        );

        if (updatedBooking) {
            console.log(`Booking ${bookingId} updated:`, updatedBooking);
            res.status(200).json(updatedBooking);
        } else {
            res.status(404).send('Booking not found');
        }
    } catch (err) {
        console.error('Error updating booking:', err);
        res.status(500).send('Error updating booking');
    }
});

module.exports = router;






module.exports = router;