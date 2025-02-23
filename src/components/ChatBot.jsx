import { useState, useRef, useEffect } from 'react';
import { apiService } from '../config/api';
import '../styles/ChatBot.css';

const generateSessionId = () => {
  return 'session_' + Date.now() + '_' + Math.random().toString(36).substring(2, 15);
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [sessionId, setSessionId] = useState('');
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setSessionId(generateSessionId());
      setMessages([{
        role: 'assistant',
        content: 'Welcome! Please provide your email address to continue.'
      }]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const logConversation = async (message) => {
    try {
      await apiService.logConversation({
        email: userEmail,
        message,
        sessionId
      });
    } catch (error) {
      console.error('Error logging conversation:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = { role: 'user', content: inputMessage };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    if (!userEmail) {
      if (isValidEmail(inputMessage)) {
        setUserEmail(inputMessage);
        const responseMessage = `Thank you! Your email ${inputMessage} has been registered. How can I help you today?`;
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: responseMessage
        }]);
        await logConversation(responseMessage);
      } else {
        const responseMessage = 'Please provide a valid email address to continue.';
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: responseMessage
        }]);
        await logConversation(responseMessage);
      }
      return;
    }

    setIsLoading(true);
    try {
      const data = await apiService.chat(inputMessage, userEmail);
      const message = data && data.length > 0 && data[0].output ? data[0].output : 'Having issue with the response.';
      setMessages(prev => [...prev, { role: 'assistant', content: message }]);
      await logConversation(message);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = 'Sorry, I encountered an error. Please try again.';
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: errorMessage
      }]);
      await logConversation(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        className="chat-icon"
        onClick={() => setIsOpen(true)}
        aria-label="Open chat"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" fill="currentColor" />
        </svg>
      </button>

      {isOpen && (
        <div className="chat-overlay">
          <div className="chat-container">
            <div className="chat-header">
              <h3>Sean Lon Engineering Assistant</h3>
              <button
                className="close-button"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
              >
                ×
              </button>
            </div>

            <div className="disclaimer-banner">
              <span className="disclaimer-icon">⚠️</span>
              This is a prototype chat system and may provide inaccurate or incomplete information. Not for production use.
            </div>

            <div className="chat-messages" ref={chatContainerRef}>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`message ${msg.role === 'user' ? 'user' : 'assistant'}`}
                >
                  {msg.content}
                </div>
              ))}
              {isLoading && (
                <div className="message assistant loading">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="chat-input">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                disabled={isLoading}
              />
              <button type="submit" disabled={isLoading}>
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
