import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Scissors, Star, Clock, Calendar, MapPin, Phone } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-gold selection:text-white">
      {/* Navbar Placeholder */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-6 px-12 transition-all duration-300">
        <div className="text-2xl font-serif font-bold tracking-tighter">SEU JOSÉ</div>
        <div className="flex gap-8 items-center text-sm font-medium tracking-wide">
          {["Home", "Serviços", "Assinatura", "Contato"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-gold transition-colors">{item}</a>
          ))}
          <button className="bg-gold text-primary font-bold px-6 py-2 rounded-full hover:bg-white transition-colors">
            Agendar
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative h-screen flex flex-col justify-center items-center text-center p-6 bg-dark">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=2000')] bg-cover bg-center opacity-40" />
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 space-y-6"
        >
          <h1 className="text-6xl md:text-8xl font-serif text-white tracking-tight">Corte, Barba e <br />Experiência Premium.</h1>
          <p className="text-lg md:text-xl text-stone-300 max-w-2xl mx-auto">Mais do que um corte. Um atendimento pensado para quem valoriza estilo, conforto e qualidade.</p>
          <div className="flex gap-4 justify-center">
            <button className="bg-gold text-primary font-bold px-8 py-4 rounded-full text-lg hover:bg-white transition-colors">Agendar Agora</button>
            <button className="border border-white/30 text-white font-bold px-8 py-4 rounded-full text-lg hover:bg-white/10 transition-colors">Conhecer Serviços</button>
          </div>
        </motion.div>
      </section>

      {/* Diferenciais */}
      <section className="py-24 px-12 bg-stone-50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {[
            { icon: Scissors, title: "Atendimento", desc: "Profissionais experientes." },
            { icon: Star, title: "Qualidade", desc: "Ambiente climatizado e premium." },
            { icon: Calendar, title: "Agendamento", desc: "Rápido pelo nosso app." },
          ].map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="p-8 bg-white border border-stone-200 rounded-3xl hover:border-gold transition-all shadow-sm"
            >
              <item.icon className="w-10 h-10 text-gold mb-6" />
              <h3 className="text-2xl font-serif mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer Placeholder */}
      <footer className="py-12 px-12 bg-dark text-stone-400">
        <div className="text-center text-sm">
          <p>© 2026 Seu José Barbershop. Rua Piratininga, 487 – São Caetano do Sul</p>
          <div className="flex justify-center gap-6 mt-4">
            <a href="#" className="flex items-center gap-2 hover:text-gold">@seujosebarbershop</a>
            <a href="#" className="flex items-center gap-2 hover:text-gold"><Phone size={18}/> (11) 99999-9999</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
