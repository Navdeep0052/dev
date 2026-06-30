"use client";

import { useEffect, useRef, useState } from "react";
import { Briefcase, Calendar, ChevronRight, Building2 } from "lucide-react";

const experiences = [
  {
    role: "Backend Developer",
    company: "FictiveBox Digital",
    period: "March 2024 – Present",
    location: "India",
    highlights: [
      "Leading backend development for India's first Railway-certified IoT monitoring system (HAHW)",
      "Built real-time alarm and notification systems using Socket.io for critical railway safety",
      "Integrated RFID tracking, AWS S3 storage, and third-party SMS APIs",
      "Developed FARMLANDBAZAAR real estate platform with live chat and payment gateways",
      "Built Indian Railway Canteen & Grievance Management systems with real-time tracking",
    ],
    tech: ["Node.js", "Express", "MongoDB", "Socket.io", "AWS S3", "NestJS", "Payment Gateways"],
  },
  {
    role: "Backend Developer",
    company: "Dream Big IT Solution – Noida",
    period: "May 2023 – March 2024",
    location: "Noida, India",
    highlights: [
      "Developed CYBERYAMI, an all-in-one cybersecurity learning and certification platform",
      "Built scalable backend architecture using Node.js, Express, and AWS Microservices",
      "Implemented cloud-based solutions to enhance platform productivity and reliability",
    ],
    tech: ["Node.js", "Express", "AWS", "Microservices"],
  },
  {
    role: "Backend Developer Trainee",
    company: "FunctionUp",
    period: "July 2022 – April 2023",
    location: "India",
    highlights: [
      "Intensive training in Node.js, Express, and MongoDB backend development",
      "Gained proficiency in Git version control, teamwork, and agile delivery practices",
      "Built foundational skills in data structures, algorithms, and object-oriented programming",
    ],
    tech: ["Node.js", "Express", "MongoDB", "Git", "DSA", "OOP"],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto section-padding">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="text-gold-400 text-sm font-semibold tracking-widest uppercase">Experience</span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3">
            Professional <span className="text-gradient">Journey</span>
          </h2>
        </div>

        <div className={`grid lg:grid-cols-12 gap-8 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {/* Timeline tabs */}
          <div className="lg:col-span-4 space-y-3">
            {experiences.map((exp, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`w-full text-left p-4 rounded-xl transition-all border ${
                  activeIndex === i
                    ? "bg-gold-500/10 border-gold-500/30 shadow-lg shadow-gold-500/5"
                    : "bg-navy-800/30 border-transparent hover:bg-navy-800/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${activeIndex === i ? "bg-gold-500/20 text-gold-400" : "bg-navy-700 text-slate-400"}`}>
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className={`font-semibold text-sm ${activeIndex === i ? "text-white" : "text-slate-300"}`}>
                      {exp.company}
                    </div>
                    <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <Calendar className="w-3 h-3" /> {exp.period}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Detail card */}
          <div className="lg:col-span-8">
            <div className="glass-card rounded-2xl p-6 sm:p-8 h-full">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-white">{experiences[activeIndex].role}</h3>
                  <p className="text-gold-400 font-medium mt-1">{experiences[activeIndex].company}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-slate-400">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {experiences[activeIndex].period}</span>
                    <span>{experiences[activeIndex].location}</span>
                  </div>
                </div>
                <div className="p-3 bg-gold-500/10 rounded-xl hidden sm:block">
                  <Briefcase className="w-6 h-6 text-gold-400" />
                </div>
              </div>

              <div className="space-y-3 mb-8">
                {experiences[activeIndex].highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <ChevronRight className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                    <p className="text-slate-300 text-sm leading-relaxed">{h}</p>
                  </div>
                ))}
              </div>

              <div>
                <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Technologies</span>
                <div className="flex flex-wrap gap-2 mt-3">
                  {experiences[activeIndex].tech.map((t, i) => (
                    <span key={i} className="px-3 py-1.5 bg-navy-800 border border-navy-600 rounded-lg text-xs text-gold-300 font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
