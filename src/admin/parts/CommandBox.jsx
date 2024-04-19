import React, { useContext } from "react";
import axiosConfig from "../../utils/AxiosConfig";
import { toast } from "react-toastify";
import { authStore } from "../../context/AuthContext";
import { orderActions, orderStore } from "../../context/OrderContext";
import { Link } from "react-router-dom";

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
  console.log(post);
  return (
    <div className="commandBox">
      <p>{post.user.name}</p>
      <span>{post.totalPrice} DT</span>
      <p>{post.products.length} article(s)</p>
      <span>{post._id}</span>
      <h3>
     {post.user.address.split(20)}
      </h3>
      <p>{post.createdAt.split('T')[0]}</p>

      <div className="plus">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512">
          <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
        </svg>
        <div className="dropdown">
          <li onClick={hundleAccept} style={{background:"rgba(195, 187, 255, 1)"}}>livrer</li>
          <li onClick={hundleCancel} style={{background:"rgba(80, 65, 188, 1)"}}>annuler</li>
        <Link to={"commands/"+post._id}>  <li> detail</li></Link>
        </div>
      </div>
    </div>
  );
}

export default CommandBox;
