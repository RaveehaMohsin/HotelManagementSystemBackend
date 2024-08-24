const express = require("express");
const router = express.Router();
const Room = require("../models/roomcollection");

router.get('/', async (req, res) => {
    try {
        console.log('Fetching rooms...');
        const rooms = await Room.find({});
        console.log('Rooms fetched:', rooms);
        res.status(200).json(rooms);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching rooms');
    }
});

router.get('/:id', async (req, res) => {
  try {
    const roomId = req.params.id;
    console.log('Fetching room...');
    const room = await Room.findById(roomId); // Use findById for querying by ID
    if (room) {
      console.log('Room fetched:', room);
      res.status(200).json(room);
    } else {
      res.status(404).send('Room not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching room');
  }
});


router.delete('/:id', async (req, res) => {
    try {
      const roomId = req.params.id;
      console.log(`Deleting room with ID: ${roomId}`);
      const result = await Room.findByIdAndDelete(roomId);
      if (!result) {
        return res.status(404).send('Room not found');
      }
      console.log('Room deleted:', result);
      res.status(200).send('Room deleted');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error deleting room');
    }
});

router.put('/update/:id', async (req, res) => {
  try {
    const roomId = req.params.id; // Getting the room ID

    // Finding the room by ID
    const existingRoom = await Room.findById(roomId);

    if (!existingRoom) {
      return res.status(404).send('Room not found');
    }

    const updateData = {
      roomType: req.body.roomtype || existingRoom.roomType,
      roomPricePerDay: req.body.roompriceperday || existingRoom.roomPricePerDay,
      roomImage: req.body.roomimage || existingRoom.roomImage,
      roomDescription: req.body.roomdescription || existingRoom.roomDescription,
      roomServantName: req.body.servantname || existingRoom.roomServantName,
      servantContact: req.body.servantcontact || existingRoom.servantContact,
    };

    console.log(`Updating room with ID: ${roomId}`);
    
    // Updating the room
    const result = await Room.findByIdAndUpdate(roomId, updateData, { new: true, runValidators: true });
    
    console.log('Room updated:', result);
    res.status(200).send('Room updated successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating room');
  }
});



module.exports = router;