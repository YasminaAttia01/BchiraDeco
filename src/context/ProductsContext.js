import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const ProductStore = createContext();
function ProductsContext({children}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchPosts = async () => {
     try{
      setLoading(true);
      const res = await axios.get("https://fakestoreapi.com/products");
      setProducts(res.data);
      setLoading(false);
  }
  catch(error){
    console.log(error)
  }
    };
    fetchPosts();
  }, []);
  return (
    <ProductStore.Provider value={ {products , loading}}>
      {children}
    </ProductStore.Provider>
  );
}

export default ProductsContext;
