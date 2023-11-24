import React from 'react';
import { useRef, useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import AuthContext from '../../Authentication/context/AuthProvider';
import * as utils from "../../utils/utils"

const TopBar = () => {
    const { auth, setAuth } = useContext(AuthContext);
    const history = useHistory();
    console.log("auth: ",auth);
    console.log("auth user: ", auth.user)
    console.log( utils.isObjectEmpty(auth));
    const textStyle = {margin: "0 5px", height: "45px", justifyContent: "center", textAlign: "center"};
    const logoutHandler = () =>{
        setAuth({});
        history.push("/login");
    }
  return (
    !utils.isObjectEmpty(auth)?(
    <div style = {{display: "flex", alignItems: "center", justifyContent: "flex-end", marginRight: "1%", backgroundColor:"black"}}>
      <div style = {textStyle}>Welcome {auth.user}!</div>
      <div style = {{height: "5px", borderLeft: "1px solid #000", margin:"0 5px"}}></div>
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