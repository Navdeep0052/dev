"use client";

import { useEffect, useRef } from "react";
import { Github, Linkedin, Mail, Phone, ArrowUp, Heart } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = [];
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 162, 39, ${p.opacity})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <footer className="relative bg-navy-950 border-t border-gold-500/10 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-50" />
      <div className="relative max-w-7xl mx-auto section-padding py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold text-white">
              Navdeep<span className="text-gold-400">.</span>
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Backend Developer crafting scalable, real-time, and secure web applications. Building the future one API at a time.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold text-white tracking-wide">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {["About", "Skills", "Experience", "Projects", "Contact"].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-slate-400 hover:text-gold-400 transition-colors text-sm"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold text-white tracking-wide">Connect</h4>
            <div className="flex flex-col gap-3">
              <a href="mailto:work.navdeep2@gmail.com" className="flex items-center gap-3 text-slate-400 hover:text-gold-400 transition-colors text-sm">
                <Mail className="w-4 h-4" /> work.navdeep2@gmail.com
              </a>
              <a href="tel:7027450052" className="flex items-center gap-3 text-slate-400 hover:text-gold-400 transition-colors text-sm">
                <Phone className="w-4 h-4" /> +91 7027450052
              </a>
              <a href="https://linkedin.com/in/navdeep-sharma-042091228/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-400 hover:text-gold-400 transition-colors text-sm">
                <Linkedin className="w-4 h-4" /> LinkedIn
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-navy-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-red-400 fill-red-400" /> by Navdeep Sharma
          </p>
          <p className="text-slate-500 text-sm"> {year} All rights reserved.</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="p-2 rounded-full bg-navy-800 hover:bg-gold-500/20 text-gold-400 transition-all hover:scale-110"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
