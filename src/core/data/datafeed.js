import { makeApiRequest, generateSymbol } from "../helpers/helpers.js";
import { subscribeOnStream, unsubscribeFromStream } from '../services/streaming';

// DatafeedConfiguration implementation
const configurationData = {
  // Represents the resolutions for bars supported by your datafeed
  supported_resolutions: ['1', '5', '10', '15', '60', '1D', '1W'],
  // The `exchanges` arguments are used for the `searchSymbols` method if a user selects the exchange
  exchanges: [
    { value: 'Rapira', name: 'Rapira', desc: 'Rapira'},
  ],
  // The `symbols_types` arguments are used for the `searchSymbols` method if a user selects this symbol type
  symbols_types: [
    { name: 'crypto', value: 'crypto'}
  ]
};

// Use it to keep a record of the most recent bar on the chart
const lastBarsCache = new Map();

// Obtains all symbols for all exchanges supported by Rapira
async function getAllSymbols() {
  const data = await makeApiRequest('market/symbol-thumb');
  let allSymbols = [];

  // const pairs = data.map(obj => obj.symbol);
  const pairs = data.map(obj => ({
    symbol: obj.symbol,
    description: obj.description
  }));
  for (const pair of pairs) {
    const [leftPairPart, rightPairPart] = pair.symbol.split('/');
    const symbol = generateSymbol(leftPairPart, rightPairPart);

    allSymbols.push({
      symbol: symbol.short,
      full_name: symbol.full,
      description: pair.description,
      exchange: 'Rapira',
      type: 'crypto',
    });
  }
  return allSymbols;
}

export default {
  onReady: (callback) => {
    console.log('[onReady]: Method call');
    setTimeout(() => callback(configurationData));
  },

  searchSymbols: async (
      userInput,
      exchange,
      symbolType,
      onResultReadyCallback
  ) => {
    const symbols = await getAllSymbols();
    const newSymbols = symbols.filter(symbol => {
      const isExchangeValid = true;
      const isFullSymbolContainsInput = symbol.full_name
          .toLowerCase()
          .indexOf(userInput.toLowerCase()) !== -1;
      return isExchangeValid && isFullSymbolContainsInput;
    });
    onResultReadyCallback(newSymbols);
  },

  resolveSymbol: async (
      symbolName,
      onSymbolResolvedCallback,
      onResolveErrorCallback
  ) => {
    console.log('[resolveSymbol]: Method call', symbolName);

    const symbols = await getAllSymbols();
    const symbolItem = symbols.find(({ full_name }) => full_name === symbolName);
    if (!symbolItem) {
      console.log('[resolveSymbol]: Cannot resolve symbol', symbolName);
      onResolveErrorCallback('Cannot resolve symbol');
      return;
    }

    // Symbol information object
    const symbolInfo = {
      // ticker: symbolItem.full_name,
      name: symbolName,
      description: '',
      type: '',
      session: '24x7',
      timezone: 'Etc/UTC',
      exchange: 'Rapira',
      minmov: 1,
      pricescale: 100,
      has_intraday: true,
      has_no_volume: false,
      has_weekly_and_monthly: false,
      supported_resolutions: configurationData.supported_resolutions,
      volume_precision: 2,
      data_status: 'streaming',
    };
    console.log('[resolveSymbol]: Symbol resolved', symbolName);
    onSymbolResolvedCallback(symbolInfo);
  },

  getBars: async (symbolInfo, resolution, periodParams, onHistoryCallback, onErrorCallback) => {
    const { from, to, firstDataRequest } = periodParams;
    console.log('[getBars]: Method call', symbolInfo, resolution, from, to);

    const queryParams = {
      symbol: symbolInfo.name,
      from: from * 1000,
      to: firstDataRequest ? new Date().getTime(): to * 1000,
      barsMaxSize: 1000,
      resolution
    }

    const query = Object.keys(queryParams)
        .map(name => `${name}=${encodeURIComponent(queryParams[name])}`)
        .join('&');
    try {
      const res = await makeApiRequest(`market/history?${query}`);
      if (res && res === 'Error' || res.length === 0) {
        // "noData" should be set if there is no data in the requested period
        onHistoryCallback([], { noData: true });
        return;
      }

      let bars = res.map(([time, open, high, low, close, volume]) => ({
        time, open, high, low, close, volume
      }))

      if (firstDataRequest) {
        lastBarsCache.set(symbolInfo.full_name, { ...bars[bars.length - 1] });
      }
      console.log(`[getBars]: returned ${bars.length} bar(s)`);
      onHistoryCallback(bars, { noData: false });
    } catch (error) {
      console.log('[getBars]: Get error', error);
      onErrorCallback(error);
    }
  },

  subscribeBars: (
      symbolInfo,
      resolution,
      onRealtimeCallback,
      subscriberUID,
      onResetCacheNeededCallback
  ) => {
    console.log('[subscribeBars]: Method call with subscriberUID:', subscriberUID);
    subscribeOnStream(
        symbolInfo,
        resolution,
        onRealtimeCallback,
        subscriberUID,
        onResetCacheNeededCallback,
        lastBarsCache.get(symbolInfo.full_name)
    );
  },

  unsubscribeBars: (subscriberUID) => {
    console.log('[unsubscribeBars]: Method call with subscriberUID:', subscriberUID);
    unsubscribeFromStream(subscriberUID);
  },
};
