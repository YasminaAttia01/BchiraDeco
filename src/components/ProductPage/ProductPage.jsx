import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./productPage.scss";

const ProductPage = () => {
  const { categoryId } = useParams();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/categories");
        setCategories(res.data);

        if (categoryId) {
          const found = res.data.find((cat) => cat._id === categoryId);
          setSelectedCategory(found || null);
        } else {
          setSelectedCategory(null);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
        setSelectedCategory(null);
      }
    };
    fetchCategories();
  }, [categoryId]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!categoryId) return;
      try {
        const res = await axios.get(
          `http://localhost:8000/api/products/category/${categoryId}`
        );
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      }
    };
    fetchProducts();
  }, [categoryId]);

  return (
    <div className="shop-page">
      <header className="hero-section">
        <img src="/images/hero.jpg" alt="hero background" className="hero-img" />
        <Link to="/" className="back-home">← Retour</Link>
        <div className="hero-text">
          {selectedCategory && (
            <h2 className="category-title">{selectedCategory.name}</h2>
          )}

          <button className="cta-button">Nos produits</button>
        </div>
      </header>

      <section className="sets-section">
        <div className="sets-header">
          <p>Bchira Deco</p>
        </div>

        <div className="product-grid">
          {products.map((product) => (
            <div className="product-card" key={product._id}>
              <div className="product-image">
                <img
                  src={`http://localhost:8000/uploads/${product.photos[0]}`}
                  alt={product.name}
                />
              </div>
              <div className="product-info">
                <h4>{product.name}</h4>
                <p className="price">{product.price?.toFixed(2)} DT</p>
                <p className="price">{product.dimensions} cm</p>
                <p className="price">{product.colors}</p>
                <p className="description">{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductPage;
