import type { YieldCurve } from "./yieldCurve";

export type Bond = {
  faceValue: number;
  couponRate: number;
  couponFrequency: number;
  maturity: number;
};

export function priceBond(
  bond: Bond,
  yieldCurve: (maturity: number) => number
): number {
  let price = 0;
  const couponPayment =
    (bond.faceValue * bond.couponRate) / bond.couponFrequency;
  const totalPeriods = bond.maturity * bond.couponFrequency;
  for (let k = 1; k <= totalPeriods; k++) {
    const t = k / bond.couponFrequency;
    const spotRate = yieldCurve(t);
    price += couponPayment / Math.pow(1 + spotRate, t);
  }

  const spotRateAtMaturity = yieldCurve(bond.maturity);
  price += bond.faceValue / Math.pow(1 + spotRateAtMaturity, bond.maturity);
  return price;
}

export function macaulayDuration(
  bond: Bond,
  yieldCurve: (maturity: number) => number
): number {
  let duration = 0;
  const couponPayment =
    (bond.faceValue * bond.couponRate) / bond.couponFrequency;
  const totalPeriods = bond.maturity * bond.couponFrequency;

  for (let k = 1; k <= totalPeriods; k++) {
    const t = k / bond.couponFrequency;
    const spotRate = yieldCurve(t);
    duration += (t * couponPayment) / Math.pow(1 + spotRate, t);
  }
  const spotRateAtMaturity = yieldCurve(bond.maturity);
  duration +=
    (bond.maturity * bond.faceValue) /
    Math.pow(1 + spotRateAtMaturity, bond.maturity);

  duration /= priceBond(bond, yieldCurve);
  return duration;
}

export function solveYTM(
  bond: Bond,
  marketPrice: number,
  tolerance: number = 1e-10,
  maxIterations: number = 1000
): number {
  let low = 0;
  let high = 1;

  for (let i = 0; i < maxIterations; i++) {
    const mid = (low + high) / 2;
    const price = priceBond(bond, () => mid);

    if (Math.abs(price - marketPrice) < tolerance) {
      return mid;
    }

    if (price > marketPrice) {
      low = mid;
    } else {
      high = mid;
    }
  }

  return (low + high) / 2;
}

export function effectiveDuration(
  bond: Bond,
  yieldCurve: YieldCurve,
  dy: number = 0.0001
): number {
  const P0 = priceBond(bond, (t) => yieldCurve.getRate(t));
  const pUp = priceBond(bond, (t) => yieldCurve.addShift(dy).getRate(t));
  const pDown = priceBond(bond, (t) => yieldCurve.addShift(-dy).getRate(t));
  return (pDown - pUp) / (2 * P0 * dy);
}

export function effectiveConvexity(
  bond: Bond,
  yieldCurve: YieldCurve,
  dy: number = 0.0001
): number {
  const P0 = priceBond(bond, (t) => yieldCurve.getRate(t));
  const pUp = priceBond(bond, (t) => yieldCurve.addShift(dy).getRate(t));
  const pDown = priceBond(bond, (t) => yieldCurve.addShift(-dy).getRate(t));
  return (pDown + pUp - 2 * P0) / (P0 * dy * dy);
}
