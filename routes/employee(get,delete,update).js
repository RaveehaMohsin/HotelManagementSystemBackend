const express = require("express");
const router = express.Router();
const Employee = require("../models/employeecollection");

router.get('/', async (req, res) => {
    try {
        console.log('Fetching employees...');
        const employees = await Employee.find({});
        console.log('Employees fetched:', employees);
        res.status(200).json(employees);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching employees');
    }
});

router.get('/:id', async (req, res) => {
    try {
      const employeeId = req.params.id;
      console.log('Fetching employee...');
      const employee = await Employee.findById(employeeId); 
      if (employee) {
        console.log('employee fetched:', employee);
        res.status(200).json(employee);
      } else {
        res.status(404).send('employee not found');
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Error fetching employee');
    }
});

router.put('/update/:id', async (req, res) => {
    try {
      const employeeId = req.params.id; 
  
      const existingEmployee = await Employee.findById(employeeId);
  
      if (!existingEmployee) {
        return res.status(404).send('Employee not found');
      }
  
      const updateData = {
         employeeName : req.body.employeename ||existingEmployee.employeeName ,
         employeeImage : existingEmployee.employeeImage ,
         employeeCNIC :req.body.employeecnic ||existingEmployee.employeeCNIC,
         employeeContact : req.body.employeecontact ||existingEmployee.employeeContact,
         employeeEmail : req.body.employeeemail ||existingEmployee.employeeEmail,
         employeeSalary : req.body.employeesalary ||existingEmployee.employeeSalary,
      };
  
      console.log(`Updating employee with ID: ${employeeId}`);
      
      // Updating the room
      const result = await Employee.findByIdAndUpdate(employeeId, updateData, { new: true, runValidators: true });
      
      console.log('Employee updated:', result);
      res.status(200).send('Employee updated successfully');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error updating Employee');
    }
  });


  router.delete('/:id', async (req, res) => {
    try {
      const employeeId = req.params.id;
      console.log(`Deleting employee with ID: ${employeeId}`);
      const result = await Employee.findByIdAndDelete(employeeId);
      if (!result) {
        return res.status(404).send('Employee not found');
      }
      console.log('Employee deleted:', result);
      res.status(200).send('Employee deleted');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error deleting Employee');
    }
});
  


module.exports = router;