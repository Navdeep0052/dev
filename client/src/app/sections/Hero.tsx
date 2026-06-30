"use client";

import { useEffect, useRef } from "react";
import { ArrowDown, MapPin, Mail, Phone } from "lucide-react";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: { x: number; y: number; vx: number; vy: number; size: number }[] = [];
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 0.5,
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
        ctx.fillStyle = `rgba(201, 162, 39, ${Math.random() * 0.3 + 0.1})`;
        ctx.fill();
      });

      // Connect nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(201, 162, 39, ${0.1 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900/50 via-navy-900/80 to-navy-900 pointer-events-none" />
      
      <div className="relative z-10 max-w-5xl mx-auto section-padding text-center py-20">
        <div className="animate-fade-in space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-sm font-medium mb-4">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Available for Opportunities
          </div>
          
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight">
            Navdeep <span className="text-gradient">Sharma</span>
          </h1>
          
          <p className="text-xl sm:text-2xl md:text-3xl text-slate-300 font-light tracking-wide">
            Backend Developer
          </p>
          
          <p className="max-w-2xl mx-auto text-slate-400 text-base sm:text-lg leading-relaxed">
            Building scalable, real-time & secure web applications with Node.js, Express, MongoDB, and modern cloud architecture.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-400">
            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-gold-400" /> India</span>
            <span className="hidden sm:inline text-navy-600">|</span>
            <a href="mailto:work.navdeep2@gmail.com" className="flex items-center gap-1.5 hover:text-gold-400 transition-colors"><Mail className="w-4 h-4 text-gold-400" /> work.navdeep2@gmail.com</a>
            <span className="hidden sm:inline text-navy-600">|</span>
            <a href="tel:7027450052" className="flex items-center gap-1.5 hover:text-gold-400 transition-colors"><Phone className="w-4 h-4 text-gold-400" /> +91 7027450052</a>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a href="#contact" className="px-8 py-3.5 bg-gold-500 hover:bg-gold-400 text-navy-900 font-semibold rounded-lg transition-all hover:scale-105 shadow-lg shadow-gold-500/20">
              Get In Touch
            </a>
            <a href="#projects" className="px-8 py-3.5 border border-gold-500/30 text-gold-400 hover:bg-gold-500/10 font-semibold rounded-lg transition-all">
              View Projects
            </a>
          </div>
        </div>
      </div>
      
      <a href="#about" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-400 hover:text-gold-400 transition-colors animate-bounce">
        <ArrowDown className="w-6 h-6" />
      </a>
    </section>
  );
}
