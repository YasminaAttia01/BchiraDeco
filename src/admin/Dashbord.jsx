import "./admin.scss"
import Aside from "./parts/Aside"
import Navbar from './parts/Navbar'

function Dashbord() {
  return (
    <div className="dashbord-container">
        <Aside/>
        <div className="dashbord">
      <Navbar/>
      </div>
    </div>
  )
}

export default Dashbord
