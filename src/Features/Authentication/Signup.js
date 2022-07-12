import { Link, useNavigate } from "react-router-dom";
import React,  {useState } from "react";
import"./auth.css" ;
import axios from "axios";

export default function Signup() {
  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
   
  };

  const [user, setUser] = useState(initialState);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { value, name } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const signupHandler = async (user) => {
    try {
      const response = await axios.post("/api/auth/signup", user);
      if (response.status === 201) {
        setUser(initialState);
        navigate("/");
        localStorage.setItem("Token", response.data.encodedToken);
      }
    } catch (error) {
      setError("Something is very wrong");
      console.log(error);
    }
  };
 

  const submit = (e) => {
    e.preventDefault();
   signupHandler(user);
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
                      value={user.email}
                       onChange ={inputHandler}
                       />
                   <input type ="password"
                       className = "form-signup-input"
                       name="password"
                       id="password"
                       placeholder="password"
                       value={user.password}
                       onChange ={inputHandler}
                       />
                    <p >{error}</p>
                       <Link to = "/login" className= "form-login-link">Already a Member? </Link>
                   <input type = "submit"   className= "form-signup-btn signup" value="Register"/>
               </form>
           </div>
       </div>
   </div>
          
    
        
  );
}