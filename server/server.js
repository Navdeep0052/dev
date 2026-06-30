import express from "express"
import { WebSocketServer } from "ws"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"

// Simple UUID generator
const uuidv4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0
    const v = c === "x" ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

import ChatMessage from "./models/ChatMessage.js"
import contactRoutes from "./routes/contact.js"
import messageRoutes from "./routes/messages.js"
import visitorRoutes from "./routes/visitor.js"

const app = express()
const port = 5500

dotenv.config()

app.use(cors({
  origin: ["http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:5500"],
  credentials: true
}))
app.use(express.json())

mongoose.set({ strictQuery: false })

mongoose.connect(process.env.Status === "production"
  ? process.env.Database
  : process.env.Local_Database
)
.then(() => console.log("*Database is connected*"))
.catch((err) => console.log("*Error connecting to database:", err))

// Portfolio data endpoint
app.get("/api/portfolio", (req, res) => {
  res.json({
    name: "Navdeep Sharma",
    title: "Backend Developer",
    tagline: "Building scalable, real-time & secure web applications",
    phone: "7027450052",
    email: "work.navdeep2@gmail.com",
    linkedin: "https://linkedin.com/in/navdeep-sharma-042091228/",
    location: "India",
    summary: "Dedicated Backend Developer with 3 years of experience building scalable, real-time, and secure web applications. Focused on delivering reliable solutions, supporting team goals, and contributing to long-term success. Values clear communication, strong work ethics, and thoughtful collaboration—while taking initiative and stepping into leadership when needed.",
    skills: {
      technical: ["JavaScript", "Node.js", "Express", "NestJS", "MongoDB", "SQL", "Git", "AWS S3", "Data Structures & Algorithms", "OOP", "HTML", "CSS", "Payment Gateways", "Third-Party APIs", "Socket.io", "Microservices"],
      soft: ["Flexibility", "Adaptability", "Time Management", "Teamwork", "Leadership"]
    },
    experience: [
      {
        role: "Backend Developer",
        company: "FictiveBox Digital",
        period: "March 2024 – Present",
        products: [
          {
            name: "HAHW (Hot Axle Hot Wheel) – Indian Railways",
            description: "India's first Indian Railway certified IoT-based monitoring system for train axle, brake, wheel, and track temperatures with RFID integration. Provides real-time alarms, notifications, and SMS messages.",
            tech: ["Node.js", "Express", "MongoDB", "Socket.io", "AWS S3", "Third-Party APIs"]
          },
          {
            name: "FARMLANDBAZAAR",
            description: "Subscription-based real estate platform enabling brokerage-free property buying/selling. Live chat between buyers and sellers via Socket.io. Integrated payment gateways and Google Maps geolocation.",
            tech: ["Node.js", "Express", "MongoDB", "Socket.io", "Payment Gateways"]
          },
          {
            name: "Indian Railway Canteen Management",
            description: "Mobile app for Indian Railway employees to pre-order meals. Admin web app with real-time order management. Bill Desk payment gateway integration.",
            tech: ["Node.js", "Express", "MongoDB", "Bill Desk API"]
          },
          {
            name: "Indian Railway Grievance Management System",
            description: "Mobile app for employees to raise grievances. Admin web app for managing and resolving grievances with real-time tracking and geolocation.",
            tech: ["NestJS", "MongoDB", "Geolocation APIs", "Real-time Tracking"]
          }
        ]
      },
      {
        role: "Backend Developer",
        company: "Dream Big IT Solution – Noida",
        period: "May 2023 – March 2024",
        products: [
          {
            name: "CYBERYAMI",
            description: "All-in-one cybersecurity platform for learning, practice, and certification. Scalable backend with cloud-based microservices architecture.",
            tech: ["Node.js", "Express", "AWS", "Microservices"]
          }
        ]
      },
      {
        role: "Backend Developer Trainee",
        company: "FunctionUp",
        period: "July 2022 – April 2023",
        products: [
          {
            name: "Training Program",
            description: "Intensive backend development training in Node.js, Express, and MongoDB. Gained proficiency in Git, teamwork, and agile delivery.",
            tech: ["Node.js", "Express", "MongoDB", "Git"]
          }
        ]
      }
    ],
    accomplishments: [
      "ELSA Certificate (Career Development)",
      "Developer Student Club Certificate",
      "Microsoft Learn Student Ambassador"
    ]
  })
})

// Routes
app.use("/api/contact", contactRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/visitor", visitorRoutes)

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() })
})

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

// WebSocket Chat Server
const wss = new WebSocketServer({ server })
const clients = new Map()

wss.on("connection", (ws, req) => {
  const sessionId = uuidv4()
  clients.set(ws, { sessionId, name: "Visitor" })
  
  console.log(`New WebSocket connection: ${sessionId}`)
  
  ws.send(JSON.stringify({
    type: "system",
    message: "Connected to Navdeep's portfolio chat. How can I help you today?",
    sessionId,
    timestamp: new Date().toISOString()
  }))

  ws.on("message", async (data) => {
    try {
      const parsed = JSON.parse(data)
      const clientInfo = clients.get(ws)
      
      if (parsed.type === "join") {
        clientInfo.name = parsed.name || "Visitor"
        clientInfo.email = parsed.email || ""
        clients.set(ws, clientInfo)
        ws.send(JSON.stringify({
          type: "system",
          message: `Welcome ${clientInfo.name}! Feel free to ask anything about my work or experience.`,
          timestamp: new Date().toISOString()
        }))
        return
      }
      
      if (parsed.type === "chat" && parsed.message) {
        // Save user message
        const userMsg = new ChatMessage({
          sender: "user",
          name: clientInfo.name,
          email: clientInfo.email,
          message: parsed.message,
          sessionId: clientInfo.sessionId
        })
        await userMsg.save()
        
        // Broadcast to all admin clients (if any)
        wss.clients.forEach((client) => {
          if (client !== ws && client.readyState === 1) {
            client.send(JSON.stringify({
              type: "chat",
              sender: "user",
              name: clientInfo.name,
              message: parsed.message,
              sessionId: clientInfo.sessionId,
              timestamp: new Date().toISOString()
            }))
          }
        })
        
        // Auto-reply with portfolio info
        const lowerMsg = parsed.message.toLowerCase()
        let reply = ""
        
        if (lowerMsg.includes("experience") || lowerMsg.includes("work")) {
          reply = "I have 3 years of experience as a Backend Developer. Currently I'm a Backend Developer at FictiveBox Digital working on Indian Railway projects (HAHW, Canteen Management, Grievance System) and FARMLANDBAZAAR. Previously at Dream Big IT Solution, I worked on CYBERYAMI."
        } else if (lowerMsg.includes("skill") || lowerMsg.includes("tech")) {
          reply = "My technical skills include JavaScript, Node.js, Express, NestJS, MongoDB, SQL, Git, AWS S3, Socket.io, Microservices, Payment Gateways, and Third-Party APIs. I'm also proficient in Data Structures & Algorithms and OOP."
        } else if (lowerMsg.includes("contact") || lowerMsg.includes("email") || lowerMsg.includes("phone")) {
          reply = "You can reach me at work.navdeep2@gmail.com or call me at 7027450052. You can also connect with me on LinkedIn: linkedin.com/in/navdeep-sharma-042091228/"
        } else if (lowerMsg.includes("project") || lowerMsg.includes("product")) {
          reply = "I've worked on several notable projects: HAHW (India's first Railway certified IoT monitoring system), FARMLANDBAZAAR (real estate platform), Indian Railway Canteen & Grievance Management apps, and CYBERYAMI (cybersecurity learning platform)."
        } else if (lowerMsg.includes("hello") || lowerMsg.includes("hi")) {
          reply = "Hello! I'm Navdeep Sharma, a Backend Developer. Feel free to ask me about my experience, skills, projects, or how to get in touch!"
        } else {
          reply = "Thank you for your message! I'll get back to you soon. In the meantime, feel free to explore my portfolio or use the contact form to reach out directly."
        }
        
        const adminMsg = new ChatMessage({
          sender: "admin",
          name: "Navdeep Sharma",
          message: reply,
          sessionId: clientInfo.sessionId
        })
        await adminMsg.save()
        
        ws.send(JSON.stringify({
          type: "chat",
          sender: "admin",
          name: "Navdeep Sharma",
          message: reply,
          sessionId: clientInfo.sessionId,
          timestamp: new Date().toISOString()
        }))
      }
    } catch (err) {
      console.error("WebSocket message error:", err)
      ws.send(JSON.stringify({
        type: "error",
        message: "Something went wrong. Please try again."
      }))
    }
  })

  ws.on("close", () => {
    console.log(`WebSocket disconnected: ${clients.get(ws)?.sessionId}`)
    clients.delete(ws)
  })

  ws.on("error", (err) => {
    console.error("WebSocket error:", err)
    clients.delete(ws)
  })
})
