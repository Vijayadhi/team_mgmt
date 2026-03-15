import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function formatLongDate(value) {
  return new Intl.DateTimeFormat(undefined, { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(value);
}

function formatShortDateLabel(value) {
  return new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric" }).format(new Date(value));
}

export default function EntryTrendChart({ trend }) {
  return (
    <div className="chart-shell">
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={trend}>
          <CartesianGrid stroke="#d8e1ec" strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="date" tickFormatter={formatShortDateLabel} stroke="#708198" tickLine={false} axisLine={false} />
          <YAxis allowDecimals={false} stroke="#708198" tickLine={false} axisLine={false} />
          <Tooltip
            formatter={(value) => [`${value} entries`, "Entries"]}
            labelFormatter={(label) => formatLongDate(new Date(label))}
            contentStyle={{ borderRadius: "16px", border: "1px solid #d8e1ec", boxShadow: "0 18px 36px rgba(15, 23, 42, 0.12)" }}
          />
          <Line type="monotone" dataKey="count" stroke="#0f62fe" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
