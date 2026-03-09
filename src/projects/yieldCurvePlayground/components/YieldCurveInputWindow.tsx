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

  const handleRateChange = (index: number, newRate: string) => {
    const numRate = parseFloat(newRate);
    if (!isNaN(numRate)) {
      const newRates = [...rates];
      newRates[index] = numRate;
      const newCurve = new YieldCurve({
        maturities: maturities,
        rates: newRates
      });
      onCurveChange(newCurve);
    }
  };

  return (
    <div className="yield-curve-input">
      <h3>Yield Curve Rates (%)</h3>
      <div className="rate-inputs">
        {maturities.map((maturity, index) => (
          <div key={index} className="rate-input-group">
            <label htmlFor={`rate-${index}`}>{MATURITY_LABELS[index]}</label>
            <input
              id={`rate-${index}`}
              type="number"
              step={0.01}
              value={rates[index]}
              onChange={(e) => handleRateChange(index, e.target.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
