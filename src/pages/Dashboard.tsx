import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StatCard from '../components/StatCard';
import ConversionChart from '../components/ConversionChart';
import FileTable from '../components/FileTable';
import Preview3D from '../components/Preview3D';
import AlertPanel from '../components/AlertPanel';
import { stats, files, DwgFile } from '../data/mockData';

const Dashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState('vue');
  const [selectedFile, setSelectedFile] = useState<DwgFile | null>(files[0]);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const orbX = useTransform(scrollYProgress, [0, 1], [0, -80]);

  useEffect(() => {
    const ids = ['vue', 'fichiers', 'apercu', 'alertes'];
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const navigate = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#060D18] text-white overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] rounded-full bg-[#007BFF]/15 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-[#40E0D0]/10 blur-[120px]" />
        <div className="absolute top-[40%] right-[10%] w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] rounded-full bg-[#7B1FA2]/10 blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <Header activeSection={activeSection} onNavigate={navigate} />

      <main className="relative pt-20 sm:pt-24">
        <section ref={heroRef} id="vue" className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-10 sm:pb-16">
          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="pt-6 sm:pt-10 mb-10 sm:mb-14">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col lg:flex-row lg:items-end justify-between gap-6"
            >
              <div className="max-w-2xl">
                <motion.span
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wide uppercase bg-[#007BFF]/15 text-[#00C9FF] border border-[#007BFF]/30 mb-4"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#40E0D0] animate-pulse" />
                  Pipeline CAD actif
                </motion.span>
                <h1 className="font-[Syne] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
                  <span className="text-white">Convertisseur </span>
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage: 'linear-gradient(90deg, #00C9FF, #40E0D0, #92FE9D)',
                    }}
                  >
                    DWG → GLB
                  </span>
                </h1>
                <p className="mt-4 text-sm sm:text-base text-slate-400 leading-relaxed max-w-lg">
                  Supervisez vos conversions CAD en temps réel, visualisez les modèles GLB
                  et signalez les fichiers à reconstruire pour votre configurateur 3D.
                </p>
              </div>

              <motion.div
                style={{ x: orbX }}
                className="hidden lg:block relative w-48 h-48 shrink-0"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 rounded-full border border-dashed border-[#40E0D0]/30"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-4 rounded-full border border-[#007BFF]/40"
                />
                <div className="absolute inset-8 rounded-full bg-gradient-to-br from-[#007BFF]/40 to-[#40E0D0]/30 blur-sm" />
                <div className="absolute inset-10 rounded-full overflow-hidden border border-white/20">
                  <img
                    src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&q=80"
                    alt="Architecture CAD"
                    className="w-full h-full object-cover opacity-80"
                  />
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-8 sm:mb-12">
            {stats.map((stat, i) => (
              <StatCard key={stat.id} stat={stat} index={i} />
            ))}
          </div>

          <ConversionChart />
        </section>

        <section id="fichiers" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-8 sm:py-12">
          <FileTable
            selectedId={selectedFile?.id ?? null}
            onSelect={setSelectedFile}
          />
        </section>

        <section id="apercu" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-8 sm:py-12">
          <Preview3D file={selectedFile} />
        </section>

        <section id="alertes" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-8 sm:py-12">
          <AlertPanel />
        </section>

        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-8 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-3xl overflow-hidden border border-white/10"
          >
            <img
              src="https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1400"
              alt="Ingénierie 3D"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#060D18] via-[#060D18]/85 to-[#060D18]/40" />
            <div className="relative px-6 sm:px-10 py-12 sm:py-16 max-w-xl">
              <h2 className="font-[Syne] text-2xl sm:text-3xl font-bold text-white mb-3">
                Prêt pour le configurateur web
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
                Exportez vos modèles GLB optimisés et intégrez-les directement dans votre
                expérience 3D interactive. Qualité CAD, performance navigateur.
              </p>
              <motion.button
                type="button"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-3 rounded-full text-sm font-semibold text-[#0A1628] bg-gradient-to-r from-[#00C9FF] to-[#92FE9D] shadow-xl shadow-cyan-500/20"
              >
                Lancer une conversion
              </motion.button>
            </div>
          </motion.div>
        </section>
      </main>

      <div id="footer">
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
