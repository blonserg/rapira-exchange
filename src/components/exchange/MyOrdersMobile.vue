<template>
  <div class="row position-fixed w-100 bottom-0 mb-8">
    <div class="row">
      <div class="col-6">
        <button
            class="btn btn-success w-100 fs-5"
            @click="dialogMyOrdersBuy = true"
        >
          {{ $t('exchange.buy') }} {{ firstPair }}
        </button>
      </div>
      <div class="col-6">
        <button
            class="btn btn-danger w-100 fs-5"
            @click="dialogMyOrdersSell = true"
        >
          {{ $t('exchange.sell') }} {{ firstPair }}
        </button>
      </div>
    </div>
  </div>
  <el-dialog
      v-model="dialogMyOrdersBuy"
      width="100%"
      custom-class="modal-exchange"
  >
    <div class="card">
      <div class="card-header border-0 pt-0 d-flex justify-space-between align-items-center">
        <div class="d-flex flex-column flex-lg-row">
          <!--begin::Toolbar-->
          <div class="card-toolbar m-0">
            <!--begin::Tab nav-->
            <ul
                class="nav nav-stretch fs-4 text-black fw-semobold nav-line-tabs nav-line-tabs border-transparent"
                role="tablist"
            >
              <li class="nav-item" role="presentation">
                <a
                    id="my_orders_tab1"
                    class="nav-link text-active-dark active pb-4 pt-0 fw-bold me-lg-6"
                    data-bs-toggle="tab"
                    role="tab"
                    href="#my_orders_market_buy"
                >
                  {{ $t('exchange.market') }}
                </a>
              </li>

              <li class="nav-item" role="presentation">
                <a
                    id="my_orders_tab2"
                    class="nav-link text-active-dark pb-4 pt-0 fw-bold ms-lg-6"
                    data-bs-toggle="tab"
                    role="tab"
                    href="#my_orders_limit_buy"
                >
                  {{ $t('exchange.limit') }}
                </a>
              </li>
            </ul>
            <!--end::Tab nav-->
          </div>
          <!--end::Toolbar-->
        </div>
      </div>
      <div class="card-body pt-0">
        <!--begin::Tab Content-->
        <div id="my_orders_content" class="tab-content ">
          <div
              id="my_orders_market_buy"
              class="py-0 tab-pane fade active show"
              role="tabpanel"
          >
            <div class="d-flex flex-column flex-lg-row justify-content-between">
              <div class="w-100 pe-lg-4 border-end">
                <div class="d-flex justify-content-between align-items-center">
                  <h4 class="fs-3 py-2">
                    {{ $t('exchange.buy') }}
                  </h4>
                  <div v-if="isAuthenticated" class="text-gray-600 fs-7">
                    {{ $t('exchange.available') }}:
                    {{ numberFormatting(limitOfSecondCurrency, 2) }}
                    {{ secondPair }}
                  </div>
                </div>
                <label class="d-flex text-gray-600 justify-content-between align-items-center form-label mb-1"
                >
                  <span class="fw-bold fs-7">{{ $t('exchange.count') }}</span>
                </label>
                <div class="position-relative">
                  <input type="number" min="0" v-model="buyAmountMarket" @input="changeBuyAmountMarket" class="form-control mb-2" placeholder="0" />
                  <div class="position-absolute translate-middle-y top-50 end-0 me-5 fw-bold fs-5 text-gray-600">{{ firstPair }}</div>
                </div>
                <label class="d-flex text-gray-600 justify-content-between align-items-center form-label mb-1"
                >
                  <span class="fw-bold fs-7">{{ $t('exchange.total') }}</span>
                </label>
                <div class="position-relative">
                  <input disabled type="number" min="0" v-model="buyTotalMarket" class="form-control form-control-flush border-bottom mb-2" placeholder="0" />
                  <div class="position-absolute translate-middle-y top-50 end-0 me-5 fw-bold fs-5 text-gray-600">{{ secondPair }}</div>
                </div>
                <div class="d-flex justify-content-between mt-3">
                  <div class="fs-4 fw-bold">{{ $t('exchange.commission') }}</div>
                  <div class="fs-4 fw-bold">
                    <span v-if="buyComissionMarket">{{ numberFormatting(buyComissionMarket, 2) }}</span>
                    <span v-else>0</span>
                    {{ secondPair }}
                    <span> / 0.2%</span>
                  </div>
                </div>
                <div v-if="!isAuthenticated" class="mt-3">
                  <router-link class="btn btn-primary w-100 fs-5" to="/auth">
                    <span>{{ $t('exchange.login') }}</span> {{ $t('exchange.or') }} <span>{{ $t('exchange.register') }}</span>
                  </router-link>
                </div>
                <div v-else class="mt-3">
                  <button
                      class="btn btn-success w-100 fs-5"
                      @click="actionDeal(choosenPair, '0', buyTotalMarket, 'BUY', 'MARKET_PRICE')"
                  >
                    {{ $t('exchange.buy') }} {{ firstPair }}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
              id="my_orders_limit_buy"
              class="py-0 tab-pane fade"
              role="tabpanel"
          >
            <div class="d-flex flex-column flex-lg-row justify-content-between">
              <div class="w-100 pe-lg-4 border-end">
                <div class="d-flex justify-content-between align-items-center">
                  <h4 class="fs-3 py-2">
                    {{ $t('exchange.buy') }}
                  </h4>
                  <div v-if="isAuthenticated" class="text-gray-600 fs-7">
                    {{ $t('exchange.available') }}:
                    {{ numberFormatting(limitOfSecondCurrency, 2) }}
                    {{ secondPair }}
                  </div>
                </div>
                <label class="d-flex text-gray-600 justify-content-between align-items-center form-label mb-1"
                >
                  <span class="fw-bold fs-7">{{ $t('exchange.count') }}</span>
                </label>
                <div class="position-relative">
                  <input type="number" min="0" v-model="buyAmount" @input="changeBuyAmount" class="form-control mb-2" placeholder="0" />
                  <div class="position-absolute translate-middle-y top-50 end-0 me-5 fw-bold fs-5 text-gray-600">{{ firstPair }}</div>
                </div>
                <label class="d-flex text-gray-600 justify-content-between align-items-center form-label mb-1"
                >
                  <span class="fw-bold fs-7">{{ $t('exchange.price') }}</span>
                </label>
                <div class="position-relative">
                  <input type="number" min="0" v-model="sellPrice" @input="changeBuyAmount" class="form-control mb-2" placeholder="0" />
                  <div class="position-absolute translate-middle-y top-50 end-0 me-5 fw-bold fs-5 text-gray-600">{{ secondPair }}</div>
                </div>
                <label class="d-flex text-gray-600 justify-content-between align-items-center form-label mb-1"
                >
                  <span class="fw-bold fs-7">{{ $t('exchange.total') }}</span>
                </label>
                <div class="position-relative">
                  <input type="number" min="0" v-model="buyTotal" @input="changeBuyTotal" class="form-control mb-2" placeholder="0" />
                  <div class="position-absolute translate-middle-y top-50 end-0 me-5 fw-bold fs-5 text-gray-600">{{ secondPair }}</div>
                </div>
                <div class="d-flex justify-content-between mt-3">
                  <div class="fs-4 fw-bold">{{ $t('exchange.commission') }}</div>
                  <div class="fs-4 fw-bold">
                    <span v-if="buyComission">{{ numberFormatting(buyComission, 2) }}</span>
                    <span v-else>0</span>
                    {{ secondPair }}
                    <span> / 0.2%</span>
                  </div>
                </div>
                <div v-if="!isAuthenticated" class="mt-3">
                  <router-link class="btn btn-primary w-100 fs-5" to="/auth">
                    <span>{{ $t('exchange.login') }}</span> {{ $t('exchange.or') }} <span>{{ $t('exchange.register') }}</span>
                  </router-link>
                </div>
                <div v-else class="mt-3">
                  <button
                      class="btn btn-success w-100 fs-5"
                      @click="actionDeal(choosenPair, buyPrice, buyAmount, 'BUY', 'LIMIT_PRICE')"
                  >
                    {{ $t('exchange.buy') }} {{ firstPair }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>

  <el-dialog
      v-model="dialogMyOrdersSell"
      width="100%"
      custom-class="modal-exchange"
  >
    <div class="card">
      <div class="card-header border-0 pt-0 d-flex justify-space-between align-items-center">
        <div class="d-flex flex-column flex-lg-row">
          <!--begin::Toolbar-->
          <div class="card-toolbar m-0">
            <!--begin::Tab nav-->
            <ul
                class="nav nav-stretch fs-4 text-black fw-semobold nav-line-tabs nav-line-tabs border-transparent"
                role="tablist"
            >
              <li class="nav-item" role="presentation">
                <a
                    id="my_orders_tab1"
                    class="nav-link text-active-dark active pb-4 pt-0 fw-bold me-lg-6"
                    data-bs-toggle="tab"
                    role="tab"
                    href="#my_orders_market_sell"
                >
                  {{ $t('exchange.market') }}
                </a>
              </li>

              <li class="nav-item" role="presentation">
                <a
                    id="my_orders_tab2"
                    class="nav-link text-active-dark pb-4 pt-0 fw-bold ms-lg-6"
                    data-bs-toggle="tab"
                    role="tab"
                    href="#my_orders_limit_sell"
                >
                  {{ $t('exchange.limit') }}
                </a>
              </li>
            </ul>
            <!--end::Tab nav-->
          </div>
          <!--end::Toolbar-->
        </div>
      </div>
      <div class="card-body pt-0">
        <!--begin::Tab Content-->
        <div id="my_orders_content" class="tab-content ">
          <div
              id="my_orders_market_sell"
              class="py-0 tab-pane fade active show"
              role="tabpanel"
          >
            <div class="d-flex flex-column flex-lg-row justify-content-between">
              <div class="w-100 ps-lg-4">
                <div class="d-flex justify-content-between align-items-center">
                  <h4 class="fs-3 py-2">
                    {{ $t('exchange.sell') }}
                  </h4>
                  <div v-if="isAuthenticated" class="text-gray-600 fs-7">
                    {{ $t('exchange.available') }}:
                    {{ numberFormatting(limitOfFirstCurrency, 2) }}
                    {{ firstPair }}
                  </div>
                </div>
                <label class="d-flex text-gray-600 justify-content-between align-items-center form-label mb-1"
                >
                  <span class="fw-bold fs-7">{{ $t('exchange.count') }}</span>
                </label>
                <div class="position-relative">
                  <input type="number" min="0" v-model="sellAmountMarket" @input="changeSellAmountMarket" class="form-control mb-2" placeholder="0" />
                  <div class="position-absolute translate-middle-y top-50 end-0 me-5 fw-bold fs-5 text-gray-600">{{ firstPair }}</div>
                </div>
                <label class="d-flex text-gray-600 justify-content-between align-items-center form-label mb-1"
                >
                  <span class="fw-bold fs-7">{{ $t('exchange.total') }}</span>
                </label>
                <div class="position-relative">
                  <input type="number" min="0" disabled v-model="sellTotalMarket" class="form-control form-control-flush border-bottom mb-2" placeholder="0" />
                  <div class="position-absolute translate-middle-y top-50 end-0 me-5 fw-bold fs-5 text-gray-600">{{ secondPair }}</div>
                </div>
                <div class="d-flex justify-content-between mt-3">
                  <div class="fs-4 fw-bold">{{ $t('exchange.commission') }}</div>
                  <div class="fs-4 fw-bold">
                    <span v-if="sellComissionMarket">{{ numberFormatting(sellComissionMarket, 2) }}</span>
                    <span v-else>0</span>
                    {{ secondPair }}
                    <span> / 0.2%</span>
                  </div>
                </div>
                <div v-if="!isAuthenticated" class="mt-3">
                  <router-link class="btn btn-primary w-100 fs-5" to="/auth">
                    <span>{{ $t('exchange.login') }}</span> {{ $t('exchange.or') }} <span>{{ $t('exchange.register') }}</span>
                  </router-link>
                </div>
                <div v-else class="mt-3">
                  <button
                      class="btn btn-danger w-100 fs-5"
                      @click="actionDeal(choosenPair, '0', sellAmountMarket, 'SELL', 'MARKET_PRICE')"
                  >
                    {{ $t('exchange.sell') }} {{ firstPair }}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
              id="my_orders_limit_sell"
              class="py-0 tab-pane fade"
              role="tabpanel"
          >
            <div class="d-flex flex-column flex-lg-row justify-content-between">
              <div class="w-100 ps-lg-4">
                <div class="d-flex justify-content-between align-items-center">
                  <h4 class="fs-3 py-2">
                    {{ $t('exchange.sell') }}
                  </h4>
                  <div v-if="isAuthenticated" class="text-gray-600 fs-7">
                    {{ $t('exchange.available') }}:
                    {{ numberFormatting(limitOfFirstCurrency, 2) }}
                    {{ firstPair }}
                  </div>
                </div>
                <label class="d-flex text-gray-600 justify-content-between align-items-center form-label mb-1"
                >
                  <span class="fw-bold fs-7">{{ $t('exchange.count') }}</span>
                </label>
                <div class="position-relative">
                  <input type="number" min="0" v-model="sellAmount" @input="changeSellAmount" class="form-control mb-2" placeholder="0" />
                  <div class="position-absolute translate-middle-y top-50 end-0 me-5 fw-bold fs-5 text-gray-600">{{ firstPair }}</div>
                </div>
                <label class="d-flex text-gray-600 justify-content-between align-items-center form-label mb-1"
                >
                  <span class="fw-bold fs-7">{{ $t('exchange.price') }}</span>
                </label>
                <div class="position-relative">
                  <input type="number" min="0" v-model="buyPrice" @input="changeSellAmount" class="form-control mb-2" placeholder="0" />
                  <div class="position-absolute translate-middle-y top-50 end-0 me-5 fw-bold fs-5 text-gray-600">{{ secondPair }}</div>
                </div>
                <label class="d-flex text-gray-600 justify-content-between align-items-center form-label mb-1"
                >
                  <span class="fw-bold fs-7">{{ $t('exchange.total') }}</span>
                </label>
                <div class="position-relative">
                  <input type="number" min="0" v-model="sellTotal" @input="changeSellTotal" class="form-control mb-2" placeholder="0" />
                  <div class="position-absolute translate-middle-y top-50 end-0 me-5 fw-bold fs-5 text-gray-600">{{ secondPair }}</div>
                </div>
                <div class="d-flex justify-content-between mt-3">
                  <div class="fs-4 fw-bold">{{ $t('exchange.commisssion') }}</div>
                  <div class="fs-4 fw-bold">
                    <span v-if="sellComission">{{ numberFormatting(sellComission, 2) }}</span>
                    <span v-else>0</span>
                    {{ secondPair }}
                    <span> / 0.2%</span>
                  </div>
                </div>
                <div v-if="!isAuthenticated" class="mt-3">
                  <router-link class="btn btn-primary w-100 fs-5" to="/auth">
                    <span>{{ $t('exchange.login') }}</span> {{ $t('exchange.or') }} <span>{{ $t('exchange.register') }}</span>
                  </router-link>
                </div>
                <div v-else class="mt-3">
                  <button
                      class="btn btn-danger w-100 fs-5"
                      @click="actionDeal(choosenPair, sellPrice, sellAmount, 'SELL', 'LIMIT_PRICE')"
                  >
                    {{ $t('exchange.sell') }} {{ firstPair }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>

</template>

<script lang="ts">
import
{computed, defineComponent, onMounted, ref, watch} from "vue";
import { useExchangeStore } from "@/stores/exchange";
import { useAuthStore } from "@/stores/auth";
import Api from "@/config/api";
import axios from "axios";
import {ElMessage} from "element-plus";
import Swal from "sweetalert2/dist/sweetalert2.js";
import ApiService from "@/core/services/ApiService";

export default defineComponent({
  name: "myorders",
  components: {
  },
  setup() {
    const exchangeStore = useExchangeStore();
    const isAuthenticated = useAuthStore().isAuthenticated;
    const buyPrice = ref();
    const buyPriceHistory = computed(() => exchangeStore.buyPrice);
    const sellPrice = ref();
    const sellPriceHistory = computed(() => exchangeStore.sellPrice);
    const buyAmount = ref();
    const buyAmountMarket = ref();
    const buyTotal = ref();
    const buyTotalMarket = ref();
    const sellAmount = ref();
    const sellAmountMarket = ref();
    const sellTotal = ref();
    const sellTotalMarket = ref();
    const buyComission = computed(() => buyTotal.value / 100 * 0.2);
    const sellComission = computed(() => sellTotal.value / 100 * 0.2);
    const buyComissionMarket = computed(() => buyTotalMarket.value / 100 * 0.2);
    const sellComissionMarket = computed(() => sellTotalMarket.value / 100 * 0.2);
    const choosenPair = computed(() => exchangeStore.symbolName);
    const firstPair = computed(() => exchangeStore.firstPair);
    const secondPair = computed(() => exchangeStore.secondPair);
    const limitOfFirstCurrency = ref();
    const limitOfSecondCurrency = ref();
    const dialogMyOrdersBuy =ref(false);
    const dialogMyOrdersSell =ref(false);

    watch([sellPriceHistory, buyPriceHistory], (value) => {
      sellPrice.value = value[0];
      buyPrice.value = value[1];
    });

    watch(choosenPair, () => {
      getWallet();
    });

    const getWallet = async () => {
      axios.post(Api.uc.wallet).then(response => {
        if (response.data.code === 0 || response.data.code === 200) {
          let res = response.data.data;
          limitOfFirstCurrency.value = res.find(item => item.unit === firstPair.value)?.balance
          limitOfSecondCurrency.value = res.find(item => item.unit === secondPair.value)?.balance
        } else ElMessage.error(response.data.message);
      }).catch(response => {
        ElMessage.error(response.data.message);
      });
    };

    const actionDeal = (symbol, price, amount, direction, type) => {
      let formData = new FormData;
      formData.append("symbol", symbol);
      formData.append("price", price);
      formData.append("amount", amount);
      formData.append("direction", direction);
      formData.append("type", type);
      formData.append("useDiscount", "0");
      ApiService.post(Api.exchange.orderAdd, formData).then(response => {
        if (response.data.code === 0 || response.data.code === 200) {
          ElMessage.success(response.data.message);
          exchangeStore.setIsDeal(`${response.data.message} ${Date.now()}`);
          setTimeout(() => {
            getWallet();
          }, 500);
        } else {
          successOrErrorSubmit('Ошибка', response.data.message, 'error');
        }
      }).catch(response => {
        successOrErrorSubmit('Ошибка', response.data.message, 'error');
      });
    };

    // старая переделанная функция для подсчета цены
    const getMarketPrice = async (orderbook, trueDir, volume, input) => {
      let volume_left = volume;
      let turnover = 0;
      let count = 0;

      const isNormalVolume = trueDir ^ input;
      if (!isNormalVolume) {
        orderbook.forEach((item) => {
          item.amount = item.price * item.amount;
        });
      }

      if (volume_left === 0 || !volume_left) {
        return orderbook[0].price;
      }

      for (let i = 0; i < orderbook.length; i++) {
        if (orderbook[i].amount > volume_left) {
          const price = isNormalVolume ? orderbook[i].price : 1 / orderbook[i].price;
          turnover += volume_left * price;
          volume_left = 0;
          count++;
          break;
        } else {
          const price = isNormalVolume ? orderbook[i].price : 1 / orderbook[i].price;
          volume_left -= orderbook[i].amount;
          turnover += orderbook[i].amount * price;
          count++;
        }
      }

      let result_price = 0;
      if (volume_left === 0) {
        result_price = isNormalVolume ? turnover / volume : volume / turnover;
      } else {
        result_price = isNormalVolume ? turnover / (volume - volume_left) : (volume - volume_left) / turnover;
      }

      return result_price;
    };

    const successOrErrorSubmit = (text, message, value) => {
      //@ts-ignore
      Swal.fire({
        html: `<div>
                    <div class='mb-5'>${text}</div>
                    <span style='font-size: 12px'>${message}</span>
                 </div>`,
        icon: `${value}`,
        buttonsStyling: false,
        confirmButtonText: "Закрыть",
        customClass: {
          confirmButton: "btn btn-light"
        }
      })
    };

    onMounted(() => {
      getWallet();
    });

    return {
      buyPrice,
      buyPriceHistory,
      sellPrice,
      sellPriceHistory,
      buyAmount,
      buyAmountMarket,
      buyTotal,
      buyTotalMarket,
      sellAmount,
      sellAmountMarket,
      sellTotal,
      sellTotalMarket,
      isAuthenticated,
      buyComission,
      sellComission,
      buyComissionMarket,
      sellComissionMarket,
      choosenPair,
      firstPair,
      secondPair,
      limitOfFirstCurrency,
      limitOfSecondCurrency,
      actionDeal,
      dialogMyOrdersBuy,
      dialogMyOrdersSell,
    };
  },

  methods: {
    changeBuyAmount() {
      this.buyTotal = Number((this.buyAmount * this.sellPrice).toFixed(2));
    },

    changeBuyTotal() {
      this.buyAmount = Number((this.buyTotal / this.sellPrice).toFixed(2));
    },

    changeSellAmount() {
      this.sellTotal = Number((this.sellAmount * this.buyPrice).toFixed(2));
    },

    changeSellTotal() {
      this.sellAmount = Number((this.sellTotal / this.buyPrice).toFixed(2));
    },

    changeBuyAmountMarket() {
      this.buyTotalMarket = this.buyAmountMarket * Number(this.sellPriceHistory);
    },

    changeSellAmountMarket() {
      this.sellTotalMarket = this.sellAmountMarket * Number(this.buyPriceHistory);
    },

    numberFormatting(number, count) {
      return new Intl.NumberFormat("ru", {style: "decimal", maximumFractionDigits: count}).format(number);
    },
  },
});
</script>
