//Gives functional component state
import React, {useEffect, useState} from 'react';
import './App.css'
import {convertMessageFormat} from './utils/convertMessageFormat';
import {makeApiRequest} from './api/makeApiRequest';
//Imports chat component styling
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
//Imports chat components
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import htmlIcon from './assets/images/fontawesome-free-6.4.2-web/svgs/brands/html5.svg'; 
import cssIcon from './assets/images/fontawesome-free-6.4.2-web/svgs/brands/css3-alt.svg'; 
import javascriptIcon from './assets/images/fontawesome-free-6.4.2-web/svgs/brands/js.svg'; 
import reactIcon from './assets/images/fontawesome-free-6.4.2-web/svgs/brands/react.svg'; 
import angularIcon from './assets/images/fontawesome-free-6.4.2-web/svgs/brands/angular.svg'; 
import vueIcon from './assets/images/fontawesome-free-6.4.2-web/svgs/brands/vuejs.svg'; 

function App() {
  
  //State that stores all chat messages 
  const [messages, setMessages] = useState([
    {
      message: "Hello, click on one of the above icons to get a question!",
      sentTime: "just now",
      sender: "ChatGPT"
    }
  ]);

  //State to track if ChatGPT is typing - default is false
  const [isTyping, setIsTyping] = useState(false);

  //Click handler for icons - Send message to ChatGPT depending on icon clicked
  const handleClick = async(languageType) =>{
    //Creates a blank string mesage
    let message = '';

    //Switch statement that identifies which topic the user has clicked on and executes the handleSend() function to send a message to ChatGPT
    switch (languageType) {
      case 'html':
        message = 'Ask me a question on HTML.'
        handleSend(message);
        break;
      case 'css':
        message = 'Ask me a question on CSS.'
        handleSend(message);
        break;
      case 'javascript':
        message = 'Ask me a question on JavaScript.'
        handleSend(message);
        break;
      case 'react':
        message = 'Ask me a question on React.'
        handleSend(message);
        break;
      case 'angular':
        message = 'Ask me a question on Angular.'
        handleSend(message);
        break;
      case 'vue':
        message = 'Ask me a question on Vue.'
        handleSend(message);
        break;
      default:
        break;
    }
  }

  //Handles send events (when user sends a message to ChatGPT)
  const handleSend = async (message) => {
    if(isTyping === true){
      alert("Please wait for ChatGPT to respond.");
      return;
    }else{
    //Creates a message object - message object consists of message + direction + user
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user"
    };

    //Creates a new array of messages (adds a new message to the current array of messages)
    const newMessages = [...messages, newMessage];

    //Updates the 'messages' state with the up to date array of messages (messages that are displayed on screen)
    setMessages(newMessages);

    //Sets ChatGPT is typing state to 'true' (is typing) - use to conditionally render a ChatGPT is typing icon & text
    setIsTyping(true);

    //Executes the send message to ChatGPT function - passes in an array of all messages (includes most recent message & the sender "user" or "ChatGPT")
    await processMessageToChatGPT(newMessages);
    };
    
  };

  //Function that sends a message to ChatGPT - recieves an array of all messages from the chat, passed in via the handleSend event handler
  async function processMessageToChatGPT(newMessages) { 
    //Converts the messages array into the format required by the ChatGPT API - creates a new array of messages in a format required by ChatGPT
    let apiMessages = convertMessageFormat(newMessages);

    //Makes a request to the ChatGPT API (sends a message to ChatGPT)
    let responseFromChatGPT = await makeApiRequest(apiMessages);

    //Adds the response to the array of chat messages
    setMessages(
      //Current array of messages ...chatMessages , new message from ChatGPT, "ChatGPT" is case sensitive
      [...newMessages, {message: responseFromChatGPT, sender: "ChatGPT"}]
    );

    //Turns off the ChatGPT typing icon as ChatGPT has responded
    setIsTyping(false);
  }

  return (
    <div>
      <div className='icon-row-container'>
        <div className="icon-row">
          <a onClick={() => {handleClick('html')}}>
              <img id={"html-logo"} className={"icon-style"} src={htmlIcon} alt="HTML logo" />
          </a>
          <a onClick={() => {handleClick('css')}}>
            <img id={"css-logo"} className={"icon-style"} src={cssIcon} alt="CSS logo" />
          </a>
          <a onClick={() => {handleClick('javascript')}}>
            <img id={"js-logo"} className={"icon-style"} src={javascriptIcon} alt="JavaScript logo" />
          </a>
          <a onClick={() => {handleClick('react')}}>
            <img id={"react-logo"} className={"icon-style"} src={reactIcon} alt="React logo" />
          </a>
          <a onClick={() => {handleClick('angular')}}>
            <img id={"angular-logo"} className={"icon-style"} src={angularIcon} alt="Angular logo" />
          </a>
          <a onClick={() => {handleClick('vue')}}>
            <img id={"vue-logo"} className={"icon-style"} src={vueIcon} alt="Vue logo" />
          </a>
        </div>
      </div>
      {/*Container*/}
      <div className="chat-container">
        {/*Wraps all components*/}
        <MainContainer className="main-container">
          {/*Contains chat logic*/}
          <ChatContainer>
            {/*Shows all different messages we have. Shows a typing indicator if ChatGPT is typing.*/}
            <MessageList 
              scrollBehavior="smooth" 
              typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is typing" /> : null}
            >
              {/*Maps over the messages array and renders a <Message /> component for each message, model={message} current message in array*/}
              {messages.map((message, i) => {
                return <Message key={i} model={message} />
              })}
            </MessageList>
            {/*Allows user to input text & send messages onSend*/}
            <MessageInput attachButton={false} placeholder="Type message here" onSend={handleSend} />        
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  )
}

export default App
