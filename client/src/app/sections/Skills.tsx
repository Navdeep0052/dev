"use client";

import { useEffect, useRef, useState } from "react";
import { 
  Code, Server, Database, Cloud, GitBranch, 
  Layers, Zap, CreditCard, Globe, Layout, Settings, Users 
} from "lucide-react";

const skillCategories = [
  {
    title: "Languages & Frameworks",
    skills: [
      { name: "JavaScript", icon: Code, level: 95 },
      { name: "Node.js", icon: Server, level: 95 },
      { name: "Express", icon: Zap, level: 90 },
      { name: "NestJS", icon: Layers, level: 80 },
      { name: "HTML / CSS", icon: Layout, level: 85 },
    ],
  },
  {
    title: "Databases & Storage",
    skills: [
      { name: "MongoDB", icon: Database, level: 92 },
      { name: "SQL", icon: Database, level: 78 },
      { name: "AWS S3", icon: Cloud, level: 85 },
    ],
  },
  {
    title: "Tools & Architecture",
    skills: [
      { name: "Git", icon: GitBranch, level: 90 },
      { name: "Socket.io", icon: Zap, level: 92 },
      { name: "Microservices", icon: Layers, level: 82 },
      { name: "Payment Gateways", icon: CreditCard, level: 80 },
      { name: "Third-Party APIs", icon: Globe, level: 88 },
    ],
  },
  {
    title: "Core Concepts",
    skills: [
      { name: "Data Structures & Algorithms", icon: Code, level: 85 },
      { name: "OOP", icon: Settings, level: 90 },
      { name: "Teamwork", icon: Users, level: 95 },
      { name: "Leadership", icon: Users, level: 85 },
      { name: "Time Management", icon: Settings, level: 90 },
    ],
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="relative py-24 lg:py-32 bg-navy-950/50">
      <div className="max-w-7xl mx-auto section-padding">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="text-gold-400 text-sm font-semibold tracking-widest uppercase">Skills</span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3">
            Technical <span className="text-gradient">Expertise</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
            A versatile skill set built through hands-on experience across multiple products and platforms.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, ci) => (
            <div
              key={ci}
              className={`glass-card rounded-2xl p-6 sm:p-8 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${ci * 150}ms` }}
            >
              <h3 className="font-serif text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <span className="w-8 h-0.5 bg-gold-400" />
                {category.title}
              </h3>
              <div className="space-y-5">
                {category.skills.map((skill, si) => (
                  <div key={si} className="group">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <skill.icon className="w-4 h-4 text-gold-400" />
                        <span className="text-slate-300 font-medium text-sm">{skill.name}</span>
                      </div>
                      <span className="text-gold-400 text-sm font-semibold">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 bg-navy-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-gold-500 to-gold-300 rounded-full transition-all duration-1000 ease-out group-hover:from-gold-400 group-hover:to-gold-200"
                        style={{ width: isVisible ? `${skill.level}%` : "0%", transitionDelay: `${ci * 150 + si * 100 + 300}ms` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
