
import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_TRANSACTIONS } from '../data/mockData';

const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    try {
      const saved = localStorage.getItem('finance_transactions');
      return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
    } catch (e) {
      console.error("Failed to parse transactions from localStorage", e);
      return INITIAL_TRANSACTIONS;
    }
  });

  const [role, setRole] = useState('Admin'); // 'Admin' or 'Viewer'
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [sortBy, setSortBy] = useState({ field: 'date', direction: 'desc' });
  const [activePage, setActivePage] = useState('Dashboard');
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem('finance_darkMode');
      return saved ? JSON.parse(saved) : false;
    } catch (e) {
      console.error("Failed to parse darkMode from localStorage", e);
      return false;
    }
  });

  useEffect(() => {
    localStorage.setItem('finance_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('finance_darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const addTransaction = (transaction) => {
    if (role !== 'Admin') return;
    setTransactions(prev => [{ ...transaction, id: Date.now() }, ...prev]);
  };

  const deleteTransaction = (id) => {
    if (role !== 'Admin') return;
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const editTransaction = (id, updatedTransaction) => {
    if (role !== 'Admin') return;
    setTransactions(prev => prev.map(t => t.id === id ? { ...updatedTransaction, id } : t));
  };

  const filteredTransactions = transactions
    .filter(t => {
      const matchesSearch = t.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'All' || t.type === filterType;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      const fieldA = a[sortBy.field];
      const fieldB = b[sortBy.field];

      if (sortBy.field === 'amount') {
        return sortBy.direction === 'asc' ? fieldA - fieldB : fieldB - fieldA;
      }

      return sortBy.direction === 'asc'
        ? new Date(fieldA) - new Date(fieldB)
        : new Date(fieldB) - new Date(fieldA);
    });

  const totals = transactions.reduce((acc, curr) => {
    if (curr.type === 'Income') acc.income += curr.amount;
    else acc.expense += curr.amount;
    return acc;
  }, { income: 0, expense: 0 });

  const totalBalance = totals.income - totals.expense;

  return (
    <FinanceContext.Provider value={{
      transactions,
      filteredTransactions,
      addTransaction,
      deleteTransaction,
      editTransaction,
      role,
      setRole,
      searchTerm,
      setSearchTerm,
      filterType,
      setFilterType,
      sortBy,
      setSortBy,
      totals,
      totalBalance,
      darkMode,
      setDarkMode,
      activePage,
      setActivePage
    }}>
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => useContext(FinanceContext);
