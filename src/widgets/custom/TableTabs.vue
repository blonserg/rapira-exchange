<template>
  <!--begin::Card-->
  <div class="card pt-2 h-100">
    <!--begin::Card header-->
    <div class="card-header border-0 align-items-center">
      <!--begin::Card title-->
      <div class="card-title">
        <h2 class="fs-3 align-items-center">{{ $t('widgetexchange.title') }}</h2>
      </div>
      <!--end::Card title-->

      <div v-show="isCurrent">
         <span class="fw-semibold text-gray-400 fs-6 align-items-center">
          {{ $t('widgetexchange.currency') }}
        </span>
        <a
            href="#menuCurrent"
            class="btn btn-sm btn-bg-body btn-active-light-primary me-12"
            data-kt-menu-trigger="click"
            data-kt-menu-placement="bottom-end"
            data-kt-menu-flip="top-end"
        >{{ selectedOptionCurrent }}
          <KTIcon icon-name="down" icon-class="fs-5 m-0"/>
        </a>
        <!--begin::Menu-->
        <div
            id="menuCurrent"
            class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semobold fs-7 w-125px py-4"
            data-kt-menu="true"
        >
          <!--begin::Menu item-->
          <div class="menu-item px-3" @click="chooseMainCur($t('widgetexchange.all'), 'selectedOptionCurrent')">
            <a :class="{ 'menu-link': true, 'active': selectedOptionCurrent === $t('widgetexchange.all') }" class="menu-link px-3"
            >{{ $t('widgetexchange.all') }}</a
            >
          </div>
          <!--end::Menu item-->
          <!--begin::Menu item-->
          <div v-for="symbol in symbolThumb" class="menu-item px-3"
               @click="chooseMainCur(symbol.symbol, 'selectedOptionCurrent')">
            <a :class="{ 'menu-link': true, 'active': selectedOptionCurrent === symbol.symbol }" class="menu-link px-3"
            >{{ symbol.symbol }}</a
            >
          </div>
          <!--end::Menu item-->
        </div>
      </div>
      <div v-show="!isCurrent">
         <span class="fw-semibold text-gray-400 fs-6 align-items-center">
          {{ $t('widgetexchange.currency') }}
        </span>
        <a
            href="#menuHistory"
            class="btn btn-sm btn-bg-body btn-active-light-primary me-12"
            data-kt-menu-trigger="click"
            data-kt-menu-placement="bottom-end"
            data-kt-menu-flip="top-end"
        >{{ selectedOptionHistory }}
          <KTIcon icon-name="down" icon-class="fs-5 m-0"/>
        </a>
        <!--begin::Menu-->
        <div
            id="menuHistory"
            class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semobold fs-7 w-125px py-4"
            data-kt-menu="true"
        >
          <!--begin::Menu item-->
          <div class="menu-item px-3" @click="chooseMainCur($t('widgetexchange.all'), 'selectedOptionHistory')">
            <a :class="{ 'menu-link': true, 'active': selectedOptionHistory === $t('widgetexchange.all') }" class="menu-link px-3"
            >{{ $t('widgetexchange.all') }}</a
            >
          </div>
          <!--end::Menu item-->
          <!--begin::Menu item-->
          <div v-for="symbol in symbolThumb" class="menu-item px-3"
               @click="chooseMainCur(symbol.symbol, 'selectedOptionHistory')">
            <a :class="{ 'menu-link': true, 'active': selectedOptionHistory === symbol.symbol }" class="menu-link px-3"
            >{{ symbol.symbol }}</a
            >
          </div>
          <!--end::Menu item-->
        </div>
      </div>

      <!--begin::Toolbar-->
      <div class="card-toolbar m-0">
        <!--begin::Tab nav-->
        <ul
            class="nav nav-stretch fs-4 text-black fw-semobold nav-line-tabs nav-line-tabs border-transparent"
            role="tablist"
        >
          <li class="nav-item" role="presentation">
            <a
                id="kt_referrals_year_tab"
                class="nav-link text-active-dark active pb-4 fw-bold"
                data-bs-toggle="tab"
                role="tab"
                href="#kt_customer_details_invoices_1"
                @click="isCurrent = true"
            >
              {{ $t('widgetexchange.active') }}
            </a>
          </li>
          <li class="nav-item" role="presentation">
            <a
                id="kt_referrals_2019_tab"
                class="nav-link text-active-dark ms-3 pb-4 fw-bold"
                data-bs-toggle="tab"
                role="tab"
                href="#kt_customer_details_invoices_2"
                @click="isCurrent = false"
            >
              {{ $t('widgetexchange.complete') }}
            </a>
          </li>
        </ul>
        <!--end::Tab nav-->
      </div>
      <!--end::Toolbar-->
    </div>
    <!--end::Card header-->

    <!--begin::Card body-->
    <div class="card-body pt-0">
      <!--begin::Tab Content-->
      <div id="kt_referred_users_tab_content" class="tab-content h-100">
        <div
            id="kt_customer_details_invoices_1"
            class="py-0 tab-pane fade active show custom__table h-100"
            role="tabpanel"
        >
          <Datatable
              :header="tableHeaderCurrent"
              :data="dataEntrustCurrent"
              :items-per-page="6 "
              :items-per-page-dropdown-enabled="false"
              empty-table-text="Данные не найдены"
              class="table-exchange-active h-100"
          >
            <template v-slot:symbol="{ row: invoice }">
              <span class="text-black">
                {{ invoice.symbol }}
              </span>
            </template>
            <template v-slot:direction="{ row: invoice }">
              <span class="bg-light-primary text-primary px-2 py-2"
                    v-if="invoice.direction === 'BUY'">{{ getDirection(invoice.direction) }}</span>
              <span class="badge badge-light-danger px-2 py-2"
                    v-else-if="invoice.direction === 'SELL'">{{ getDirection(invoice.direction) }}</span>
            </template>
            <template v-slot:price="{ row: invoice }">
              <span class="text-gray-600">
                {{ invoice.price }}</span>
            </template>
            <template v-slot:amount="{ row: invoice }">
              <span class="text-black">
                {{ invoice.amount }}
              </span>
            </template>
            <template v-slot:invoice="{ row: invoice}">
              <button style="padding: calc(0.25rem + 1px) calc(1rem + 1px)" type="button" class="btn btn-sm btn-danger"
                      @click.prevent="modalCancel(invoice.orderId)"
              >Отменить
              </button>

            </template>
          </Datatable>
        </div>
        <div
            id="kt_customer_details_invoices_2"
            class="py-0 tab-pane fade custom__table h-100"
            role="tabpanel"
        >
          <Datatable
              :header="tableHeaderHistory"
              :data="dataEntrustHistory"
              :items-per-page="5"
              :items-per-page-dropdown-enabled="false"
              empty-table-text="Данные не найдены"
              class="table-exchange-complete h-100"
          >
            <template v-slot:symbol="{ row: invoice }">
              <span class="text-black">
                {{ invoice.symbol }}
              </span>
            </template>
            <template v-slot:direction="{ row: invoice }">
              <span class="bg-light-primary text-primary px-2 py-2"
                    v-if="invoice.direction === 'BUY'">{{ getDirection(invoice.direction) }}</span>
              <span class="badge badge-light-danger px-2 py-2"
                    v-else-if="invoice.direction === 'SELL'">{{ getDirection(invoice.direction) }}</span>
            </template>
            <template v-slot:price="{ row: invoice }">
              <span class="text-gray-600">
                {{ invoice.price }}</span>
            </template>
            <template v-slot:amount="{ row: invoice }">
              <span class="text-black">
                {{ invoice.amount }}
              </span>
            </template>
            <template v-slot:status="{ row: invoice }">
              <span class="bg-light-primary text-primary px-2 py-2"
                    v-if="invoice.status === 'COMPLETED'">{{ getStatus(invoice.status) }}</span>
              <span class="badge badge-light-danger px-2 py-2"
                    v-else-if="invoice.status === 'CANCELED'">{{ getStatus(invoice.status) }}</span>
              <span class="badge badge-light-secondary px-2 py-2"
                    v-if="invoice.status === 'OVERTIMED'">{{ getStatus(invoice.status) }}</span>
              <span class="badge badge-light-warning px-2 py-2"
                    v-else-if="invoice.status === 'TRADING'">{{ getStatus(invoice.status) }}</span>
            </template>
          </Datatable>
        </div>
      </div>
      <!--end::Tab Content-->
    </div>
    <!--end::Card body-->
  </div>
  <!--end::Card-->
</template>

<script lang="ts">
import {computed, defineComponent, ref} from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import ApiService from "@/core/services/ApiService";
import Api from "@/config/api";
import {ElMessage} from "element-plus";
import Swal from "sweetalert2/dist/sweetalert2.js";
import {useI18n} from "vue-i18n";

export default defineComponent({
  name: "invoices-card",
  props: {
    cardClasses: String,
  },
  components: {
    Datatable,
  },
  setup() {
    const { t } = useI18n();
    const tableHeaderCurrent = computed ( () => ([
      {
        columnName: t('widgetexchange.currency'),
        columnLabel: "symbol",
        sortEnabled: false,
      },
      {
        columnName: t('widgetexchange.direction'),
        columnLabel: "direction",
        sortEnabled: false,
      },
      {
        columnName: t('widgetexchange.price'),
        columnLabel: "price",
        sortEnabled: false,
      },
      {
        columnName: t('widgetexchange.volume'),
        columnLabel: "amount",
        sortEnabled: false,
      },
      {
        columnName: t('widgetexchange.action'),
        columnLabel: "invoice",
        sortEnabled: false,
      },
    ]));
    const tableHeaderHistory = computed ( () => ([
      {
        columnName: t('widgetexchange.currency'),
        columnLabel: "symbol",
        sortEnabled: false,
      },
      {
        columnName: t('widgetexchange.direction'),
        columnLabel: "direction",
        sortEnabled: false,
      },
      {
        columnName: t('widgetexchange.price'),
        columnLabel: "price",
        sortEnabled: false,
      },
      {
        columnName: t('widgetexchange.volume'),
        columnLabel: "amount",
        sortEnabled: false,
      },
      {
        columnName: t('widgetexchange.status'),
        columnLabel: "status",
        sortEnabled: false,
      },
    ]));
    return {
      tableHeaderCurrent,
      tableHeaderHistory,
    };
  },
  data() {
    return {
      isCurrent: true,
      symbolThumb: [],
      selectedOptionCurrent: "Все",
      selectedOptionHistory: "Все",
      idCurrentOrder: "",
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
      dataEntrustCurrent: [],
      dataEntrustHistory: [],
    };
  },
  methods: {
    modalCancel(id) {
      Swal.fire({
        html: 'Вы уверены, что хотите отменить?',
        icon: `warning`,
        buttonsStyling: true,
        showCancelButton: true,
        confirmButtonText: "Да",
        cancelButtonText: "Нет",
        preConfirm: () => this.cancelCurrent(id),
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: 'btn btn-danger'
        }
      })
    },
    chooseMainCur(symbol: string, option: string) {
      if (option === "selectedOptionCurrent") {
        this.selectedOptionCurrent = symbol;
        this.entrustCurrent.symbol = symbol === this.translate('widgetexchange.all') ? "" : symbol;
        this.entrustHistory["pageNo"] = 1;
        this.getEntrustCurrent();
      } else if (option === "selectedOptionHistory") {
        this.selectedOptionHistory = symbol;
        this.entrustHistory.symbol = symbol === this.translate('widgetexchange.all') ? "" : symbol;
        this.entrustHistory["pageNo"] = 1;
        this.getEntrustHistory();
      }
    },
    cancelCurrent(id) {
      ApiService.post(Api.exchange.cancelOrder + `/${id}`, {}).then(() => {
        this.getEntrustCurrent();
      }).catch(response => {
        ElMessage.error(response.data.message);
      });
    },
    getStatus(status) {
      return status === "COMPLETED" ? "Завершен" : status === "CANCELED" ? "Отменен" : status === "OVERTIMED" ? "Истек" : "В процессе";
    },
    getDirection(direction) {
      return direction === "BUY" ? "Купить" : "Продать";
    },
    init() {
      ApiService.setHeader();
      this.getEntrustCurrent();
      this.getEntrustHistory();
      this.getSymbolThumb();
    },
    getSymbolThumb() {
      ApiService.post(Api.market.symbolThumb, "").then(response => {
        this.symbolThumb = response.data;
      }).catch(response => {
        ElMessage.error(response.data.message);
      });
    },
    getEntrustCurrent() {
      let formData = new FormData();
      formData.append('pageNo', this.entrustCurrent["pageNo"].toString());
      formData.append('pageSize', this.entrustCurrent["pageSize"].toString());
      this.entrustCurrent["symbol"] ? formData.append('symbol', this.entrustCurrent["symbol"]) : "";
      ApiService.post(Api.exchange.entrustCurrent, formData).then(response => {
        this.dataEntrustCurrent = response.data.content;
      }).catch(response => {
        ElMessage.error(response.data.message)
      });
    },
    getEntrustHistory() {
      let formData = new FormData();
      formData.append('pageNo', this.entrustHistory["pageNo"].toString());
      formData.append('pageSize', this.entrustHistory["pageSize"].toString());
      this.entrustHistory["symbol"] ? formData.append('symbol', this.entrustHistory["symbol"]) : "";
      ApiService.post(Api.exchange.entrustHistory, formData).then(response => {
        this.dataEntrustHistory = response.data.content;
      }).catch(response => {
        ElMessage.error(response.data.message)
      });
    },
    translate(text: string) {
      const {t, te} = useI18n();
      if (te(text)) {
        return t(text);
      } else {
        return text;
      }
    },
  },
  created() {
    this.init();
  },
});
</script>

<style lang="scss">
.custom__table {
  .dataTables_wrapper {
    .row {
      .justify-content-md-start {
        display: none !important;
      }

      .justify-content-md-end {
        width: 100%;
      }
    }
  }
}

@media screen and (max-width: 1250px) {
  .custom__table {
    .dataTables_wrapper {
      .row {
        .justify-content-md-end {
          padding: 0 !important;
          margin-left: 0 !important;
        }
      }
    }
  }
}
</style>
