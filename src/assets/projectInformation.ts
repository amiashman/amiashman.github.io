import YieldCurvePlayground from "../projects/yieldCurvePlayground/YieldCurvePlayground";
import PolynomialGuessingGame from "../projects/polynomialGuessingGame/PolynomialGuessingGame";
import type { Project } from "./types";

export const PROJECTS: Project[] = [
  {
    id: "yield",
    title: "Yield Curve Playground",
    component: YieldCurvePlayground
  },
  {
    id: "polynomial",
    title: "Polynomial Guessing Game",
    component: PolynomialGuessingGame
  }
];

export function getProjectById(id: string): Project | undefined {
  return PROJECTS.find((project) => project.id === id);
}
