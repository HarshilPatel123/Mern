import { useState } from 'react'
import './Css/Loginsignup.css'

const LoginSignup = () => {

  const [state, setState] = useState("Login")
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: ""
  })

  
  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
};

const isContinueDisabled = () => {
  return !isChecked; // Return true if checkbox is not checked, false otherwise
}; 

  const changeHandler = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }
   const login = async () => {

           console.log("Login Function Executed!!!", formData);
           let responsed;
           await fetch("http://localhost:5000/login", {
           method: 'POST',
           headers: {
            Accept: 'application/form-data',
            'Content-type': 'application/json'
          },
          body: JSON.stringify(formData)
         }).then((res)=> res.json()).then((data)=> responsed = data);

         if(responsed.success){
          setError(false)
          localStorage.setItem('auth-token', responsed.token);
          window.location.replace("/");
         }
         else{
          setError(true)
         }

   }
   const SignUp = async () => {
         console.log("Sign up function Executed !!", formData);
         let responseData;
         await fetch("http://localhost:5000/signup", {
          method: 'POST',
          headers: {
            Accept: 'application/form-data',
            'Content-type': 'application/json'
          },
          body: JSON.stringify(formData),
         }).then((response)=> response.json()).then((data)=> responseData=data);
          console.log(responseData);
         if(responseData.success){
          setError(false)
          console.log(responseData.token);
          localStorage.setItem('auth-token', responseData.token);
          window.location.replace("/login");
         }
         else{
          setError(true)
         }
        

   }




  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
         {state === "Sign Up" ? <input value={formData.username} onChange={changeHandler} name="username" type="text"  placeholder="Your name"/> : <></>}
          <input type="email"  name="email" value={formData.email} onChange={changeHandler} placeholder="Email Address"/>
          <input type="password" name="password" value={formData.password} onChange={changeHandler} placeholder="Password"/>
        </div>
        <div className="loginsignup-agree" >
         <input type="checkbox"  checked={isChecked} onChange={toggleCheckbox}  name="c1" id='c1'/>
          <p> By continuing, I agree the terms of use & privacy policy. </p>
        </div>
        { error && state=== "Login" && <p style={{color: "red", marginTop: "6px", fontSize: "20px", marginLeft:"30px"}}> Wrong Credentials !! Please try again with different User !!</p> }
        { error && state=== "Sign Up" && <p style={{color: "red", marginTop: "6px", fontSize: "20px", marginLeft: "30px"}}> User already exists !!!</p> }
       <button onClick={()=> {state === "Login"? login() : SignUp()}}  disabled={isContinueDisabled()}> Continue </button>
        { state === "Sign Up" ? <p className='loginsignup-login'> Already have an account? <span onClick={() => {setState("Login")}}> Login here </span></p> : <></>}
        { state === "Login" ? <p className='loginsignup-login'> Create an Account <span onClick={()=> {setState("Sign Up")}}> Click here </span></p> : <></>}
       
      </div>
      
    </div>
  )
}

export default LoginSignup
