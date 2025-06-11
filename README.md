YouTube Video Summarizer (MERN Stack)
🚀 A web app that generates AI-powered summaries of YouTube videos, stores them in a dashboard, and gates advanced features behind a paywall.

Built with:
✔ MongoDB (Database)
✔ Express.js (Backend API)
✔ React.js (Frontend)
✔ Node.js (Server)
✔ OpenAI API (AI Summaries)
✔ YouTube Data API (Video Metadata)

Features
✅ User Authentication (Register/Login)
✅ Paste YouTube URL → Get AI Summary
✅ Dashboard (History of Summaries)
✅ Daily Free Quota (3 summaries/day for free users)
✅ Paywall (Upgrade to premium for unlimited access)
✅ Admin Panel (View all users & usage)

Prerequisites
Node.js (v16+)

MongoDB (Local or Atlas)

OpenAI API Key (Get Here)

YouTube Data API Key (Get Here)

Setup & Installation
1. Clone the Repository
git clone https://github.com/your-username/youtube-summary-app.git
cd youtube-summary-app

3. Backend Setup
cd server
npm install

Configure Environment Variables
Create .env in /server:

env
PORT=5000
MONGO_URI=mongodb://localhost:27017/youtube-summary
JWT_SECRET=your_jwt_secret_key_here
YOUTUBE_API_KEY=your_youtube_api_key
OPENAI_API_KEY=your_openai_api_key

Start Backend Server
npm run dev
(Runs on http://localhost:5000)

3. Frontend Setup
cd ../client
npm install

Configure Proxy
Add to client/package.json:

json
"proxy": "http://localhost:5000"

Start React App
npm start
(Runs on http://localhost:3000)
