
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {getServices,createService,updateService,deleteService} from "../services/serviceService";

import {getGalleryImages, createGalleryImage,deleteGalleryImage} from "../services/galleryService";

import useAutoDismiss from "../hooks/useAutoDismiss";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const user = useSelector((state) => state.auth.user);

  const [services, setServices] = useState([]);


  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryImageFile, setGalleryImageFile] = useState(null);




  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useAutoDismiss(message, setMessage);
  useAutoDismiss(error, setError);



  const [galleryMessage, setGalleryMessage] = useState("");
  const [galleryError, setGalleryError] = useState("");
  useAutoDismiss(galleryMessage, setGalleryMessage);
  useAutoDismiss(galleryError, setGalleryError);



 

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    duration: ""
  });
 const [imageFile, setImageFile] = useState(null);

  const [editingId, setEditingId] = useState(null);

  





  const fetchServices = async () => {
    try {
      const response = await getServices();
      setServices(response.data);
    } catch (error) {
      console.error(error);
      setError("Behandlungen konnten nicht geladen werden.");
    }
  };

  
useEffect(() => {
  const loadInitialData = async () => {
    try {
      const servicesResponse = await getServices();

      const galleryResponse = await getGalleryImages();
    

      setServices(servicesResponse.data);
  
      setGalleryImages(galleryResponse.galleryImages);
      
    } catch (error) {
      console.error(error);
    }
  };

  loadInitialData();
}, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };






  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("category", formData.category);
    data.append("price", formData.price);
    data.append("duration", formData.duration);
    if (imageFile) {
      data.append("image", imageFile);
    }
    try {
      if (editingId) {
        await updateService(editingId, data);

        setMessage("Behandlung erfolgreich aktualisiert.");
      } else {
        await createService(data);

        setMessage("Behandlung erfolgreich hinzugefügt.");
      }

      setFormData({
        title: "",
        description: "",
        category: "",
        price: "",
        duration: ""
      });
      setImageFile(null);

      setEditingId(null);

      await fetchServices();

    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
        "Aktion konnte nicht durchgeführt werden."
      );
    }
  };

  const handleEdit = (service) => {
    setFormData({
      title: service.title || "",
      description: service.description || "",
      category: service.category || "",
      price: service.price || "",
      duration: service.duration || ""
    });

    setEditingId(service._id);
    setImageFile(null);
    setMessage("");
    setError("");
  };

  const handleDelete = async (serviceId) => {
    const confirmed = window.confirm(
      "Möchten Sie diese Behandlung wirklich löschen?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteService(serviceId);

      setMessage("Behandlung erfolgreich gelöscht.");
      setError("");

      await fetchServices();

    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
        "Behandlung konnte nicht gelöscht werden."
      );
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);

    setFormData({
      title: "",
      description: "",
        category: "",
      price: "",
      duration: ""
    });
    setImageFile(null);
  };


const handleGalleryImageChange = (e) => {
  setGalleryImageFile(e.target.files[0]);
};


const handleGallerySubmit = async (e) => {
  e.preventDefault();

  if (!galleryImageFile) {
   setGalleryError("Bitte wählen Sie ein Bild aus.");
    return;
  }

  try {
    setGalleryMessage("");
    setGalleryError("");

    const data = new FormData();
    data.append("image", galleryImageFile);

    await createGalleryImage(data);

    setGalleryMessage("Galeriebild erfolgreich hinzugefügt.");
    setGalleryImageFile(null);

    const response = await getGalleryImages();
    setGalleryImages(response.galleryImages);

  } catch (error) {
    console.error(error);

    setGalleryError(
      error.response?.data?.message ||
      "Galeriebild konnte nicht hinzugefügt werden."
    );
  }
};


const handleDeleteGalleryImage = async (imageId) => {
  const confirmed = window.confirm(
    "Möchten Sie dieses Bild wirklich löschen?"
  );

  if (!confirmed) {
    return;
  }

  try {
    setGalleryMessage("");
    setGalleryError("");

    await deleteGalleryImage(imageId);

    setGalleryMessage("Galeriebild erfolgreich gelöscht.");

    const response = await getGalleryImages();
    setGalleryImages(response.galleryImages);

  } catch (error) {
    console.error(error);

    setGalleryError(
      error.response?.data?.message ||
      "Galeriebild konnte nicht gelöscht werden."
    );
  }
};







if (!user || user.role !== "admin") {
  return (
    <main className="admin-page">
      <p className="admin-access">
        Sie haben keinen Zugriff auf den Admin-Bereich.
      </p>
    </main>
  );
}
return (
    <main className="admin-page">

      <section className="admin-header">
        <p>Verwaltung</p>
        <h1>Admin-Dashboard</h1>
        <p>
          Verwalten Sie die Behandlungen des Beauty Centers.
        </p>
      </section>

      <section className="admin-form-container">

        <h2>
          {editingId
            ? "Behandlung bearbeiten"
            : "Neue Behandlung hinzufügen"}
        </h2>

        {message && (
          <p className="admin-success">
            {message}
          </p>
        )}

        {error && (
          <p className="admin-error">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>

          <div className="admin-form-group">
            <label htmlFor="title">
              Titel
            </label>

            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="description">
              Beschreibung
            </label>

            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="admin-form-group">
            <label htmlFor="category">
              Kategorie
            </label>

            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
             >
              <option value="">Kategorie auswählen</option>
              <option value="Gesicht">Gesicht</option>
              <option value="Laser">Laser</option>
              <option value="Waxing">Waxing</option>
              <option value="Augen & Wimpern">Augen & Wimpern</option>
              <option value="Hände & Füße">Hände & Füße</option>
              <option value="Weitere Behandlungen">
                Weitere Behandlungen
              </option>
            </select>
          </div>


          <div className="admin-form-group">
            <label htmlFor="price">
              Preis (€)
            </label>

            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              required
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="duration">
              Dauer
            </label>

            <input
              type="text"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="z. B. 60"
            />
          </div>
          <div className="admin-form-group">
            <label htmlFor="image">
              Bild
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              accept="image/*"
            /> 
            {imageFile && (
              <img
                src={URL.createObjectURL(imageFile)}
                alt="Preview"
                className="admin-image-preview"
              />
            )}
          </div>

          <button
            type="submit"
            className="admin-save-button"
          >
            {editingId
              ? "Änderungen speichern"
              : "Behandlung hinzufügen"}
          </button>

          {editingId && (
            <button
              type="button"
              className="admin-cancel-button"
              onClick={handleCancelEdit}
            >
              Abbrechen
            </button>
          )}

        </form>
      </section>

      <section className="admin-services">
           <div className="behandlung-termine-bar">
             <h2>Behandlungen</h2>
           </div>
        

         <div className="admin-services-grid">

          {services.map((service) => (
            <div
              className="admin-service-card"
              key={service._id}>
              {service.image && (
                <img
                  src={service.image}
                  alt={service.title}
                  className="admin-service-image"
                />
              )}
              <h3>{service.title}</h3>

              <p>{service.description}</p>

              <p className="admin-price">
                {service.price} €
              </p>

              {service.duration && (
                <p>
                  Dauer: {service.duration}
                </p>
              )}

              <div className="admin-actions">

                <button
                  className="edit-button"
                  onClick={() => handleEdit(service)}
                >
                  Bearbeiten
                </button>

                <button
                className="delete-button"
                  onClick={() =>
                    handleDelete(service._id)
                  }
                >
                  Löschen
                </button>

              </div>

            </div>
          ))}

        </div>

      </section>


            
      <section className="admin-services">

        <div className="behandlung-termine-bar">
          <h2>Vorher/Nachher Ergebnisse</h2>
        </div>

        {galleryMessage && (
       <p className="admin-success">
         {galleryMessage}
       </p>
       )}

       {galleryError && (
       <p className="admin-error">
          {galleryError}
       </p>
        )}

        <form onSubmit={handleGallerySubmit}>

          <div className="admin-form-group">
            <label htmlFor="galleryImage">
              Neues Bild
            </label>

            <input
              type="file"
              id="galleryImage"
              accept="image/*"
              onChange={handleGalleryImageChange}
            />

            {galleryImageFile && (
              <img
                src={URL.createObjectURL(galleryImageFile)}
                alt="Galerie Vorschau"
                className="admin-image-preview"
              />
            )}
          </div>

          <button
            type="submit"
            className="admin-save-button"
          >
            Bild hinzufügen
          </button>

        </form>


        <div className="admin-services-grid">

          {galleryImages.map((galleryImage) => (

            <div
              className="admin-service-card"
              key={galleryImage._id}
            >

              <img
                src={galleryImage.image}
                alt="Vorher und Nachher"
                className="admin-service-image"
              />

              <div className="admin-actions">

                <button
                  type="button"
                  className="delete-button"
                  onClick={() =>
                    handleDeleteGalleryImage(galleryImage._id)
                  }
                >
                  Löschen
                </button>

              </div>

            </div>

          ))}

        </div>

      </section>

      

      
      
      

    </main>
  );
};

export default AdminDashboard;