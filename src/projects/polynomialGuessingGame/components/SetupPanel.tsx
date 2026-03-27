import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import type { Polynomial } from "../assets/consts";

interface SetupPanelProps {
  userPoly: Polynomial;
  minCoeff: number;
  maxCoeff: number;
  onSliderChange: (k: keyof Polynomial, value: number) => void;
  onStart: () => void;
  formatPolynomial: (poly: Polynomial) => string;
  chartData: Array<{ x: number; user: number; guess?: number }>;
}

export default function SetupPanel({
  userPoly,
  minCoeff,
  maxCoeff,
  onSliderChange,
  onStart,
  formatPolynomial,
  chartData
}: SetupPanelProps) {
  return (
    <div className="pgg-setup pgg-card">
      <div className="pgg-setup-header">
        <div className="pgg-setup-title">YOUR POLYNOMIAL</div>
        <div className="pgg-setup-subtitle">f(x) = ax³ + bx² + cx + d</div>
      </div>

      <div className="pgg-setup-inner">
        <div className="pgg-setup-controls">
          <div className="pgg-slider-grid">
            {(Object.keys(userPoly) as Array<keyof Polynomial>).map(
              (coefficient) => (
                <label key={coefficient} className="pgg-slider-row">
                  <span className="pgg-sl-label">
                    {coefficient.toUpperCase()}
                  </span>
                  <input
                    className="pgg-slider"
                    type="range"
                    min={minCoeff}
                    max={maxCoeff}
                    value={userPoly[coefficient]}
                    onChange={(e) =>
                      onSliderChange(coefficient, Number(e.target.value))
                    }
                  />
                  <span className="pgg-sl-value">{userPoly[coefficient]}</span>
                </label>
              )
            )}
          </div>

          <div className="pgg-expression">{formatPolynomial(userPoly)}</div>
        </div>

        <div className="pgg-setup-chart">
          <div className="pgg-chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis dataKey="x" type="number" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="user"
                  stroke="#1f8a28"
                  dot={false}
                  name="Your Polynomial"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <button className="pgg-button pgg-start" onClick={onStart}>
        Start Game
      </button>
    </div>
  );
}
