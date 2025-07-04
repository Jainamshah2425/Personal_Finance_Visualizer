"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import BudgetForm from "@/components/BudgetForm";
import BudgetVsActualChart from "@/components/BudgetVsActualChart";

export default function BudgetPage() {
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);

  const fetchData = async () => {
    const txRes = await axios.get("/api/transactions");
    const bRes = await axios.get("/api/budgets");
    setTransactions(txRes.data);
    setBudgets(bRes.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addBudget = async (data) => {
    await axios.post("/api/budgets", data);
    fetchData();
  };

  return (
    <main className="max-w-5xl mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">📅 Budget Planner</h1>
      <BudgetForm onSubmit={addBudget} />
      <BudgetVsActualChart transactions={transactions} budgets={budgets} />
    </main>
  );
}
