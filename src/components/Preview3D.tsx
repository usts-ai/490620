import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { DwgFile, statusLabels, statusColors } from '../data/mockData';

interface Preview3DProps {
  file: DwgFile | null;
}

const Preview3D: React.FC<Preview3DProps> = ({ file }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const w = canvas.getBoundingClientRect().width;
      const h = canvas.getBoundingClientRect().height;
      frame += 0.008;
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const rotY = frame;
      const rotX = 0.4 + Math.sin(frame * 0.5) * 0.15;

      const project = (x: number, y: number, z: number) => {
        const cosY = Math.cos(rotY);
        const sinY = Math.sin(rotY);
        const cosX = Math.cos(rotX);
        const sinX = Math.sin(rotX);
        let x1 = x * cosY - z * sinY;
        let z1 = x * sinY + z * cosY;
        let y1 = y * cosX - z1 * sinX;
        z1 = y * sinX + z1 * cosX;
        const scale = 180 / (4 + z1);
        return { x: cx + x1 * scale, y: cy + y1 * scale, z: z1 };
      };

      const size = 1.2;
      const verts = [
        [-size, -size, -size], [size, -size, -size], [size, size, -size], [-size, size, -size],
        [-size, -size, size], [size, -size, size], [size, size, size], [-size, size, size],
      ];
      const edges = [
        [0, 1], [1, 2], [2, 3], [3, 0],
        [4, 5], [5, 6], [6, 7], [7, 4],
        [0, 4], [1, 5], [2, 6], [3, 7],
      ];

      const projected = verts.map((v) => project(v[0], v[1], v[2]));

      const grid = 5;
      ctx.strokeStyle = 'rgba(0, 201, 255, 0.08)';
      ctx.lineWidth = 1;
      for (let i = -grid; i <= grid; i++) {
        const a = project(i * 0.35, 1.4, -grid * 0.35);
        const b = project(i * 0.35, 1.4, grid * 0.35);
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
        const c = project(-grid * 0.35, 1.4, i * 0.35);
        const d = project(grid * 0.35, 1.4, i * 0.35);
        ctx.beginPath();
        ctx.moveTo(c.x, c.y);
        ctx.lineTo(d.x, d.y);
        ctx.stroke();
      }

      edges.forEach(([a, b]) => {
        const p1 = projected[a];
        const p2 = projected[b];
        const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
        grad.addColorStop(0, '#007BFF');
        grad.addColorStop(0.5, '#40E0D0');
        grad.addColorStop(1, '#92FE9D');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.shadowColor = '#40E0D0';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      });
      ctx.shadowBlur = 0;

      projected.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = '#40E0D0';
        ctx.fill();
      });

      const midEdges = [
        [0, 2], [1, 3], [4, 6], [5, 7],
      ];
      midEdges.forEach(([a, b]) => {
        const p1 = projected[a];
        const p2 = projected[b];
        ctx.strokeStyle = 'rgba(146, 254, 157, 0.25)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [file]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7 }}
      className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm overflow-hidden"
    >
      <div className="p-4 sm:p-6 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="font-[Syne] text-lg font-semibold text-white">Aperçu 3D temps réel</h3>
          <p className="text-xs text-slate-400 mt-1">
            {file ? file.name : 'Sélectionnez un fichier pour prévisualiser'}
          </p>
        </div>
        {file && (
          <span
            className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold"
            style={{
              background: `${statusColors[file.status]}22`,
              color: statusColors[file.status],
            }}
          >
            {statusLabels[file.status]}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5">
        <div className="lg:col-span-3 relative h-64 sm:h-80 bg-[#060D18]">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                'radial-gradient(circle at 50% 50%, rgba(0,123,255,0.2), transparent 70%)',
            }}
          />
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
          <div className="absolute bottom-3 left-3 flex gap-2">
            {['Orbit', 'Zoom', 'Export GLB'].map((btn) => (
              <motion.button
                key={btn}
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-1.5 rounded-lg text-[11px] font-medium bg-white/10 text-white border border-white/10 hover:bg-[#40E0D0]/20 hover:border-[#40E0D0]/40 transition-colors backdrop-blur-sm"
              >
                {btn}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 p-4 sm:p-6 border-t lg:border-t-0 lg:border-l border-white/10">
          {file ? (
            <div className="space-y-5">
              <div className="rounded-xl overflow-hidden border border-white/10 aspect-video">
                <img
                  src={file.preview}
                  alt={file.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="space-y-3">
                {[
                  { label: 'Format source', value: 'DWG' },
                  { label: 'Format cible', value: 'GLB / glTF 2.0' },
                  { label: 'Taille', value: file.size },
                  { label: 'Version CAD', value: file.version },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between text-sm">
                    <span className="text-slate-500">{row.label}</span>
                    <span className="text-white font-medium">{row.value}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-[#0A1628] bg-gradient-to-r from-[#00C9FF] to-[#92FE9D]"
                >
                  Télécharger GLB
                </motion.button>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white border border-white/15 bg-white/5 hover:bg-white/10"
                >
                  Signaler
                </motion.button>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center py-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#007BFF]/20 to-[#40E0D0]/20 flex items-center justify-center mb-4 border border-white/10">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#40E0D0" strokeWidth="1.5">
                  <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                  <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
              </div>
              <p className="text-sm text-slate-400 max-w-[200px]">
                Cliquez sur un fichier DWG pour lancer l&apos;aperçu wireframe GLB
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Preview3D;
