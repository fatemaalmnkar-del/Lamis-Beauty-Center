import api from "./api";

export const getAllReviews = async () => {
    const response = await api.get("/reviews");
    return response.data;
};

export const getReviewsByServiceId = async (serviceId) => {
    const response = await api.get(`/reviews/${serviceId}`);
    return response.data;
};

export const createReview = async (reviewData) => {
    const response = await api.post("/reviews", reviewData);
    return response.data;
};

export const deleteReview = async (reviewId) => {
    const response = await api.delete(`/reviews/${reviewId}`);
    return response.data;
};