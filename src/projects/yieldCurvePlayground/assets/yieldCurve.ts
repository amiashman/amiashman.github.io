import Spline from "typescript-cubic-spline";

type YieldCurveProps = {
  maturities: number[];
  rates: number[];
};

export class YieldCurve {
  private maturities: number[];
  private rates: number[];
  private curve: Spline;

  constructor(props: YieldCurveProps) {
    if (props.maturities.length !== props.rates.length) {
      throw new Error("Maturities and rates arrays must have the same length");
    }

    this.maturities = props.maturities;
    this.rates = props.rates;

    this.curve = new Spline(this.maturities, this.rates);
  }

  public getRate(maturity: number): number {
    return this.curve.at(maturity);
  }

  public addShift(shift: number): YieldCurve {
    const newRates = this.rates.map((rate) => rate + shift);
    return new YieldCurve({ maturities: this.maturities, rates: newRates });
  }

  public editRate(maturity: number, newRate: number): YieldCurve {
    const newRates = this.maturities.map((m, index) =>
      m === maturity ? newRate : this.rates[index]
    );
    return new YieldCurve({ maturities: this.maturities, rates: newRates });
  }

  public getMaturities(): number[] {
    return this.maturities.slice();
  }

  public getRates(): number[] {
    return this.rates.slice();
  }
}
