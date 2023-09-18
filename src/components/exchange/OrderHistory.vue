<template>
  <!--begin::Card-->
  <div class="card pt-2 h-100">
    <!--begin::Card header-->
    <div class="border-0 flex-column px-4">
      <div class="d-flex justify-content-between align-items-center w-100">
      </div>
    </div>
    <!--end::Card header-->

    <!--begin::Card body-->
    <div class="px-4">
      <!--begin::Tab Content-->
      <div class="tab-content">
        <div class="table-responsive table-orders">
          <table class="table table-row-dashed gy-1 gs-1">
            <thead>
            <tr
                class="fw-bold fs-7 text-gray-800 text-nowrap border-0"
            >
              <th>{{ $t('exchange.price') }}</th>
              <th class="text-end">{{ $t('exchange.volume') }}</th>
              <th class="text-end">{{ $t('exchange.time') }}</th>
            </tr>
            </thead>
            <tbody>
            <tr class="table-orders-row border-0 fs-7 lh-1" v-for="(order, index) in orderItems" :key="index">
              <td
                :class="[order.direction === 'BUY' ? 'text-danger' : 'text-success']"
                class="border-0"
              >
                {{ order.price }}
              </td>
              <td class="text-end border-0">{{ formatNumbers(order.amount, ' ', '.', false, 2) }}</td>
              <td class="text-end border-0">
                {{ formatDate(order.time) }}
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!--end::Tab Content-->
    </div>
    <!--end::Card body-->
  </div>
  <!--end::Card-->
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, ref, watch} from "vue";
import ApiService from "@/core/services/ApiService";
import Api from "@/config/api";
import {ElMessage} from "element-plus";
import socket from "@/core/services/SocketService";
import { useExchangeStore } from "@/stores/exchange";
import {useI18n} from "vue-i18n";
import { formatNumbers } from "@/core/helpers/helpers.js";

export default defineComponent({
  name: "order-history",
  setup() {
    const { t } = useI18n();
    const exchangeStore = useExchangeStore();
    const tableHeader = ref([
      {
        columnName: t('exchange.price'),
        columnLabel: "price",
        sortEnabled: false,
      },
      {
        columnName: t('exchange.count'),
        columnLabel: "count",
        sortEnabled: false,
      },
      {
        columnName: t('exchange.total'),
        columnLabel: "total",
        sortEnabled: false,
      },
    ]);
    const orderItems = ref([]);
    const symbolName = computed(() => exchangeStore.symbolName);
    const orderHistorySize = 28;

    watch(symbolName, () => {
      getOrderHistory();
    });

    const getOrderHistory = async () => {
      let formData = new FormData();
      formData.append('size', orderHistorySize.toString());
      symbolName.value ? formData.append('symbol', symbolName.value): "";
      ApiService.post(Api.market.latestTrade, formData).then(response => {
        orderItems.value = response.data.data;
      }).catch(response => {
        ElMessage.error(response.data.message)
      });
    };

    const getOrderItems= async (data) => {
      orderItems.value.unshift(data);
      orderItems.value.splice(-1, 1)
    };

    onMounted(() => {
      getOrderHistory();
    });

    return {
      tableHeader,
      orderItems,
      symbolName,
      formatNumbers,
    };
  },

  created() {
    socket.on("deals", data => {
      if (data) {
        for (const orderItem of data) {
          this.getOrderItems(orderItem);
        }
      }
    });

    this.init();
  },

  methods: {
    getOrderItems(data) {
      this.orderItems.unshift(data);
      this.orderItems.splice(-1, 1)
    },

    formatDate(date) {
      return new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Europe/Moscow',
      }).format(new Date(date));
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
</style>
