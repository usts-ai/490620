import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const socials = [
    {
      label: 'LinkedIn',
      path: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 2a2 2 0 110 4 2 2 0 010-4z',
    },
    {
      label: 'Twitter',
      path: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z',
    },
    {
      label: 'GitHub',
      path: 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22',
    },
  ];

  const links = [
    { title: 'Produit', items: ['Conversion DWG', 'Aperçu GLB', 'API Forge', 'Tarifs'] },
    { title: 'Ressources', items: ['Documentation', 'Tutoriels CAD', 'Statut', 'Changelog'] },
    { title: 'Légal', items: ['Mentions légales', 'Confidentialité', 'CGU', 'Cookies'] },
  ];

  return (
    <footer className="relative mt-16 sm:mt-24 overflow-hidden border-t border-white/10">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628] via-[#0D1F3C] to-[#061018]" />
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#007BFF]/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#40E0D0]/10 rounded-full blur-[100px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#007BFF] via-[#40E0D0] to-[#92FE9D] flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0A1628" strokeWidth="2.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="font-[Syne] font-bold text-white text-lg">
                GLB<span className="text-[#00C9FF]">Forge</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs mb-6">
              Convertissez vos plans DWG en modèles GLB interactifs pour vos configurateurs 3D web.
              Précision CAD, fluidité web.
            </p>
            <div className="flex gap-3">
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href="#footer"
                  aria-label={s.label}
                  whileHover={{ y: -4, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-slate-400 hover:text-[#40E0D0] hover:border-[#40E0D0]/40 hover:bg-[#40E0D0]/10 transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={s.path} />
                  </svg>
                </motion.a>
              ))}
            </div>
          </div>

          {links.map((col) => (
            <div key={col.title}>
              <h4 className="font-[Syne] font-semibold text-white text-sm mb-4 tracking-wide">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.items.map((item) => (
                  <li key={item}>
                    <motion.a
                      href="#footer"
                      whileHover={{ x: 4 }}
                      className="inline-block text-sm text-slate-400 hover:text-[#00C9FF] transition-colors"
                    >
                      {item}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © 2026 GLBForge — Tous droits réservés
          </p>
          <motion.div
            animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            className="h-1 w-32 rounded-full"
            style={{
              backgroundImage: 'linear-gradient(90deg, #007BFF, #40E0D0, #92FE9D, #007BFF)',
              backgroundSize: '200% 100%',
            }}
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
