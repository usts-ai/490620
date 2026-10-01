import React from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { conversionSeries, statusDistribution } from '../data/mockData';

const CustomTooltip = ({ active, payload, label }: {
  active?: boolean;
  payload?: Array<{ value: number; name: string; color: string }>;
  label?: string;
}) => {
  if (!active || !payload) return null;
  return (
    <div className="rounded-xl border border-white/10 bg-[#0A1628]/95 px-3 py-2 shadow-xl backdrop-blur-md">
      <p className="text-xs text-slate-400 mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.name} className="text-sm font-medium" style={{ color: p.color }}>
          {p.name === 'conversions' ? 'Conversions' : 'Erreurs'} : {p.value}
        </p>
      ))}
    </div>
  );
};

const ConversionChart: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7 }}
        className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-6 backdrop-blur-sm"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h3 className="font-[Syne] text-lg font-semibold text-white">Activité de conversion</h3>
            <p className="text-xs text-slate-400 mt-1">DWG → GLB sur 7 jours</p>
          </div>
          <div className="flex gap-4 text-xs">
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-[#007BFF]" /> Conversions
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-[#FF5252]" /> Erreurs
            </span>
          </div>
        </div>
        <div className="h-56 sm:h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={conversionSeries} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="gradConv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#007BFF" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#007BFF" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradErr" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FF5252" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#FF5252" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="jour" tick={{ fill: '#94A3B8', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#94A3B8', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="conversions"
                stroke="#007BFF"
                strokeWidth={2.5}
                fill="url(#gradConv)"
                animationDuration={1500}
              />
              <Area
                type="monotone"
                dataKey="erreurs"
                stroke="#FF5252"
                strokeWidth={2}
                fill="url(#gradErr)"
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7 }}
        className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-6 backdrop-blur-sm"
      >
        <h3 className="font-[Syne] text-lg font-semibold text-white mb-1">Répartition</h3>
        <p className="text-xs text-slate-400 mb-4">État du parc de fichiers</p>
        <div className="h-44 sm:h-48 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusDistribution}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={75}
                paddingAngle={4}
                dataKey="value"
                animationDuration={1200}
                stroke="none"
              >
                {statusDistribution.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: 'rgba(10,22,40,0.95)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 12,
                  fontSize: 12,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <span className="font-[Syne] text-2xl font-bold text-white">100</span>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider">fichiers</p>
            </div>
          </div>
        </div>
        <div className="mt-2 space-y-2">
          {statusDistribution.map((s) => (
            <div key={s.name} className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 text-slate-300">
                <span className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                {s.name}
              </span>
              <span className="font-semibold text-white">{s.value}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ConversionChart;
