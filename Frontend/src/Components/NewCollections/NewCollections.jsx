import './NewCollections.css'

import Item from '../Item/item'
import { useEffect, useState } from 'react'

const NewCollections = () => {

  const [newCollection, setNewCollection] = useState([])


  useEffect(()=> {
       fetch("http://localhost:5000/newCollection")
       .then((res)=> res.json())
       .then((data)=> setNewCollection(data))
  }, [])

  return (
    <div className='new-collections'>
        <h1> NEW COLLECTIONS </h1>
        <hr/>
        <div className='collections'>
            {newCollection.map((item, id) => {
                return  <Item key={id} 
                id={item.id} 
                name={item.name} 
                image={item.image}  
                new_price= {item.new_price}
                old_price={item.old_price}
           />
            })}
        </div>
      
    </div>
  )
}

export default NewCollections
