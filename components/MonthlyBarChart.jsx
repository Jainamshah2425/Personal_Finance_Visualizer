"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card } from "@/components/ui/card";

export default function MonthlyBarChart({ transactions }) {
  const monthlyData = {};

  transactions.forEach((tx) => {
    const month = new Date(tx.date).toLocaleString("default", { month: "short", year: "numeric" });
    monthlyData[month] = (monthlyData[month] || 0) + tx.amount;
  });

  const chartData = Object.entries(monthlyData).map(([month, amount]) => ({
    month,
    amount,
  }));

  return (
    <Card className="p-4">
      <h2 className="text-lg font-semibold mb-2">📊 Monthly Expenses</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#4f46e5" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
