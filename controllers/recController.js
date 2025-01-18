// controllers/recruitmentController.js

const Recruitment = require('../models/recSchema');

// Function to add a new recruitment link
const addRecruitmentLink = async (req, res) => {
  const { title, url } = req.body;

  try {
    // Check if the URL already exists
    const existingRecruitment = await Recruitment.findOne({ url });
    if (existingRecruitment) {
      return res.status(400).json({ error: 'This recruitment link already exists.' });
    }

    // Create a new recruitment entry
    const newRecruitment = new Recruitment({ title, url });
    await newRecruitment.save();

    return res.status(201).json({ message: 'Recruitment link added successfully!', recruitment: newRecruitment });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error. Could not add recruitment link.' });
  }
};

// Function to delete a recruitment link by ID
const deleteRecruitmentLink = async (req, res) => {
    const { id } = req.params;
  
    try {
      const recruitment = await Recruitment.findById(id);
      if (!recruitment) {
        return res.status(404).json({ error: 'Recruitment link not found.' });
      }
  
      // Delete the recruitment entry using deleteOne or findByIdAndDelete
      await Recruitment.deleteOne({ _id: id });
  
      // Alternatively, you can use:
      // await Recruitment.findByIdAndDelete(id);
  
      return res.status(200).json({ message: 'Recruitment link deleted successfully!' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Server error. Could not delete recruitment link.' });
    }
  };
  

// Function to get all recruitment links
const getAllRecruitmentLinks = async (req, res) => {
  try {
    const recruitments = await Recruitment.find();
    return res.status(200).json(recruitments);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error. Could not fetch recruitment links.' });
  }
};

module.exports = { addRecruitmentLink, deleteRecruitmentLink, getAllRecruitmentLinks };
