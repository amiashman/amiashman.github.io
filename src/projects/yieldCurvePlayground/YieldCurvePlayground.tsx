import { useState } from "react";
import {
  type Bond,
  priceBond,
  macaulayDuration,
  solveYTM
  // effectiveDuration,
  // effectiveConvexity
} from "./assets/bondFunctions";
import { YieldCurve } from "./assets/yieldCurve";
import YieldCurveChart from "./components/YieldCurveChart";
import YieldCurveInputWindow from "./components/YieldCurveInputWindow";
import "./YieldCurvePlayground.css";

export default function YieldCurvePlayground() {
  const [baseCurve, setBaseCurve] = useState(
    new YieldCurve({
      maturities: "default",
      rates: new Array(13).fill(5)
    })
  );
  const [bond, setBond] = useState<Bond>({
    faceValue: 1000,
    couponRate: 5,
    couponFrequency: 2,
    maturity: 10
  });
  const [shiftBps, setShiftBps] = useState(0);

  const curve = baseCurve.addShift(shiftBps / 10000);
  const rateFunc = (t: number) => curve.getRate(t);

  const price = priceBond(bond, rateFunc);
  const macDur = macaulayDuration(bond, rateFunc);
  // const effDur = effectiveDuration(bond, curve);
  // const effConv = effectiveConvexity(bond, curve);
  const ytm = solveYTM(bond, price);

  const updateBond = (field: keyof Bond, value: string) => {
    const num = parseFloat(value);
    if (!isNaN(num)) {
      setBond({ ...bond, [field]: num });
    }
  };

  return (
    <div className="yield-playground">
      <h1>Yield Curve Playground</h1>

      <h2 className="yield-playground-tagline">
        This project is currently mid-development. Check back soon for updates!
      </h2>

      <div className="playground-layout">
        <div className="chart-side">
          <div className="playground-section chart-section">
            <h2>Yield Curve</h2>
            <div className="chart-container">
              <YieldCurveChart curve={curve} />
            </div>
          </div>

          <div className="playground-section input-section">
            <h2>Yield Curve Input</h2>
            <YieldCurveInputWindow
              curve={baseCurve}
              onCurveChange={setBaseCurve}
            />
          </div>
        </div>

        <div className="controls-side">
          <div className="playground-section">
            <h2>Bond Parameters</h2>
            <div className="bond-parameters">
              <div className="parameter-group">
                <label htmlFor="faceValue">Face Value ($)</label>
                <input
                  id="faceValue"
                  type="number"
                  min="0"
                  value={bond.faceValue}
                  onChange={(e) => updateBond("faceValue", e.target.value)}
                />
              </div>
              <div className="parameter-group">
                <label htmlFor="couponRate">Coupon Rate (%)</label>
                <input
                  id="couponRate"
                  type="number"
                  min="0"
                  step={0.01}
                  value={bond.couponRate}
                  onChange={(e) => updateBond("couponRate", e.target.value)}
                />
              </div>
              <div className="parameter-group">
                <label htmlFor="couponFrequency">Coupons/Year</label>
                <input
                  id="couponFrequency"
                  type="number"
                  min="1"
                  value={bond.couponFrequency}
                  onChange={(e) =>
                    updateBond("couponFrequency", e.target.value)
                  }
                />
              </div>
              <div className="parameter-group">
                <label htmlFor="maturity">Maturity (years)</label>
                <input
                  id="maturity"
                  type="number"
                  min="1"
                  value={bond.maturity}
                  onChange={(e) => updateBond("maturity", e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="playground-section shift-section">
            <h2>Parallel Shift</h2>
            <div className="shift-display">{shiftBps} bps</div>
            <div className="shift-slider-container">
              <span className="shift-range negative">-300 bps</span>
              <input
                type="range"
                min={-300}
                max={300}
                value={shiftBps}
                onChange={(e) => setShiftBps(parseInt(e.target.value))}
              />
              <span className="shift-range positive">+300 bps</span>
            </div>
          </div>

          <div className="playground-section">
            <h2>Metrics</h2>
            <div className="metrics-container">
              <div className="metric-item">
                <div className="metric-label">Price</div>
                <div className="metric-value">${price.toFixed(2)}</div>
              </div>
              <div className="metric-item">
                <div className="metric-label">Macaulay Duration</div>
                <div className="metric-value">{macDur.toFixed(4)} years</div>
              </div>
              {/* <div className="metric-item">
                <div className="metric-label">Effective Duration</div>
                <div className="metric-value">{effDur.toFixed(4)}</div>
              </div>
              <div className="metric-item">
                <div className="metric-label">Effective Convexity</div>
                <div className="metric-value">{effConv.toFixed(4)}</div>
              </div> */}
              <div className="metric-item">
                <div className="metric-label">YTM</div>
                <div className="metric-value">{ytm.toFixed(4)}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
