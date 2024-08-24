const express = require("express");
const router = express.Router();
const { db } = require("../database/mongodb");
const { generateUniqueRoomNumber } = require("../UniquenKey/roomnoUnique"); // Adjust the path as necessary

router.post('/', async (req, res) => {
  try {
    const roomtype = req.body.roomtype;
    const roomprice = req.body.roompriceperday;
    const roomdescription = req.body.roomdescription;
    const roomimage = req.body.roomimage;
    const servant = req.body.servantname;
    const servantcontact = req.body.servantcontact;

    const roomNo = await generateUniqueRoomNumber();

    const data = {
      roomNo,
      roomType: roomtype,
      roomPricePerDay: roomprice,
      roomImage: roomimage,
      roomDescription: roomdescription,
      availabilityStatus: 'Available',
      roomServantName: servant,
      servantContact: servantcontact
    };

    await db.collection('Room').insertOne(data);
    console.log('Room Added');
    res.status(201).send('Room Added');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding room');
  }
});

module.exports = router;