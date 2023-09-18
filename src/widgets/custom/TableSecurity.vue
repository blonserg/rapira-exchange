<template>
  <!--begin::Card-->
  <div :class="`card pt-2 ${cardClasses}`">
    <!--begin::Card header-->
    <div class="card-header border-0">
      <!--begin::Card title-->
      <div class="card-title d-flex flex-column">
        <h2 class="fs-3">Активные устройства</h2>
        <span class="text-gray-600 pt-2 fw-semibold fs-6">
          5 устройств
        </span>
      </div>
      <!--end::Card title-->
    </div>
    <!--end::Card header-->

    <!--begin::Card body-->
    <div class="card-body table-security pt-0">
      <!--begin::Tab Content-->
      <div class="tab-content">
        <div
          id="kt_customer_details_invoices_1"
          class="py-0 tab-pane fade active show custom__table"
          role="tabpanel"
        >
          <Datatable
            :header="tableHeader"
            :data="tableData1"
            :items-per-page="5"
            :items-per-page-dropdown-enabled="false"
          >
            <template v-slot:device="{ row: invoice }">
              <div class="d-flex flex-column">
                <span class="text-black">
                  {{ invoice.device }}
                </span>
                <span class="text-gray-600 fs-7">
                  {{ invoice.ip }}
                </span>
              </div>
            </template>
            <template v-slot:activity="{ row: invoice }">
              <span class="text-black">
                {{ invoice.activity }}
              </span>
            </template>
          </Datatable>
          <div class="d-flex justify-content-center">
            <a class="d-flex align-items-center" href="#">
              <span class="text-primary fw-bold fs-5">Смотреть все действия</span>
              <KTIcon
                  icon-name="arrow-right"
                  icon-class="fs-3 text-primary ms-8"
              />
            </a>
          </div>
        </div>
      </div>
      <!--end::Tab Content-->
    </div>
    <!--end::Card body-->
  </div>
  <!--end::Card-->
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";

export default defineComponent({
  name: "table-security",
  props: {
    cardClasses: String,
  },
  components: {
    Datatable,
  },
  setup() {
    const tableHeader = ref([
      {
        columnName: "Устройство",
        columnLabel: "device",
        sortEnabled: false,
      },
      {
        columnName: "Активность",
        columnLabel: "activity",
        sortEnabled: false,
      },
    ]);
    const tableData1 = ref([
      {
        device: "Yandex Browser v23.3, Windows 10",
        ip: "91.229.129.29, Russia, Taganrog",
        activity: "Сейчас",
      },
      {
        device: "Yandex Browser v23.3, Windows 10",
        ip: "91.229.129.29, Russia, Taganrog",
        activity: "Вчера",
      },
      {
        device: "Yandex Browser v23.3, Windows 10",
        ip: "91.229.129.29, Russia, Taganrog",
        activity: "Вчера",
      },
      {
        device: "Yandex Browser v23.3, Windows 10",
        ip: "91.229.129.29, Russia, Taganrog",
        activity: "5 дней назад",
      },
      {
        device: "Yandex Browser v23.3, Windows 10",
        ip: "91.229.129.29, Russia, Taganrog",
        activity: "5 дней назад",
      },
      {
        device: "Yandex Browser v23.3, Windows 10",
        ip: "91.229.129.29, Russia, Taganrog",
        activity: "5 дней назад",
      },
      {
        device: "Yandex Browser v23.3, Windows 10",
        ip: "91.229.129.29, Russia, Taganrog",
        activity: "5 дней назад",
      },
      {
        device: "Yandex Browser v23.3, Windows 10",
        ip: "91.229.129.29, Russia, Taganrog",
        activity: "5 дней назад",
      },
      {
        device: "Yandex Browser v23.3, Windows 10",
        ip: "91.229.129.29, Russia, Taganrog",
        activity: "5 дней назад",
      },
    ]);

    return { tableHeader, tableData1 };
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
