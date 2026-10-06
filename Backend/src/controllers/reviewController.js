const Review = require('../models/review');

// Create a new review          

const createReview = async (req, res) => {
    try {
        const { service, rating, comment } = req.body;

        if (!rating || !comment) {
            return res.status(400).json({
                message: "Bitte geben Sie eine Bewertung ab und schreiben Sie einen Kommentar."
            });
        }

        const existingReview = await Review.findOne({
            user: req.user.id,
            service: service || null
        });

        if (existingReview) {
            return res.status(400).json({
                message: service
                    ? "Sie haben diese Dienstleistung bereits bewertet."
                    : "Sie haben bereits eine allgemeine Bewertung abgegeben."
            });
        }

const newReview = await Review.create({
    user: req.user.id,
    service: service || null,
    rating,
    comment
});

const populatedReview = await Review.findById(newReview._id)
    .populate('user', 'name')
    .populate('service', 'title');

res.status(201).json({
    message: "Ihre Bewertung wurde erfolgreich erstellt.",
    review: populatedReview
});

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: error.message
        });
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

const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find()
            .populate('user', 'name')
            .populate('service', 'title')
            .sort({ createdAt: -1 });

        res.status(200).json({ reviews });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: error.message
        });
    }
};
const deleteReview = async (req, res) => {
    try {
        const reviewId = req.params.reviewId;
        const currentUserId = req.user.id || req.user._id;

        const review = await Review.findById(reviewId);

        if (!review) {
            return res.status(404).json({
                message: "Die Bewertung wurde nicht gefunden."
            });
        }

        const isOwner =
            review.user.toString() === currentUserId.toString();

        const isAdmin =
            req.user.role === "admin";

        if (!isOwner && !isAdmin) {
            return res.status(403).json({
                message: "Sie sind nicht berechtigt, diese Bewertung zu löschen."
            });
        }

        await Review.findByIdAndDelete(reviewId);

        res.status(200).json({
            message: "Die Bewertung wurde erfolgreich gelöscht."
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = { createReview, getReviewsByServiceId, getAllReviews, deleteReview };
