import "./modal.scss";
import exmple1 from "../../assets/exmple1.png";
import exmple2 from "../../assets/exmple2.png";
import exmple3 from "../../assets/exmple3.jpg";
import { motion } from "framer-motion";

function Modal({ setOpenModal}) {
    const modalAnim={
        initial: {
            scaleY: 0,
            opacity: 0
        },
        animate: {
            scaleY: 1,
            opacity: 1,
            transition: {
                duration: 0.2
            }
        },
        exit: {
            scaleY: 0,
            opacity: 0,
            transition: {
                duration: 0.2
            }
        }
            
    }
  return (
    <motion.div className="modal-container" key="modal" initial="initial" animate="animate" exit="exit" variants={modalAnim}>
      <div className="modal">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" onClick={() => setOpenModal(false)}>
          <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
        </svg>
        <div className="images">
          <img src={exmple1} alt="" />

          <div className="small-images">
            <img src={exmple2} alt="" />
            <img src={exmple3} alt="" />
          </div>
        </div>
        <div className="description">
          <button>ajouter a ma carte</button>
          <h3>Zara</h3>
          <div>
            <p>Couleurs</p>
            <div className="colors" />
          </div>
          <div>
            <p>Tailles</p>
            <span>XL</span>
          </div>
          <div>
            <p>Prix</p>
            <span>80dt</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Modal;
