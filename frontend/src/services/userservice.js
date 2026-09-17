import api from "./api";

export const getProfile = () => {
  return api.get("/users/profile");
};

export const updateProfile = (userData) => {
  return api.put("/users/profile", userData);
};