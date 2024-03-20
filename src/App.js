import { useEffect, useState } from "react";
import "./app.scss";
import Navbar from "./components/Navbar/Navbar";
import Header from "./components/header/Header";
import APropos from "./components/aPropos/APropos";
import Achteurs from "./components/achteurs/Achteurs";
import Vendeurs from "./components/vendeurs/Vendeurs";
import Consultez from "./components/consultez/Consultez";
import Loader from "./components/loader/Loader";
import { AnimatePresence, motion } from "framer-motion";
import Products from "./components/products/Products";

function App() {
  const [openNavbar, setOpenNavbar] = useState(false);
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  useEffect(()=>{
    const timer = setTimeout(()=>{
      setLoading(false)
    },2900)
    return () => {
      clearTimeout(timer)
    }
  },[])
  return (
    <div className="App">
      <AnimatePresence mode="wait">
        {loading ? (
          <Loader />
        ) : (
          <motion.div key="transition">
            <Navbar open={openNavbar} setOpen={setOpenNavbar} />
            <Header />
            <div className="container">
              <APropos />
              <Achteurs />
              <Vendeurs />
              <Consultez  setCategory={setCategory} category={category}/>
              <Products category ={category}/>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
