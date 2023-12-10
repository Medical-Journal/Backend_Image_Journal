const express = require('express');
const router = express.Router();
const imageController = require('../Controller/imageController')
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({storage})

router.get('/images', imageController.getAllImages);
router.get('/images/:patient_id', imageController.getImagesByPatientId);
router.post('/images', upload.single('image_data') , imageController.addNewImage)
router.put('/images', upload.single('image_data'), imageController.updateImage);

module.exports = router;