import api from "./api";

const createContactMessage = async (formData) => {
  const response = await api.post("/contact", formData);
  return response.data;
};

const getContactMessages = async () => {
  const response = await api.get("/contact");
  return response.data;
};

const replyToContactMessage = async (id, reply) => {
  const response = await api.patch(
    `/contact/${id}/reply`,
    { reply }
  );

  return response.data;
};

const deleteContactMessage = async (id) => {
  const response = await api.delete(`/contact/${id}`);
  return response.data;
};

const getMyContactMessages = async () => {
  const response = await api.get("/contact/my-messages");
  return response.data;
};

export {
  createContactMessage,
  getContactMessages,
  deleteContactMessage,
  replyToContactMessage,
  getMyContactMessages 
};