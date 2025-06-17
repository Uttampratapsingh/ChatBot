import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importing pages/components
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";

// Theme context provider to handle dark/light mode
import { ThemeProvider } from "./components/hooks/useTheme";

// Main App component with routing
const App = () => {
  return (
    <React.StrictMode>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            {/* Home / Landing Page */}
            <Route path="/" element={<Index />} />

            {/* Auth routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Chat feature page */}
            <Route path="/chat" element={<Chat />} />

            {/* Fallback for any unknown route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </React.StrictMode>
  );
};

export default App;
