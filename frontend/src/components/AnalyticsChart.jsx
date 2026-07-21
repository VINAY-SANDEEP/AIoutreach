import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

export default function AnalyticsChart({ data = {} }) {
  const safeData = data || {};
  const chartData = [
    { name: "Roads", value: safeData.Roads || 0 },
    { name: "Water", value: safeData.Water || 0 },
    { name: "Drainage", value: safeData.Drainage || 0 },
    { name: "Electricity", value: safeData.Electricity || 0 },
    { name: "Other", value: safeData.Other || 0 },
  ];

  const colors = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
  ];

  return (
    <div className="mt-10">
      <div className="rounded-3xl bg-white shadow-xl border border-gray-200 p-6 md:p-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Village Issue Analytics
            </h2>

            <p className="text-gray-500 mt-1">
              Number of complaints by category
            </p>
          </div>

          <div className="hidden md:flex items-center justify-center h-14 w-14 rounded-2xl bg-blue-100">
            📊
          </div>
        </div>

        {/* Chart */}
        <div className="h-[380px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 10,
                right: 20,
                left: 0,
                bottom: 10,
              }}
            >
              <CartesianGrid
                strokeDasharray="4 4"
                stroke="#E5E7EB"
              />

              <XAxis
                dataKey="name"
                tick={{ fill: "#6B7280", fontSize: 14 }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tick={{ fill: "#6B7280", fontSize: 14 }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                contentStyle={{
                  background: "#ffffff",
                  borderRadius: "12px",
                  border: "1px solid #E5E7EB",
                  boxShadow:
                    "0 10px 25px rgba(0,0,0,0.08)",
                }}
              />

              <Bar
                dataKey="value"
                radius={[12, 12, 0, 0]}
                barSize={55}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Footer Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
          {chartData.map((item, index) => (
            <div
              key={item.name}
              className="rounded-2xl border border-gray-200 p-4 hover:shadow-lg transition"
            >
              <div
                className="w-4 h-4 rounded-full mb-3"
                style={{ backgroundColor: colors[index] }}
              />

              <p className="text-gray-500 text-sm">
                {item.name}
              </p>

              <h3 className="text-2xl font-bold mt-1">
                {item.value}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}