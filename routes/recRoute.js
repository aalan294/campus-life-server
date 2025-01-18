// routes/recruitmentRoutes.js

const express = require('express');
const { addRecruitmentLink, deleteRecruitmentLink, getAllRecruitmentLinks } = require('../controllers/recController');
const router = express.Router();

// Route to add a new recruitment link
router.route('/')
.post( addRecruitmentLink)
.get( getAllRecruitmentLinks);

// Route to delete a recruitment link
router.route('/:id')
.delete( deleteRecruitmentLink);


module.exports = router;
