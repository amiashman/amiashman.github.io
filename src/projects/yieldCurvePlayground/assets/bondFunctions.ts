export type Bond = {
  faceValue: number;
  couponRate: number; // As a decimal
  couponFrequency: number;
  maturity: number;
};

function cashFlows(bond: Bond): { time: number; amount: number }[] {
  const periods = bond.maturity * bond.couponFrequency;
  const couponPayment =
    (bond.faceValue * bond.couponRate) / bond.couponFrequency;
  const flows: { time: number; amount: number }[] = [];

  for (let k = 1; k <= periods; k++) {
    flows.push({
      time: k / bond.couponFrequency,
      amount: k < periods ? couponPayment : couponPayment + bond.faceValue
    });
  }
  return flows;
}

function discountFactor(
  rateFunc: (maturity: number) => number,
  time: number
): number {
  return 1 / Math.pow(1 + rateFunc(time), time);
}

export function priceBond(
  bond: Bond,
  rateFunc: (maturity: number) => number
): number {
  return cashFlows(bond).reduce(
    (price, { time, amount }) =>
      price + amount * discountFactor(rateFunc, time),
    0
  );
}

export function macaulayDuration(
  bond: Bond,
  rateFunc: (maturity: number) => number
): number {
  const flows = cashFlows(bond);
  let price = 0;
  let weightedTime = 0;

  for (const { time, amount } of flows) {
    const pv = amount * discountFactor(rateFunc, time);
    price += pv;
    weightedTime += time * pv;
  }

  return weightedTime / price;
}

export function ytm(
  bond: Bond,
  rateFunc: (maturity: number) => number,
  tolerance: number = 1e-10,
  maxIterations: number = 100
): number {
  const flows = cashFlows(bond);
  const price = priceBond(bond, rateFunc);

  function fAndFPrime(y: number): { f: number; fPrime: number } {
    let f = -price;
    let fPrime = 0;

    for (let i = 0; i < flows.length; i++) {
      const j = i + 1;
      const amount = flows[i].amount;
      const base = 1 + y / bond.couponFrequency;
      const discount = Math.pow(base, -j);

      f += amount * discount;
      fPrime += amount * (-j / bond.couponFrequency) * Math.pow(base, -j - 1);
    }
    return { f, fPrime };
  }

  let y = bond.couponRate; // Initial guess

  for (let i = 0; i < maxIterations; i++) {
    const { f, fPrime } = fAndFPrime(y);
    console.log(`Iteration ${i + 1}: y = ${y}, f(y) = ${f}, f'(y) = ${fPrime}`);
    if (Math.abs(f) < tolerance) {
      break; // Found a solution within the desired tolerance
    }
    y -= f / fPrime; // Newton-Raphson step
  }
  return y;
}

export function modDuration(
  bond: Bond,
  rateFunc: (maturity: number) => number
): number {
  const flows = cashFlows(bond);
  const price = priceBond(bond, rateFunc);
  const y = ytm(bond, rateFunc);

  let weightedTime = 0;
  for (let i = 0; i < flows.length; i++) {
    const j = i + 1;
    const { time, amount } = flows[i];
    const pv = amount * Math.pow(1 + y / bond.couponFrequency, -j);
    weightedTime += time * pv;
  }

  const macDuration = weightedTime / price;
  return macDuration / (1 + y / bond.couponFrequency);
}

export function effectiveConvexity(
  bond: Bond,
  rateFunc: (maturity: number) => number,
  dy: number = 0.0001
): number {
  const P0 = priceBond(bond, rateFunc);
  const P_plus = priceBond(bond, (t) => rateFunc(t) + dy);
  const P_minus = priceBond(bond, (t) => rateFunc(t) - dy);
  return (P_minus + P_plus - 2 * P0) / (P0 * dy * dy);
}
