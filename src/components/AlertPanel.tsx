import React from 'react';
import { motion } from 'framer-motion';
import { files } from '../data/mockData';

const AlertPanel: React.FC = () => {
  const alerts = files.filter(
    (f) => f.status === 'reconstruction' || f.status === 'erreur'
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7 }}
      className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm overflow-hidden"
    >
      <div className="p-4 sm:p-6 border-b border-white/10">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="font-[Syne] text-lg font-semibold text-white">
              Alertes & reconstructions
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Fichiers nécessitant une attention particulière
            </p>
          </div>
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#7B1FA2]/20 text-[#c084fc] text-sm font-bold border border-[#7B1FA2]/30">
            {alerts.length}
          </span>
        </div>
      </div>

      <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {alerts.map((file, i) => (
          <motion.div
            key={file.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -4 }}
            className="relative rounded-xl border border-white/10 overflow-hidden group"
          >
            <div className="absolute inset-0">
              <img
                src={file.preview}
                alt=""
                className="w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-[#0A1628]/90 to-[#0A1628]/60" />
            </div>
            <div className="relative p-4 sm:p-5">
              <div className="flex items-start justify-between gap-2 mb-3">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${
                    file.status === 'erreur'
                      ? 'bg-red-500/20 text-red-400'
                      : 'bg-purple-500/20 text-purple-300'
                  }`}
                >
                  {file.status === 'erreur' ? 'Échec conversion' : 'À reconstruire'}
                </span>
                <span className="text-[10px] text-slate-500">{file.updatedAt}</span>
              </div>
              <h4 className="text-sm font-semibold text-white mb-1 truncate">{file.name}</h4>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                {file.status === 'erreur'
                  ? 'Géométrie corrompue détectée. Relancez après nettoyage du fichier source.'
                  : 'Entités complexes incompatibles. Une reconstruction manuelle est recommandée.'}
              </p>
              <div className="flex gap-2">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-3 py-1.5 rounded-lg text-[11px] font-semibold bg-gradient-to-r from-[#7B1FA2] to-[#007BFF] text-white"
                >
                  Ouvrir le ticket
                </motion.button>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-3 py-1.5 rounded-lg text-[11px] font-medium text-slate-300 border border-white/10 hover:bg-white/5"
                >
                  Ignorer
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AlertPanel;
