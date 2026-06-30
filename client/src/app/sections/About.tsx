"use client";

import { useEffect, useRef, useState } from "react";
import { Award, GraduationCap, BookOpen } from "lucide-react";

const accomplishments = [
  { icon: Award, text: "ELSA Certificate (Career Development)" },
  { icon: BookOpen, text: "Developer Student Club Certificate" },
  { icon: GraduationCap, text: "Microsoft Learn Student Ambassador" },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto section-padding">
        <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="space-y-6">
            <span className="text-gold-400 text-sm font-semibold tracking-widest uppercase">About Me</span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Dedicated to Building <span className="text-gradient">Reliable Solutions</span>
            </h2>
            <div className="space-y-4 text-slate-400 leading-relaxed">
              <p>
                I am a Backend Developer with 3 years of experience building scalable, real-time, and secure web applications. My journey has taken me from intensive training at FunctionUp to leading backend development at FictiveBox Digital, where I work on India's first Railway-certified IoT monitoring systems.
              </p>
              <p>
                I focus on delivering reliable solutions that support team goals and contribute to long-term success. I value clear communication, strong work ethics, and thoughtful collaboration—while taking initiative and stepping into leadership when needed.
              </p>
              <p>
                From real-time Socket.io chat systems to microservices architecture on AWS, I bring a versatile skill set that adapts to the project's needs.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-3 gap-4 pt-4">
              {accomplishments.map((item, i) => (
                <div key={i} className="glass-card rounded-xl p-4 flex items-start gap-3">
                  <item.icon className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-300">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-gold-500/20 shadow-2xl shadow-gold-500/5">
              <img
                src="/images/photo2.jpg"
                alt="Navdeep Sharma"
                className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-6 -left-6 glass-card rounded-xl p-6 hidden lg:block">
              <div className="text-3xl font-bold text-gold-400">3+</div>
              <div className="text-sm text-slate-400">Years Experience</div>
            </div>
            <div className="absolute -top-6 -right-6 glass-card rounded-xl p-6 hidden lg:block">
              <div className="text-3xl font-bold text-gold-400">5+</div>
              <div className="text-sm text-slate-400">Products Built</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
