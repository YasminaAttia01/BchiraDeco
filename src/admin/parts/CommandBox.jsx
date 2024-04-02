import React, { useContext } from "react";
import axiosConfig from "../../utils/AxiosConfig";
import { toast } from "react-toastify";
import { authStore } from "../../context/AuthContext";
import { orderActions, orderStore } from "../../context/OrderContext";

function CommandBox({ post, dispatchOrder }) {
  const { auth } = useContext(authStore);

  const hundleAccept = () => {
    axiosConfig
      .put(
        `/orders/${post._id}`,
        { ...post, status: "completed" },
        { headers: { authorization: `Bearer ${auth}` } }
      )
      .then((res) => {
        if (res.data.status === "success") {
          console.log(res.data.data.products);
          res.data.data.products.map((product) => {
            axiosConfig.put(`/products/${product}`, {status:false},   { headers: { authorization: `Bearer ${auth}` } })
          });
          toast.success(res.data.status);
          dispatchOrder(orderActions.editOrder(res.data.data));
        }
      })
      .catch((err) => toast.error(err));
  };
  const hundleCancel = () => {
    axiosConfig
      .put(
        `/orders/${post._id}`,
        { ...post, status: "canceled" },
        { headers: { authorization: `Bearer ${auth}` } }
      )
      .then((res) => {
        if (res.data.status === "success") {
          toast.success(res.data.status);
          dispatchOrder(orderActions.editOrder(res.data.data));
        }
      })
      .catch((err) => toast.error(err));
  };
  return (
    <div className="commandBox">
      <p>{post._id}</p>
      <span>{post.totalPrice}</span>
      <p>{post.products.length} article(s)</p>
      <span>number arti</span>
      <h3>
        beja
        <br />
        rue
      </h3>
      <p>date</p>

      <div className="plus">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512">
          <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
        </svg>
        <div className="dropdown">
          <li onClick={hundleAccept}>livrer</li>
          <li onClick={hundleCancel}>annuler</li>
        </div>
      </div>
    </div>
  );
}

export default CommandBox;
