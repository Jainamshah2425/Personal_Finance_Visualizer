import { connectDB } from "@/lib/mongodb";
import Budget from "@/models/Budget";

export default async function handler(req, res) {
  const { id } = req.query;
  await connectDB();

  if (req.method === "PUT") {
    try {
      const updated = await Budget.findByIdAndUpdate(id, req.body, { new: true });
      return res.status(200).json(updated);
    } catch (err) {
      return res.status(400).json({ error: "Update failed", details: err });
    }
  }

  if (req.method === "DELETE") {
    try {
      await Budget.findByIdAndDelete(id);
      return res.status(204).end();
    } catch (err) {
      return res.status(400).json({ error: "Delete failed", details: err });
    }
  }

  res.status(405).end();
}
