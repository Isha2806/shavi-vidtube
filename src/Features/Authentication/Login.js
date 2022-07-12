import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";
import axios from "axios";
import { useAuthentication } from "../../Context/Authentication/AuthContext"

export default function Login() {
  
  const initialState = {
    email: "",
    password: "",
  };
  const navigate = useNavigate();
  const [login, setLogin] = useState(initialState);
  const [error, setError] = useState("");
  const {  setIsLogin,  setUser } = useAuthentication();
  const test = {
    email: "mailme.shavi@gmail.com",
    password: "shavi",
  };
  const inputHandler = (e) => {
    const { value, name } = e.target;
    setLogin((previous) => ({ ...previous, [name]: value }));
  };
  const loginHandler = async (login) => {
    try {
      const response = await axios.post("/api/auth/login", login);
      if (response.status === 200) {
        setIsLogin(true);
        setUser(response.data.foundUser);
        localStorage.setItem("Token", response.data.encodedToken);
        setLogin(initialState);
        navigate("/");
       console.log("Success");
      }
    } catch (error) {
      setError("No user exists!");
      console.log(error);
     
    }
  };

 
  const submit = (e) => {
    e.preventDefault();
   loginHandler(login);
  };
  const testHandler = () => {
   loginHandler(test);
  };
  return (
    <div className="container">
        <div className = "signup-page">
           <div className = "signup-page-content">
               <form className = "signup-page-form" onSubmit={submit}>
                   <h2>Sign up to Vidtube!</h2>
                   <input type = "email"
                       className = "form-signup-input"
                       name="email"
                       placeholder="mailme.shavi@gmail.com"
                       id="email"
                      value={login.email}
                       onChange ={inputHandler}
                       />
                   <input type ="password"
                       className = "form-signup-input"
                       name="password"
                       id="password"
                       placeholder="password"
                       value={login.password}
                       onChange ={inputHandler}
                       />
                    <p >{error}</p>
                       <Link to = "/signup" className= "form-login-link">Already a Member? </Link>
                   <input type = "submit"  className= "form-signup-btn signup" value = "Log in"/>
                   <p className= "form-login-link" onClick={() => testHandler()}>Test Login </p>
               </form>
           </div>
       </div>
   </div>
          
         
  );
}