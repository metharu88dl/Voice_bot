import React, { useState, useEffect, useRef } from 'react';
import useSpeech from '../hooks/useSpeech';

const ChatUI = () => {
  const [messages, setMessages] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { transcript, listening, startListening, stopListening, speak } = useSpeech({
    lang: 'hi-IN',
  });
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (transcript && !listening && !isLoading) {
      handleSend(transcript);
    }
  }, [transcript, listening, isLoading]);

  const handleSend = async (text) => {
    if (!text.trim()) return;

    const userMessage = { text, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const res = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text,
          history: messages.map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'model',
            parts: msg.text,
          })),
        }),
      });
      const data = await res.json();
      const botMessage = { text: data.reply, sender: 'bot' };
      setMessages((prev) => [...prev, botMessage]);
      speak(data.reply);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = { text: 'Sorry, something went wrong.', sender: 'bot' };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleListen = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
    setIsListening(!isListening);
  };

  return (
    <div className="bg-gray-900 text-white h-screen flex flex-col items-center justify-center font-sans">
      <div className="w-full max-w-2xl h-[90vh] bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg flex flex-col">
        <div className="flex-1 p-6 overflow-y-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`my-2 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`p-3 rounded-2xl max-w-md ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 rounded-br-none'
                    : 'bg-gray-700 rounded-bl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {listening && (
            <div className="my-2 flex justify-end">
              <div className="p-3 rounded-2xl max-w-md bg-blue-600 rounded-br-none">
                {transcript || '...'}
              </div>
            </div>
          )}
          {isLoading && (
            <div className="my-2 flex justify-start">
              <div className="p-3 rounded-2xl max-w-md bg-gray-700 rounded-bl-none">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s] mx-1"></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="p-6 flex items-center justify-center">
          <button
            onClick={toggleListen}
            className={`w-16 h-16 rounded-full transition-all duration-300 flex items-center justify-center ${
              isListening ? 'bg-red-500 animate-pulse' : 'bg-green-500'
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm5 10.72V17h-4v-2.28A5.975 5.975 0 014 10V8h2v2a4 4 0 008 0V8h2v2a5.975 5.975 0 01-4 4.72z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatUI;
