import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion, MotionConfig, useReducedMotion, useScroll } from "framer-motion";
import { useRef, useState, useEffect, type TouchEvent } from "react";
import {
  Scissors,
  Star,
  Calendar,
  Phone,
  Check,
  Clock,
  MapPin,
  Menu,
  X,
  ArrowUp,
  ArrowUpRight,
  Volume2,
  VolumeX,
  CreditCard,
  Wifi,
  Pause,
  Play,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { reviews, type Review } from "@/data/reviews";

const WHATSAPP_NUMBER = "5511931458599";
const DEFAULT_WHATSAPP_MESSAGE = "Olá, gostaria de agendar um horário";

const whatsappUrl = (message: string) => {
  const messageWithExclamation = `${message.trim().replace(/!+$/, "")}!`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(messageWithExclamation)}`;
};

const ADDRESS = "Rua Piratininga, 487 — Barcelona";
const ADDRESS_CITY = "São Caetano do Sul/SP — CEP 09550-160";
const MAP_QUERY = "Rua Piratininga, 487, Barcelona, São Caetano do Sul, SP, 09550-160";

const aboutManifesto = [
  "Um sonho pode nascer no coração, mas o esforço e a fé podem torná-lo realidade. A Barbearia Seu José nasceu da relação entre pai e filho, e assim como um pai ajuda o filho, o Senhor também tem nos ajudado.",
  "Com estilo moderno e original, preservando raízes e resgatando tradições, nos preparamos para receber pessoas de várias idades e diferentes personalidades. Respeitamos a sua história, seu cabelo, sua barba, sua sobrancelha e o que for importante para você.",
  "Acomode-se nessas cadeiras com boas expectativas para se levantar em uma versão totalmente renovada. Sinta essa experiência, fique à vontade, curta um bom som e relaxe: do seu visual, a gente cuida!",
];

const serviceCategories = [
  { id: "barba", label: "Barba" },
  { id: "cabelo", label: "Cabelo" },
  { id: "adicionais", label: "Serviços adicionais" },
] as const;

type ServiceCategory = (typeof serviceCategories)[number]["id"];
type Service = {
  category: ServiceCategory;
  name: string;
  price: string;
  duration: string;
  description?: string;
  pricePrefix?: "A partir de";
  plan?: boolean;
  video?: string;
  image?: string;
};

const services: Service[] = [
  {
    category: "barba",
    name: "Barba",
    price: "R$ 60,00",
    duration: "30 min",
    description: "Barba completa com toalha quente.",
    plan: true,
    image: "/assets/barba-toalha-quente.jpeg",
  },
  {
    category: "barba",
    name: "Barba + Barboterapia",
    price: "R$ 90,00",
    duration: "40 min",
    image: "/assets/servico-barba-barboterapia.jpeg",
  },
  { category: "barba", name: "Barba + Ozônioterapia", price: "R$ 80,00", duration: "30 min" },
  {
    category: "cabelo",
    name: "Corte",
    price: "R$ 70,00",
    duration: "40 min",
    description: "Corte de cabelo.",
    plan: true,
    video: "/assets/video_corte_1.mp4",
  },
  {
    category: "cabelo",
    name: "Raspar",
    price: "R$ 50,00",
    duration: "20 min",
    description: "Raspar o cabelo em um único tamanho.",
    plan: true,
  },
  {
    category: "cabelo",
    name: "Platinado",
    price: "R$ 275,00",
    duration: "180 min",
    pricePrefix: "A partir de",
    description: "Descoloração completa, o famoso “Nevou”!",
  },
  {
    category: "cabelo",
    name: "Selagem/Botox",
    price: "R$ 140,00",
    duration: "80 min",
    pricePrefix: "A partir de",
    description: "Alisamento progressivo/redutor de volume.",
  },
  {
    category: "adicionais",
    name: "Sobrancelha",
    price: "R$ 30,00",
    duration: "10 min",
    description: "Design de sobrancelha com navalha.",
  },
  { category: "adicionais", name: "Depilação de nariz", price: "R$ 25,00", duration: "10 min" },
  { category: "adicionais", name: "Depilação de orelha", price: "R$ 25,00", duration: "10 min" },
  {
    category: "adicionais",
    name: "Hidratação",
    price: "R$ 30,00",
    duration: "10 min",
    pricePrefix: "A partir de",
    description: "Hidratação capilar.",
  },
  {
    category: "adicionais",
    name: "Pézinho",
    price: "R$ 30,00",
    duration: "10 min",
    description: "Acabamento do contorno do cabelo.",
    plan: true,
  },
  { category: "adicionais", name: "Pigmentação", price: "R$ 60,00", duration: "30 min" },
];

const subscriptionPlans = [
  { name: "Barba ilimitada", price: "R$ 149,90" },
  { name: "Cabelo ilimitado", price: "R$ 149,90" },
  { name: "Cabelo e Barba ilimitados", price: "R$ 249,90" },
];

function ReviewCard({ review }: { review: Review }) {
  const initials = review.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

  return (
    <article className="review-card h-full border border-gold/10 bg-forest/20 p-6 transition-colors duration-300 hover:border-gold/40">
      <div className="flex items-center gap-4">
        <div
          aria-hidden="true"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/25 bg-forest-deep font-bold text-gold"
        >
          {initials}
        </div>
        <div className="min-w-0">
          <h3 className="truncate font-sans text-base font-bold text-cream">{review.name}</h3>
          <time className="text-xs text-cream/45">{review.date}</time>
        </div>
      </div>
      <div className="mt-5 flex gap-1 text-gold" role="img" aria-label="5 de 5 estrelas">
        {Array.from({ length: 5 }).map((_, star) => (
          <Star key={star} size={17} fill="currentColor" aria-hidden="true" />
        ))}
      </div>
      {review.comment && <p className="mt-4 text-base text-cream/70">“{review.comment}”</p>}
    </article>
  );
}

const businessHours = [
  { day: "Segunda-feira", hours: "10h às 20h" },
  { day: "Terça-feira", hours: "10h às 20h" },
  { day: "Quarta-feira", hours: "10h às 20h" },
  { day: "Quinta-feira", hours: "10h às 20h" },
  { day: "Sexta-feira", hours: "10h às 20h" },
  { day: "Sábado", hours: "9h às 17h30" },
  { day: "Domingo", hours: "Fechado" },
];

const paymentMethods = [
  "Dinheiro",
  "Cartão",
  "PIX",
  "Crédito",
  "Débito",
  "PIX QR",
  "PIX pela máquina",
];
const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Sobre", href: "#sobre" },
  { label: "Serviços", href: "#serviços" },
  { label: "Assinatura", href: "#assinatura" },
  { label: "Equipe", href: "#equipe" },
  { label: "Avaliações", href: "#avaliacoes" },
  { label: "Contato", href: "#contato" },
];

function LazyServiceMedia({ service }: { service: Service }) {
  const mediaRef = useRef<HTMLVideoElement>(null);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const media = mediaRef.current;
    if (!media || !service.video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry?.isIntersecting ?? false;
        setIsNearViewport(visible);
        if (visible) setHasLoaded(true);
      },
      { rootMargin: "240px 0px" },
    );

    observer.observe(media);
    return () => observer.disconnect();
  }, [service.video]);

  useEffect(() => {
    const media = mediaRef.current;
    if (!media || !service.video) return;

    if (isNearViewport) {
      if (!prefersReducedMotion) void media.play().catch(() => undefined);
    } else {
      media.pause();
    }
  }, [isNearViewport, prefersReducedMotion, service.video]);

  if (service.image) {
    return (
      <img
        src={service.image}
        alt={`Serviço de ${service.name} na Barbearia Seu José`}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
      />
    );
  }

  if (!service.video) {
    return (
      <div className="flex h-full items-center justify-center bg-forest-deep/70">
        <img
          src="/assets/logo.png"
          alt=""
          className="h-20 w-20 rounded-full border border-gold/25 opacity-70"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <video
      ref={mediaRef}
      muted
      loop
      playsInline
      preload="none"
      poster="/assets/poster_tradicao.jpg"
      aria-label={`Vídeo do serviço ${service.name}`}
      className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
    >
      {hasLoaded && <source src={service.video} type="video/mp4" />}
    </video>
  );
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Barbearia Seu José | Barbearia Premium em São Caetano do Sul" },
      {
        name: "description",
        content:
          "Barbearia premium em São Caetano do Sul (SP). Cortes de elite, ambiente exclusivo e tradição desde 2019. Agende seu horário no Seu José.",
      },
      { property: "og:title", content: "Barbearia Seu José | Barbearia Premium" },
      {
        property: "og:description",
        content:
          "Barbearia premium em São Caetano do Sul (SP). Cortes de elite, ambiente exclusivo e tradição desde 2019. Agende seu horário no Seu José.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

function revealTouchedMedia(event: TouchEvent<HTMLElement>) {
  const touch = event.touches[0];
  if (!touch) return;

  event.currentTarget.querySelectorAll<HTMLElement>("img, video").forEach((media) => {
    if (media.closest("#equipe")) return;
    const rect = media.getBoundingClientRect();
    if (
      touch.clientX < rect.left ||
      touch.clientX > rect.right ||
      touch.clientY < rect.top ||
      touch.clientY > rect.bottom
    )
      return;

    let element: HTMLElement | null = media;
    while (element && element !== event.currentTarget) {
      if (element.classList.contains("grayscale")) {
        element.dataset["touchColor"] = "true";
      }
      element = element.parentElement;
    }
  });
}

function Index() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [areReviewsPaused, setAreReviewsPaused] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(true);
  const [activeServiceCategory, setActiveServiceCategory] = useState<ServiceCategory>("barba");
  const videoRef = useRef<HTMLVideoElement>(null);
  const galleryVideoRef = useRef<HTMLVideoElement>(null);
  const experienceVideoRef = useRef<HTMLVideoElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);
  const [areReviewsVisible, setAreReviewsVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const visibleServices = services.filter((service) => service.category === activeServiceCategory);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const videos = [videoRef.current, galleryVideoRef.current, experienceVideoRef.current].filter(
      (video): video is HTMLVideoElement => video !== null,
    );
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const video = entry.target as HTMLVideoElement;
        if (entry.isIntersecting && isPageVisible && !prefersReducedMotion) {
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      }
    });
    videos.forEach((video) => observer.observe(video));
    return () => observer.disconnect();
  }, [prefersReducedMotion, isPageVisible]);

  useEffect(() => {
    const reviewsElement = reviewsRef.current;
    if (!reviewsElement) return;
    const observer = new IntersectionObserver(([entry]) =>
      setAreReviewsVisible(entry?.isIntersecting ?? false),
    );
    observer.observe(reviewsElement);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1280px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setIsMenuOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => setIsPageVisible(!document.hidden);
    handleVisibilityChange();
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const menu = document.getElementById("mobile-menu");
    const trigger = menuButtonRef.current;
    const links = Array.from(menu?.querySelectorAll<HTMLAnchorElement>("a[href]") ?? []);
    links[0]?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
      if (event.key === "Tab") {
        const focusable = [trigger, ...links].filter((element) => element !== null);
        const index = focusable.findIndex((element) => element === document.activeElement);
        const next = event.shiftKey ? index - 1 : index + 1;
        event.preventDefault();
        focusable[(next + focusable.length) % focusable.length]?.focus();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      if (trigger?.getClientRects().length) trigger.focus();
    };
  }, [isMenuOpen]);

  const shouldPauseReviews =
    areReviewsPaused || !areReviewsVisible || !isPageVisible || prefersReducedMotion;

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-forest-deep text-cream overflow-x-hidden selection:bg-gold selection:text-forest-deep grainy-overlay">
        {/* Scroll Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gold z-[100] origin-left"
          style={{ scaleX: scrollYProgress }}
        />

        {/* Navbar */}
        <nav
          aria-label="Navegação principal"
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-4 px-6 md:px-12 flex items-center justify-between ${isScrolled ? "bg-forest-deep/95 backdrop-blur-md shadow-2xl py-3 border-b border-gold/10" : "bg-transparent"}`}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 md:gap-4"
          >
            <img
              src={"/assets/logo.png"}
              alt="Logo Barbearia Seu José"
              className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-gold/30 shadow-gold/20 shadow-lg"
            />
            <div className="flex flex-col leading-none">
              <span className="font-serif text-lg md:text-2xl tracking-tighter uppercase text-cream">
                Barbearia
              </span>
              <span className="mt-1 text-[8px] md:text-[10px] uppercase tracking-[0.35em] md:tracking-[0.5em] text-gold font-bold">
                Seu José
              </span>
            </div>
          </motion.div>

          <div className="hidden xl:flex gap-8 items-center text-sm font-bold uppercase tracking-widest">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hover:text-gold transition-colors duration-300"
              >
                {item.label}
              </a>
            ))}
            <Button size="sm" variant="premium" asChild>
              <a
                href={whatsappUrl(DEFAULT_WHATSAPP_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Agendar
              </a>
            </Button>
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            className="relative grid h-11 w-11 place-items-center border border-gold/25 bg-forest-deep/70 text-gold backdrop-blur-md transition-colors hover:border-gold/60 hover:bg-gold hover:text-forest-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold xl:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isMenuOpen ? "close" : "open"}
                initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
                transition={{ duration: 0.18 }}
                className="absolute"
                aria-hidden="true"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.24 }}
              className="fixed inset-0 z-40 overflow-y-auto bg-forest-deep px-5 pb-8 pt-24 xl:hidden"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(217,164,65,0.12),transparent_32%),radial-gradient(circle_at_8%_90%,rgba(31,77,61,0.7),transparent_40%)]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-[-3rem] right-[-1rem] font-serif text-[13rem] font-bold leading-none text-gold/[0.025]"
              >
                SJ
              </div>

              <div className="mobile-menu-content relative mx-auto flex min-h-full w-full max-w-md flex-col justify-center py-5">
                <div className="mb-4 flex items-end justify-between border-b border-gold/15 pb-3">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-gold">
                      Navegação
                    </p>
                    <p className="mt-1 text-xs text-cream/45">Barbearia Seu José</p>
                  </div>
                  <span className="font-serif text-xl italic text-cream/30" aria-hidden="true">
                    01—07
                  </span>
                </div>

                <nav aria-label="Navegação principal no celular">
                  {navLinks.map((item, index) => (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.035 * index }}
                      whileTap={{ scale: 0.985 }}
                      className="mobile-menu-link group flex min-h-12 items-center border-b border-cream/[0.07] py-2 text-cream transition-colors hover:border-gold/30 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold"
                    >
                      <span className="w-9 text-[9px] font-bold tracking-widest text-gold/50">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="font-serif text-[1.35rem] font-bold tracking-tight">
                        {item.label}
                      </span>
                      <span className="ml-auto h-px w-5 origin-right bg-gold/35 transition-transform duration-300 group-hover:scale-x-150" />
                    </motion.a>
                  ))}
                </nav>

                <a
                  href={whatsappUrl(DEFAULT_WHATSAPP_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                  className="mobile-menu-cta group mt-6 flex min-h-14 w-full items-center justify-between bg-gold px-5 text-forest-deep shadow-[0_10px_30px_rgba(217,164,65,0.12)] transition-transform hover:scale-[1.015] hover:bg-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-forest-deep active:scale-[0.985]"
                >
                  <span className="text-xs font-black uppercase tracking-[0.2em]">
                    Agendar agora
                  </span>
                  <ArrowUpRight
                    size={19}
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>

                <p className="mt-4 text-center text-[9px] font-bold uppercase tracking-[0.25em] text-cream/30">
                  São Caetano do Sul · SP
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <main inert={isMenuOpen} onTouchStart={revealTouchedMedia} onTouchMove={revealTouchedMedia}>
          {/* 1. Hero with Video & Texture */}
          <section
            id="home"
            className="hero-section relative min-h-svh flex flex-col justify-center items-center text-center px-6 overflow-hidden grainy-overlay"
          >
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-dark-gradient z-10" />
              <motion.video
                ref={videoRef}
                autoPlay={!prefersReducedMotion}
                muted={isMuted}
                loop
                playsInline
                initial={prefersReducedMotion ? false : { scale: 1.1 }}
                animate={{ scale: prefersReducedMotion ? 1 : 1.1 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 20,
                  repeat: prefersReducedMotion ? 0 : Infinity,
                  repeatType: "reverse",
                }}
                className="w-full h-full object-cover grayscale opacity-40 md:opacity-60"
              >
                <source src={"/assets/video_institucional_1.mp4"} type="video/mp4" />
              </motion.video>

              <button
                type="button"
                onClick={() => setIsMuted(!isMuted)}
                className="absolute bottom-6 right-24 sm:bottom-32 sm:right-6 z-20 w-12 h-12 rounded-full border border-gold/30 bg-forest-deep/50 backdrop-blur-md flex items-center justify-center text-gold hover:bg-gold hover:text-forest-deep transition-all md:right-12"
                aria-label={isMuted ? "Ativar som do vídeo" : "Desativar som do vídeo"}
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
            </div>

            <div className="hero-content relative z-20 w-full max-w-6xl space-y-8">
              <div className="flex flex-wrap justify-center gap-4 mb-4">
                <span className="bg-gold/10 border border-gold/30 px-6 py-2 rounded-none text-xs font-bold uppercase tracking-widest text-gold">
                  🏆 DESDE 2019
                </span>
              </div>

              <h1 className="headline-huge font-serif text-cream uppercase">
                Barbearia <br />
                <span className="text-gold italic">Seu José.</span>
              </h1>

              <p className="text-xl md:text-3xl text-cream/70 max-w-2xl mx-auto leading-tight text-balance">
                Barbearia premium em São Caetano do Sul. Onde a tradição encontra a modernidade.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
                <Button size="xl" variant="premium" className="rounded-none px-12" asChild>
                  <a
                    href={whatsappUrl(DEFAULT_WHATSAPP_MESSAGE)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Agendar Agora
                  </a>
                </Button>
                <Button
                  size="xl"
                  variant="outline"
                  className="rounded-none px-12 border-cream/20 text-cream"
                  asChild
                >
                  <a href="#serviços">Nossos Serviços</a>
                </Button>
              </div>
            </div>
          </section>

          {/* 2. Faixa de Confiança */}
          <section className="py-12 bg-forest border-y border-gold/10">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: "História", value: "Desde 2019" },
                { label: "Avaliações oficiais", value: "5 estrelas" },
                { label: "Catálogo oficial", value: `${services.length} serviços` },
                { label: "Club Seu José", value: "Assinatura" },
              ].map((item, i) => (
                <motion.div key={i} {...fadeInUp} className="text-center">
                  <div className="text-3xl md:text-4xl font-serif font-bold text-gold mb-1">
                    {item.value}
                  </div>
                  <div className="text-xs md:text-sm uppercase tracking-widest text-cream/60">
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* 3. Sobre & 4. Diferenciais com Assimetria */}
          <section
            id="sobre"
            className="py-32 px-6 md:px-12 bg-forest-deep relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none brick-texture" />

            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative w-full lg:w-1/2"
              >
                <div className="absolute -top-10 -left-10 w-32 h-32 border-l-2 border-t-2 border-gold/40 z-0" />
                <img
                  loading="lazy"
                  decoding="async"
                  src={"/assets/poster_tradicao.jpg"}
                  alt="Ambiente Seu José"
                  className="rounded-none shadow-2xl w-full h-[600px] object-contain bg-forest/20 relative z-10 grayscale hover:grayscale-0 transition-all duration-700 border-2 border-gold/10"
                />
                <div className="absolute -bottom-6 -right-6 bg-gold p-8 rounded-none z-20 hidden md:block">
                  <p className="text-forest-deep font-bold uppercase tracking-tighter text-xl leading-none">
                    Estilo <br /> Atemporal
                  </p>
                </div>
              </motion.div>

              <div className="w-full lg:w-1/2 space-y-10 lg:pl-12">
                <motion.div {...fadeInUp} className="space-y-6">
                  <h2 className="text-5xl md:text-7xl font-serif leading-none">
                    Nossa <br />
                    <span className="text-gold italic">História.</span>
                  </h2>
                  <div className="space-y-5 text-base leading-relaxed text-cream/70 md:text-lg">
                    {aboutManifesto.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  <p className="border-l-2 border-gold pl-4 text-sm font-bold uppercase tracking-widest text-gold">
                    Manifesto — São Caetano do Sul, março de 2019.
                  </p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* 5. Serviços com Layout Dinâmico */}
          <section id="serviços" className="py-32 bg-forest px-6 md:px-12 relative overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col gap-12 md:gap-16">
              <motion.div {...fadeInUp} className="max-w-3xl">
                <h2 className="text-5xl md:text-8xl font-serif uppercase tracking-tighter leading-[0.8]">
                  Serviços <br />
                  <span className="text-gold italic">Oficiais.</span>
                </h2>
                <p className="text-cream/60 mt-6 text-xl">
                  Escolha uma categoria e encontre o cuidado ideal.
                </p>
              </motion.div>

              <div
                role="group"
                aria-label="Categorias de serviços"
                className="-mx-6 flex gap-3 overflow-x-auto px-6 pb-2 md:mx-0 md:flex-wrap md:px-0"
              >
                {serviceCategories.map((category) => {
                  const isActive = activeServiceCategory === category.id;
                  return (
                    <button
                      key={category.id}
                      type="button"
                      aria-pressed={isActive}
                      aria-controls="catalogo-servicos"
                      onClick={() => setActiveServiceCategory(category.id)}
                      className={`shrink-0 border px-5 py-3 text-xs font-bold uppercase tracking-widest transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-forest ${isActive ? "border-gold bg-gold text-forest-deep" : "border-gold/20 bg-forest-deep/25 text-cream/70 hover:border-gold/60 hover:text-gold"}`}
                    >
                      {category.label}
                    </button>
                  );
                })}
              </div>

              <motion.div
                id="catalogo-servicos"
                layout
                className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
              >
                {visibleServices.map((service, i) => (
                  <motion.div
                    layout
                    key={service.name}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="group flex min-w-0 flex-col border border-gold/15 bg-forest-deep/35 transition-all duration-300 hover:-translate-y-1 hover:border-gold/45"
                  >
                    <div className="aspect-[16/9] overflow-hidden border-b border-gold/10">
                      <LazyServiceMedia service={service} />
                    </div>
                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <div className="flex min-w-0 items-start justify-between gap-4">
                        <h3 className="min-w-0 text-2xl font-serif leading-tight text-cream">
                          {service.name}
                        </h3>
                        {service.plan && (
                          <span className="shrink-0 border border-gold/40 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-gold">
                            Plano disponível
                          </span>
                        )}
                      </div>
                      <p className="mt-3 min-h-10 text-sm leading-relaxed text-cream/55">
                        {service.description ?? " "}
                      </p>
                      <div className="mt-5 flex flex-wrap items-end justify-between gap-4 border-t border-gold/10 pt-4">
                        <div>
                          {service.pricePrefix && (
                            <span className="block text-[10px] uppercase tracking-widest text-cream/45">
                              {service.pricePrefix}
                            </span>
                          )}
                          <span className="text-lg font-bold text-gold">{service.price}</span>
                        </div>
                        <span className="flex items-center gap-2 text-sm text-cream/70">
                          <Clock size={16} aria-hidden="true" />
                          {service.duration}
                        </span>
                      </div>
                      <Button variant="premium" className="mt-6 w-full rounded-none" asChild>
                        <a
                          href={whatsappUrl(`Olá, gostaria de agendar o serviço ${service.name}`)}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Agendar ${service.name} pelo WhatsApp`}
                        >
                          Agendar
                        </a>
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* 6. Assinatura - Estilo Brutalista/Premium */}
          <section
            id="assinatura"
            className="relative py-32 px-6 overflow-hidden bg-forest-deep border-y border-gold/10"
          >
            <div className="absolute inset-0 opacity-[0.05] brick-texture pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10 space-y-14">
              <motion.div {...fadeInUp} className="max-w-3xl space-y-7">
                <span className="text-gold font-bold uppercase tracking-widest text-sm inline-block border-b-2 border-gold pb-1">
                  Club Seu José
                </span>
                <h2 className="text-6xl md:text-8xl font-serif uppercase leading-none tracking-tighter">
                  Sempre <br />
                  <span className="text-gold italic">Impecável.</span>
                </h2>
                <div className="flex flex-wrap gap-3 text-xs font-bold uppercase tracking-widest text-cream/70">
                  <span className="flex items-center gap-2 border border-gold/15 px-4 py-2">
                    <Check size={16} className="text-gold" /> Serviço ilimitado
                  </span>
                  <span className="flex items-center gap-2 border border-gold/15 px-4 py-2">
                    <Check size={16} className="text-gold" /> Pagamento mensal
                  </span>
                </div>
              </motion.div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                {subscriptionPlans.map((plan, i) => (
                  <motion.article
                    key={plan.name}
                    {...fadeInUp}
                    transition={{ delay: i * 0.1 }}
                    className="flex flex-col border border-gold/15 bg-forest/25 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gold/50"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold">
                      Assinatura
                    </span>
                    <h3 className="mt-4 min-h-16 text-2xl font-serif leading-tight text-cream">
                      {plan.name}
                    </h3>
                    <p className="mt-6 text-3xl font-serif font-bold text-gold">
                      {plan.price}
                      <span className="ml-1 text-sm font-sans font-normal text-cream/50">/mês</span>
                    </p>
                    <Button variant="premium" className="mt-8 w-full rounded-none" asChild>
                      <a
                        href={whatsappUrl(`Olá, gostaria de assinar o plano ${plan.name}`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Solicitar assinatura do plano ${plan.name} pelo WhatsApp`}
                      >
                        Quero assinar
                      </a>
                    </Button>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>
          {/* 7. Equipe / Barbeiros (Assimetria) */}
          <section
            id="equipe"
            className="py-16 md:py-32 px-6 md:px-12 bg-forest relative overflow-hidden"
          >
            <div className="max-w-7xl mx-auto flex flex-col gap-20">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                <motion.div {...fadeInUp} className="max-w-2xl">
                  <h2 className="text-5xl md:text-8xl font-serif leading-none tracking-tighter uppercase text-cream">
                    O Time <br />
                    <span className="text-gold italic">de Elite.</span>
                  </h2>
                </motion.div>
                <Button
                  variant="outline"
                  className="rounded-none border-gold/30 text-gold uppercase tracking-widest text-xs h-12"
                  asChild
                >
                  <a
                    href={whatsappUrl(
                      "Olá, gostaria de agendar com a equipe da Barbearia Seu José",
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Agendar com a equipe
                  </a>
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-12">
                {[
                  {
                    name: "Daniel",
                    role: "Barber",
                    img: "/assets/barber_daniel.jpg",
                    position: "center 30%",
                  },
                  {
                    name: "Adriel",
                    role: "Barber",
                    img: "/assets/barber_adriel.jpg",
                    position: "center 28%",
                  },
                  {
                    name: "Joéber",
                    role: "Barber",
                    img: "/assets/barber_joeber.jpg",
                    position: "center 28%",
                  },
                  {
                    name: "Wesley",
                    role: "Barber",
                    img: "/assets/barber_wesley.jpg",
                    position: "center 28%",
                  },
                  {
                    name: "Gilberto",
                    role: "Barber",
                    img: "/assets/barber_gilberto.jpg",
                    position: "center 30%",
                  },
                ].map((barber, i) => (
                  <motion.div
                    key={barber.name}
                    {...fadeInUp}
                    transition={{ delay: i * 0.1 }}
                    className={`group relative transition-transform duration-300 hover:-translate-y-1 lg:col-span-2 ${i === 3 ? "lg:col-start-2" : i === 4 ? "lg:col-start-4" : ""}`}
                  >
                    <div className="relative aspect-[3/4] overflow-hidden border border-gold/15 bg-forest-deep/40 shadow-[0_12px_20px_rgba(0,0,0,0.22)] transition-all duration-500 group-hover:border-gold/50">
                      <img
                        src={barber.img}
                        alt={`${barber.name}, ${barber.role} da Barbearia Seu José`}
                        loading="lazy"
                        decoding="async"
                        style={{ objectPosition: barber.position }}
                        className="h-full w-full object-cover saturate-[0.82] contrast-[1.04] transition-all duration-700 group-hover:scale-[1.035] group-hover:saturate-100"
                      />
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-forest-deep/40 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-35"
                      />
                    </div>
                    <div className="mt-5 border-l-2 border-gold/70 py-1 pl-4 transition-colors duration-300 group-hover:border-gold">
                      <h3 className="text-2xl font-serif uppercase tracking-tighter text-cream">
                        {barber.name}
                      </h3>
                      <p className="mt-1 text-xs font-bold uppercase tracking-widest text-gold">
                        {barber.role}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* 8. Avaliações oficiais */}
          <section
            id="avaliacoes"
            className="relative overflow-hidden border-y border-gold/10 bg-forest-deep px-6 py-24 md:px-12"
          >
            <div className="mx-auto max-w-7xl">
              <motion.div
                {...fadeInUp}
                className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
              >
                <div>
                  <h2 className="text-5xl font-serif uppercase leading-none tracking-tighter text-cream md:text-7xl">
                    Avaliações <span className="text-gold italic">reais.</span>
                  </h2>
                  <p className="mt-4 text-sm uppercase tracking-widest text-cream/45">
                    {reviews.length} avaliações · 5 estrelas
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setAreReviewsPaused((paused) => !paused)}
                  className="flex w-fit items-center gap-2 border border-gold/25 px-4 py-3 text-xs font-bold uppercase tracking-widest text-gold transition-colors hover:bg-gold hover:text-forest-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  aria-label={
                    areReviewsPaused
                      ? "Continuar carrossel de avaliações"
                      : "Pausar carrossel de avaliações"
                  }
                  aria-pressed={areReviewsPaused}
                >
                  {areReviewsPaused ? (
                    <Play size={15} aria-hidden="true" />
                  ) : (
                    <Pause size={15} aria-hidden="true" />
                  )}
                  {areReviewsPaused ? "Continuar" : "Pausar"}
                </button>
              </motion.div>

              <div
                ref={reviewsRef}
                className="reviews-carousel"
                tabIndex={0}
                role="region"
                aria-label="Avaliações de clientes"
              >
                <div
                  className="reviews-track"
                  style={{
                    animationDuration: `${reviews.length * 6.8}s`,
                    animationPlayState: shouldPauseReviews ? "paused" : "running",
                  }}
                >
                  <div className="reviews-group" role="list">
                    {reviews.map((review) => (
                      <div role="listitem" key={`${review.name}-${review.date}`}>
                        <ReviewCard review={review} />
                      </div>
                    ))}
                  </div>
                  <div className="reviews-group" aria-hidden="true">
                    {reviews.map((review) => (
                      <div key={`duplicate-${review.name}-${review.date}`}>
                        <ReviewCard review={review} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* O rodapé foi movido para depois da galeria para seguir o fluxo visual solicitado */}

          {/* Atalho flutuante para horários */}
          <div className="fixed top-24 right-6 z-50">
            <motion.a
              href="#contato"
              initial={{ x: 100 }}
              animate={{ x: 0 }}
              className="bg-forest-deep/80 backdrop-blur-md border border-gold/30 px-4 py-2 flex items-center gap-3"
            >
              <Clock size={14} className="text-gold" aria-hidden="true" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-gold">
                Ver horários
              </span>
            </motion.a>
          </div>

          {/* Floating CTA (WhatsApp Pulse) */}
          <div className="fixed bottom-6 left-6 z-50">
            <motion.a
              href={whatsappUrl(DEFAULT_WHATSAPP_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              animate={{ scale: prefersReducedMotion ? 1 : [1, 1.05, 1] }}
              transition={{
                duration: prefersReducedMotion ? 0 : 2,
                repeat: prefersReducedMotion ? 0 : Infinity,
              }}
              className="flex items-center gap-3 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-2xl hover:scale-105 transition-transform"
              aria-label="Abrir atendimento da Barbearia Seu José no WhatsApp"
            >
              <Phone size={20} />
              <span className="font-bold text-sm hidden md:block uppercase tracking-widest">
                Atendimento
              </span>
            </motion.a>
          </div>

          <div className="fixed bottom-6 right-6 lg:hidden z-50">
            <Button
              variant="premium"
              size="icon"
              className="w-16 h-16 rounded-full shadow-2xl"
              asChild
            >
              <a
                href={whatsappUrl(DEFAULT_WHATSAPP_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Agendar horário pelo WhatsApp"
              >
                <Calendar size={28} aria-hidden="true" />
              </a>
            </Button>
          </div>

          {/* Galeria / Instagram Brutalista - Optimized with Uploads */}
          <section className="py-32 bg-forest-deep px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col gap-16">
              <div className="flex flex-col md:flex-row justify-between items-baseline gap-4">
                <h2 className="text-4xl md:text-7xl font-serif uppercase tracking-tighter text-cream">
                  Galeria <br />
                  <span className="text-gold italic">No Detalhe.</span>
                </h2>
                <p className="text-cream/40 uppercase tracking-widest text-xs font-bold">
                  @seujosebarbershop
                </p>
              </div>

              <div
                data-gallery-grid
                className="grid grid-cols-2 md:grid-cols-4 gap-6 auto-rows-[200px] md:auto-rows-[300px]"
              >
                {/* 1. Imagem Principal (Grande) */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="relative overflow-hidden md:col-span-2 md:row-span-2 border border-gold/10 group"
                >
                  <img
                    loading="lazy"
                    decoding="async"
                    src={"/assets/barbearia_interna_2.jpg"}
                    alt="Atendimento na Barbearia Seu José"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-forest-deep/20 group-hover:bg-transparent transition-colors" />
                </motion.div>

                {/* 2. Corte Mullet 1 */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  className="relative overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 border border-gold/10 md:row-span-2"
                >
                  <img
                    loading="lazy"
                    decoding="async"
                    src={"/assets/corte_mullet_1.jpg"}
                    alt="Corte Mullet Detalhe"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                  />
                </motion.div>

                {/* 3. Corte Mullet 2 */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  className="relative overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 border border-gold/10"
                >
                  <img
                    loading="lazy"
                    decoding="async"
                    src={"/assets/corte_mullet_2.jpg"}
                    alt="Corte Mullet Perfil"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                  />
                </motion.div>

                {/* 4. Corte Mullet 3 */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  className="relative overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 border border-gold/10"
                >
                  <img
                    loading="lazy"
                    decoding="async"
                    src={"/assets/corte_mullet_3.jpg"}
                    alt="Corte Mullet Estilo"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                  />
                </motion.div>

                {/* 5. Vídeo Institucional 3 (Largo) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  className="relative overflow-hidden md:col-span-2 border border-gold/10 group"
                >
                  <video
                    ref={galleryVideoRef}
                    preload="none"
                    aria-label="Vídeo institucional da Barbearia Seu José"
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  >
                    <source src={"/assets/video_institucional_3.mp4"} type="video/mp4" />
                  </video>
                </motion.div>

                {/* 6. Barbearia Interna 3 */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  className="relative overflow-hidden md:col-span-2 border border-gold/10 group"
                >
                  <img
                    loading="lazy"
                    decoding="async"
                    src={"/assets/barbearia_interna_3.jpg"}
                    alt="Ambiente VIP Seu José"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-105 transition-transform duration-1000"
                  />
                </motion.div>

                {/* 7. Barbearia Interna 1 (Vertical) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  className="relative overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 border border-gold/10 md:row-span-2"
                >
                  <img
                    loading="lazy"
                    decoding="async"
                    src={"/assets/barbearia_interna_1.jpg"}
                    alt="Barbeiros em Ação"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                  />
                </motion.div>

                {/* 8. Barbearia Interna 2 (Largo) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  className="relative overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 border border-gold/10 md:col-span-3"
                >
                  <img
                    loading="lazy"
                    decoding="async"
                    src={"/assets/barbearia_interna_2.jpg"}
                    alt="Cuidado Premium"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  className="relative overflow-hidden md:col-span-3 border border-gold/10 group"
                >
                  <video
                    ref={experienceVideoRef}
                    preload="none"
                    aria-label="Experiência na Barbearia Seu José"
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  >
                    <source src="/assets/galeria-experiencia-seu-jose.mp4" type="video/mp4" />
                  </video>
                </motion.div>
                {[
                  {
                    src: "/assets/barba-toalha-quente.jpeg",
                    alt: "Serviço de barba com toalha quente e navalha na Barbearia Seu José",
                    layout: "md:col-span-2",
                  },
                  {
                    src: "/assets/servico-barba-barboterapia.jpeg",
                    alt: "Atendimento com toalha na Barbearia Seu José",
                    layout: "md:col-span-2",
                  },
                  {
                    src: "/assets/galeria-acabamento-barba.jpeg",
                    alt: "Acabamento da barba com máquina",
                    layout: "",
                  },
                  {
                    src: "/assets/servico-barba.jpeg",
                    alt: "Detalhe do contorno da barba com navalha",
                    layout: "col-span-2 md:col-span-1",
                  },
                ].map((photo) => (
                  <motion.div
                    key={photo.src}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className={`relative row-span-2 overflow-hidden border border-gold/10 group ${photo.layout}`}
                  >
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
          {/* 15. Contato & Footer Premium - Movido para depois da Galeria */}
          <section
            id="contato"
            className="relative py-40 bg-forest-deep overflow-hidden border-t border-gold/10"
          >
            <div className="absolute inset-0 opacity-[0.05] brick-texture pointer-events-none" />

            {/* Elemento Decorativo Gigante no Background */}
            <div className="absolute -bottom-20 -right-20 text-[20vw] font-serif font-black text-gold/5 pointer-events-none uppercase tracking-tighter select-none">
              Estilo
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
              <div className="grid grid-cols-1 items-start gap-16 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] xl:gap-16">
                {/* Coluna de Informações e CTA */}
                <motion.div {...fadeInUp} className="min-w-0 space-y-16">
                  <div className="space-y-6">
                    <span className="text-gold font-bold uppercase tracking-[0.3em] text-xs inline-block border-b border-gold/30 pb-2">
                      Agendamento & Localização
                    </span>
                    <h2 className="text-5xl font-serif leading-none tracking-tighter text-cream uppercase sm:text-6xl lg:text-7xl xl:text-6xl 2xl:text-8xl">
                      Onde a <br />
                      <span className="text-gold italic">Magia</span> <br />
                      Acontece.
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
                    <div className="space-y-4 group">
                      <div className="w-12 h-12 flex items-center justify-center text-gold border border-gold/20 group-hover:bg-gold group-hover:text-forest-deep transition-all duration-500">
                        <MapPin size={24} />
                      </div>
                      <div>
                        <h3 className="text-gold font-bold uppercase text-[10px] tracking-widest mb-1">
                          Endereço
                        </h3>
                        <address className="text-lg text-cream/80 font-serif not-italic leading-snug">
                          {ADDRESS}
                          <br />
                          {ADDRESS_CITY}
                        </address>
                      </div>
                    </div>

                    <div className="space-y-4 group">
                      <div className="w-12 h-12 flex items-center justify-center text-gold border border-gold/20 group-hover:bg-gold group-hover:text-forest-deep transition-all duration-500">
                        <Clock size={24} />
                      </div>
                      <div>
                        <h3 className="text-gold font-bold uppercase text-[10px] tracking-widest mb-1">
                          Horário de Atendimento
                        </h3>
                        <dl className="space-y-1.5 text-sm text-cream/75">
                          {businessHours.map((item) => (
                            <div
                              key={item.day}
                              className="flex justify-between gap-4 border-b border-cream/5 pb-1"
                            >
                              <dt>{item.day}</dt>
                              <dd
                                className={
                                  item.hours === "Fechado" ? "text-cream/40" : "text-cream"
                                }
                              >
                                {item.hours}
                              </dd>
                            </div>
                          ))}
                        </dl>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-5 border-t border-gold/10 pt-8">
                    <div className="flex items-center gap-3">
                      <CreditCard className="text-gold" size={22} aria-hidden="true" />
                      <h3 className="font-sans text-sm font-bold uppercase tracking-widest text-cream">
                        Formas de pagamento
                      </h3>
                    </div>
                    <ul className="flex flex-wrap gap-2" aria-label="Formas de pagamento aceitas">
                      {paymentMethods.map((method) => (
                        <li
                          key={method}
                          className="border border-gold/15 bg-forest/25 px-3 py-2 text-xs text-cream/70"
                        >
                          {method}
                        </li>
                      ))}
                    </ul>
                    <p className="flex items-center gap-2 text-sm text-cream/60">
                      <Wifi size={18} className="text-gold" aria-hidden="true" /> Wi-Fi disponível
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2">
                    <Button
                      size="xl"
                      variant="premium"
                      className="h-16 w-full rounded-none px-4 text-sm uppercase tracking-widest shadow-2xl shadow-gold/10 sm:text-base"
                      asChild
                    >
                      <a
                        href={whatsappUrl(DEFAULT_WHATSAPP_MESSAGE)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Agendar Horário <Scissors className="ml-2 w-5 h-5" />
                      </a>
                    </Button>
                    <Button
                      size="xl"
                      variant="outline"
                      className="h-16 w-full rounded-none border-cream/20 px-4 text-sm uppercase tracking-widest text-cream transition-all hover:bg-cream hover:text-forest-deep sm:text-base"
                      asChild
                    >
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Ver no Mapa
                      </a>
                    </Button>
                  </div>
                </motion.div>

                {/* Coluna do Mapa Brutalista */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="relative min-w-0 aspect-[4/3] xl:aspect-square"
                >
                  <div className="absolute -top-4 -left-4 w-full h-full border border-gold/20 z-0" />
                  <div className="relative z-10 w-full h-full border-2 border-gold/40 shadow-2xl overflow-hidden group">
                    <iframe
                      src={`https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&output=embed`}
                      title="Mapa da Barbearia Seu José"
                      className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-1000"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                </motion.div>
              </div>

              {/* Rodapé Final Minimalista */}
              <div className="mt-40 pt-12 border-t border-gold/10 flex flex-col md:flex-row justify-between items-center gap-12">
                <div className="flex flex-col items-center md:items-start gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      loading="lazy"
                      decoding="async"
                      src={"/assets/logo.png"}
                      alt="Logo Barbearia Seu José"
                      className="w-16 h-16 rounded-full border border-gold/20"
                    />
                    <div className="flex flex-col">
                      <span className="font-serif text-2xl tracking-tighter uppercase text-cream">
                        Barbearia
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.5em] text-gold font-bold">
                        Seu José
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap justify-center gap-12 text-[10px] font-bold uppercase tracking-[0.3em] text-cream/40">
                  <a
                    href="https://www.instagram.com/seujosebarbershop"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gold transition-all duration-300"
                  >
                    Instagram
                  </a>
                  <a
                    href={whatsappUrl(DEFAULT_WHATSAPP_MESSAGE)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gold transition-all duration-300"
                  >
                    WhatsApp
                  </a>
                  <a
                    href="https://play.google.com/store/apps/details?id=br.com.starapp.barbeariaseujose"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gold transition-all duration-300"
                  >
                    Google Play
                  </a>
                  <a
                    href="https://apps.apple.com/br/app/barbearia-seu-jos%C3%A9/id6474557189"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gold transition-all duration-300"
                  >
                    App Store
                  </a>
                </div>

                <div className="text-[10px] uppercase tracking-widest text-cream/20">
                  © 2026 — SCS / SP
                </div>
              </div>
              <p className="mt-8 text-center text-xs leading-relaxed text-cream/60">
                Desenvolvido por{" "}
                <a
                  href="https://vortexstudioweb.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium transition-colors hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                >
                  Vortex Studio
                </a>
              </p>
            </div>
          </section>

          {/* Back to top */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() =>
              window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" })
            }
            className="fixed bottom-6 right-6 hidden lg:flex w-12 h-12 bg-forest border border-gold/20 rounded-full items-center justify-center text-gold hover:bg-gold hover:text-forest-deep transition-all z-50"
            aria-label="Voltar ao topo"
          >
            <ArrowUp size={24} />
          </motion.button>
        </main>
      </div>
    </MotionConfig>
  );
}
