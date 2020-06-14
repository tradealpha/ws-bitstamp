import React, { useState } from "react";

import Chart from "./chart";
import Table from "./table";
import * as Util from "./utils";
import * as MovingAverage from "../lib/moving-average";

const host = "wss://ws.bitstamp.net";

const ws: WebSocket = new WebSocket(host);

ws.onopen = () => {
  Util.channels.forEach((channel) => {
    ws.send(
      JSON.stringify({
        event: "bts:subscribe",
        data: {
          channel,
        },
      })
    );
  });
};

const prepareData = (d: number[], cutoffIdx: number) => {
  const l = d.length;

  if (l < cutoffIdx) {
    const first = d[0];
    const a = new Array(cutoffIdx - l).fill(first);
    return a;
  }

  return d;
};

const prepareDataWMA = (d: number[], nMa: number, cutoffIdx: number) => {
  const e = prepareData(d, cutoffIdx);
  const preMa = MovingAverage.simple(e, nMa);

  const data = e.slice(nMa);
  const ma = preMa.slice(nMa);

  console.log({ data, ma });

  return { data, ma };
};

export default () => {
  const [d, setData] = useState(Util.init);
  const [selectedChannel, setChannel] = useState<string>("live_trades_btcusd");

  ws.onmessage = (event) => {
    const a: { data: { price: number }; channel: string } = JSON.parse(
      event.data
    );

    if (a.data && a.data.price) {
      const i: number = Util.channels.indexOf(a.channel);
      const v = d[0][i];
      const value = a.data.price;
      const growth = (100 * (value - v.value)) / v.value;
      const colorIdx = Math.sign(growth) + 1;
      const values: number[] = [...d[0][i].values, value];

      d[0][i] = { value, growth, colorIdx, values };
      setData([...d]);
    }
  };

  const i: number = Util.channels.indexOf(selectedChannel);
  const cutoffIdx = 10;
  const { data, ma } = prepareDataWMA(d[0][i].values, cutoffIdx, 15);

  return (
    <>
      <h3>Table</h3>
      <Table data={d} />
      <h3>Chart</h3>
      <Util.Badges
        onClick={(c) => setChannel(c)}
        channelSelected={selectedChannel}
      />
      <Chart
        chartLabel={selectedChannel}
        data={data}
        data2={ma}
        labels={data.map((_, i) => "" + i)}
      />
    </>
  );
};
