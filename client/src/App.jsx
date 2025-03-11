import React from 'react'
import { useState, useEffect } from 'react';
import io from "socket.io-client";

const socket = io('http://localhost:5000');

const App = () => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message])
    });

    return () => {
      socket.off('message')
    }
  }, [messages])

  const sendMessage = () => {
    if (messageInput.trim() !== "") {
      socket.emit('message', messageInput);
      setMessageInput("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-red-600 p-4">
          <h1 className="text-2xl font-bold text-white">Simple Chat App</h1>
        </div>

        {/* Messages Container */}
        <section className="h-96 overflow-y-auto p-4 space-y-3 bg-gray-50">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className="bg-white p-3 rounded-lg shadow-sm border border-gray-200"
            >
              <p className="text-gray-800 break-words">{message}</p>
            </div>
          ))}
        </section>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex space-x-2">
            <input
              type="text"
              value={messageInput}
              placeholder="Type your message..."
              onChange={(e) => setMessageInput(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App