# 🤖 AI Chatbot Web Application (Client)

This is the **React client** for a full-stack AI-powered chatbot application. It allows users to register, log in, and interact with an intelligent chatbot powered by the Gemini API. Styled using **Tailwind CSS**, it supports light/dark modes and is built with modern development practices.

---

## 🔗 Live Demo  https://chat-bot-six-sand.vercel.app


## 🚀 Features

- 🔐 User Authentication (Login/Register)
- 🎨 Light/Dark Mode Toggle
- 💬 Real-Time Chat Interface
- 🤖 Gemini AI API Integration
- 📱 Responsive and Mobile Friendly
- ⚡ Vite-powered React Application

---

## 🧰 Tech Stack

| Frontend       | Tool/Library                  |
|----------------|-------------------------------|
| Framework      | React + Vite                  |
| Styling        | Tailwind CSS                  |
| Auth           | Firebase Authentication       |
| AI API         | Gemini API (Google)           |
| Icons          | Lucide React                  |
| Routing        | React Router DOM              |

---

## 🛠️ Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/Uttampratapsingh/ChatBot.git
cd ChatBot

### 2. Install dependencies
npm install

### 3. Create Environment File
## Create a .env file in the root and copy from .env.example.
cp .env.example .env
## Then fill the required variables like:
VITE_FIREBASE_API_KEY=your-api-key-here
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id

VITE_GEMINI_API_KEY=your-gemini-api-key-here


### 4. Start the development server
npm run dev



##Folder Structure
├── src
│   ├── components
│   │   ├── hooks
│   │   │   └── useTheme.jsx         # Theme toggle logic
│   │   └── ui
│   │       └── ThemeToggle.jsx     # UI toggle button
│   ├── pages
│   │   ├── Chat.jsx                # Main chat interface
│   │   ├── Index.jsx               # Landing page
│   │   ├── Login.jsx               # Login form
│   │   ├── Register.jsx            # Register form
│   │   └── NotFound.jsx            # 404 page
│   ├── utils
│   │   └── aiClient.js             # Gemini API wrapper
│   ├── firebase.js                 # Firebase config
│   ├── App.jsx                     # App entry
│   └── main.jsx                    # Vite main mount point
├── .env                            # Your environment config
├── tailwind.config.js              # Tailwind setup
├── postcss.config.js               # PostCSS config
├── index.html                      # Vite index template
├── vite.config.js                  # Vite config
└── README.md                       # This file



### Application Flow Diagram
graph TD
    A [User Opens App] --> B[Login/Register]
    B --> C{Is Authenticated?}
    C -- Yes --> D[Access Chat Page]
    C -- No --> B
    D --> E[Send Prompt to Gemini API]
    E --> F[Get Response]
    F --> G[Render AI Response in Chat]


