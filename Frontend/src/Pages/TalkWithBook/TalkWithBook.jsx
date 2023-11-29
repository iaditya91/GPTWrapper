import React from "react";
import { useRef, useState, useEffect } from "react";
import TopBar from "../../DashBoard/Components/TopBar";
import gptLogo from "./assets/chatgpt.svg";
import addBtn from "./assets/add-30.png";
import msgIcon from "./assets/message.svg";
import saved from "./assets/bookmark.svg";
import rocket from "./assets/rocket.svg";
import home from "./assets/home.svg";
import sendBtn from "./assets/send.svg";
import userIcon from "./assets/user-icon.png";
import gptImgLogo from "./assets/chatgptLogo.svg";
import "./TalkWithBook.css";
import sendMsgToOpenAI from "./openai";

//https://www.youtube.com/watch?v=EzkWAviyYgg&t=2858s
const TalkWithBook = () => {
  const msgEnd = useRef(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      text: "hi, I am textboot",
      isBot: true,
    },
  ]);

  useEffect(() => {
    msgEnd.current.scrollIntoView();
  }, [messages]);

  const handleSend = async () => {
    const text = input;
    setInput("");
    setMessages([...messages, { text, isBot: false }]);
    const res = await sendMsgToOpenAI(text);
    setMessages([
      ...messages,
      { text: text, isBot: false },
      { text: res, isBot: true },
    ]);
    console.log(res);
  };

  const handleEnter = async (e) => {
    if (e.key === "Enter") await handleSend();
  };

  return (
    <>
      <TopBar />
      <>
        <div className="app html">
          {/* <div style={{display:"flex", minHeight: "100vh"}}> */}
          <div className="sideBar">
            <div className="upperSide">
              <div className="upperSideTop">
                <image src={gptLogo} alt="Logo" className="logo">
                  <span className="brand">TalkWithBook</span>
                </image>
              </div>

              <button
                className="midBtn"
                onClick={() => {
                  window.location.reload();
                }}
              >
                <img src={addBtn} alt="new chat" className="addBtn" />
                New Chat
              </button>
              <div className="upperSideBottom">
                <button className="query">
                  <img src={msgIcon} alt="Query" />
                  How to chat with me ?
                </button>
                <button className="query">
                  <img src={msgIcon} alt="Query" />
                  Tips for best responses ?
                </button>
              </div>
            </div>
            <div className="lowerSide">
              <div className="listItems">
                <img src={home} alt="Home" className="listitemsImg" />
                Home
              </div>
              <div className="listItems">
                <img src={saved} alt="Saved" className="listitemsImg" />
                Saved
              </div>
              <div className="listItems">
                <img src={rocket} alt="Upgrade" className="listitemsImg" />
                Upgrade
              </div>
            </div>
          </div>
          <div className="main">
            <div className="chats">
              {messages.map((message, i) => (
                <div key={i} className={message.isBot ? "chat bot" : "chat"}>
                  <img
                    src={message.isBot ? gptImgLogo : userIcon}
                    className="chatimg"
                    alt=""
                  />
                  <p className="txt">{message.text}</p>
                </div>
              ))}
              <div ref={msgEnd} />
            </div>
            <div className="chatFooter">
              <div className="inp">
                <input
                  type="text"
                  value={input}
                  onKeyDown={handleEnter}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="send a message"
                />
                <button className="send" onClick={handleSend}>
                  <img src={sendBtn} alt="Send" />
                </button>
              </div>
              {/* <p>chatgpt may provide incorrect results</p> */}
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default TalkWithBook;
