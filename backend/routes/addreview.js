const express = require("express");
const router = express.Router();
const { db } = require("../database/mongodb");

router.post('/', async (req, res) => {
  try {
    const name = req.body.name;
    const experience = req.body.experience;
    const rating = req.body.rating;
    const feedback = req.body.feedback;
    const recommendation = req.body.recommendation;
    const futureIntent = req.body.futureIntent;

    const data = {
        name: name,
        experience: experience,
        rating: rating,
        feedback: feedback,
        recommendation: recommendation,
        futureIntent: futureIntent,
    };

    await db.collection('Review').insertOne(data);
    console.log('Review Added');
    res.status(201).send('Review Added');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding Review');
  }
});

module.exports = router;