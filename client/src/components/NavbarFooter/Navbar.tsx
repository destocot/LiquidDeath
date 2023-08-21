import React, { useState } from 'react'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import axios from 'axios';
import NavSearch from './NavSearch';

function Navbar({ changeSearch }) {
  const [colorMode, setColorMode] = useState('Dark Mode');

  const changeColor = () => {
    document.body.classList.toggle('dark');
    if (colorMode === 'Dark Mode') {
      setColorMode('Light Mode');
    } else {
      setColorMode('Dark Mode');
    }
  }

  // uncomment this to have dark mode at start
  // seEffect(() => {
  //   changeColor()
  // }, [])

  // chat test
  const [chat, setChat] = useState(false);

  // English, Spanish, Japanese, French, Korean, Urdu, Chinese, Arabic, Italian
  const choices = ['Liquid Death', 'muerte liquida', '液体の死', 'Mort liquide', '액체 죽음', 'مائع موت', '液体死亡', 'الموت السائل', 'Morte liquida'];
  const title = choices[Math.floor(Math.random() * choices.length)];

  const [headerColors, setHeaderColors] = useState("black");

  return (
    <div id="nav-container" className={` border-b grid grid-cols-[repeat(6,1fr)] grid-rows-[repeat(2,1fr)] gap-x-0 gap-y-0  px-[28px] py-[12px] text-[${headerColors}] h-fit  ]`}>
      <div className="row-start-1 row-end-3 col-start-1 col-end-3">
        <h1 className="text-[36px] self-end py-1 px-2" >{title}<i className="fa-solid fa-skull hover:animate-[fa-spin_2s_infinite_linear] ml-[10px] line-through" /></h1>
      </div>
      <div className="row-start-2 row-end-3 col-start-3 col-end-5">
        <div className="flex-1 flex justify-center">
          <span className="mr-[16px]">Home</span>
          <span className="mr-[16px]">Sale</span>
          <span className="mr-[16px]">About</span>
          <button id="color-mode-btn" className="hover:underline px-[1px] mr-[16px]" onClick={() => changeColor()}>{colorMode}</button>
        </div>
      </div>
      <div className="row-start-1 row-end-2 col-start-5 col-end-7 justify-self-end">
        <div className="flex-1 flex justify-center mr-auto">
          <span id="customer-service-btn" className="cursor:pointer px-[1px] hover:underline" onClick={() => setChat(true)}><i className="fa-solid fa-headset mr-2" />Customer Sevice</span>
          <span className="ml-[15px]">Students get 20% off</span>
          <span className="ml-[16px]">Find a store</span>
        </div>
      </div>
      <div className="row-start-2 row-end-3 col-start-6 col-end-7">
        <div className="flex-1 flex justify-center ml-auto items-center" >
          <NavSearch changeSearch={changeSearch} />
          <i className="fa-regular fa-user fa-lg ml-2" />
          <i className="fa-regular fa-heart  fa-lg ml-2" />
          <i className="fa-solid fa-cart-shopping fa-lg ml-2" />
        </div>
      </div>
      {
        chat && <Chat setChat={setChat} />
      }
    </div>
  )
}

function Chat({ setChat }) {
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      message: 'Hi I\'m Liquid Death\'s helpful bot. How can I assist you?',
      sender: 'ChatGPT'
    }
  ])
  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing" // shows on right of chat
    }

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);

    setTyping(true);

    await processMessageToChatGPT(newMessages);
  }

  const processMessageToChatGPT = async (chatMessages) => {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === 'ChatGPT') {
        role = "assistant"
      } else {
        role = "user"
      }
      return { role: role, content: messageObject.message }
    });

    await axios.post('/customerservice', apiMessages)
      .then((results) => {
        setMessages([...chatMessages, {
          message: results.data.choices[0].message.content,
          sender: "ChatGPT"
        }]);
        setTyping(false);
      })
      .catch(() => console.log('error'))
  }

  return (
    <div id="main-chat-container" className="fixed bottom-0 right-10 h-[375px] w-[300px] z-[2]">
      <i
        className="fa-regular fa-circle-xmark fa-2xl cursor-pointer absolute z-[3] top-[-10px] right-[-10px] bg-white leading-5 text-[20px] hover:leading-6 hover:text-[28px] rounded-full" style={{ color: 'black' }}
        onClick={() => {
          const csMainContainer = document.querySelector(".cs-main-container");
          csMainContainer?.classList.add("fade-out");
          csMainContainer?.addEventListener("animationend", () => {
            csMainContainer?.classList.remove("fade-out");
            setChat(false)
          });
        }}
      />
      <MainContainer >
        <ChatContainer>
          <MessageList
            scrollBehavior='auto'
            typingIndicator={typing ? <TypingIndicator content="ChatGPT is typing" /> : null}
          >
            {messages.map((message, i) => {
              return <Message key={i} model={message} />
            })}
          </MessageList>
          <MessageInput placeholder="Type message here" onSend={handleSend} />
        </ChatContainer>
      </MainContainer>
    </div>
  )
}

export default Navbar