import { useState } from "react";

function Tabs({ tab, setTab }) {
  const base =
    "px-4 py-2 rounded-xl border text-sm font-medium transition";
  const active = "bg-gray-900 text-white border-gray-900";
  const idle = "bg-white text-gray-900 border-gray-200 hover:bg-gray-100";

  return (
    <div className="flex gap-2">
      <button
        className={`${base} ${tab === "expenses" ? active : idle}`}
        onClick={() => setTab("expenses")}
      >
        Expenses
      </button>
      <button
        className={`${base} ${tab === "dashboard" ? active : idle}`}
        onClick={() => setTab("dashboard")}
      >
        Dashboard
      </button>
    </div>
  );
}

function ExpenseForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [notes, setNotes] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim()) return alert("Title required");
    const amt = Number(amount);
    if (!Number.isFinite(amt) || amt <= 0) return alert("Amount must be > 0");

    onAdd({
      id: crypto.randomUUID(),
      title: title.trim(),
      amount: amt,
      category,
      notes: notes.trim(),
      date: new Date().toISOString(),
    });

    setTitle("");
    setAmount("");
    setCategory("Food");
    setNotes("");
  }

  const label = "text-sm font-medium text-gray-700";
  const input =
    "mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 outline-none focus:border-gray-900";

  return (
    <form onSubmit={handleSubmit} className="grid gap-3">
      <div>
        <label className={label}>Title</label>
        <input className={input} value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>

      <div>
        <label className={label}>Amount</label>
        <input className={input} value={amount} onChange={(e) => setAmount(e.target.value)} />
      </div>

      <div>
        <label className={label}>Category</label>
        <select className={input} value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>Food</option>
          <option>Transport</option>
          <option>Bills</option>
          <option>Shopping</option>
          <option>Other</option>
        </select>
      </div>

      <div>
        <label className={label}>Notes</label>
        <textarea className={input} rows="3" value={notes} onChange={(e) => setNotes(e.target.value)} />
      </div>

      <button className="mt-2 rounded-xl bg-gray-900 px-4 py-2 text-white font-medium hover:opacity-90">
        Add Expense
      </button>
    </form>
  );
}

function ExpenseList({ expenses, onDelete }) {
  if (!expenses.length) return <p className="text-gray-600">No expenses yet.</p>;

  return (
    <div className="grid gap-3">
      {expenses.map((e) => (
        <div
          key={e.id}
          className="rounded-2xl border border-gray-200 bg-white p-4 flex justify-between items-start"
        >
          <div>
            <div className="font-semibold text-gray-900">{e.title}</div>
            <div className="text-sm text-gray-600 mt-1">
              {e.category} • ${e.amount.toFixed(2)} • {new Date(e.date).toLocaleDateString()}
            </div>
            {e.notes && <div className="text-sm text-gray-700 mt-2">{e.notes}</div>}
          </div>

          <button
            onClick={() => onDelete(e.id)}
            className="rounded-xl border border-gray-200 px-3 py-1 text-sm hover:bg-red-50 hover:border-red-300 hover:text-red-700"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState("expenses");
  const [expenses, setExpenses] = useState([]);

  function addExpense(expense) {
    setExpenses((prev) => [expense, ...prev]);
  }

  function deleteExpense(id) {
    setExpenses((prev) => prev.filter((x) => x.id !== id));
  }

  const totalAmount = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* CENTERED CONTAINER */}
      <div className="mx-auto w-full max-w-3xl px-6">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Expense Tracker</h1>
          <Tabs tab={tab} setTab={setTab} />
        </div>

        <div className="my-6 h-px bg-gray-200" />

        {/* CONTENT */}
        {tab === "expenses" ? (
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 bg-white p-4">
              <h2 className="font-semibold text-gray-900 mb-3">Add Expense</h2>
              <ExpenseForm onAdd={addExpense} />
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-4">
              <div className="flex justify-between items-center mb-3">
                <h2 className="font-semibold text-gray-900">Expenses</h2>
                <div className="text-sm text-gray-600">
                  Total: <span className="font-semibold text-gray-900">${totalAmount.toFixed(2)}</span>
                </div>
              </div>
              <ExpenseList expenses={expenses} onDelete={deleteExpense} />
            </div>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 bg-white p-4">
              <div className="text-sm text-gray-600">Total Expenses</div>
              <div className="text-3xl font-bold text-gray-900 mt-1">{expenses.length}</div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-4">
              <div className="text-sm text-gray-600">Total Amount</div>
              <div className="text-3xl font-bold text-gray-900 mt-1">
                ${totalAmount.toFixed(2)}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
