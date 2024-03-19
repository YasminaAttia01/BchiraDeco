// import logo from "../../assets/logo.png"
import "./navbar.scss";
function Navbar({ open, setOpen }) {

  return (
    <div className="navbar-container">
    
      {/* <img src={logo} alt="logo" /> */}
      <h2>logo</h2>
      <nav onClick={() => setOpen(!open)}>
        <div className={open ? "hamburger-menu open" : "hamburger-menu"}>
          <div className={open ? "bar open" : "bar"}></div>
        </div>
        <ul className={open ? "ulopen" : "ulclosed"}>
          <li>&nbsp; Home &nbsp;</li>
          <li>&nbsp;About&nbsp;</li>
          <li>&nbsp;Contact&nbsp;</li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
