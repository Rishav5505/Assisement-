
import React, { useState, useEffect } from 'react';
import { useFinance } from '../context/FinanceContext';
import { CATEGORIES } from '../data/mockData';
import { X, Save, Plus, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AddTransactionModal = ({ isOpen, onClose, editingTransaction }) => {
  const { addTransaction, editTransaction } = useFinance();
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    amount: '',
    category: CATEGORIES[0],
    type: 'Expense',
    description: ''
  });

  useEffect(() => {
    if (editingTransaction) {
      setFormData({
        ...editingTransaction,
        date: editingTransaction.date
      });
    } else {
      setFormData({
        date: new Date().toISOString().split('T')[0],
        amount: '',
        category: CATEGORIES[0],
        type: 'Expense',
        description: ''
      });
    }
  }, [editingTransaction, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      amount: parseFloat(formData.amount)
    };

    if (editingTransaction) {
      editTransaction(editingTransaction.id, data);
    } else {
      addTransaction(data);
    }
    onClose();
  };

  const handleTypeChange = (type) => {
    setFormData(prev => ({ ...prev, type }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800"
          >
            <div className="px-8 pt-8 pb-4 flex items-center justify-between">
              <h3 className="text-2xl font-black text-slate-800 dark:text-white">
                {editingTransaction ? 'Edit Transaction' : 'New Transaction'}
              </h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {/* Type Switcher */}
              <div className="flex bg-slate-50 dark:bg-slate-800 p-1.5 rounded-2xl relative">
                <button
                  type="button"
                  onClick={() => handleTypeChange('Income')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${formData.type === 'Income'
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                    : 'text-slate-400 dark:text-slate-500 hover:text-slate-600'
                    }`}
                >
                  <ArrowUpRight className="w-4 h-4" />
                  Income
                </button>
                <button
                  type="button"
                  onClick={() => handleTypeChange('Expense')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${formData.type === 'Expense'
                    ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20'
                    : 'text-slate-400 dark:text-slate-500 hover:text-slate-600'
                    }`}
                >
                  <ArrowDownRight className="w-4 h-4" />
                  Expense
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-400 uppercase tracking-wider ml-1">Date</label>
                  <input
                    type="date"
                    required
                    className="w-full px-4 py-4 bg-slate-50 dark:bg-slate-850 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/50 transition-all dark:text-white dark:border-slate-800"
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-400 uppercase tracking-wider ml-1">Amount</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">₹</span>
                    <input
                      type="number"
                      required
                      placeholder="0.00"
                      className="w-full pl-8 pr-4 py-4 bg-slate-50 dark:bg-slate-850 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/50 transition-all dark:text-white dark:border-slate-800 font-bold text-lg"
                      value={formData.amount}
                      onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-400 uppercase tracking-wider ml-1">Category</label>
                <select
                  required
                  className="w-full px-4 py-4 bg-slate-50 dark:bg-slate-850 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/50 transition-all dark:text-white dark:appearance-none dark:border-slate-800 font-semibold"
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-400 uppercase tracking-wider ml-1">Description</label>
                <textarea
                  placeholder="What was this for?"
                  rows="3"
                  className="w-full px-4 py-4 bg-slate-50 dark:bg-slate-850 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/50 transition-all dark:text-white dark:border-slate-800 resize-none font-medium"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>

              <div className="pt-4 flex gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-4 font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className={`flex-1 py-4 rounded-2xl font-black text-lg transition-all shadow-xl flex items-center justify-center gap-3 ${formData.type === 'Income'
                    ? 'bg-emerald-500 text-white shadow-emerald-500/20'
                    : 'bg-rose-500 text-white shadow-rose-500/20'
                    }`}
                >
                  <Save className="w-5 h-5" />
                  {editingTransaction ? 'Save Changes' : 'Confirm'}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AddTransactionModal;
