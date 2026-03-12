import { YieldCurve } from "../assets/yieldCurve";

type Props = {
  curve: YieldCurve;
  onCurveChange: (newCurve: YieldCurve) => void;
  onPreset: (newShift: number) => void;
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

export default function YieldCurveInputWindow({
  curve,
  onCurveChange,
  onPreset
}: Props) {
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

  const handlePreset = (preset: string) => {
    onPreset(0); // Reset shift to 0 when applying a preset
    let rateFunc: (m: number) => number;
    switch (preset) {
      case "flat":
        rateFunc = () => 0.04;
        break;
      case "normal":
        rateFunc = (m) => 0.02 + 0.005 * Math.log(m);
        break;
      case "inverted":
        rateFunc = (m) => 0.055 - 0.0034 * Math.log(m);
        break;
      default:
        return;
    }
    const newRates: number[] = maturities.map((m) => rateFunc(m), 0);
    const newCurve = new YieldCurve({
      maturities: maturities,
      rates: newRates
    });
    onCurveChange(newCurve);
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
              min="0"
              value={(Math.round(rates[index] * 10000) / 100).toFixed(2)}
              onChange={(e) =>
                handleRateChange(index, parseFloat(e.target.value) / 100)
              }
            />
          </div>
        ))}
      </div>
      <br />
      <h2>Presets</h2>
      <div className="preset-buttons">
        <button className="preset-button" onClick={() => handlePreset("flat")}>
          Flat
        </button>
        <button
          className="preset-button"
          onClick={() => handlePreset("normal")}
        >
          Normal
        </button>
        <button
          className="preset-button"
          onClick={() => handlePreset("inverted")}
        >
          Inverted
        </button>
      </div>
    </div>
  );
}
