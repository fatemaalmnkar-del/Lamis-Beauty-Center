const express = require('express');
const router = express.Router();
const { gitProfile, updateProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');


router.get('/profile', protect, gitProfile);
router.put("/profile",protect,updateProfile)
module.exports = router;