import './RelatedProducts.css'

import { useEffect, useState } from 'react'
import Item from '../Item/item'

const RelatedProducts = () => {

  const [product, setProduct] = useState([])


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
            return (
                <Item key={i} 
                         id={item.id} 
                         name={item.name} 
                         image={item.image}  
                         new_price= {item.new_price}
                         old_price={item.old_price}
                    />
            )
        })}
        </div>     
    </div>
  )
}

export default RelatedProducts
