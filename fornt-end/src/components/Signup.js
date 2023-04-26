import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState("");
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



  const collectData = async() => {
    console.warn(name, email, password);
    let result= await fetch('http://localhost:5000/register',{

      method:'Post',
      body:JSON.stringify({name, email, password}),
      headers: {'Content-Type':'application/json'},
            
    })
    let fresult = await result.json()
    console.warn(fresult);
    localStorage.setItem("user",JSON.stringify(fresult));
    if(fresult){
      navigate('/')
    }
    
  };

  return (
    <div>
      <h1>Register</h1>
      <input
        className="inputBox"
        type="text"
        placeholder="enter your name "
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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
      <button className="btn-reg" onClick={collectData}>
        Sign In
      </button>
    </div>
  );
};

export default Signup;
