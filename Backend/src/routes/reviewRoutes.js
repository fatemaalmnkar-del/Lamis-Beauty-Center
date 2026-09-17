const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();
const { createReview, getReviewsByServiceId,deleteReview } = require('../controllers/reviewController');


router.post('/', protect, createReview);
router.get('/:serviceId', getReviewsByServiceId);
router.delete('/:reviewId', protect, deleteReview);
module.exports = router;