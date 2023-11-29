import React from "react";
import { useRef, useState, useEffect, useContext } from "react";
import {
  MainContainer,
  Sidebar,
  Conversation,
  ConversationList,
  ChatContainer,
  MessageInput,
  MessageList,
  ConversationHeader,
  Message,
} from "@chatscope/chat-ui-kit-react";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import TopBar from "../../DashBoard/Components/TopBar";
import PersonIcon from "@mui/icons-material/Person";
import Avatar from "@mui/material/node/Avatar";
import logo192 from "../../images/logo192.png";
import "./Chat.css";

//https://www.youtube.com/watch?v=me-BX6FtA9o
const Chat = () => {

    const sendMessage = (message)=>{
        console.log(message);
    }
  return (
    <>
      <TopBar />
      <div className="chatPage-div">
        <MainContainer>
          <Sidebar position="left">
            <ConversationList>
              <Conversation
                name="Adi"
                lastSenderName="Mahezh"
                info="hello"
                active={true}
              >
                <Avatar src={logo192}></Avatar>
              </Conversation>
            </ConversationList>
          </Sidebar>
          <ChatContainer>
            <ConversationHeader>
              <Avatar src={logo192}></Avatar>
              <ConversationHeader.Content
                userName="Adi"
                info="last active 10 min ago"
              ></ConversationHeader.Content>
            </ConversationHeader>
            <MessageList>
                <Message model={{
                    message: 'hey mahi',
                    sender: 'Adi',
                    sentTime: '10. min ago',
                    direction: 'outgoing', //'incoming'
                    position: 'single'
                }} avatarSpacer> </Message>
                    <Message model={{
                    message: 'how is it going',
                    sender: 'Adi',
                    sentTime: '10 min ago',
                    direction: 'outgoing', //'incoming'
                    position: 'single'
                }}>  <Avatar src ={logo192}/></Message>
                    <Message model={{
                    message: 'good',
                    sender: 'Mahesh',
                    sentTime: '10 min ago',
                    direction: 'incoming', //'incoming'
                    position: 'single'
                }}> <Avatar src ={logo192}/></Message>
              <MessageInput placeholder="type your message here" onSend={sendMessage}></MessageInput>
            </MessageList>
          </ChatContainer>
        </MainContainer>
      </div>
    </>
  );
};

export default Chat;
