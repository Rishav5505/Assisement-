
import React from 'react';
import { useFinance } from '../context/FinanceContext';
import { Search, Plus, Trash2, Edit3, ChevronUp, ChevronDown } from 'lucide-react';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

const TransactionsTable = ({ onEdit, onAdd }) => {
  const {
    filteredTransactions,
    deleteTransaction,
    role,
    searchTerm,
    setSearchTerm,
    filterType,
    setFilterType,
    sortBy,
    setSortBy
  } = useFinance();

  const handleSort = (field) => {
    setSortBy(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'desc' ? 'asc' : 'desc'
    }));
  };

  const getSortIcon = (field) => {
    if (sortBy.field !== field) return <ChevronDown className="w-3 h-3 ml-1 opacity-20" />;
    return sortBy.direction === 'asc' ? <ChevronUp className="w-3 h-3 ml-1 text-blue-500" /> : <ChevronDown className="w-3 h-3 ml-1 text-blue-500" />;
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl p-8 lg:p-12 border border-slate-100 dark:border-slate-800 shadow-slate-200/40 overflow-hidden">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8 mb-12">
        <div>
          <span className="text-blue-500 font-bold uppercase tracking-[0.2em] text-[10px]">Operations</span>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">Transaction History</h3>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="relative group flex-1 min-w-[250px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              placeholder="Search history..."
              className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-medium text-slate-600 dark:text-slate-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="px-6 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 font-bold text-sm text-slate-600 dark:text-slate-200 cursor-pointer appearance-none min-w-[140px]"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="All">All Types</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50 dark:bg-slate-800/50">
            <tr className="text-slate-400 font-black text-[10px] uppercase tracking-[0.2em]">
              <th className="py-4 px-6 cursor-pointer hover:text-blue-500 transition-colors" onClick={() => handleSort('date')}>
                <div className="flex items-center">TIMESTAMP {getSortIcon('date')}</div>
              </th>
              <th className="py-4 px-6">PARTICULARS</th>
              <th className="py-4 px-6">CATEGORY</th>
              <th className="py-4 px-6 cursor-pointer hover:text-blue-500 transition-colors text-right" onClick={() => handleSort('amount')}>
                <div className="flex items-center justify-end">AMOUNT {getSortIcon('amount')}</div>
              </th>
              {role === 'Admin' && <th className="py-4 px-6 text-right">ACTION</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
            <AnimatePresence mode="popLayout">
              {filteredTransactions.map((t) => (
                <motion.tr
                  key={t.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 group transition-colors"
                >
                  <td className="py-6 px-6 font-bold text-slate-900 dark:text-slate-300 whitespace-nowrap">
                    {format(new Date(t.date), 'dd MMM yyyy')}
                  </td>
                  <td className="py-6 px-6 text-slate-500 dark:text-slate-400 font-medium max-w-xs truncate">
                    {t.description || 'General Transaction'}
                  </td>
                  <td className="py-6 px-6">
                    <span className={`px-4 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${t.type === 'Income'
                      ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400'
                      : 'bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400'
                      }`}>
                      {t.category}
                    </span>
                  </td>
                  <td className={`py-6 px-6 text-right font-black text-lg tracking-tight ${t.type === 'Income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-slate-200'
                    }`}>
                    {t.type === 'Income' ? '+' : '-'}₹{t.amount.toLocaleString('en-IN', { minimumFractionDigits: 1 })}
                  </td>
                  {role === 'Admin' && (
                    <td className="py-6 px-6 text-right">
                      <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => onEdit(t)} className="p-2 text-slate-400 hover:text-blue-500 hover:bg-white dark:hover:bg-slate-800 rounded-xl transition-all shadow-sm">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button onClick={() => deleteTransaction(t.id)} className="p-2 text-slate-400 hover:text-rose-500 hover:bg-white dark:hover:bg-slate-800 rounded-xl transition-all shadow-sm">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  )}
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsTable;
