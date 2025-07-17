'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';

import TransactionForm from '@/components/TransactionForm';
import TransactionList from '@/components/TransactionList';
import SummaryCards from '@/components/SummaryCards';
import BudgetForm from '@/components/BudgetForm';
import { Button } from '@/components/ui/button';

const MonthlyBarChart = dynamic(
  () => import('@/components/MonthlyBarChart'),
  { ssr: false }
);
const CategoryPieChart = dynamic(
  () => import('@/components/CategoryPieChart'),
  { ssr: false }
);
const BudgetVsActualChart = dynamic(
  () => import('@/components/BudgetVsActualChart'),
  { ssr: false }
);
const AIInsight = dynamic(() => import('@/components/AIInsight'), {
  ssr: false,
});

export default function ClientOnlyDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard'); // or 'budget'

  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get('/api/transactions');
      setTransactions(res.data);
    } catch (err) {
      console.error('Failed to fetch transactions', err);
    }
  };

  const fetchBudgets = async () => {
    try {
      const res = await axios.get('/api/budgets');
      setBudgets(res.data);
    } catch (err) {
      console.error('Failed to fetch budgets', err);
    }
  };

  useEffect(() => {
    fetchTransactions();
    fetchBudgets();
  }, []);

  const addTransaction = async (data) => {
    await axios.post('/api/transactions', data);
    fetchTransactions();
  };

  const updateTransaction = async (id, data) => {
    await axios.put(`/api/transactions/${id}`, data);
    fetchTransactions();
  };

  const deleteTransaction = async (id) => {
    await axios.delete(`/api/transactions/${id}`);
    fetchTransactions();
  };

  const addBudget = async (data) => {
    await axios.post('/api/budgets', data);
    fetchBudgets();
  };
  const [editingBudget, setEditingBudget] = useState(null);

  const updateBudget = async (id, data) => {
    await axios.put(`/api/budgets/${id}`, data);
    setEditingBudget(null);
    fetchBudgets();
  };
  const deleteBudget = async (id) => {
    try {
      await axios.delete(`/api/budgets/${id}`);
      fetchBudgets();
      if (editingBudget && editingBudget._id === id) {
        setEditingBudget(null);
      }
    } catch (err) {
      console.error('Delete failed', err);
    }
  };
  return (
    <main className="max-w-5xl mx-auto p-4 space-y-6">
      <div className="flex justify-center gap-4 mb-6">
        <Button
          variant={activeTab === 'dashboard' ? 'default' : 'outline'}
          onClick={() => setActiveTab('dashboard')}
        >
          💸 Finance Dashboard
        </Button>
        <Button
          variant={activeTab === 'budget' ? 'default' : 'outline'}
          onClick={() => setActiveTab('budget')}
        >
          📅 Budget Planner
        </Button>
      </div>

      {activeTab === 'dashboard' && (
        <>
          <h1 className="text-3xl font-bold">💸 Personal Finance Dashboard</h1>
          <TransactionForm onSubmit={addTransaction} />
          <SummaryCards transactions={transactions} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MonthlyBarChart transactions={transactions} />
            <CategoryPieChart transactions={transactions} />
          </div>
          <TransactionList
            transactions={transactions}
            onDelete={deleteTransaction}
            onUpdate={updateTransaction}
          />
          <AIInsight />
        </>
      )}

      {activeTab === 'budget' && (
        <>
          <h1 className="text-3xl font-bold">📅 Budget Planner</h1>
          {editingBudget ? (
            <BudgetForm
              onSubmit={(data) => updateBudget(editingBudget._id, data)}
              defaultValues={editingBudget}
              mode="edit"
            />
          ) : (
            <BudgetForm onSubmit={addBudget} />
          )}

          <div className="space-y-4">
            <BudgetVsActualChart transactions={transactions} budgets={budgets} />

            <div className="space-y-2">
              <h3 className="text-lg font-semibold">📝 Existing Budgets</h3>
              {budgets.map((b) => (
                <div
                  key={b._id}
                  className="flex justify-between items-center border p-3 rounded-md"
                >
                  <div>
                    <p className="font-medium">
                      {b.category} - {b.month}
                    </p>
                    <p className="text-muted-foreground">₹{b.amount}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditingBudget(b)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteBudget(b._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </main>
  );
}
