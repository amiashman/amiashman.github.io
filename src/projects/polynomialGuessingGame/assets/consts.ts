export const maxCoeff = 7;
export const minCoeff = -7;
export const minX = -4;
export const maxX = 4;

export const randomnessTemperature = 0.7;

export type Polynomial = {
  a: number;
  b: number;
  c: number;
  d: number;
};

export type Question = {
  x: number;
  y: number;
};

export type HistoryEntry = { question: Question; isYes: boolean };
