import { useEffect, useState } from 'react'
import './ListProduct.css'

const ListProduct = () => {

  const [allProducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    await fetch('http://localhost:5000/allproducts').then((res) => res.json()).then((data) => { setAllProducts(data) })
  }


  useEffect(() => {
    fetchInfo();
  }, [])


  const remove_product = async (id) => {
    console.log("clicked");
    try {
        await fetch('http://localhost:5000/removeproduct', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ id: id})
        })
        console.log("deleted");
        await fetchInfo(); // Assuming fetchInfo is defined elsewhere
    } catch (error) {
        console.error('Error occurred during removal:', error);
    }
}



  return (
    <div className='list-product'>
      <h1> All Product List</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p className='remove'>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allProducts.map((products, index) => {
          return <><div key={index} className="listproduct-format-main listproduct-format">
            <img src={products.image} alt="" className="listproduct-product-icon" />
            <p> {products.name}</p>
            <p> ${products.old_price}</p>
            <p> ${products.new_price}</p>
            <p> {products.category}</p>
            <button onClick={remove_product} className='listproduct-remove-icon'>
              Remove
            </button>
          </div>
          <hr/>
          </>
        })}
      </div>
    </div>
  )
}

export default ListProduct
