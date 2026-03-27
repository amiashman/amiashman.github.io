import type { Polynomial, Question } from "./consts";
import { randomnessTemperature } from "./consts";

export function evaluatePolynomial(poly: Polynomial, x: number): number {
  return poly.a * x ** 3 + poly.b * x ** 2 + poly.c * x + poly.d;
}

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
