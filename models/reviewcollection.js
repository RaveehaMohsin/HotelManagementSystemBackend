const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    experience:{
      type: String,
      required: false,
    },
    rating: {
      type: Number,
      required: true,

    },
    feedback: {
      type: String,
      required: false,
    },
    recommendation: {
      type: String,
      required: true
    },
    futureIntent: {
      type: String,
      required: true
    }
  });

  const Review = mongoose.model('Review', reviewSchema, 'Review');
  
  module.exports = Review;