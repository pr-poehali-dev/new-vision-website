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

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-12 md:gap-0">
          {/* LEFT: текст */}
          <div className="flex-1 text-left">
            <p className="animate-fade-up opacity-0 text-[10px] md:text-xs tracking-[0.45em] mb-8 font-light" style={{ color: "rgba(221,230,238,0.55)" }}>
              ОФТАЛЬМОЛОГИЧЕСКАЯ КЛИНИКА
            </p>

            <h1
              className="animate-fade-up-delay opacity-0 font-roboto font-light leading-[0.88] mb-8"
              style={{ fontSize: "clamp(3.5rem, 9vw, 8rem)", color: "#ffffff" }}
            >
              Новый<br />
              <span style={{ color: "#b8c4d0" }}>Взгляд</span>
            </h1>

            <div
              className="my-8 h-px animate-line-grow opacity-0"
              style={{ maxWidth: 100, background: "linear-gradient(90deg, transparent, #b8c4d0, transparent)" }}
            />

            <p className="animate-fade-up-delay2 opacity-0 font-roboto font-light text-lg md:text-xl leading-relaxed max-w-md" style={{ color: "rgba(255,255,255,0.5)" }}>
              Мастерство. Точность. Забота о каждом пациенте.
            </p>

            <div className="animate-fade-up-delay2 opacity-0 mt-12 flex flex-col sm:flex-row gap-4">
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

          {/* RIGHT: анимированный глаз */}
          <div className="flex-1 flex items-center justify-center md:justify-end animate-fade-up-delay2 opacity-0">
            <svg
              viewBox="0 0 400 240"
              style={{ width: "clamp(220px, 38vw, 460px)", filter: "drop-shadow(0 0 40px rgba(184,196,208,0.18))" }}
            >
              <defs>
                {/* белок */}
                <radialGradient id="scleraGrad" cx="50%" cy="45%" r="55%">
                  <stop offset="0%" stopColor="#e8eef4" />
                  <stop offset="70%" stopColor="#ccd6e0" />
                  <stop offset="100%" stopColor="#a8b8c8" />
                </radialGradient>
                {/* радужка — голубо-стальной */}
                <radialGradient id="irisGrad2" cx="42%" cy="38%" r="58%">
                  <stop offset="0%" stopColor="#8fb8d8" />
                  <stop offset="30%" stopColor="#4a85a8" />
                  <stop offset="65%" stopColor="#2a5f80" />
                  <stop offset="100%" stopColor="#0d2a3d" />
                </radialGradient>
                {/* зрачок */}
                <radialGradient id="pupilGrad2" cx="38%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#1a1a2e" />
                  <stop offset="100%" stopColor="#040810" />
                </radialGradient>
                {/* тень века сверху */}
                <radialGradient id="lidShadow" cx="50%" cy="0%" r="80%">
                  <stop offset="0%" stopColor="rgba(4,12,28,0.7)" />
                  <stop offset="100%" stopColor="rgba(4,12,28,0)" />
                </radialGradient>
                {/* форма глаза — клип */}
                <clipPath id="eyeShape">
                  <path d="M 30 120 C 80 30, 320 30, 370 120 C 320 210, 80 210, 30 120 Z" />
                </clipPath>
                {/* клип для век (закрытый) */}
                <clipPath id="lidClipTop">
                  <rect x="0" y="0" width="400" height="120">
                    <animate
                      attributeName="height"
                      from="120"
                      to="0"
                      dur="0.01s"
                      begin="0s"
                      fill="freeze"
                    />
                    <animate
                      attributeName="height"
                      from="0"
                      to="120"
                      dur="1.6s"
                      begin="0.4s"
                      fill="freeze"
                      calcMode="spline"
                      keySplines="0.25 0.1 0.25 1"
                      keyTimes="0;1"
                    />
                  </rect>
                </clipPath>
                <clipPath id="lidClipBottom">
                  <rect x="0" y="120" width="400" height="120">
                    <animate
                      attributeName="y"
                      from="120"
                      to="240"
                      dur="0.01s"
                      begin="0s"
                      fill="freeze"
                    />
                    <animate
                      attributeName="y"
                      from="240"
                      to="120"
                      dur="1.6s"
                      begin="0.4s"
                      fill="freeze"
                      calcMode="spline"
                      keySplines="0.25 0.1 0.25 1"
                      keyTimes="0;1"
                    />
                  </rect>
                </clipPath>
                <filter id="blurSoft">
                  <feGaussianBlur stdDeviation="1.5" />
                </filter>
                <filter id="irisTexture">
                  <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" seed="3" result="noise" />
                  <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
                  <feBlend in="SourceGraphic" in2="grayNoise" mode="overlay" result="blend" />
                  <feComposite in="blend" in2="SourceGraphic" operator="in" />
                </filter>
              </defs>

              {/* === БЕЛОК (видимый через форму глаза) === */}
              <ellipse cx="200" cy="120" rx="175" ry="90" fill="url(#scleraGrad)" clipPath="url(#eyeShape)" />

              {/* прожилки белка */}
              <g clipPath="url(#eyeShape)" opacity="0.18">
                <line x1="100" y1="100" x2="170" y2="118" stroke="#c44" strokeWidth="0.8" />
                <line x1="90" y1="130" x2="165" y2="122" stroke="#c44" strokeWidth="0.6" />
                <line x1="300" y1="105" x2="235" y2="118" stroke="#c44" strokeWidth="0.7" />
                <line x1="310" y1="135" x2="238" y2="120" stroke="#c44" strokeWidth="0.5" />
              </g>

              {/* === РАДУЖКА === */}
              <g clipPath="url(#eyeShape)">
                <circle cx="200" cy="120" r="72" fill="url(#irisGrad2)" />
                {/* текстура радужки — лучи */}
                {Array.from({ length: 24 }).map((_, i) => {
                  const angle = (i * 360) / 24;
                  const rad = (angle * Math.PI) / 180;
                  return (
                    <line
                      key={i}
                      x1={200 + Math.cos(rad) * 20}
                      y1={120 + Math.sin(rad) * 20}
                      x2={200 + Math.cos(rad) * 70}
                      y2={120 + Math.sin(rad) * 70}
                      stroke="rgba(255,255,255,0.07)"
                      strokeWidth="1.2"
                    />
                  );
                })}
                {/* внешний ободок радужки */}
                <circle cx="200" cy="120" r="72" fill="none" stroke="rgba(10,30,50,0.6)" strokeWidth="2.5" />
                {/* внутренний ободок (лимбус) */}
                <circle cx="200" cy="120" r="66" fill="none" stroke="rgba(0,0,0,0.25)" strokeWidth="1" />
              </g>

              {/* === ЗРАЧОК === */}
              <g clipPath="url(#eyeShape)">
                <circle cx="200" cy="120" r="34" fill="url(#pupilGrad2)" />
                {/* блик на зрачке */}
                <ellipse cx="186" cy="108" rx="9" ry="6" fill="rgba(255,255,255,0.55)" style={{ filter: "blur(2px)" }} />
                <ellipse cx="218" cy="132" rx="4" ry="3" fill="rgba(255,255,255,0.15)" style={{ filter: "blur(1px)" }} />
              </g>

              {/* === ТЕНЬ ОТ ВЕРХНЕГО ВЕКА === */}
              <ellipse cx="200" cy="60" rx="170" ry="60" fill="url(#lidShadow)" clipPath="url(#eyeShape)" />

              {/* === ВЕРХНЕЕ ВЕКО (анимированное) === */}
              <g clipPath="url(#lidClipTop)">
                <path
                  d="M 30 120 C 80 30, 320 30, 370 120"
                  fill="#1a2a3a"
                  stroke="none"
                />
                {/* край верхнего века */}
                <path
                  d="M 30 120 C 80 30, 320 30, 370 120"
                  fill="none"
                  stroke="#8a9baa"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                {/* ресницы верхние */}
                {[
                  { cx: 72, cy: 68, rx: 2, ry: 14, rotate: -30 },
                  { cx: 108, cy: 46, rx: 2, ry: 16, rotate: -15 },
                  { cx: 148, cy: 34, rx: 1.8, ry: 15, rotate: -5 },
                  { cx: 190, cy: 30, rx: 1.8, ry: 16, rotate: 0 },
                  { cx: 232, cy: 33, rx: 1.8, ry: 15, rotate: 5 },
                  { cx: 270, cy: 44, rx: 2, ry: 16, rotate: 14 },
                  { cx: 306, cy: 62, rx: 2, ry: 15, rotate: 26 },
                  { cx: 338, cy: 85, rx: 2, ry: 13, rotate: 38 },
                ].map((l, i) => (
                  <ellipse
                    key={i}
                    cx={l.cx} cy={l.cy} rx={l.rx} ry={l.ry}
                    fill="#0d1e2e"
                    transform={`rotate(${l.rotate}, ${l.cx}, ${l.cy})`}
                  />
                ))}
              </g>

              {/* === НИЖНЕЕ ВЕКО (анимированное) === */}
              <g clipPath="url(#lidClipBottom)">
                <path
                  d="M 30 120 C 80 210, 320 210, 370 120"
                  fill="#1a2a3a"
                  stroke="none"
                />
                {/* край нижнего века */}
                <path
                  d="M 30 120 C 80 210, 320 210, 370 120"
                  fill="none"
                  stroke="#6a7f90"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </g>

              {/* === УГОЛКИ ГЛАЗА === */}
              <ellipse cx="36" cy="120" rx="10" ry="6" fill="rgba(180,100,100,0.35)" clipPath="url(#eyeShape)" />
              <ellipse cx="364" cy="120" rx="8" ry="5" fill="rgba(180,100,100,0.25)" clipPath="url(#eyeShape)" />

              {/* === МОРГАНИЕ === */}
              <g>
                {/* верхнее веко моргает */}
                <path d="M 30 120 C 80 30, 320 30, 370 120" fill="#060d1f" clipPath="url(#eyeShape)">
                  <animate
                    attributeName="d"
                    values="M 30 120 C 80 30, 320 30, 370 120;M 30 120 C 80 30, 320 30, 370 120;M 30 120 C 80 120, 320 120, 370 120;M 30 120 C 80 30, 320 30, 370 120"
                    keyTimes="0;0.88;0.93;1"
                    dur="6s"
                    begin="3s"
                    repeatCount="indefinite"
                    calcMode="spline"
                    keySplines="0 0 1 1;0.4 0 0.2 1;0.4 0 0.2 1"
                  />
                </path>
                <path d="M 30 120 C 80 210, 320 210, 370 120" fill="#060d1f" clipPath="url(#eyeShape)">
                  <animate
                    attributeName="d"
                    values="M 30 120 C 80 210, 320 210, 370 120;M 30 120 C 80 210, 320 210, 370 120;M 30 120 C 80 120, 320 120, 370 120;M 30 120 C 80 210, 320 210, 370 120"
                    keyTimes="0;0.88;0.93;1"
                    dur="6s"
                    begin="3s"
                    repeatCount="indefinite"
                    calcMode="spline"
                    keySplines="0 0 1 1;0.4 0 0.2 1;0.4 0 0.2 1"
                  />
                </path>
              </g>
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

        {/* Services */}
        <div ref={servicesSection.ref} className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-0">
          {[
            { icon: "Eye", title: "Диагностика", desc: "Полная диагностика зрения на оборудовании последнего поколения" },
            { icon: "Activity", title: "Лечение", desc: "Консервативное и хирургическое лечение всех патологий глаза" },
            { icon: "Shield", title: "Профилактика", desc: "Программы по сохранению и поддержанию здоровья зрения" },
          ].map((item, i) => (
            <div
              key={i}
              className="p-10 transition-all duration-700 hover:cursor-default group"
              style={{
                borderTop: "1px solid rgba(184,196,208,0.15)",
                borderLeft: i > 0 ? "1px solid rgba(184,196,208,0.1)" : "none",
                borderBottom: "1px solid rgba(184,196,208,0.15)",
                borderRight: i === 2 ? "1px solid rgba(184,196,208,0.15)" : "none",
                background: "rgba(15,32,72,0.2)",
                opacity: servicesSection.inView ? 1 : 0,
                transform: servicesSection.inView ? "translateY(0)" : "translateY(40px)",
                transitionDelay: `${i * 200}ms`,
              }}
            >
              <div className="w-12 h-12 flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110" style={{ border: "1px solid rgba(184,196,208,0.3)" }}>
                <Icon name={item.icon} size={20} style={{ color: "#b8c4d0" }} />
              </div>
              <h3 className="font-roboto text-xl font-light mb-3" style={{ color: "#ffffff" }}>{item.title}</h3>
              <p className="font-light text-sm leading-7" style={{ color: "rgba(255,255,255,0.4)" }}>{item.desc}</p>
            </div>
          ))}
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
              { icon: "MapPin", title: "Адрес", lines: ["ул. Ленина, 1", "Москва, Россия"] },
              { icon: "Phone", title: "Телефон", lines: ["+7 (495) 000-00-00", "Пн–Сб: 9:00 – 20:00"] },
              { icon: "Mail", title: "Email", lines: ["info@noviy-vzglyad.ru", "Ответим в течение дня"] },
            ].map((item, i) => (
              <div
                key={i}
                className="p-10 flex flex-col items-center text-center"
                style={{
                  borderRight: i < 2 ? "1px solid rgba(184,196,208,0.12)" : "none",
                  background: "rgba(15,32,72,0.2)",
                }}
              >
                <div className="w-14 h-14 flex items-center justify-center mb-6 rounded-full" style={{ border: "1px solid rgba(184,196,208,0.3)" }}>
                  <Icon name={item.icon} size={20} style={{ color: "#b8c4d0" }} />
                </div>
                <h3 className="font-roboto text-lg font-light mb-4" style={{ color: "rgba(221,230,238,0.8)" }}>{item.title}</h3>
                {item.lines.map((line, j) => (
                  <p key={j} className="font-light text-sm" style={{ color: j === 0 ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.3)", marginBottom: j === 0 ? 4 : 0 }}>
                    {line}
                  </p>
                ))}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <button
              onClick={() => scrollTo("contacts")}
              className="px-14 py-5 text-xs tracking-[0.3em] font-medium transition-all duration-300 hover:scale-105 hover:brightness-110"
              style={{ background: "linear-gradient(135deg, #8a9baa, #b8c4d0)", color: "#03060f" }}
            >
              ЗАПИСАТЬСЯ НА ПРИЁМ
            </button>
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