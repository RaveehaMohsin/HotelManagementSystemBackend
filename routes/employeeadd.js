const express = require("express");
const router = express.Router();
const { db } = require("../database/mongodb");
const multer = require("multer")

var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null , "./public/employeeImages");
    },
    filename:function(req,file,cb)
    {
        cb(null,Date.now()+file.originalname);
    }
})

var upload = multer({storage});

router.post('/',upload.single("employeeimage"), async (req, res) => {
  try {
    const employeeName = req.body.employeename;
    const employeeImage = req.file.filename;
    const employeeCNIC = req.body.employeecnic;
    const employeeContact = req.body.employeecontact;
    const employeeEmail = req.body.employeeemail;
    const employeeSalary = req.body.employeesalary;

    const data = {
      employeeName: employeeName,
      employeeImage: employeeImage,
      employeeCNIC: employeeCNIC,
      employeeContact: employeeContact,
      employeeEmail: employeeEmail,
      employeeSalary: employeeSalary
    };

    await db.collection('Employee').insertOne(data);
    console.log('Employee Added');
    res.status(201).send('Employee Added');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding employee');
  }
});

module.exports = router;
