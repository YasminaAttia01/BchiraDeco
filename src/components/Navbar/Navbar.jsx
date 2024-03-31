// import logo from "../../assets/logo.png"
import { useContext, useEffect, useState } from "react";
import { cardStore } from "../../context/CardContext";
import { anim, banner, objectAni } from "./animation";
import "./navbar.scss";
import { AnimatePresence, motion } from "framer-motion";
import cardIcon from "../../assets/cardIcon.webp";
import { Link, useLocation, useNavigate } from "react-router-dom";
function Navbar({ open, setOpen, setNav }) {
  const { card } = useContext(cardStore);
  const loc = useLocation();
  const [location, setLocation] = useState(loc);
  const navigate = useNavigate();
  useEffect(() => {
    setLocation(loc);
  }, [loc]);
  return (location.pathname==='/'||location.pathname==='/order'?
    <motion.div key={"navbar"} className="navbar-container" {...anim(banner)}>
      {/* <img src={logo} alt="logo" /> */}
      <motion.h2 variants={objectAni}>logo</motion.h2>
      <div style={{width:"100px"}}/>
      <AnimatePresence mode="popLayout">
        {location.pathname !== "/order" ? (
          <motion.nav
            variants={objectAni}
            initial="initial"
            animate="animate"
            exit="exit"
            key={"nav"}
          >
              {card.length > 0 && (
                <motion.div className="shopping-card" variants={objectAni}>
                  <Link to="/order">
                    <p>{card.length}</p>
                    <img src={cardIcon} alt="" />
                  </Link>
                </motion.div>
              )}

            <div
              onClick={() => setOpen(!open)}
              className={open ? "hamburger-menu open" : "hamburger-menu"}
            >
              <div className={open ? "bar open" : "bar"}></div>
            </div>
            <ul className={open ? "ulopen" : "ulclosed"}>
              <a onClick={() => setOpen(false)} href="#accueil">
                <motion.li variants={objectAni}>
                  &nbsp; Accueil &nbsp;
                </motion.li>
              </a>
              <a onClick={() => setOpen(false)} href="#aPropos">
                <motion.li variants={objectAni}>
                  &nbsp;À propos &nbsp;
                </motion.li>
              </a>
              <a onClick={() => setOpen(false)} href="#prods">
                <motion.li variants={objectAni}>&nbsp;Produits&nbsp;</motion.li>
              </a>
              <a onClick={() => setOpen(false)} href="#contact">
                <motion.li variants={objectAni}>&nbsp;Contact&nbsp;</motion.li>
              </a>
            </ul>
          </motion.nav>
        ) : (
          <motion.h3
            onClick={() => {
              navigate(-1);
              setNav(true);
            }}
            initial={{ y: -200 }}
            animate={{ y: 0 }}
            exit={{ y: -200 }}
            transition={{ duration: 0.5 }}
            key={"back"}
            style={{ cursor: "pointer" }}
          >
            Retour
          </motion.h3>
        )}
      </AnimatePresence>
    </motion.div>:null
  );
}

export default Navbar;
