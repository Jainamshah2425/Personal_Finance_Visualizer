"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card } from "@/components/ui/card";

export default function BudgetVsActualChart({ transactions, budgets }) {
  const groupedActual = {};

  transactions.forEach((tx) => {
    const month = tx.date.slice(0, 7); // YYYY-MM
    const key = `${tx.category}-${month}`;
    groupedActual[key] = (groupedActual[key] || 0) + tx.amount;
  });

  const data = budgets.map((b) => {
    const key = `${b.category}-${b.month}`;
    return {
      category: b.category,
      month: b.month,
      budgeted: b.amount,
      spent: groupedActual[key] || 0,
    };
  });

  return (
    <Card className="p-4 space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-2">📊 Budget vs Actual</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="budgeted" fill="#4f46e5" name="Budgeted" />
            <Bar dataKey="spent" fill="#f97316" name="Spent" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-1">
        <h3 className="text-md font-medium">💡 Spending Insights</h3>
        {data.length === 0 ? (
          <p className="text-muted-foreground">No budgets created yet.</p>
        ) : (
          data.map((item, idx) => {
            const diff = item.budgeted - item.spent;
            let status, color;

            if (diff > 0) {
              status = `✅ Under budget by ₹${diff.toFixed(2)}`;
              color = "text-green-600";
            } else if (diff < 0) {
              status = `⚠️ Over budget by ₹${Math.abs(diff).toFixed(2)}`;
              color = "text-red-600";
            } else {
              status = `📊 Met budget exactly`;
              color = "text-yellow-600";
            }

            return (
              <p key={idx} className={`${color} text-sm`}>
                {item.category} ({item.month}): {status}
              </p>
            );
          })
        )}
      </div>
    </Card>
  );
}
