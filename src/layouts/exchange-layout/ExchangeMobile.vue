<template>
  <div class="row">
    <div class="col mb-5 px-0">
      <!--begin::TradingPair-->
      <TradingPair />
      <!--end::TradingPair-->
    </div>
  </div>
  <div class="row mb-4">
    <div class="card col">
      <div>
        <ul class="nav nav-tabs nav-line-tabs mb-5 fs-6">
          <li class="nav-item">
            <a
                class="nav-link active text-black fw-bold"
                data-bs-toggle="tab"
                href="#exchange-chart"
            >График</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link text-black fw-bold" data-bs-toggle="tab" href="#exchange-orders"
            >Биржевой стакан</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link text-black fw-bold" data-bs-toggle="tab" href="#exchange-history"
            >История сделок</a
            >
          </li>
        </ul>
      </div>
      <div class="tab-content">
        <div
            class="py-0 tab-pane fade active show"
            role="tabpanel"
            id="exchange-chart"
        >
          <TVChartContainer />
        </div>
        <div
            class="py-0 tab-pane fade"
            role="tabpanel"
            id="exchange-orders"
        >
          <OrderBook />
        </div>
        <div
            class="py-0 tab-pane fade"
            role="tabpanel"
            id="exchange-history"
        >
          <OrderHistory />
        </div>
      </div>
    </div>
  </div>
  <div v-if="isAuthenticated" class="row">
    <div class="px-0">
      <ActiveOrders />
    </div>
  </div>
  <MyOrders />
</template>

<script lang="ts">
import OrderBook from "@/components/exchange/OrderBook.vue";
import OrderHistory from "@/components/exchange/OrderHistory.vue";
import TradingPair from "@/components/exchange/TradingPair.vue";
import ActiveOrders from "@/components/exchange/ActiveOrders.vue";
import TVChartContainer from "@/components/exchange/TVChartContainer.vue";
import MyOrders from "@/components/exchange/MyOrdersMobile.vue";
import {useAuthStore} from "@/stores/auth";

export default {
  name: "ExchangeMobile",
  components: {
    TVChartContainer,
    OrderBook,
    TradingPair,
    ActiveOrders,
    OrderHistory,
    MyOrders,
  },
  setup() {
    const isAuthenticated = useAuthStore().isAuthenticated;

    return {
      isAuthenticated
    }
  },
}
</script>
