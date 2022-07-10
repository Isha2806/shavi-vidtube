import React from "react";
import { Routes,Route } from "react-router-dom";
import {Home,Login,Signup,mockApi} from "../Features";
export default function Router(){
    return(
        <Routes>
            <Route path = "/" element={<Home/>}/>
            <Route path = "/login" element={<Login/>}/>
            <Route path = "/signup" element={<Signup/>}/>
            <Route path = "/mockapi"element={<mockApi/>}/>
        </Routes>
    );
}