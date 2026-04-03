
import React from 'react';
import { useFinance } from '../context/FinanceContext';
import { Target, Sparkles, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const InsightsPanel = () => {
  const { transactions, totals } = useFinance();

  const expenses = transactions.filter(t => t.type === 'Expense');
  const categoryTotals = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {});

  const highestCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0] || ['None', 0];
  const expenseRatio = totals.income > 0 ? (totals.expense / totals.income) * 100 : 0;

  const totalTransactions = transactions.length;
  const avgExpense = expenses.length > 0 ? totals.expense / expenses.length : 0;

  return (
    <div className="space-y-4">
      {/* Target Category */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-xl p-6 border border-slate-100 dark:border-slate-800 shadow-slate-200/40"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-amber-50 dark:bg-amber-500/10 rounded-2xl text-amber-500">
            <Target className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Peak Spending</span>
        </div>
        <h4 className="text-xl font-black text-slate-900 dark:text-white tracking-tighter">{highestCategory[0]}</h4>
        <div className="mt-6 flex items-end justify-between">
          <p className="text-sm font-bold text-slate-400">Monthly Total</p>
          <p className="text-xl font-black text-amber-500">₹{highestCategory[1].toLocaleString('en-IN')}</p>
        </div>
      </motion.div>

      {/* Health Metric */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-xl p-6 border border-slate-100 dark:border-slate-800 shadow-slate-200/40"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-blue-50 dark:bg-blue-500/10 rounded-2xl text-blue-500">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Health Index</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">{expenseRatio.toFixed(1)}%</h4>
            <p className="text-xs font-bold text-slate-400 uppercase mt-2">Income Spent</p>
          </div>
          <div className="relative w-16 h-16">
            <svg className="w-full h-full -rotate-90">
              <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="6" className="text-slate-100 dark:text-slate-800" />
              <circle
                cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="6"
                strokeDasharray={`${28 * 2 * Math.PI}`}
                strokeDashoffset={`${28 * 2 * Math.PI * (1 - Math.min(expenseRatio, 100) / 100)}`}
                className={`${expenseRatio > 80 ? 'text-rose-500' : 'text-blue-500'}`}
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </motion.div>

      {/* Quick Summary */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-xl p-6 border border-slate-100 dark:border-slate-800 shadow-slate-200/40"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-emerald-50 dark:bg-emerald-500/10 rounded-2xl text-emerald-500">
            <Activity className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Quick Stats</span>
        </div>
        <div className="space-y-6">
          <div className="flex justify-between items-center group">
            <span className="text-sm font-bold text-slate-400 group-hover:text-slate-600 transition-colors">Vol. Transactions</span>
            <span className="text-lg font-black text-slate-900 dark:text-white">{totalTransactions}</span>
          </div>
          <div className="flex justify-between items-center border-t border-slate-50 dark:border-slate-800 pt-4 group">
            <span className="text-sm font-bold text-slate-400 group-hover:text-slate-600 transition-colors">Avg. Outflow</span>
            <span className="text-lg font-black text-rose-500">₹{avgExpense.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
          </div>
        </div>
      </motion.div>

      {/* Budget Goal Card */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="bg-blue-600 dark:bg-blue-600/90 rounded-[2rem] shadow-xl p-6 text-white relative overflow-hidden"
      >
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-100">Monthly Budget Goal</span>
            <span className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-bold">₹1.0L Set</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-baseline justify-between">
              <h4 className="text-2xl font-black tracking-tighter">₹{totals.expense.toLocaleString('en-IN')}</h4>
              <span className="text-xs font-bold opacity-60">used</span>
            </div>
            <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: `${Math.min((totals.expense / 100000) * 100, 100)}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)]"
              />
            </div>
            <p className="text-[10px] font-bold opacity-60 text-right">
              {((totals.expense / 100000) * 100).toFixed(0)}% of limit reached
            </p>
          </div>
        </div>
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
      </motion.div>
    </div>
  );
};

export default InsightsPanel;
