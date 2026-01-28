const dbConnect = require("../_db");
const Expense = require("../../models/Expense");

module.exports = async (req, res) => {
  try {
    console.log("GET /api/expenses hit");
    console.log("MONGO_URI exists?", Boolean(process.env.MONGO_URI));

    await dbConnect();

    if (req.method === "GET") {
      const data = await Expense.find().sort({ date: -1 });
      return res.status(200).json({ ok: true, count: data.length, data });
    }

    if (req.method === "POST") {
      const created = await Expense.create(req.body);
      return res.status(201).json({ ok: true, created });
    }

    return res.status(405).json({ ok: false, message: "Method Not Allowed" });
  } catch (err) {
    console.error("FUNCTION ERROR:", err);
    return res.status(500).json({
      ok: false,
      message: err?.message || String(err),
      name: err?.name,
      stack: err?.stack,
    });
  }
};
