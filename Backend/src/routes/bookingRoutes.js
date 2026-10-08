const express = require('express');
const router = express.Router();
const { createBooking, getMyBookings, cancelBooking ,  getAllBookings,updateBookingStatus,getBookedTimes,  deleteBooking,  deleteBookingsByStatus} = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');
const adminOnly = require("../middleware/adminMiddlweare");


router.post('/', protect, createBooking);
router.get('/',protect,adminOnly,getAllBookings);
router.get('/my-bookings', protect, getMyBookings);
router.get('/booked-times', protect, getBookedTimes);
router.patch('/cancel/:id', protect, cancelBooking);
router.delete(
  "/status/:status",
  protect,
  adminOnly,
  deleteBookingsByStatus
);
router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteBooking
);
router.patch("/status/:id",protect, adminOnly, updateBookingStatus);
module.exports = router;