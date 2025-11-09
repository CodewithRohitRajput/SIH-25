"use client";

import { useState, useRef, useEffect } from "react";
import Header from '@/(components)/header/page'
import Footer from '@/(components)/footer/page'

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function ChatBot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sample initial bot message
  useEffect(() => {
    setMessages([{
      text: "Hello! I'm your military assistant powered by Vajra AI. How can I help you today?",
      isUser: false,
      timestamp: new Date()
    }]);
  }, []);

  // Scroll to bottom of chat
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Add user message to chat
    const userMessage: Message = {
      text: input,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    setError(null);
    setInput("");

    try {
      const res = await fetch("https://bbs11pr8-5002.inc1.devtunnels.ms/gemini/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ question: input }),
      });
      
      const data = await res.json();
      if (res.ok) {
        // Add AI response to chat
        const aiMessage: Message = {
          text: data.answer,
          isUser: false,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMessage]);
      } else {
        setError(data.message || "Failed to get answer.");
        // Add error message to chat
        const errorMessage: Message = {
          text: data.message || "Sorry, I encountered an error processing your request.",
          isUser: false,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (err) {
      setError("Failed to connect to Gemini API.");
      // Add error message to chat
      const errorMessage: Message = {
        text: "Sorry, I'm having trouble connecting to the service. Please try again later.",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    }
    setLoading(false);
  };

  const clearChat = () => {
    setMessages([{
      text: "Hello! I'm your military assistant powered by Vajra AI. How can I help you today?",
      isUser: false,
      timestamp: new Date()
    }]);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-gray-100 flex flex-col">
      <Header/>
      
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full py-8 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-900 mb-2">Vajra AI Assistant</h1>
          <p className="text-gray-600">Powered by Vajra AI - Your secure military information resource</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg flex flex-col h-full max-h-[600px]">
          {/* Chat Header */}
          <div className="bg-green-800 text-white p-4 rounded-t-xl flex justify-between items-center">
            <div className="flex items-center">
              <div className="bg-green-700 p-2 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <div>
                <h2 className="font-semibold">Vajra AI Assistant</h2>
                <p className="text-green-200 text-xs">{loading ? "Typing..." : "Online"}</p>
              </div>
            </div>
            <button 
              onClick={clearChat}
              className="text-green-400 hover:text-white flex items-center text-sm"
              title="Clear conversation"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Clear Chat
            </button>
          </div>
          
          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 text-black bg-gray-50">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs md:max-w-md lg:max-w-lg rounded-2xl p-4 ${
                      message.isUser
                        ? "bg-green-700 text-white rounded-br-none"
                        : "bg-white border border-gray-200 rounded-bl-none"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.text}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.isUser ? "text-green-200" : "text-gray-500"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none p-4 max-w-xs">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-green-300 rounded-full animate-bounce"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          {/* Input Area */}
          <div className="border-t border-gray-200 p-4">
            <form onSubmit={handleAsk} className="flex gap-2">
              <input
                type="text"
                className="flex-1 border text-black border-gray-300 rounded-full px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Type your message..."
                value={input}
                onChange={e => setInput(e.target.value)}
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className={`bg-green-700 text-white rounded-full p-3 flex items-center justify-center ${
                  loading || !input.trim()
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-green-800 transition-colors"
                }`}
                title={!input.trim() ? "Please enter a message" : "Send message"}
              >
                {loading ? (
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                )}
              </button>
            </form>
            
            {/* Quick Suggestions */}
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="text-xs text-gray-500">Try asking:</span>
              <button
                onClick={() => setInput("What are the current military protocols?")}
                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded-full transition-colors"
                disabled={loading}
              >
                Current protocols
              </button>
              <button
                onClick={() => setInput("How do I submit a field report?")}
                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded-full transition-colors"
                disabled={loading}
              >
                Submit field report
              </button>
              <button
                onClick={() => setInput("Explain military communication procedures")}
                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded-full transition-colors"
                disabled={loading}
              >
                Communication procedures
              </button>
            </div>
          </div>
        </div>
        
        {/* Information Box */}
        <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-4 text-sm text-green-800">
          <div className="flex">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>
              This AI assistant is designed to help with military-related queries. All conversations are secure and encrypted.
              For sensitive information, please use official communication channels.
            </p>
          </div>
        </div>
      </div>
      
      <Footer/>
    </div>
  );
}