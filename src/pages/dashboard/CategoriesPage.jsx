
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./adminCategories.scss";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: "", photos: [] });
  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");

  const fetchCategories = async () => {
    const res = await axios.get("/api/categories");
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

    try {
      if (editId) {
        await axios.put(`/api/categories/${editId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post("/api/categories", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setForm({ name: "", photos: [] });
      setEditId(null);
      fetchCategories();
    } catch (err) {
      alert("Erreur: " + err.response?.data?.message || err.message);
    }
  };

  const handleEdit = (category) => {
    setEditId(category._id);
    setForm({ name: category.name, photos: [] });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Confirmer la suppression ?")) {
      await axios.delete(`/api/categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCategories();
    }
  };

  return (
    <div className="admin-categories">
      <h2>Gérer les catégories</h2>

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

      <ul>
        {categories.map((cat) => (
          <li key={cat._id}>
            <strong>{cat.name}</strong>
            {cat.photos.map((p, i) => (
              <img key={i} src={`/uploads/${p}`} alt={cat.name} />
            ))}
            <div className="actions">
              <button onClick={() => handleEdit(cat)}>✏️ Modifier</button>
              <button onClick={() => handleDelete(cat._id)}>🗑️ Supprimer</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesPage
