const express = require("express");
const router = express.Router();
const { db } = require("../database/mongodb");

router.post('/', async (req, res) => {
  try {
    console.log(req.body);  // Check what is actually received
    const { roomNo, user, personName, personEmail, personContact, numberofChildren, numberofAdults, arrivalDate, arrivalTime, departureDate, departureTime } = req.body;

    const data = {
      roomNo,
      user,
      personName,
      personEmail,
      personContact,
      numberofChildren,
      numberofAdults,
      arrivalDate,
      arrivalTime,
      departureDate,
      departureTime,
      statusofBooking: 'Pending'
    };

    await db.collection('Booking').insertOne(data);
    console.log('Booking Added');
    res.status(201).send('Booking Added');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding Booking');
  }
});

module.exports = router;


