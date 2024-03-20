import "./loader.scss";
import { motion } from "framer-motion";

import Image from "../../assets/backgroundHeader.webp";
import image1 from "../../assets/aPropos1.webp";
import image2 from "../../assets/aPropos2.webp";
import image3 from "../../assets/aPropos3.webp";
import image4 from "../../assets/aPropos4.webp";

// Import images

const container = {
  show: {
    transition: {
      staggerChildren: 0.35,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 200 },
  show: {
    opacity: 0.3,
    y: 0,
    transition: {
      duration: 1.6,
    },
  },
  exit: {
    opacity: 0,
    y: -200,
    transition: {
      ease: "easeInOut",
      duration: 0.8,
    },
  },
};

const itemMain = {
  hidden: { opacity: 0, y: 200 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.6,
    },
  },
};

const Loader = ({ setLoading }) => {
  return (
    <motion.div className="loader">
      <motion.div
        variants={container}
        onAnimationComplete={() => setLoading(false)}
        initial="hidden"
        animate="show"
        exit="exit"
        className="loader-inner"
      >
        
     
          <motion.img variants={itemMain} initial='hidden' animate='show'
            layoutId="main-image-1"
            src={Image}
            className="main-image"
            alt=""
          />
    
        <motion.img src={image1} className="image1" variants={item} alt=""/>
        <motion.img src={image2} className="image2" variants={item} alt=""/>
        <motion.img src={image3} className="image3" variants={item} alt=""/>
        <motion.img src={image4} className="image4" variants={item} alt=""/>

      </motion.div>
    </motion.div>
  );
};

export default Loader;