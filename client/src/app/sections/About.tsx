"use client";

import { useEffect, useRef, useState } from "react";
import { Award, GraduationCap, BookOpen } from "lucide-react";

const accomplishments = [
  { icon: Award, text: "ELSA Certificate (Career Development)" },
  { icon: BookOpen, text: "Developer Student Club Certificate" },
  { icon: GraduationCap, text: "Microsoft Learn Student Ambassador" },
];

const galleryPhotos = [
  {
    src: "/images/photo8.jpg",
    tag: "Focus",
    title: "Software Engineer",
    desc: "Problem solving, systems architecture & high-reliability code",
  },
  {
    src: "/images/photo7.jpg",
    tag: "Presence",
    title: "Professional",
    desc: "Thoughtful collaboration, agile teamwork & leadership",
  },
  {
    src: "/images/photo2.jpg",
    tag: "Perspective",
    title: "Travel & Life",
    desc: "Curiosity, continuous learning & exploring new horizons",
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activePhoto, setActivePhoto] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto section-padding relative z-10">
        <div className={`grid lg:grid-cols-12 gap-12 lg:gap-16 items-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-gold-400 text-sm font-semibold tracking-widest uppercase">About Me</span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Dedicated to Building <span className="text-gradient">Reliable Solutions</span>
            </h2>
            
            <div className="space-y-4 text-slate-400 leading-relaxed text-base sm:text-lg">
              <p>
                I am a Software Developer with 3 years of experience building scalable, real-time, and secure web applications. My journey has taken me from intensive training at FunctionUp to leading backend development at FictiveBox Digital, where I work on India's first Railway-certified IoT monitoring systems.
              </p>
              <p>
                I focus on delivering reliable solutions that support team goals and contribute to long-term success. I value clear communication, strong work ethics, and thoughtful collaboration—while taking initiative and stepping into leadership when needed.
              </p>
              <p>
                From deploying production web applications on AWS EC2 with automated CI/CD pipelines to real-time Socket.io communication and cloud microservices, I bring a versatile skill set that ensures reliable, scalable delivery.
              </p>
            </div>

            {/* Quote / Mission Card */}
            <div className="glass-card rounded-2xl p-5 border-l-4 border-l-gold-400 my-4">
              <p className="font-serif italic text-slate-300 text-sm sm:text-base">
                "Crafting resilient systems that power real-world operations—from railway safety networks to high-concurrency cloud platforms."
              </p>
              <span className="text-xs text-gold-400 font-semibold tracking-wide uppercase mt-2 block">— Navdeep Sharma</span>
            </div>
            
            <div className="grid sm:grid-cols-3 gap-4 pt-2">
              {accomplishments.map((item, i) => (
                <div key={i} className="glass-card rounded-xl p-4 flex items-start gap-3">
                  <item.icon className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-300">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Interactive Photo Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative max-w-md mx-auto">
              
              {/* Luxury Frame */}
              <div className="relative p-3 rounded-3xl bg-gradient-to-b from-gold-500/25 via-navy-800/40 to-gold-500/10 backdrop-blur-xl border border-gold-500/20 shadow-2xl shadow-gold-500/10">
                {/* Interactive Photo Selector Tabs Header */}
                <div className="flex items-center justify-between px-2 pt-1 pb-2.5">
                  <span className="text-[11px] font-semibold text-gold-400 uppercase tracking-wider">Photo Gallery</span>
                  <div className="flex items-center gap-1.5">
                    {galleryPhotos.map((photo, index) => (
                      <button
                        key={index}
                        onClick={() => setActivePhoto(index)}
                        className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all ${
                          activePhoto === index
                            ? "bg-gradient-to-r from-gold-500 to-gold-400 text-navy-950 font-semibold shadow-md shadow-gold-500/20 scale-105"
                            : "bg-navy-900/80 text-slate-400 hover:text-white border border-white/5"
                        }`}
                      >
                        {photo.tag}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="aspect-[4/5] rounded-2xl overflow-hidden relative group bg-navy-950">
                  <img
                    key={activePhoto}
                    src={galleryPhotos[activePhoto].src}
                    alt={galleryPhotos[activePhoto].title}
                    className="w-full h-full object-cover transition-all duration-700 animate-fade-in"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/20 to-transparent pointer-events-none" />

                  {/* Photo Caption Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 glass-card rounded-xl p-3 border border-white/10 backdrop-blur-md">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-semibold text-gold-400 tracking-wider uppercase">
                        {galleryPhotos[activePhoto].tag}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        0{activePhoto + 1} / 0{galleryPhotos.length}
                      </span>
                    </div>
                    <p className="text-xs text-slate-200 leading-snug">{galleryPhotos[activePhoto].desc}</p>
                  </div>
                </div>
              </div>

              {/* Metric Badges */}
              <div className="absolute -bottom-4 -left-4 glass-card rounded-xl px-4 py-2.5 shadow-2xl border border-gold-500/25 hidden sm:flex items-center gap-3">
                <div className="text-2xl font-bold text-gold-400">3+</div>
                <div className="text-xs text-slate-400 leading-tight">Years<br/>Experience</div>
              </div>
              <div className="absolute -top-4 -right-4 glass-card rounded-xl px-4 py-2.5 shadow-2xl border border-gold-500/25 hidden sm:flex items-center gap-3">
                <div className="text-2xl font-bold text-gold-400">5+</div>
                <div className="text-xs text-slate-400 leading-tight">Products<br/>Built</div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
