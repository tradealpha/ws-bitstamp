import React from "react";

import "./App.css";
import Chart from "./chart";
import { ResponseData } from "./type";
import * as U from "./utils";

function App() {
  const [s, setS] = React.useState<ResponseData[]>([]);
  const [ws, initWs] = React.useState<WebSocket>(U.initWebsocket());
  const [data, setData] = React.useState<number[]>([]);

  ws.onmessage = (evt: any) => {
    const response: { data: ResponseData; event: any } = JSON.parse(evt.data);
    /**
     * This switch statement handles message logic. It processes data in case of trade event
     * and it reconnects if the server requires.
     */
    switch (response.event) {
      case "trade": {
        const x = response.data;
        setS([...s, x]);
        setData([...data, x.price]);
        break;
      }
      case "bts:request_reconnect": {
        initWs(U.initWebsocket());
        break;
      }
    }
  };

  const labels: string[] = data.map((d) => "" + d);

  return (
    <div className="App">
      <header className="App-header">
        <p>List of trades</p>
        <ul>
          {s.map((s) => (
            <li>{U.serializeTrade(s)}</li>
          ))}
        </ul>

        <Chart data={data} labels={labels} />
      </header>
    </div>
  );
}

export default App;
