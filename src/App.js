import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import "./app.scss";
import { Helmet } from "react-helmet";
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
import { useLocation } from "react-router-dom";
import Order from "./components/order/Order";
import Transition from "./components/transition/Transition";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import './i18n';

const appTrans = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
};
function App() {
    const isAuthenticated = !!localStorage.getItem("token"); // simple check

  const [openNavbar, setOpenNavbar] = useState(false);
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  useEffect(() => {
    const timer2 = setTimeout(() => {
      setLoading2(false);
    }, 4000);
    return () => {
      clearTimeout(timer2);
    };
  }, []);
  const [nav, setNav] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setNav(false);
  }, [location]);

  return (
    <div className="App">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        bodyStyle={{ backgroundColor: "white", color: "black" }}
        toastStyle={{ backgroundColor: "white", color: "black" }}
        progressStyle={{ backgroundColor: "black" }}
      />
      <Helmet>
        {!nav ? (
          <style>{`* { scroll-behavior: smooth; }`}</style>
        ) : (
          <style>{`* { scroll-behavior: auto; }`}</style>
        )}
      </Helmet>
      <AnimatePresence mode="popLayout">
        {loading ? (
          <Loader />
        ) : (
          <motion.div
            key={"app-trans"}
            style={{
              width: "100%",
              position: loading2 ? "fixed" : "static",
              top: 0,
            }}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={appTrans}
          >
            {" "}
            <Navbar open={openNavbar} setOpen={setOpenNavbar} setNav={setNav} />
            <AnimatePresence mode="popLayout" initial={false}>
              <Routes location={location} key={location.pathname}>
                <Route
                  path="/"
                  element={
                    <Transition>
                      <Header setOpenNavbar={setOpenNavbar} />
                      <div
                        className="App-container"
                        onClick={() => setOpenNavbar(false)}
                      >
                        <APropos />
                        <Consultez
                          category={category}
                          setCategory={setCategory}
                        />
                        <Products category={category} />
                        
                        <Vendeurs />
                        <Achteurs />
                        <Contact />
                        <Footer />
                      </div>
                    </Transition>
                  }
                />
                <Route exact path="/order" element={<Order />} />
                      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />

                  
                
              </Routes>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
