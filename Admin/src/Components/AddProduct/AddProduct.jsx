import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'
import { useState } from 'react'
const AddProduct = () => {
 
 const [image, setImage] = useState(false);
 const [product, setProduct] = useState({
          name: "",
          image: "",
          category: "Women",
          new_price: "",
          old_price: "",
 })

 const imageHandler = (e) => {
      setImage(e.target.files[0])
 }


 const changeHandler = (e) => {
     setProduct({...product, [e.target.name]:e.target.value})
 }


 // Adding Product To Database From Admin Panel

 const Add = async () => {
  // Assuming `product` is defined outside the function
  console.log(product); // You can log the outer `product` here if it's defined

  let response;
  let formData = new FormData();
  formData.append('product', image);

  try {
      const res = await fetch('http://localhost:5000/Upload', {
          method: 'POST',
          headers: {
              Accept: 'application/json',
          },
          body: formData,
      });
      
      response = await res.json();
      console.log(response); // Log the response to see its content

      if (response.success) {
          product.image = response.image_url; 
          console.log(product); // Log the updated `product` after adding the image
          await fetch('http://localhost:5000/addproduct',{
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-type': 'application/json',
            },
            body:JSON.stringify(product)
          }).then((res) => res.json()).then((data)=> {
            data.success? alert("Product Added"): alert("Failed")
          })
          
      }
  } catch (error) {
      console.error('Error:', error);
  }
};
 
  return (
    <div className="addproduct">
       <div className='addproduct-itemfield'>
        <p> Product Title</p>
        <input onChange={changeHandler} value={product.name} type="text" name='name' placeholder=' Type Here'/>
       </div>
       <div className='addproduct-price'>
        <div className='addproduct-itemfield'>
            <p> Price </p>
            <input onChange={changeHandler} value={product.old_price} type="text" name='old_price' placeholder='Old Price'/>
        </div>
        <div className='addproduct-itemfield'>
            <p> Offer Price </p>
            <input onChange={changeHandler} value={product.new_price} type="text" name='new_price' placeholder='New Price'/>
        </div>
       </div>
       <div className="addproduct-itemfield">
        <p> Product category </p>
        <select name='category' value={product.category}
        onChange={changeHandler}className='add-product-selector'>
          <option value="Women"> Women </option>
          <option value="Men"> Men </option>
          <option value="Kid"> Kid </option>
        </select>
       </div>
       <div className="addproduct-itemfield">
        <label htmlFor='file-input'>
           <img src={image? URL.createObjectURL(image):upload_area} className='addproduct-thumbnail-img'/>
        </label>
        <input onChange={imageHandler} type='file' name='image' id='file-input' hidden/>
       </div>
       <button onClick={Add}className='addproduct-btn'> Add Product </button>
    </div>
  )
}

export default AddProduct
