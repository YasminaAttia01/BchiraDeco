import { useContext } from "react";
import "./productBox.scss";
import { cardStore } from "../../../context/CardContext";

function ProductBox({ product }) {
  const { dispatchCard } = useContext(cardStore);

  const handleDeleteFromCard = () => {
    dispatchCard({ type: "REMOVE_FROM_CARD", payload: product });
  };

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (newQuantity > 0) {
      dispatchCard({
        type: "UPDATE_QUANTITY",
        payload: { productId: product._id || product.id, quantity: newQuantity }
      });
    }
  };
console.log("ProductBox product:", product);
  return (

    <div className="product-box">
      <img
                  src={`http://localhost:8000/uploads/${product.photos[0]}`}
                  alt={product.name}
                />
      
      <div>
        <h3>{product.name}</h3>
        <h5>{product.colors}</h5>
      </div>
      <span>{product.price} DT</span>
      <div className="quantity-field">
        <label>Quantité :</label>
        <input
          type="number"
          value={product.quantity || 1}
          min="1"
          onChange={handleQuantityChange}
        />
      </div>
      <div className="delete" onClick={handleDeleteFromCard}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path d="..." />
        </svg>
      </div>
    </div>
  );
}

export default ProductBox;
