<script setup>
import {onMounted, ref, onUnmounted, computed, watch} from 'vue';
import {widget} from "../../../public/charting_library";
import Datafeed from "../../core/data/datafeed";
import { useExchangeStore } from "@/stores/exchange";
import { useThemeStore } from "@/stores/theme";

const props = defineProps({
  symbol: {
    default: 'USDT/RUB',
    type: String,
  },
  interval: {
    default: '1',
    type: String,
  },
  datafeedUrl: {
    default: 'https://demo_feed.tradingview.com',
    type: String,
  },
  libraryPath: {
    default: '/charting_library/',
    type: String,
  },
  chartsStorageUrl: {
    default: 'https://api.goxx.ru/market/save-chart-config',
    type: String,
  },
  chartsStorageApiVersion: {
    default: '',
    type: String,
  },
  clientId: {
    default: 'tradingview.com',
    type: String,
  },
  userId: {
    default: '1',
    type: String,
  },
  fullscreen: {
    default: false,
    type: Boolean,
  },
  autosize: {
    default: true,
    type: Boolean,
  },
  studiesOverrides: {
    type: Object,
  },
});
const chartContainer = ref();
const exchangeStore = useExchangeStore();
const themeStore = useThemeStore();
const theme = computed( () => themeStore.mode);
const symbolName = computed(() => exchangeStore.symbolName);
let chartWidget;

watch(symbolName, () => {
  chartWidget.activeChart().setSymbol(symbolName.value);
});

onMounted(() => {
  const widgetOptions = {
    symbol: props.symbol,
    datafeed: Datafeed,
    interval: "15",
    timezone: "Europe/Moscow",
    container: chartContainer.value,
    library_path: props.libraryPath,
    locale: 'ru',
    theme: theme.value,
    disabled_features: ['header_symbol_search', 'header_compare', 'header_screenshot', 'header_saveload', 'popup_hints'],
    // enabled_features: ['study_templates'],
    charts_storage_url: props.chartsStorageUrl,
    charts_storage_api_version: props.chartsStorageApiVersion,
    client_id: props.clientId,
    user_id: props.userId,
    fullscreen: props.fullscreen,
    autosize: props.autosize,
    studies_overrides: props.studiesOverrides,
    // debug: true,
    allow_symbol_change: true,
    favorites: {
      intervals: ['1', '5', '10', '15', '60', '1D', '1W'],
    },
  };
  chartWidget = new widget(widgetOptions);
  exchangeStore.setSymbol(props.symbol);
  chartWidget.onChartReady(() => {
    chartWidget.activeChart().onSymbolChanged().subscribe(null, (symbol) => {
      exchangeStore.setSymbol(symbol.name);
    });
  });
});

watch(theme, () => {
  chartWidget.changeTheme(theme.value);
});

onUnmounted(() => {
  if (chartWidget !== null) {
    chartWidget.remove();
    chartWidget = null;
  }
});
</script>

<template>
  <div class="TVChartContainer" ref="chartContainer"/>
</template>

<style scoped>
.TVChartContainer {
  height: 550px;
}
@media screen and (max-width: 768px) {
  .TVChartContainer {
    height: 400px;
  }
}
</style>