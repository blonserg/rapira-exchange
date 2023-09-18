<template>
  <div class="card h-100">
    <div class="d-flex align-items-center position-relative w-auto mx-3 pt-3">
      <input
          type="text"
          v-model="search"
          class="form-control fs-6 w-100 p-3 lh-1 ps-10 pair-search"
          :placeholder="isFocused ? 'Введите не менее 3-х символов' : 'Поиск'"
          @focus="handleFocus"
          @blur="handleBlur"
      />
      <KTIcon
          icon-name="magnifier"
          icon-class="fs-4 position-absolute start-0 ms-3"
      />
      <i
          v-if="search.length > 0"
          class="fs-3 position-absolute end-0 me-3 cursor-pointer ki-outline ki-cross"
          @click="clearSearch"
      >
      </i>
    </div>
    <div class="d-flex text-gray-600 px-6 lh-1 fw-semibold border-bottom">
      <div @click="getChoosenPairs('')" class="py-3 cursor-pointer me-3" :class="{'text-primary': currentPair === ''}">
        Все
      </div>
      <div @click="getFavoritePairs(false)" class="py-3 cursor-pointer me-3" :class="{'text-primary': currentPair === 'Favorite'}">
        Избранные
      </div>
      <div @click="getChoosenPairs('USDT')" class="py-3 cursor-pointer me-3" :class="{'text-primary': currentPair === 'USDT'}">
        USDT
      </div>
      <div @click="getChoosenPairs('RUB')" class="py-3 cursor-pointer me-3" :class="{'text-primary': currentPair === 'RUB'}">
        RUB
      </div>
      <div @click="getChoosenPairs('BTC')" class="py-3 cursor-pointer" :class="{'text-primary': currentPair === 'BTC'}">
        BTC
      </div>
    </div>
    <div class="table-responsive pb-0">
      <table class="table table-pairs">
        <thead>
          <tr
              class="fw-semibold fs-7 text-gray-500 text-nowrap"
          >
            <th class="ps-6 fw-semibold lh-1 py-3">
              <span class="me-1">Пары</span>
              <span
                  v-show="sortNameState === 'default'"
                  class="cursor-pointer"
                  @click="sortName"
              >
                <PairArrowSvg
                />
              </span>
              <span
                  v-show="sortNameState === 'up'"
                  class="cursor-pointer"
                  @click="sortNameDown"
                  :class="{'up': sortNameState === 'up'}"
              >
                <PairArrowSvg />
              </span>
              <span
                  v-show="sortNameState === 'down'"
                  class="cursor-pointer"
                  @click="sortName"
                  :class="{'down': sortNameState === 'down'}"
              >
                <PairArrowSvg />
              </span>
            </th>
            <th class="fw-semibold lh-1 py-3">
              <span class="me-1">Цена</span>
              <span
                  v-show="sortPriceState === 'default'"
                  class="cursor-pointer"
                  @click="sortPrice"
              >
                <PairArrowSvg />
              </span>
              <span
                  v-show="sortPriceState === 'up'"
                  class="cursor-pointer"
                  @click="sortPriceDown"
                  :class="{'up': sortPriceState === 'up'}"
              >
                <PairArrowSvg />
              </span>
              <span
                  v-show="sortPriceState === 'down'"
                  class="cursor-pointer"
                  @click="sortPrice"
                  :class="{'down': sortPriceState === 'down'}"
              >
                <PairArrowSvg />
              </span>
            </th>
            <th class="fw-semibold lh-1 py-3 text-end">
              <span class="me-1">Изменение</span>
              <span
                  v-show="sortChangeState === 'default'"
                  class="cursor-pointer"
                  @click="sortChange"
              >
                <PairArrowSvg />
              </span>
              <span
                  v-show="sortChangeState === 'up'"
                  class="cursor-pointer"
                  @click="sortChangeDown"
                  :class="{'up': sortChangeState === 'up'}"
              >
                <PairArrowSvg />
              </span>
              <span
                  v-show="sortChangeState === 'down'"
                  class="cursor-pointer"
                  @click="sortChange"
                  :class="{'down': sortChangeState === 'down'}"
              >
                <PairArrowSvg />
              </span>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr
              v-for="(pairs, index) in filteredResult"
              :key="index"
              class="cursor-pointer trading-pair-row"
              :class="{'active': symbolName === pairs.symbol}"
              v-if="filteredResult.length > 0"
          >
            <td
                class="ps-6 border-0"
                @click="() => setSymbolName(pairs.symbol)"
            >
              <div class="table-pairs-td d-flex fw-semibold fs-7">
                <span>{{ formatPairs(pairs.symbol, true) }}</span>
                <span class="text-gray-500">/{{ formatPairs(pairs.symbol, false) }}</span>
              </div>
            </td>
            <td
                class="border-0"
                @click="() => setSymbolName(pairs.symbol)"
            >
              <div class="table-pairs-td d-flex fw-normal flex-column justify-content-center fs-7">
                {{ pairs.close }}
                <span class="text-gray-600">${{ pairs.usdRate }}</span>
              </div>
            </td>
            <td
                class="border-0 text-end"
                @click="() => setSymbolName(pairs.symbol)"
            >
              <div
                  class="table-pairs-td d-flex fw-normal flex-column justify-content-center fs-7"
                  :class="[pairs.change < 0 ? 'text-danger' : 'text-success']"
              >
                <span>
                  <span v-if="pairs.change > 0">+</span>{{ pairs.change }}
                </span>
                <span class="text-gray-600">{{ pairs.volume }}</span>
              </div>
            </td>
            <td class="border-0">
              <div class="cursor-pointer text-gray-600" @click="checkLocal(pairs.symbol)">
                <StarSvg
                    class="pair-star"
                    :class="[isFavoritePair(pairs.symbol) ? 'active' : 'hide']"
                />
              </div>
            </td>
          </tr>
          <tr v-else-if="filteredResult.length === 0 && currentPair === 'Favorite'">
            <td class="px-6 border-0" colspan="4">
              <div class="d-flex flex-column align-items-center">
                <span class="text-center mt-6 mb-3 trading-pair-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="currentColor">
                    <path d="M8.07493 27.4375C7.25783 27.4366 6.46338 27.1688 5.81243 26.6749C5.26392 26.254 4.83156 25.7003 4.55602 25.0662C4.28049 24.432 4.17085 23.7382 4.23743 23.0499L4.68743 18.3125C4.6926 18.2515 4.68529 18.1901 4.66595 18.1321C4.6466 18.0741 4.61563 18.0206 4.57493 17.9749L1.49993 14.4249C1.05583 13.8936 0.754026 13.2581 0.622838 12.5781C0.491651 11.8981 0.535382 11.1959 0.749927 10.5374C0.949877 9.88145 1.31822 9.28929 1.81826 8.81995C2.3183 8.35061 2.93259 8.02048 3.59993 7.86245L8.07493 6.84995C8.18855 6.81331 8.28581 6.73815 8.34993 6.63745L10.6749 2.53745C10.9919 1.92959 11.4695 1.42027 12.0557 1.06484C12.6419 0.709413 13.3144 0.521484 13.9999 0.521484C14.6855 0.521484 15.3579 0.709413 15.9441 1.06484C16.5304 1.42027 17.0079 1.92959 17.3249 2.53745L19.6499 6.63745C19.714 6.73815 19.8113 6.81331 19.9249 6.84995L24.3999 7.86245C25.0673 8.02048 25.6816 8.35061 26.1816 8.81995C26.6816 9.28929 27.05 9.88145 27.2499 10.5374C27.4645 11.1959 27.5082 11.8981 27.377 12.5781C27.2458 13.2581 26.944 13.8936 26.4999 14.4249L23.4624 17.9749C23.4217 18.0206 23.3908 18.0741 23.3714 18.1321C23.3521 18.1901 23.3448 18.2515 23.3499 18.3125L23.7999 23.0499C23.8665 23.7382 23.7569 24.432 23.4813 25.0662C23.2058 25.7003 22.7734 26.254 22.2249 26.6749C21.6866 27.0825 21.0482 27.337 20.3771 27.4118C19.7061 27.4867 19.0273 27.3789 18.4124 27.0999L14.1749 25.25C14.1199 25.2251 14.0603 25.2122 13.9999 25.2122C13.9396 25.2122 13.8799 25.2251 13.8249 25.25L9.62493 27.0999C9.13824 27.3217 8.60975 27.4368 8.07493 27.4375ZM13.9999 2.36245C13.6265 2.36509 13.2606 2.46725 12.9398 2.6584C12.619 2.84955 12.355 3.12279 12.1749 3.44995L9.84993 7.54995C9.7045 7.81433 9.50443 8.04471 9.26303 8.22576C9.02164 8.4068 8.74446 8.53436 8.44993 8.59995L3.99993 9.62495C3.62827 9.70348 3.28466 9.88076 3.00529 10.1381C2.72591 10.3955 2.5211 10.7235 2.41243 11.0875C2.2952 11.4504 2.27271 11.8373 2.3471 12.2114C2.42148 12.5855 2.59027 12.9344 2.83743 13.225L5.88743 16.775C6.2837 17.2535 6.47666 17.8683 6.42493 18.4874L5.97493 23.2249C5.92949 23.6084 5.98519 23.9971 6.1365 24.3523C6.28781 24.7076 6.52946 25.017 6.83743 25.25C7.13099 25.4754 7.48042 25.6167 7.8482 25.6585C8.21599 25.7004 8.58822 25.6412 8.92493 25.4874L13.1374 23.5875C13.4081 23.4637 13.7023 23.3997 13.9999 23.3997C14.2976 23.3997 14.5917 23.4637 14.8624 23.5875L19.0749 25.4874C19.4116 25.6412 19.7839 25.7004 20.1516 25.6585C20.5194 25.6167 20.8689 25.4754 21.1624 25.25C21.4645 25.0204 21.7026 24.7171 21.8536 24.369C22.0046 24.0209 22.0636 23.6399 22.0249 23.2624L21.5749 18.525C21.5232 17.9058 21.7162 17.291 22.1124 16.8125L25.1624 13.2624C25.4096 12.9719 25.5784 12.623 25.6528 12.2489C25.7271 11.8748 25.7047 11.4879 25.5874 11.125C25.4846 10.754 25.2824 10.4182 25.0026 10.1539C24.7228 9.88951 24.3761 9.70662 23.9999 9.62495L19.5124 8.59995C19.2179 8.53436 18.9407 8.4068 18.6993 8.22576C18.4579 8.04471 18.2579 7.81433 18.1124 7.54995L15.8249 3.44995C15.6449 3.12279 15.3809 2.84955 15.0601 2.6584C14.7393 2.46725 14.3733 2.36509 13.9999 2.36245Z" fill="currentColor"/>
                  </svg>
                </span>
                <p class="fw-semibold fs-7 text-center mb-4 trading-pair-text">У Вас нет избранных пар</p>
              </div>
            </td>
          </tr>
          <tr v-else>
            <td class="px-6 border-0" colspan="4">
              <div class="d-flex flex-column align-items-center">
                <p class="fw-semibold fs-7 text-center mb-4 trading-pair-text">Нет результатов</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import {computed, defineComponent, onMounted, ref} from "vue";
import ApiService from "@/core/services/ApiService";
import Api from "@/config/api";
import {ElMessage} from "element-plus";
import {useI18n} from "vue-i18n";
import { useExchangeStore } from "@/stores/exchange";
import StarSvg from "@/assets/svg/StarSvg.vue";
import PairArrowSvg from "@/assets/svg/PairArrowSvg.vue";
import { parseFullSymbol } from '@/core/helpers/helpers.js';

export default defineComponent({
  name: "trading-pairs",
  components: {
    StarSvg,
    PairArrowSvg,
  },
  setup() {
    const { t } = useI18n();
    const store = useExchangeStore();
    const favoritePairsStore = computed(() => store.favoritePairs);
    const tableData: { value: any[] } = ref([]);
    const tableDataComputed: { value: any[] } = ref([]);
    const currentPair = ref('');
    const search = ref<string>("");
    const favoritePairs: { value: string[] } = ref([]);
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
    const isFavoritePair = (symbol: string) => {
      return favoritePairsStore.value.includes(symbol);
    };
    const savedFavoritePairs = localStorage.getItem('favoritePairs');
    if (savedFavoritePairs) {
      favoritePairs.value = JSON.parse(savedFavoritePairs);
    }
    const sortNameState = ref('default');
    const sortPriceState = ref('default');
    const sortChangeState = ref('default');
    const symbolName = computed(() => store.symbolName);
    const isFocused = ref(false);

    const getFavoritePairs = (computed) => {
      tableDataComputed.value = tableData.value;
      const favoritePairsSet = new Set(favoritePairsStore.value);
      tableDataComputed.value = tableDataComputed.value.filter(el => favoritePairsSet.has(el.symbol));
      if (!computed) {
        currentPair.value = 'Favorite';
      }
    };

    const getChoosenPairs = (pair) => {
      tableDataComputed.value = tableData.value;
      tableDataComputed.value = tableDataComputed.value.filter(el => el.symbol.endsWith(pair));
      currentPair.value = pair;
    };

    const sortName = () => {
      tableDataComputed.value = tableDataComputed.value.sort((a, b) => {
        return a.symbol.localeCompare(b.symbol);
      });
      sortNameState.value = 'up';
      sortPriceState.value = 'default';
      sortChangeState.value = 'default';
    };

    const sortNameDown = () => {
      tableDataComputed.value.reverse();
      sortNameState.value = 'down';
    };

    const sortPrice = () => {
      tableDataComputed.value = tableDataComputed.value.sort((a, b) => {
        return a.close - b.close;
      });
      sortChangeState.value = 'default';
      sortNameState.value = 'default';
      sortPriceState.value = 'up';
    };

    const sortPriceDown = () => {
      tableDataComputed.value.reverse();
      sortPriceState.value = 'down';
    };

    const sortChange = () => {
      tableDataComputed.value = tableDataComputed.value.sort((a, b) => {
        return a.change - b.change;
      });
      sortNameState.value = 'default';
      sortPriceState.value = 'default';
      sortChangeState.value = 'up';
    };

    const sortChangeDown = () => {
      tableDataComputed.value.reverse();
      sortChangeState.value = 'down';
    }

    const getPairs = () => {
      tableData.value = store.tradingPairs;
      tableDataComputed.value = tableData.value;
    };

    const formatPairs = (pair: string, base: boolean) => {
      let formatedData = parseFullSymbol(pair);
      return base ? formatedData.fromSymbol : formatedData.toSymbol;
    };

    const clearSearch = () => {
      search.value = '';
    };

    const handleFocus = () => {
      isFocused.value = true;
    };

    const handleBlur = () => {
      isFocused.value = false;
    };

    onMounted( () => {
      getPairs();
    });

    return {
      tableData,
      getAssetPath,
      tableDataComputed,
      currentPair,
      search,
      checkLocal,
      isFavoritePair,
      getFavoritePairs,
      getChoosenPairs,
      sortName,
      sortNameDown,
      sortNameState,
      sortPrice,
      sortPriceState,
      sortPriceDown,
      sortChangeState,
      sortChange,
      sortChangeDown,
      formatPairs,
      symbolName,
      clearSearch,
      isFocused,
      handleFocus,
      handleBlur,
    };
  },

  created() {
    this.init();
  },

  methods: {
    setSymbolName(symbol) {
      useExchangeStore().setSymbol(symbol);
    },

    init() {
      ApiService.setHeader();
    },
  },
  computed: {
    filteredResult() {
      const {tableDataComputed, search} = this as any;
      let filtered = tableDataComputed;
      let results;
      if (search.length > 2) {
        results = filtered.filter((pair: any) => pair.symbol.toLowerCase().includes(this.search.toLowerCase()));
      } else {
        results = filtered;
      }
      return results;
    }
  }
});
</script>

<style scoped>
.card {
  border-radius: 0;
}
.pair-star {
  color: #bec6cb;
}
.pair-star.active {
  color: #EBA93B;
}
.table-pairs .table-pairs-td {
  color: var(--bs-body-color);
}
.table-pairs td {
  vertical-align: middle;
  padding-top: 10px;
  padding-bottom: 10px;
}
.trading-pair-row:hover,
.trading-pair-row.active{
  background: var(--bs-trading-pair-hover);
}
.pair-search:hover {
  border-color: #357aff;
}
.pair-search:focus {
  border-color: #5d95ff;
  box-shadow: rgba(53, 122, 255, 0.2) 0px 0px 0px 2px;
}
.trading-pair-text {
  color: var(--bs-trading-pair-text);
}
.trading-pair-icon {
  color: var(--bs-trading-pair-icon);
}
</style>
