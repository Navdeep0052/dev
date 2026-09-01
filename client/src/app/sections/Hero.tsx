"use client";

import { useEffect, useRef } from "react";
import { ArrowDown, MapPin, Mail, Phone, Sparkles, Cloud, ShieldCheck, Star } from "lucide-react";

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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 lg:pt-20 pb-16">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900/60 via-navy-900/85 to-navy-900 pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto section-padding w-full py-8 lg:py-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-left animate-fade-in">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/25 text-gold-300 text-xs sm:text-sm font-medium tracking-wide shadow-sm shadow-gold-500/10 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for Opportunities</span>
              <Sparkles className="w-3.5 h-3.5 text-gold-400 ml-0.5" />
            </div>
            
            <div className="space-y-2">
              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight">
                Navdeep <span className="text-gradient">Sharma</span>
              </h1>
              
              <div className="flex items-center gap-3 pt-1">
                <div className="h-0.5 w-10 bg-gradient-to-r from-gold-400 to-transparent rounded" />
                <p className="text-xl sm:text-2xl text-slate-200 font-light tracking-wide">
                  Software Developer
                </p>
              </div>
            </div>
            
            <p className="max-w-xl text-slate-400 text-base sm:text-lg leading-relaxed">
              Architecting scalable backend ecosystems, real-time Socket.io networks, and automated AWS EC2/S3 cloud deployments that power mission-critical operations.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-3 py-1 text-xs rounded-lg bg-navy-800/80 border border-gold-500/20 text-slate-300 flex items-center gap-1.5">
                <Cloud className="w-3 h-3 text-gold-400" /> AWS EC2 & S3 Deployment
              </span>
              <span className="px-3 py-1 text-xs rounded-lg bg-navy-800/80 border border-gold-500/20 text-slate-300 flex items-center gap-1.5">
                <ShieldCheck className="w-3 h-3 text-emerald-400" /> Railway Certified IoT
              </span>
              <span className="px-3 py-1 text-xs rounded-lg bg-navy-800/80 border border-gold-500/20 text-slate-300">
                Microservices & NestJS
              </span>
            </div>
            
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-slate-400 pt-1">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-navy-800/50 border border-white/5">
                <MapPin className="w-3.5 h-3.5 text-gold-400" /> India
              </span>
              <a href="mailto:work.navdeep2@gmail.com" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-navy-800/50 border border-white/5 hover:border-gold-500/30 hover:text-gold-400 transition-colors">
                <Mail className="w-3.5 h-3.5 text-gold-400" /> work.navdeep2@gmail.com
              </a>
              <a href="tel:7027450052" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-navy-800/50 border border-white/5 hover:border-gold-500/30 hover:text-gold-400 transition-colors">
                <Phone className="w-3.5 h-3.5 text-gold-400" /> +91 7027450052
              </a>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a 
                href="#contact" 
                className="px-8 py-3.5 bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-300 text-navy-950 font-semibold rounded-xl transition-all hover:scale-105 shadow-xl shadow-gold-500/20 tracking-wide text-sm"
              >
                Get In Touch
              </a>
              <a 
                href="#projects" 
                className="px-8 py-3.5 glass-card border border-gold-500/30 text-gold-300 hover:text-gold-200 hover:bg-gold-500/10 font-semibold rounded-xl transition-all text-sm tracking-wide"
              >
                View Projects
              </a>
            </div>
          </div>

          {/* Right Hero Portrait with Image 18 */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end animate-fade-in">
            <div className="relative max-w-sm sm:max-w-md w-full">
              
              {/* Luxury Ambient Glow Behind Card */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-gold-500/25 via-gold-400/10 to-transparent rounded-[2.5rem] blur-2xl -z-10 animate-pulse" />
              
              {/* Outer Glass Card Frame */}
              <div className="relative p-3 sm:p-3.5 rounded-[2rem] bg-gradient-to-b from-gold-500/30 via-navy-800/50 to-gold-500/15 backdrop-blur-xl border border-gold-500/25 shadow-2xl shadow-gold-500/10">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden relative group bg-navy-950">
                  <img
                    src="/images/photo18.jpg"
                    alt="Navdeep Sharma - Software Developer"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Subtle Gradient Shadow at Base */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/20 to-transparent pointer-events-none" />

                  {/* Inside-Image Bottom Tag */}
                  <div className="absolute bottom-3 left-3 right-3 glass-card rounded-xl p-3 border border-gold-500/20 backdrop-blur-md flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gold-400 font-semibold uppercase tracking-wider">Navdeep Sharma</p>
                      <p className="text-xs text-slate-300">Software Developer</p>
                    </div>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  </div>
                </div>

                {/* Floating Top-Left Glass Badge */}
                <div className="absolute -top-4 -left-4 glass-card rounded-xl px-4 py-2.5 flex items-center gap-3 shadow-xl border border-gold-500/30 animate-float">
                  <div className="p-1.5 rounded-lg bg-gold-500/20 text-gold-400">
                    <Cloud className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Deployment</p>
                    <p className="text-xs font-bold text-white">AWS EC2 & S3</p>
                  </div>
                </div>

                {/* Floating Bottom-Right Glass Badge */}
                <div className="absolute -bottom-4 -right-4 glass-card rounded-xl px-4 py-2.5 flex items-center gap-3 shadow-xl border border-gold-500/30">
                  <div className="p-1.5 rounded-lg bg-gold-500/20 text-gold-400">
                    <Star className="w-4 h-4 fill-gold-400" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Experience</p>
                    <p className="text-xs font-bold text-white">3+ Years</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
      
      <a href="#about" className="absolute bottom-4 left-1/2 -translate-x-1/2 text-slate-400 hover:text-gold-400 transition-colors animate-bounce">
        <ArrowDown className="w-6 h-6" />
      </a>
    </section>
  );
}
