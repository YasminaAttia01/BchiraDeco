import React, { useEffect, useState } from "react";
import axios from "axios";
import "./adminCategories.scss";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-image-lightbox/style.css";
import Lightbox from "react-image-lightbox";

const ProductsPage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    dimensions: "",
    colors: "",
    photos: [],
    categoryId: ""
  });
  const [editId, setEditId] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState("");
  const token = localStorage.getItem("token");

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/categories");
      setCategories(res.data);
      if (res.data.length > 0 && !selectedCategory) {
        setSelectedCategory(res.data[0]._id);
        setForm((prev) => ({ ...prev, categoryId: res.data[0]._id }));
      }
    } catch (err) {
      toast.error("Erreur lors du chargement des catégories");
    }
  };

  const fetchProducts = async () => {
    if (selectedCategory) {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/products/category/${selectedCategory}`
        );
        setProducts(res.data);
      } catch (err) {
        toast.error("Erreur lors du chargement des produits");
      }
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setForm({ ...form, categoryId: e.target.value });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photos") {
      setForm({ ...form, photos: files });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCategory) {
      toast.error("Veuillez sélectionner une catégorie");
      return;
    }

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("dimensions", form.dimensions);
    formData.append("category", selectedCategory);
    form.colors.split(",").forEach((color) => formData.append("colors", color.trim()));
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
        await axios.put(
          `http://localhost:8000/api/products/${editId}`,
          formData,
          config
        );
        toast.success("Produit mis à jour !");
      } else {
        await axios.post("http://localhost:8000/api/products", formData, config);
        toast.success("Produit ajouté !");
      }
      setForm({
        name: "",
        description: "",
        price: "",
        dimensions: "",
        colors: "",
        photos: [],
        categoryId: selectedCategory,
      });
      setEditId(null);
      fetchProducts();
    } catch (err) {
      toast.error("Erreur : " + (err.response?.data?.message || err.message));
    }
  };

  const handleEdit = (product) => {
    setEditId(product._id);
    setForm({
      name: product.name,
      description: product.description || "",
      price: product.price || "",
      dimensions: product.dimensions || "",
      colors: product.colors?.join(", ") || "",
      photos: [],
      categoryId: selectedCategory,
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Produit supprimé");
      fetchProducts();
    } catch (err) {
      toast.error("Erreur lors de la suppression");
    }
  };

  return (
    <div className="admin-categories">
      <ToastContainer />
      <h2>Gérer les produits</h2>

      <div className="form-section">
        <div className="category-selector">
          <label>Sélectionner une catégorie : </label>
          <select value={selectedCategory} onChange={handleCategoryChange}>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Nom du produit"
            value={form.name}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
          />
          <textarea
            type="number"
            name="price"
            placeholder="Prix"
            value={form.price}
            onChange={handleChange}
          />
          <textarea
            type="text"
            name="dimensions"
            placeholder="Dimensions"
            value={form.dimensions}
            onChange={handleChange}
          />
          <input
            type="text"
            name="colors"
            placeholder="Couleurs (séparées par des virgules)"
            value={form.colors}
            onChange={handleChange}
          />
          <input
            type="file"
            name="photos"
            multiple
            accept="image/*"
            onChange={handleChange}
          />
          <button type="submit">{editId ? "Modifier" : "Ajouter"} Produit</button>
        </form>
      </div>

      <div className="categories-list">
        {products.map((product) => (
          <div key={product._id} className="category-card">
            <strong>{product.name}</strong>
            <div className="image-grid">
              {product.photos.map((p, i) => (
                <img
                  key={i}
                  src={`http://localhost:8000/uploads/${p}`}
                  alt={product.name}
                  onClick={() => {
                    setLightboxImage(`http://localhost:8000/uploads/${p}`);
                    setLightboxOpen(true);
                  }}
                />
              ))}
            </div>
            <div className="actions">
              <button onClick={() => handleEdit(product)}>✏️ Modifier</button>
              <button onClick={() => handleDelete(product._id)}>🗑️ Supprimer</button>
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

export default ProductsPage;
