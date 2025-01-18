const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  fee: { type: Number, required: true },
  maxParticipants: { type: Number, required: true },
  imageUrl: { type: String, required: true }, // Optional field for the image URL
  formLink: { type: String, required: true },  // The form link for the event registration
  eventDate: { type: String, required: true },   // The date of the event
});

module.exports = mongoose.model("Event", eventSchema);
