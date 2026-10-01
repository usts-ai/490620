import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { StatItem } from '../data/mockData';

interface StatCardProps {
  stat: StatItem;
  index: number;
}

const StatCard: React.FC<StatCardProps> = ({ stat, index }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(count, stat.value, {
      duration: 1.6,
      delay: 0.2 + index * 0.12,
      ease: [0.22, 1, 0.36, 1],
    });
    const unsub = rounded.on('change', (v) => setDisplay(v));
    return () => {
      controls.stop();
      unsub();
    };
  }, [count, rounded, stat.value, index]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6 backdrop-blur-sm"
    >
      <div
        className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-20 blur-2xl transition-opacity duration-500 group-hover:opacity-40"
        style={{ background: stat.color }}
      />
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs sm:text-sm text-slate-400 font-medium tracking-wide">
            {stat.label}
          </span>
          <span
            className="w-2.5 h-2.5 rounded-full animate-pulse"
            style={{ background: stat.color, boxShadow: `0 0 12px ${stat.color}` }}
          />
        </div>
        <div className="flex items-baseline gap-1">
          <span className="font-[Syne] text-3xl sm:text-4xl font-bold text-white tracking-tight">
            {display}
          </span>
          {stat.suffix && (
            <span className="text-lg text-slate-400 font-medium">{stat.suffix}</span>
          )}
        </div>
        <p className="mt-2 text-xs text-[#40E0D0]/80">{stat.delta}</p>
        <div className="mt-4 h-1 rounded-full bg-white/5 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(stat.value, 100)}%` }}
            transition={{ duration: 1.4, delay: 0.4 + index * 0.1 }}
            className="h-full rounded-full"
            style={{ background: `linear-gradient(90deg, ${stat.color}, #92FE9D)` }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;
