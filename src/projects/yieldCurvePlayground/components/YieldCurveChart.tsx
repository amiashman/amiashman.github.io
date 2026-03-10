import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import type { YieldCurve } from "../assets/yieldCurve";

type Props = {
  curve: YieldCurve;
};

export default function YieldCurveChart({ curve }: Props) {
  // Standard maturity times
  const maturities = [
    { label: "1m", value: 1 / 12 },
    { label: "2m", value: 2 / 12 },
    { label: "3m", value: 3 / 12 },
    { label: "4m", value: 4 / 12 },
    { label: "6m", value: 6 / 12 },
    { label: "1y", value: 1 },
    { label: "2y", value: 2 },
    { label: "3y", value: 3 },
    { label: "5y", value: 5 },
    { label: "7y", value: 7 },
    { label: "10y", value: 10 },
    { label: "20y", value: 20 },
    { label: "30y", value: 30 }
  ];

  // Generate yield curve data
  const curveData = maturities.map((mat) => ({
    maturity: mat.label,
    yield: parseFloat((curve.getRate(mat.value) * 100).toFixed(2))
  }));

  // Calculate y-axis domain
  const yields = curveData.map((d) => d.yield);
  const minYield = Math.min(...yields);
  const maxYield = Math.max(...yields);
  const yMin = Math.floor(minYield * 10 - 1) / 10;
  const yMax = Math.ceil(maxYield * 10 + 1) / 10;

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={curveData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="maturity"
          label={{
            value: "Time",
            position: "insideBottom",
            offset: -5
          }}
        />
        <YAxis
          domain={[yMin, yMax]}
          label={{ value: "Yield (%)", angle: -90, position: "insideLeft" }}
        />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="yield"
          stroke="#2563eb"
          dot={false}
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
