import { useState,useEffect } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(()=>{

    const auth=localStorage.getItem('user');
    if(auth)
    {
      navigate('/')
    }
  })
  const lhandle = async () => {
    let result = await fetch('http://localhost:5000/login',{
        method:'post',
        body: JSON.stringify({email,password}),
        headers:{'Content-Type':'application/json'}
        
        
    });
     result = await result.json();
    //  console.log(result);
     if(result.auth){
        localStorage.setItem("user",JSON.stringify(result.user));
        localStorage.setItem("token",JSON.stringify(result.auth));
        navigate('/')
     }
else {
    console.log("n0 result found")
}
}

  return (<div>
    <h1>Login</h1>
   
    <input
      className="inputBox"
      type="text"
      placeholder="enter your email "
         value={email}
     onChange={(e) => setEmail(e.target.value)}
    />
    <input
      className="inputBox"
      type="password"
      placeholder="enter your password "
      value={password}
       onChange={(e) => setPassword(e.target.value)}
    />
    <button className="btn-reg" 
      onClick={lhandle}
    >
      Sign In
    </button>
  </div>)
};

export default Login;
