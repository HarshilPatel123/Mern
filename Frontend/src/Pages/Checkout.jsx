
import { useEffect, useState } from 'react'
import './Css/Checkout.css'
import Shop from '../Pages/Shop'
import NavBar from '../Components/NavBar'



const Checkout = (props) => {

  const [seconds, setSeconds] = useState(20)
  

  // Function to decrement seconds by 1
  const decrementSeconds = () => {
    setSeconds(prevSeconds => prevSeconds - 1);
  };

  // Start the timer when component mounts
  useEffect(() => {
    const interval = setInterval(decrementSeconds, 1000);
    return () => clearInterval(interval); // Cleanup function to clear interval
  }, []); // Empty dependency array ensures ef




  return (
    <>
    { seconds > 0 ?
      <div className="main">
        <h1 className="outer"> Thank you for your Order !! </h1>
        <div className="inner"> Your order will reach to your door step within 2 days !!</div>
        <p>Redirecting to home page in {seconds} seconds...</p>  </div> :
        <>
        <Shop ></Shop> 
        </>} 
       
       </>
  )
      }

export default Checkout
