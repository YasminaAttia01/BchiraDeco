import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "./categoryShowcase.scss";

const CategoryShowcase = () => {
  const [categories, setCategories] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:8000/api/categories");
      setCategories(res.data);
    };
    fetchData();
  }, []);

  return (
    <section className="category-showcase">
      <h3>{t("categories.title")}</h3>
      <h2>{t("categories.subtitle")} <span>{t("categories.span")}</span></h2>

      <div className="categories-grid">
        {categories.map((cat) => (
          <Link to={`/products/category/${cat._id}`} key={cat._id} className="category-card">
            {cat.photos[0] && (
              <img
                src={`http://localhost:8000/uploads/${cat.photos[0]}`}
                alt={cat.name}
              />
            )}
            <p>{cat.name}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoryShowcase;