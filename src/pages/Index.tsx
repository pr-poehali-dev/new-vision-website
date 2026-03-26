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

  void servicesSection;

  return (
    <div className="min-h-screen font-montserrat" style={{ background: "#f5f3f8" }}>

      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(245,243,248,0.97)" : "transparent",
          borderBottom: scrolled ? "1px solid rgba(107,122,153,0.15)" : "none",
          backdropFilter: scrolled ? "blur(12px)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-20">
          <button onClick={() => scrollTo("home")} className="flex flex-col items-start">
            <span className="font-roboto text-2xl tracking-widest leading-none" style={{ color: "#1a1a2e" }}>
              НОВЫЙ ВЗГЛЯД
            </span>
            <span className="text-[10px] tracking-[0.25em] mt-0.5 font-montserrat font-light" style={{ color: "#3d4f6b" }}>
              ОФТАЛЬМОЛОГИЯ
            </span>
          </button>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="relative text-xs tracking-[0.2em] font-light transition-all duration-300 pb-1"
                style={{ color: activeSection === link.id ? "#1a1a2e" : "#3d4f6b" }}
              >
                {link.label}
                <span
                  className="absolute bottom-0 left-0 h-px transition-all duration-500"
                  style={{ width: activeSection === link.id ? "100%" : "0", background: "#1a1a2e" }}
                />
              </button>
            ))}
          </div>

          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)} style={{ color: "#1a1a2e" }}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden px-6 pb-6 flex flex-col gap-4" style={{ background: "rgba(245,243,248,0.98)" }}>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-left text-sm tracking-[0.2em] py-2 border-b"
                style={{ color: activeSection === link.id ? "#1a1a2e" : "#3d4f6b", borderColor: "rgba(61,79,107,0.2)" }}
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
        {/* Левая половина — текст */}
        <div className="relative z-10 flex-1 px-10 md:px-20 max-w-3xl">
          <p className="animate-fade-up opacity-0 text-[10px] md:text-xs tracking-[0.45em] mb-8 font-light" style={{ color: "#3d4f6b" }}>
            ОФТАЛЬМОЛОГИЧЕСКАЯ КЛИНИКА
          </p>

          <h1
            className="animate-fade-up-delay opacity-0 font-roboto font-light leading-tight mb-6"
            style={{ fontSize: "clamp(3rem, 8vw, 7rem)", color: "#1a1a2e" }}
          >
            Новый взгляд
          </h1>

          <p className="animate-fade-up-delay2 opacity-0 font-roboto font-light text-lg md:text-xl leading-relaxed max-w-md mb-10" style={{ color: "#374151" }}>
            Мастерство. Точность. Забота о каждом пациенте.
          </p>

          <div className="animate-fade-up-delay2 opacity-0 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => scrollTo("contacts")}
              className="px-10 py-4 text-xs tracking-[0.25em] font-medium transition-all duration-300 hover:scale-105"
              style={{ background: "#1a1a2e", color: "#f5f3f8" }}
            >
              ЗАПИСАТЬСЯ НА ПРИЁМ
            </button>
            <button
              onClick={() => scrollTo("about")}
              className="px-10 py-4 text-xs tracking-[0.25em] font-light transition-all duration-300 hover:scale-105"
              style={{ border: "1px solid rgba(26,26,46,0.3)", color: "#1a1a2e", background: "transparent" }}
            >
              О КЛИНИКЕ
            </button>
          </div>
        </div>

        {/* Правая половина — фото */}
        <div className="hidden md:block absolute right-0 top-0 h-full" style={{ width: "45%" }}>
          <img
            src={CLINIC_IMAGE}
            alt="Клиника"
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.9) saturate(0.8)" }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, #f5f3f8 0%, transparent 30%)" }} />
        </div>

        {/* Декоративные линии */}
        <svg className="absolute bottom-20 left-1/3 pointer-events-none" width="300" height="400" viewBox="0 0 300 400" fill="none" style={{ opacity: 0.12 }}>
          <path d="M 150 0 Q 280 100 200 200 Q 120 300 250 400" stroke="#6b7a99" strokeWidth="1.5" fill="none" />
          <path d="M 100 0 Q 230 120 160 220 Q 80 320 210 400" stroke="#6b7a99" strokeWidth="1" fill="none" />
        </svg>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <div className="h-10 w-px" style={{ background: "rgba(107,122,153,0.3)" }} />
          <Icon name="ChevronDown" size={16} style={{ color: "rgba(107,122,153,0.5)" }} />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div ref={aboutSection.ref} className="grid md:grid-cols-2 gap-20 items-center">
          <div
            className="transition-all duration-1000"
            style={{ opacity: aboutSection.inView ? 1 : 0, transform: aboutSection.inView ? "translateX(0)" : "translateX(-50px)" }}
          >
            <p className="text-[10px] tracking-[0.35em] mb-6" style={{ color: "#3d4f6b" }}>О КЛИНИКЕ</p>
            <h2
              className="font-roboto font-light leading-tight mb-8"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "#1a1a2e" }}
            >
              Точность взгляда —<br />
              <span style={{ color: "#3d4f6b", fontStyle: "italic" }}>наша профессия</span>
            </h2>
            <div className="h-px w-16 mb-8" style={{ background: "#6b7a99" }} />
            <p className="font-light text-base leading-8 mb-6" style={{ color: "#374151" }}>
              Клиника «Новый Взгляд» — это передовые технологии в области офтальмологии и команда врачей высшей квалификации. Мы сочетаем многолетний опыт с новейшим оборудованием.
            </p>
            <p className="font-light text-base leading-8" style={{ color: "#374151" }}>
              Каждый пациент для нас — уникальная история. Мы разрабатываем индивидуальный план лечения, чтобы вы видели мир ярко и чётко.
            </p>
          </div>

          <div
            className="relative transition-all duration-1000 delay-300"
            style={{ opacity: aboutSection.inView ? 1 : 0, transform: aboutSection.inView ? "translateX(0)" : "translateX(50px)" }}
          >
            <div className="absolute -inset-3" style={{ border: "1px solid rgba(107,122,153,0.15)" }} />
            <img
              src={CLINIC_IMAGE}
              alt="Клиника Новый Взгляд"
              className="w-full h-80 object-cover relative z-10"
              style={{ filter: "brightness(0.9) saturate(0.8)" }}
            />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 z-0" style={{ border: "1px solid rgba(107,122,153,0.2)" }} />
          </div>
        </div>

        <p className="mt-20 font-roboto font-light text-center" style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.6rem)", color: "#3d4f6b", fontStyle: "italic" }}>
          То, что видели твои глаза, — это есть цена твоей жизни
        </p>

      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-12 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(107,122,153,0.2), transparent)" }} />

      {/* CONTACTS */}
      <section id="contacts" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div ref={contactsSection.ref}>
          <div
            className="text-center mb-20 transition-all duration-1000"
            style={{ opacity: contactsSection.inView ? 1 : 0, transform: contactsSection.inView ? "translateY(0)" : "translateY(30px)" }}
          >
            <p className="text-[10px] tracking-[0.35em] mb-6" style={{ color: "#3d4f6b" }}>СВЯЗЬ С НАМИ</p>
            <h2 className="font-roboto font-light" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "#1a1a2e" }}>
              Контакты
            </h2>
            <div className="h-px mx-auto mt-6" style={{ width: 60, background: "#6b7a99" }} />
          </div>

          <div
            className="grid md:grid-cols-2 transition-all duration-1000 delay-300"
            style={{
              border: "1px solid rgba(107,122,153,0.15)",
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
                  borderRight: i < 1 ? "1px solid rgba(107,122,153,0.12)" : "none",
                  background: "rgba(232,228,240,0.3)",
                }}
              >
                <div className="w-14 h-14 flex items-center justify-center mb-6 rounded-full" style={{ border: "1px solid rgba(107,122,153,0.3)" }}>
                  <Icon name={item.icon} size={20} style={{ color: "#6b7a99" }} />
                </div>
                <h3 className="font-roboto text-lg font-light mb-4" style={{ color: "#1a1a2e" }}>{item.title}</h3>
                {item.lines.map((line, j) => (
                  item.href[j] ? (
                    <a key={j} href={item.href[j]!} className="font-light text-sm" style={{ color: j === 0 ? "#1a1a2e" : "#4b5563", marginBottom: j === 0 ? 4 : 0, display: "block" }}>
                      {line}
                    </a>
                  ) : (
                    <p key={j} className="font-light text-sm" style={{ color: j === 0 ? "#1a1a2e" : "#4b5563", marginBottom: j === 0 ? 4 : 0 }}>
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
      <footer className="py-10 text-center" style={{ borderTop: "1px solid rgba(107,122,153,0.12)" }}>
        <p className="font-roboto text-2xl tracking-widest mb-2" style={{ color: "#1a1a2e" }}>НОВЫЙ ВЗГЛЯД</p>
        <p className="font-light text-xs tracking-widest" style={{ color: "#4b5563" }}>
          © 2025 Офтальмологическая клиника
        </p>
      </footer>

    </div>
  );
}