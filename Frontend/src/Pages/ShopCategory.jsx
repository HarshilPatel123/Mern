import { useContext } from 'react'
import './Css/ShopCategory.css'
import { ShopContext } from '../Context/ShopContext'

import Item from '../Components/Item/item'

const ShopCategory = (props) => {

  const {all_product} = useContext(ShopContext)
  return (
    console.log(all_product),
    <div className="shop-category">
      
       <img className="shopcategory-banner" src={props.banner} alt='' />
       <div className='shopcategory-indexSort'>
        <p>
          <span style={{fontSize: "22px", fontWeight:"600"}}> Related Products Out of {all_product.length}: </span> 
        </p>
        {/* <div className='shopcategory-sort'>
          Sort by <img src={dropdown_icon} alt=''/>
        </div> */}
       </div>

       <div className='shopcategory-products'>
        {all_product.map((item, i) => {
         
          if(props.category === item.category){
            return <Item key={i} 
            id={item.id} 
            name={item.name} 
            image={item.image}  
            new_price= {item.new_price}
            old_price={item.old_price}
       />
          }
          else{
            return null
          }

        })}
       </div>
       <div className='shopcategory-loadmore'>
        Explore More...
       </div>
    </div>
  )
}

export default ShopCategory
