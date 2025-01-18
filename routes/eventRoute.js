const express = require("express");
const { addEvent,getAllEvents,deleteEvent } = require("../controllers/eventController");
const path = require('path')
const {v4:uuidv4} = require('uuid')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images')
    },
    filename: function (req, file, cb) {
      cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname))
    }
  })

  const upload = multer({ storage: storage })

const router = express.Router();

// Route for creating an event
router.route('/')
  .post(upload.single('image'),addEvent)
  .get(getAllEvents);
router.route('/:id')
  .delete(deleteEvent)

router.route('/slide')
  .post(upload.single('image'),require('../controllers/slideController').newSlide)
  .get(require('../controllers/slideController').getAllSlides)
router.route('/slide/:id')
  .delete(require('../controllers/slideController').deleteSlide)

module.exports = router;
