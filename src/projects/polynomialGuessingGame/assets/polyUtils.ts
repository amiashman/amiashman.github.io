import type { Polynomial, Question } from "./consts";
import { maxX, minX, randomnessTemperature } from "./consts";

/* Evaluates the polynomial at a given x */
export function evaluatePolynomial(poly: Polynomial, x: number): number {
  return poly.a * x ** 3 + poly.b * x ** 2 + poly.c * x + poly.d;
}

/* Generates all possible polynomials within the coefficient bounds */
export function generateAllCandidatePolynomials(
  minCoeff: number,
  maxCoeff: number
): Polynomial[] {
  const candidates: Polynomial[] = [];
  for (let a = minCoeff; a <= maxCoeff; a++) {
    for (let b = minCoeff; b <= maxCoeff; b++) {
      for (let c = minCoeff; c <= maxCoeff; c++) {
        for (let d = minCoeff; d <= maxCoeff; d++) {
          candidates.push({ a, b, c, d });
        }
      }
    }
  }
  return candidates;
}

/* Scores a question based on how well it splits the candidate polynomials */
export function scoreQuestion(
  x: number,
  y: number,
  candidates: Polynomial[]
): number {
  let yesCount: number = 0;
  for (const poly of candidates) {
    if (evaluatePolynomial(poly, x) > y) {
      yesCount++;
    }
  }
  return -Math.abs(yesCount / candidates.length - 0.5);
}

/* Chooses the best question to ask next, with some randomness */
export function getBestQuestion(
  candidates: Polynomial[],
  minX: number,
  maxX: number,
  questionNumber: number = 0
): Question {
  const possibleQuestions: Question[] = [];
  for (let x = minX; x <= maxX; x++) {
    const sorted = candidates
      .map((p) => evaluatePolynomial(p, x))
      .sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    const medianY =
      sorted.length % 2 === 0
        ? (sorted[mid - 1] + sorted[mid]) / 2
        : sorted[mid];
    possibleQuestions.push({ x, y: medianY });
  }

  const scoredQuestions = possibleQuestions
    .map((question) => ({
      question,
      score: scoreQuestion(question.x, question.y, candidates)
    }))
    .sort((a, b) => b.score - a.score);

  const temperature = Math.pow(randomnessTemperature, questionNumber);
  const topCount = Math.max(
    1,
    Math.round(scoredQuestions.length * temperature)
  );
  const topCandidates = scoredQuestions.slice(0, topCount);
  const randomIdx = Math.floor(Math.random() * topCandidates.length);
  return topCandidates[randomIdx].question;
}

/* Averages the coefficients of the remaining candidate polynomials to make a guess */
export function getBestGuess(candidates: Polynomial[]): Polynomial {
  const n = candidates.length;
  const sum = candidates.reduce(
    (acc, p) => ({
      a: acc.a + p.a,
      b: acc.b + p.b,
      c: acc.c + p.c,
      d: acc.d + p.d
    }),
    { a: 0, b: 0, c: 0, d: 0 }
  );
  return { a: sum.a / n, b: sum.b / n, c: sum.c / n, d: sum.d / n };
}

/* Filters the candidate polynomials based on the user's answer to a question */
export function handleAnswer(
  isYes: boolean,
  question: Question,
  candidates: Polynomial[]
): Polynomial[] {
  const newCandidates = candidates.filter((poly) => {
    const evalResult = evaluatePolynomial(poly, question.x);
    return isYes ? evalResult > question.y : evalResult <= question.y;
  });
  return newCandidates;
}

/* Formats a polynomial into a human-readable string */
export function formatPolynomial(poly: Polynomial): string {
  const parts: string[] = [];

  const pushTerm = (coeff: number, power: number, variable: string) => {
    if (coeff === 0) return;
    const sign = coeff > 0 ? "+" : "-";
    const abs = Math.abs(coeff);
    const coef = abs === 1 && power > 0 ? "" : abs.toString();
    const pow = power === 0 ? "" : variable;
    parts.push(`${sign} ${coef}${pow}`.trim());
  };

  pushTerm(poly.a, 3, "x³");
  pushTerm(poly.b, 2, "x²");
  pushTerm(poly.c, 1, "x");
  pushTerm(poly.d, 0, "");

  if (parts.length === 0) return "f(x) = 0";

  let result = "";
  parts.forEach((p, idx) => {
    if (idx === 0) {
      result += p.startsWith("+") ? p.slice(2) : p;
    } else {
      result += " " + p;
    }
  });

  return `f(x) = ${result}`;
}

/* Generates data for plotting the user's polynomial and the best guess */
export function generateChartData(
  userPoly: Polynomial,
  guessPoly: Polynomial | null
) {
  const steps = 80;
  const range = maxX - minX;
  const dx = range / (steps - 1);
  const data: Array<{ x: number; user: number; guess?: number }> = [];

  for (let i = 0; i < steps; i++) {
    const x = minX + dx * i;
    const user = evaluatePolynomial(userPoly, x);
    const guess = guessPoly ? evaluatePolynomial(guessPoly, x) : NaN;
    data.push({ x, user, guess });
  }

  return data;
}
