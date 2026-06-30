"use client";

import { useEffect, useRef, useState } from "react";
import { ExternalLink, Layers, Shield, Train, ShoppingCart, Utensils } from "lucide-react";

const projects = [
  {
    name: "HAHW (Hot Axle Hot Wheel)",
    tagline: "Indian Railways IoT Monitoring System",
    description: "India's first Indian Railway certified IoT-based monitoring system for train axle, brake, wheel, and track temperatures. Features RFID integration for asset tracking and real-time alarms with SMS notifications to prevent accidents.",
    icon: Train,
    tech: ["Node.js", "Express", "MongoDB", "Socket.io", "AWS S3", "RFID", "SMS APIs"],
    color: "from-orange-500/20 to-red-500/20",
    accent: "text-orange-400",
  },
  {
    name: "FARMLANDBAZAAR",
    tagline: "Real Estate Platform",
    description: "Subscription-based real estate platform enabling brokerage-free property buying and selling. Features live chat between buyers and sellers, integrated payment gateways, and Google Maps geolocation services.",
    icon: ShoppingCart,
    tech: ["Node.js", "Express", "MongoDB", "Socket.io", "Payment Gateway", "Google Maps"],
    color: "from-green-500/20 to-emerald-500/20",
    accent: "text-green-400",
  },
  {
    name: "Indian Railway Canteen Management",
    tagline: "Meal Pre-ordering System",
    description: "Mobile app for Indian Railway employees to pre-order meals. Admin web application with real-time order management and Bill Desk payment gateway integration.",
    icon: Utensils,
    tech: ["Node.js", "Express", "MongoDB", "Bill Desk API", "Real-time"],
    color: "from-blue-500/20 to-cyan-500/20",
    accent: "text-blue-400",
  },
  {
    name: "Railway Grievance Management",
    tagline: "Employee Grievance System",
    description: "Mobile app enabling railway employees to raise grievances in their departments. Admins and superiors can solve and manage grievances via web app with real-time tracking and geolocation.",
    icon: Layers,
    tech: ["NestJS", "MongoDB", "Geolocation", "Real-time Tracking"],
    color: "from-purple-500/20 to-violet-500/20",
    accent: "text-purple-400",
  },
  {
    name: "CYBERYAMI",
    tagline: "Cybersecurity Learning Platform",
    description: "All-in-one cybersecurity platform for learning, practice, and certification. Built with scalable microservices architecture on AWS for high availability and performance.",
    icon: Shield,
    tech: ["Node.js", "Express", "AWS", "Microservices", "Cloud"],
    color: "from-cyan-500/20 to-blue-500/20",
    accent: "text-cyan-400",
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="relative py-24 lg:py-32 bg-navy-950/50">
      <div className="max-w-7xl mx-auto section-padding">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="text-gold-400 text-sm font-semibold tracking-widest uppercase">Projects</span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3">
            Featured <span className="text-gradient">Work</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
            A selection of products I've built and contributed to, from railway safety systems to real estate platforms.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <div
              key={i}
              className={`group glass-card rounded-2xl p-6 transition-all duration-700 hover:border-gold-500/30 hover:shadow-xl hover:shadow-gold-500/5 hover:-translate-y-1 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <project.icon className={`w-6 h-6 ${project.accent}`} />
              </div>
              <h3 className="font-serif text-xl font-bold text-white mb-1">{project.name}</h3>
              <p className={`text-sm font-medium ${project.accent} mb-3`}>{project.tagline}</p>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tech.map((t, ti) => (
                  <span key={ti} className="px-2 py-1 bg-navy-800/80 rounded-md text-[11px] text-slate-300 border border-navy-700">
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 text-gold-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                <span>View Details</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
