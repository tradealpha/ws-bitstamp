import * as DigitalFilter from "./digital-filter";

export const simple = (x: number[], n: number = 10): number[] => {
  const { a, b } = DigitalFilter.SMA(n);
  return DigitalFilter.filter({ b, a }, x);
};

export const exp = (x: number[], nDay: number = 10): number[] => {
  const { a, b } = DigitalFilter.EWMAday(nDay);
  return DigitalFilter.filter({ b, a }, x);
};
