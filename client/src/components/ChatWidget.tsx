"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Minimize2, User, Bot } from "lucide-react";

type ChatMessage = {
  type: "chat" | "system";
  sender: "user" | "admin";
  name: string;
  message: string;
  timestamp: string;
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [connected, setConnected] = useState(false);
  const [userName, setUserName] = useState("");
  const [showNameForm, setShowNameForm] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const socket = new WebSocket("ws://localhost:5500");
    socket.onopen = () => {
      setConnected(true);
      setWs(socket);
    };
    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "system" || data.type === "chat") {
          setMessages((prev) => [...prev, data]);
        }
      } catch {
        // ignore non-JSON
      }
    };
    socket.onclose = () => setConnected(false);
    socket.onerror = () => setConnected(false);
    return () => { socket.close(); };
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen && !showNameForm) inputRef.current?.focus();
  }, [isOpen, showNameForm]);

  const handleJoin = () => {
    if (!userName.trim() || !ws) return;
    ws.send(JSON.stringify({ type: "join", name: userName.trim() }));
    setShowNameForm(false);
  };

  const handleSend = () => {
    if (!input.trim() || !ws || !connected) return;
    ws.send(JSON.stringify({ type: "chat", message: input.trim() }));
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (showNameForm) handleJoin();
      else handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 group flex items-center gap-3 pl-2.5 pr-4 py-2 bg-navy-950/90 hover:bg-navy-900 text-white rounded-full shadow-2xl shadow-gold-500/20 border border-gold-500/30 transition-all hover:scale-105 backdrop-blur-xl"
          aria-label="Open chat with Navdeep"
        >
          <div className="relative w-9 h-9 rounded-full overflow-hidden border border-gold-400/60 flex-shrink-0">
            <img src="/images/photo18.jpg" alt="Navdeep" className="w-full h-full object-cover object-top" />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-navy-950" />
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-xs font-semibold text-white leading-tight">Chat with Navdeep</p>
            <p className="text-[10px] text-gold-400 font-medium leading-tight">Available now</p>
          </div>
          <MessageCircle className="w-4 h-4 text-gold-400 ml-0.5 group-hover:scale-110 transition-transform" />
        </button>
      )}

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[90vw] max-w-sm h-[500px] glass-card rounded-2xl shadow-2xl shadow-black/40 flex flex-col overflow-hidden border border-gold-500/30">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-navy-900/90 border-b border-gold-500/15 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-full overflow-hidden border border-gold-400/60 bg-navy-950">
                  <img src="/images/photo18.jpg" alt="Navdeep Sharma" className="w-full h-full object-cover object-top" />
                </div>
                <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-navy-900 ${connected ? "bg-emerald-400" : "bg-amber-400"}`} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Navdeep Sharma</h4>
                <p className="text-[10px] text-gold-400 font-medium">{connected ? "Online • Instant reply" : "Connecting..."}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => setIsOpen(false)} className="p-1.5 text-slate-400 hover:text-white transition-colors">
                <Minimize2 className="w-4 h-4" />
              </button>
              <button onClick={() => setIsOpen(false)} className="p-1.5 text-slate-400 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {showNameForm ? (
              <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                <div className="w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center">
                  <User className="w-6 h-6 text-gold-400" />
                </div>
                <div>
                  <h5 className="text-white font-medium">Welcome!</h5>
                  <p className="text-slate-400 text-sm mt-1">Enter your name to start chatting</p>
                </div>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Your name"
                  className="w-full px-4 py-2.5 bg-navy-900/50 border border-navy-600 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-gold-500/50"
                  autoFocus
                />
                <button
                  onClick={handleJoin}
                  disabled={!userName.trim()}
                  className="px-6 py-2 bg-gold-500 hover:bg-gold-400 disabled:opacity-50 text-navy-900 font-semibold rounded-lg text-sm transition-all"
                >
                  Start Chat
                </button>
              </div>
            ) : (
              <>
                {messages.map((msg, i) => (
                  <div key={i} className={`flex gap-2 items-end ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                    {msg.sender !== "user" && msg.type !== "system" && (
                      <div className="w-6 h-6 rounded-full overflow-hidden border border-gold-400/50 flex-shrink-0 mb-1">
                        <img src="/images/photo18.jpg" alt="Navdeep" className="w-full h-full object-cover object-top" />
                      </div>
                    )}
                    <div className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-gold-500 to-gold-400 text-navy-950 font-medium rounded-br-none shadow-md"
                        : "bg-navy-800/90 text-slate-200 border border-gold-500/15 rounded-bl-none shadow-md"
                    }`}>
                      {msg.sender !== "user" && msg.type !== "system" && (
                        <div className="text-[10px] text-gold-400 font-semibold mb-0.5">{msg.name}</div>
                      )}
                      <p>{msg.message}</p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input */}
          {!showNameForm && (
            <div className="px-3 py-3 bg-navy-800/50 border-t border-gold-500/10 flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                className="flex-1 px-3 py-2 bg-navy-900/50 border border-navy-700 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-gold-500/50"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || !connected}
                className="p-2 bg-gold-500 hover:bg-gold-400 disabled:opacity-50 text-navy-900 rounded-lg transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
