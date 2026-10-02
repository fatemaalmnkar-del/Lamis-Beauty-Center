const express = require("express");
const router = express.Router();

const {
  createContactMessage,
  getContactMessages,
  deleteContactMessage,
  replyToContactMessage,
  getMyContactMessages
} = require("../controllers/contactController");

const { protect,optionalProtect } = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddlweare");


router.post("/",optionalProtect ,createContactMessage);
router.get("/my-messages", protect, getMyContactMessages);

router.get(
  "/",
  protect,
  adminOnly,
  getContactMessages
);

router.patch(
  "/:id/reply",
  protect,
  adminOnly,
  replyToContactMessage
);

router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteContactMessage
);


module.exports = router;