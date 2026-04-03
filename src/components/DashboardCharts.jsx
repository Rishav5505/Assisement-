
import React from 'react';
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
  Legend
} from 'recharts';
import { useFinance } from '../context/FinanceContext';
import { format, subDays, eachDayOfInterval } from 'date-fns';

const DashboardCharts = () => {
  const { transactions, darkMode } = useFinance();

  const last30Days = eachDayOfInterval({
    start: subDays(new Date(), 29),
    end: new Date()
  }).map(date => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const dayTransactions = transactions.filter(t => t.date === dateStr);
    const dayIncome = dayTransactions.filter(t => t.type === 'Income').reduce((sum, t) => sum + t.amount, 0);
    const dayExpense = dayTransactions.filter(t => t.type === 'Expense').reduce((sum, t) => sum + t.amount, 0);
    return {
      name: format(date, 'MMM dd'),
      income: dayIncome,
      expense: dayExpense,
    };
  });

  const expenseData = transactions
    .filter(t => t.type === 'Expense')
    .reduce((acc, curr) => {
      const existing = acc.find(item => item.name === curr.category);
      if (existing) {
        existing.value += curr.amount;
      } else {
        acc.push({ name: curr.category, value: curr.amount });
      }
      return acc;
    }, [])
    .slice(0, 5); // Limit categories for clean look

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-2xl">
          <p className="font-black text-slate-900 dark:text-white mb-2 text-xs uppercase tracking-widest">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm font-bold flex items-center justify-between gap-4" style={{ color: entry.color }}>
              <span className="opacity-60">{entry.name}:</span>
              <span>₹{entry.value.toLocaleString('en-IN')}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-12">
      {/* Cash Flow Trends (Area Chart for Premium Look) */}
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl p-8 lg:p-10 border border-slate-100 dark:border-slate-800 shadow-slate-200/40">
        <div className="flex flex-col mb-10">
          <span className="text-blue-500 font-bold uppercase tracking-[0.2em] text-[10px]">History Trends</span>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">Cash Flow Analytics</h3>
        </div>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={last30Days}>
              <defs>
                <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="5 5" stroke={darkMode ? '#1e293b' : '#f1f5f9'} vertical={false} />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
                minTickGap={30}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
                tickFormatter={(value) => `₹${value}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="income"
                stroke="#3b82f6"
                strokeWidth={4}
                fillOpacity={1}
                fill="url(#colorIncome)"
                animationDuration={2000}
              />
              <Area
                type="monotone"
                dataKey="expense"
                stroke="#ef4444"
                strokeWidth={4}
                fillOpacity={1}
                fill="url(#colorExpense)"
                animationDuration={2000}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Expense Distribution (Donut Chart) */}
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl p-8 lg:p-10 border border-slate-100 dark:border-slate-800 shadow-slate-200/40">
        <div className="flex flex-col mb-10">
          <span className="text-blue-500 font-bold uppercase tracking-[0.2em] text-[10px]">Categories</span>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">Spending Areas</h3>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={expenseData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={95}
                paddingAngle={10}
                dataKey="value"
                animationBegin={500}
                animationDuration={2000}
              >
                {expenseData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} cornerRadius={12} stroke="none" />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;
