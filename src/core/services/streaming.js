import {parseFullSymbol, parseSymbolStream} from '../helpers/helpers.js';
import socket from "../services/SocketService.ts";

const channelToSubscription = new Map();

socket.on('kline', data => {
  const tradePrice = data.openPrice;
  // const tradePriceClose = data.payload.close;
  const tradeTime = parseInt(data.time);
  const parsedSymbol = parseSymbolStream(data.symbol);
  const channelString = `0~${parsedSymbol.fromSymbol}~${parsedSymbol.toSymbol}`;
  const subscriptionItem = channelToSubscription.get(channelString)
  if (subscriptionItem === undefined) {
    return;
  }
  const lastDailyBar = subscriptionItem.lastDailyBar;
  const nextDailyBarTime = getNextDailyBarTime(lastDailyBar.time);

  let bar;
  if (tradeTime >= nextDailyBarTime) {
    bar = {
      time: nextDailyBarTime,
      open: tradePrice,
      high: tradePrice,
      low: tradePrice,
      close: tradePrice,
    };
    console.log('[socket] Generate new bar', bar);
  } else {
    bar = {
      ...lastDailyBar,
      high: Math.max(lastDailyBar.high, tradePrice),
      low: Math.min(lastDailyBar.low, tradePrice),
      close: tradePrice,
    };
    console.log('[socket] Update the latest bar by price', tradePrice);
  }
  subscriptionItem.lastDailyBar = bar;

  // Send data to every subscriber of that symbol
  subscriptionItem.handlers.forEach(handler => handler.callback(bar));
});

socket.on("deals", data => {
  if (data) {
    for (const orderItem of data) {
      const tradePrice = orderItem.price;
      // const tradePriceClose = data.payload.close;
      const tradeTime = parseInt(orderItem.time);
      const parsedSymbol = parseFullSymbol(orderItem.symbol);
      const channelString = `${parsedSymbol.fromSymbol}_${parsedSymbol.toSymbol}`;
      const subscriptionItem = channelToSubscription.get(channelString)
      if (subscriptionItem === undefined) {
        return;
      }
      const lastDailyBar = subscriptionItem.lastDailyBar;
      const nextDailyBarTime = getNextDailyBarTime(lastDailyBar.time);

      let bar;
      if (tradeTime >= nextDailyBarTime) {
        bar = {
          time: nextDailyBarTime,
          open: tradePrice,
          high: tradePrice,
          low: tradePrice,
          close: tradePrice,
        };
        console.log('[socket] Generate new bar', bar);
      } else {
        bar = {
          ...lastDailyBar,
          high: Math.max(lastDailyBar.high, tradePrice),
          low: Math.min(lastDailyBar.low, tradePrice),
          close: tradePrice,
        };
        console.log('[socket] Update the latest bar by price', tradePrice);
      }
      subscriptionItem.lastDailyBar = bar;

      // Send data to every subscriber of that symbol
      subscriptionItem.handlers.forEach(handler => handler.callback(bar));
    }
  }
});

function getNextDailyBarTime(barTime) {
  const date = new Date(barTime * 1000);
  date.setDate(date.getDate() + 1);
  return date.getTime() / 1000;
}

export function subscribeOnStream(
    symbolInfo,
    resolution,
    onRealtimeCallback,
    subscriberUID,
    onResetCacheNeededCallback,
    lastDailyBar
)
{
  const parsedSymbol = parseFullSymbol(symbolInfo.name);
  const channelString = `${parsedSymbol.fromSymbol}_${parsedSymbol.toSymbol}`;
  const handler = {
    id: subscriberUID,
    callback: onRealtimeCallback,
  };
  let subscriptionItem = channelToSubscription.get(channelString);
  if (subscriptionItem) {
    // Already subscribed to the channel, use the existing subscription
    subscriptionItem.handlers.push(handler);
    return;
  }
  subscriptionItem = {
    subscriberUID,
    resolution,
    lastDailyBar,
    handlers: [handler],
  };
  channelToSubscription.set(channelString, subscriptionItem);
  console.log("channelStringSET", channelString)
  console.log('[subscribeBars]: Subscribe to streaming. Channel:', channelString);
  socket.emit('SUBSCRIBE', [
    `spot@public.depth@${channelString}`,
    `spot@public.deals@${channelString}`,
    `spot@public.ticker`,
    `spot@public.kline@${channelString}`
  ]);
}

export function unsubscribeFromStream(subscriberUID) {

  // Find a subscription with id === subscriberUID
  for (const channelString of channelToSubscription.keys()) {
    const subscriptionItem = channelToSubscription.get(channelString);
    const handlerIndex = subscriptionItem.handlers
        .findIndex(handler => handler.id === subscriberUID);

    if (handlerIndex !== -1) {
      // Remove from handlers
      subscriptionItem.handlers.splice(handlerIndex, 1);

      if (subscriptionItem.handlers.length === 0) {
        // Unsubscribe from the channel if it is the last handler
        console.log('[unsubscribeBars]: Unsubscribe from streaming. Channel:', channelString);
        socket.emit('UNSUBSCRIBE', [
          `spot@public.depth@${channelString}`,
          `spot@public.deals@${channelString}`,
          `spot@public.ticker`,
          `spot@public.kline@${channelString}`
        ]);
        channelToSubscription.delete(channelString);
        break;
      }
    }
  }
}