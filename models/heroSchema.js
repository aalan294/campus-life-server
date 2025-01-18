// models/SlideImage.js
const mongoose = require('mongoose');

const SlideImageSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
      unique: true,  // Ensure each image name is unique
    },
    eventName: {
      type: String,
      required: true,  // The event name is mandatory
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('highlight', SlideImageSchema);
