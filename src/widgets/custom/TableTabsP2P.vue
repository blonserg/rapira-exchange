<template>
  <!--begin::Card-->
  <div class="card pt-2">
    <!--begin::Card header-->
    <div class="card-header border-0 align-items-center">

      <!--begin::Card title-->
      <div class="card-title" >
        <h2 class="fs-3 align-items-center"> {{ $t('widgetp2p.title') }}</h2>
      </div>
      <!--end::Card title-->

      <!--begin::Select-->
      <div v-show="isMyOrder">
          <span  class="fw-semibold text-gray-400 fs-6">
          {{ $t('widgetp2p.status') }}
        </span>
        <a
            href="#menuMyOrder"
            class="btn btn-sm btn-bg-body btn-active-light-primary me-12"
            data-kt-menu-trigger="click"
            data-kt-menu-placement="bottom-end"
            data-kt-menu-flip="top-end"
        >{{ selectedOptionOrder }}
          <KTIcon icon-name="down" icon-class="fs-5 m-0" />
        </a>
        <!--begin::Menu-->
        <div
            id="menuMyOrder"
            class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semobold fs-7 w-125px py-4"
            data-kt-menu="true"
        >
          <!--begin::Menu item-->
          <div class="menu-item px-3" @click="chooseMainCur($t('widgetp2p.all'), 'myOrder')">
            <a :class="{'menu-link': true, 'active': selectedOptionOrder === $t('widgetp2p.all')}" class="menu-link px-3"
            >Все</a
            >
          </div>
          <!--end::Menu item-->
          <!--begin::Menu item-->
          <div class="menu-item px-3" @click="chooseMainCur($t('widgetp2p.active'), 'myOrder')">
            <a :class="{'menu-link': true, 'active': selectedOptionOrder === $t('widgetp2p.active')}" class="menu-link px-3"
            >{{ $t('widgetp2p.active') }}</a
            >
          </div>
          <!--end::Menu item-->
          <!--begin::Menu item-->
          <div class="menu-item px-3" @click="chooseMainCur($t('widgetp2p.complete'), 'myOrder')">
            <a :class="{'menu-link': true, 'active': selectedOptionOrder === $t('widgetp2p.complete')}" class="menu-link px-3"
            >{{ $t('widgetp2p.complete') }}</a
            >
          </div>
          <!--end::Menu item-->
        </div>
        <!--end::Menu-->
      </div>
      <div v-show="!isMyOrder">
          <span  class="fw-semibold text-gray-400 fs-6">
          {{ $t('widgetp2p.status') }}
        </span>
        <a
            href="#menuMyOrder"
            class="btn btn-sm btn-bg-body btn-active-light-primary me-12"
            data-kt-menu-trigger="click"
            data-kt-menu-placement="bottom-end"
            data-kt-menu-flip="top-end"
        >{{ selectedOptionAd }}
          <KTIcon icon-name="down" icon-class="fs-5 m-0" />
        </a>
        <!--begin::Menu-->
        <div
            id="menuMyOrder"
            class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semobold fs-7 w-125px py-4"
            data-kt-menu="true"
        >
          <!--begin::Menu item-->
          <div class="menu-item px-3" @click="chooseMainCur($t('widgetp2p.all'), 'myAd')">
            <a :class="{'menu-link': true, 'active': selectedOptionAd === $t('widgetp2p.all')}" class="menu-link px-3"
            >Все</a
            >
          </div>
          <!--end::Menu item-->
          <!--begin::Menu item-->
          <div class="menu-item px-3" @click="chooseMainCur($t('widgetp2p.publish'), 'myAd')">
            <a :class="{'menu-link': true, 'active': selectedOptionAd === $t('widgetp2p.publish')}" class="menu-link px-3"
            >{{ $t('widgetp2p.publish') }}</a
            >
          </div>
          <!--end::Menu item-->
          <!--begin::Menu item-->
          <div class="menu-item px-3" @click="chooseMainCur($t('widgetp2p.notpublish'), 'myAd')">
            <a :class="{'menu-link': true, 'active': selectedOptionAd === $t('widgetp2p.notpublish')}" class="menu-link px-3"
            >{{ $t('widgetp2p.notpublish') }}</a
            >
          </div>
          <!--end::Menu item-->
        </div>
        <!--end::Menu-->
      </div>
      <!--end::Select-->

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
                href="#kt_customer_details_table_p2p_1"
                @click="isMyOrder = true"
            >
              {{ $t('widgetp2p.mydeals') }}
            </a>
          </li>

          <li class="nav-item" role="presentation">
            <a
                id="kt_referrals_2019_tab"
                class="nav-link text-active-dark ms-3 pb-4 fw-bold"
                data-bs-toggle="tab"
                role="tab"
                href="#kt_customer_details_table_p2p_2"
                @click="isMyOrder = false"
            >
              {{ $t('widgetp2p.myads') }}
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
      <div id="kt_referred_users_tab_content" class="tab-content">
        <div
            id="kt_customer_details_table_p2p_1"
            class="py-0 tab-pane fade active show custom__table"
            role="tabpanel"
        >
          <Datatable
              :header="tableHeaderMyOrder"
              :data="dataMyOrder"
              :items-per-page="5"
              :items-per-page-dropdown-enabled="false"
              empty-table-text="Данные не найдены"
          >
            <template v-slot:advertiseType="{ row: invoice }">
              <span class="badge badge-light-success py-3 w-100px justify-content-center badge-lg green_custom"  v-if="invoice.advertiseType === 1">{{ getType(invoice.advertiseType) }}</span>
              <span class="badge badge-light-danger py-3 w-100px  justify-content-center badge-lg" v-else-if="invoice.advertiseType === 0">{{ getType(invoice.advertiseType) }}</span>
            </template>
            <template v-slot:username="{ row: invoice }">
              <span class="text-primary">
                {{ invoice.member.username }}
              </span>
            </template>
            <template v-slot:money="{ row: invoice }">
              <span class="text-gray-600">
                ${{ numberFormatting(invoice.money) }}</span>
            </template>
            <template v-slot:status="{ row: invoice }">
              <span class="text-black">
                 <span class="badge badge-light-success w-100px justify-content-center badge-lg green_custom"  v-if="invoice.status === 2 || invoice.status === 3">{{ getStatusOrder(invoice.status) }}</span>
                 <span class="badge badge-light-warning w-100px justify-content-center badge-lg" v-else-if="invoice.status === 4 ">{{ getStatusOrder(invoice.status) }}</span>
                <span class="badge badge-light w-100px justify-content-center badge-lg" v-else-if="invoice.status === 0 || invoice.status === 1">{{ getStatusOrder(invoice.status) }}</span>
              </span>
            </template>
          </Datatable>
        </div>
        <div
            id="kt_customer_details_table_p2p_2"
            class="py-0 tab-pane fade custom__table"
            role="tabpanel"
        >
          <Datatable
              :header="tableHeaderMyAd"
              :data="dataMyAd"
              :total="tableInfo"
              :items-per-page="5"
              :items-per-page-dropdown-enabled="false"
              :show-total-count="true"
              :checkbox-enabled="false"
              empty-table-text="Данные не найдены"
              class="table-myad"
              @page-change="onPageChange"
          >
            <template v-slot:advertiseType="{ row: invoice }">
              <span class="badge badge-light-success w-100px justify-content-center badge-lg green_custom"  v-if="invoice.advertiseType === 1">{{ getType(invoice.advertiseType) }}</span>
              <span class="badge badge-light-danger w-100px justify-content-center badge-lg" v-else-if="invoice.advertiseType === 0">{{ getType(invoice.advertiseType) }}</span>
            </template>
            <template v-slot:price="{ row: invoice }">
              <span class="text-gray-600">
                {{ getPercent(invoice.price) }}%
              </span>
            </template>
            <template v-slot:status="{ row: invoice }">
              <span class="badge badge-light-success w-125px justify-content-center badge-lg green_custom" v-if="invoice.status === 0">{{ getStatus(invoice.status) }}</span>
              <span class="badge badge-light-warning w-125px justify-content-center badge-lg" v-else-if="invoice.status === 1">{{ getStatus(invoice.status) }}</span>
            </template>
            <template v-slot:invoice="{ row: invoice }">
              <div class="d-flex text-gray-600 flex-column justify-content-center">
                <!--begin::Menu-->
                <div class="me-0">
                  <button
                      class="btn btn-sm btn-icon btn-bg-light btn-active-color-primary"
                      data-kt-menu-trigger="click"
                      data-kt-menu-placement="bottom-end"
                      data-kt-menu-flip="top-end"
                  >
                    <i class="bi bi-three-dots fs-3"></i>
                  </button>
                  <Dropdown :invoice="invoice" :getMyAd="getMyAd"/>
                </div>
                <!--end::Menu-->
              </div>
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
import Dropdown from "@/components/dropdown/DropdownAds.vue";
import { MenuComponent } from "@/assets/ts/components";
import {ElMessage} from "element-plus";
import {useI18n} from "vue-i18n";


export default defineComponent({
  name: "invoices-card",
  props: {
    cardClasses: String,
  },
  components: {
    Datatable,
    Dropdown,
    MenuComponent,
  },
  setup() {
    const { t } = useI18n();
    const tableHeaderMyOrder = computed( () => ([
      {
        columnName: t('widgetp2p.type'),
        columnLabel: "advertiseType",
        sortEnabled: false,
      },
      {
        columnName: t('widgetp2p.seller'),
        columnLabel: "username",
        sortEnabled: false,
      },
      {
        columnName: t('widgetp2p.balance'),
        columnLabel: "money",
        sortEnabled: false,
      },
      {
        columnName: t('widgetp2p.status'),
        columnLabel: "status",
        sortEnabled: false,
      },
    ]));
    const tableHeaderMyAd = computed( () => ([
      {
        columnName: t('widgetp2p.type'),
        columnLabel: "advertiseType",
        sortEnabled: false,
      },
      {
        columnName: t('widgetp2p.percent'),
        columnLabel: "price",
        sortEnabled: false,
      },
      {
        columnName: t('widgetp2p.status'),
        columnLabel: "status",
        sortEnabled: false,
      },
      {
        columnName: t('widgetp2p.action'),
        columnLabel: "invoice",
        sortEnabled: false,
      },
    ]));
    const tableInfo = ref(0);

    return {
      tableInfo,
      tableHeaderMyOrder,
      tableHeaderMyAd,
    };
  },
  data() {
    return {
      isMyOrder: true,
      selectedOptionOrder: "Все",
      selectedOptionAd: "Все",
      dropDownMenu: false,
      myAd: {
        pageNo: 1,
        pageSize: 5,
      },
      myOrder: {
        pageNo: 1,
        pageSize: 10,
      },
      dataMyAd: [],
      additionalDataMyAd: [],
      dataMyOrder: [],
      orderActive: [1, 2, 4],
      orderCompleted: [0, 3],
      orderAll: [1, 2, 3, 4],
    };
  },
  methods: {
    getStatusOrder(status) {
      return status === 0 ? "Отменено" : status === 1 ? "Неоплачено" : status === 2 ? "Оплачено" : status === 3 ? "Выполнено" : status === 4 ? "Арбитраж" : "";
    },
    numberFormatting(number) {
      return new Intl.NumberFormat("ru", { style: "decimal", maximumFractionDigits: 2 }).format(number);
    },
    chooseMainCur(value, status) {
      if (status === "myAd") {
        this.myAd.pageNo = 1;
        this.selectedOptionAd = value;
        if(value === 'Опубликовано') {
          this.dataMyAd = this.additionalDataMyAd.filter(item => item["status"] === 0)
        } else if(value === 'Не опубликовано') {
          this.dataMyAd = this.additionalDataMyAd.filter(item => item["status"] === 1)
        } else {
          this.getMyAd()
        }
      } else if (status === "myOrder") {
        this.myOrder.pageNo = 1;
        this.selectedOptionOrder = value;
        value === 'Все' ? this.getMyOrder() : value === 'Активные' ? this.getMyOrder(this.orderActive) : this.getMyOrder(this.orderCompleted);
      }
    },
    getPercent(number: number) {
      return ((number - 1) * 100).toFixed(2)
    },
    getType(number: number) {
      return number === 0 ? "Вывод" : number === 1 ? "Пополнение" : number;
    },
    getStatus(status) {
      return status === 0 ? "Опубликовано" : status === 1 ? "Не опубликовано" : status;
    },
    getDirection(direction) {
      return direction === "BUY" ? "Продать" : "Купить";
    },
    init() {
      ApiService.setHeader();
      this.getMyAd();
      this.getMyOrder();
    },
    onPageChange(page) {
      this.myAd.pageNo = page;
      this.getMyAd();
    },
    getMyAd() {
      let formData = new FormData();
      formData.append("pageNo", this.myAd.pageNo.toString());
      formData.append("pageSize", this.myAd.pageSize.toString());
      ApiService.post(Api.otc.myAd, formData).then(response => {
        this.dataMyAd = this.additionalDataMyAd = response.data.data.content;
        this.tableInfo = response.data.data.totalElements;
      }).catch(response => {
        ElMessage.error(response.data.message)
      });
    },
    getMyOrder(status:number[] = [0, 1, 2, 3, 4]) {
      let formData = new FormData();
      formData.append("pageNo", this.myOrder.pageNo.toString());
      formData.append("pageSize", this.myOrder.pageSize.toString());
      // status.forEach(item => formData.append("status[]", `${item}`));
      ApiService.post(Api.otc.myOrder, formData).then(response => {
        this.dataMyOrder = response.data.data.content;
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
    setTimeout(() => {
      MenuComponent.reinitialization();
    }, 1000);
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
.green_custom {
  color: #47BE7D !important;
}
</style>
