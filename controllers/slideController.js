const path = require('path');
const fs = require('fs');
const SlideImage = require('../models/slideSchema');

// Upload Slide Image and save in database with event name
exports.newSlide = async (req, res) => {
  try {
    const { eventName } = req.body;

    // Ensure that both the image and event name are provided
    if (!req.file || !eventName) {
      return res.status(400).json({ message: 'No file uploaded or event name missing.' });
    }

    // Get the image path from the uploaded file
    const image = req.file ? req.file.path : '';

    // Create a new slide image record
    const slideImage = new SlideImage({
      image: image,
      eventName: eventName,
    });

    await slideImage.save();

    res.status(201).json({
      message: 'Slide image uploaded successfully!',
      imageName: req.file.filename,
      eventName: eventName,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Fetch all slides from the database
exports.getAllSlides = async (req, res) => {
  try {
    const slides = await SlideImage.find();
    res.status(200).json(slides);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a specific slide event from the database and remove the image file from the server
exports.deleteSlide = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the slide by ID
    const slideImage = await SlideImage.findById(id);

    if (!slideImage) {
      return res.status(404).json({ message: 'Slide not found.' });
    }

    // Delete the image file from the server
    const imagePath = path.join(__dirname, '..', slideImage.image);
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error('Error deleting image file:', err);
      }
    });

    // Delete the slide from the database
    await SlideImage.findByIdAndDelete(id);

    res.status(200).json({ message: 'Slide image and event deleted successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
