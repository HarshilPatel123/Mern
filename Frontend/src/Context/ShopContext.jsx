
import { createContext, useEffect, useState } from "react";


export const ShopContext = createContext();


const getDefaultCart = () => {
     let cart = {};
    for (let index = 0; index < 300; index++) {
        cart[index] = 0;
    }
    return cart

}

const ShopContextProvider = (props) => {

    const[all_product, setAll_Product] = useState([])
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
   
    const [cartItem, setCartItem] = useState(getDefaultCart());

   useEffect(()=> {
          fetch('https://mern4-biw0.onrender.com/allproducts')
          .then((response)=> response.json())
          .then((data)=> setAll_Product(data))

           if(localStorage.getItem('auth-token')){
            fetch('https://mern4-biw0.onrender.com/getcart', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-type': 'application/json',
                },
                body: '',

            }).then((res)=> res.json()).then((data)=> setCartItem(data))
           }
         }, [])


     const addToCart = (itemId) => {
         
         if(localStorage.getItem('auth-token')){
             setCartItem((prev) => ({... prev, [itemId]:prev[itemId]+ 1 }))
             setPopupMessage('Item added to cart successfully!');
             setShowPopup(true);
             fetch('https://mern4-biw0.onrender.com/addtocart', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-type': 'application/json'
                },
                
                body: JSON.stringify({"itemId": itemId})
            })
            .then((res)=> res.json())
            .then((data)=> console.log(data))
        }
        else{
            
             setPopupMessage("You need to login before you purchase any Item !!!")
             setShowPopup(true);
      
            
            
            //  <Popup message="User authentication Failed !!! You need to Login to Purchase the product." onClose={onclose}/>;
        }
     }

     
  // Function to close popup
  const handleClosePopup = () => {
    setShowPopup(false);
    setPopupMessage('');
  };


    
     const removeFromCart = (itemId) => {
        setCartItem((prev) => ({... prev, [itemId]:prev[itemId]- 1}))
        if(localStorage.getItem('auth-token')){
            fetch('https://mern4-biw0.onrender.com/removefromcart', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({"itemId": itemId})
            })
            .then((res)=> res.json())
            .then((data)=> console.log(data))
        }
     }

     const getTotalCartAmount = () => {
        let total = 0;
    
        for (const itemId in cartItem) { // Using for...in loop for object keys
            const itemQuantity = cartItem[itemId]; // Getting the quantity of the current item
            if (itemQuantity > 0) { // Checking if quantity is greater than 0
                const itemInfo = all_product.find(product => product.id === Number(itemId)); // Finding product by id
                if (itemInfo) {
                    total += itemInfo.new_price * itemQuantity; // Calculating total price
                }
            }
        }

    
        return total; // Returning the total after processing all items
    }

    const getTotalCartItems = () => {
        let totalItem = 0;
        for(const item in cartItem)
        {
            if(cartItem[item] >0)
            {
                totalItem += cartItem[item]
            }
        }
        return totalItem
    }

    // const checkout = async() => {
    //     try {
    //         const res = await fetch("https://mern4-biw0.onrender.com/checkout",{
    //             method: "POST",
    //             headers: {
    //                 "content-type": "application/json",
    //             },
    //             mode: "cors",
    //             body:JSON.stringify({
    //                 items: {
    //                     quantity: getTotalCartAmount(),
    //                     totalItem: getTotalCartItems()
    //                 },
    //             })
    //         });
    //         const data = await res.json();
    //         window.location = data.url;
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }


     const contextValue = { all_product, getTotalCartAmount,getTotalCartItems, getDefaultCart, showPopup, popupMessage, handleClosePopup,cartItem, addToCart, removeFromCart};
    

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider