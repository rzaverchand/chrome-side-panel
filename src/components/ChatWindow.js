import React, { useState,useEffect } from 'react';
import './ChatWindow.css'; 
import { getAIMessage } from '../api/api';

function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {

    //New: Listen for messages from content script
    const handleMessage = (event) => {
      if (event.data.type && event.data.type === "FROM_CONTENT_SCRIPT") {
        setHtmlContent(event.data.text);
      }
    };
    console.log(htmlContent)
    window.addEventListener("message", handleMessage);
    // Listen for messages and get a response
    console.log(messages)
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.type === "user") {
      getAIMessage(lastMessage.text + " Answer the best you can using only this information: " + htmlContent).then((response) => {
        setMessages([...messages, { type: "bot", text: response }]);
      });
    }
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [messages, htmlContent]);

  const handleSend = () => {
    if (input.trim() !== "") {
      setMessages([...messages, { type: "user", text: input }]);
      setInput("");
      // Integrate AI-based responses.
    }
  };

  return (
    <div className="chat-window">
        <div className="messages-container">
            {messages.map(message => (
                <div key={message.id} className={`message ${message.type === 'user' ? 'user-message' : 'ai-message'}`}>
                    {message.text}
                </div>
            ))}
        </div>
        <div className="input-area">
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) { 
                    handleSend();
                    e.preventDefault(); 
                }
                }}
            />
            <button onClick={handleSend}>Send</button>
        </div>
    </div>
  );
}

export default ChatWindow;