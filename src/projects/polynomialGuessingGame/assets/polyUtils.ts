import type { Polynomial, Question } from "./consts";

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
  maxX: number
): Question {
  const possibleQuestions: Question[] = [];
  for (let x = minX; x <= maxX; x++) {
    const possibleYs: number[] = [];
    for (const poly of candidates) {
      possibleYs.push(evaluatePolynomial(poly, x));
    }
    const medianY = possibleYs.sort((a, b) => a - b)[
      Math.floor(possibleYs.length / 2)
    ];
    possibleQuestions.push({ x, y: medianY });
  }

  // Score each question
  const scoredQuestions: Array<{ question: Question; score: number }> = [];
  for (const question of possibleQuestions) {
    const score = scoreQuestion(question.x, question.y, candidates);
    scoredQuestions.push({ question, score });
  }

  // Sort by score (descending) and pick randomly from top candidates
  scoredQuestions.sort((a, b) => b.score - a.score);
  const topCount = Math.max(3, Math.ceil(scoredQuestions.length * 0.15)); // Top 15% or at least 3
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
