import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavBar from './Components/NavBar'
import Shop from './Pages/Shop'
import ShopCategory from './Pages/ShopCategory'
import Product from './Pages/Product'
import Footer from './Components/Footer/Footer'
import Cart from './Pages/Cart'
import Checkout from './Pages/Checkout'
import LoginSignup from './Pages/LoginSignup'
import men_banner from './Components/assets/Assets/banner_mens.png'
import women_banner from './Components/assets/Assets/banner_women.png'
import kid_banner from './Components/assets/Assets/banner_kids.png'
import Success from './Components/Success'
import Cancel from './Components/Cancel'
import Order from './Pages/Order'
// import PaymentSuccess from './Pages/PaymentSuccess'


const App = () => {
  return (
    <>
     <BrowserRouter>
     <NavBar/>
      <Routes>
        <Route path='/' element={<Shop></Shop>} />
        <Route path='/mens' element={<ShopCategory category="Men" banner = {men_banner}></ShopCategory>} />
        <Route path='/womens' element={<ShopCategory  category="Women"  banner = {women_banner}></ShopCategory>} />
        <Route path='/kids' element={<ShopCategory  category="Kid" banner={kid_banner}></ShopCategory>} />
        <Route path='/product' element={<Product></Product>} >
         <Route path=':productId' element={<Product></Product>} />
        </Route>
        <Route path='/cart' element={<Cart></Cart>} />
        <Route path='/checkout' element={<Checkout></Checkout>} />
        <Route path='/login' element={<LoginSignup></LoginSignup>} />
        <Route path='/success' element={<Success></Success>} />
        <Route path='/cancel' element={<Cancel></Cancel>} />
        <Route path='/orders' element={<Order></Order>}/>

      </Routes>
      <Footer/>
     </BrowserRouter>
    </>
  )
}

export default App
