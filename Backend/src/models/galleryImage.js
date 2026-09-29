const mongoose = require("mongoose");


const galleryImageSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },

    imagePublicId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("galleryImage", galleryImageSchema);