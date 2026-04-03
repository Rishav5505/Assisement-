
import React from 'react';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { motion } from 'framer-motion';

const SummaryCard = ({ title, amount, type }) => {
  const isBalance = type === 'balance';
  const isIncome = type === 'income';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className={`relative overflow-hidden rounded-[1.5rem] p-6 transition-all shadow-xl shadow-slate-200/40 dark:shadow-none border border-slate-100 dark:border-slate-800 ${isBalance
        ? 'bg-blue-600 text-white'
        : 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white'
        }`}
    >
      <div className="flex flex-col gap-4 relative z-10">
        <div className="flex items-center justify-between">
          <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${isBalance ? 'text-white/60' : 'text-slate-400'
            }`}>
            {title}
          </span>
          <div className={`p-2.5 rounded-xl ${isBalance
            ? 'bg-white/10 text-white'
            : isIncome
              ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400'
              : 'bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400'
            }`}>
            {isBalance ? <Wallet className="w-4 h-4" /> : isIncome ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          </div>
        </div>

        <div>
          <h3 className="text-3xl font-black tracking-tighter">
            ₹{amount.toLocaleString('en-IN')}
          </h3>
          <p className={`text-[10px] mt-1 font-medium ${isBalance ? 'text-white/50' : 'text-slate-400'}`}>
            {isIncome ? '+12.5% from last month' : isBalance ? 'Available funds' : 'Total spent this month'}
          </p>
        </div>
      </div>

      {isBalance && (
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <div className="w-32 h-32 rounded-full border-[20px] border-white -mr-16 -mt-16" />
        </div>
      )}
    </motion.div>
  );
};

export default SummaryCard;
