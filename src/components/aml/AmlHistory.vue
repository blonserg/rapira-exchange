<template>
  <div class="card">
    <div
      class="card-header border-0 pt-6 d-flex justify-content-between align-items-center"
    >
      <div
        id="open-filtersMyAds"
        class="btn btn-icon btn-active-color-primary d-lg-none w-30px h-30px w-md-35px h-md-35px"
      >
        <KTIcon icon-name="setting-4" icon-class="fs-2 fs-md-1 text-black" />
      </div>
      <h3 class="fs-3 fw-bold lh-md mb-0">
        {{ $t("aml.title") }}
      </h3>
      <div
        data-kt-drawer="true"
        data-kt-drawer-name="app-active-orders"
        data-kt-drawer-activate="{default: true, lg: false}"
        data-kt-drawer-overlay="true"
        data-kt-drawer-width="225px"
        data-kt-drawer-toggle="#open-filtersMyAds"
        id="table-active-ordersMyAds"
        class="app-table app-table-drawer"
      >
        <div
          class="app-table app-table-drawer w-100 d-flex flex-column flex-lg-row align-items-center justify-content-center gap-3"
        >
          <!--begin::Multiselect Risk-->
          <div class="mx-lg-0 mw-100px w-100">
            <Multiselect
              placeholder="Тип"
              class="min-w-100px w-100 multiselect_custom"
              v-model="selectedRisk.value"
              v-bind="selectedRisk"
              @select="changeSelectRisk"
              @click="changeSelectRisk"
            >
              <template v-slot:singlelabel="{ value }">
                <p class="multiselect-single-label my-0">{{ value.name }}</p>
              </template>
              <template v-slot:option="{ option }">
                <p class="my-0 h-100 w-100 p-2">{{ option.name }}</p>
              </template>
            </Multiselect>
          </div>
          <!--end::Multiselect Risk-->
          <!--begin::Multiselect Network-->
          <div class="mx-lg-0 mw-100px w-100">
            <Multiselect
              placeholder="Статус"
              class="min-w-100px w-100 multiselect_custom"
              v-model="selectedCurrency.value"
              v-bind="selectedCurrency"
              @select="changeSelectNetwork"
              @click="changeSelectNetwork"
            >
              <template v-slot:singlelabel="{ value }">
                <p class="multiselect-single-label my-0">{{ value.value }}</p>
              </template>
              <template v-slot:option="{ option }">
                <p class="my-0 h-100 w-100 p-2">{{ option.value }}</p>
              </template>
            </Multiselect>
          </div>
          <!--end::Multiselect Network-->
          <!--begin::Datepicker-->
          <el-date-picker
            v-model="selectedDate"
            type="daterange"
            placeholder="Select a date"
            :teleported="false"
            name="dueDate"
            class="datepicker aml-datepicker ms-lg-0"
            popper-class="datepicker-popup"
            size="small"
            :unlink-panels="true"
            @change="changeTime"
          />
          <!--end::Datepicker-->
        </div>
      </div>
    </div>
    <div class="card-body p-0">
      <div class="card-px">
        <Datatable
          :data="tableData"
          :total="tableInfo"
          :header="tableHeader"
          :itemsPerPageDropdownEnabled="false"
          :checkbox-enabled="false"
          :itemsPerPage="10"
          class="table-active-orders"
          :show-total-count="true"
          @page-change="onPageChange"
          name-of-item="рефералов"
        >
          <template v-slot:risk="{ row: aml }">
            <div class="d-flex align-items-center">
              <div
                class="d-flex text-black flex-column justify-content-center cursor-pointer"
                data-bs-toggle="modal"
                data-bs-target="#kt_aml_info"
                @click="clickId = aml.id"
              >
                <div>
                  <span
                    class="badge badge-lg"
                    :class="{
                      'badge-light-danger': aml.dirtType === 2,
                      'badge-light-warning': aml.dirtType === 1,
                      'badge-light-success': aml.dirtType === 0,
                    }"
                  >
                    {{ getRisk(aml.dirtType) }}
                  </span>
                </div>
              </div>
            </div>
          </template>
          <template v-slot:percent="{ row: aml }">
            <div
              class="d-flex text-black flex-column justify-content-center cursor-pointer"
              data-bs-toggle="modal"
              data-bs-target="#kt_aml_info"
              @click="clickId = aml.id"
            >
              {{ getPercent(aml.riskscore) }}%
            </div>
          </template>
          <template v-slot:network="{ row: aml }">
            <div class="d-flex text-black align-items-center">
              <div class="me-2 symbol symbol-15px">
                <img
                  :alt="aml.network"
                  :src="getAssetPath('media/crypto/' + aml.network + '.svg')"
                />
              </div>
              <div class="text-gray-800">
                <p class="text-center m-0">{{ aml.network }}</p>
              </div>
            </div>
          </template>
          <template v-slot:address="{ row: aml }">
            <div class="d-flex text-gray-800 align-items-center">
              <span>{{ maskText(aml.address) }}</span>
              <el-popover
                placement="top"
                :content="aml.address"
                popper-class="w-auto tooltip-history"
              >
                <template #reference>
                  <button
                    class="btn btn-light btn-icon btn-sm btn-history ms-4"
                  >
                    <i
                      class="ki-solid fs-6"
                      :class="[
                        showAddress[aml.createTime] ? 'ki-eye-slash' : 'ki-eye',
                      ]"
                    ></i>
                  </button>
                </template>
              </el-popover>
              <button class="btn btn-light btn-icon btn-sm btn-history ms-2">
                <i class="ki-solid ki-magnifier fs-6"></i>
              </button>
              <button
                :data-clipboard-text="aml.address"
                id="copyButton"
                @click="copyToClipboard"
                class="btn btn-light btn-icon btn-sm btn-history ms-2"
              >
                <i class="ki-solid ki-copy fs-6"></i>
              </button>
            </div>
          </template>
          <template v-slot:txid="{ row: aml }">
            <div v-if="aml.tx" class="d-flex text-gray-800 align-items-center">
              <span>{{ maskText(aml.tx) }}</span>
              <el-popover
                placement="top"
                :content="aml.tx"
                popper-class="w-auto tooltip-history"
              >
                <template #reference>
                  <el-button
                    class="btn btn-light btn-icon btn-sm btn-history ms-4"
                  >
                    <i
                      class="ki-solid fs-6"
                      :class="[
                        showAddress[aml.createTime] ? 'ki-eye-slash' : 'ki-eye',
                      ]"
                    ></i>
                  </el-button>
                </template>
              </el-popover>
              <button class="btn btn-light btn-icon btn-sm btn-history ms-2">
                <i class="ki-solid ki-magnifier fs-6"></i>
              </button>
              <button
                :data-clipboard-text="aml.tx"
                id="copyButton"
                @click="copyToClipboard"
                class="btn btn-light btn-icon btn-sm btn-history ms-2"
              >
                <i class="ki-solid ki-copy fs-6"></i>
              </button>
            </div>
            <div
              v-else
              class="d-flex text-black text-center flex-column justify-content-center"
            >
              —
            </div>
          </template>
          <template v-slot:time="{ row: aml }">
            <div class="d-flex text-black flex-column justify-content-center">
              {{ aml.createTime }}
            </div>
          </template>
          <template v-slot:action="{ row: aml }">
            <div
              class="d-flex text-gray-600 flex-column justify-content-center"
            >
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
                <div
                  class="menu menu-sub menu-sub-dropdown menu-custom-color menu-column menu-state-bg-primary fw-bold w-200px py-2"
                  data-kt-menu="true"
                >
                  <!--begin::Menu item-->
                  <div class="menu-item py-0">
                    <a
                      href="#"
                      class="menu-link text-gray-600 bg-hover-light-primary text-hover-primary fw-bold rounded-2 p-2 mx-2"
                      data-bs-toggle="modal"
                      data-bs-target="#kt_aml_info"
                      @click="clickId = aml.id"
                    >
                      Подробнее
                    </a>
                  </div>
                  <!--end::Menu item-->
                </div>
              </div>
              <!--end::Menu-->
            </div>
          </template>
        </Datatable>
      </div>
    </div>

    <InfoModal :data="selectedInfo" />
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  ref,
  watch,
} from "vue";
import Datatable from "@/components/record-table/RecordTable.vue";
import ApiService from "@/core/services/ApiService";
import Api from "@/config/api";
import { ElMessage } from "element-plus";
import { MenuComponent } from "@/assets/ts/components";
import Multiselect from "@vueform/multiselect";
import { useI18n } from "vue-i18n";
import ClipboardJS from "clipboard";
import InfoModal from "@/components/modals/aml/InfoModal.vue";

export default defineComponent({
  name: "aml-history",
  components: {
    Datatable,
    Multiselect,
    InfoModal,
  },
  setup() {
    const { t } = useI18n();
    const tableHeader = computed(() => [
      {
        columnName: t("aml.risk"),
        columnLabel: "risk",
        sortEnabled: false,
      },
      {
        columnName: t("aml.percent"),
        columnLabel: "percent",
        sortEnabled: false,
      },
      {
        columnName: t("aml.network"),
        columnLabel: "network",
        sortEnabled: false,
      },
      {
        columnName: t("aml.address"),
        columnLabel: "address",
        sortEnabled: false,
      },
      {
        columnName: t("aml.txid"),
        columnLabel: "txid",
        sortEnabled: false,
      },
      {
        columnName: t("aml.time"),
        columnLabel: "time",
        sortEnabled: false,
      },
      {
        columnName: t("aml.action"),
        columnLabel: "action",
        sortEnabled: false,
      },
    ]);
    const tableData = ref([
      {
        id: "",
      },
    ]);
    const tableInfo = ref(0);
    const showAddress = reactive({});
    const selectedCurrency = ref({
      value: "",
      placeholder: "Сеть",
      options: [],
    });
    const selectedRisk = ref({
      value: "",
      placeholder: "Риск",
      options: [
        {
          name: "Низкий",
          value: "0",
        },
        {
          name: "Средний",
          value: "1",
        },
        {
          name: "Высокий",
          value: "2",
        },
      ],
    });
    const clickId = ref("");
    const selectedInfo = ref({});
    const selectedDate = ref("");
    const dataStartTime = ref("");
    const dataEndTime = ref("");

    const getAmlHistory = async (page) => {
      let formData = new FormData();
      formData.append("pageNo", page);
      formData.append("pageSize", "10");
      if (selectedCurrency.value.value) {
        formData.append("network", selectedCurrency.value.value);
      }
      if (selectedRisk.value.value) {
        formData.append("dirtType", selectedRisk.value.value);
      }
      if (dataStartTime.value) {
        formData.append("from", dataStartTime.value);
        formData.append("to", dataEndTime.value);
      }
      ApiService.post(Api.uc.amlHistory, formData)
        .then((response) => {
          tableData.value = response.data.data.content;
          tableInfo.value = response.data.data.totalElements;
          setTimeout(() => {
            MenuComponent.reinitialization();
          }, 1000);
        })
        .catch((response) => {
          ElMessage.error(response.message);
        });
    };

    const getRisk = (number: number) => {
      return number === 0
        ? "Низкий"
        : number === 1
        ? "Сердний"
        : number === 2
        ? "Высокий"
        : number;
    };

    const onPageChange = (page) => {
      getAmlHistory(page);
    };

    const maskText = (text) => {
      const masked = text;
      return masked.slice(0, 3) + "..." + masked.slice(-3);
    };

    const getCurrency = async () => {
      const response = await ApiService.post(Api.uc.currencies, "");
      selectedCurrency.value.options = response.data.data;
    };

    const copyToClipboard = () => {
      const clipboard = new ClipboardJS("#copyButton");
      clipboard.on("success", () => {
        clipboard.destroy();
        ElMessage.success("Copied to clipboard");
      });
      clipboard.on("error", () => {
        clipboard.destroy();
        ElMessage.error("Failed to copy to clipboard");
      });
    };

    const changeSelectNetwork = () => {
      getAmlHistory("1");
    };

    const changeSelectRisk = () => {
      getAmlHistory("1");
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

    const changeTime = () => {
      if (selectedDate.value) {
        let startDate = new Date(selectedDate.value[0]);
        let endDate = new Date(selectedDate.value[1]);
        dataStartTime.value = `${startDate.getFullYear()}-${String(
          startDate.getMonth() + 1
        ).padStart(2, "0")}-${String(startDate.getDate()).padStart(2, "0")}`;
        dataEndTime.value = `${endDate.getFullYear()}-${String(
          endDate.getMonth() + 1
        ).padStart(2, "0")}-${String(endDate.getDate()).padStart(2, "0")}`;
        getAmlHistory("1");
      } else {
        dataStartTime.value = "";
        dataEndTime.value = "";
        getAmlHistory("1");
      }
    };

    watch(clickId, () => {
      selectedInfo.value = tableData.value.filter(
        (obj) => obj.id === clickId.value
      );
    });

    onMounted(() => {
      ApiService.setHeader();
      getAmlHistory("1");
      getCurrency();
      setTimeout(() => {
        MenuComponent.reinitialization();
      }, 1000);
    });

    return {
      tableData,
      tableHeader,
      getAssetPath,
      tableInfo,
      onPageChange,
      getRisk,
      maskText,
      showAddress,
      copyToClipboard,
      selectedCurrency,
      changeSelectNetwork,
      changeSelectRisk,
      selectedRisk,
      clickId,
      selectedInfo,
      getPercent,
      selectedDate,
      changeTime,
    };
  },
});
</script>

<style lang="scss">
.multiselect_custom {
  .multiselect-options {
    padding: 7px 4px !important;
    border: none;
    margin-top: 0;
  }

  .multiselect-option {
    min-height: auto;
    padding: 1px 4px !important;
    background: #ffffff !important;
    color: rgb(126, 130, 153);
  }

  .multiselect-option.is-selected {
    background: #ffffff !important;
    padding: 1px 4px !important;

    p {
      color: var(--bs-primary);
      background-color: var(--bs-primary-light) !important;
      border-radius: 0.475rem;
    }
  }

  .multiselect-option.is-pointed {
    background: #ffffff !important;
    padding: 1px 4px !important;

    p {
      color: var(--bs-primary);
      background-color: var(--bs-primary-light) !important;
      border-radius: 0.475rem;
    }
  }

  .multiselect-option.is-selected.is-pointed {
    padding: 1px 4px !important;
    background: #ffffff !important;

    p {
      color: var(--bs-primary);
      background-color: var(--bs-primary-light) !important;
      border-radius: 0.475rem;
    }
  }
  .multiselect-placeholder {
    color: #7e8299;
  }
}
.green_custom {
  color: #47be7d !important;
}
</style>
