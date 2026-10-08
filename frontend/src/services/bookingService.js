import api from "./api";

export const createBooking = (bookingData) => {
  return api.post("/bookings", bookingData);
};

export const getMyBookings = () => {
  return api.get("/bookings/my-bookings");
};

export const cancelBooking = (bookingId) => {
  return api.patch(`/bookings/cancel/${bookingId}`);
};
export const getAllBookings = () => {
  return api.get("/bookings");
};
export const updateBookingStatus = (bookingId, status) => {
  return api.patch(`/bookings/status/${bookingId}`, { status });
};

export const getBookedTimes = (date) => {
  return api.get(`/bookings/booked-times?date=${date}`);
};

export const deleteBooking = (bookingId) => {
  return api.delete(`/bookings/${bookingId}`);
};

export const deleteBookingsByStatus = (status) => {
  return api.delete(`/bookings/status/${status}`);
};