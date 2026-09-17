const express = require('express');
const router = express.Router();
const adminOnly = require("../middleware/adminMiddlweare");
const { getservices, getserviceById, createService, updateService,deleteService} = require('../controllers/serviceController');
const { protect } = require('../middleware/authMiddleware');


router.get('/', getservices);
router.get('/:id', getserviceById);
router.post('/', protect,adminOnly,createService);
router.put('/:id',protect,adminOnly, updateService);
router.delete('/:id',protect, adminOnly, deleteService);   

module.exports = router;