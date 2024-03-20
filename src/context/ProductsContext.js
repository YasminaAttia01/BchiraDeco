import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const ProductStore = createContext();
function ProductsContext({children}) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
     
      const res = await axios.get("https://fakestoreapi.com/products");
      setProducts(res.data);
  
    };
    fetchPosts();
  }, []);
  return (
    <ProductStore.Provider value={ products }>
      {children}
    </ProductStore.Provider>
  );
}

export default ProductsContext;
