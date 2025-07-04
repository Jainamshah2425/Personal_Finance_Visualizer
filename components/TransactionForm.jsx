"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

const transactionSchema = z.object({
  amount: z.coerce.number({ required_error: "Amount is required" }).positive(),
  date: z.string(),
  description: z.string().min(1, "Description required"),
  category: z.string().min(1),
});

const categories = ["Food", "Rent", "Transport", "Shopping", "Utilities", "Other"];

export default function TransactionForm({ onSubmit, defaultValues = null }) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues: defaultValues || {
      amount: "",
      date: new Date().toISOString().split("T")[0],
      description: "",
      category: "Other",
    },
  });

  const submit = (data) => {
    data.amount = parseFloat(data.amount);
    onSubmit(data);
    reset();
  };

  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <form onSubmit={handleSubmit(submit)} className="grid gap-4">
          <div>
            <label className="text-sm font-medium">Amount</label>
            <Input type="number" step="0.01" {...register("amount")} />
            {errors.amount && <p className="text-red-500 text-sm">{errors.amount.message}</p>}
          </div>

          <div>
            <label className="text-sm font-medium">Date</label>
            <Input type="date" {...register("date")} />
          </div>

          <div>
            <label className="text-sm font-medium">Description</label>
            <Textarea rows={2} {...register("description")} />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>

          <div>
            <label className="text-sm font-medium">Category</label>
            <Select
              onValueChange={(val) => setValue("category", val)}
              defaultValue={watch("category")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
          </div>

          <Button type="submit">{defaultValues ? "Update" : "Add"} Transaction</Button>
        </form>
      </CardContent>
    </Card>
  );
}
