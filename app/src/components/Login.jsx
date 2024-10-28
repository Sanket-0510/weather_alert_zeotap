import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/Login.css'

export default function Login() {
  const [email, setEmail] = useState("")
  const [password,setPassword] = useState("")
  const navigation = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await fetch(`${process.env.REACT_APP_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });
  
      if (result.ok) {
        const data = await result.json();
        console.log(data);
 
        localStorage.setItem('token', data.token); 
        navigation("/dashboard");

      } else {
        console.log('Login failed');
        alert("wrong credentials")
        setEmail("")
        setPassword("")
        
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <h3>Don't have a account 
        <a href="/register"> Register</a>
      </h3>
    </div>
  );
}

