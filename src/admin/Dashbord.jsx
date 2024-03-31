import { Outlet, Route, Routes } from "react-router-dom";
import "./admin.scss";
import Aside from "./components/Aside";
import Commands from "./components/Commands";
import Navbar from "./components/Navbar";
import OrderContext from "../context/OrderContext";

function Dashbord() {
  
  return (
    <OrderContext>
    <div className="dashbord-container">
      <Aside />
      <div className="dashbord">
        <Navbar />
        <Outlet />
      </div>
    </div></OrderContext>
  );
}

export default Dashbord;
