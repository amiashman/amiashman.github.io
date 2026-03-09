// This file is deprecated and will be removed in a future update.

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceDot,
  ResponsiveContainer
} from "recharts";
import {
  priceBond,
  solveYTM,
  macaulayDuration,
  type Bond
} from "../assets/bondFunctions";
import type { YieldCurve } from "../assets/yieldCurve";

type Props = {
  bond: Bond;
  curve: YieldCurve;
};

export default function PriceYieldChart({ bond, curve }: Props) {
  const rateFunc = (t: number) => curve.getRate(t);
  const currentPrice = priceBond(bond, rateFunc);
  const currentYTM = solveYTM(bond, currentPrice);
  const macDur = macaulayDuration(bond, () => currentYTM);
  const modDur = macDur / (1 + currentYTM / bond.couponFrequency);

  // Price vs yield curve
  const curveData = [];
  for (let y = 0.005; y <= 0.15; y += 0.005) {
    curveData.push({
      yield: parseFloat((y * 100).toFixed(2)),
      price: priceBond(bond, () => y)
    });
  }

  // Tangent line: P = P0 - modDur * P0 * (y - y0)
  interface TangentPoint {
    yield: number;
    tangent: number;
  }
  const tangentData: TangentPoint[] = [];
  const tangentSpan = 0.04;
  for (let dy = -tangentSpan; dy <= tangentSpan; dy += 0.005) {
    const y = currentYTM + dy;
    if (y < 0.005 || y > 0.15) continue;
    tangentData.push({
      yield: parseFloat((y * 100).toFixed(2)),
      tangent: currentPrice - modDur * currentPrice * dy
    });
  }

  // Merge the two datasets by yield
  const mergedData = curveData.map((pt) => {
    const tangentPt = tangentData.find((t) => t.yield === pt.yield);
    return {
      ...pt,
      tangent: tangentPt?.tangent ?? undefined
    };
  });

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={mergedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="yield"
          label={{ value: "Yield (%)", position: "insideBottom", offset: -5 }}
        />
        <YAxis
          label={{ value: "Price ($)", angle: -90, position: "insideLeft" }}
        />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="price"
          stroke="#2563eb"
          dot={false}
          strokeWidth={2}
        />
        <Line
          type="monotone"
          dataKey="tangent"
          stroke="#ef4444"
          dot={false}
          strokeWidth={1}
          strokeDasharray="5 5"
        />
        <ReferenceDot
          x={parseFloat((currentYTM * 100).toFixed(2))}
          y={currentPrice}
          r={6}
          fill="#2563eb"
          stroke="white"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
