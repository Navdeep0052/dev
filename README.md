# Navdeep Sharma - Portfolio

A classic, elegant portfolio website with real-time WebSocket chat, built with **Next.js** (frontend) and **Node.js + Express + MongoDB** (backend).

## Project Structure

```
server/                     # Root workspace
├── server/                 # Backend (Node.js + Express + MongoDB + WebSocket)
│   ├── server.js           # Main server + WebSocket
│   ├── models/             # Mongoose schemas (ChatMessage, Contact, Visitor)
│   ├── routes/             # API routes (contact, messages, visitor)
│   ├── middleware/         # Middleware folder
│   ├── public/images/      # Your photos
│   ├── package.json        # Backend dependencies
│   └── .env                # Environment variables
│
├── client/                 # Frontend (Next.js + TypeScript + Tailwind)
│   ├── src/app/
│   │   ├── sections/       # Hero, About, Skills, Experience, Projects, Contact
│   │   ├── components/     # Navbar, Footer, ChatWidget
│   │   ├── page.tsx        # Main page
│   │   ├── layout.tsx      # Root layout
│   │   └── globals.css     # Global styles
│   ├── public/images/      # Your photos (for build)
│   ├── dist/               # Built static output
│   └── package.json        # Frontend dependencies
│
└── package.json            # Root convenience scripts
```

## Features

- **Classic Design** — Dark navy & gold theme with elegant serif typography
- **Fully Responsive** — Works beautifully on PC, tablet, and mobile
- **Real-Time Chat** — Floating WebSocket chat widget with auto-replies
- **Contact Form** — Messages saved to MongoDB
- **Visitor Tracking** — Track portfolio visits
- **Animated Sections** — Scroll-triggered animations and particle backgrounds
- **Resume-Based Content** — All sections populated from your actual resume

## Quick Start

### 1. Install Dependencies (Both)

```bash
# From the root folder
npm run install:all
```

Or install separately:
```bash
cd server && npm install
cd ../client && npm install
```

### 2. Configure Environment

Create a `.env` file inside the `server/` folder:

```env
Status=development
Local_Database=mongodb://localhost:27017/portfolio
Database=your-production-mongodb-url
```

> Make sure MongoDB is running locally or use a cloud URL.

### 3. Run the Backend

```bash
cd server
npm start
```
Backend runs on **http://localhost:5500**

### 4. Run the Frontend (Separate Terminal)

```bash
cd client
npm run dev
```
Frontend runs on **http://localhost:3000**

### 5. Build for Production

```bash
cd client
npm run build
```
Static files are exported to `client/dist/`.

## API Endpoints (Backend)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/portfolio` | Portfolio data JSON |
| POST | `/api/contact` | Submit contact form |
| GET | `/api/messages` | Get all chat messages |
| GET | `/api/messages/:sessionId` | Get messages by session |
| POST | `/api/visitor` | Track a visit |
| GET | `/api/visitor/stats` | Get visitor stats |
| GET | `/api/health` | Health check |

## WebSocket Chat

- The chat widget connects to `ws://localhost:5500`
- All messages are persisted in MongoDB with session IDs
- Auto-replies cover: experience, skills, contact, projects, greetings
- Admin can view all chat sessions via `/api/messages`

## Tech Stack

### Backend
- Node.js + Express
- MongoDB + Mongoose
- WebSocket (ws library)
- CORS
- dotenv

### Frontend
- Next.js 15 + React 19 + TypeScript
- Tailwind CSS 3
- Lucide React Icons
- Static export (SPA)

## Customization

- **Colors**: Edit `client/tailwind.config.ts` and `client/src/app/globals.css`
- **Content**: Edit portfolio data in `server/server.js` (GET `/api/portfolio`) and section components
- **Photos**: Replace images in `client/public/images/` and `server/public/images/`, then update references in components
- **Profile Photo**: Currently uses `photo2.jpg` in the About section — change in `client/src/app/sections/About.tsx`

---

Built for Navdeep Sharma — Backend Developer
