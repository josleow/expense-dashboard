const dbConnect = require("../_db");
const Expense = require("../../models/Expense");

module.exports = async (req, res) => {
  await dbConnect();
  const { id } = req.query;

  if (req.method === "PUT") {
    try {
      const updated = await Expense.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!updated) return res.status(404).json({ message: "Not found" });
      return res.status(200).json(updated);
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }
  }

  if (req.method === "DELETE") {
    const deleted = await Expense.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    return res.status(200).json({ ok: true });
  }

  return res.status(405).json({ message: "Method Not Allowed" });
};
