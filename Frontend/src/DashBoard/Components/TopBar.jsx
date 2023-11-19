import React from 'react';
import { useRef, useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import AuthContext from '../../Authentication/context/AuthProvider';
import * as utils from "../../utils/utils"

const TopBar = () => {
    const { auth, setAuth } = useContext(AuthContext);
    const history = useHistory();
    console.log("auth: ",auth);
    const onLogout = true;
    const textStyle = {margin: "0 10px"};
    const logoutHandler = () =>{
        setAuth({});
        history.push("/login");
    }
  return (
    utils.isObjectNotEmpty(auth)?(
    <div style = {{position: "fixed",display: "flex", alignItems: "center", justifyContent: "flex-end", marginRight: "1%", backgroundColor:"black"}}>
      <div style = {textStyle}>Welcome {auth.user}!</div>
      <div style = {{height: "10px", borderLeft: "1px solid #000", margin:"0 10px"}}></div>
      <button style = {textStyle} onClick={logoutHandler} className="logout-button">Logout</button>
    </div>
    ):
    (
      <div style = {{display: "flex", alignItems: "center", justifyContent: "right", marginRight: "1%", backgroundColor:"black"}}>
      <button style = {textStyle} onClick={()=> history.push("/login")}>SignIn</button>
      <button style = {textStyle} onClick={()=> history.push("/signup")}>SignUp</button>

    </div>
    )
  );
};

export default TopBar;