import * as T from "./type";

export const colors = [
  "#838B8B",
  "#7A8B8B",
  "#C1CDCD",
  "#668B8B",
  "#B4CDCD",
  "#2F4F4F",
  "#2F4F4F",
  "#5F9F9F",
  "#C0D9D9",
  "#528B8B",
  "#E0EEEE",
  "#96CDCD",
  "#388E8E",
  "#79CDCD",
  "#D1EEEE",
  "#8FD8D8",
  "#66CCCC",
  "#ADEAEA",
];

export const channels: string[] = [
  "btcusd",
  "xrpusd",
  "ltcusd",
  "ethusd",
  "bchusd",
].map((x) => "live_trades_" + x);

const initUnit = {
  value: 0,
  growth: 0,
  colorIdx: 0,
  values: [],
};

export const init: T.V[][] = new Array(1)
  .fill(0)
  .map((row) => new Array(channels.length).fill(initUnit));
