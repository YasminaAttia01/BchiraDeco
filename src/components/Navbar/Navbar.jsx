// import logo from "../../assets/logo.png"
import { anim, banner, objectAni } from "./animation";
import "./navbar.scss";
import {motion} from "framer-motion"
function Navbar({ open, setOpen }) {


  return (
    <motion.div className="navbar-container" {...anim(banner)} >
    
      {/* <img src={logo} alt="logo" /> */}
      <motion.h2 variants={objectAni}>logo</motion.h2>
      <nav onClick={() => setOpen(!open)}>
        <div className={open ? "hamburger-menu open" : "hamburger-menu"}>
          <div className={open ? "bar open" : "bar"}></div>
        </div>
        <ul className={open ? "ulopen" : "ulclosed"} >
         <a href="#accueil"> <motion.li variants={objectAni}>&nbsp; Accueil &nbsp;</motion.li></a>
        <a href="#aPropos"> <motion.li variants={objectAni}>&nbsp;À propos &nbsp;</motion.li></a> 
         <a href="#prods"> <motion.li variants={objectAni} >&nbsp;Produits&nbsp;</motion.li></a>
        <a href="#contact">  <motion.li variants={objectAni}  >&nbsp;Contact&nbsp;</motion.li></a>
        </ul>
      </nav>
    </motion.div>
  );
}

export default Navbar;
