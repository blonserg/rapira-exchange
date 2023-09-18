<template>
  <!--begin::Card-->
  <div class="card h-100">
    <!--begin::Card header-->
    <div class="border-0 flex-column px-4">
      <div class="d-flex justify-content-between align-items-center w-100">
        <!--begin::Toolbar-->
        <div class="card-toolbar m-0">
          <!--begin::Tab nav-->
          <ul
            class="nav nav-stretch fs-4 fw-semobold nav-line-tabs nav-line-tabs border-transparent"
            role="tablist"
          >
            <li class="nav-item" role="presentation">
              <a
                id="kt_referrals_year_tab"
                class="nav-link border-0 active fw-bold me-3"
                data-bs-toggle="tab"
                role="tab"
                href="#kt_customer_details_orders_1"
              >
                <ExchangeBalanceSvg />
              </a>
            </li>

            <li class="nav-item" role="presentation">
              <a
                id="kt_referrals_2019_tab"
                class="nav-link border-0 ms-0 me-3 fw-bold"
                data-bs-toggle="tab"
                role="tab"
                href="#kt_customer_details_orders_2"
              >
                <ExchangeSellSvg />
              </a>
            </li>

            <li class="nav-item" role="presentation">
              <a
                  id="kt_referrals_2019_tab"
                  class="nav-link border-0 ms-0 fw-bold"
                  data-bs-toggle="tab"
                  role="tab"
                  href="#kt_customer_details_orders_3"
              >
                <ExchangeBuySvg />
              </a>
            </li>
          </ul>
          <!--end::Tab nav-->
        </div>
        <!--end::Toolbar-->
        <!--begin::Menu-->
<!--        <a-->
<!--            href="#"-->
<!--            class="p-2"-->
<!--            data-kt-menu-trigger="click"-->
<!--            data-kt-menu-placement="bottom-end"-->
<!--            data-kt-menu-flip="top-end"-->
<!--        >{{ selectedOption }}-->
<!--          <KTIcon icon-name="down" icon-class="fs-5 m-0" />-->
<!--        </a>-->
<!--        <div-->
<!--            class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semobold fs-7 w-125px py-4"-->
<!--            data-kt-menu="true"-->
<!--        >-->
<!--          &lt;!&ndash;begin::Menu item&ndash;&gt;-->
<!--          <div class="menu-item px-3" @click="roundNumbers(2, '0.01')">-->
<!--            <a :class="{'menu-link': true, 'active': selectedOption === '0.01'}" class="menu-link px-3"-->
<!--            >0.01</a-->
<!--            >-->
<!--          </div>-->
<!--          &lt;!&ndash;end::Menu item&ndash;&gt;-->
<!--          &lt;!&ndash;begin::Menu item&ndash;&gt;-->
<!--          <div class="menu-item px-3" @click="roundNumbers(1, '0.1')">-->
<!--            <a :class="{'menu-link': true, 'active': selectedOption === '0.1'}" class="menu-link px-3"-->
<!--            >0.1</a-->
<!--            >-->
<!--          </div>-->
<!--          &lt;!&ndash;end::Menu item&ndash;&gt;-->
<!--          &lt;!&ndash;begin::Menu item&ndash;&gt;-->
<!--          <div class="menu-item px-3" @click="roundNumbers(0, '1')">-->
<!--            <a :class="{'menu-link': true, 'active': selectedOption === '1'}" class="menu-link px-3"-->
<!--            >1</a-->
<!--            >-->
<!--          </div>-->
<!--          &lt;!&ndash;end::Menu item&ndash;&gt;-->
<!--        </div>-->
        <!--end::Menu-->
      </div>
    </div>
    <!--end::Card header-->

    <!--begin::Card body-->
    <div class="px-4">
      <!--begin::Tab Content-->
      <div id="kt_referred_users_tab_content" class="tab-content">
        <div
          id="kt_customer_details_orders_1"
          class="py-0 tab-pane active show"
          role="tabpanel"
        >
          <div class="table-responsive table-orders pb-0">
            <table class="table table-row-dashed table-orders-buy gy-1 gs-1">
              <thead>
                <tr
                    class="fw-bold fs-7 text-gray-800 text-nowrap"
                >
                  <th>{{ $t('exchange.price') }} {{ secondPair }}</th>
                  <th class="text-end">{{ $t('exchange.count') }} {{ firstPair }}</th>
                  <th class="text-end min-width-td">{{ $t('exchange.total') }} {{ firstPair }}</th>
                </tr>
              </thead>
              <tbody>
              <tr
                  class="table-orders-row fs-7 lh-1"
                  v-for="(order, index) in tradeBuySlice"
                  @click="() => setSellDeal(order.price, order.amount)"
                  :key="index"
              >
                <td class="text-danger border-0">{{ order.price }}</td>
                <td class="text-end border-0">{{ formatNumbers(
                    order.amount, ' ', '.', false, 2) }}</td>
                <td class="text-end border-0 min-width-td">{{ formatNumbers(order.totalAmount, ' ', '.', false, 2) }}</td>
                <td class="table-orders-percent w-100 p-0">
                  <div class="h-100 w-100 bg-transparent bg-opacity-10 d-flex justify-content-end">
                    <div
                        class="bg-danger bg-opacity-10 order-bar"
                        role="progressbar"
                        aria-valuenow="50"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        :style="{ width: percentOfMaxTotalBuySlice(order.totalAmount) + '%' }"
                    ></div>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
            <div
                class="d-flex justify-content-between align-items-center"
            >
              <div>
                <span class="text-center fw-bold fs-3"
                      :class="[isLatestPriceBuy ? 'text-danger' : 'text-success']"
                >
                  {{ latestPrice }}
                </span>
                <i v-if="arrowDirection" class="ki-solid ki-arrow-up fs-3"
                   :class="[isLatestPriceBuy ? 'text-danger' : 'text-success']"
                />
                <i v-else class="ki-solid ki-arrow-down fs-3"
                   :class="[isLatestPriceBuy ? 'text-danger' : 'text-success']"
                />
              </div>
              <div>
                <div class="border-bottom text-end">
                  <span class="text-gray-600 fs-8">Спред: </span>
                  <span class="fs-7">{{ numberFormatting(spredOfPair, 2) }} {{ secondPair }}</span>
                </div>
                <div class="text-end">
                  <span class="text-gray-600 fs-8">Обьем: </span>
                  <span class="fs-7">{{ numberFormatting(volumeOfPair, 2) }} {{ firstPair }}</span>
                </div>
              </div>
            </div>
            <table class="table table-row-dashed table-orders-sell gy-1 gs-1">
              <thead>
              <tr
                  class="fw-bold fs-7 text-gray-800 text-nowrap h-0"
              >
                <th class="opacity-0 border-0 lh-1">{{ $t('exchange.price') }} {{ secondPair }}</th>
                <th class="text-end opacity-0 border-0 lh-1">{{ $t('exchange.count') }} {{ firstPair }}</th>
                <th class="text-end opacity-0 border-0 lh-1">{{ $t('exchange.total') }} {{ firstPair }}</th>
              </tr>
              </thead>
              <tbody>
              <tr
                  class="table-orders-row fs-7 lh-1"
                  v-for="(order, index) in tradeSellSlice"
                  @click="() => setBuyDeal(order.price, order.amount)"
                  :key="index"
              >
                <td class="text-success border-0">{{ order.price }}</td>
                <td class="text-end border-0">{{ formatNumbers(order.amount, ' ', '.', false, 2) }}</td>
                <td class="text-end border-0 min-width-td">{{ formatNumbers(order.totalAmount, ' ', '.', false, 2) }}</td>
                <td class="table-orders-percent w-100 p-0">
                  <div class="h-100 w-100 bg-transparent bg-opacity-10 d-flex justify-content-end">
                    <div
                        class="bg-success order-bar bg-opacity-10"
                        role="progressbar"
                        aria-valuenow="50"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        :style="{ width: percentOfMaxTotalSellSlice(order.totalAmount) + '%' }"
                    ></div>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div
          id="kt_customer_details_orders_2"
          class="py-0 tab-pane"
          role="tabpanel"
        >
          <div class="table-responsive table-orders pb-0">
            <table class="table table-orders-buy table-row-dashed gy-1 gs-1">
              <thead>
              <tr
                  class="fw-bold fs-7 text-gray-800 text-nowrap"
              >
                <th>{{ $t('exchange.price') }} {{ secondPair }}</th>
                <th class="text-end">{{ $t('exchange.count') }}  {{ firstPair }}</th>
                <th class="text-end">{{ $t('exchange.total') }} {{ firstPair }}</th>
              </tr>
              </thead>
              <tbody>
              <tr
                  class="table-orders-row fs-7 lh-1"
                  v-for="(order, index) in tradeBuy"
                  @click="() => setSellDeal(order.price, order.amount)"
                  :key="index"
              >
                <td class="text-danger border-0">{{ order.price }}</td>
                <td class="text-end border-0">{{ formatNumbers(order.amount, ' ', '.', false, 2) }}</td>
                <td class="text-end border-0">{{ formatNumbers(order.totalAmount, ' ', '.', false, 2) }}</td>
                <td class="table-orders-percent w-100 p-0">
                  <div class="h-100 w-100 bg-transparent bg-opacity-10 d-flex justify-content-end">
                    <div
                        class="bg-danger order-bar bg-opacity-10"
                        role="progressbar"
                        aria-valuenow="50"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        :style="{ width: percentOfMaxTotalBuy(order.totalAmount) + '%' }"
                    ></div>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div
            id="kt_customer_details_orders_3"
            class="py-0 tab-pane"
            role="tabpanel"
        >
          <div class="table-responsive table-orders pb-0">
            <table class="table table-orders-sell table-row-dashed gy-1 gs-1">
              <thead>
              <tr
                  class="fw-bold fs-7 text-gray-800 text-nowrap"
              >
                <th>{{ $t('exchange.price') }} {{ secondPair }}</th>
                <th class="text-end">{{ $t('exchange.count') }} {{ firstPair }}</th>
                <th class="text-end">{{ $t('exchange.total') }} {{ firstPair }}</th>
              </tr>
              </thead>
              <tbody>
              <tr
                  class="table-orders-row fs-7 lh-1"
                  v-for="(order, index) in tradeSell"
                  @click="() => setBuyDeal(order.price, order.amount)"
                  :key="index"
              >
                <td class="text-success border-0">{{ order.price }}</td>
                <td class="text-end border-0">{{ formatNumbers(order.amount, ' ', '.', false, 2) }}</td>
                <td class="text-end border-0">{{ formatNumbers(order.totalAmount, ' ', '.', false, 2 ) }}</td>
                <td class="table-orders-percent w-100 p-0">
                  <div class="h-100 w-100 bg-transparent bg-opacity-50 d-flex justify-content-end">
                    <div
                        class="bg-success order-bar bg-opacity-10"
                        role="progressbar"
                        aria-valuenow="50"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        :style="{ width: percentOfMaxTotalSell(order.totalAmount) + '%' }"
                    ></div>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <!--end::Tab Content-->
    </div>
    <!--end::Card body-->
  </div>
  <!--end::Card-->
</template>

<script lang="ts">
import {computed, defineComponent, ref, type Ref, watch, onMounted} from "vue";
import socket from "@/core/services/SocketService";
import ApiService from "@/core/services/ApiService";
import Api from "@/config/api";
import {ElMessage} from "element-plus";
import { useExchangeStore } from "@/stores/exchange";
import { formatNumbers } from "@/core/helpers/helpers.js";
import ExchangeBalanceSvg from "@/assets/svg/ExchangeBalanceSvg.vue";
import ExchangeBuySvg from "@/assets/svg/ExchangeBuySvg.vue";
import ExchangeSellSvg from "@/assets/svg/ExchangeSellSvg.vue";

export default defineComponent({
  name: "order-book",
  components: {
    ExchangeBalanceSvg,
    ExchangeBuySvg,
    ExchangeSellSvg,
  },
  data() {
    return {
      orderBook: {
        size: 10,
        symbol: "USDT/RUB",
      },
      orderHistory: {
        size: 10,
        symbol: "USDT/RUB",
      },
    }
  },
  setup() {
    const tradeBuy: Ref<{
        price: any;
        amount: number; totalAmount: number
    }[]> = ref([]);
    const tradeSell: Ref<{
      price: any;
      amount: number; totalAmount: number
    }[]> = ref([]);
    const tradeBuySlice: Ref<{
      price: any;
      amount: number; totalAmount: number
    }[]> = ref([]);
    const tradeSellSlice: Ref<{
      price: any;
      amount: number; totalAmount: number
    }[]> = ref([]);
    const tradeHistory = ref([]);
    const latestPrice = ref();
    const isLatestPriceBuy = ref();
    const arrowDirection = ref();
    const spredOfPair = ref<number>();
    const volumeOfPair = ref<number>();
    const symbolName = computed(() => exchangeStore.symbolName);

    let selectedOption = ref("0.01");

    const exchangeStore = useExchangeStore();
    const orderHistorySize = 10;
    const firstPair = computed( () => exchangeStore.firstPair);
    const secondPair = computed( () => exchangeStore.secondPair);

    const getTradeItemsHistory = async () => {
      let formData = new FormData();
      symbolName ? formData.append('symbol', symbolName.value) : "";

      try {
        const response = await ApiService.post(Api.market.exchangePlate, formData);
        tradeBuy.value = response.data.ask.items.slice(0, 20);
        tradeSell.value = response.data.bid.items.slice(0, 20);
        exchangeStore.setAllOrders(response.data);
        exchangeStore.setBuyPrices(tradeBuy.value[0].price);
        exchangeStore.setSellPrices(tradeSell.value[0].price);
        computedTradeBuy();
        computedTradeSell();
        spredOfPair.value = Math.abs(tradeSellSlice.value[0].price - tradeBuySlice.value[10].price);
        volumeOfPair.value = tradeBuySlice.value[0].totalAmount + tradeSellSlice.value[10].totalAmount;
      } catch (error) {
        ElMessage.error(error.message);
      }
    };

    const getHistoryLatestPrice = async () => {
      let formData = new FormData();
      formData.append('size', orderHistorySize.toString());
      symbolName ? formData.append('symbol', symbolName.value) : "";
      ApiService.post(Api.market.latestTrade, formData).then(response => {
        latestPrice.value = response.data.data[0].price;
      }).catch(response => {
        ElMessage.error(response.data.message)
      });
    }

    watch(symbolName, () => {
      getTradeItemsHistory();
      getHistoryLatestPrice();
    });

    const computedTradeBuy = () => {
      let totalAmount = 0;
      tradeBuy.value.forEach((item: { amount: number; totalAmount: number }) => {
        totalAmount += item.amount;
        item.totalAmount = Number(totalAmount.toFixed(2));
      });

      tradeBuy.value.sort((a, b) => b.totalAmount - a.totalAmount);
      tradeBuySlice.value = tradeBuy.value.slice(-11);
    };

    const computedTradeSell = () => {
      let totalAmount = 0;
      tradeSell.value.forEach((item: { amount: number; totalAmount: number }) => {
        totalAmount += item.amount;
        item.totalAmount = Number(totalAmount.toFixed(2));
      });

      tradeSell.value.sort((a, b) => a.totalAmount - b.totalAmount);
      tradeSellSlice.value = tradeSell.value.slice(0, 11);
    };

    onMounted(() => {
      getTradeItemsHistory();
      getHistoryLatestPrice();
    });

    return {
      selectedOption,
      tradeBuy,
      tradeSell,
      tradeBuySlice,
      tradeSellSlice,
      tradeHistory,
      latestPrice,
      isLatestPriceBuy,
      arrowDirection,
      spredOfPair,
      volumeOfPair,
      exchangeStore,
      symbolName,
      firstPair,
      secondPair,
      formatNumbers,
    };
  },

  created() {
    this.init();

    socket.on("depth", data => this.getTradeItems(data));
    socket.on("deals", data => {
      if (data) {
        for (const orderItem of data) {
          this.getLatestPrice(orderItem);
        }
      }
    });
  },

  computed: {
    maxTotalBuy() {
      return Math.max(...this.tradeBuy.map((item) => Number(item.totalAmount)));
    },

    maxTotalSell() {
      return Math.max(...this.tradeSell.map((item) => Number(item.totalAmount)));
    },

    maxOfTwoArrays() {
      const buySliceValues = this.tradeBuySlice.map((item) => Number(item.totalAmount));
      const sellSliceValues = this.tradeSellSlice.map((item) => Number(item.totalAmount));
      const allValues = [...buySliceValues, ...sellSliceValues];
      return Math.max(...allValues);
    },
  },

  methods: {
    percentOfMaxTotalBuy(total) {
      return ((total / this.maxTotalBuy) * 100).toFixed(2);
    },

    percentOfMaxTotalSell(total) {
      return ((total / this.maxTotalSell) * 100).toFixed(2);
    },

    percentOfMaxTotalBuySlice(total) {
      return ((total / this.maxOfTwoArrays) * 100).toFixed(2);
    },

    percentOfMaxTotalSellSlice(total) {
      return ((total / this.maxOfTwoArrays) * 100).toFixed(2);
    },

    // roundNumbers(precision, value) {
    //   this.tradeBuy = this.tradeBuy.map(function(item) {
    //     return {
    //       price: item.price,
    //       count: item.amount,
    //       total: Number(item.totalAmount).toFixed(precision)
    //     };
    //   });
    //   this.selectedOption = value
    // },

    getTradeItems(data) {
      if (data.direction === "SELL") {
        this.tradeBuy = data.items;
        this.computedTradeBuy();
      }

      if (data.direction === "BUY") {
        this.tradeSell = data.items;
        this.computedTradeSell();
      }

      this.spredOfPair = Math.abs(this.tradeSellSlice[0].price - this.tradeBuySlice[10].price)
    },

    getLatestPrice(data) {
      data.price > this.latestPrice ? this.arrowDirection = true : this.arrowDirection = false;
      this.latestPrice = data.price;
      data.direction === "BUY" ? this.isLatestPriceBuy = true : this.isLatestPriceBuy = false;
    },

    computedTradeBuy() {
      let totalAmount = 0;
      this.tradeBuy.forEach((item: { amount: number; totalAmount: number }) => {
        totalAmount += item.amount;
        item.totalAmount = Number(totalAmount.toFixed(2));
      });

      this.tradeBuy.sort((a, b) => b.totalAmount - a.totalAmount);
      this.tradeBuySlice = this.tradeBuy.slice(-11);
    },

    computedTradeSell() {
      let totalAmount = 0;
      this.tradeSell.forEach((item: { amount: number; totalAmount: number }) => {
        totalAmount += item.amount;
        item.totalAmount = Number(totalAmount.toFixed(2));
      });

      this.tradeSell.sort((a, b) => a.totalAmount - b.totalAmount);
      this.tradeSellSlice = this.tradeSell.slice(0, 11);
    },

    setBuyDeal(price, amount) {
      this.exchangeStore.setBuyOrder(price, amount);
    },

    setSellDeal(price, amount) {
      this.exchangeStore.setSellOrder(price, amount);
    },

    numberFormatting(number, count) {
      return new Intl.NumberFormat("ru", {style: "decimal", maximumFractionDigits: count}).format(number);
    },

    init() {
      ApiService.setHeader();
    },
  },
});
</script>

<style scoped>
.card {
  border-radius: 0;
}
.order-bar {
  height: 18px;
}
.nav-line-tabs .nav-item .nav-link {
  padding: 0.3rem 0;
}
.table.gy-1 td {
  white-space: nowrap;
}
.table-orders .table-orders-row {
  height: 20px;
}
.table-orders-row:hover {
  background-color: #ebebeb52;
}
.table-orders .table-orders-row td{
  height: 20px;
  position: relative;
  z-index: 3;
}
.table-orders .table-orders-row .table-orders-percent{
  position: absolute;
  z-index: 1;
}
.nav-link {
  opacity: 0.3;
}
.nav-link.active {
  opacity: 1;
}
</style>
