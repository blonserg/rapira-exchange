<template>
  <div class="card">
    <div class="card-header border-0 pt-9 d-flex justify-space-between align-items-baseline flex-lg-nowrap">
      <div class="d-flex">
        <h3 class="fs-3 fw-bold lh-md mb-0 me-2 me-lg-20">
          {{ $t('withdraw.savedAddresses') }}
        </h3>
      </div>

    </div>
    <div class="card-body pt-0">
      <div id="deposit_hystory_content" class="tab-content">
        <div
            id="deposit_history_crypto"
            class="py-0 tab-pane fade active show"
            role="tabpanel"
        >
          <Datatable
              :data="dataCrypto"
              :header="tableHeaderCrypto"
              :itemsPerPageDropdownEnabled="false"
              :checkbox-enabled="false"
              :itemsPerPage=7
              class="table-active-orders"
              :show-total-count="true"
              empty-table-text="Данные не найдены"
          >
            <template v-slot:unit="{ row: deposits }">
              <div class="d-flex align-items-center">
                <div class="me-2 position-relative">
                  <div class="symbol symbol-15px">
                    <img
                        :alt=deposits.unit
                        :src="getAssetPath('media/crypto/'+ deposits.unit + '.svg')"
                    />
                  </div>
                </div>
                <div class="d-flex text-black flex-column justify-content-center">
                  {{ deposits.unit }}
                </div>
              </div>
            </template>
            <template v-slot:address="{ row: deposits }">
              <div class="d-flex text-black align-items-center">
                <span>{{ maskText(deposits.address) }}</span>
                <span class="position-relative">
                  <button class="btn btn-light btn-icon btn-sm btn-history ms-4"
                          @click="showAddress[deposits.id] = !showAddress[deposits.id]">
                    <i class="ki-solid fs-6" :class="[showAddress[deposits.id] ? 'ki-eye-slash' : 'ki-eye']"></i>
                  </button>
                  <v-tooltip class="tooltip-history badge badge-lg" v-if="showAddress[deposits.id]">{{
                      deposits.address
                    }}</v-tooltip>
                </span>
                <button
                    class="btn btn-light btn-icon btn-sm btn-history ms-2"
                >
                  <i class="ki-solid ki-magnifier fs-6"></i>
                </button>
                <button
                    :data-clipboard-text="deposits.address"
                    id="copyButton" @click="copyToClipboard"
                    class="btn btn-light btn-icon btn-sm btn-history ms-2"
                >
                  <i class="ki-solid ki-copy fs-6"></i>
                </button>
              </div>
            </template>
            <template v-slot:remark="{ row: deposits }">
              <div class="d-flex text-black flex-column justify-content-center">
                {{ deposits.remark }}
              </div>
            </template>
            <template v-slot:invoice="{ row: invoice }">
              <div class="text-gray-600">
                <button @click="modalDelAddress(invoice.id)" style="padding: calc(0.25rem + 1px) 10px" type="button"
                        class="btn btn-sm btn-danger">{{ $t('button.delete') }}
                </button>
              </div>
            </template>
          </Datatable>
        </div>
        <div
            id="deposit_history_fiat"
            class="py-0 tab-pane fade"
            role="tabpanel"
        >
        </div>
        <div
            id="deposit_history_rcode"
            class="py-0 tab-pane fade"
            role="tabpanel"
        >
        </div>
      </div>
    </div>
  </div>

</template>

<script lang="ts">
import {getAssetPath} from "@/core/helpers/assets";
import {defineComponent, reactive} from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import ClipboardJS from "clipboard";
import {ElMessage} from 'element-plus';
import Multiselect from '@vueform/multiselect';
import ApiService from "@/core/services/ApiService";
import Api from "@/config/api";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";

export default defineComponent({
  name: "withdrawal-history",
  components: {
    Datatable,
    Multiselect,
  },
  setup() {
    const showText = reactive({});
    const showAddress = reactive({});
    return {
      getAssetPath,
      showText,
      showAddress,
    };
  },

  data() {
    return {
      selectedTab: "Crypto",
      fullDataSelected: [] as any,

      selectedCurrencyCrypto: {
        value: "",
        placeholder: "Валюта",
        options: [],
      },
      dataCrypto: [],
      dataFiat: [],
      dataRCode: [],
      additionalDataCrypto: [] as any,
      additionalDataFiat: [] as any,
      additionalDataRCode: [] as any,
      tableHeaderCrypto: [
        {
          columnName: "Валюта",
          columnLabel: "unit",
          sortEnabled: false,
        },
        {
          columnName: "Адрес вывода",
          columnLabel: "address",
          sortEnabled: false,
        },
        {
          columnName: "Примечание",
          columnLabel: "remark",
          sortEnabled: false,
        },
        {
          columnName: "Действия",
          columnLabel: 'invoice',
          sortEnabled: false,
        },
      ],
    };
  },

  computed: {},

  methods: {
    currentUnit(unit) {
      return this.fullDataSelected.filter(item => item["unit"] === unit)[0]
    },
    filterDataTable(table) {

      setTimeout(() => {
            if (table === "Crypto") {
              console.log(table)
              this.selectedCurrencyCrypto.value ? this.dataCrypto = this.additionalDataCrypto.filter(item => item["unit"].includes(this.selectedCurrencyCrypto.value)) : this.dataCrypto = this.additionalDataCrypto
            } else if (table === "Fiat") {
              console.log(table)
            }
          }
      );
    },
    numberFormatting(number) {
      return new Intl.NumberFormat("ru", {style: "decimal", maximumFractionDigits: 2}).format(number);
    },
    init() {
      ApiService.setHeader();
      this.getDataUnit();
      this.getDataCrypto();
    },
    getDataUnit() {
      ApiService.post(Api.uc.rechargeable, "").then(response => {
        this.selectedCurrencyCrypto.options = response.data.data.coins.filter(item => !item.isFiat).map(coin => coin.unit);
        this.fullDataSelected = response.data.data.coins;
      }).catch(response => {
        ElMessage.error(response.data.message)
      });
    },
    getDataCrypto() {
      axios.get(Api.uc.savedAddresses).then(response => {
        this.dataCrypto = this.additionalDataCrypto = response.data.data.addresses;
      }).catch(response => {
        ElMessage.error(response.data.message);
      })
    },
    deleteAddress(id) {
      let formData = new FormData();
      formData.append('id', id);
      ApiService.post(Api.uc.deleteAddress, formData).then(response => {
        if (response.data.code == 0 || response.data.cod == 200) {
          this.init();
          ElMessage.success(response.data.message)
        } else {
          ElMessage.error(response.data.message)
        }
      })
    },
    modalDelAddress(id) {
      Swal.fire({
        html: 'Вы уверены, что хотите удалить?',
        icon: `warning`,
        buttonsStyling: true,
        showCancelButton: true,
        confirmButtonText: "Да",
        cancelButtonText: "Нет",
        preConfirm: () => this.deleteAddress(id),
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: 'btn btn-danger'
        }
      })
    },

    formatDate(date) {
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Europe/Moscow',
      }).format(new Date(date));
    },
    changeTab(tabName) {
      this.selectedTab = tabName;
    },
    copyToClipboard() {
      const clipboard = new ClipboardJS('#copyButton');
      clipboard.on('success', () => {
        clipboard.destroy();
        ElMessage.success('Copied to clipboard')
      });
      clipboard.on('error', () => {
        clipboard.destroy();
        ElMessage.error('Failed to copy to clipboard')
      });
    },
    maskText(text) {
      const masked = text;
      return masked.slice(0, 3) + '...' + masked.slice(-3);
    }
  },
  created() {
    this.init();
  },
});
</script>
