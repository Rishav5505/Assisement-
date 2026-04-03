
import React from 'react';
import { useFinance } from '../context/FinanceContext';
import { LayoutDashboard, History, ShieldCheck, Settings, Moon, Sun, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = () => {
  const { role, setRole, darkMode, setDarkMode, activePage, setActivePage } = useFinance();

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'History', icon: History },
    { name: 'Security', icon: ShieldCheck },
    { name: 'Settings', icon: Settings },
  ];

  return (
    <div className="hidden lg:flex flex-col w-72 h-screen fixed left-0 top-0 bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 p-10 z-[50]">
      {/* Brand */}
      <div className="flex items-center gap-4 mb-16">
        <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/20">
          <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
            <div className="w-2 h-4 bg-blue-600 rounded-full rotate-45" />
          </div>
        </div>
        <h1 className="text-xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">FinDash</h1>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 flex flex-col gap-2">
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => setActivePage(item.name)}
            className={`w-full flex items-center gap-5 px-6 py-4 rounded-2xl transition-all duration-300 font-bold text-sm tracking-tight cursor-pointer ${activePage === item.name
              ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20'
              : 'text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
          >
            <item.icon className={`w-5 h-5 ${activePage === item.name ? 'text-white' : 'text-slate-400'}`} />
            {item.name}
          </button>
        ))}
      </nav>

      {/* Profile & Controls */}
      <div className="pt-10 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Account Role</p>
            <div className="flex bg-slate-50 dark:bg-slate-800 p-1 rounded-xl">
              <button
                onClick={() => setRole('Viewer')}
                className={`px-4 py-1.5 text-[10px] rounded-lg font-black uppercase transition-all cursor-pointer ${role === 'Viewer'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-md'
                  : 'text-slate-400'
                  }`}
              >
                View
              </button>
              <button
                onClick={() => setRole('Admin')}
                className={`px-4 py-1.5 text-[10px] rounded-lg font-black uppercase transition-all cursor-pointer ${role === 'Admin'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-md'
                  : 'text-slate-400'
                  }`}
              >
                Adm
              </button>
            </div>
          </div>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-full flex items-center justify-between px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-4 font-bold text-sm text-slate-600 dark:text-slate-300">
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              {darkMode ? 'Light Theme' : 'Dark Theme'}
            </div>
            <div className={`w-8 h-4 rounded-full relative transition-colors ${darkMode ? 'bg-blue-600' : 'bg-slate-300'}`}>
              <div className={`absolute top-1 w-2 h-2 rounded-full bg-white transition-all ${darkMode ? 'left-5' : 'left-1'}`} />
            </div>
          </button>
        </div>

        <div className="flex items-center gap-5 p-3 bg-slate-50 dark:bg-slate-800/50 backdrop-blur-xl rounded-[2.5rem] border border-slate-100 dark:border-slate-800 transition-all hover:border-blue-500/30 group">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-500 via-indigo-600 to-purple-600 flex items-center justify-center text-white font-black text-xs ring-4 ring-white dark:ring-slate-900 shadow-xl shadow-blue-500/20 group-hover:scale-105 transition-transform">
            {role[0]}
          </div>
          <div className="flex-1 truncate">
            <p className="font-black text-sm text-slate-900 dark:text-white truncate tracking-tight">
              {role === 'Admin' ? 'A. Johnson' : 'S. Viewer'}
            </p>
            <div className="flex items-center gap-2">
              <span className={`w-1.5 h-1.5 rounded-full ${role === 'Admin' ? 'bg-blue-500' : 'bg-slate-400'} animate-pulse`}></span>
              <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.2em]">{role}</p>
            </div>
          </div>
          <button className="p-3 text-slate-400 hover:text-rose-500 hover:bg-white dark:hover:bg-slate-700 rounded-2xl transition-all shadow-sm cursor-pointer border border-transparent hover:border-slate-100 dark:hover:border-slate-600">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
