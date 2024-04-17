import './NavBar.css'
import navlogo from '../../assets/logo.png'
import navProfile from '../../assets/nav-profile.svg'

const NavBar = () => {
  return (
    <div className='navbar'>
      <div className='final'>
      <img src={navlogo} alt="" className="nav-logo" />
      <h2> Mern-Commerce</h2>
      </div>
      <img src={navProfile} alt="" className="nav-profile" />
    </div>
  )
}

export default NavBar
