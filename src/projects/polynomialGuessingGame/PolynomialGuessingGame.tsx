import { useMemo, useState } from "react";
import {
  evaluatePolynomial,
  generateAllCandidatePolynomials,
  getBestQuestion,
  getBestGuess,
  handleAnswer
} from "./assets/polyUtils";
import { maxCoeff, minCoeff, minX, maxX } from "./assets/consts";
import type { Polynomial, Question } from "./assets/consts";
import "./PolynomialGuessingGame.css";
import SetupPanel from "./components/SetupPanel";
import PlayingPanel from "./components/PlayingPanel";

export type HistoryEntry = { question: Question; isYes: boolean };

const formatPolynomial = (poly: Polynomial) => {
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
};

const generateChartData = (
  userPoly: Polynomial,
  guessPoly: Polynomial | null
) => {
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
};

export default function PolynomialGuessingGame() {
  const [userPoly, setUserPoly] = useState<Polynomial>({
    a: 1,
    b: 0,
    c: 0,
    d: 0
  });
  const [candidates, setCandidates] = useState<Polynomial[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [bestGuess, setBestGuess] = useState<Polynomial | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [phase, setPhase] = useState<"setup" | "playing" | "solved">("setup");
  console.log("Candidates:", candidates);

  const chartData = useMemo(
    () => generateChartData(userPoly, bestGuess),
    [userPoly, bestGuess]
  );

  const handleSliderChange = (k: keyof Polynomial, value: number) => {
    setUserPoly((prev) => ({ ...prev, [k]: value }));
  };

  const startGame = () => {
    const all = generateAllCandidatePolynomials(minCoeff, maxCoeff);
    const firstQuestion =
      all.length > 0 ? getBestQuestion(all, minX, maxX) : null;
    const firstGuess = all.length > 0 ? getBestGuess(all) : null;

    setCandidates(all);
    setCurrentQuestion(firstQuestion);
    setBestGuess(firstGuess);
    setHistory([]);
    setPhase("playing");
  };

  const submitAnswer = (isYes: boolean) => {
    if (!currentQuestion) return;
    const nextCandidates = handleAnswer(isYes, currentQuestion, candidates);
    const nextBestGuess =
      nextCandidates.length > 0 ? getBestGuess(nextCandidates) : null;
    const nextQuestion =
      nextCandidates.length > 1
        ? getBestQuestion(nextCandidates, minX, maxX)
        : null;

    setCandidates(nextCandidates);
    setBestGuess(nextBestGuess);
    setCurrentQuestion(nextQuestion);
    setHistory((prev) => [...prev, { question: currentQuestion, isYes }]);

    if (nextCandidates.length === 1) {
      setPhase("solved");
    }

    if (nextCandidates.length === 0) {
      setPhase("playing");
    }
  };

  const playAgain = () => {
    setPhase("setup");
    setCandidates([]);
    setCurrentQuestion(null);
    setBestGuess(null);
    setHistory([]);
    setUserPoly({ a: 1, b: 0, c: 0, d: 0 });
  };

  return (
    <div className="pgg-page">
      <h1>Polynomial Guessing Game</h1>
      <p className="pgg-description">
        Create your secret polynomial using the sliders below. The AI will try
        to guess it by asking yes/no questions about its properties.<br /> Can you
        design a polynomial that stumps the machine?
      </p>
      {phase === "setup" ? (
        <SetupPanel
          userPoly={userPoly}
          minCoeff={minCoeff}
          maxCoeff={maxCoeff}
          onSliderChange={handleSliderChange}
          onStart={startGame}
          formatPolynomial={formatPolynomial}
          chartData={chartData}
        />
      ) : (
        <PlayingPanel
          candidatesLength={candidates.length}
          chartData={chartData}
          bestGuess={bestGuess}
          targetPolynomial={userPoly}
          currentQuestion={currentQuestion}
          history={history}
          phase={phase}
          formatPolynomial={formatPolynomial}
          onAnswer={submitAnswer}
          onPlayAgain={playAgain}
        />
      )}
    </div>
  );
}
