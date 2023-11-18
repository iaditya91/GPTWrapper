import React from "react";
import { useRef, useState, useEffect, useContext } from "react";
import TopBar from "../DashBoard/Components/TopBar";

const OutputPage = () => {
 const [output, setOutput] = useState({header: 'Sample Output', queryList: [{que:'que 1', ans:'ans 1'}]});
 //add spinner
 //rest endpoint
 return (
    <>
    <TopBar/>
    <h1>Output Page</h1>
    <p>Output</p>
    </>
 );
}

export default OutputPage;