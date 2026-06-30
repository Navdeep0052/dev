"use client";

import { useEffect, useRef, useState } from "react";
import { Mail, Phone, MapPin, Linkedin, Send, CheckCircle, Loader2 } from "lucide-react";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("http://localhost:5500/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        const data = await res.json();
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Could not connect to server. Please try again later.");
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto section-padding">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="text-gold-400 text-sm font-semibold tracking-widest uppercase">Contact</span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
            Have a project in mind or want to discuss opportunities? I'd love to hear from you.
          </p>
        </div>

        <div className={`grid lg:grid-cols-5 gap-12 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-6">
              <a href="mailto:work.navdeep2@gmail.com" className="flex items-start gap-4 group">
                <div className="p-3 bg-gold-500/10 rounded-xl group-hover:bg-gold-500/20 transition-colors">
                  <Mail className="w-5 h-5 text-gold-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Email</h4>
                  <p className="text-slate-400 text-sm group-hover:text-gold-400 transition-colors">work.navdeep2@gmail.com</p>
                </div>
              </a>
              <a href="tel:7027450052" className="flex items-start gap-4 group">
                <div className="p-3 bg-gold-500/10 rounded-xl group-hover:bg-gold-500/20 transition-colors">
                  <Phone className="w-5 h-5 text-gold-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Phone</h4>
                  <p className="text-slate-400 text-sm group-hover:text-gold-400 transition-colors">+91 7027450052</p>
                </div>
              </a>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gold-500/10 rounded-xl">
                  <MapPin className="w-5 h-5 text-gold-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Location</h4>
                  <p className="text-slate-400 text-sm">India</p>
                </div>
              </div>
              <a href="https://linkedin.com/in/navdeep-sharma-042091228/" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group">
                <div className="p-3 bg-gold-500/10 rounded-xl group-hover:bg-gold-500/20 transition-colors">
                  <Linkedin className="w-5 h-5 text-gold-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">LinkedIn</h4>
                  <p className="text-slate-400 text-sm group-hover:text-gold-400 transition-colors">linkedin.com/in/navdeep-sharma-042091228</p>
                </div>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 sm:p-8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-navy-900/50 border border-navy-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/20 transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-navy-900/50 border border-navy-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/20 transition-all"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 bg-navy-900/50 border border-navy-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/20 transition-all"
                  placeholder="What's this about?"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Message</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-navy-900/50 border border-navy-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/20 transition-all resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full sm:w-auto px-8 py-3.5 bg-gold-500 hover:bg-gold-400 disabled:opacity-50 disabled:cursor-not-allowed text-navy-900 font-semibold rounded-lg transition-all hover:scale-105 flex items-center justify-center gap-2"
              >
                {status === "loading" ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
                ) : status === "success" ? (
                  <><CheckCircle className="w-4 h-4" /> Sent Successfully!</>
                ) : (
                  <><Send className="w-4 h-4" /> Send Message</>
                )}
              </button>
              {status === "error" && <p className="text-red-400 text-sm mt-2">{errorMsg}</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
