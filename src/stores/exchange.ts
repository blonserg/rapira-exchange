import { defineStore } from "pinia";

export const useExchangeStore = defineStore("exchange", {
  state: () => ({
    symbolName: "",
    firstPair: "",
    secondPair: "",
    baseCoinScale: "",
    coinScale: "",
    buyPrice: "",
    sellPrice: "",
    isDeal: "",
    favoritePairs: [],
    orders: {
      buyLimitPrice: "",
      buyLimitAmount: "",
      sellLimitPrice: "",
      sellLimitAmount: "",
      allOrders: [],
    },
    tradingPairs: [
      {
        symbol: "",
        baseCoinScale: "",
        coinScale: "",
        change: "",
        usdRate: "",
        high: "",
        low: "",
        close: "",
        volume: "",
        turnover: "",
        quoteCurrencyName: "",
      },
    ],
  }),
  actions: {
    setSymbol(data: string) {
      this.symbolName = data;
      const match = data.match(/(\w+)\/(\w+)$/);
      // @ts-ignore
      this.firstPair = match[1];
      // @ts-ignore
      this.secondPair = match[2];
    },
    setBuyPrices(data: string) {
      this.buyPrice = data;
    },
    setSellPrices(data: string) {
      this.sellPrice = data;
    },
    setIsDeal(data: string) {
      this.isDeal = data;
    },
    setBuyOrder(price: string, amount: string) {
      this.orders.buyLimitPrice = price;
      this.orders.buyLimitAmount = amount;
    },
    setSellOrder(price: string, amount: string) {
      this.orders.sellLimitPrice = price;
      this.orders.sellLimitAmount = amount;
    },
    setAllOrders(data: []) {
      this.orders.allOrders = data;
    },
    setFavoritePairs(data) {
      this.favoritePairs = data;
    },
    setTradingPairs(data: []) {
      this.tradingPairs = data;
    },
    setCurrentTradingPair(pair) {
      const index = this.tradingPairs.findIndex(
        (item) => item.symbol === pair.symbol
      );

      if (index !== -1) {
        Object.assign(this.tradingPairs[index], {
          close: pair.close,
          change: pair.change,
        });
      }
    },
    setScale(base, coin) {
      this.baseCoinScale = base;
      this.coinScale = coin;
    },
  },
});
