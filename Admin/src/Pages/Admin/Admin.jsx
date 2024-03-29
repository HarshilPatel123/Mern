import AddProduct from '../../Components/AddProduct/AddProduct'
import SideBar from '../../Components/SideBar/SideBar'
import './Admin.css'
import ListProduct from '../../Components/ListProduct/ListProduct'
import { Route, Routes } from 'react-router-dom'

const Admin = () => {
  return (
    <div className='admin'>
       <SideBar/>
       
       <Routes>
        <Route path='/addproduct' element={<AddProduct/>} />
        <Route path='/listproduct' element={<ListProduct/>} />
       </Routes>
    </div>
  )
}

export default Admin
