import React from 'react';
import { useRef, useState, useEffect, useContext } from 'react';
import Bubble from './Components/Bubble';

const DashBoard = () => {
    // const [bubbles, setBubbles] = useState(Array.from({ length: 6 }, (_, index) => index + 1));
 const bubbles = [['Generate Question Paper', '/generateQuestionPaper'], ['Page2', '/page2'], ['Page3', '/page3'], ['Page4', '/page4'], ['Page5', '/page5'], ['Page6', '/page6']]; // Assuming you have 6 bubbles
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <div style={{ display: 'flex', gap: '40px' }}>
        {bubbles.slice(0, 4).map((bubble, index) => (
          <Bubble key={index} text={`${bubble[0]}`} to={`${bubble[1]}`} />
        ))}
      </div>
     {/* <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        {bubbles.slice(4).map((bubble, index) => (
          <Bubble key={index + 4} text={`Bubble ${bubble}`} />
        ))} 
      </div> */}
    </div>
  );
};

export default DashBoard;