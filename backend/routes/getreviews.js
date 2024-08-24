const express = require("express");
const router = express.Router();
const Review = require("../models/reviewcollection");

router.get('/', async (req, res) => {
    try {
        console.log('Fetching Reviews...');
        const reviews = await Review.find({});
        console.log('Reviews fetched:', reviews);
        res.status(200).json(reviews);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching reviews');
    }
});

module.exports = router;