/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { cardActions, cardStore } from "../../context/CardContext";
import ProductBox from "../parts/productBox/ProductBox";
import "./order.scss";
import { useNavigate } from "react-router-dom";
import Modal from "../modal/Modal";
import { AnimatePresence, motion } from "framer-motion";
import Transition2 from "../transition/Transtion2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

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
  const [user, setUser] = useState({});
  const { card, dispatchCard } = useContext(cardStore);
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [openModal, setOpenModal] = useState(false);

  const totalPrice = card.items
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  const handleOrder = (e) => {
    e.preventDefault();

    axios
      .post(
        "http://localhost:8000/api/orders",
        {
          clientInfo: user,
          totalPrice: parseFloat(totalPrice),
        },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.status === "success") {
          toast.success("✅ Commande envoyée avec succès !", {
            position: "bottom-center",
            className: "toast-above-button",
          });
          console.log("🛒 Cart data from backend:", res.data);
          dispatchCard(cardActions.clearCard());
        } else {
          toast.error(res.data.message || "Erreur lors de la commande.", {
            position: "bottom-center",
            className: "toast-above-button",
          });
        }
      })
      .catch((err) => {
        toast.error("❌ Erreur lors de la commande !", {
          position: "bottom-center",
          className: "toast-above-button",
        });
      });
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/cart", {
          withCredentials: true,
        });
        dispatchCard(cardActions.setCart(res.data.cart));
      } catch (err) {
        console.error("Erreur chargement panier :", err);
      }
    };

    fetchCart();
  }, []);

  return (
    <Transition2>
      <motion.div
        initial="initial"
        animate="animate"
        variants={pageTransition}
        className="order-container order-theme"
      >
        <div className="order">
          <h2>🛒 Panier d'achat</h2>
          <p>
            Vous avez {card.items.length} article(s) dans votre panier.
            <span className="total"> Total : {totalPrice} DT</span>
          </p>
          {card.items.map((item) => (
            <ProductBox
              key={item._id}
              product={item}
              setOpenModal={setOpenModal}
              setProduct={setProduct}
            />
          ))}

          <AnimatePresence>
            {openModal && (
              <Modal
                openModal={openModal}
                product={product}
                setOpenModal={setOpenModal}
              />
            )}
          </AnimatePresence>
        </div>

        <form className="order-form">
          <div className="formHead">
            <h3>📋 Coordonnées</h3>
            <p>
              Merci de remplir vos coordonnées pour le suivi de la commande.
              Si aucun retour après une semaine, contactez-nous :
              belldeco27@gmail.com
            </p>
            <hr />
          </div>

          <div className="nameInput">
            <label htmlFor="name">Nom</label>
            <input
              type="text"
              id="name"
              placeholder="Votre nom"
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
          </div>

          <div className="lastnameInput">
            <label htmlFor="lastname">Prénom</label>
            <input
              type="text"
              id="lastname"
              placeholder="Votre prénom"
              onChange={(e) => setUser({ ...user, lastName: e.target.value })}
            />
          </div>

          <div className="emailInput">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="email@exemple.com"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>

          <div className="phoneInput">
            <label htmlFor="phone">Téléphone</label>
            <input
              type="tel"
              id="phone"
              placeholder="Votre numéro de téléphone"
              onChange={(e) => setUser({ ...user, phone: e.target.value })}
            />
          </div>

          <div className="addressInput">
            <label htmlFor="address">Adresse</label>
            <input
              type="text"
              id="address"
              placeholder="Votre adresse complète"
              onChange={(e) => setUser({ ...user, address: e.target.value })}
            />
          </div>

          <div className="formvalidation">
            <hr />
            <div>
              <button
                type="submit"
                onClick={handleOrder}
                className="btn-order"
              >
                ✅ Passer la commande
              </button>
              <button
                type="button"
                onClick={() => {
                  dispatchCard(cardActions.clearCard());
                  toast.info("🧺 Panier vidé avec succès !", {
                    position: "bottom-center",
                    className: "toast-above-button",
                  });
                }}
                className="btn-cancel"
              >
                ❌ Annuler la commande
              </button>
            </div>

            {/* Toast container near buttons */}
            <ToastContainer
              autoClose={3000}
              hideProgressBar
              closeOnClick
              pauseOnHover
              draggable
              theme="colored"
            />
          </div>
        </form>
      </motion.div>
    </Transition2>
  );
}

export default Order;
