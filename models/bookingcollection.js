const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    roomNo:{
        type: Number,
        required: true
    },
    user:{
      type:String,
      required: true
    },
    personName: {
      type: String,
      required: true,
    },
    personEmail:{
      type: String,
      required: true,
    },
    personContact:{
      type: String,
      required: true,
    },
    numberofChildren:{
        type: Number
    },
    numberofAdults:{
        type: Number,
        required: true
    },
    arrivalDate: {
      type: Date,
      required: true,
    },
    arrivalTime: {
      type: String,
      required: true
    },
    departureDate: {
      type: Date,
      required: true
    },
    departureTime: {
      type: String,
      required: true
    },
    statusofBooking:{
        type: String
    }
  });

  const Booking = mongoose.model('Booking', bookingSchema, 'Booking');
  
  module.exports = Booking;