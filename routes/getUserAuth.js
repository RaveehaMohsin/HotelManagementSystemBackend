const express = require("express");
const router = express.Router();
const User = require("../models/userAuthentication");

router.get('/', async (req, res) => {
  try {
      console.log('Fetching users...');
      const users = await User.find({});
      console.log('User fetched:', users);
      res.status(200).json(users);
  } catch (err) {
      console.error(err);
      res.status(500).send('Error fetching users');
  }
});

module.exports = router;