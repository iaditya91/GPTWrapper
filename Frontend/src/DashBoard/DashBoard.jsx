import React from "react";
import { useRef, useState, useEffect, useContext } from "react";
import Bubble from "./Components/Bubble";
import logo192 from "../images/logo192.png";

const DashBoard = () => {
  // const [bubbles, setBubbles] = useState(Array.from({ length: 6 }, (_, index) => index + 1));
  const bubbles = [
    ["Generate Question Paper", "/generateQuestionPaper", logo192],
    ["Generate Quiz", "/page2", logo192],
    ["Summery", "/page3", logo192],
    ["Answers", "/page4", logo192],
    ["Facts", "/page5", logo192],
    ["Talk With Book", "/page6", logo192],
  ];

  return (
    <div
      style={{
        display: "grid",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "60vh",
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
      <div style={{ display: 'flex', gap: '140px', justifyContent: 'center'}}>
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
  );
};

export default DashBoard;