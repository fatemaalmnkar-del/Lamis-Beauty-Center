const express = require("express");
const router = express.Router();

const {createGalleryImage, getGalleryImages,deleteGalleryImage,} = require("../controllers/galleryController");

const { protect } = require('../middleware/authMiddleware');
const adminOnly = require("../middleware/adminMiddlweare");

const upload = require("../middleware/uploadMiddleware");

router.get("/", getGalleryImages);

router.post( "/",
  protect,adminOnly,upload.single("image"), createGalleryImage);

router.delete("/:id",protect,adminOnly,deleteGalleryImage);

module.exports = router;