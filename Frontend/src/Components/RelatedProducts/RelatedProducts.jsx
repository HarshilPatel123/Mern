import './RelatedProducts.css'

import { useEffect, useState } from 'react'
import Item from '../Item/item'
// import {ShopContext}  from '../../Context/ShopContext'

const RelatedProducts = (props) => {

  const [product, setProduct] = useState([])
  // const [all_product] = useContext(ShopContext)
  // const {all_products} = useContext(ShopContext)



  useEffect(()=> {
    fetch("http://localhost:5000/relatedCollection")
    .then((res)=> res.json())
    .then((data)=> setProduct(data))
}, [])

  return (
    <div className='relatedproducts'>
      <h1> Related Products </h1>
  
      <hr/> 
      <div className="relatedproducts-item">
       
        {product.map((item, i) => {
          // console.log(product);
          //     console.log(props.category);
          //     console.log(item.category);
          if(item.category === props.category){
            if(item.id !== props.id){
            return (
                <Item key={i} 
                         id={item.id} 
                         name={item.name} 
                         image={item.image}  
                         new_price= {item.new_price}
                         old_price={item.old_price}
                    />
            )}
 } 
 })}
        </div>     
    </div>
  )
}

export default RelatedProducts
