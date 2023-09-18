<template>
  <div class="exchange-main-large d-flex justify-content-between g-5">
    <div class="d-flex grid-info-large">
      <div class="grid-pair-large">
        <!--begin::TradingPair-->
        <TradingPair />
        <!--end::TradingPair-->
      </div>
      <div class="w-100">
        <div class="pair-info pair-info-large ps-3">
          <PairInfo />
        </div>
        <div class="grid-chart-large">
          <!--begin::ActiveOrders-->
          <TVChartContainer />
          <!--end::ActiveOrders-->
        </div>
      </div>
    </div>
    <div class="grid-book-large overflow-hidden">
      <div class="p-4 pb-2 exchange-title lh-1 fs-6 fw-bold">
        Стакан
      </div>
      <!--begin::OrderBook-->
      <OrderBook />
      <!--end::OrderBook-->
    </div>
    <div class="grid-history-large overflow-hidden">
      <div class="p-4 pb-2 exchange-title lh-1 fs-6 fw-bold">
        Последние сделки
      </div>
      <!--begin::OrderHistory-->
      <OrderHistory />
      <!--end::OrderHistory-->
    </div>
    <div class="grid-order-large overflow-hidden px-0">
      <!--begin::MyOrders-->
      <MyOrders />
      <!--end::MyOrders-->
    </div>
  </div>
  <div class="row g-5 mx-0 flex-grow-1">
    <div class="grid-footer-large col-md-12 col-lg-12 px-0">
      <!--begin::ActiveOrders-->
      <ActiveOrders />
      <!--end::ActiveOrders-->
    </div>
  </div>
</template>

<script lang="ts">
import OrderBook from "@/components/exchange/OrderBook.vue";
import OrderHistory from "@/components/exchange/OrderHistory.vue";
import TradingPair from "@/components/exchange/TradingPair.vue";
import ActiveOrders from "@/components/exchange/ActiveOrders.vue";
import TVChartContainer from "@/components/exchange/TVChartContainer.vue";
import MyOrders from "@/components/exchange/MyOrders.vue";
import {useAuthStore} from "@/stores/auth";
import PairInfo from "@/components/exchange/PairInfo.vue";

export default ({
  name: "ExchangeDesktop",
  components: {
    TVChartContainer,
    OrderBook,
    TradingPair,
    ActiveOrders,
    OrderHistory,
    MyOrders,
    PairInfo,
  },
  setup() {
    const isAuthenticated = useAuthStore().isAuthenticated;

    return {
      isAuthenticated
    }
  },
});
</script>

<style scoped>
.grid-info-large {
  width: 50.5%;
  flex-grow: 1;
}
.grid-pair-large {
  width: 35%;
  padding-right: 5px;
  max-width: 357px;
}
.grid-chart-large {
  padding-right: 5px;
  flex-grow: 1;
}
.grid-book-large {
  width: 18.5%;
  margin-right: 5px;
  background: var(--bs-body-bg);
  max-width: 373px;
  margin-bottom: 5px;
  padding-bottom: 2px;
}
.grid-history-large {
  width: 16%;
  margin-right: 5px;
  background: var(--bs-body-bg);
  max-width: 323px;
  margin-bottom: 5px;
}
.grid-order-large {
  width: 15%;
  background: var(--bs-body-bg);
  max-width: 303px;
  margin-bottom: 5px;
}
.pair-info,
.exchange-title {
  background: var(--bs-body-bg);
}
.pair-info-large {
  margin-right: 5px;
  margin-bottom: 5px;
}
.exchange-main-large {
  margin-top: 5px;
}
.grid-footer-large {
  margin-bottom: 5px;
}
</style>