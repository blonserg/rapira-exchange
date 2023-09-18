<template>
  <div class="pair-info d-flex align-items-center py-3 px-3" v-for="pair in pairInfo" :key="pair.symbol">
    <div class="d-flex">
      <div class="d-flex flex-column me-3">
        <span class="fw-bold fs-6">
          <span>{{ formatPairs(pair.symbol, true) }}</span>
          <span class="fw-normal">/{{ formatPairs(pair.symbol, false) }}</span>
        </span>
        <span class="fs-7 text-gray-600 lh-1 mb-1">
          {{ pair.quoteCurrencyName }}
        </span>
      </div>
      <div
          class="d-flex flex-column me-5 text-gray-600 cursor-pointer mt-1"
      >
        <StarSvg
            @click="checkLocal(pair.symbol)"
            class="pair-star"
            :class="[isFavoritePair(pair.symbol) ? 'active' : 'hide']"
        />
      </div>
    </div>
    <div class="d-flex flex-column me-8">
      <div  class="fw-bold fs-6">
        <span v-if="!lastPrice" class="me-2">{{ numberFormatting(pair.close, coinScale) }}</span>
        <span v-else class="me-2">{{ numberFormatting(lastPrice, coinScale) }}</span>
        <span
            :class="[pair.change < 0 ? 'text-danger' : 'text-success']"
        >
          <span v-if="pair.change > 0">+</span>{{ pair.change }}%
        </span>
      </div>
      <span class="text-gray-600 fs-7 lh-1 mb-1">≈ ${{ pair.usdRate }}</span>
    </div>
    <div class="d-flex flex-column me-8">
      <span class="fw-bold text-gray-600 fs-7">Макс 24ч</span>
      <span class="fw-bold fs-7">{{ numberFormatting(pair.high, coinScale) }}</span>
    </div>
    <div class="d-flex flex-column me-8">
      <span class="fw-bold text-gray-600 fs-7">Мин 24ч</span>
      <span class="fw-bold fs-7">{{ numberFormatting(pair.low, coinScale) }}</span>
    </div>
    <div class="d-flex flex-column me-8">
      <span class="fw-bold text-gray-600 fs-7">Объём 24ч</span>
      <span class="fw-bold fs-7">{{ formatNumbers(pair.volume, ' ', '.', true, 2) }}</span>
    </div>
    <div class="d-flex flex-column">
      <span class="fw-bold text-gray-600 fs-7">Оборот 24ч</span>
      <span class="fw-bold fs-7">{{ formatNumbers(pair.turnover, '', '.', true, 2) }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, ref, watch} from "vue";
import { useExchangeStore } from "@/stores/exchange";
import StarSvg from "@/assets/svg/StarSvg.vue";
import { parseFullSymbol, formatNumbers } from "@/core/helpers/helpers";
import socket from "@/core/services/SocketService";

export default defineComponent({
  name: "pair-info",
  components: {
    StarSvg
  },

  setup() {
    const store = useExchangeStore();
    const favoritePairsStore = computed(() => store.favoritePairs as any);
    const pairInfo = ref([
      {
        symbol: '',
        baseCoinScale: '',
        coinScale: '',
        change: '',
        usdRate: '',
        high: '',
        low: '',
        close: '',
        volume: '',
        turnover: '',
        quoteCurrencyName: '',
      }
    ]);
    const symbol = computed(() => store.symbolName);
    const favoritePairs: { value: string[] } = ref([]);
    const isFavoritePair = (symbol: string) => {
      return favoritePairsStore.value.includes(symbol);
    };
    const savedFavoritePairs = localStorage.getItem('favoritePairs');
    if (savedFavoritePairs) {
      favoritePairs.value = JSON.parse(savedFavoritePairs);
    }
    const checkLocal = (symbol: any) => {
      const index = favoritePairs.value.indexOf(symbol);
      if (index !== -1) {
        favoritePairs.value.splice(index, 1);
      } else {
        favoritePairs.value.push(symbol);
      }
      localStorage.setItem('favoritePairs', JSON.stringify(favoritePairs.value));
      store.setFavoritePairs(favoritePairs.value);
    };
    const lastPrice = ref('');
    const coinScale = computed(() => store.coinScale);

    const getPairInfo = async () => {
      const res = store.tradingPairs;
      pairInfo.value = res.filter( el => el.symbol === symbol.value);
      if (pairInfo.value[0]) {
        store.setScale(pairInfo.value[0].baseCoinScale, pairInfo.value[0].coinScale);
      }
    };

    const formatPairs = (pair: string, base: boolean) => {
      let formatedData = parseFullSymbol(pair);
      if (formatedData) {
        return base ? formatedData.fromSymbol : formatedData.toSymbol;
      }
    };

    const numberFormatting = (number, count) => {
      return new Intl.NumberFormat("ru", {style: "decimal", maximumFractionDigits: count}).format(number);
    };

    watch(symbol, () => {
      getPairInfo();
      lastPrice.value = "";
    });

    watch(favoritePairsStore, () => {
      isFavoritePair(symbol.value);
    });

    onMounted( () => {
      getPairInfo();
      store.setFavoritePairs(favoritePairs.value);
      socket.on("deals", data => {
        if (data) {
          for (const orderItem of data) {
            lastPrice.value = orderItem.price;
          };
        }
      });
    });

    return {
      pairInfo,
      isFavoritePair,
      checkLocal,
      favoritePairsStore,
      formatPairs,
      formatNumbers,
      lastPrice,
      coinScale,
      numberFormatting,
    };
  },
});
</script>

<style scoped>
.pair-info {
  background: var(--bs-body-bg);
}
.pair-star.active {
  color: #EBA93B;
}
</style>