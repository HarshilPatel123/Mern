import './Hero.css'
import hand_icon from '../assets/Assets/hand_icon.png'
import arrow_icon from '../assets/Assets/arrow.png';
import hero_image from '../assets/Assets/hero_image.png'
import hero from '../assets/Assets/hero2.jpg'



const Hero = () => {
  return (
    <div>
      <div className='hero'>
        <div className='hero-left'>
           <h2> NEW ARRIVALS ONLY </h2>
           <div>
            <div className='hero-hand-icon'>
               <p> new </p>
               <img src={hand_icon} alt=''/>
            </div>
            <p> Collections </p>
            <p> for everyone </p>
           </div>

           <div className='hero-latest-btn'>
            <div> Latest Collection </div>
            <img src={arrow_icon} alt=''/>
           </div>
        </div>
        <div className="combine">
        <div className='hero-leftnew'>
          <img src={hero} alt=''
          width={600} height={500}/>

        </div>
        <div className='hero-right'>
          <img src={hero_image} alt=''/>

        </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
