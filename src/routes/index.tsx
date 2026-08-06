import { createFileRoute } from "@tanstack/react-router";
import { 
  motion, 
  useScroll, 
  useTransform, 
  AnimatePresence, 
  useSpring,
  useInView
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { 
  Scissors, 
  Star, 
  Calendar, 
  Phone, 
  Check, 
  Clock, 
  MapPin, 
  ChevronDown, 
  Coffee, 
  Users, 
  ShoppingBag,
  Award,
  Menu,
  X,
  ArrowUp,
  Play,
  Volume2,
  VolumeX,
  Maximize2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import logoAsset from "@/assets/logo.png.asset.json";
import posterTradicao from "@/assets/poster_tradicao.jpg.asset.json";
import corteMullet1 from "@/assets/corte_mullet_1.jpg.asset.json";
import corteMullet2 from "@/assets/corte_mullet_2.jpg.asset.json";
import videoInstitucional1 from "@/assets/video_institucional_1.mp4.asset.json";
import videoInstitucional2 from "@/assets/video_institucional_2.mp4.asset.json";
import videoInstitucional3 from "@/assets/video_institucional_3.mp4.asset.json";
import videoBarba1 from "@/assets/video_barba_premium.mp4.asset.json";
import videoCorte1 from "@/assets/video_corte_1.mp4.asset.json";
import corteMullet3 from "@/assets/corte_mullet_3.jpg.asset.json";
import barbeariaInterna1 from "@/assets/barbearia_interna_1.jpg.asset.json";
import barbeariaInterna2 from "@/assets/barbearia_interna_2.jpg.asset.json";
import barbeariaInterna3 from "@/assets/barbearia_interna_3.jpg.asset.json";
import videoCombo1 from "@/assets/video_combo_premium.mp4.asset.json";
import videoKids1 from "@/assets/video_kids_premium.mp4.asset.json";
import videoToalhaQuente from "@/assets/video_toalha_quente.mp4.asset.json";
import joeberSaccomani from "@/assets/joeber_saccomani.jpg.asset.json";
import wesleySilva from "@/assets/wesley_silva.jpg.asset.json";
import adrielBarao from "@/assets/adriel_barao.jpg.asset.json";



export const Route = createFileRoute("/")({
  head: () => ({
    title: "Seu José Barbershop | Barbearia Premium em São Caetano do Sul",
    meta: [
      { name: "description", content: "Barbearia premium em São Caetano do Sul (SP). Cortes de elite, ambiente exclusivo e tradição desde 2019. Agende seu horário no Seu José." },
      { property: "og:title", content: "Seu José Barbershop | Estilo e Tradição em São Caetano" },
      { property: "og:description", content: "Experiência premium de barbearia com mestres barbeiros, lounge VIP e o melhor atendimento da região." },
    ],
  }),
  component: Index,
});

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

const stagger = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true }
};

function Index() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-forest-deep text-cream overflow-x-hidden selection:bg-gold selection:text-forest-deep grainy-overlay">
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gold z-[100] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-4 px-6 md:px-12 flex items-center justify-between ${isScrolled ? "bg-forest-deep/95 backdrop-blur-md shadow-2xl py-3 border-b border-gold/10" : "bg-transparent"}`}>
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-4">
          <img src={logoAsset.url} alt="Seu José Logo" className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-gold/30 shadow-gold/20 shadow-lg" />
        </motion.div>

        <div className="hidden lg:flex gap-8 items-center text-sm font-bold uppercase tracking-widest">
          {["Home", "Sobre", "Serviços", "Assinatura", "Equipe", "Contato"].map((item) => (
            <a key={item} href={item === "Contato" ? "#contato" : `#${item.toLowerCase()}`} className="hover:text-gold transition-colors duration-300">{item}</a>
          ))}
          <Button size="sm" variant="premium" asChild>
            <a href="https://wa.me/5511931458599?text=Olá,%20gostaria%20de%20agendar%20um%20horário" target="_blank" rel="noopener noreferrer">Agendar</a>
          </Button>
        </div>

        <button className="lg:hidden text-gold" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-forest-deep flex flex-col items-center justify-center gap-8 pt-20"
          >
            {["Home", "Sobre", "Serviços", "Assinatura", "Equipe", "Contato"].map((item) => (
              <a key={item} href={item === "Contato" ? "#contato" : `#${item.toLowerCase()}`} onClick={() => setIsMenuOpen(false)} className="text-2xl font-serif font-bold text-cream hover:text-gold">{item}</a>
            ))}
            <Button size="lg" variant="premium" className="mt-4" asChild onClick={() => setIsMenuOpen(false)}>
              <a href="https://wa.me/5511931458599?text=Olá,%20gostaria%20de%20agendar%20um%20horário" target="_blank" rel="noopener noreferrer">Agendar Agora</a>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. Hero with Video & Texture */}
      <section id="home" className="relative h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden grainy-overlay">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-dark-gradient z-10" />
          <motion.video 
            ref={videoRef}
            autoPlay 
            muted={isMuted} 
            loop 
            playsInline
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
            className="w-full h-full object-cover grayscale opacity-40 md:opacity-60"
          >
            <source src={videoInstitucional1.url} type="video/mp4" />
          </motion.video>
          
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className="absolute bottom-32 right-12 z-20 w-12 h-12 rounded-full border border-gold/30 bg-forest-deep/50 backdrop-blur-md flex items-center justify-center text-gold hover:bg-gold hover:text-forest-deep transition-all"
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative z-20 max-w-6xl space-y-8"
        >
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <span className="bg-gold/10 border border-gold/30 px-6 py-2 rounded-none text-xs font-bold uppercase tracking-widest text-gold">🏆 DESDE 2019</span>
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
              <a href="https://wa.me/5511931458599?text=Olá,%20gostaria%20de%20agendar%20um%20horário" target="_blank" rel="noopener noreferrer">Agendar Agora</a>
            </Button>
            <Button size="xl" variant="outline" className="rounded-none px-12 border-cream/20 text-cream" asChild>
              <a href="#serviços">Nossos Serviços</a>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* 2. Faixa de Confiança */}
      <section className="py-12 bg-forest border-y border-gold/10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Cortes Realizados", value: "+10.000" },
            { label: "Clientes Satisfeitos", value: "★★★★★" },
            { label: "Anos de História", value: "Desde 2019" },
            { label: "Em São Caetano", value: "R. Piratininga" },
          ].map((item, i) => (
            <motion.div key={i} {...fadeInUp} className="text-center">
              <div className="text-3xl md:text-4xl font-serif font-bold text-gold mb-1">{item.value}</div>
              <div className="text-xs md:text-sm uppercase tracking-widest text-cream/60">{item.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Sobre & 4. Diferenciais com Assimetria */}
      <section id="sobre" className="py-32 px-6 md:px-12 bg-forest-deep relative overflow-hidden">
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
              src={posterTradicao.url} 
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
                Mais que <br />
                <span className="text-gold italic">Barbearia.</span>
              </h2>
              <p className="text-xl text-cream/70 leading-relaxed font-light">
                Em São Caetano do Sul, criamos um refúgio para o homem moderno. Aqui, o tempo desacelera enquanto cuidamos de cada detalhe da sua imagem.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-12">
              {[
                { icon: Scissors, title: "Mestres Barbeiros", desc: "Técnicas clássicas com visão moderna." },
                { icon: Coffee, title: "Lounge VIP", desc: "Cerveja gelada e café de cortesia." },
                { icon: Award, title: "Premium Care", desc: "Produtos importados de alta linha." },
                { icon: Clock, title: "Seu Tempo", desc: "Pontualidade e agendamento fácil." },
              ].map((item, i) => (
                <motion.div key={i} {...fadeInUp} className="group">
                  <div className="flex flex-col gap-3">
                    <item.icon className="text-gold w-8 h-8 group-hover:scale-110 transition-transform" />
                    <h3 className="text-lg font-bold uppercase tracking-widest text-cream">{item.title}</h3>
                    <p className="text-sm text-cream/50 leading-snug">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Serviços com Layout Dinâmico */}
      <section id="serviços" className="py-32 bg-forest px-6 md:px-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col gap-20">
          <motion.div {...fadeInUp} className="max-w-3xl">
            <h2 className="text-5xl md:text-8xl font-serif uppercase tracking-tighter leading-[0.8]">
              Corte <br />
              <span className="text-gold italic">Impecável.</span>
            </h2>
            <p className="text-cream/60 mt-6 text-xl">Artesanato em forma de estilo. Escolha o cuidado que sua imagem merece.</p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-x-12 gap-y-24">
            {[
              { name: "Corte Masculino", time: "45 min", video: videoCorte1.url },
              { name: "A Barba", time: "30 min", video: videoBarba1.url },
              { name: "O Combo", time: "1h 15min", video: videoCombo1.url },
              { name: "Kids", time: "30 min", video: videoKids1.url },
              { name: "Toalha Quente", time: "20 min", video: videoToalhaQuente.url },
            ].map((service, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative group w-full md:w-[calc(50%-24px)] lg:w-[calc(33.333%-32px)] ${i < 3 && i % 2 !== 0 ? "md:translate-y-12" : ""}`}
              >
                <div className="overflow-hidden aspect-[3/4] rounded-none mb-6 relative">
                  {service.video && (
                    <video 
                      autoPlay 
                      muted 
                      loop 
                      playsInline 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 grayscale group-hover:grayscale-0"
                    >
                      <source src={service.video} type="video/mp4" />
                    </video>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-baseline border-b border-gold/20 pb-2">
                    <h3 className="text-2xl font-serif">{service.name}</h3>
                    <span className="text-gold font-bold text-xs uppercase tracking-widest">{service.time}</span>
                  </div>
                  <p className="text-cream/50 text-sm leading-relaxed">Experiência completa com finalização premium.</p>
                  <Button variant="link" className="p-0 text-gold h-auto mt-4 uppercase text-xs font-bold tracking-widest">Agendar agora →</Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Assinatura - Estilo Brutalista/Premium */}
      <section id="assinatura" className="relative py-32 px-6 overflow-hidden bg-forest-deep border-y border-gold/10">
        <div className="absolute inset-0 opacity-[0.05] brick-texture pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeInUp} className="space-y-8">
              <span className="text-gold font-bold uppercase tracking-widest text-sm inline-block border-b-2 border-gold pb-1">Club Seu José</span>
              <h2 className="text-6xl md:text-8xl font-serif uppercase leading-none tracking-tighter">
                Sempre <br />
                <span className="text-gold italic">Impecável.</span>
              </h2>
              <p className="text-xl text-cream/70 max-w-xl font-light">Para o homem que entende que imagem é investimento. Cortes ilimitados e benefícios exclusivos em São Caetano.</p>
              <Button size="xl" variant="premium" className="rounded-none px-12 uppercase" asChild>
                <a href="https://wa.me/5511931458599?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20o%20Club%20Seu%20José" target="_blank" rel="noopener noreferrer">Faça parte do clube</a>
              </Button>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "ILIMITADO", desc: "Corte quantas vezes quiser." },
                { title: "PRIORIDADE", desc: "Agendamento VIP sem filas." },
                { title: "ECONOMIA", desc: "Mais de 40% de redução de custo." },
                { title: "EVENTOS", desc: "Acesso a workshops e degustações." }
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  {...fadeInUp}
                  transition={{ delay: i * 0.1 }}
                  className="bg-forest/30 border border-gold/10 p-8 hover:border-gold/40 transition-colors"
                >
                  <h3 className="text-gold font-bold text-2xl font-serif mb-2 tracking-tighter">{item.title}</h3>
                  <p className="text-cream/50 text-sm leading-tight">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* 7. Equipe / Barbeiros (Assimetria) */}
      <section id="equipe" className="py-32 px-6 md:px-12 bg-forest relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col gap-20">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <motion.div {...fadeInUp} className="max-w-2xl">
              <h2 className="text-5xl md:text-8xl font-serif leading-none tracking-tighter uppercase text-cream">
                O Time <br />
                <span className="text-gold italic">de Elite.</span>
              </h2>
            </motion.div>
            <Button variant="outline" className="rounded-none border-gold/30 text-gold uppercase tracking-widest text-xs h-12">Ver todos os barbeiros</Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              { name: "Joeber Saccomani", role: "Barber", img: (joeberSaccomani as any).url },
              { name: "Wesley Silva", role: "Barber", img: (wesleySilva as any).url },
              { name: "Adriel Barão", role: "Barber", img: (adrielBarao as any).url },
            ].map((barber, i) => (
              <motion.div 
                key={i} 
                {...fadeInUp} 
                transition={{ delay: i * 0.1 }}
                className="group relative"
              >
                <div className="aspect-[3/4] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                  <img src={barber.img} alt={barber.name} className="w-full h-full object-contain bg-forest-deep/20 group-hover:scale-105 transition-transform duration-1000" />
                </div>
                <div className="mt-6 space-y-1">
                  <h3 className="text-2xl font-serif uppercase tracking-tighter text-cream">{barber.name}</h3>
                  <p className="text-gold font-bold text-xs uppercase tracking-widest">{barber.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Depoimentos (Marquee Suave) */}
      <section className="py-24 bg-forest-deep border-y border-gold/10 overflow-hidden relative">
        <div className="flex whitespace-nowrap gap-12 animate-marquee py-10">
          {[
            "Excelente atendimento!",
            "Melhor barbearia de SCS",
            "Ambiente sensacional",
            "Corte impecável sempre",
            "Assinatura vale muito a pena",
            "Profissionais de elite"
          ].map((text, i) => (
            <div key={i} className="flex items-center gap-6">
              <span className="text-4xl md:text-6xl font-serif text-cream/20 uppercase tracking-tighter italic">{text}</span>
              <Scissors className="text-gold/20 w-8 h-8" />
            </div>
          ))}
          {/* Duplicate for seamless loop */}
          {[
            "Excelente atendimento!",
            "Melhor barbearia de SCS",
            "Ambiente sensacional",
            "Corte impecável sempre",
            "Assinatura vale muito a pena",
            "Profissionais de elite"
          ].map((text, i) => (
            <div key={`dup-${i}`} className="flex items-center gap-6">
              <span className="text-4xl md:text-6xl font-serif text-cream/20 uppercase tracking-tighter italic">{text}</span>
              <Scissors className="text-gold/20 w-8 h-8" />
            </div>
          ))}
        </div>
      </section>

      {/* O rodapé foi movido para depois da galeria para seguir o fluxo visual solicitado */}


      {/* Floating Badge Aberto/Fechado */}
      <div className="fixed top-24 right-6 z-50 pointer-events-none">
        <motion.div 
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          className="bg-forest-deep/80 backdrop-blur-md border border-gold/30 px-4 py-2 flex items-center gap-3"
        >
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-gold">Aberto agora</span>
        </motion.div>
      </div>

      {/* Floating CTA (WhatsApp Pulse) */}
      <div className="fixed bottom-6 left-6 z-50">
        <motion.a 
          href="https://wa.me/5511931458599?text=Olá,%20gostaria%20de%20agendar%20um%20horário"
          target="_blank"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex items-center gap-3 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-2xl hover:scale-105 transition-transform"
        >
          <Phone size={20} />
          <span className="font-bold text-sm hidden md:block uppercase tracking-widest">Atendimento</span>
        </motion.a>
      </div>

      <div className="fixed bottom-6 right-6 lg:hidden z-50">
        <Button variant="premium" size="icon" className="w-16 h-16 rounded-full shadow-2xl" asChild>
          <a href="https://wa.me/5511931458599?text=Olá,%20gostaria%20de%20agendar%20um%20horário" target="_blank" rel="noopener noreferrer">
            <Calendar size={28} />
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
            <p className="text-cream/40 uppercase tracking-widest text-xs font-bold">@seujosebarbershop</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 auto-rows-[200px] md:auto-rows-[300px]">
            {/* 1. Vídeo Principal (Grande) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="relative overflow-hidden md:col-span-2 md:row-span-2 border border-gold/10 group"
            >
              <video 
                autoPlay 
                muted 
                loop 
                playsInline 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              >
                <source src={videoInstitucional2.url} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-forest-deep/20 group-hover:bg-transparent transition-colors" />
            </motion.div>

            {/* 2. Corte Mullet 1 */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="relative overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 border border-gold/10 md:row-span-2"
            >
              <img src={corteMullet1.url} alt="Corte Mullet Detalhe" className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
            </motion.div>

            {/* 3. Corte Mullet 2 */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="relative overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 border border-gold/10"
            >
              <img src={corteMullet2.url} alt="Corte Mullet Perfil" className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
            </motion.div>

            {/* 4. Corte Mullet 3 */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="relative overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 border border-gold/10"
            >
              <img src={corteMullet3.url} alt="Corte Mullet Estilo" className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
            </motion.div>

            {/* 5. Vídeo Institucional 3 (Largo) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="relative overflow-hidden md:col-span-2 border border-gold/10 group"
            >
              <video 
                autoPlay 
                muted 
                loop 
                playsInline 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              >
                <source src={videoInstitucional3.url} type="video/mp4" />
              </video>
            </motion.div>

            {/* 6. Barbearia Interna 3 */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="relative overflow-hidden md:col-span-2 border border-gold/10 group"
            >
              <img src={barbeariaInterna3.url} alt="Ambiente VIP Seu José" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-105 transition-transform duration-1000" />
            </motion.div>

            {/* 7. Barbearia Interna 1 (Vertical) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="relative overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 border border-gold/10 md:row-span-2"
            >
              <img src={barbeariaInterna1.url} alt="Barbeiros em Ação" className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
            </motion.div>

            {/* 8. Barbearia Interna 2 (Largo) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="relative overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 border border-gold/10 md:col-span-3"
            >
              <img src={barbeariaInterna2.url} alt="Cuidado Premium" className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
            </motion.div>
          </div>
        </div>
      </section>
      {/* 15. Contato & Footer Premium - Movido para depois da Galeria */}
      <section id="contato" className="relative py-40 bg-forest-deep overflow-hidden border-t border-gold/10">
        <div className="absolute inset-0 opacity-[0.05] brick-texture pointer-events-none" />
        
        {/* Elemento Decorativo Gigante no Background */}
        <div className="absolute -bottom-20 -right-20 text-[20vw] font-serif font-black text-gold/5 pointer-events-none uppercase tracking-tighter select-none">
          Estilo
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            
            {/* Coluna de Informações e CTA */}
            <motion.div {...fadeInUp} className="space-y-16">
              <div className="space-y-6">
                <span className="text-gold font-bold uppercase tracking-[0.3em] text-xs inline-block border-b border-gold/30 pb-2">Agendamento & Localização</span>
                <h2 className="text-6xl md:text-9xl font-serif leading-none tracking-tighter text-cream uppercase">
                  Onde a <br />
                  <span className="text-gold italic">Magia</span> <br />
                  Acontece.
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                <div className="space-y-4 group">
                  <div className="w-12 h-12 flex items-center justify-center text-gold border border-gold/20 group-hover:bg-gold group-hover:text-forest-deep transition-all duration-500">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="text-gold font-bold uppercase text-[10px] tracking-widest mb-1">Endereço</h4>
                    <p className="text-lg text-cream/80 font-serif leading-tight">Rua Piratininga, 487 <br />São Caetano do Sul</p>
                  </div>
                </div>

                <div className="space-y-4 group">
                  <div className="w-12 h-12 flex items-center justify-center text-gold border border-gold/20 group-hover:bg-gold group-hover:text-forest-deep transition-all duration-500">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="text-gold font-bold uppercase text-[10px] tracking-widest mb-1">Horário de Luxo</h4>
                    <p className="text-lg text-cream/80 font-serif leading-tight">Seg-Sex: 10h às 20h <br />Sáb: 09h às 17h</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 pt-4">
                <Button size="xl" variant="premium" className="rounded-none px-12 h-16 text-lg uppercase tracking-widest shadow-2xl shadow-gold/10" asChild>
                  <a href="https://wa.me/5511931458599?text=Olá,%20gostaria%20de%20agendar%20um%20horário" target="_blank" rel="noopener noreferrer">
                    Agendar Horário <Scissors className="ml-2 w-5 h-5" />
                  </a>
                </Button>
                <Button size="xl" variant="outline" className="rounded-none px-12 h-16 border-cream/20 text-cream uppercase tracking-widest hover:bg-cream hover:text-forest-deep transition-all" asChild>
                  <a href="https://maps.app.goo.gl/rDbtF4nJ8pW2mK4Z9" target="_blank" rel="noopener noreferrer">Ver no Mapa</a>
                </Button>
              </div>
            </motion.div>

            {/* Coluna do Mapa Brutalista */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square md:aspect-video lg:aspect-square"
            >
              <div className="absolute -top-4 -left-4 w-full h-full border border-gold/20 z-0" />
              <div className="relative z-10 w-full h-full border-2 border-gold/40 shadow-2xl overflow-hidden group">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3655.441403215939!2d-46.562164!3d-23.624107!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce42d9b6a1250b%3A0x6a0c0e0e0e0e0e0e!2sRua%20Piratininga%2C%20487%20-%20Santa%20Maria%2C%20S%C3%A3o%20Caetano%20do%20Sul%20-%20SP%2C%2009550-160!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr" 
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
                <img src={logoAsset.url} alt="Logo Seu José" className="w-16 h-16 rounded-full border border-gold/20" />
                <div className="flex flex-col">
                  <span className="font-serif text-2xl tracking-tighter uppercase text-cream">Seu José</span>
                  <span className="text-[10px] uppercase tracking-[0.5em] text-gold font-bold">Barbershop</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-12 text-[10px] font-bold uppercase tracking-[0.3em] text-cream/40">
              <a href="https://www.instagram.com/seujosebarbershop" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-all duration-300">Instagram</a>
              <a href="https://wa.me/5511931458599?text=Olá,%20gostaria%20de%20agendar%20um%20horário" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-all duration-300">WhatsApp</a>
              <a href="https://play.google.com/store/apps/details?id=br.com.starapp.barbeariaseujose" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-all duration-300">Play Store</a>
            </div>

            <div className="text-[10px] uppercase tracking-widest text-cream/20">
              © 2026 — SCS / SP
            </div>
          </div>
        </div>
      </section>



      {/* Back to top */}
      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 hidden lg:flex w-12 h-12 bg-forest border border-gold/20 rounded-full items-center justify-center text-gold hover:bg-gold hover:text-forest-deep transition-all z-50"
      >
        <ArrowUp size={24} />
      </motion.button>
    </div>
  );
}
