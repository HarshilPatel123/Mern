import './ProductDisplay.css'

import star_icon from '../assets/Assets/star_dull_icon.png';
import star_dull_icon from '../assets/Assets/star_dull_icon.png'
import Popup from '../../Context/Popup';
import { useContext } from 'react';
import { ShopContext } from '../../Context/ShopContext';


const ProductDisplay = (props) => {
const {product} = props
const {addToCart, showPopup, popupMessage, handleClosePopup} = useContext(ShopContext)



  return (
    <div className='productdisplay'>
      <div className='productdisplay-left'>
      
        <div className='productdisplay-img-list'>
            <img src={product.image} alt=''/>
            <img src={product.image} alt=''/>
            <img src={product.image} alt=''/>
            <img src={product.image} alt=''/>
        </div>

        <div className='productdisplay-img'>
            <img className='productdisplay-main-img' src={product.image}  alt=''/>
        </div>
      </div>
      {showPopup && <Popup message={popupMessage} onClose={handleClosePopup} />}
      <div className='productdisplay-right'>
        <h1> {product.name} </h1>
        <div className="productdisplay-right-stars">
            <img src={star_icon} alt=''/>
            <img src={star_icon} alt=''/>
            <img src={star_icon} alt=''/>
            <img src={star_icon} alt=''/>
            <img src={star_dull_icon} alt=''/>
            <p> (122) </p>
        </div>
        <div className='productdisplay-right-prices'>
            <div className='productdisplay-right-prices-old'>
                ${product.old_price}
            </div>
            <div className="productdisplay-right-price-new">${product.new_price}</div>
        </div>
        <div className="productdisplay-right-description">
         This jacket typically has sleeves and fastens in the front or slightly on the side. A jacket is generally lighter, tighter-fitting, and less insulating than a coat, which is outerwear. Some jackets are fashionable, while others serve as protective clothing. Jackets without sleeves are vests.
        </div>
        <div className='productdisplay-right-size'>
            <h1> Select Size </h1>
            <div className="productdisplay-right-sizes">
                <div> S </div>
                <div> M </div>
                <div> L </div>
                <div> XL </div>
                <div> XXL </div>
            </div>

            <button onClick={()=> {addToCart(product.id) }}> ADD TO CART </button>
            <p className='productdisplay-right-category'> <span> Category: </span>
            Women, T-Shirt, Crop Top </p>
            <p className='productdisplay-right-category'> <span> Tags : </span>
            Modern, Latest </p>
        </div>

      </div>
    </div>
  )
}

export default ProductDisplay
