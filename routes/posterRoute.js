const express = require("express");
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

router.route('/')
  .post(upload.single('image'),require('../controllers/posterController').newPoster)
  .get(require('../controllers/posterController').getAllPosters)
router.route('/:id')
  .delete(require('../controllers/posterController').deletePoster)

module.exports = router;
