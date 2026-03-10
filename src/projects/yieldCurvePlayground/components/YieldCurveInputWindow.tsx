import { YieldCurve } from "../assets/yieldCurve";

type Props = {
  curve: YieldCurve;
  onCurveChange: (newCurve: YieldCurve) => void;
};

const MATURITY_LABELS = [
  "1m",
  "2m",
  "3m",
  "4m",
  "6m",
  "1y",
  "2y",
  "3y",
  "5y",
  "7y",
  "10y",
  "20y",
  "30y"
];

export default function YieldCurveInputWindow({ curve, onCurveChange }: Props) {
  const maturities = curve.getMaturities();
  const rates = curve.getRates();

  const handleRateChange = (index: number, newRate: number) => {
    if (!isNaN(newRate)) {
      const newRates = [...rates];
      newRates[index] = newRate;
      const newCurve = new YieldCurve({
        maturities: maturities,
        rates: newRates
      });
      onCurveChange(newCurve);
    }
  };

  return (
    <div className="yield-curve-input">
      <h2>Yield Curve Rates (%)</h2>
      <div className="rate-inputs">
        {maturities.map((_maturity, index) => (
          <div key={index} className="rate-input-group">
            <label htmlFor={`rate-${index}`}>{MATURITY_LABELS[index]}</label>
            <input
              id={`rate-${index}`}
              type="number"
              step={0.01}
              value={rates[index] * 100}
              onChange={(e) =>
                handleRateChange(index, parseFloat(e.target.value) / 100)
              }
            />
          </div>
        ))}
      </div>
      {/* This is to be worked on.
			<br />
      <h2>Presets</h2>
      <div className="preset-buttons">
        <button
          className="preset-button"
          onClick={() =>
            onCurveChange(
              new YieldCurve({
                maturities: "default",
                rates: [
                  0.02, 0.025, 0.03, 0.035, 0.04, 0.045, 0.05, 0.055, 0.06,
                  0.065, 0.07, 0.075, 0.08
                ]
              })
            )
          }
        >
          Normal Upward
        </button>
      </div> */}
    </div>
  );
}
