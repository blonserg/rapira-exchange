<template>
  <div class="card card-flush d-flex flex-column justify-space-between h-100" :class="className">
    <!--begin::Header-->
    <div class="card-header pt-5 pb-6">
      <!--begin::Title-->
      <div class="card-title d-flex flex-column">
        <h3 class="text-gray-600 fs-3 fw-bold lh-md mb-3">
          {{ $t('Available.title') }}
        </h3>
        <!--begin::Info-->
        <div class="d-flex align-items-center">
          <!--begin::Amount-->
          <span class="fs-2hx fw-bold text-dark me-2 lh-1 ls-n2">
            {{ numberFormatting(totalUSDT) }}
            <span class="fw-bold text-dark"
            >USDT</span>
          </span>
          <!--end::Amount-->
        </div>
        <!--end::Info-->

        <!--begin::Subtitle-->
        <span class="text-gray-600 pt-2 fw-semibold fs-6"
        >≈ {{ numberFormatting(totalRUB) }} RUB  </span
        >
        <!--end::Subtitle-->
      </div>
      <!--end::Title-->
    </div>
    <!--end::Header-->

    <!--begin::Card body-->
    <div class="card-body pt-2 pb-4 d-flex flex-wrap align-items-center justify-content-around">
      <!--begin::Chart-->
      <div class="apex-chart d-flex flex-center">
        <apexchart type="donut" width="170" height="180" :options="chartOptions" :series="series"></apexchart>
      </div>
      <!--end::Chart-->
      <!--begin::Labels-->
      <div class="d-flex flex-column content-justify-center flex-row-fluid mt-5" style="max-width: 300px">
        <!--begin::Label-->
        <div class="label-apex d-flex fw-semibold align-items-center justify-content-between">
          <div class="d-flex align-items-center">
            <!--begin::Bullet-->
            <div class="bullet w-20px h-3px rounded-2 me-3 bg-success"></div>
            <!--end::Bullet-->
            <!--begin::Label-->
            <div class="text-gray-500 fw-bold fs-6 flex-grow-1 me-4">{{ $t('Available.fiat') }}</div>
            <!--end::Label-->
          </div>
          <!--begin::Stats-->
          <div class="number-apex fw-bold fs-6 text-xxl-end">${{ numberFormatting(totalFiat) }}</div>
          <!--end::Stats-->
        </div>
        <!--end::Label-->

        <!--begin::Label-->
        <div class="label-apex d-flex fw-semibold align-items-center my-3 justify-content-between">
          <div class="d-flex align-items-center">
            <!--begin::Bullet-->
            <div class="bullet w-20px h-3px rounded-2 me-3"
                 style="background-color:  #2F80ED"></div>
            <!--end::Bullet-->
            <!--begin::Label-->
            <div class="text-gray-500 fw-bold fs-6 flex-grow-1 me-4">{{ $t('Available.stable') }}</div>
            <!--end::Label-->
          </div>
          <!--begin::Stats-->
          <div class="number-apex fw-bold fs-6 text-xxl-end">${{ numberFormatting(totalStableCoin) }}</div>
          <!--end::Stats-->
        </div>
        <!--end::Label-->

        <!--begin::Label-->
        <div class="label-apex d-flex fw-semibold align-items-center justify-content-between">
          <div class="d-flex align-items-center">
            <!--begin::Bullet-->
            <div class="bullet w-20px h-3px rounded-2 me-3" style="background: #F2C94C"></div>
            <!--end::Bullet-->
            <!--begin::Label-->
            <div class="text-gray-500 fw-bold fs-6 flex-grow-1 me-4">{{ $t('Available.crypto') }}</div>
            <!--end::Label-->
          </div>
          <!--begin::Stats-->
          <div class="number-apex fw-bold fs-6 text-xxl-end">${{ numberFormatting(totalCrypto) }}</div>
          <!--end::Stats-->
        </div>
        <!--end::Label-->
      </div>
      <!--end::Labels-->
    </div>
    <!--end::Card body-->

    <!--begin::Card action-->
    <div class="card-footer d-flex justify-content-between">
      <div class="text-center w-50 me-5">
        <a
            href="#"
            class="btn btn-primary w-100 fs-6 px-6 fw-bold"
            data-bs-toggle="modal"
            data-bs-target="#kt_modal_create_app"
        >{{ $t('button.deposit') }}</a>
      </div>
      <div class="text-center w-50">
        <a
            href="#"
            class="btn btn-primary w-100 fs-6 px-6 fw-bold"
            data-bs-toggle="modal"
            data-bs-target="#kt_modal_create_app"
        >{{ $t('button.withdraw') }}</a>
      </div>
    </div>
    <!--end::Card action-->
  </div>
</template>

<script lang="ts">
import {getAssetPath} from "@/core/helpers/assets";
import {defineComponent} from "vue";
import VueApexCharts from "vue3-apexcharts";
import {useBasicRequest} from "@/stores/basicRequests";

export default defineComponent({
  name: "default-dashboard-widget-2",
  components: {
    apexchart: VueApexCharts,
  },
  props: {
    className: {type: String, required: false},
    chartSize: {type: Number, required: true},
  },
  setup() {
    const store = useBasicRequest();
    return {
      store,
      getAssetPath,
    };
  },
  data() {
    return {
      series: [] as any,
      chartOptions: {
        opts: {
          colors: "#3F4254",
        },
        colors: ['#F2C94C', "#2F80ED", "#50CD89"],
        pie: {
          donat: {
            labels: {
              show: true,
            },
          },
        },
        labels: [] as any,
        chart: {
          width: 380,
          offsetX: 0,
          type: 'donut',
        },
        dataLabels: {
          enabled: false,
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 250
            },
            legend: {
              show: false,
            }
          }
        }],
        legend: {
          formatter: function () {
            return '';
          },
          show: false,
          height: 0,
          width: 0,
          markers: {
            width: 0,
            height: 0,
          },
          labels: {
            colors: "#A1A5B7",
            useSeriesColors: false,
          },
        },
        yaxis: {
          labels: {
            formatter: function (value) {
              return value + ' USDT';
            }
          },
        },
      },
    }
  },
  methods: {
    numberFormatting(number) {
      return new Intl.NumberFormat("ru", {style: "decimal", maximumFractionDigits: 2}).format(number);
    },
  },
  computed: {
    dataCrypto() {
      return this.store.wallet;
    },
    totalUSDT() {
      let total: number = 0;
      this.store.wallet.forEach(item => {
        total += (item["balance"] + item["frozenBalance"]) * item["usdRate"];
      })
      return total;
    },
    totalRUB() {
      let total = 0;
      this.store.wallet.forEach(item => {
        total += (item["balance"] + item["frozenBalance"]) * item["rubRate"];
      });
      return total;
    },
    totalCny() {
      let total = 0;
      this.store.wallet.forEach(item => {
        total += (item["balance"] + item["frozenBalance"]) * item["cnyRate"];
      })
      return total;
    },
    totalCrypto() {
      let total = 0;
      let arrayCrypto = this.store.wallet.filter(item => !item["isFiat"]);
      arrayCrypto.forEach(item => {
        total += (item["balance"] + item["frozenBalance"]) * item["usdRate"];
      });
      return total;
    },
    totalStableCoin() {
      let total = 0;
      let arrayCrypto = this.store.wallet.filter(item => !item["isFiat"] && item["isStableCoin"]);
      arrayCrypto.forEach(item => {
        total += (item["balance"] + item["frozenBalance"]) * item["usdRate"];
      });
      return total;
    },
    totalFiat() {
      let total = 0;
      let arrayCrypto = this.store.wallet.filter(item => item["isFiat"]);
      arrayCrypto.forEach(item => {
        total += (item["balance"] + item["frozenBalance"]) * item["usdRate"];
      });
      return total;
    },
  },
  created() {
    this.series.push(+this.totalCrypto.toFixed(2),
        +this.totalStableCoin.toFixed(2),
        +this.totalFiat.toFixed(2))
    this.chartOptions.labels.push("Криптовалюты", "Stable-койны", "Фиатные средства")
  }
});
</script>
<style lang="scss">
@media (max-width: 310px) {
  .label-apex {
    flex-wrap: wrap;
  }
  .number-apex {
    width: 100%;
    margin-left: 29px;
  }
}
</style>