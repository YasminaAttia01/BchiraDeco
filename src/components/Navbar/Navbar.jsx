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
          <motion.li variants={objectAni} data-hover="Home">&nbsp; Home &nbsp;</motion.li>
          <motion.li variants={objectAni} data-hover="About">&nbsp;About&nbsp;</motion.li>
          <motion.li variants={objectAni}   data-hover="Contact">&nbsp;Contact&nbsp;</motion.li>
        </ul>
      </nav>
    </motion.div>
  );
}

export default Navbar;
