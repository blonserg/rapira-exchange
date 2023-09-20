<template>
  <div class="modal fade" tabindex="-1" id="kt_aml_info">
    <div class="modal-dialog modal-dialog-centered">
      <div v-if="data[0]" class="modal-content">
        <div class="modal-header pt-1 px-4 pb-0 border-0 justify-content-end">
          <!--begin::Close-->
          <div
            class="btn btn-icon btn-sm btn-active-light-primary ms-2"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <i class="ki-outline ki-cross fs-1"></i>
          </div>
          <!--end::Close-->
        </div>
        <div class="modal-body pt-0">
          <div class="d-flex align-items-center mb-6">
            <div class="aml-chart">
              <!--begin::Chart-->
              <div class="apex-chart d-flex flex-center">
                <apexchart
                  type="donut"
                  width="170"
                  height="180"
                  :options="chartOptions"
                  :series="series"
                ></apexchart>
              </div>
              <!--end::Chart-->
              <!--begin::Labels-->
              <div
                class="d-flex flex-column content-justify-center flex-row-fluid mt-5"
                style="max-width: 300px"
              >
                <!--begin::Label-->
                <div
                  class="label-apex d-flex fw-semibold align-items-center justify-content-between"
                >
                  <div class="d-flex align-items-center">
                    <!--begin::Bullet-->
                    <div
                      class="bullet w-20px h-8px rounded-2 me-3 bg-danger"
                    ></div>
                    <!--end::Bullet-->
                    <!--begin::Label-->
                    <div class="text-gray-600 fw-semibold fs-8 flex-grow-1">
                      Опасные источники
                    </div>
                    <!--end::Label-->
                  </div>
                </div>
                <!--end::Label-->

                <!--begin::Label-->
                <div
                  class="label-apex d-flex fw-semibold align-items-center my-3 justify-content-between"
                >
                  <div class="d-flex align-items-center">
                    <!--begin::Bullet-->
                    <div
                      class="bullet w-20px h-8px rounded-2 me-3 bg-success"
                    ></div>
                    <!--end::Bullet-->
                    <!--begin::Label-->
                    <div class="text-gray-600 fw-semibold fs-8 flex-grow-1">
                      Надёжные источники
                    </div>
                    <!--end::Label-->
                  </div>
                </div>
                <!--end::Label-->

                <!--begin::Label-->
                <div
                  class="label-apex d-flex fw-semibold align-items-center justify-content-between"
                >
                  <div class="d-flex align-items-center">
                    <!--begin::Bullet-->
                    <div
                      class="bullet w-20px h-8px rounded-2 me-3 bg-warning"
                    ></div>
                    <!--end::Bullet-->
                    <!--begin::Label-->
                    <div class="text-gray-600 fw-semibold fs-8">
                      Подозрительные источники
                    </div>
                    <!--end::Label-->
                  </div>
                </div>
                <!--end::Label-->
              </div>
              <!--end::Labels-->
            </div>
            <div class="ps-1 w-70">
              <div class="text-gray-600 fw-bold fs-2">
                <span>
                  <span v-if="data[0].dirtType === 0">Низкий риск</span>
                  <span v-else-if="data[0].dirtType === 1">Средний риск</span>
                  <span v-else>Высокий риск</span>
                </span>
              </div>
              <div class="fw-bold text-gray-800 aml-score">
                {{ getPercent(data[0].riskscore) }}%
              </div>
              <div class="d-flex justify-content-between">
                <div class="fw-bold fs-6 text-gray-800 w-50">BTC Address:</div>
                <div class="fw-semibold fs-6 text-gray-800 w-50">
                  {{ data[0].address }}
                </div>
              </div>
              <div class="d-flex justify-content-between">
                <div class="fw-bold fs-6 text-gray-800 w-50">
                  Кол-во транзакций:
                </div>
                <div class="fw-semibold fs-6 text-gray-800 w-50">
                  {{ data[0].addressDetailsData.n_txs }}
                </div>
              </div>
              <div class="d-flex justify-content-between">
                <div class="fw-bold fs-6 text-gray-800 w-50">
                  Последняя транзакция:
                </div>
                <div class="fw-semibold fs-6 text-gray-800 w-50">
                  {{ data[0].addressDetailsData.last_tx }}
                </div>
              </div>
              <div
                class="d-flex justify-content-between pb-6 mb-3 text-gray-300 border-bottom"
              >
                <div class="fw-bold fs-6 text-gray-800 w-50">
                  Время проверки:
                </div>
                <div class="fw-semibold fs-6 text-gray-800 w-50">
                  {{ data[0].createTime }}
                </div>
              </div>
              <div class="fst-italic text-gray-600 fs-7">
                Обратите внимание, что, независимо от выбранной сети, мы
                проверяем все блокчейны, поддерживающие один и тот же адрес
              </div>
            </div>
          </div>
          <!--begin::Accordion-->
          <el-collapse class="accordion-aml">
            <el-collapse-item v-if="calcDanger" name="1">
              <template #title>
                <div class="d-flex justify-content-between w-100">
                  <div class="d-flex align-items-center">
                    <i
                      class="ki-duotone ki-shield-slash fs-1 p-3 text-danger bg-light-danger me-5 aml-icon"
                    >
                      <span class="path1"></span><span class="path2"></span
                      ><span class="path3"></span>
                    </i>
                    <div class="d-flex flex-column">
                      <span class="text-gray-800 fw-bold fs-6 mb-1 lh-1">
                        Опасные источники
                      </span>
                      <span class="text-gray-500 fw-semibold fs-7 aml-title">
                        В кошельке есть деньги с <br />
                        тёмного рынка
                      </span>
                    </div>
                  </div>
                  <div class="d-flex align-items-center">
                    <div class="text-gray-800 fw-bold fs-1 me-2">
                      {{ getPercent(calcDanger) }}%
                    </div>
                    <i
                      class="ki-duotone ki-down-square fs-1 text-hover-primary"
                    >
                      <span class="path1"></span><span class="path2"></span
                      ><span class="path3"></span>
                    </i>
                  </div>
                </div>
              </template>
              <div class="mt-6">
                <div v-for="item in dataSignals" :key="item[0]">
                  <div
                    class="d-flex align-items-center fw-bold bg-light-danger py-2 px-3 aml-item mb-2 position-relative"
                    v-if="
                      (item[0] === 'mixer' ||
                        item[0] === 'sanctions' ||
                        item[0] === 'ransom' ||
                        item[0] === 'gambling' ||
                        item[0] === 'scam' ||
                        item[0] === 'malware' ||
                        item[0] === 'dark_market' ||
                        item[0] === 'dark_service' ||
                        item[0] === 'stolen_coins' ||
                        item[0] === 'terrorism_financing' ||
                        item[0] === 'illicit_actor_org' ||
                        item[0] === 'exchange_fraudulent' ||
                        item[0] === 'illegal_service' ||
                        item[0] === 'child_exploitation' ||
                        item[0] === 'fraud_shop' ||
                        item[0] === 'enforcement_action' ||
                        item[0] === 'high_risk_jurisdiction' ||
                        item[0] === 'special_measures' ||
                        item[0] === 'online_pharmacy') &&
                      item[1] != 0 &&
                      item[1] != null
                    "
                  >
                    <div class="text-danger me-1 aml-text">
                      {{ getPercent(item[1]) }}%
                    </div>
                    <div class="text-gray-800 aml-text">
                      {{ getNameSignal(item[0]) }}
                    </div>
                    <div
                      class="position-absolute h-100 bg-danger bg-opacity-50 start-0 aml-progress"
                      :style="{ width: item[1] * 100 + '%' }"
                    ></div>
                  </div>
                </div>
              </div>
            </el-collapse-item>
            <el-collapse-item v-if="calcTrust" name="2">
              <template #title>
                <div class="d-flex justify-content-between w-100">
                  <div class="d-flex align-items-center">
                    <i
                      class="ki-duotone ki-shield-tick fs-1 p-3 text-success bg-light-success me-5 aml-icon"
                    >
                      <span class="path1"></span><span class="path2"></span
                      ><span class="path3"></span>
                    </i>
                    <div class="d-flex flex-column">
                      <span class="text-gray-800 fw-bold fs-6 mb-1 lh-1">
                        Надёжные источники
                      </span>
                      <span class="text-gray-500 fw-semibold fs-7 aml-title">
                        Перевод с кошелька должен быть<br />
                        безопасным
                      </span>
                    </div>
                  </div>
                  <div class="d-flex align-items-center">
                    <div class="text-gray-800 fw-bold fs-1 me-2">
                      {{ getPercent(calcTrust) }}%
                    </div>
                    <i
                      class="ki-duotone ki-down-square fs-1 text-hover-primary"
                    >
                      <span class="path1"></span><span class="path2"></span
                      ><span class="path3"></span>
                    </i>
                  </div>
                </div>
              </template>
              <div class="mt-6">
                <div v-for="item in dataSignals" :key="item[0]">
                  <div
                    class="d-flex align-items-center fw-bold bg-light-success py-2 px-3 aml-item mb-2 position-relative"
                    v-if="
                      (item[0] === 'miner' ||
                        item[0] === 'other' ||
                        item[0] === 'payment' ||
                        item[0] === 'wallet' ||
                        item[0] === 'ico' ||
                        item[0] === 'bridge' ||
                        item[0] === 'seized_assets' ||
                        item[0] === 'p2p_exchange' ||
                        item[0] === 'marketplace' ||
                        item[0] === 'exchange' ||
                        item[0] === 'merchant_services' ||
                        item[0] === 'trusted_exchange' ||
                        item[0] === 'nft_platform_collection') &&
                      item[1] != 0 &&
                      item[1] != null
                    "
                  >
                    <div class="text-success me-1 aml-text">
                      {{ getPercent(item[1]) }}%
                    </div>
                    <div class="text-gray-800 aml-text">
                      {{ getNameSignal(item[0]) }}
                    </div>
                    <div
                      class="position-absolute h-100 bg-success bg-opacity-50 start-0 aml-progress"
                      :style="{ width: item[1] * 100 + '%' }"
                    ></div>
                  </div>
                </div>
              </div>
            </el-collapse-item>
            <el-collapse-item v-if="calcWarning" name="3">
              <template #title>
                <div class="d-flex justify-content-between w-100">
                  <div class="d-flex align-items-center">
                    <i
                      class="ki-duotone ki-shield-cross fs-1 p-3 text-warning bg-light-warning me-5 aml-icon"
                    >
                      <span class="path1"></span><span class="path2"></span
                      ><span class="path3"></span>
                    </i>
                    <div class="d-flex flex-column">
                      <span class="text-gray-800 fw-bold fs-6 mb-1 lh-1">
                        Подозрительные источники
                      </span>
                      <span class="text-gray-500 fw-semibold fs-7 aml-title">
                        Вероятность того, что переводы с этого кошелька <br />
                        могут быть заблокированы биржами 50% и выше
                      </span>
                    </div>
                  </div>
                  <div class="d-flex align-items-center">
                    <div class="text-gray-800 fw-bold fs-1 me-2">
                      {{ getPercent(calcWarning) }}%
                    </div>
                    <i
                      class="ki-duotone ki-down-square fs-1 text-hover-primary"
                    >
                      <span class="path1"></span><span class="path2"></span
                      ><span class="path3"></span>
                    </i>
                  </div>
                </div>
              </template>
              <div class="mt-6">
                <div v-for="item in dataSignals" :key="item[0]">
                  <div
                    class="d-flex align-items-center fw-bold bg-light-warning py-2 px-3 aml-item mb-2 position-relative"
                    v-if="
                      (item[0] === 'atm' ||
                        item[0] === 'infrastructure_as_a_service' ||
                        item[0] === 'token_smart_contract' ||
                        item[0] === 'lending_contract' ||
                        item[0] === 'risky_exchange' ||
                        item[0] === 'decentralized_exchange_contract' ||
                        item[0] === 'protocol_privacy' ||
                        item[0] === 'unnamed_service' ||
                        item[0] === 'liquidity_pools' ||
                        item[0] === 'smart_contract') &&
                      item[1] != 0 &&
                      item[1] != null
                    "
                  >
                    <div class="text-warning me-1 aml-text">
                      {{ getPercent(item[1]) }}%
                    </div>
                    <div class="text-gray-800 aml-text">
                      {{ getNameSignal(item[0]) }}
                    </div>
                    <div
                      class="position-absolute h-100 bg-warning bg-opacity-50 start-0 aml-progress"
                      :style="{ width: item[1] * 100 + '%' }"
                    ></div>
                  </div>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
          <!--end::Accordion-->
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import VueApexCharts from "vue3-apexcharts";

export default defineComponent({
  name: "infoSellerModal",
  components: {
    apexchart: VueApexCharts,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { t, te } = useI18n();
    const dataSignals = computed(() => {
      if (props.data && props.data[0] && props.data[0].signals) {
        let res: { [key: string]: number } = props.data[0].signals;
        return Object.entries(res).sort((a, b) => b[1] - a[1]);
      }
    });

    const calcDanger = computed(() => {
      let sum = 0;
      if (props.data && props.data[0] && props.data[0].signals) {
        const signals = props.data[0].signals;
        for (const key in signals) {
          if (
            [
              "mixer",
              "sanctions",
              "ransom",
              "gambling",
              "scam",
              "malware",
              "dark_market",
              "dark_service",
              "stolen_coins",
              "terrorism_financing",
              "illicit_actor_org",
              "exchange_fraudulent",
              "illegal_service",
              "child_exploitation",
              "fraud_shop",
              "enforcement_action",
              "high_risk_jurisdiction",
              "special_measures",
              "online_pharmacy",
            ].includes(key)
          ) {
            sum += signals[key];
          }
        }
      }
      return sum;
    });

    const calcTrust = computed(() => {
      let sum = 0;
      if (props.data && props.data[0] && props.data[0].signals) {
        const signals = props.data[0].signals;
        for (const key in signals) {
          if (
            [
              "miner",
              "other",
              "payment",
              "wallet",
              "ico",
              "bridge",
              "seized_assets",
              "p2p_exchange",
              "marketplace",
              "exchange",
              "merchant_services",
              "trusted_exchange",
              "nft_platform_collection",
            ].includes(key)
          ) {
            sum += signals[key];
          }
        }
      }
      return sum;
    });

    const calcWarning = computed(() => {
      let sum = 0;
      if (props.data && props.data[0] && props.data[0].signals) {
        const signals = props.data[0].signals;
        for (const key in signals) {
          if (
            [
              "atm",
              "infrastructure_as_a_service",
              "token_smart_contract",
              "lending_contract",
              "risky_exchange",
              "decentralized_exchange_contract",
              "protocol_privacy",
              "unnamed_service",
              "liquidity_pools",
              "smart_contract",
            ].includes(key)
          ) {
            sum += signals[key];
          }
        }
      }
      return sum;
    });

    watch(calcWarning, () => {
      series.value = [];
      series.value.push(calcDanger.value, calcTrust.value, calcWarning.value);
      chartOptions.labels.push(
        "Опасные источники",
        "Надёжные источники",
        "Подозрительные источники"
      );
    });

    const translate = (text: string) => {
      if (te(text)) {
        return t(text);
      } else {
        return text;
      }
    };

    const numberFormatting = (number) => {
      return new Intl.NumberFormat("ru", {
        style: "decimal",
        maximumFractionDigits: 2,
      }).format(number);
    };

    const getPercent = (data) => {
      return numberFormatting(data * 100);
    };

    const getNameSignal = (name) => {
      return name === "mixer"
        ? "Mixer"
        : name === "miner"
        ? "Miner"
        : name === "other"
        ? "Other"
        : name === "payment"
        ? "Payment"
        : name === "wallet"
        ? "Wallet"
        : name === "sanctions"
        ? "Sanctions"
        : name === "ransom"
        ? "Ransom"
        : name === "gambling"
        ? "Gambling"
        : name === "scam"
        ? "Scam"
        : name === "ico"
        ? "Ico"
        : name === "atm"
        ? "Atm"
        : name === "malware"
        ? "Malware"
        : name === "bridge"
        ? "Bridge"
        : name === "dark_market"
        ? "Dark Market"
        : name === "dark_service"
        ? "Dark Service"
        : name === "stolen_coins"
        ? "Stolen Coins"
        : name === "terrorism_financing"
        ? "Terrorism Financing"
        : name === "seized_assets"
        ? "Seized Assets"
        : name === "infrastructure_as_a_service"
        ? "Infrastructure as a service"
        : name === "token_smart_contract"
        ? "Token smart contract"
        : name === "illicit_actor_org"
        ? "Illicit actor org"
        : name === "exchange_fraudulent"
        ? "Exchange fraudulent"
        : name === "p2p_exchange"
        ? "P2p exchange"
        : name === "illegal_service"
        ? "Illegal service"
        : name === "lending_contract"
        ? "Lending contract"
        : name === "risky_exchange"
        ? "Risky exchange"
        : name === "child_exploitation"
        ? "Child exploitation"
        : name === "marketplace"
        ? "Marketplace"
        : name === "decentralized_exchange_contract"
        ? "Decentralized exchange contract"
        : name === "fraud_shop"
        ? "Fraud shop"
        : name === "enforcement_action"
        ? "Enforcement action"
        : name === "protocol_privacy"
        ? "Protocol privacy"
        : name === "unnamed_service"
        ? "Unnamed service"
        : name === "liquidity_pools"
        ? "Liquidity pools"
        : name === "exchange"
        ? "Exchange"
        : name === "smart_contract"
        ? "Smart contract"
        : name === "high_risk_jurisdiction"
        ? "High risk jurisdiction"
        : name === "merchant_services"
        ? "Merchant services"
        : name === "trusted_exchange"
        ? "Trusted exchange"
        : name === "nft_platform_collection"
        ? "Nft platform collection"
        : name === "special_measures"
        ? "Special measures"
        : name === "online_pharmacy"
        ? "Online pharmacy"
        : name;
    };

    const series = ref([]);
    const chartOptions = {
      opts: {
        colors: "#3F4254",
      },
      colors: ["#F1416C", "#50CD89", "#F6C000"],
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
        type: "donut",
      },
      dataLabels: {
        enabled: false,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 250,
            },
            legend: {
              show: false,
            },
          },
        },
      ],
      legend: {
        formatter: function () {
          return "";
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
            return getPercent(value) + "%";
          },
        },
      },
    };

    return {
      translate,
      calcDanger,
      calcTrust,
      calcWarning,
      getPercent,
      getNameSignal,
      dataSignals,
      chartOptions,
      series,
    };
  },
});
</script>

<style scoped>
.modal-dialog {
  width: 610px;
  max-width: 610px;
}
.aml-icon {
  border-radius: 6px;
}
.aml-title {
  line-height: 16px;
}
.aml-item,
.aml-progress {
  border-radius: 5px;
}

.aml-progress {
  z-index: 1;
}

.aml-text {
  z-index: 10;
}

.aml-score {
  font-size: 34px;
}
</style>
