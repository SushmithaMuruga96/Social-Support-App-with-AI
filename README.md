🧩 Social Support App

A multi-step form web application built with React.js, supporting English and Arabic (RTL), integrated with mock AI assistance, and following accessibility best practices.

🚀 Features Implemented
Main Features

🧾 Multi-step form with React Hook Form and Material UI.
📱 Fully responsive – works seamlessly on mobile, tablet, and desktop.
🌐 Bilingual support – English and Arabic (RTL) via react-i18next.
♿ Accessibility-friendly – keyboard navigation and screen reader compatible.
💾 Data persistence – saves form progress in LocalStorage.
📡 Mock API submission – simulates data submission to an API endpoint

🤖 AI Integration (Help Me Write)

Added a "Help Me Write" button next to three textareas in Step 3.
On click, it sends a request to the OpenAI GPT API (or a mocked version).
Displays a popup with AI-generated text suggestions.
The user can Accept, Edit, or Discard the suggestion.
Proper error handling and fallback responses are implemented.

| Category             | Technology            |
| -------------------- | --------------------- |
| Framework            | **React.js**          |
| UI Library           | **Material UI (MUI)** |
| Form Handling        | **React Hook Form**   |
| State Management     | **Redux Toolkit**     |
| API Calls            | **Axios**             |
| Internationalization | **React-i18next**     |
| Bundler              | **Parcel**            |
| AI API Integration   | **OpenAI GPT**        |

⚙️ Setup & Running the Project
1️⃣ Run the Frontend

# Open the project directory

cd socialsupportapp

# Run with Parcel

npx parcel index.html

✅ App will be available at:
👉 http://localhost:1234/

2️⃣ Run the Backend (Mock Server)

For security reasons, the OpenAI API call is proxied through a local Node.js server.

# From the project root

cd server

# Start the server

node server.js

✅ Server runs at:
👉 http://localhost:5000/

🔑 Using OpenAI API Key
To use the actual OpenAI GPT API, follow these steps:
Log in to your OpenAI account
Navigate to Profile → API Keys.
Click “Create new secret key” and name it.
Copy your API key and update it in your server configuration.

⚠️ Note: Without a valid paid OpenAI API key, the project uses a mock response to simulate API output.

OPEN AI API Behavior

⚠️ Note:
Since the generated OpenAI API key currently has zero credit, the application cannot receive realresponses from the API without a paid plan.
If a valid paid OpenAI API key is used, the app will successfully fetch real suggestions from the API.

For demonstration purposes, I have implemented a mock API response that simulates the same behavior and structure as the actual OpenAI GPT API.
In Step 3, this mock response appears in a popup where the user can Accept, Edit, or Discard the suggested text — providing a seamless user experience.

github link:
https://github.com/SushmithaMuruga96/Social-Support-App-with-AI

git clone
do npm install and follow steps mentioned above to run.
