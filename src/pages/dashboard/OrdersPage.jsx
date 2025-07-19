import { useEffect, useState } from "react";
import axios from "axios";
import "./orderTable.scss";

function OrdersPage() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = () => {
    axios
      .get("http://localhost:8000/api/orders")
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("Erreur chargement commandes", err));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = (orderId, newStatus) => {
    axios
      .patch(`http://localhost:8000/api/orders/${orderId}/status`, { status: newStatus })
      .then(() => fetchOrders())
      .catch((err) => console.error("Erreur mise à jour statut", err));
  };

  const handleDelete = (orderId) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette commande ?")) {
      axios
        .delete(`http://localhost:8000/api/orders/${orderId}`)
        .then(() => {
          fetchOrders();
        })
        .catch((err) => {
          console.error("Erreur suppression commande", err);
          alert("Erreur lors de la suppression");
        });
    }
  };

  return (
    <div className="table-container">
      <table className="order-table">
        <thead>
          <tr>
            <th>N°</th>
            <th>Nom complet</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th>Adresse</th>
            <th>Produits</th>
            <th>Prix total</th>
            <th>Statut</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => {
            const client = order.clientInfo;
            const items = order.cart?.items || [];

            return (
              <tr key={order._id}>
                <td>{index + 1}</td>
                <td>{client.name} {client.lastName}</td>
                <td>{client.email}</td>
                <td>{client.phone}</td>
                <td>{client.address}</td>
                <td>
                  <ul>
                    {items.map((item, idx) => (
                      <li key={idx}>
                        {item.product?.name || "Produit supprimé"} — x{item.quantity}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>{order.totalPrice.toFixed(2)} DT</td>
                <td>
                  <select
                    value={order.status}
                    className={`status-select ${order.status}`}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  >
                    <option value="pending">En attente</option>
                    <option value="confirmed">Confirmée</option>
                    <option value="cancelled">Annulée</option>
                  </select>
                </td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(order._id)}>🗑️</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default OrdersPage;
