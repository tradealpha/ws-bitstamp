import React, { useState } from "react";

import Chart from "./chart";
import Table from "./table";
import * as Util from "./utils";
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

const Badge = (props: {
  text: string;
  isPrimary?: boolean;
  onClick: (channel: string) => void;
}) => {
  const { text, isPrimary = false } = props;
  const color = isPrimary ? "primary" : "secondary";
  const className = "badge badge-pill badge-" + color;
  return (
    <span onClick={() => props.onClick(text)} className={className}>
      {text}
    </span>
  );
};

const Badges = (props: {
  channelSelected?: string;
  onClick: (channel: string) => void;
}) => {
  const { channelSelected = "live_trades_btcusd" } = props;

  return (
    <>
      {Util.channels.map((channel, i) => {
        return (
          <Badge
            key={i}
            onClick={(v) => props.onClick(v)}
            text={channel}
            isPrimary={channelSelected === channel}
          />
        );
      })}
    </>
  );
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

  return (
    <>
      <h3>Table</h3>
      <Table data={d} />
      <h3>Chart</h3>
      <Badges
        onClick={(c) => setChannel(c)}
        channelSelected={selectedChannel}
      />
      <Chart
        chartLabel={selectedChannel}
        data={d[0][i].values}
        labels={d[0][i].values.map((_, i) => "" + i)}
      />
    </>
  );
};
