const express = require("express");
const router = express.Router();
const { db } = require("../database/mongodb");


router.post('/', async (req, res) => {
  try {
    const firstname = req.body.firstName;
    const lastname = req.body.lastName;
    const contact = req.body.contact;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const role = req.body.role;

    const data = {
      firstName: firstname,
      lastName: lastname,
      Contact: contact,
      Email:email,
      Username:username,
      Password:password,
      Role: role
    };

    await db.collection('Users').insertOne(data);
    console.log('User Added');
    res.status(201).send('User Added');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding User');
  }
});

module.exports = router;