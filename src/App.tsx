import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Star, ArrowRight, ShieldCheck, Camera, 
  Moon, Sun, Bath, ClipboardCheck, 
  MessageCircle, Phone, AlertCircle, X, Send,
  Instagram, MapPin, CheckCircle2,
  ChevronLeft, ChevronRight
} from "lucide-react";

const assets = {
  logo: "https://s.ntc.qzz.io/s/equilibracao-logo",
  hero: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2069&auto=format&fit=crop",
  science: "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?q=80&w=2070&auto=format&fit=crop",
  gallery: [
    "https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1544568100-847a948585b9?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?q=80&w=1976&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=1962&auto=format&fit=crop",
  ],
  serviceDaycare: "https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=2070&auto=format&fit=crop",
  serviceHospedagem: "https://images.unsplash.com/photo-1544568100-847a948585b9?q=80&w=1974&auto=format&fit=crop",
  serviceBanho: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=2071&auto=format&fit=crop",
  whatsapp: "https://api.whatsapp.com/send?phone=5511999999999&text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20avalia%C3%A7%C3%A3o!"
};

const LordIcon = "lord-icon" as any;

const testimonials = [
  { text: "Mesmo sendo uma creche grande, eles conhecem a personalidade de cada cachorro. O atendimento é incrível!", name: "Atenção Individual", role: "Tutor" },
  { text: "Amo poder ver meu filhote pelas câmeras o dia todo. Me dá uma paz de espírito sem igual.", name: "Transparência", role: "Tutor" },
  { text: "Meu cachorro era muito tímido. No Recreio ele se soltou e hoje corre para entrar quando chegamos na porta.", name: "Socialização", role: "Tutor" },
  { text: "O lugar é extremamente limpo. Você não sente aquele cheiro característico de hotel pet. Tudo impecável.", name: "Higiene", role: "Tutor" },
  { text: "Os tios e tias são apaixonados pelo que fazem. Tratamento VIP para os bichinhos.", name: "Equipe", role: "Tutor" },
  { text: "Fico tranquila sabendo que tem veterinário acompanhando. Segurança em primeiro lugar sempre.", name: "Saúde", role: "Tutor" },
  { text: "Ele volta para casa 'descarregado'. Dorme o dia seguinte inteiro de tanto que brincou. Vale cada centavo.", name: "Energia", role: "Tutor" },
  { text: "As festas temáticas são a coisa mais fofa! Eles realmente se envolvem na experiência.", name: "Festinhas", role: "Tutor" },
  { text: "Viajo tranquila sabendo que ele está no Recreio. É a segunda casa dele há anos.", name: "Confiança", role: "Tutor" },
  { text: "Processo de entrada e saída muito organizado, mesmo nos dias de movimento intenso.", name: "Check-in", role: "Tutor" }
];

const services = [
  {
    id: "daycare",
    title: "Daycare (Creche)",
    icon: <Sun size={32} />,
    image: assets.serviceDaycare,
    desc: "Pacotes mensais para o seu pet gastar energia, socializar e ser feliz todos os dias.",
    process: "Assinatura Mensal"
  },
  {
    id: "hospedagem",
    title: "Hotel Pet",
    icon: <Moon size={32} />,
    image: assets.serviceHospedagem,
    desc: "Férias sem estresse para você e para ele. Quartos confortáveis e muita diversão.",
    process: "Sazonalidade"
  },
  {
    id: "banho",
    title: "Banho & Tosa",
    icon: <Bath size={32} />,
    image: assets.serviceBanho,
    desc: "O SPA do Recreio. Produtos premium e profissionais carinhosos para o seu melhor amigo.",
    process: "Estética Animal"
  }
];

// --- COMPONENTES AUXILIARES ---

const TestimonialsColumn = ({ testimonials, duration, className }: { testimonials: any[], duration: number, className?: string }) => (
  <div className={`flex flex-col gap-6 ${className}`}>
    <motion.div
      animate={{ translateY: "-50%" }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
      className="flex flex-col gap-6 pb-6"
    >
      {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
        <div key={i} className="p-8 rounded-[24px] bg-primary border border-white/5 shadow-lg max-w-xs w-full">
          <div className="flex gap-1 text-accent mb-4">
            {[...Array(5)].map((_, s) => <Star key={s} size={14} fill="currentColor" />)}
          </div>
          <p className="text-[14px] leading-relaxed text-white/90 italic">"{t.text}"</p>
          <div className="flex items-center gap-3 mt-6">
            <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-xs">
              {t.name.split(' ')[0][0]}
            </div>
            <div>
              <div className="font-bold text-[14px]">{t.name}</div>
              <div className="text-[12px] text-white/50">{t.role}</div>
            </div>
          </div>
        </div>
      ))}
    </motion.div>
  </div>
);

const FloatingWhatsApp = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-[300px] bg-white rounded-[24px] shadow-2xl overflow-hidden text-gray-800"
          >
            <div className="bg-primary p-4 text-white flex justify-between items-center">
              <div>
                <h4 className="font-bold">Concierge Digital</h4>
                <p className="text-[12px] opacity-80">Como podemos ajudar hoje?</p>
              </div>
              <button onClick={() => setIsOpen(false)} aria-label="Fechar"><X size={20} /></button>
            </div>
            <div className="p-4 space-y-3">
              <a 
                href={assets.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center gap-3 p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors text-left"
              >
                <div className="bg-accent/10 p-2 rounded-lg"><ClipboardCheck size={20} className="text-accent" /></div>
                <div className="text-[14px] font-medium">Solicitar Avaliação</div>
              </a>
              <a 
                href={assets.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center gap-3 p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors text-left"
              >
                <div className="bg-accent/10 p-2 rounded-lg"><MessageCircle size={20} className="text-accent" /></div>
                <div className="text-[14px] font-medium">Área do Cliente (Câmeras)</div>
              </a>
              <a 
                href={assets.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center gap-3 p-3 bg-red-50 rounded-xl hover:bg-red-100 transition-colors text-left"
              >
                <div className="bg-red-500 p-2 rounded-lg"><AlertCircle size={20} className="text-white" /></div>
                <div className="text-[14px] font-medium text-red-600">Emergência</div>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center"
        aria-label="Abrir WhatsApp"
      >
        <MessageCircle size={32} />
      </button>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL ---
export default function App() {
  const [formStep, setFormStep] = useState(1);
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  const scrollGallery = (direction: 'left' | 'right') => {
    if (galleryRef.current) {
      const { scrollLeft, clientWidth } = galleryRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      galleryRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  // Form State
  const [formData, setFormData] = useState({
    petName: "",
    breed: "",
    behavior: "Sociável e calmo",
  });
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.petName.trim()) newErrors.petName = "Nome do pet é obrigatório";
    if (!formData.breed.trim()) newErrors.breed = "Raça é obrigatória";
    if (!file) newErrors.file = "Carteira de vacinas é obrigatória";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setFormStep(2);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setErrors(prev => ({ ...prev, file: "" }));
    }
  };

  return (
    <div className="min-h-screen bg-primary text-surface font-sans selection:bg-accent selection:text-white overflow-x-hidden">
      
      {/* HEADER */}
      <header className={`fixed top-0 w-full z-[90] transition-all duration-300 px-6 ${isScrolled ? 'py-4 bg-primary/95 backdrop-blur-md shadow-xl' : 'py-8 bg-transparent'}`}>
        <div className="max-w-[1200px] mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-white rounded-xl flex items-center justify-center p-1 shadow-lg overflow-hidden">
               <LordIcon
                  src="https://cdn.lordicon.com/zybujcxz.json"
                  trigger="in"
                  delay="1500"
                  state="in-reveal"
                  colors="primary:#0a1931,secondary:#70c14a"
                  style={{ width: '40px', height: '40px' }}
               />
            </div>
            <div className="flex flex-col">
              <span className="text-[16px] font-bold tracking-widest uppercase leading-none">Recreio dos Bichos</span>
              <span className="text-[9px] uppercase tracking-[0.2em] opacity-50">O Play de São Paulo</span>
            </div>
          </div>
          <nav className="hidden lg:flex gap-10 text-[12px] tracking-widest uppercase font-semibold text-slate-400">
            <a href="#metodologia" className="hover:text-accent transition-colors">A Metodologia</a>
            <a href="#servicos" className="hover:text-accent transition-colors">Serviços</a>
            <a href="#unidades" className="hover:text-accent transition-colors">Galeria</a>
            <a href={assets.whatsapp} target="_blank" rel="noopener noreferrer" className="bg-accent text-primary px-6 py-2 rounded-full hover:bg-accent-hover transition-all font-bold">Solicitar Avaliação</a>
          </nav>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={assets.hero} 
            alt="Recreio dos Bichos Hero" 
            className="w-full h-full object-cover opacity-40 scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/40 to-primary" />
        </div>

        <div className="container relative z-10 max-w-[1200px] px-6 mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 px-4 py-2 rounded-full text-[11px] uppercase tracking-widest font-bold backdrop-blur-sm text-accent">
              <Sun size={16} /> O Centro de Entretenimento e Bem-Estar
            </div>
            <h1 className="text-[48px] lg:text-[84px] font-bold leading-[1] tracking-tight">
              Onde o dia <span className="text-accent italic font-serif">mais feliz</span> da semana acontece.
            </h1>
            <p className="text-[18px] lg:text-[20px] text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Mais espaço, mais amigos, mais recreio! O lugar perfeito para o seu cão gastar energia e ser feliz.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
              <a href={assets.whatsapp} target="_blank" rel="noopener noreferrer" className="bg-accent text-primary px-10 py-5 rounded-full font-bold text-[16px] hover:bg-accent-hover transition-all shadow-xl hover:shadow-accent/40 flex items-center justify-center gap-2 group">
                Agendar Avaliação <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#metodologia" className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-5 rounded-full font-bold text-[16px] hover:bg-white/20 transition-all flex items-center justify-center gap-2">
                Conhecer o Recreio
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* METODOLOGIA SECTION */}
      <section id="metodologia" className="py-32 bg-primary relative overflow-hidden">
        <div className="container max-w-[1200px] mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="inline-block text-accent font-bold uppercase tracking-[0.3em] text-[11px]">Diferenciais</div>
            <h2 className="text-[42px] lg:text-[56px] font-bold leading-tight italic font-serif">O Jeito Recreio de Ser.</h2>
            <p className="text-slate-300 text-[18px] leading-relaxed">
              Ícones modernos e minimalistas para resolver as dúvidas rápidas e garantir a melhor experiência para você e seu pet.
            </p>
            
            <div className="space-y-6">
              {[
                { title: "Monitoramento", desc: "Câmeras ao vivo para você matar a saudade a qualquer momento." },
                { title: "Saúde", desc: "Veterinários de plantão e controle rigoroso de vacinas." },
                { title: "Espaço", desc: "Áreas amplas e higienizadas para cada porte." }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="h-12 w-12 rounded-2xl bg-accent/20 flex items-center justify-center shrink-0 text-accent font-bold">0{i+1}</div>
                  <div>
                    <h4 className="font-bold mb-1 text-white">{item.title}</h4>
                    <p className="text-slate-400 text-[14px]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          <div className="relative">
            <img src={assets.science} alt="Metodologia" className="rounded-[48px] shadow-2xl border border-white/10" referrerPolicy="no-referrer" />
            <div className="absolute -bottom-10 -left-10 bg-accent p-8 rounded-[32px] shadow-2xl hidden lg:block max-w-xs">
              <p className="text-primary font-bold text-[20px] leading-tight mb-2">100% Diversão</p>
              <p className="text-primary/80 text-[14px] font-medium">Cães mais felizes e tutores mais tranquilos todos os dias.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO SERVIÇOS */}
      <section id="servicos" className="py-32 bg-[#071224]">
        <div className="container max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-[42px] font-bold italic font-serif">Ecossistema de Serviços</h2>
            <p className="text-slate-400 max-w-[600px] mx-auto text-[17px]">Cuidado individualizado focado no desenvolvimento comportamental.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map(s => (
              <div key={s.id} className="bg-primary rounded-[40px] border border-white/5 overflow-hidden hover:border-accent/50 transition-all group shadow-2xl">
                <div 
                  className="h-64 overflow-hidden relative cursor-zoom-in"
                  onClick={() => setSelectedImage(s.image)}
                >
                   <img src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                   <div className="absolute top-6 left-6 bg-accent p-3 rounded-2xl text-primary shadow-lg">
                      {s.icon}
                   </div>
                </div>
                <div className="p-10">
                  <h3 className="text-[24px] font-bold mb-4">{s.title}</h3>
                  <p className="text-slate-400 text-[15px] mb-8 leading-relaxed">{s.desc}</p>
                  <div className="pt-6 border-t border-white/5 text-[12px] font-bold text-accent flex items-center gap-2 uppercase tracking-widest">
                    <CheckCircle2 size={16} /> {s.process}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALERIA SECTION */}
      <section id="unidades" className="py-32 bg-primary">
        <div className="container max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
            <div className="space-y-4">
              <div className="inline-block text-accent font-bold uppercase tracking-[0.3em] text-[11px]">Experiência 360º</div>
              <h2 className="text-[42px] font-bold italic font-serif">Nossa Galeria.</h2>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-slate-400 max-w-md text-[17px] hidden lg:block">Momentos de alegria, socialização e cuidado em nossas instalações premium.</p>
              <div className="flex gap-2">
                <button 
                  onClick={() => scrollGallery('left')}
                  className="h-12 w-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-accent hover:border-accent transition-all cursor-pointer"
                  aria-label="Anterior"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={() => scrollGallery('right')}
                  className="h-12 w-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-accent hover:border-accent transition-all cursor-pointer"
                  aria-label="Próximo"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>
          </div>

          <div 
            ref={galleryRef}
            className="flex overflow-x-auto gap-6 pb-12 snap-x snap-mandatory no-scrollbar scroll-smooth"
          >
            {assets.gallery.map((img, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="min-w-[300px] lg:min-w-[400px] h-[500px] rounded-[48px] overflow-hidden snap-center relative group cursor-pointer"
                onClick={() => setSelectedImage(img)}
              >
                <img 
                  src={img} 
                  alt={`Galeria ${i+1}`} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" 
                  referrerPolicy="no-referrer" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                <div className="absolute bottom-8 left-8 transform group-hover:translate-y-[-10px] transition-transform">
                  <p className="text-white font-bold text-[20px]">Recreio Momento {i+1}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRÉ-RESERVA */}
      <section id="reserva" className="py-32 bg-[#071224]">
        <div className="container max-w-[1200px] mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <div>
             <div className="inline-block text-accent font-bold uppercase tracking-[0.3em] text-[11px] mb-4">Portal do Cliente</div>
            <h2 className="text-[42px] font-bold leading-tight mb-8 italic font-serif text-white">Autonomia e Facilidade.</h2>
            <p className="text-slate-400 text-[17px] mb-12 leading-relaxed">
              Antecipe o check-in do seu pet ou acesse as câmeras ao vivo diretamente pelo nosso portal. Menos tempo na fila, mais tempo de diversão.
            </p>
            
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="h-12 w-12 rounded-2xl bg-accent/20 flex items-center justify-center shrink-0"><ShieldCheck className="text-accent" /></div>
                <div>
                   <h4 className="font-bold mb-1 text-white">Check-in Online</h4>
                  <p className="text-slate-400 text-[14px]">Preencha os dados antes de sair de casa e evite filas na recepção.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="h-12 w-12 rounded-2xl bg-accent/20 flex items-center justify-center shrink-0"><Camera className="text-accent" /></div>
                <div>
                  <h4 className="font-bold mb-1 text-white">Webcam Integrada</h4>
                  <p className="text-slate-400 text-[14px]">Acesse o sistema de câmeras e acompanhe o dia do seu melhor amigo.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 lg:p-12 rounded-[48px] shadow-2xl text-gray-900 relative">
            {formStep === 1 ? (
              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest">Nome do Pet</label>
                    <input 
                      type="text" 
                      className={`w-full bg-slate-50 border ${errors.petName ? 'border-red-500' : 'border-slate-100'} p-4 rounded-2xl focus:border-accent outline-none transition-all`} 
                      placeholder="Ex: Thor" 
                      value={formData.petName}
                      onChange={(e) => setFormData({ ...formData, petName: e.target.value })}
                    />
                    {errors.petName && <p className="text-red-500 text-[10px] font-bold">{errors.petName}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest">Raça</label>
                    <input 
                      type="text" 
                      className={`w-full bg-slate-50 border ${errors.breed ? 'border-red-500' : 'border-slate-100'} p-4 rounded-2xl focus:border-accent outline-none transition-all`} 
                      placeholder="Ex: Golden" 
                      value={formData.breed}
                      onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                    />
                    {errors.breed && <p className="text-red-500 text-[10px] font-bold">{errors.breed}</p>}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest">Serviço Desejado</label>
                  <select 
                    className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl outline-none appearance-none cursor-pointer"
                    value={formData.behavior}
                    onChange={(e) => setFormData({ ...formData, behavior: e.target.value })}
                  >
                    <option>Daycare (Creche)</option>
                    <option>Hotel Pet</option>
                    <option>Banho & Tosa</option>
                    <option>Avaliação Inicial</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest">Carteira de Vacinas</label>
                  <label className={`border-2 border-dashed ${errors.file ? 'border-red-500' : 'border-accent/20'} p-6 rounded-[28px] flex flex-col items-center gap-3 cursor-pointer hover:bg-slate-50 transition-colors group relative`}>
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*,.pdf"
                      onChange={handleFileChange}
                    />
                    <div className="bg-accent/10 p-3 rounded-full group-hover:scale-110 transition-transform"><Camera size={20} className="text-accent" /></div>
                    <span className="text-[13px] text-gray-400 font-bold">
                      {file ? file.name : "Anexar foto ou PDF"}
                    </span>
                  </label>
                  {errors.file && <p className="text-red-500 text-[10px] font-bold text-center">{errors.file}</p>}
                </div>
                <button type="submit" className="w-full bg-accent text-primary py-5 rounded-[20px] font-bold text-[17px] shadow-xl flex items-center justify-center gap-3 hover:bg-accent-hover transition-all transform hover:-translate-y-1 cursor-pointer">
                  Fazer Check-in Online <Send size={20} />
                </button>
                <p className="text-[11px] text-center text-gray-400">Agiliza sua entrada na recepção.</p>
              </form>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12 space-y-6">
                <div className="h-20 w-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-[28px] font-bold text-primary">Check-in Concluído!</h3>
                <p className="text-gray-500 text-[17px]">Tudo pronto para receber seu pet com muita alegria.</p>
                <button onClick={() => setFormStep(1)} className="text-accent font-bold underline hover:text-accent-hover cursor-pointer">Fazer novo check-in</button>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* PROVA SOCIAL */}
      <section id="depoimentos" className="py-32 bg-primary overflow-hidden">
        <div className="container max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-24">
             <div className="inline-flex items-center gap-2 text-accent mb-6 font-bold tracking-[0.4em] uppercase text-[11px]">
              <Star size={16} fill="currentColor" /> 5.0 no Google Business
            </div>
            <h2 className="text-[42px] font-bold italic font-serif leading-tight">Voz do Cliente.</h2>
          </div>

          <div className="flex justify-center gap-8 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] h-[650px] overflow-hidden">
            <TestimonialsColumn testimonials={testimonials.slice(0, 5)} duration={35} className="hidden sm:flex" />
            <TestimonialsColumn testimonials={testimonials.slice(5, 10)} duration={40} className="flex" />
            <TestimonialsColumn testimonials={testimonials.slice(0, 5)} duration={38} className="hidden lg:flex" />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-primary pt-24 pb-12 border-t border-white/5">
        <div className="container max-w-[1200px] mx-auto px-6 grid md:grid-cols-4 gap-12">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
               <div className="h-10 w-10 bg-white rounded flex items-center justify-center p-1">
                 <LordIcon
                    src="https://cdn.lordicon.com/zybujcxz.json"
                    trigger="in"
                    delay="1500"
                    state="in-reveal"
                    colors="primary:#0a1931,secondary:#70c14a"
                    style={{ width: '32px', height: '32px' }}
                 />
               </div>
               <span className="text-[16px] font-bold tracking-widest uppercase">Recreio dos Bichos</span>
            </div>
            <p className="text-slate-400 text-[14px] leading-relaxed">
              Onde o dia mais feliz da semana acontece. O lugar perfeito para o seu cão gastar energia e ser feliz.
            </p>
            <div className="flex gap-4">
              <a href="#" className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent transition-colors text-white"><Instagram size={18} /></a>
              <a href="#" className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent transition-colors text-white"><Phone size={18} /></a>
            </div>
          </div>
          
          <div className="space-y-6">
            <h5 className="font-bold uppercase text-[11px] tracking-[0.2em] text-accent">Navegação</h5>
            <ul className="space-y-4 text-[13px] text-slate-400">
              <li><a href="#metodologia" className="hover:text-white transition-colors">Diferenciais</a></li>
              <li><a href="#servicos" className="hover:text-white transition-colors">Serviços</a></li>
              <li><a href="#unidades" className="hover:text-white transition-colors">Galeria</a></li>
              <li><a href={assets.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Área do Cliente</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h5 className="font-bold uppercase text-[11px] tracking-[0.2em] text-accent">Contato</h5>
            <div className="space-y-4 text-[13px] text-slate-400">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-accent shrink-0" />
                <span>
                  São Paulo - SP<br/>
                  <span className="text-[11px] opacity-60">Venha nos visitar!</span>
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={18} className="text-accent shrink-0" />
                <span>(11) 99999-9999</span>
              </div>
              <div className="flex items-start gap-3">
                <Sun size={18} className="text-accent shrink-0" />
                <span>Aberto · Fecha 19:00</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h5 className="font-bold uppercase text-[11px] tracking-[0.2em] text-accent">Qualidade</h5>
            <div className="bg-accent/10 p-5 rounded-[24px] border border-accent/20 space-y-4">
               <div>
                 <ShieldCheck size={28} className="text-accent mb-3" />
                 <p className="text-[12px] font-bold text-white uppercase tracking-wider mb-1">Bem-Estar</p>
                 <p className="text-[11px] text-slate-400">Monitoramento contínuo e controle rigoroso de higiene.</p>
               </div>
               <div className="pt-4 border-t border-accent/10 flex items-center gap-2">
                 <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                 <p className="text-[10px] font-bold text-accent uppercase tracking-widest">100% Diversão</p>
               </div>
            </div>
          </div>
        </div>
        
        <div className="container max-w-[1200px] mx-auto px-6 mt-20 pt-8 border-t border-white/5 text-center">
          <p className="text-[11px] text-white/20 uppercase tracking-[0.3em]">
            © 2026 Recreio dos Bichos • Todos os direitos reservados
          </p>
        </div>
      </footer>

      <FloatingWhatsApp />

      {/* IMAGE MODAL */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-6 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute top-0 right-0 m-4 text-white hover:text-accent transition-colors z-10"
              >
                <X size={32} />
              </button>
              <img 
                src={selectedImage} 
                alt="Visualização ampliada" 
                className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
