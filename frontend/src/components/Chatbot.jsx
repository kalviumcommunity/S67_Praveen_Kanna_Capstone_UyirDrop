import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from './LoadingSpinner';
import './Chatbot.css';

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hi! I'm your AI assistant. Ask me anything about blood donation." }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (open && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  const getChatResponse = async (userMessage) => {
    try {
      const response = await axios.post('http://localhost:5001/api/chat', {
        message: userMessage
      });
      return response.data.reply;
    } catch (error) {
      console.error('Chat API error:', error);
      return "I apologize, but I'm having trouble connecting to my brain right now. Please try again in a moment.";
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(msgs => [...msgs, { from: 'user', text: userMessage }]);
    setIsTyping(true);

    try {
      const botReply = await getChatResponse(userMessage);
      setMessages(msgs => [...msgs, { from: 'bot', text: botReply }]);
    } catch (error) {
      setMessages(msgs => [...msgs, { 
        from: 'bot', 
        text: "I'm having trouble processing your request right now. Please try again." 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="chatbot-root">
      {open && (
        <div className="chatbot-window animate-pop">
          <div className="chatbot-header">
            <span>AI Assistant</span>
            <button className="chatbot-close" onClick={() => setOpen(false)}>&times;</button>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chatbot-msg ${msg.from}`}>{msg.text}</div>
            ))}
            {isTyping && (
              <div className="chatbot-msg bot typing">
                <LoadingSpinner size="small" />
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
          <form className="chatbot-input-row" onSubmit={handleSend}>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type your question..."
              disabled={isTyping}
              autoFocus={open}
            />
            <button type="submit" disabled={isTyping}>

              {isTyping ? '...' : 'Send'}
            </button>
          </form>
        </div>
      )}
      <button 
        className="chatbot-fab" 
        onClick={() => setOpen(o => !o)} 
        aria-label="Toggle chat"
      >
        <span role="img" aria-label="chat">💬</span>
      </button>
    </div>
  );
};

export default Chatbot;
