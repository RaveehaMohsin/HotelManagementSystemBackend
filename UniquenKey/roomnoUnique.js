const mongoose = require("mongoose");
const Room = require('../models/roomcollection'); // Adjust the path as necessary

const generateUniqueRoomNumber = async () => {
  let unique = false;
  let roomNo;

  while (!unique) {
    // Generate a random number between 1 and 1000
    roomNo = Math.floor(Math.random() * 1000) + 1;

    // Check if the room number already exists
    const existingRoom = await Room.findOne({ roomNo });

    if (!existingRoom) {
      unique = true; // Room number is unique
    }
  }

  return roomNo;
};

module.exports = { generateUniqueRoomNumber };
