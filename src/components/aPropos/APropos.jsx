import "./aPropos.scss"
import image1 from "../../assets/aPropos1.webp";
import image2 from "../../assets/aPropos2.webp";
import image3 from "../../assets/aPropos3.webp";
import image4 from "../../assets/aPropos4.webp";
import {motion, useAnimation, useInView} from "framer-motion"
import { image1Anim,image2Anim,image3Anim,image4Anim,anim } from "./animation";
import { useEffect, useRef } from "react";

function APropos() {
    const ref = useRef(null);
    const isInView = useInView(ref);
  
  return (
    <div id="aPropos" className="aPropos-container">
      <div className="aPropos-images">
        <div className="first">
          <motion.img style={{height:"44%" }} {...anim(image1Anim)}   src={image1} alt="" />
          <motion.img style={{height:"55%"}}  {...anim(image2Anim)}  src={image3} alt="" />
        </div>

        <div className="second">
          <motion.img style={{height:"36%"}}  {...anim(image3Anim)} src={image2} alt="" />
          <motion.img style={{height:"63%"}} {...anim(image4Anim)} src={image4} alt="" />
        </div>
      </div>
      <div className="aPropos-text">
        <h2>À propos de nous</h2>
        <h3>
          Nous proposons des vêtements de qualité à des prix abordables et prêts
          à être livrés.
        </h3>
        <p>
          Nous servons d'intermédiaire entre les vendeurs de vêtements et les
          acheteurs  à la recherche de vêtements à des prix raisonnables sur
          notre site web.
        </p>
      </div>
    </div>
  );
}

export default APropos;
