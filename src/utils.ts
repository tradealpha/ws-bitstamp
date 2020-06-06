import { ResponseData } from "./type";

/**
 * This var is an example of subscription message. By changing its event property to: "bts:unsubscribe"
 * you can delete your subscription and stop receiving events.
 */
export const subscribeMsg = (
  channel: string = "live_trades_btcusd"
): { event: string; data: { channel: string } } => ({
  event: "bts:subscribe",
  data: {
    channel,
  },
});

/**
 * Serializes a trade when it's received.
 */
export const serializeTrade = (data: ResponseData): string => {
  return (
    "(" +
    data.timestamp +
    ") " +
    data.id +
    ": " +
    data.amount +
    " BTC @ " +
    data.price +
    " USD " +
    data.type
  );
};

export const initWebsocket = () => {
  const ws: WebSocket = new WebSocket("wss://ws.bitstamp.net");
  ws.onopen = function () {
    ws.send(JSON.stringify(subscribeMsg()));
  };

  /**
   * In case of unexpected close event, try to reconnect.
   */
  ws.onclose = function () {
    console.log("Websocket connection closed");
    initWebsocket();
  };

  return ws;
};
