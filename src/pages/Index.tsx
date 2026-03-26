import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const CLINIC_IMAGE = "https://cdn.poehali.dev/projects/45137477-19ac-4e06-a094-105134d714a8/files/b9974d9e-dcaf-4fec-80d2-46553221e48f.jpg";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, inView };
}

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
      const sections = ["home", "about", "contacts"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const navLinks = [
    { id: "home", label: "Главная" },
    { id: "about", label: "О клинике" },
    { id: "contacts", label: "Контакты" },
  ];

  const aboutSection = useInView();
  const servicesSection = useInView();
  const contactsSection = useInView();

  return (
    <div className="min-h-screen font-montserrat" style={{ background: "#060d1f" }}>

      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(6, 13, 31, 0.97)" : "transparent",
          borderBottom: scrolled ? "1px solid rgba(212, 168, 67, 0.2)" : "none",
          backdropFilter: scrolled ? "blur(12px)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-20">
          <button onClick={() => scrollTo("home")} className="flex flex-col items-start">
            <span className="font-roboto text-2xl tracking-widest leading-none" style={{ color: "#b8c4d0" }}>
              НОВЫЙ ВЗГЛЯД
            </span>
            <span className="text-[10px] tracking-[0.25em] mt-0.5 font-montserrat font-light" style={{ color: "rgba(221,230,238,0.5)" }}>
              ОФТАЛЬМОЛОГИЯ
            </span>
          </button>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="relative text-xs tracking-[0.2em] font-light transition-all duration-300 pb-1"
                style={{ color: activeSection === link.id ? "#b8c4d0" : "rgba(255,255,255,0.65)" }}
              >
                {link.label}
                <span
                  className="absolute bottom-0 left-0 h-px transition-all duration-500"
                  style={{ width: activeSection === link.id ? "100%" : "0", background: "#b8c4d0" }}
                />
              </button>
            ))}
          </div>

          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)} style={{ color: "#b8c4d0" }}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden px-6 pb-6 flex flex-col gap-4" style={{ background: "rgba(6,13,31,0.98)" }}>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-left text-sm tracking-[0.2em] py-2 border-b"
                style={{ color: activeSection === link.id ? "#b8c4d0" : "rgba(255,255,255,0.7)", borderColor: "rgba(184,196,208,0.15)" }}
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={CLINIC_IMAGE} alt="Клиника" className="w-full h-full object-cover" style={{ opacity: 0.15 }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, #03060f 0%, #060d1f 40%, #0f2048 70%, #060d1f 100%)" }} />
        </div>

        {/* Декоративные окружности */}
        {[600, 900, 1200].map((size) => (
          <div
            key={size}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: size, height: size,
              top: "50%", left: "50%",
              transform: "translate(-50%,-50%)",
              border: "1px solid rgba(184,196,208,0.05)",
            }}
          />
        ))}

        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(184,196,208,0.35), transparent)" }} />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <p className="animate-fade-up opacity-0 text-[10px] md:text-xs tracking-[0.45em] mb-8 font-light" style={{ color: "rgba(221,230,238,0.55)" }}>
            ОФТАЛЬМОЛОГИЧЕСКАЯ КЛИНИКА
          </p>

          <h1
            className="animate-fade-up-delay opacity-0 font-roboto font-light leading-[0.88] mb-8"
            style={{ fontSize: "clamp(4rem, 11vw, 9rem)", color: "#ffffff" }}
          >
            Новый<br />
            <span style={{ color: "#b8c4d0" }}>Взгляд</span>
          </h1>

          <div
            className="mx-auto my-8 h-px animate-line-grow opacity-0"
            style={{ maxWidth: 100, background: "linear-gradient(90deg, transparent, #b8c4d0, transparent)" }}
          />

          <p className="animate-fade-up-delay2 opacity-0 font-roboto font-light text-xl md:text-2xl leading-relaxed max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.5)" }}>
            Мастерство. Точность. Забота о каждом пациенте.
          </p>

          <div className="animate-fade-up-delay2 opacity-0 mt-14 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollTo("contacts")}
              className="px-10 py-4 text-xs tracking-[0.25em] font-medium transition-all duration-300 hover:scale-105 hover:brightness-110"
              style={{ background: "linear-gradient(135deg, #8a9baa, #b8c4d0)", color: "#03060f" }}
            >
              ЗАПИСАТЬСЯ НА ПРИЁМ
            </button>
            <button
              onClick={() => scrollTo("about")}
              className="px-10 py-4 text-xs tracking-[0.25em] font-light transition-all duration-300 hover:scale-105"
              style={{ border: "1px solid rgba(184,196,208,0.4)", color: "rgba(221,230,238,0.8)", background: "transparent" }}
            >
              О КЛИНИКЕ
            </button>
          </div>
        </div>

        {/* убрано */}
        <div style={{ display: "none" }}>
          <div>
            <img
              src="https://cdn.poehali.dev/projects/45137477-19ac-4e06-a094-105134d714a8/bucket/14756ba6-0a5c-4d1c-84b9-a31772404fa5.png"
              alt="Глаз"
              style={{
                width: "clamp(240px, 40vw, 480px)",
                mixBlendMode: "multiply",
                filter: "invert(1) brightness(0.85) sepia(0.15) hue-rotate(180deg)",
              }}
            />
            <svg viewBox="0 0 500 320" style={{ display: "none" }}>
              <defs>
                {/* белок */}
                <radialGradient id="sclera" cx="48%" cy="42%" r="60%">
                  <stop offset="0%" stopColor="#f0f4f8" />
                  <stop offset="60%" stopColor="#dde6ee" />
                  <stop offset="100%" stopColor="#b8c8d8" />
                </radialGradient>
                {/* радужка стально-синяя */}
                <radialGradient id="iris" cx="40%" cy="36%" r="62%">
                  <stop offset="0%" stopColor="#a8cce0" />
                  <stop offset="25%" stopColor="#5a9ab8" />
                  <stop offset="55%" stopColor="#2c6888" />
                  <stop offset="85%" stopColor="#113a55" />
                  <stop offset="100%" stopColor="#060d1f" />
                </radialGradient>
                {/* зрачок */}
                <radialGradient id="pupil" cx="36%" cy="32%" r="68%">
                  <stop offset="0%" stopColor="#1c1c30" />
                  <stop offset="100%" stopColor="#02040a" />
                </radialGradient>
                {/* тень от верхнего века */}
                <linearGradient id="lidShad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(2,8,20,0.65)" />
                  <stop offset="100%" stopColor="rgba(2,8,20,0)" />
                </linearGradient>
                {/* блик на веке */}
                <linearGradient id="lidGloss" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                </linearGradient>
                {/* кожа века */}
                <linearGradient id="skinGrad" x1="0.3" y1="0" x2="0.7" y2="1">
                  <stop offset="0%" stopColor="#c8a898" />
                  <stop offset="50%" stopColor="#b89080" />
                  <stop offset="100%" stopColor="#9a7060" />
                </linearGradient>
                {/* форма глаза — миндалевидная, женская */}
                <clipPath id="eyeClipF">
                  <path d="M 40 160 C 100 60, 280 45, 420 100 C 460 118, 465 145, 420 160 C 340 220, 110 230, 40 160 Z" />
                </clipPath>
                {/* клип верхнего века — анимируется */}
                <clipPath id="topLidClip">
                  <rect x="0" y="0" width="500" height="160">
                    <animate attributeName="height" from="160" to="0" dur="0.01s" begin="0s" fill="freeze" />
                    <animate attributeName="height" from="0" to="160" dur="1.8s" begin="0.3s" fill="freeze" calcMode="spline" keySplines="0.22 0.61 0.36 1" keyTimes="0;1" />
                  </rect>
                </clipPath>
                {/* клип нижнего века */}
                <clipPath id="botLidClip">
                  <rect x="0" y="160" width="500" height="160">
                    <animate attributeName="y" from="160" to="320" dur="0.01s" begin="0s" fill="freeze" />
                    <animate attributeName="y" from="320" to="160" dur="1.8s" begin="0.3s" fill="freeze" calcMode="spline" keySplines="0.22 0.61 0.36 1" keyTimes="0;1" />
                  </rect>
                </clipPath>
                <filter id="softBlur" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2.5" />
                </filter>
                <filter id="microBlur" x="-10%" y="-10%" width="120%" height="120%">
                  <feGaussianBlur stdDeviation="1" />
                </filter>
              </defs>

              {/* ── БЕЛОК ── */}
              <ellipse cx="240" cy="160" rx="210" ry="100" fill="url(#sclera)" clipPath="url(#eyeClipF)" />

              {/* прожилки (капилляры) */}
              <g clipPath="url(#eyeClipF)" opacity="0.14">
                <path d="M 90 145 Q 130 148, 165 158" stroke="#cc3333" strokeWidth="0.9" fill="none" />
                <path d="M 80 170 Q 125 165, 162 160" stroke="#cc3333" strokeWidth="0.7" fill="none" />
                <path d="M 380 148 Q 340 153, 310 158" stroke="#cc3333" strokeWidth="0.8" fill="none" />
                <path d="M 375 170 Q 338 165, 308 160" stroke="#cc3333" strokeWidth="0.6" fill="none" />
                <path d="M 200 135 Q 215 140, 220 155" stroke="#cc3333" strokeWidth="0.5" fill="none" />
              </g>

              {/* ── РАДУЖКА ── */}
              <g clipPath="url(#eyeClipF)">
                <circle cx="230" cy="158" r="85" fill="url(#iris)" />
                {/* волокна радужки */}
                {Array.from({ length: 32 }).map((_, i) => {
                  const a = (i * 360) / 32;
                  const r = (a * Math.PI) / 180;
                  const inner = 28, outer = 82;
                  return (
                    <line key={i}
                      x1={230 + Math.cos(r) * inner} y1={158 + Math.sin(r) * inner}
                      x2={230 + Math.cos(r) * outer} y2={158 + Math.sin(r) * outer}
                      stroke={i % 3 === 0 ? "rgba(255,255,255,0.11)" : "rgba(255,255,255,0.055)"}
                      strokeWidth={i % 5 === 0 ? "1.4" : "0.8"}
                    />
                  );
                })}
                {/* кольца радужки */}
                <circle cx="230" cy="158" r="60" fill="none" stroke="rgba(0,30,60,0.3)" strokeWidth="1.2" />
                <circle cx="230" cy="158" r="82" fill="none" stroke="rgba(0,10,30,0.55)" strokeWidth="3" />
                {/* внешнее свечение лимбуса */}
                <circle cx="230" cy="158" r="85" fill="none" stroke="rgba(40,100,140,0.2)" strokeWidth="5" />
              </g>

              {/* ── ЗРАЧОК ── */}
              <g clipPath="url(#eyeClipF)">
                <circle cx="230" cy="158" r="40" fill="url(#pupil)" />
                {/* главный блик */}
                <ellipse cx="214" cy="143" rx="11" ry="7" fill="rgba(255,255,255,0.65)" filter="url(#softBlur)" />
                {/* малый блик */}
                <ellipse cx="248" cy="168" rx="5" ry="3.5" fill="rgba(255,255,255,0.22)" filter="url(#microBlur)" />
              </g>

              {/* ── ТЕНЬ ВЕРХНЕГО ВЕКА НА ГЛАЗ ── */}
              <rect x="30" y="40" width="450" height="100" fill="url(#lidShad)" clipPath="url(#eyeClipF)" />

              {/* ── УГОЛКИ ── */}
              <ellipse cx="46" cy="160" rx="14" ry="8" fill="rgba(190,110,110,0.45)" clipPath="url(#eyeClipF)" filter="url(#microBlur)" />
              <ellipse cx="432" cy="132" rx="10" ry="7" fill="rgba(190,110,110,0.3)" clipPath="url(#eyeClipF)" filter="url(#microBlur)" />

              {/* ── ВЕРХНЕЕ ВЕКО — КОЖА (анимировано) ── */}
              <g clipPath="url(#topLidClip)">
                {/* основа кожи века */}
                <path
                  d="M 40 160 C 100 60, 280 45, 420 100 C 460 118, 465 145, 420 160 L 500 0 L 0 0 Z"
                  fill="url(#skinGrad)"
                />
                {/* блеск на веке */}
                <path
                  d="M 100 110 C 180 72, 310 65, 400 108"
                  fill="none" stroke="url(#lidGloss)" strokeWidth="6" strokeLinecap="round" opacity="0.6"
                />
                {/* линия века / стрелка */}
                <path
                  d="M 40 160 C 100 60, 280 45, 420 100 C 455 115, 468 138, 440 148"
                  fill="none"
                  stroke="#1a0a14"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                {/* стрелка — хвостик */}
                <path
                  d="M 440 148 C 455 142, 472 135, 480 120"
                  fill="none"
                  stroke="#1a0a14"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* ── РЕСНИЦЫ верхние — изогнутые, густые ── */}
                {[
                  { x1: 80,  y1: 142, x2: 62,  y2: 98,  cx1: 72,  cy1: 118, cx2: 60,  cy2: 106 },
                  { x1: 110, y1: 118, x2: 96,  y2: 72,  cx1: 100, cy1: 94,  cx2: 92,  cy2: 80  },
                  { x1: 145, y1: 98,  x2: 136, y2: 50,  cx1: 138, cy1: 74,  cx2: 132, cy2: 60  },
                  { x1: 182, y1: 82,  x2: 178, y2: 32,  cx1: 178, cy1: 58,  cx2: 175, cy2: 44  },
                  { x1: 220, y1: 72,  x2: 222, y2: 20,  cx1: 218, cy1: 46,  cx2: 218, cy2: 32  },
                  { x1: 258, y1: 66,  x2: 268, y2: 14,  cx1: 260, cy1: 40,  cx2: 262, cy2: 26  },
                  { x1: 295, y1: 66,  x2: 312, y2: 18,  cx1: 300, cy1: 42,  cx2: 308, cy2: 28  },
                  { x1: 330, y1: 72,  x2: 354, y2: 28,  cx1: 338, cy1: 48,  cx2: 348, cy2: 36  },
                  { x1: 363, y1: 84,  x2: 392, y2: 44,  cx1: 372, cy1: 62,  cx2: 384, cy2: 50  },
                  { x1: 392, y1: 100, x2: 424, y2: 64,  cx1: 402, cy1: 80,  cx2: 414, cy2: 68  },
                  { x1: 414, y1: 118, x2: 448, y2: 90,  cx1: 424, cy1: 102, cx2: 438, cy2: 94  },
                ].map((l, i) => (
                  <path
                    key={i}
                    d={`M ${l.x1} ${l.y1} C ${l.cx1} ${l.cy1}, ${l.cx2} ${l.cy2}, ${l.x2} ${l.y2}`}
                    fill="none"
                    stroke="#0d0810"
                    strokeWidth={i >= 3 && i <= 7 ? "3.2" : "2.4"}
                    strokeLinecap="round"
                  />
                ))}

                {/* второй ряд ресниц — чуть короче для объёма */}
                {[
                  { x1: 96,  y1: 130, x2: 82,  y2: 96  },
                  { x1: 128, y1: 108, x2: 118, y2: 74  },
                  { x1: 163, y1: 90,  x2: 158, y2: 56  },
                  { x1: 200, y1: 77,  x2: 200, y2: 42  },
                  { x1: 238, y1: 69,  x2: 243, y2: 34  },
                  { x1: 276, y1: 67,  x2: 288, y2: 32  },
                  { x1: 312, y1: 69,  x2: 330, y2: 36  },
                  { x1: 346, y1: 78,  x2: 368, y2: 46  },
                  { x1: 377, y1: 92,  x2: 404, y2: 62  },
                  { x1: 403, y1: 109, x2: 432, y2: 80  },
                ].map((l, i) => (
                  <line
                    key={i}
                    x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
                    stroke="#0d0810"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    opacity="0.7"
                  />
                ))}
              </g>

              {/* ── НИЖНЕЕ ВЕКО — КОЖА (анимировано) ── */}
              <g clipPath="url(#botLidClip)">
                <path
                  d="M 40 160 C 110 230, 340 220, 420 160 C 465 145, 465 145, 420 160 L 500 320 L 0 320 Z"
                  fill="url(#skinGrad)"
                  opacity="0.85"
                />
                {/* линия нижнего века */}
                <path
                  d="M 40 160 C 110 228, 340 218, 420 160"
                  fill="none"
                  stroke="rgba(20,10,18,0.55)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                {/* нижние ресницы — короткие */}
                {[
                  { x1: 108, y1: 178, x2: 102, y2: 200 },
                  { x1: 148, y1: 188, x2: 144, y2: 212 },
                  { x1: 192, y1: 194, x2: 190, y2: 218 },
                  { x1: 238, y1: 196, x2: 238, y2: 220 },
                  { x1: 282, y1: 193, x2: 285, y2: 217 },
                  { x1: 324, y1: 186, x2: 330, y2: 208 },
                  { x1: 362, y1: 175, x2: 370, y2: 197 },
                ].map((l, i) => (
                  <line
                    key={i}
                    x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
                    stroke="#0d0810"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    opacity="0.55"
                  />
                ))}
              </g>

              {/* ── МОРГАНИЕ (повторяющееся) ── */}
              {/* верхнее веко закрывает */}
              <path d="M 40 160 C 100 60, 280 45, 420 100 C 460 118, 465 145, 420 160 L 500 0 L 0 0 Z" fill="url(#skinGrad)">
                <animate
                  attributeName="d"
                  values="
                    M 40 160 C 100 60, 280 45, 420 100 C 460 118, 465 145, 420 160 L 500 0 L 0 0 Z;
                    M 40 160 C 100 60, 280 45, 420 100 C 460 118, 465 145, 420 160 L 500 0 L 0 0 Z;
                    M 40 160 C 110 150, 310 148, 420 160 L 500 0 L 0 0 Z;
                    M 40 160 C 100 60, 280 45, 420 100 C 460 118, 465 145, 420 160 L 500 0 L 0 0 Z
                  "
                  keyTimes="0;0.87;0.92;1"
                  dur="7s"
                  begin="2.5s"
                  repeatCount="indefinite"
                  calcMode="spline"
                  keySplines="0 0 1 1;0.3 0 0.1 1;0.3 0 0.7 1"
                />
              </path>
              {/* нижнее веко закрывает */}
              <path d="M 40 160 C 110 230, 340 220, 420 160 L 500 320 L 0 320 Z" fill="url(#skinGrad)" opacity="0.85">
                <animate
                  attributeName="d"
                  values="
                    M 40 160 C 110 230, 340 220, 420 160 L 500 320 L 0 320 Z;
                    M 40 160 C 110 230, 340 220, 420 160 L 500 320 L 0 320 Z;
                    M 40 160 C 110 168, 340 166, 420 160 L 500 320 L 0 320 Z;
                    M 40 160 C 110 230, 340 220, 420 160 L 500 320 L 0 320 Z
                  "
                  keyTimes="0;0.87;0.92;1"
                  dur="7s"
                  begin="2.5s"
                  repeatCount="indefinite"
                  calcMode="spline"
                  keySplines="0 0 1 1;0.3 0 0.1 1;0.3 0 0.7 1"
                />
              </path>
            </svg>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <div className="h-10 w-px" style={{ background: "rgba(184,196,208,0.3)" }} />
          <Icon name="ChevronDown" size={16} style={{ color: "rgba(184,196,208,0.35)" }} />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div ref={aboutSection.ref} className="grid md:grid-cols-2 gap-20 items-center">
          <div
            className="transition-all duration-1000"
            style={{ opacity: aboutSection.inView ? 1 : 0, transform: aboutSection.inView ? "translateX(0)" : "translateX(-50px)" }}
          >
            <p className="text-[10px] tracking-[0.35em] mb-6" style={{ color: "rgba(184,196,208,0.6)" }}>О КЛИНИКЕ</p>
            <h2
              className="font-roboto font-light leading-tight mb-8"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "#ffffff" }}
            >
              Точность взгляда —<br />
              <span style={{ color: "#b8c4d0", fontStyle: "italic" }}>наша профессия</span>
            </h2>
            <div className="h-px w-16 mb-8" style={{ background: "#b8c4d0" }} />
            <p className="font-light text-base leading-8 mb-6" style={{ color: "rgba(255,255,255,0.55)" }}>
              Клиника «Новый Взгляд» — это передовые технологии в области офтальмологии и команда врачей высшей квалификации. Мы сочетаем многолетний опыт с новейшим оборудованием.
            </p>
            <p className="font-light text-base leading-8" style={{ color: "rgba(255,255,255,0.55)" }}>
              Каждый пациент для нас — уникальная история. Мы разрабатываем индивидуальный план лечения, чтобы вы видели мир ярко и чётко.
            </p>
          </div>

          <div
            className="relative transition-all duration-1000 delay-300"
            style={{ opacity: aboutSection.inView ? 1 : 0, transform: aboutSection.inView ? "translateX(0)" : "translateX(50px)" }}
          >
            <div className="absolute -inset-3" style={{ border: "1px solid rgba(184,196,208,0.12)" }} />
            <img
              src={CLINIC_IMAGE}
              alt="Клиника Новый Взгляд"
              className="w-full h-80 object-cover relative z-10"
              style={{ filter: "brightness(0.65) saturate(0.75)" }}
            />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 z-0" style={{ border: "1px solid rgba(184,196,208,0.18)" }} />
          </div>
        </div>


      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-12 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(184,196,208,0.18), transparent)" }} />

      {/* CONTACTS */}
      <section id="contacts" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div ref={contactsSection.ref}>
          <div
            className="text-center mb-20 transition-all duration-1000"
            style={{ opacity: contactsSection.inView ? 1 : 0, transform: contactsSection.inView ? "translateY(0)" : "translateY(30px)" }}
          >
            <p className="text-[10px] tracking-[0.35em] mb-6" style={{ color: "rgba(184,196,208,0.6)" }}>СВЯЗЬ С НАМИ</p>
            <h2 className="font-roboto font-light" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "#ffffff" }}>
              Контакты
            </h2>
            <div className="h-px mx-auto mt-6" style={{ width: 60, background: "#b8c4d0" }} />
          </div>

          <div
            className="grid md:grid-cols-3 transition-all duration-1000 delay-300"
            style={{
              border: "1px solid rgba(184,196,208,0.15)",
              opacity: contactsSection.inView ? 1 : 0,
              transform: contactsSection.inView ? "translateY(0)" : "translateY(40px)",
            }}
          >
            {[
              { icon: "Phone", title: "Телефон", lines: ["+7 922 266-09-99", "Пн–Сб: 9:00 – 20:00"], href: ["tel:+79222660999", null] },
              { icon: "Mail", title: "Email", lines: ["oftalmorus@gmail.com", "Ответим в течение дня"], href: ["mailto:oftalmorus@gmail.com", null] },
            ].map((item, i) => (
              <div
                key={i}
                className="p-10 flex flex-col items-center text-center"
                style={{
                  borderRight: i < 1 ? "1px solid rgba(184,196,208,0.12)" : "none",
                  background: "rgba(15,32,72,0.2)",
                }}
              >
                <div className="w-14 h-14 flex items-center justify-center mb-6 rounded-full" style={{ border: "1px solid rgba(184,196,208,0.3)" }}>
                  <Icon name={item.icon} size={20} style={{ color: "#b8c4d0" }} />
                </div>
                <h3 className="font-roboto text-lg font-light mb-4" style={{ color: "rgba(221,230,238,0.8)" }}>{item.title}</h3>
                {item.lines.map((line, j) => (
                  item.href[j] ? (
                    <a key={j} href={item.href[j]!} className="font-light text-sm" style={{ color: j === 0 ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.3)", marginBottom: j === 0 ? 4 : 0, display: "block" }}>
                      {line}
                    </a>
                  ) : (
                    <p key={j} className="font-light text-sm" style={{ color: j === 0 ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.3)", marginBottom: j === 0 ? 4 : 0 }}>
                      {line}
                    </p>
                  )
                ))}
              </div>
            ))}
          </div>


        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 text-center" style={{ borderTop: "1px solid rgba(184,196,208,0.1)" }}>
        <p className="font-roboto text-2xl tracking-widest mb-2" style={{ color: "#b8c4d0" }}>НОВЫЙ ВЗГЛЯД</p>
        <p className="font-light text-xs tracking-widest" style={{ color: "rgba(255,255,255,0.2)" }}>
          © 2026 — ОФТАЛЬМОЛОГИЧЕСКАЯ КЛИНИКА
        </p>
      </footer>
    </div>
  );
}