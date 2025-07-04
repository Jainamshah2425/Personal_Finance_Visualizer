"use client";

import { Card } from "@/components/ui/card";

export default function SummaryCards({ transactions }) {
  const total = transactions.reduce((sum, tx) => sum + tx.amount, 0);

  const recent = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3);

  const categoryTotals = {};
  transactions.forEach((tx) => {
    categoryTotals[tx.category] = (categoryTotals[tx.category] || 0) + tx.amount;
  });

  const topCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0]?.[0];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card className="p-4">
        <p className="text-sm text-muted-foreground">Total Expenses</p>
        <p className="text-2xl font-bold">₹{total.toFixed(2)}</p>
      </Card>
      <Card className="p-4">
        <p className="text-sm text-muted-foreground">Top Category</p>
        <p className="text-xl font-semibold">{topCategory || "N/A"}</p>
      </Card>
      <Card className="p-4">
        <p className="text-sm text-muted-foreground mb-2">Transactions Breakdown</p>
        {recent.map((tx) => (
          <p key={tx._id} className="text-sm">
            {tx.description} - ₹{tx.amount}
          </p>
        ))}
      </Card>
    </div>
  );
}
