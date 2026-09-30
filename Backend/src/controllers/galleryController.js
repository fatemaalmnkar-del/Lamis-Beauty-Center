const GalleryImage = require("../models/galleryImage");
const cloudinary = require("../config/cloudinary");

const createGalleryImage = async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        message: "Bitte wählen Sie ein Bild aus."
      });
    }
    const uploadResult = await new Promise((resolve, reject) => {
     const uploadStream = cloudinary.uploader.upload_stream(
         {
           folder: "lamis-beauty-center/gallery",
        },
        (error, result) => {
        if (error) {
           reject(error);
        } else {
          resolve(result);
        }
       }
     );
      uploadStream.end(req.file.buffer);
    }); 

    const galleryImage = await GalleryImage.create({
      image: uploadResult.secure_url,
      imagePublicId: uploadResult.public_id,
    });
    res.status(201).json({
     message: "Bild wurde erfolgreich hinzugefügt.",
     galleryImage: galleryImage,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Bild konnte nicht hochgeladen werden."
    });
  }
};

const getGalleryImages = async (req, res) => {
  try {
    const galleryImages = await GalleryImage.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      galleryImages: galleryImages,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Bilder konnten nicht geladen werden.",
    });
  }
};



const deleteGalleryImage = async (req, res) => {
  try {
    const galleryImage = await GalleryImage.findById(req.params.id);

    if (!galleryImage) {
      return res.status(404).json({
        message: "Bild wurde nicht gefunden.",
      });
    }

    await cloudinary.uploader.destroy(
      galleryImage.imagePublicId
    );

    await galleryImage.deleteOne();

    res.status(200).json({
      message: "Bild wurde erfolgreich gelöscht.",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Bild konnte nicht gelöscht werden.",
    });
  }
};

module.exports = {createGalleryImage,getGalleryImages,deleteGalleryImage};