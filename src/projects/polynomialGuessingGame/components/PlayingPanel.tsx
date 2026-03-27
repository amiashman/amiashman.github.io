import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import type { HistoryEntry } from "../PolynomialGuessingGame";
import type { Polynomial, Question } from "../assets/consts";

interface PlayingPanelProps {
  candidatesLength: number;
  chartData: Array<{ x: number; user: number; guess?: number }>;
  bestGuess: Polynomial | null;
  targetPolynomial: Polynomial;
  currentQuestion: Question | null;
  history: HistoryEntry[];
  phase: "playing" | "solved";
  formatPolynomial: (poly: Polynomial) => string;
  onAnswer: (isYes: boolean) => void;
  onPlayAgain: () => void;
}

export default function PlayingPanel({
  candidatesLength,
  chartData,
  bestGuess,
  targetPolynomial,
  currentQuestion,
  history,
  phase,
  formatPolynomial,
  onAnswer,
  onPlayAgain
}: PlayingPanelProps) {
  return (
    <div className="pgg-playing pgg-card">
      <h2>Playing</h2>
      <div className="pgg-stats-row">
        <div className="pgg-stat">Candidates: {candidatesLength}</div>
        <div className="pgg-stat">Questions: {history.length}</div>
        <div className="pgg-stat">
          Guess:{" "}
          {bestGuess
            ? `${bestGuess.a.toFixed(1)}x³ + ${bestGuess.b.toFixed(1)}x² + ${bestGuess.c.toFixed(1)}x + ${bestGuess.d.toFixed(1)}`
            : "-"}
        </div>
      </div>
      <div className="pgg-target-row">
        <span>Secret:</span> {formatPolynomial(targetPolynomial)}
      </div>
      <div className="pgg-playing-grid">
        <div className="pgg-chart-panel">
          <div className="pgg-candidate-count">
            {candidatesLength} candidates remaining
          </div>

          <div className="pgg-chart-wrapper pgg-playing-chart">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis dataKey="x" type="number" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="user"
                  stroke="#1f8a28"
                  dot={false}
                  name="Your Polynomial"
                />
                {bestGuess && (
                  <Line
                    type="monotone"
                    dataKey="guess"
                    stroke="#f5a623"
                    dot={false}
                    name="AI Guess"
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="pgg-qa-panel">
          {phase === "solved" && candidatesLength === 1 ? (
            <div className="pgg-solved-box">
              <h3>✅ Solved!</h3>
              <p>Took {history.length} questions</p>
              <p>{formatPolynomial(bestGuess ?? { a: 0, b: 0, c: 0, d: 0 })}</p>
              <button
                className="pgg-button pgg-play-again"
                onClick={onPlayAgain}
              >
                Play Again
              </button>
            </div>
          ) : (
            <>
              <h3>Q&A</h3>
              <div className="pgg-question-count">
                <strong>Question {history.length + 1}</strong>
              </div>

              {currentQuestion ? (
                <p className="pgg-current-question">
                  Is f({currentQuestion.x}) {">"} {currentQuestion.y}?
                </p>
              ) : (
                <p>Waiting for next question...</p>
              )}

              <div className="pgg-answer-buttons">
                <button
                  onClick={() => onAnswer(true)}
                  disabled={!currentQuestion}
                  className="pgg-button pgg-yes"
                >
                  Yes
                </button>
                <button
                  onClick={() => onAnswer(false)}
                  disabled={!currentQuestion}
                  className="pgg-button pgg-no"
                >
                  No
                </button>
              </div>

              <div className="pgg-history-box">
                <h4>History</h4>
                {history.length === 0 ? (
                  <p>No questions yet.</p>
                ) : (
                  <ul className="pgg-history-list">
                    {history.map((entry, idx) => (
                      <li key={`${entry.question.x}-${idx}`}>
                        Q{idx + 1}: Is f({entry.question.x}) {">"}{" "}
                        {entry.question.y}? {entry.isYes ? "Yes" : "No"}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
