import api from "./api";

const getGalleryImages = async () => {
  const response = await api.get("/gallery");
  return response.data;
};

const createGalleryImage = async (formData) => {
  const response = await api.post("/gallery", formData);
  return response.data;
};

const deleteGalleryImage = async (id) => {
  const response = await api.delete(`/gallery/${id}`);
  return response.data;
};

export {getGalleryImages, createGalleryImage, deleteGalleryImage,};