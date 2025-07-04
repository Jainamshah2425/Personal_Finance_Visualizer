"use client";

import { Pie, PieChart, Tooltip, Cell, ResponsiveContainer } from "recharts";
import { Card } from "@/components/ui/card";

const COLORS = ["#4f46e5", "#f97316", "#10b981", "#e11d48", "#6366f1", "#14b8a6"];

export default function CategoryPieChart({ transactions }) {
  const categoryTotals = {};

  transactions.forEach((tx) => {
    categoryTotals[tx.category] = (categoryTotals[tx.category] || 0) + tx.amount;
  });

  const data = Object.entries(categoryTotals).map(([category, amount]) => ({
    name: category,
    value: amount,
  }));

  return (
    <Card className="p-4">
      <h2 className="text-lg font-semibold mb-2">🧩 Category Breakdown</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie dataKey="value" data={data} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
            {data.map((_, i) => (
              <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
}
