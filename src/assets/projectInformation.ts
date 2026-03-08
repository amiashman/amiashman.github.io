import YieldCurvePlayground from "../projects/yieldCurvePlayground/YieldCurvePlayground";
import type { Project } from "./types";

export const PROJECTS: Project[] = [
  // Add your projects here
  {
    id: "yield",
    title: "Yield Curve Playground",
    component: YieldCurvePlayground
  }
];

export function getProjectById(id: string): Project | undefined {
  return PROJECTS.find((project) => project.id === id);
}
