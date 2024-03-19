import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Header from "./components/header/Header";
import APropos from "./components/aPropos/APropos";
import Achteurs from "./components/achteurs/Achteurs";
import Vendeurs from "./components/vendeurs/Vendeurs";

function App() {
  const [openNavbar, setOpenNavbar] = useState(false);

  return (
    <div className="App">
      <Navbar open={openNavbar} setOpen={setOpenNavbar} />
      <Header />
      <APropos />
      <Achteurs/>
      <Vendeurs/>
    </div>
  );
}

export default App;
