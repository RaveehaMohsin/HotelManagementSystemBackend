const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomNo: {
    type: Number,
    required: true,
    unique: true
  },
  roomType: {
    type: String,
    required: true
  },
  roomPricePerDay: {
    type: mongoose.Schema.Types.Decimal128,
    required: true
  },
  roomImage: {
    type: String,
    required: true
  },
  roomDescription: {
    type: String
  },
  availabilityStatus: {
    type: String,
    required: true
  },
  roomServantName: {
    type: String,
    required: true,
    maxlength: 100
  },
  servantContact: {
    type: String,
    required: true,
    maxlength: 15
  }
});



const Room = mongoose.model('Room', roomSchema, 'Room');

module.exports = Room;