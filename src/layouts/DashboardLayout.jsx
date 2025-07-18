// src/layouts/DashboardLayout.jsx
import { Outlet, NavLink } from "react-router-dom";
import "./DashboardLayout.scss";
import { FaBox, FaClipboardList, FaSignOutAlt, FaTachometerAlt } from "react-icons/fa";

const DashboardLayout = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Bchira Deco</h2>
        </div>
        <nav className="nav-links">
          <NavLink to="/dashboard/orders" end className={({ isActive }) => isActive ? "active" : ""}>
            <FaTachometerAlt /> Orders
          </NavLink>
          <NavLink to="/dashboard/categories" className={({ isActive }) => isActive ? "active" : ""}>
            <FaClipboardList />  Categories
          </NavLink>
          <NavLink to="/dashboard/products" className={({ isActive }) => isActive ? "active" : ""}>
            <FaBox /> Products
          </NavLink>
        </nav>
        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt /> Log Out
        </button>
      </aside>
      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
