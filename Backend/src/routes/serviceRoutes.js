const express = require('express');
const router = express.Router();
const adminOnly = require("../middleware/adminMiddlweare");
const upload = require("../middleware/uploadMiddleware");
const { getservices, getserviceById, createService, updateService,deleteService} = require('../controllers/serviceController');
const { protect } = require('../middleware/authMiddleware');


router.get('/', getservices);
router.get('/:id', getserviceById);
router.post('/', protect,adminOnly,upload.single('image'),createService);
router.put('/:id',protect,adminOnly,upload.single('image'), updateService);
router.delete('/:id',protect, adminOnly, deleteService);   

module.exports = router;