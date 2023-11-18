import React from "react";
import welcome from "./images/welcome.jpg";
import TopBar from "./DashBoard/Components/TopBar";

const Home = ()=>{
    return (
        <div style ={{height: "93vh"}}>
        <TopBar/>
        <div style={{background: `url(${welcome}) no-repeat center center fixed`, backgroundSize: "cover", height: "100%", overflow: "hidden"}}></div>
        {/* <img style={{width: "100%", height: "100%", objectFit: "cover"}} src={welcome}></img> */}
        </div>
    )
}

export default Home