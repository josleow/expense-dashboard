const dbConnect = require("../_db");
const Expense = require("../../models/Expense");

module.exports = async (req, res) => {
  try {

    await dbConnect();

    if (req.method === "GET") {
      const data = await Expense.find().sort({ date: -1 });
      return res.status(200).json({ data });
    }

    if (req.method === "POST") {
      const created = await Expense.create(req.body);
      return res.status(201).json({ ok: true, created });
    }
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
  return res.status(405).json({ message: "Method not allowed" });
};
