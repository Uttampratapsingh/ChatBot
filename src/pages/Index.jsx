import { Link } from 'react-router-dom';
import ThemeToggle from '../components/ui/ThemeToggle';

const Index = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col">
      
      {/* ===== Header Section ===== */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Website Title */}
          <h1 className="text-2xl font-bold">AI Chatbot</h1>

          {/* Theme toggle and auth buttons */}
          <div className="flex items-center space-x-4">
            {/* Dark/Light Theme Toggle */}
            <ThemeToggle />

            {/* Login and Register Buttons */}
            <div className="space-x-2">
              <Link
                to="/login"
                className="px-4 py-2 border border-gray-300 rounded hover:text-black hover:bg-gray-100"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-900 text-white rounded"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ===== Hero Section ===== */}
      <main className="flex-1 flex items-center justify-center">
        <section className="text-center px-4">
          {/* Main Headline */}
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-blue-900 bg-clip-text text-transparent">
            Next-Generation AI Chat Experience
          </h2>

          {/* Subtext */}
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Experience the future of conversational AI with our production-ready chatbot.
            Featuring real-time streaming, voice input, and intelligent responses.
          </p>

          {/* CTA Buttons */}
          <div className="space-x-4">
            <Link
              to="/register"
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-900 text-white rounded text-lg"
            >
              Get Started Free
            </Link>
            <Link
              to="/login"
              className="px-6 py-3 border border-gray-300 rounded text-lg hover:text-black hover:bg-gray-100"
            >
              Sign In
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
