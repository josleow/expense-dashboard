module.exports = async (req, res) => {
  try {
    // load modules INSIDE the handler so errors can be caught and returned
    const dbConnect = require("../_db");
   const Expense = require("../_models/Expense");

    const hasUri = Boolean(process.env.MONGO_URI);
    if (!hasUri) {
      return res.status(500).json({
        ok: false,
        name: "MissingEnv",
        message: "MONGO_URI is missing in Vercel Environment Variables",
      });
    }

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
    return res.status(500).json({
      ok: false,
      name: err?.name,
      message: err?.message || String(err),
    });
  }
};
