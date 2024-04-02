import { useContext } from "react"
import {ShopContext} from '../Context/ShopContext'
import {useParams} from 'react-router-dom'
import BreadCrum from "../Components/BreadCrums/BreadCrum"
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay"
import Description from "../Components/DescriptionBox/Description"
// import RelatedProducts from "../Components/RelatedProducts/RelatedProducts"

const Product = () => {
const {all_product} = useContext(ShopContext)
const {productId} = useParams();
const product = all_product.find((e)=> e.id === Number(productId));
// const category= all_product.find((e)=> e.category === product.category);


  return (
    <div>
      <BreadCrum product={product}/>
      <ProductDisplay product={product}/>
      {/* <Description/> */}
    
    </div>
  )
}

export default Product
