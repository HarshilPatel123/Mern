import './BreadCrum.css'
import arrow_icon from '../assets/Assets/breadcrum_arrow.png'


const BreadCrum = (props) => {
const {product} = props

  return (
    <div className='breadcrum'>
      <img src={arrow_icon} alt=''/> SHOP <img src={arrow_icon} alt=''/> {product.category} <img src={arrow_icon} alt=" "/> {product.name}
      
    </div>
  )
}

export default BreadCrum
