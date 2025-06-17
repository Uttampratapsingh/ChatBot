import { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../components/ui/ThemeToggle';
import { getAIResponse } from '../utils/aiClient';

const Chat = () => {
  // === State management ===
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // === Refs ===
  const messagesEndRef = useRef(null); // for auto-scroll
  const recognition = useRef(null); // speech recognition instance

  const navigate = useNavigate();

  // Scroll to latest message when messages update
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Setup speech recognition once on component mount
  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      recognition.current = new window.webkitSpeechRecognition();
      recognition.current.continuous = false;
      recognition.current.interimResults = false;
      recognition.current.lang = 'en-US';

      recognition.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setMessage(transcript);
        setIsListening(false);
      };

      recognition.current.onerror = () => setIsListening(false);
      recognition.current.onend = () => setIsListening(false);
    }
  }, []);

  // Scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Handle logout and navigate to homepage
  const handleLogout = () => {
    navigate('/');
  };

  // Handle chat message submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message to chat
    const userMessage = { id: Date.now(), role: 'user', content: message };
    setMessages([...messages, userMessage]);
    setMessage('');
    setIsLoading(true);

    // Get AI response
    const aiContent = await getAIResponse(userMessage.content);
    const aiMessage = {
      id: Date.now() + 1,
      role: 'assistant',
      content: aiContent,
    };

    // Add AI response to chat
    setMessages((prev) => [...prev, aiMessage]);
    setIsLoading(false);
  };

  // Toggle voice input
  const handleVoiceInput = () => {
    if (!recognition.current) return;

    if (isListening) {
      recognition.current.stop();
      setIsListening(false);
    } else {
      recognition.current.start();
      setIsListening(true);
    }
  };

  // Fill input with a template
  const handleTemplateSelect = (template) => {
    setMessage(template);
  };

  // Export conversation as .txt file
  const handleExport = () => {
    const content = messages.map((msg) => `${msg.role}: ${msg.content}`).join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'chat.txt';
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white flex flex-col">
      {/* === Header === */}
      <div className="p-4 bg-white dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700 flex justify-between items-center">
        <h1 className="text-xl font-bold">AI Chat</h1>
        <div className="space-x-2 flex">
          <ThemeToggle />
          <button
            onClick={handleExport}
            className="text-sm px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Export Chat
          </button>
          <button
            onClick={handleLogout}
            className="text-sm px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      {/* === Main Chat Area === */}
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 flex flex-col">
          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Empty state */}
            {messages.length === 0 && !isLoading && (
              <div className="text-center mt-20 text-gray-500">
                <h2 className="text-2xl font-bold mb-2">Welcome to AI Chat!</h2>
                <p>Start a conversation by typing a message below.</p>
              </div>
            )}

            {/* Render messages */}
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-3 rounded-md max-w-xl ${
                  msg.role === 'user' ? 'bg-gray-600 self-end' : 'bg-blue-600 self-start'
                }`}
              >
                <strong className="block text-sm mb-1">{msg.role === 'user' ? 'You' : 'AI'}</strong>
                <span className="text-sm">{msg.content}</span>
              </div>
            ))}

            {/* AI loading indicator */}
            {isLoading && (
              <div className="flex items-center space-x-2 p-3 bg-blue-600 rounded-md max-w-xs">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                <span className="text-sm">AI is thinking...</span>
              </div>
            )}

            {/* Scroll anchor */}
            <div ref={messagesEndRef} />
          </div>

          {/* === Input Section === */}
          <div className="p-4 border-t border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800">
            <form onSubmit={handleSubmit} className="flex space-x-2">
              {/* Text Input */}
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none"
              />

              {/* Voice Input Toggle */}
              {recognition.current && (
                <button
                  type="button"
                  onClick={handleVoiceInput}
                  disabled={isLoading}
                  className={`px-3 py-2 rounded-md border ${
                    isListening
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </button>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !message.trim()}
                className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
