const path = require('path');
const fs = require('fs');
const Poster = require('../models/posterModel');

// Upload Slide Image and save in database with event name
exports.newPoster = async (req, res) => {
  try {
    const { posterName } = req.body;

    // Ensure that both the image and event name are provided
    if (!req.file || !posterName) {
      return res.status(400).json({ message: 'No file uploaded or event name missing.' });
    }

    // Get the image path from the uploaded file
    const image = req.file ? req.file.path : '';

    // Create a new slide image record
    const poster = new Poster({
      image: image,
      posterName: posterName,
    });

    await poster.save();

    res.status(201).json({
      message: 'Slide image uploaded successfully!',
      imageName: req.file.filename,
      posterName: posterName,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Fetch all slides from the database
exports.getAllPosters = async (req, res) => {
  try {
    const slides = await Poster.find();
    res.status(200).json(slides);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a specific slide event from the database and remove the image file from the server
exports.deletePoster = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the slide by ID
    const poster = await Poster.findById(id);

    if (!poster) {
      return res.status(404).json({ message: 'Slide not found.' });
    }

    // Delete the image file from the server
    const imagePath = path.join(__dirname, '..', poster.image);
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error('Error deleting image file:', err);
      }
    });

    // Delete the slide from the database
    await Poster.findByIdAndDelete(id);

    res.status(200).json({ message: 'Slide image and event deleted successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
