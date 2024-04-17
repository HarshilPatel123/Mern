
import './NavBar.css'
import { Link, useNavigate } from "react-router-dom"

import logo from '../Components/assets/Assets/logo.png'
import shop from '../Components/assets/Assets/shop.png'
import { useContext, useState } from "react"
import { ShopContext } from '../Context/ShopContext'
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export const NavBar = () => {


  const router = useNavigate()


  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenu("")
    setAnchorEl(null);
  };
  const handleMenuItemClick = (path) => {

    if(path == "/") {
      setMenu("Home")
      localStorage.removeItem('auth-token')
      setCartItem(getDefaultCart())

    }else{
    setMenu("")
    }
    router(path);
    handleMenuClose();
  };
    
 // Create a ref for the shop section

 

  const { getTotalCartItems, getDefaultCart, setCartItem } = useContext(ShopContext)
  const [menu, setMenu] = useState("Home");

  return (
    <>

      <div className="navbar">
        <div className="nav-logo">
          <img src={logo} alt="" />
          <p> MERN-COMMERCE </p>
        </div>

        <ul className="nav-menu">
          <li onClick={() => { setMenu("Home") }}> <Link style={{ textDecoration: "none" }} to="/"> HOME </Link> {menu === "Home" ? <hr /> : <></>} </li>
          <li onClick={() => { setMenu("mens") }}> <Link style={{ textDecoration: "none" }} to="/mens"> MENS </Link> {menu === "mens" ? <hr /> : <></>} </li>
          <li onClick={() => { setMenu("womens") }}> <Link style={{ textDecoration: "none" }} to="/womens"> WOMENS </Link> {menu === "womens" ? <hr /> : <></>}</li>
          <li onClick={() => { setMenu("kids") }}> <Link style={{ textDecoration: "none" }} to="/kids"> KIDS </Link> {menu === "kids" ? <hr /> : <></>} </li>


        </ul>

        <div className='combine'>

        <div className="nav-login-cart">
          <Link onClick={() => setMenu("")} to="/cart"> <img  src={shop} alt="" />  </Link>
          <div className="nav-cart-count">
            {getTotalCartItems()}
          </div>
        </div>

       <div className='div1'>
        <button onClick={handleMenuClick}>
          <img
            src="https://cdn-icons-png.flaticon.com/128/1144/1144811.png"
            alt=""
            className="custom-image"
          />
        </button>
        </div>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
        {localStorage.getItem('auth-token') ?  
          <MenuItem className='menu' onClick={() => handleMenuItemClick("/")}>
          Sign Out
         </MenuItem>
          : 
          <MenuItem className='menu' onClick={() => handleMenuItemClick("/login")}>
            Sign in
          </MenuItem>
          }
        </Menu>
        </div>

         {/* {localStorage.getItem('auth-token') ? <button onClick={()=> {localStorage.removeItem('auth-token'); window.location.replace('/')}}>Logout</button>:
             <Link onClick={()=> setMenu("")} to="/login"><button> Login </button></Link>}
       */}

      </div>

    </>
  )
}

export default NavBar
