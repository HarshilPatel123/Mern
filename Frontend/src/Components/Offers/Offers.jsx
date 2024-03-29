import "./Offers.css"
import exclusive_img from '../assets/Assets/exclusive_image.png'
import { Link } from "react-router-dom"


const Offers = () => {
  return (
    <div className="offers">
      <div className="offers-left">
        <h1> Exclsive </h1>
        <h1> Offers Only For You</h1>
        <p> ONLY ON BEST SELLERS PRODUCTS</p>
        <button> <Link to={'/Womens'}> Check Now </Link> </button>
      </div>
      <div className="offers-right">
        <img src={exclusive_img} alt=""/>
      </div>
    </div>
  )
}

export default Offers
