const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    employeeName: {
      type: String,
      required: true,
    },
    employeeImage:{
      type: String,
      required: false,
    },
    employeeCNIC: {
      type: String,
      required: true,
      unique:true
    },
    employeeContact: {
      type: String,
      required: true
    },
    employeeEmail: {
      type: String,
      required: true
    },
    employeeSalary: {
      type: String,
      required: true
    }
  });

  const Employee = mongoose.model('Employee', employeeSchema, 'Employee');
  
  module.exports = Employee;