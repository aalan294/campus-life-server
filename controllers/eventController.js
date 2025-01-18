const Event = require("../models/eventSchema");
const fs = require("fs");
const path = require("path");

// Add a new event
exports.addEvent = async (req, res) => {
  try {
    const { title, description, fee, maxParticipants, formLink, eventDate } = req.body;

    // Get the image path from the uploaded file (if provided)
    const imageUrl = req.file ? req.file.path : ""; // Optional image file

    const newEvent = new Event({
      title,
      description,
      fee,
      maxParticipants,
      imageUrl, // This will be blank if no image is uploaded
      formLink, // The form link for registration
      eventDate: new Date(eventDate), // Parse the eventDate to ensure it’s in Date format
    });

    const savedEvent = await newEvent.save();
    res.status(201).json({ message: "Event created successfully", event: savedEvent });
  } catch (error) {
    res.status(500).json({ message: "Error creating event", error });
  }
};

// Delete an event by ID
exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Delete the associated image file if it exists
    if (event.imageUrl) {
      const imagePath = path.resolve(event.imageUrl);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await event.deleteOne();
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting event", error });
  }
};

// Get all events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find(); // Fetch all events from the database

    if (events.length === 0) {
      return res.status(404).json({ message: "No events found" });
    }

    res.status(200).json({ message: "Events retrieved successfully", events });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving events", error });
  }
};
