// models/Recruitment.js

const mongoose = require('mongoose');

// Define the schema for the recruitment model
const recruitmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  url: {
    type: String,
    required: true,
    unique: true,
  },
}, { timestamps: true });

// Create and export the model
const Recruitment = mongoose.model('Recruitment', recruitmentSchema);
module.exports = Recruitment;
