// client/src/components/charts/TestChart.jsx
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis } from "recharts";

export default function TestChart() {
  const data = [
    { month: "Jan", total: 120 },
    { month: "Feb", total: 260 },
  ];

  return (
    <div className="h-64 w-full rounded-xl border bg-white p-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Line dataKey="total" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}