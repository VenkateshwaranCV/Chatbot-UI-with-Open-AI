import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import Home from './components/Home';
import Navigation from './components/Navigation';
import Activity from './pages/Activity';
import ChatHistory from './components/ChatHistory';

//const API_KEY = "sk-proj-ztrXMTn3NbSFvuPODjFlT3BlbkFJU66CSjp7kskXcqYwPdFu";
const API_KEY=process.env.REACT_APP_OPENAI_API_KEY;
function App() {
  const [messages, setMessages] = useState([
    {
      message: "Hello I am Rex",
      sentTime: "just now",
      sender: "Rex",
      direction: "incoming"
    }
  ]); 
  
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user"
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);

    setIsTyping(true);

    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "Rex") {
        role = "assistant"; 
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message }
    });

    const systemMessage = {
      role: "system",
      content: "Explain all concepts like a 10 year old."
    }

    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        systemMessage,  
        ...apiMessages 
      ]
    };

    await fetch("https://api.openai.com/v1/chat/completions ", 
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + API_KEY
      },
      body: JSON.stringify(apiRequestBody)
    }).then((data) => {
      return data.json();
    }).then((data) => {
      console.log(data);
      setMessages([...chatMessages, {
        message: data.choices[0].message.content,
        sender: "Rex",
        direction: "incoming"
      }]);
      setIsTyping(false);
    });
  }

  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={
          <div style={{ position: "relative", height: "800px", width: "700px" }}>
            <MainContainer>
              <ChatContainer>
                <MessageList
                  scrollBehavior="smooth"
                  typingIndicator={isTyping ? <TypingIndicator content="Rex is typing" /> : null}
                >
                  {messages.map((message, i) => {
                    return <Message key={i} model={message} />
                  })}
                </MessageList>
                <MessageInput placeholder='Type message here' onSend={handleSend} />
              </ChatContainer>
            </MainContainer>
          </div>
        } />
        <Route path="/history" element={<ChatHistory />} />
        <Route path="/activity" element={<Activity />} />
      </Routes>
    </div>
  );
}

export default App;
