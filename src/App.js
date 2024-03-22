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
import Contact from "./components/contact/Contact";
import Footer from "./components/footer/Footer";
import Modal from "./components/modal/Modal";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashbord from "./admin/Dashbord";

function App() {
  const [openNavbar, setOpenNavbar] = useState(false);
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2900);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={
      <AnimatePresence mode="wait">
        {loading ? (
          <Loader />
        ) : (
          <motion.div key="transition">
            <Navbar open={openNavbar} setOpen={setOpenNavbar} />
            <Header setOpenNavbar={setOpenNavbar} />
            <div className="container" onClick={() => setOpenNavbar(false)}>
              <APropos />
              <Achteurs />
              <Vendeurs />
              <Consultez category={category} setCategory={setCategory} />
              <Products category={category} />

              <Contact />
              <Footer />
            </div>
          </motion.div>
        )}
      </AnimatePresence>}/>
          <Route path="/dashbordAdmin" element={<Dashbord />} />
        </Routes>
    </div>
  );
}

export default App;
