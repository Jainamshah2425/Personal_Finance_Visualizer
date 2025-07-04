import { connectDB } from "@/lib/mongodb";
import Transaction from "@/models/Transaction";

export default async function handler(req, res) {
  const { id } = req.query;
  await connectDB();

  if (req.method === "PUT") {
    try {
      const updated = await Transaction.findByIdAndUpdate(id, req.body, { new: true });
      return res.status(200).json(updated);
    } catch (err) {
      return res.status(400).json({ error: "Update failed", details: err });
    }
  }

  if (req.method === "DELETE") {
    try {
      await Transaction.findByIdAndDelete(id);
      return res.status(204).end();
    } catch (err) {
      return res.status(400).json({ error: "Delete failed", details: err });
    }
  }

  res.status(405).end();
}
