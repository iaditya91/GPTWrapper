import React from "react";
import { useRef, useState, useEffect, useContext } from "react";
import Bubble from "./Components/Bubble";
import logo192 from "../images/logo192.png";
import AuthContext from "../Authentication/context/AuthProvider";
import TopBar from "./Components/TopBar";


const DashBoard = () => {
  const { auth } = useContext(AuthContext);
  let bubbles = []
  if(auth.role === "student"){
    bubbles = [
        ["Generate Quiz", "/generateQuizForm", logo192],
        ["FlashCards", "/page3", logo192],
        ["Find Interconnection", "/page4", logo192],
        ["Topic Exploration", "/page5", logo192],
        ["Talk With Book", "/page6", logo192],
      ]
  } else if(auth.role ==="teacher") {
    bubbles = [
      ["Generate Question Paper", "/generateQuestions", logo192],
      ["Generate Answers", "/page2", logo192],
      ["Generate Quiz", "/generateQuizForm", logo192],
      ["Generate Assignment", "/page4", logo192],
      ["Start Exam to Students", "/page5", logo192],
      ["Teaching Preperation", "/page6", logo192],
    ]
  } else if(auth === "admin"){
    bubbles = []
  } else {
    bubbles = [
      ["Generate Quiz", "/generateQuizForm", logo192],
      ["FlashCards", "/page3", logo192],
      ["Find Interconnection", "/page4", logo192],
      ["Topic Exploration", "/page5", logo192],
      ["Talk With Book", "/page6", logo192],
    ]
  }

  return (
    <>
    <TopBar/>
    <div
      style={{
        display: "grid",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
      }}
    >
      <div style={{ display: "flex", gap: "90px" }}>
        {bubbles.slice(0, 4).map((bubble, index) => (
          <Bubble
            key={index}
            text={`${bubble[0]}`}
            to={`${bubble[1]}`}
            imageSrc={`${bubble[2]}`}
          />
        ))}
      </div>
      <div style={{ display: "flex", gap: "140px", justifyContent: "center" }}>
        {bubbles.slice(4, 8).map((bubble, index) => (
          <Bubble
            key={index}
            text={`${bubble[0]}`}
            to={`${bubble[1]}`}
            imageSrc={`${bubble[2]}`}
          />
        ))}
      </div>
    </div>
    </>
  );
};

export default DashBoard;
