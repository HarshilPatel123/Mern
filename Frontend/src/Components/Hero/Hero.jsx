import './Hero.css'
import hand_icon from '../assets/Assets/hand_icon.png'
import arrow_icon from '../assets/Assets/arrow.png';
import hero3 from '../assets/Assets/hero3.png'




const Hero = () => {
  return (
    <div>
      <div className='hero'>
        <div className='hero-left'>
           <div className='ppp'>
            <div className='hero-hand-icon'>
               <p className='p'> DRESS TO IMPRESS: </p>
               
            </div>
            <p> FIND YOUR SIGNATURE</p>
            <p> LOOK HERE!!! </p>
           </div>

           <div className='hero-latest-btn'>
            <div> Latest Collection </div>
            <img src={arrow_icon} alt=''/>
           </div>
        </div>
        <div className="combine">
        {/* <div className='hero-leftnew'>
          <img src={hero} alt=''
          width={600} height={500}/>

        </div> */}
        <div className='hero-right'>
          <img src={hero3} alt=''/>

        </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
