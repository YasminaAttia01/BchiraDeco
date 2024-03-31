import React, { useContext, useEffect, useState } from "react";
import { cardActions, cardStore } from "../../context/CardContext";
import ProductBox from "../parts/productBox/ProductBox";
import "./order.scss";
import { useNavigate } from "react-router-dom";
import Modal from "../modal/Modal";
import { AnimatePresence, motion } from "framer-motion";
import Transition2 from "../transition/Transtion2";
import Footer from "../footer/Footer";
import axiosConfig from "../../utils/AxiosConfig";
import { toast } from "react-toastify";

const pageTransition = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};
function Order() {
  const [user, setUser] = useState(false);
  const { card, dispatchCard } = useContext(cardStore);
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [openModal, setOpenModal] = useState(false);

  const totalPrice = card.reduce((a, b) => a + b.price, 0);
  const hundleOrder = (e) => {
    e.preventDefault();

    axiosConfig
      .post("/orders", { totalPrice, user, products: card })
      .then((res) => {
        if (res.data.status === "success") {
          toast.success("commande envoye avec succes");
          var timer = setTimeout(() => {
            setOpenModal(false);
            dispatchCard(cardActions.clearCard());
          }, 1500);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) =>{
        if(err.response.data.message.includes('Order')){
            toast.error('il faut verifier vos cordonner');
            
        }
        })
  };
  useEffect(() => {
    if (card.length === 0 && !openModal) {
      navigate("/");
    }
  }, [card.length, navigate, openModal]);

  return (
    <Transition2>
      <motion.div
        initial="initial"
        animate="animate"
        variants={pageTransition}
        className="order-container"
      >
        <div className="order">
          <h2>Panier d'achat</h2>
          <p>Vous avez {card.length} article(s) dans votre panier.           <p className="total">Total : {totalPrice} DT</p></p>
          {card.map((item) => (
            <ProductBox
              key={item._id}
              product={item}
              setOpenModal={setOpenModal}
              setProduct={setProduct}
            />
          ))}


          <AnimatePresence>
            {" "}
            {openModal ? (
              <Modal
                openModal={openModal}
                product={product}
                setOpenModal={setOpenModal}
              />
            ) : null}
          </AnimatePresence>
        </div>
        <form>
          <div className="formHead">
            <h3>Cher client,</h3>
            <p>
              Nous vous remercions de nous avoir fourni vos coordonnées pour le
              suivi de votre commande. Si vous n'avez pas encore reçu de retour
              de notre part après une semaine, veuillez nous envoyer un mail à
              l'adresse hello@gmail.com.
            </p>
            <hr />
          </div>
          <div className="nameInput">
            {" "}
            <label htmlFor="">Nom</label>
            <input
              type="text"
              name="name"
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
          </div>
          <div className="lastnameInput">
            {" "}
            <label htmlFor="">Prenom</label>
            <input
              type="text"
              name="name"
              onChange={(e) => setUser({ ...user, lastNAme: e.target.value })}
            />
          </div>
          <div className="emailInput">
            <label htmlFor="">Email</label>
            <input
              type="email"
              name="email"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
          <div className="phoneInput">
            {" "}
            <label htmlFor="">Telephone</label>
            <input
              type="number"
              name="tel"
              onChange={(e) => setUser({ ...user, phone: e.target.value })}
            />
          </div>
          <div className="addressInput">
            <label htmlFor="">Adresse</label>
            <input
              type="text"
              name="adress"
              onChange={(e) => setUser({ ...user, address: e.target.value })}
            />
          </div>
          <div className="formvalidation">
          <hr />
          <div>
            <button type="submit" onClick={hundleOrder}>
              passer l'order
            </button>
            <button
              type="submit"
              onClick={(e) =>{ e.preventDefault(); dispatchCard(cardActions.clearCard())}}
              style={{ background: "gray" }}
            >
              annuler la commande
            </button>
          </div>
        </div>
        </form>
        
      </motion.div>
      {/* <Footer /> */}
    </Transition2>
  );
}

export default Order;
