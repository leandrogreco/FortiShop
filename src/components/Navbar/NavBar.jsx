import CartWidget from "../CartWidget/CartWidget"
import '../Navbar/NavBar.css'
import { NavLink, Link } from "react-router-dom";
import logo from "../../img/Brand.png"
const NavBar = () => {

  return (
    <>
      <header className='logo'>
        <nav className="nav-bar">
          <Link to={"/"}>
            <img href="" src={logo} className="logo-medidas" alt="" />
          </Link>
          <ul className="nav-item">
            <li>
              <NavLink className='navLinks' to={`/categoria/fortigate`}>Fortigate</NavLink>
            </li>
            <li>
              <NavLink className='navLinks' to={`/categoria/fortiswitch`}>FortiSwitch</NavLink>
            </li>
            <li>
              <NavLink className='navLinks' to={`/categoria/fortiap`} >FortiAP</NavLink>
            </li>
          </ul>
          <CartWidget />
        </nav>
      </header>
    </>
  )
}

export default NavBar;