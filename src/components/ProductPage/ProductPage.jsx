import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./productPage.scss";

const ProductPage = () => {
  const { categoryId } = useParams();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);

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

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/cart", { withCredentials: true });
        setCartCount(res.data.items.length || 0);
      } catch (err) {
        console.error("Erreur chargement panier :", err);
        setCartCount(0);
      }
    };
    fetchCart();
  }, []);

  const handleAddToCart = async (product) => {
    try {
      await axios.post("http://localhost:8000/api/cart/add", {
        productId: product._id,
        quantity: 1,
      }, { withCredentials: true });

      setCartCount((prev) => prev + 1);

      toast.success("✅ Produit ajouté au panier !", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        theme: "light"
      });
    } catch (err) {
      console.error("Erreur lors de l'ajout au panier :", err);
      toast.error("Erreur ajout panier !");
    }
  };

  return (
    <div className="shop-page">
      <ToastContainer />
      <header className="hero-section">
        <img src="/images/hero.jpg" alt="hero background" className="hero-img" />
        <Link to="/" className="back-home">← Retour</Link>

        {/* Cart Icon */}
        <Link to="/order" className="cart-icon">
          <FaCartPlus className="shiny-cart" />
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </Link>

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
              <div className="product-footer">
                <button 
                  onClick={() => handleAddToCart(product)} 
                  title="Ajouter au panier" 
                  className="add-to-cart-button"
                >
                  <FaCartPlus /> Ajouter au panier
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductPage;
