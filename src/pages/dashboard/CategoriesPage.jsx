import React, { useEffect, useState } from "react";
import axios from "axios";
import "./adminCategories.scss";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-image-lightbox/style.css";
import Lightbox from "react-image-lightbox";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: "", photos: [] });
  const [editId, setEditId] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState("");

  const token = localStorage.getItem("token");

  const fetchCategories = async () => {
    const res = await axios.get("http://localhost:8000/api/categories");
    setCategories(res.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "photos") {
      setForm({ ...form, photos: e.target.files });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", form.name);
    for (let i = 0; i < form.photos.length; i++) {
      formData.append("photos", form.photos[i]);
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      if (editId) {
        await axios.put(`http://localhost:8000/api/categories/${editId}`, formData, config);
        toast.success("Catégorie mise à jour !");
      } else {
        await axios.post("http://localhost:8000/api/categories", formData, config);
        toast.success("Catégorie ajoutée !");
      }

      setForm({ name: "", photos: [] });
      setEditId(null);
      fetchCategories();
    } catch (err) {
      toast.error("Erreur : " + (err.response?.data?.message || err.message));
    }
  };

  const handleEdit = (category) => {
    setEditId(category._id);
    setForm({ name: category.name, photos: [] });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Catégorie supprimée");
      fetchCategories();
    } catch (err) {
      toast.error("Erreur lors de la suppression");
    }
  };

  return (
    <div className="admin-categories">
      <ToastContainer />
      <h2>Gérer les catégories</h2>

      <div className="form-section">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Nom de la catégorie"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="file"
            name="photos"
            multiple
            accept="image/*"
            onChange={handleChange}
          />
          <button type="submit">{editId ? "Modifier" : "Ajouter"}</button>
        </form>
      </div>

      <div className="categories-list">
        {categories.map((cat) => (
          <div key={cat._id} className="category-card">
            <strong>{cat.name}</strong>
            <div className="image-grid">
              {cat.photos.map((p, i) => (
                <img
                  key={i}
                  src={`http://localhost:8000/uploads/${p}`}
                  alt={cat.name}
                  onClick={() => {
                    setLightboxImage(`http://localhost:8000/uploads/${p}`);
                    setLightboxOpen(true);
                  }}
                />
              ))}
            </div>
            <div className="actions">
              <button onClick={() => handleEdit(cat)}>✏️ Modifier</button>
              <button onClick={() => handleDelete(cat._id)}>🗑️ Supprimer</button>
            </div>
          </div>
        ))}
      </div>

      {lightboxOpen && (
        <Lightbox
          mainSrc={lightboxImage}
          onCloseRequest={() => setLightboxOpen(false)}
        />
      )}
    </div>
  );
};

export default CategoriesPage;
