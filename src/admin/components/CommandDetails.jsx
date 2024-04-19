import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axiosConfig, { backLink } from "../../utils/AxiosConfig";
import { authStore } from "../../context/AuthContext";
import avatar from "../../assets/avatar.webp";
import { hydrate } from "react-dom";
function CommandDetails() {
  const [order, setOrder] = useState({});
  const params = useParams();

  const { auth } = useContext(authStore);

  useEffect(() => {
    toast.promise(
      axiosConfig
        .get("/orders/" + params.id, {
          headers: { Authorization: `Bearer ${auth}` },
        })
        .then((res) => setOrder(res.data.data)),
      {
        loading: "Loading",

        error: "Error when fetching",
      }
    );
  }, []);
  return (
    <div className="command-details-container">
      <h2>Détailles Commande</h2>
      <div className="buttons">
        <button>valider</button>
        <button style={{ backgroundColor: "rgba(195, 187, 255, 1)",border:"none" ,color:"black" }}>annuler</button>
      </div>
      <div className="details">
        <div className="user-details">
          <img src={avatar} alt="" />
          <div className="personal-details">
          <p>
             <span  className="name">order N°</span>:
              <span>
                {order._id} 
              </span>
            </p>
            <p>
             <span  className="name">nom et prenom</span>:
              <span>
                {order.user?.name} {order.user?.lastNAme}
              </span>
            </p>
            <p>
            <span className="name"> email</span> : <span>{order.user?.email}</span>
            </p>
            <p>
             <span className="name"> telephone</span>: <span> {order.user?.phone} </span>
            </p>
            <p>
             <span className="name"> address</span>: <span> {order.user?.address} </span>{" "}
            </p>
            <div>
              <p> {order.products?.length}Articel(s) </p>
              <p>
                Prix: <span>{order.totalPrice} DT</span>{" "}
              </p>
              <p> {order.createdAt?.split("T")[0]} </p>
            </div>
          </div>
        </div>
        <div className="products-details">
          {order.products?.map((product) => (
            <div className="product" key={product._id}>
              <img src={backLink+product.images[0]} />
                <div>
                    <h3> {product.title} </h3>
                    <p> {product.brand} </p>
                </div> 
                <p> {product.price} DT </p>
            
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default CommandDetails;
