<template>
  <div class="exchange-main-medium d-flex justify-content-between g-5">
    <div class="d-flex grid-info">
      <div class="grid-pair-medium">
        <!--begin::TradingPair-->
        <TradingPair />
        <!--end::TradingPair-->
      </div>
      <div class="w-100">
        <div class="pair-info pair-info-medium ps-3">
          <PairInfo />
        </div>
        <div class="grid-chart-medium">
          <!--begin::ActiveOrders-->
          <TVChartContainer />
          <!--end::ActiveOrders-->
        </div>
      </div>
    </div>
    <div class="grid-book-medium">
      <ul
          class="nav nav-stretch fs-4 text-black fw-semobold nav-line-tabs nav-line-tabs border-transparent grid-book-nav"
          role="tablist"
      >
        <li class="nav-item" role="presentation">
          <a
              id="order-book-medium-tab"
              class="nav-link text-active-dark active m-0 p-0"
              data-bs-toggle="tab"
              role="tab"
              href="#order-book-medium"
          >
            <span class="px-6 py-3 ms-0 fw-bold lh-1 fs-6">Стакан</span>
          </a>
        </li>

        <li class="nav-item flex-grow-1" role="presentation">
          <a
              id="order-history-medium-tab"
              class="nav-link text-active-dark p-0 m-0 w-100"
              data-bs-toggle="tab"
              role="tab"
              href="#order-history-medium"
          >
            <span class="px-6 py-3 ms-0 fw-bold lh-1 fs-6">Последние сделки</span>
          </a>
        </li>
      </ul>
      <div class="tab-content">
        <div
            id="order-book-medium"
            class="py-0 tab-pane active show"
            role="tabpanel"
        >
          <!--begin::OrderBook-->
          <OrderBook />
          <!--end::OrderBook-->
        </div>
        <div
            id="order-history-medium"
            class="py-0 tab-pane"
            role="tabpanel"
        >
          <!--begin::OrderHistory-->
          <OrderHistory />
          <!--end::OrderHistory-->
        </div>
      </div>
    </div>
    <div class="grid-order-medium px-0">
      <!--begin::MyOrders-->
      <MyOrders />
      <!--end::MyOrders-->
    </div>
  </div>
  <div class="mx-0">
    <div class="grid-footer-medium px-0">
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
.grid-info {
  width: 59%;
  flex-grow: 1;
}
.grid-pair-medium {
  width: 35%;
  padding-right: 5px;
  max-width: 357px;
}
.grid-chart-medium {
  padding-right: 5px;
  flex-grow: 1;
}
.grid-book-medium {
  width: 22%;
  margin-right: 5px;
  margin-bottom: 5px;
  background: var(--bs-body-bg);
  max-width: 373px;
}
.grid-order-medium {
  width: 19%;
  margin-bottom: 5px;
  background: var(--bs-body-bg);
  max-width: 303px;
}
.nav-line-tabs .nav-item .nav-link span{
  border-top: 3px solid transparent;
}
.nav-line-tabs .nav-item .nav-link.active span
{
  border-top: 3px solid var(--bs-primary);
}
.nav-line-tabs .nav-item .nav-link.active, .nav-line-tabs .nav-item.show .nav-link, .nav-line-tabs .nav-item .nav-link:hover:not(.disabled) {
  border-bottom: 1px solid transparent;
}
.nav-item .nav-link.active span {
  position: relative;
  z-index: 15;
  background-color: #fff;
}
.nav-item .nav-link {
  border-bottom: 0;
}
.nav {
  position: relative;
  border-bottom: 0;
}
.nav::after {
  content:'';
  position: absolute;
  bottom: 2px;
  left: 0;
  width: 100%;
  height: 0.8px;
  background-color: #DDE0E2;
}
.nav-line-tabs .nav-item {
  margin-bottom: 0;
}
li::marker {
  content: none;
}
.grid-book-nav {
  background: var(--bs-body-bg);
}
.pair-info {
  background: var(--bs-body-bg);
}
.pair-info-medium {
  margin-right: 5px;
  margin-bottom: 5px;
}
.exchange-main-medium {
  margin-top: 5px;
}
.nav-item-grow .nav-link{
  flex-grow: 1;
}
.nav-item-grow .active {
  flex-grow: 0;
}
.grid-footer-medium {
  margin-bottom: 5px;
}
</style>