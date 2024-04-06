
import { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'


import './Css/Cart.css'
import { Link } from 'react-router-dom'
// import Checkout from './Checkout'

const Cart = () => {
     
    const { all_product, cartItem,  getTotalCartItems, getTotalCartAmount, removeFromCart } = useContext(ShopContext)
   
    console.log("Type of all_product:", typeof all_product);
    console.log("Content of all_product:", all_product);
//  const payment = async() => {
  
//       // eslint-disable-next-line no-undef
    

//       const stripe = await loadStripe("pk_test_51OixYeSJSxoo0pOpm49lPxt9RYZ7q4NP3Pf8OV6LtnBZlOfbX8LE8di7tJtEz8QteVBHXfNp8wvirQtd0FfZfam500PylHPWE1")
//       const body = {
//         Item: cartItem,
//         all: all_product,
//         Products: getTotalCartItems(),
//         Total_Payable: getTotalCartAmount()
//     }
//     const headers = {
//       "Content-type": "application/json"
//     }
//     const response = await fetch("https://mern-5-nqn4.onrender.com/create-checkout-session",{
//       method: 'POST',
//       headers: headers,
//       body: JSON.stringify(body)
//     });
      
//     const session = await response.json();

//     const result = stripe.redirectToCheckout({
//       sessionId: session.id
//     });

//     if(result.error){
//       console.log(result.error);
//     }

//   }


    return (
        <div className='cartitems'>
            <div className='cartitems-format-main'>
                <p> Products </p>
                <p> Title </p>
                <p> Price </p>
                <p> Quantity </p>
                <p> Total </p>
                <p className='remove'> Remove </p>
            </div>
            <hr />
            {all_product.map((e) => {
                if (cartItem[e.id] > 0) {
                    return (<>
                             <div> 
                                <div className='cartitems-format cartitems-format-main'>
                                  <img src={e.image} alt='' className='carticon-product-icon' />
                                  <p> {e.name}</p>
                                  <p> ${e.new_price}</p>
                                 <button className='cartitems-quantity'> {cartItem[e.id]}</button>
                                 <p> ${e.new_price * cartItem[e.id]}</p>
                                  <button className='remove-btn' onClick={() => {removeFromCart(e.id) }} > Remove </button>
                               </div> 
                               <hr/>
                             </div>
                           </>)
                }
                return null;
            })}

            <div className='cartitems-down'>
              <div className="cartitems-total">
                <h1> Cart Total </h1>
                <div>
                  <div className="cartitems-total-item">
                    
                    <p> SubTotal </p>
                    <p> {getTotalCartAmount()}</p>
                  </div>
                  <hr/>
                  <div className="cartitems-total-item">
                    <p> Shipping fee: </p>
                    <p> Free </p>
                  </div>
                  <hr/>
                  <div className="cartitems-total-item">
                    <h3> Total </h3>
                    <h3> {getTotalCartAmount()}</h3>
                  </div>
                </div>
                <button> {getTotalCartItems() > 0? <Link to={"/checkout"} >  <p > PROCEED TO CHECKOUT </p></Link> : <p> PROCEED TO CHECKOUT</p>} </button>
                {/* <button onClick={() => payment()}>   PROCEED TO CHECKOUT </button> */}
              </div>
              <div className='cartitems-promocode'>
                <p> If you have a Promo Code, Enter it here </p>
                <div className="cartitems-promobox">
                  <input type='text' placeholder='Promo Code'/>
                  <button> Submit </button>
                </div>
              </div>
            </div>

        </div>

    )
}


    
 
export default Cart

