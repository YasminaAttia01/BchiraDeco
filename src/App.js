import { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Header from "./components/header/Header";
import APropos from "./components/aPropos/APropos";
import Achteurs from "./components/achteurs/Achteurs";
import Vendeurs from "./components/vendeurs/Vendeurs";
import Consultez from "./components/consultez/Consultez";
import Loader from "./components/loader/Loader";
import { AnimatePresence } from "framer-motion";

function App() {
  const [openNavbar, setOpenNavbar] = useState(false);
  const [loading, setLoading] = useState(true)

  return (
    <div className="App">
      {/* <Loader/> */}
      <AnimatePresence>
      {loading ? <Loader setLoading={setLoading} /> :<><Navbar open={openNavbar} setOpen={setOpenNavbar} />
      <Header />

      <APropos />
      <Achteurs/>
      <Vendeurs/>
      <Consultez/></>}
      </AnimatePresence>
    </div>
  ); 
}

export default App;
