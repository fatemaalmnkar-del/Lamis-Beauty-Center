const Review = require('../models/review');

// Create a new review          

const createReview = async (req, res) => {
    try {
        const { service, rating, comment } = req.body;
        if (!service || !rating || !comment) {
            return res.status(400).json({ message: "Bitte wählen Sie eine Dienstleistung aus, geben Sie eine Bewertung ab und schreiben Sie einen Kommentar." });
        }
        const existingReview = await Review.findOne({ user: req.user.id, service });
        if (existingReview) {
            return res.status(400).json({ message: "Sie haben diese Dienstleistung bereits bewertet." });
        }
        const newReview = await Review.create({
            user: req.user.id,
            service,
            rating,
            comment
        });
        res.status(201).json({ message: "Ihre Bewertung wurde erfolgreich erstellt.", review: newReview });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};
const getReviewsByServiceId = async (req, res) => {
    try {
        const serviceId = req.params.serviceId;
        const reviews = await Review.find({ service: serviceId }).populate('user', 'name');
        res.status(200).json({ reviews });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};
const deleteReview = async (req, res) => {
    try {
        const reviewId = req.params.reviewId;
        const currentUserId = req.user.id|| req.user._id;
        const review = await Review.findById(reviewId);
      
        if (!review) {
            return res.status(404).json({ message: "Die Bewertung wurde nicht gefunden." });
        }
        if (review.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Sie sind nicht berechtigt, diese Bewertung zu löschen." });
        }

        await Review.findByIdAndDelete(reviewId);
        res.status(200).json({ message: "Ihre Bewertung wurde erfolgreich gelöscht." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createReview, getReviewsByServiceId, deleteReview };
