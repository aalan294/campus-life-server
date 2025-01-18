// models/SlideImage.js
const mongoose = require('mongoose');

const posterSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
      unique: true,  // Ensure each image name is unique
    },
    posterName: {
      type: String,
      required: true,  // The event name is mandatory
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Poster', posterSchema);
