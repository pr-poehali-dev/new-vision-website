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
            <span style={{ color: "#b8c4d0", fontStyle: "italic" }}>Взгляд</span>
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