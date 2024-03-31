import "./header.scss";
import { AnimatePresence, motion } from "framer-motion";
import image from "../../assets/backgroundHeader.webp";
import { banner, letterAni, text, anim } from "./animation";

function Header( {setOpenNavbar}) {
  return (
    <AnimatePresence>
    <motion.div  id="accueil" className="header-container"   onClick={() => setOpenNavbar(false)}>
      <motion.img src={image} alt=""   layoutId='main-image-1' className="backgroundImage"  />
      <motion.div className="backgroundFilter" />
      <motion.h2 {...anim(banner)}>
        <p>
          {[...text.style].map((letter, i) => (
            <motion.span key={i} variants={letterAni}>
              <mark> {letter}</mark>
            </motion.span>
          ))}
        </p>
        &nbsp;
        <p>
          {[...text.sans].map((letter, i) => (
            <motion.span key={i} variants={letterAni}>
              {letter}
            </motion.span>
          ))}
        </p>
        &nbsp;
        <p>
          {[...text.frontieres].map((letter, i) => (
            <motion.span key={i} variants={letterAni}>
              {letter}
            </motion.span>
          ))}
        </p>
        &nbsp;
        
        <p>
          {[...text.pour].map((letter, i) => (
            <motion.span key={i} variants={letterAni}>
              {letter}
            </motion.span>
          ))}
        </p>
        &nbsp;
        <p>
          {[...text.chaque].map((letter, i) => (
            <motion.span key={i} variants={letterAni}>
              {letter}
            </motion.span>
          ))}
        </p>
        &nbsp;
        <p>
          {[...text.moument].map((letter, i) => (
            <motion.span key={i} variants={letterAni}>
              {letter}
            </motion.span>
          ))}
        </p>
        &nbsp;

          <p>
            {[...text.de].map((letter, i) => (
              <motion.span key={i} variants={letterAni}>
                {letter}
              </motion.span>
            ))}
          </p>
        &nbsp;
    
          <p>
            {[...text.votre].map((letter, i) => (
              <motion.span key={i} variants={letterAni}>
                <mark> {letter}</mark>
              </motion.span>
            ))}
          </p>
        &nbsp;
    
        <p>
          {[...text.vie].map((letter, i) => (
            <motion.span key={i} variants={letterAni}>
              <mark> {letter}</mark>
            </motion.span>
          ))}
        </p>
      </motion.h2>
    </motion.div>
    </AnimatePresence>
  );
}

export default Header;
