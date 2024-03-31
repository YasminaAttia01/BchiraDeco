import axios from "axios";
import { createContext, useEffect, useState } from "react";
import axiosConfig from "../utils/AxiosConfig";

export const ProductStore = createContext();
function ProductsContext({ children }) {
  const [products, setProducts] = useState([
   
  ]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await axiosConfig.get("/products");
        setProducts(res.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, []);
  return (
    <ProductStore.Provider value={{ products, setProducts,loading }}>
      {children}
    </ProductStore.Provider>
  );
}

export default ProductsContext;
