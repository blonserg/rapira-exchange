<template>
  <div class="card h-100">
    <div class="card-header border-0 d-flex flex-nowrap justify-space-between align-items-center align-items-md-start px-0">
      <!--begin::Toolbar-->
      <div class="card-toolbar d-flex justify-content-between align-items-center m-0 w-100">
        <!--begin::Tab nav-->
        <ul
            class="nav nav-stretch fs-6 text-black fw-semobold nav-line-tabs nav-line-tabs border-transparent flex-lg-nowrap"
            role="tablist"
        >
          <li class="nav-item" role="presentation">
            <a
                id="activeOrders"
                class="nav-link text-active-primary text-dark active lh-1 px-6 py-2 fw-bold m-0"
                data-bs-toggle="tab"
                role="tab"
                href="#active-orders"
                v-on:click="changeTab('activeOrders')"
            >
              <span class="me-2 text">{{ $t('exchange.activeOrders') }}</span>
              <span v-if="filteredData.length !=0" class="badge badge-square badge-primary fs-7">{{ filteredData.length }}</span>
            </a>
          </li>
          <li class="nav-item" role="presentation">
            <a
                id="historyOrders"
                class="nav-link text-active-primary text-dark lh-1 px-6 py-2 fw-bold m-0"
                data-bs-toggle="tab"
                role="tab"
                href="#history-orders"
                v-on:click="changeTab('historyOrders')"
            >
              <span class="text">{{ $t('exchange.historyTransactions') }}</span>
            </a>
          </li>
        </ul>
        <!--end::Tab nav-->
        <div class="form-check me-4 d-flex align-items-center">
          <input class="form-check-input" type="checkbox" value="" v-model="checkPairs" id="checkPairs" />
          <label class="form-check-label fw-semibold fs-7 ms-2" for="checkPairs">
            Скрыть другие пары
          </label>
        </div>
      </div>
      <!--end::Toolbar-->
    </div>
    <div class="card-body py-0 px-6">
      <div class="tab-content h-100">
        <div
            id="active-orders"
            class="py-0 tab-pane fade active show h-100"
            role="tabpanel"
        >
          <Datatable
            :data="filteredData"
            :header="tableHeader"
            :itemsPerPageDropdownEnabled="false"
            :checkbox-enabled="false"
            :itemsPerPage=7
            class="table-exchange-orders"
            :show-total-count="true"
          >
            <template v-slot:time="{ row: exchanges }">
              <div class="d-flex text-black flex-column justify-content-center">
                {{ formatDate(exchanges.time) }}
              </div>
            </template>
            <template v-slot:symbol="{ row: exchanges }">
              <div class="d-flex text-dark">
                <span>{{ formatPairs(exchanges.symbol, true) }}</span>
                <span class="text-gray-500">/{{ formatPairs(exchanges.symbol, false) }}</span>
              </div>
            </template>
            <template v-slot:type="{ row: exchanges }">
              <div class="d-flex text-black flex-column justify-content-center">
                <span v-if="exchanges.type === 'LIMIT_PRICE'">{{ $t('exchange.limitOrder') }}</span>
                <span v-else>{{ $t('exchange.marketOrder') }}</span>
              </div>
            </template>
            <template v-slot:direction="{ row: exchanges }">
              <div class="d-flex text-black flex-column justify-content-center">
                <div v-if="exchanges.direction === 'SELL'">
                  <span class="text-danger">{{ $t('exchange.sale') }}</span>
                </div>
                <div v-else>
                  <span class="text-success">{{ $t('exchange.purchase') }}</span>
                </div>
              </div>
            </template>
            <template v-slot:price="{ row: exchanges }">
              <div v-if="exchanges.turnover && exchanges.tradedAmount" class="d-flex text-black flex-column justify-content-center">
                {{ exchanges.turnover / exchanges.tradedAmount }}
              </div>
              <div v-else class="d-flex text-dark flex-column justify-content-center">
                {{ exchanges.price }}
              </div>
            </template>
            <template v-slot:give="{ row: exchanges }">
              <div v-if="exchanges.direction === 'SELL'" class="d-flex text-dark flex-column justify-content-center">
                {{ exchanges.amount }} {{ formatPairs(exchanges.symbol, true) }}
              </div>
              <div v-else class="d-flex text-dark flex-column justify-content-center">
                {{ exchanges.amount * exchanges.price }} {{ formatPairs(exchanges.symbol, false) }}
              </div>
            </template>
            <template v-slot:commission="{ row: exchanges }">
              <div class="d-flex text-dark flex-column justify-content-center">
                {{ exchanges.percentFee * 100 }}%
              </div>
            </template>
            <template v-slot:exchanged="{ row: exchanges }">
              <div v-if="exchanges.direction === 'SELL'" class="d-flex text-gray-600 flex-column justify-content-center lh-1">
                <div class="text-dark">
                  {{ exchanges.tradedAmount }} {{ formatPairs(exchanges.symbol, false) }}
                </div>
                <div class="text-gray-600 mt-1">
                  {{ exchanges.turnover }} {{ formatPairs(exchanges.symbol, true) }}
                </div>
              </div>
              <div v-else class="d-flex text-gray-600 flex-column justify-content-center lh-1">
                <div class="text-dark">
                  {{ exchanges.turnover }} {{ formatPairs(exchanges.symbol, true) }}
                </div>
                <div class="text-gray-600 mt-1">
                  {{ exchanges.tradedAmount }} {{ formatPairs(exchanges.symbol, false) }}
                </div>
              </div>
            </template>
            <template v-slot:get="{ row: exchanges }">
              <div v-if="exchanges.type === 'LIMIT_PRICE'" class="d-flex text-dark flex-column justify-content-center">
                <span v-if="exchanges.direction === 'SELL'">
                  {{ formatNumbers((exchanges.amount * exchanges.price * (1 - exchanges.percentFee)), ' ', '.', false, 2)}} {{ formatPairs(exchanges.symbol, false) }}
                </span>
                <span v-else>
                  {{ formatNumbers((exchanges.amount * (1 - exchanges.percentFee)), ' ', '.', false, 2) }} {{ formatPairs(exchanges.symbol, true) }}
                </span>
              </div>
              <div v-else class="d-flex text-dark flex-column justify-content-center">
                <span v-if="exchanges.direction === 'SELL'">
                  {{ formatNumbers((exchanges.amount * exchanges.price), ' ', '.', false, 2)}} {{ formatPairs(exchanges.symbol, false) }}
                </span>
                <span v-else>
                  {{ formatNumbers((exchanges.amount), ' ', '.', false, 2) }} {{ formatPairs(exchanges.symbol, true) }}
                </span>
              </div>
            </template>
            <template v-slot:action="{ row: exchanges}">
              <button style="padding: calc(0.25rem + 1px) calc(1rem + 1px)"
                      type="button" class="btn btn-sm btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#kt_modal_cancelModal"
                      @click.prevent="clickCancel(exchanges.orderId)">{{ $t('button.cancel') }}
              </button>
            </template>
          </Datatable>
        </div>
        <div
            id="history-orders"
            class="py-0 tab-pane fade h-100"
            role="tabpanel"
        >
          <Datatable
              :data="filteredDataHistory"
              :header="tableHeaderHistory"
              :itemsPerPageDropdownEnabled="false"
              :checkbox-enabled="false"
              :itemsPerPage=7
              class="table-exchange-orders"
              :show-total-count="true"
          >
            <template v-slot:time="{ row: exchanges }">
              <div
                  class="d-flex text-black flex-column justify-content-center"
                  :class="{'opacity-50': exchanges.status === 'CANCELED' && exchanges.tradedAmount === 0}"
              >
                {{ formatDate(exchanges.time) }}
              </div>
            </template>
            <template v-slot:symbol="{ row: exchanges }">
              <div
                  class="d-flex text-dark"
                  :class="{'opacity-50': exchanges.status === 'CANCELED' && exchanges.tradedAmount === 0}"
              >
                <span>{{ formatPairs(exchanges.symbol, true) }}</span>
                <span class="text-gray-500">/{{ formatPairs(exchanges.symbol, false) }}</span>
              </div>
            </template>
            <template v-slot:type="{ row: exchanges }">
              <div
                  class="d-flex text-black flex-column justify-content-center"
                  :class="{'opacity-50': exchanges.status === 'CANCELED' && exchanges.tradedAmount === 0}"
              >
                <span v-if="exchanges.type === 'LIMIT_PRICE'">{{ $t('exchange.limitOrder') }}</span>
                <span v-else>{{ $t('exchange.marketOrder') }}</span>
              </div>
            </template>
            <template v-slot:direction="{ row: exchanges }">
              <div
                  class="d-flex text-black flex-column justify-content-center"
                  :class="{'opacity-50': exchanges.status === 'CANCELED' && exchanges.tradedAmount === 0}"
              >
                <div v-if="exchanges.direction === 'SELL'">
                  <span class="text-danger">{{ $t('exchange.sale') }}</span>
                </div>
                <div v-else>
                  <span class="text-success">{{ $t('exchange.purchase') }}</span>
                </div>
              </div>
            </template>
            <template v-slot:price="{ row: exchanges }">
              <div v-if="exchanges.turnover && exchanges.tradedAmount"
                   class="d-flex text-black flex-column justify-content-center"
                   :class="{'opacity-50': exchanges.status === 'CANCELED' && exchanges.tradedAmount === 0}"
              >
                {{ formatNumbers((exchanges.turnover / exchanges.tradedAmount), ' ', '.', false, 2) }}
              </div>
              <div v-else
                   class="d-flex text-dark flex-column justify-content-center"
                   :class="{'opacity-50': exchanges.status === 'CANCELED' && exchanges.tradedAmount === 0}"
              >
                {{ formatNumbers(exchanges.price, ' ', '.', false, 2) }}
              </div>
            </template>
            <template v-slot:give="{ row: exchanges }">
              <div v-if="exchanges.direction === 'BUY' && exchanges.type === 'LIMIT_PRICE'"
                   class="d-flex text-dark flex-column justify-content-center"
                   :class="{'opacity-50': exchanges.status === 'CANCELED' && exchanges.tradedAmount === 0}"
              >
                {{ exchanges.amount * exchanges.price }} {{ formatPairs(exchanges.symbol, false) }}
              </div>
              <div v-else-if="exchanges.direction === 'SELL'"
                   class="d-flex text-dark flex-column justify-content-center"
                   :class="{'opacity-50': exchanges.status === 'CANCELED' && exchanges.tradedAmount === 0}"
              >
                {{ exchanges.amount }} {{ formatPairs(exchanges.symbol, true) }}
              </div>
              <div v-else
                   class="d-flex text-dark flex-column justify-content-center"
                   :class="{'opacity-50': exchanges.status === 'CANCELED'}"
              >
                {{ exchanges.amount }} {{ formatPairs(exchanges.symbol, false) }}
              </div>
            </template>
            <template v-slot:commission="{ row: exchanges }">
              <div
                  class="d-flex text-dark flex-column justify-content-center"
                  :class="{'opacity-50': exchanges.status === 'CANCELED' && exchanges.tradedAmount === 0}"
              >
                {{ exchanges.percentFee * 100 }}%
              </div>
            </template>
            <template v-slot:exchanged="{ row: exchanges }">
              <div v-if="exchanges.direction === 'SELL'"
                   class="d-flex text-gray-600 flex-column justify-content-center lh-1"
                   :class="{'opacity-50': exchanges.status === 'CANCELED' && exchanges.tradedAmount === 0}"
              >
                <div class="text-dark">
                  {{ exchanges.tradedAmount }} {{ formatPairs(exchanges.symbol, true) }}
                </div>
                <div class="text-gray-600 mt-1">
                  {{ exchanges.turnover }} {{ formatPairs(exchanges.symbol, false) }}
                </div>
              </div>
              <div v-else
                   class="d-flex text-gray-600 flex-column justify-content-center lh-1"
                   :class="{'opacity-50': exchanges.status === 'CANCELED' && exchanges.tradedAmount === 0}"
              >
                <div class="text-dark">
                  {{ exchanges.turnover }} {{ formatPairs(exchanges.symbol, false) }}
                </div>
                <div class="text-gray-600 mt-1">
                  {{ exchanges.tradedAmount }} {{ formatPairs(exchanges.symbol, true) }}
                </div>
              </div>
            </template>
            <template v-slot:get="{ row: exchanges }">
              <div v-if="exchanges.type === 'LIMIT_PRICE'"
                   class="d-flex text-dark flex-column justify-content-center"
                   :class="{'opacity-50': exchanges.status === 'CANCELED' && exchanges.tradedAmount === 0}"
              >
                <span v-if="exchanges.direction === 'SELL'">
                  {{ formatNumbers((exchanges.amount * exchanges.price * (1 - exchanges.percentFee)), ' ', '.', false, 2)}}
                  {{ formatPairs(exchanges.symbol, false) }}
                </span>
                <span v-else>
                  {{ formatNumbers((exchanges.amount * (1 - exchanges.percentFee)), ' ', '.', false, 2) }}
                  {{ formatPairs(exchanges.symbol, true) }}
                </span>
              </div>
              <div v-else
                   class="d-flex text-dark flex-column justify-content-center"
                   :class="{'opacity-50': exchanges.status === 'CANCELED' && exchanges.tradedAmount === 0}"
              >
                <span v-if="exchanges.direction != 'SELL'">
                  {{ exchanges.tradedAmount }}
                  {{ formatPairs(exchanges.symbol, true) }}
                </span>
                <span v-else>
                  {{ exchanges.turnover }}
                  {{ formatPairs(exchanges.symbol, false) }}
                </span>
              </div>
            </template>
            <template v-slot:status="{ row: exchanges}">
              <div class="d-flex align-items-center justify-content-end"
                   :class="{'opacity-50': exchanges.status === 'CANCELED' && exchanges.tradedAmount === 0}"
                   v-if="exchanges.status === 'COMPLETED'"
              >
                <div
                    v-if="exchanges.direction === 'BUY' &&  exchanges.type === 'MARKET_PRICE' && exchanges.amount != exchanges.turnover"
                    data-bs-toggle="modal" data-bs-target="#kt_modal_detailModal"
                    @click="clickStatus = exchanges.orderId"
                    class="d-flex align-items-center cursor-pointer"
                >
                  <i class="ki-duotone ki-plus-square text-primary fs-6 me-1">
                    <span class="path1"></span><span class="path2"></span><span class="path3"></span>
                  </i>
                  <span class="text-primary fs-7">Частично</span>
                </div>
                <div
                    v-else-if="exchanges.type != 'MARKET_PRICE' && exchanges.amount != exchanges.tradedAmount"
                    data-bs-toggle="modal" data-bs-target="#kt_modal_detailModal"
                    @click="clickStatus = exchanges.orderId"
                    class="d-flex align-items-center cursor-pointer"
                >
                  <i class="ki-duotone ki-plus-square text-primary fs-6 me-1">
                    <span class="path1"></span><span class="path2"></span><span class="path3"></span>
                  </i>
                  <span class="text-primary fs-7">Частично</span>
                </div>
                <div
                    v-else data-bs-toggle="modal"
                    data-bs-target="#kt_modal_detailModal"
                    @click="clickStatus = exchanges.orderId"
                    class="d-flex align-items-center cursor-pointer"
                >
                  <i class="ki-duotone ki-plus-square text-primary fs-6 me-1">
                    <span class="path1"></span><span class="path2"></span><span class="path3"></span>
                  </i>
                  <span class="text-primary fs-7">Исполнена</span>
                </div>
              </div>
              <div class="d-flex align-items-center justify-content-end cursor-pointer"
                   :class="{'opacity-50': exchanges.status === 'CANCELED' && exchanges.tradedAmount === 0}"
                   v-else-if="exchanges.status === 'CANCELED' && exchanges.tradedAmount > 0"
                   data-bs-toggle="modal" data-bs-target="#kt_modal_detailModal"
                   @click="clickStatus = exchanges.orderId"
              >
                <i class="ki-duotone ki-plus-square text-primary fs-6 me-1">
                <span class="path1"></span><span class="path2"></span><span class="path3"></span>
                </i>
                <span class="text-primary fs-7">Частично</span>
              </div>
              <div class="d-flex align-items-center justify-content-end cursor-pointer"
                   :class="{'opacity-50': exchanges.status === 'CANCELED' && exchanges.tradedAmount === 0}"
                   v-else
              >
                <i class="ki-duotone ki-cross-square text-gray-700 fs-6 me-1">
                  <span class="path1"></span><span class="path2"></span><span class="path3"></span>
                </i>
                <span class="text-gray-700 fs-7">Отменена</span>
              </div>
            </template>
          </Datatable>
        </div>
      </div>
    </div>
    <DetailsModal :data="selectedDetails" :direction="directionItem" :symbol="symbolItem" />
    <CancelModal :data="selectedOrder" @cancel-event="canceledOrder" />
  </div>

</template>

<script lang="ts">
import {getAssetPath} from "@/core/helpers/assets";
import {computed, defineComponent, onMounted, ref, watch, type Ref} from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import ApiService from "@/core/services/ApiService";
import Api from "@/config/api";
import {ElMessage} from "element-plus";
import { useExchangeStore } from "@/stores/exchange";
import type {IOrders} from "@/core/data/orders";
import {useI18n} from "vue-i18n";
import {useAuthStore} from "@/stores/auth";
import {parseFullSymbol, formatNumbers} from "@/core/helpers/helpers";
import DetailsModal from "@/components/modals/exchange/DetailModal.vue";
import CancelModal from "@/components/modals/exchange/CancelModal.vue";
import socket from "@/core/services/SocketService";

export default defineComponent({
  name: "active-orders",
  components: {
    Datatable,
    DetailsModal,
    CancelModal,
  },
  data() {
    return {
      entrustCurrent: {
        pageNo: 1,
        pageSize: 500,
        symbol: "",
      },
      entrustHistory: {
        pageNo: 1,
        pageSize: 500,
        symbol: "",
      },
    }
  },
  setup: function () {
    const {t} = useI18n();
    const tableHeader = computed(() => ([
      {
        columnName: t('exchange.time'),
        columnLabel: "time",
        sortEnabled: false,
      },
      {
        columnName: t('exchange.pair'),
        columnLabel: "symbol",
        sortEnabled: false,
      },
      {
        columnName: t('exchange.typeOrder'),
        columnLabel: "type",
        sortEnabled: false,
      },
      {
        columnName: t('exchange.direction'),
        columnLabel: "direction",
        sortEnabled: false,
      },
      {
        columnName: t('exchange.price'),
        columnLabel: "price",
        sortEnabled: false,
      },
      {
        columnName: t('exchange.give'),
        columnLabel: "give",
        sortEnabled: false,
      },
      {
        columnName: t('exchange.commission'),
        columnLabel: "commission",
        sortEnabled: false,
      },
      {
        columnName: t('exchange.exchanged'),
        columnLabel: "exchanged",
        sortEnabled: false,
      },
      {
        columnName: t('exchange.get'),
        columnLabel: "get",
        sortEnabled: false,
      },
      {
        columnName: t('exchange.action'),
        columnLabel: "action",
        sortEnabled: false,
      },
    ]));
    const tableHeaderHistory = computed(() => ([
      {
        columnName: t('exchange.time'),
        columnLabel: "time",
        sortEnabled: false,
      },
      {
        columnName: t('exchange.pair'),
        columnLabel: "symbol",
        sortEnabled: false,
      },
      {
        columnName: t('exchange.typeOrder'),
        columnLabel: "type",
        sortEnabled: false,
      },
      {
        columnName: t('exchange.direction'),
        columnLabel: "direction",
        sortEnabled: false,
      },
      {
        columnName: t('exchange.price'),
        columnLabel: "price",
        sortEnabled: false,
      },
      {
        columnName: t('exchange.give'),
        columnLabel: "give",
        sortEnabled: false,
      },
      {
        columnName: t('exchange.commission'),
        columnLabel: "commission",
        sortEnabled: false,
      },
      {
        columnName: t('exchange.exchanged'),
        columnLabel: "exchanged",
        sortEnabled: false,
      },
      {
        columnName: t('exchange.geted'),
        columnLabel: "get",
        sortEnabled: false,
      },
      {
        columnName: t('exchange.status'),
        columnLabel: "status",
        sortEnabled: false,
      },
    ]));

    const tableDataCurrent = ref<IOrders[]>([]);
    const tableDataHistory = ref<IOrders[]>([]);
    const exchangeStore = useExchangeStore();
    const isDeal = computed(() => exchangeStore.isDeal);
    const drawer = ref(false);
    const isMobile = ref(false);
    const isAuthenticated = useAuthStore().isAuthenticated;

    const nameList = ['USDT/RUB', 'USDC/RUB', 'BUSD/RUB'];
    const orderList = [
      {
        name: 'Лимитный',
        value: 'LIMIT_PRICE'
      },
      {
        name: 'Рыночный',
        value: 'MARKET_PRICE'
      },
    ];
    const directionList = [
      {
        name: 'Продать',
        value: 'SELL'
      },
      {
        name: 'Купить',
        value: 'BUY'
      },
    ];
    const selectedTab = ref('activeOrders');
    const symbolName = computed(() => exchangeStore.symbolName);
    const checkPairs = ref(false);
    const selectedDetails = ref([
      {
        direction: '',
        symbol: '',
        details: []
      }
    ]);
    const clickStatus = ref('');
    const directionItem = ref('');
    const symbolItem = ref('');
    const selectedOrder = ref();

    const getEntrustHistory = async () => {
      let formData = new FormData();
      formData.append('pageNo', '1');
      formData.append('pageSize', '500');
      formData.append('symbol', '');
      ApiService.post(Api.exchange.entrustHistory, formData).then(response => {
        tableDataHistory.value = response.data.data.content;
      }).catch(response => {
        ElMessage.error(response.data.message)
      });
    };

    const getEntrustCurrent = async () => {
      let formData = new FormData();
      formData.append('pageNo', '1');
      formData.append('pageSize', '500');
      formData.append('symbol', '');
      ApiService.post(Api.exchange.entrustCurrent, formData).then(response => {
        tableDataCurrent.value = response.data.data.content;
      }).catch(response => {
        ElMessage.error(response.message)
      });
    };

    const filteredDataHistory = computed(() => {
      let filtered = tableDataHistory.value;
      checkPairs.value ? filtered = filtered.filter(item => item.symbol === symbolName.value) : filtered
      return filtered;
    });

    const filteredData = computed(() => {
      let filtered = tableDataCurrent.value;
      checkPairs.value ? filtered = filtered.filter(item => item.symbol === symbolName.value) : filtered
      return filtered;
    });

    const updateIsMobile = () => {
      isMobile.value = window.matchMedia('(max-width: 768px)').matches;
    };

    const formatPairs = (pair: string, base: boolean) => {
      let formatedData = parseFullSymbol(pair);
      if (formatedData) {
        return base ? formatedData.fromSymbol : formatedData.toSymbol;
      }
    };

    const clickCancel = (id) => {
      // @ts-ignore
      selectedOrder.value = filteredData.value.filter((obj) => obj.orderId === id);
    };

    const canceledOrder = () => {
      setTimeout(() => {
        getEntrustCurrent();
      }, 500);
    };

    watch(isDeal, () => {
      setTimeout(() => {
        getEntrustHistory();
        getEntrustCurrent();
      }, 500);
    });

    watch(clickStatus, () => {
      // @ts-ignore
      selectedDetails.value = filteredDataHistory.value.filter((obj) => obj.orderId === clickStatus.value);
      directionItem.value = selectedDetails.value[0].direction;
      symbolItem.value = selectedDetails.value[0].symbol;
      selectedDetails.value = selectedDetails.value[0].details;
    });

    onMounted(() => {
      if (isAuthenticated) {
        getEntrustHistory();
        getEntrustCurrent();
      }
      ;
      updateIsMobile();
      window.addEventListener('resize', updateIsMobile);
      socket.emit('x-auth-token', '5144905e-aa05-4b94-bf42-4554f7973396');
      socket.on('connect', () => {
        socket.emit('x-auth-token', '5144905e-aa05-4b94-bf42-4554f7973396');
      });
      socket.emit('SUBSCRIBE',  ["spot@private.order.trade", "spot@private.order.completed", "spot@private.order.canceled"])
      socket.on('error', (error) => {
        console.log('[socket] Error:', error);
      });
    });

    return {
      tableHeader,
      getAssetPath,
      nameList,
      orderList,
      directionList,
      tableDataCurrent,
      tableDataHistory,
      tableHeaderHistory,
      selectedTab,
      isDeal,
      filteredDataHistory,
      filteredData,
      drawer,
      isMobile,
      formatPairs,
      formatNumbers,
      checkPairs,
      selectedDetails,
      clickStatus,
      directionItem,
      symbolItem,
      selectedOrder,
      clickCancel,
      canceledOrder,
    };
  },

  methods: {
    changeTab(tabName) {
      this.selectedTab = tabName;
    },
    formatDate(date) {
      return new Intl.DateTimeFormat('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Europe/Moscow',
      }).format(date);
    },
    getStatus(status) {
      return status === "COMPLETED" ? "Завершен" : status === "CANCELED" ? "Отменен" : status === "OVERTIMED" ? "Истек" : "В процессе";
    },
    init() {
      ApiService.setHeader();
    },
  },
  created() {
    this.init();
  },
});
</script>

<style scoped>
.card {
  border-radius: 0;
}
.nav-line-tabs .nav-item .nav-link,
.nav-line-tabs .nav-item .nav-link:hover:not(.disabled){
  border-top: 3px solid transparent;
}

.nav-line-tabs .nav-item .nav-link.active,
.nav-line-tabs .nav-item .nav-link.active:hover:not(.disabled)
{
  border-top: 3px solid var(--bs-primary);
}

.nav-line-tabs .nav-item .nav-link.active, .nav-line-tabs .nav-item.show .nav-link {
  border-bottom: 1px solid transparent;
}

.nav-line-tabs .nav-item .nav-link:hover:not(.disabled) {
  border-bottom: 1px solid #fff;
  background-color: #fff;
}

.nav-line-tabs .nav-item {
  margin-bottom: 0;
}
.card-header {
  min-height: auto;
}
.badge.badge-square {
  width: 16px;
  height: 16px;
  min-width: 16px;
  padding: 0;
}
.nav-item .nav-link.active {
  position: relative;
  z-index: 15;
  background-color: #fff;
}
.nav-item .nav-link {
  border-bottom: 1px solid transparent;
}
.card-toolbar {
  position: relative;
  border-bottom: 0;
}
.card-toolbar::after {
  content:'';
  position: absolute;
  bottom: 0.1vw;
  left: 0;
  width: 100%;
  height: 0.8px;
  background-color: #DDE0E2;
}
.form-check-input {
  width: 14px;
  height: 14px;
  margin-top: 0;
  border-radius: 2px;
  border-color: #73797F;
}
.form-check-label {
  color: #73797F;
}
</style>
