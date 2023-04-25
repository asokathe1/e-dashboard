import React, { useState } from "react";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const collectData = () => {
    console.warn(name, email, password);
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
