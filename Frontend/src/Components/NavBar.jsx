
import './NavBar.css'
import { Link } from "react-router-dom"

import logo from '../Components/assets/Assets/logo.png'
import cart_icon from '../Components/assets/Assets/cart_icon.png'
import { useContext, useState } from "react"
import { ShopContext } from '../Context/ShopContext'


export const NavBar = (props) => {

        const {getTotalCartItems} = useContext(ShopContext)
        const [menu, setMenu] = useState("shop");
         
    return (
        <>
          
                <div className="navbar">
                    <div className="nav-logo">
                       <img src={logo} alt=""/>
                       <p> NEXT-COMMERCE </p>
                    </div>

                        <ul className="nav-menu">
                            <li onClick={()=> {setMenu("shop")}}> <Link style={{textDecoration: "none"}} to="/"> Shop </Link> {menu === "shop" ? <hr/> : <></>} </li>
                            <li onClick={()=> {setMenu("mens")}}> <Link style={{textDecoration: "none"}} to="/mens"> Mens </Link> {menu === "mens" ? <hr/> : <></>} </li>
                            <li onClick={()=> {setMenu("womens")}}> <Link style={{textDecoration: "none"}} to="/womens"> Womens </Link> {menu === "womens" ? <hr/> : <></>}</li>
                            <li onClick={()=> {setMenu("kids")}}> <Link  style={{textDecoration: "none"}} to="/kids"> Kids </Link> {menu === "kids" ? <hr/> : <></>} </li>
                          
                           
                        </ul>
                        <div className="nav-login-cart">
                            {localStorage.getItem('auth-token') ? <button onClick={()=> {localStorage.removeItem('auth-token'); window.location.replace('/')}}>Logout</button>:
                             <Link to="/login"><button> Login </button></Link>}
                            
                             <Link to="/cart"> <img src={cart_icon} alt=""/>  </Link>
                            <div className="nav-cart-count">
                               {getTotalCartItems()}
                            </div>
                        </div>
                    
                </div>
          
       </>
    )
}

export default NavBar
