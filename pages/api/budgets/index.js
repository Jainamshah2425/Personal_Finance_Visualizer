import { connectDB } from "@/lib/mongodb";
import Budget from "@/models/Budget";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "GET") {
    const budgets = await Budget.find();
    return res.status(200).json(budgets);
  }

  if (req.method === "POST") {
    try {
      const budget = await Budget.create(req.body);
      return res.status(201).json(budget);
    } catch (error) {
      return res.status(400).json({ error: "Invalid data", details: error });
    }
  }

  res.status(405).end();
}
