
import React, { useState } from 'react';
import { FinanceProvider, useFinance } from './context/FinanceContext';
import Sidebar from './components/Sidebar';
import SummaryCard from './components/SummaryCard';
import DashboardCharts from './components/DashboardCharts';
import TransactionsTable from './components/TransactionsTable';
import InsightsPanel from './components/InsightsPanel';
import AddTransactionModal from './components/AddTransactionModal';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LayoutDashboard } from 'lucide-react';

const DashboardContent = () => {
  const { transactions, totalBalance, totals, role, setRole, darkMode, setDarkMode, activePage } = useFinance();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingTransaction(null);
    setIsModalOpen(true);
  };

  const renderContent = () => {
    switch (activePage) {
      case 'History':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
            <header>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white">Transaction History</h2>
              <p className="text-slate-400 mt-2">View and manage all your past transactions.</p>
            </header>
            <TransactionsTable onEdit={handleEdit} onAdd={handleAdd} />
          </motion.div>
        );
      case 'Security':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12 text-center py-20">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">Security Settings</h2>
            <p className="text-slate-400 mt-2 max-w-md mx-auto">Configure your account security, two-factor authentication, and active sessions.</p>
            <div className="bg-white dark:bg-slate-900 p-12 rounded-[3rem] border border-slate-100 dark:border-slate-800 inline-block">
              <p className="text-blue-500 font-bold uppercase tracking-widest text-xs">Module Coming Soon</p>
            </div>
          </motion.div>
        );
      case 'Settings':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
            <header>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white">General Settings</h2>
              <p className="text-slate-400 mt-2">Manage your app preferences and account settings.</p>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800">
                <h4 className="font-bold text-slate-900 dark:text-white mb-4">Dark Mode</h4>
                <p className="text-sm text-slate-400 mb-6">Toggle between light and dark themes for the application.</p>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold"
                >
                  {darkMode ? 'Disable Dark Mode' : 'Enable Dark Mode'}
                </button>
              </div>
              <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800">
                <h4 className="font-bold text-slate-900 dark:text-white mb-4">Export Data</h4>
                <p className="text-sm text-slate-400 mb-6">Download your transaction history as a CSV file.</p>
                <button className="px-6 py-2 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 rounded-xl text-sm font-bold">
                  Export CSV
                </button>
              </div>
            </div>
          </motion.div>
        );
      default:
        return (
          <div className="space-y-12">
            {/* Top Row: Summary Cards */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <SummaryCard title="Main Balance" amount={totalBalance} type="balance" />
              <SummaryCard title="Total Income" amount={totals.income} type="income" />
              <SummaryCard title="Total Expense" amount={totals.expense} type="expense" />
            </section>

            {/* Recent Activity Quick View */}
            <section className="bg-white dark:bg-slate-900/50 backdrop-blur-xl border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">Recent Activity</h3>
                  <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">Latest Updates</p>
                </div>
                <button onClick={() => setActivePage('History')} className="text-xs font-bold text-blue-500 hover:text-blue-600 uppercase tracking-widest cursor-pointer">View All</button>
              </div>
              <div className="flex flex-col md:flex-row gap-6">
                {transactions.slice(0, 3).map((t) => (
                  <div key={t.id} className="flex-1 bg-slate-50 dark:bg-slate-800/40 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 group hover:border-blue-500/30 transition-all">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs ${t.type === 'Income' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                        {t.category[0]}
                      </div>
                      <div className="flex-1 truncate">
                        <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tighter truncate">{t.category}</p>
                        <p className="text-[10px] font-bold text-slate-400">{t.date}</p>
                      </div>
                    </div>
                    <p className={`text-xl font-black ${t.type === 'Income' ? 'text-emerald-500' : 'text-slate-900 dark:text-white'}`}>
                      {t.type === 'Income' ? '+' : '-'}₹{t.amount.toLocaleString('en-IN')}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Middle Row: Charts and Insights */}
            <section className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2">
                <DashboardCharts />
              </div>
              <div className="space-y-8">
                <InsightsPanel />
              </div>
            </section>

            {/* Bottom Row: Transactions */}
            <section>
              <TransactionsTable onEdit={handleEdit} onAdd={handleAdd} />
            </section>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] font-sans transition-colors duration-500 overflow-x-hidden">
      <Sidebar />

      {/* Mobile Nav */}
      <div className="lg:hidden sticky top-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 py-4 z-[60]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
          <span className="font-bold text-slate-900 dark:text-white uppercase tracking-tighter">FinDashboard</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 dark:text-white">
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[70] lg:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-80 bg-white dark:bg-slate-900 z-[80] lg:hidden p-8 shadow-2xl flex flex-col"
            >
              <div className="flex items-center gap-4 mb-12">
                <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
                <h1 className="text-lg font-black text-slate-900 dark:text-white tracking-tighter uppercase">FinDash</h1>
              </div>

              <div className="flex-1 flex flex-col gap-4">
                {['Dashboard', 'History', 'Security', 'Settings'].map((name) => (
                  <button
                    key={name}
                    onClick={() => {
                      setActivePage(name);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-4 p-4 rounded-2xl font-bold text-sm ${activePage === name ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400'}`}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="lg:ml-72 min-h-screen pt-8 pb-20 px-6 lg:px-12 transition-all">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                <span className="text-emerald-500 font-bold uppercase tracking-[0.2em] text-[10px]">Live Session</span>
              </div>
              <h4 className="text-slate-400 font-bold text-sm">Welcome back, {role === 'Admin' ? 'A. Johnson' : 'S. Viewer'}</h4>
              <h1 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mt-1 tracking-tight">
                {activePage}
              </h1>
              <p className="text-[10px] font-bold text-slate-400 mt-2 flex items-center gap-2 uppercase tracking-widest">
                <LayoutDashboard className="w-3 h-3" />
                {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>

            <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="px-5 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs font-bold text-slate-500 dark:text-slate-400">
                Mode: {role}
              </div>
              {role === 'Admin' && (
                <button
                  onClick={handleAdd}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 transition-all cursor-pointer relative z-10"
                >
                  Create Transaction
                </button>
              )}
            </div>
          </header>

          <AnimatePresence mode="wait">
            <motion.div
              key={activePage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>

          <footer className="mt-24 pt-10 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
            <p className="text-slate-400 text-sm font-medium italic">© 2026 FinDashboard Design. Premium Analytics.</p>
            <div className="flex items-center gap-8">
              <a href="#" className="text-slate-400 hover:text-blue-500 text-sm font-bold transition-all">Privacy</a>
              <a href="#" className="text-slate-400 hover:text-blue-500 text-sm font-bold transition-all">Support</a>
            </div>
          </footer>
        </div>
      </main>

      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editingTransaction={editingTransaction}
      />
    </div>
  );
};

function App() {
  return (
    <FinanceProvider>
      <DashboardContent />
    </FinanceProvider>
  );
}

export default App;
