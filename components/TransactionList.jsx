"use client";

import { useState } from "react";
import TransactionForm from "./TransactionForm";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function TransactionList({ transactions, onDelete, onUpdate }) {
  const [editingId, setEditingId] = useState(null);

  const handleEdit = (tx) => {
    setEditingId(tx._id);
  };

  const handleUpdate = (data) => {
    onUpdate(editingId, data);
    setEditingId(null);
  };

  return (
    <Card className="p-4">
      <h2 className="text-xl font-semibold mb-4">📄 Transactions</h2>

      {transactions.length === 0 ? (
        <p className="text-muted-foreground">No transactions yet.</p>
      ) : (
        <div className="space-y-4">
          {transactions.map((tx) =>
            editingId === tx._id ? (
              <TransactionForm
                key={tx._id}
                defaultValues={{
                  amount: tx.amount,
                  date: tx.date.slice(0, 10),
                  description: tx.description,
                  category: tx.category,
                }}
                onSubmit={handleUpdate}
              />
            ) : (
              <div
                key={tx._id}
                className="flex justify-between items-center border p-3 rounded-md shadow-sm"
              >
                <div>
                  <p className="font-medium">{tx.description}</p>
                  <p className="text-sm text-muted-foreground">
                    ₹{tx.amount} • {tx.category} • {new Date(tx.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(tx)}>
                    Edit
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => onDelete(tx._id)}>
                    Delete
                  </Button>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </Card>
  );
}
