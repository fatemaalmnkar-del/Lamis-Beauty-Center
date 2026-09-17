import api from "./api";

  export const getServices= () => {
    return api.get("/services");
};
export const createService = (serviceData) => {
  return api.post("/services", serviceData);
};

export const updateService = (serviceId, serviceData) => {
  return api.put(`/services/${serviceId}`, serviceData);
};

export const deleteService = (serviceId) => {
  return api.delete(`/services/${serviceId}`);
};

