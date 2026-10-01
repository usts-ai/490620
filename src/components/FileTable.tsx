import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { files, statusLabels, statusColors, FileStatus, DwgFile } from '../data/mockData';

interface FileTableProps {
  onSelect: (file: DwgFile) => void;
  selectedId: string | null;
}

const filters: Array<{ key: FileStatus | 'tous'; label: string }> = [
  { key: 'tous', label: 'Tous' },
  { key: 'converti', label: 'Convertis' },
  { key: 'en_cours', label: 'En cours' },
  { key: 'reconstruction', label: 'Reconstruction' },
  { key: 'erreur', label: 'Erreurs' },
];

const FileTable: React.FC<FileTableProps> = ({ onSelect, selectedId }) => {
  const [filter, setFilter] = useState<FileStatus | 'tous'>('tous');

  const filtered = filter === 'tous' ? files : files.filter((f) => f.status === filter);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7 }}
      className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm overflow-hidden"
    >
      <div className="p-4 sm:p-6 border-b border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-[Syne] text-lg font-semibold text-white">Gestion des fichiers</h3>
            <p className="text-xs text-slate-400 mt-1">Import, conversion et signalement</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setFilter(f.key)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                  filter === f.key
                    ? 'bg-gradient-to-r from-[#007BFF] to-[#40E0D0] text-[#0A1628] shadow-lg shadow-cyan-500/20'
                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className="text-left text-[11px] uppercase tracking-wider text-slate-500 border-b border-white/5">
              <th className="px-4 sm:px-6 py-3 font-medium">Fichier</th>
              <th className="px-4 py-3 font-medium">Version</th>
              <th className="px-4 py-3 font-medium">Statut</th>
              <th className="px-4 py-3 font-medium">Progression</th>
              <th className="px-4 sm:px-6 py-3 font-medium">Mis à jour</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence mode="popLayout">
              {filtered.map((file, i) => (
                <motion.tr
                  key={file.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ delay: i * 0.04, duration: 0.35 }}
                  onClick={() => onSelect(file)}
                  className={`cursor-pointer border-b border-white/5 transition-colors ${
                    selectedId === file.id
                      ? 'bg-[#007BFF]/10'
                      : 'hover:bg-white/[0.04]'
                  }`}
                >
                  <td className="px-4 sm:px-6 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-white/10">
                        <img
                          src={file.preview}
                          alt={file.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white truncate max-w-[160px] sm:max-w-[220px]">
                          {file.name}
                        </p>
                        <p className="text-[11px] text-slate-500">{file.size}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-xs text-slate-400">{file.version}</td>
                  <td className="px-4 py-3.5">
                    <span
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold"
                      style={{
                        background: `${statusColors[file.status]}22`,
                        color: statusColors[file.status],
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: statusColors[file.status] }}
                      />
                      {statusLabels[file.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2 min-w-[100px]">
                      <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${file.progress}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className="h-full rounded-full"
                          style={{
                            background:
                              file.status === 'erreur'
                                ? '#FF5252'
                                : 'linear-gradient(90deg, #007BFF, #40E0D0)',
                          }}
                        />
                      </div>
                      <span className="text-[11px] text-slate-400 w-8 text-right">
                        {file.progress}%
                      </span>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-3.5 text-xs text-slate-500">{file.updatedAt}</td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && (
        <div className="py-12 text-center text-sm text-slate-500">
          Aucun fichier dans cette catégorie
        </div>
      )}
    </motion.div>
  );
};

export default FileTable;
