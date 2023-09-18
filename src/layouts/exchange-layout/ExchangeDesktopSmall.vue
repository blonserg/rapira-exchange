<template>
  <div class="d-flex justify-content-between g-5 exchange-main-small">
    <div class="grid-chart-small mb-2">
      <div class="d-flex align-items-baseline px-6 pair-info pair-info-small">
        <div class="pb-8">
          <a
              href="#"
              data-kt-menu-trigger="{default:'click', lg:'hover'}"
              data-kt-menu-attach="parent"
              data-kt-menu-placement="bottom-start"
              class="trading-pair-menu"
          >
            <BurgerSvg />
          </a>
          <div
              class="menu menu-sub menu-sub-dropdown menu-column fw-semibold py-3 fs-base menu-pairs shadow-lg"
              data-kt-menu="true"
          >
            <TradingPair />
          </div>
        </div>
        <!--begin::PairInfo-->
        <PairInfo />
        <!--end::PairInfo-->
      </div>
      <!--begin::ActiveOrders-->
      <TVChartContainer />
      <!--end::ActiveOrders-->
    </div>
    <div class="grid-book-small">
      <div
          class="nav nav-stretch fs-4 text-black fw-semobold nav-line-tabs nav-line-tabs border-transparent grid-book-nav"
          role="tablist"
      >
        <div class="nav-item" role="presentation">
          <a
              id="order-book-small-tab"
              class="nav-link text-active-dark active m-0 p-0"
              data-bs-toggle="tab"
              role="tab"
              href="#order-book-small"
          >
            <span class="px-6 py-3 ms-0 fw-bold lh-1 fs-6">Стакан</span>
          </a>
        </div>

        <div class="nav-item flex-grow-1" role="presentation">
          <a
              id="order-history-small-tab"
              class="nav-link text-active-dark p-0 m-0 w-100"
              data-bs-toggle="tab"
              role="tab"
              href="#order-history-small"
          >
            <span class="px-6 py-3 ms-0 fw-bold lh-1 fs-6">Последние сделки</span>
          </a>
        </div>
      </div>
      <div class="tab-content">
        <div
            id="order-book-small"
            class="py-0 tab-pane active show"
            role="tabpanel"
        >
          <!--begin::OrderBook-->
          <OrderBook />
          <!--end::OrderBook-->
        </div>
        <div
            id="order-history-small"
            class="py-0 tab-pane"
            role="tabpanel"
        >
          <!--begin::OrderHistory-->
          <OrderHistory />
          <!--end::OrderHistory-->
        </div>
      </div>
    </div>
    <div class="grid-order-small px-0">
      <!--begin::MyOrders-->
      <MyOrders />
      <!--end::MyOrders-->
    </div>
  </div>
  <div >
    <div class="px-0 mt-0 grid-footer-small">
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
import BurgerSvg from "@/assets/svg/BurgerSvg.vue";
import {MenuComponent} from "@/assets/ts/components";

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
    BurgerSvg,
    MenuComponent,
  },
  setup() {
    const isAuthenticated = useAuthStore().isAuthenticated;

    return {
      isAuthenticated
    }
  },
  created() {
    setTimeout(() => {
      MenuComponent.reinitialization();
    }, 1000);
  },
});
</script>

<style scoped>
.grid-chart-small {
  width: 55%;
  padding-right: 5px;
}
.grid-book-small {
  width: 22%;
  margin-right: 5px;
  margin-bottom: 5px;
  background: var(--bs-body-bg);
  min-width: 330px
}
.grid-order-small {
  width: 23%;
  background: var(--bs-body-bg);
  margin-bottom: 5px;
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
.nav-line-tabs .nav-item {
  margin-bottom: 0;
}
li::marker {
  content: none;
}
.menu-pairs {
  max-width: 380px;
  border-radius: 0;
}
.trading-pair-menu {
  color: var(--bs-body-color);
}
.trading-pair-menu.show {
  color: #4281FF;
}
.pair-info {
  background: var(--bs-body-bg);
}
.grid-book-nav {
  background: var(--bs-body-bg);
}
.exchange-main-small {
  margin-top: 5px;
}
.pair-info-small {
  margin-bottom: 5px;
}
.nav-item-grow .nav-link{
  flex-grow: 1;
}
.nav-item-grow .active {
  flex-grow: 0;
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
  bottom: 1px;
  left: 0;
  width: 100%;
  height: 0.8px;
  background-color: #DDE0E2;
}
.grid-footer-small {
  margin-bottom: 5px;
}
</style>