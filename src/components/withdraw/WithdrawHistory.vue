<template>
  <div class="card">
    <div class="card-header border-0 pt-9 d-flex justify-space-between align-items-baseline flex-lg-nowrap">
      <div class="d-flex align-items-center mw-400px w-100">
        <h3 class="fs-3 fw-bold lh-md mb-0 me-2 me-lg-20">
          {{ $t('withdraw.historyWithdraw') }}
        </h3>
        <Multiselect v-if="selectedTab === 'Crypto'" @change="filterDataTable('Crypto')" class="w-125px"
                     v-model="selectedCurrencyCrypto.value" v-bind="selectedCurrencyCrypto">
          <template v-slot:singlelabel="{ value }">
            <div class="multiselect-single-label d-flex gap-2">
              <img class="character-label-icon w-20px" :src="getAssetPath(`media/crypto/${value.value}.svg`)"
                   :alt="value.value">
              <p class="my-0 text-gray-800">{{ value.value }}</p>
            </div>
          </template>
          <template v-slot:option="{ option }">
            <div class="d-flex justify-content-between w-100">
              <div class="d-flex gap-2">
                <img class="character-label-icon w-20px " :src="getAssetPath(`media/crypto/${option.value}.svg`)"
                     :alt="option.value">
                <p class="my-0 text-gray-800">{{ option.value }}</p>
              </div>
            </div>
          </template>
        </Multiselect>
        <Multiselect v-if="selectedTab === 'Fiat'" @change="filterDataTable('Fiat')" class="w-125px"
                     v-model="selectedCurrencyFiat.value" v-bind="selectedCurrencyFiat">
          <template v-slot:singlelabel="{ value }">
            <div class="multiselect-single-label d-flex gap-2">
              <img class="character-label-icon w-20px" :src="getAssetPath(`media/crypto/${value.value}.svg`)"
                   :alt="value.value">
              <p class="my-0 text-gray-800">{{ value.value }}</p>
            </div>
          </template>
          <template v-slot:option="{ option }">
            <div class="d-flex justify-content-between w-100">
              <div class="d-flex gap-2">
                <img class="character-label-icon w-20px " :src="getAssetPath(`media/crypto/${option.value}.svg`)"
                     :alt="option.value">
                <p class="my-0 text-gray-800">{{ option.value }}</p>
              </div>
            </div>
          </template>
        </Multiselect>
        <Multiselect v-if="selectedTab === 'Rcode'" @change="filterDataTable('Rcode')" class="w-125px"
                     v-model="selectedCurrencyRcode.value" v-bind="selectedCurrencyRcode">
          <template v-slot:singlelabel="{ value }">
            <div class="multiselect-single-label d-flex gap-2">
              <img class="character-label-icon w-20px" :src="getAssetPath(`media/crypto/${value.value}.svg`)"
                   :alt="value.value">
              <p class="my-0 text-gray-800">{{ value.value }}</p>
            </div>
          </template>
          <template v-slot:option="{ option }">
            <div class="d-flex justify-content-between w-100">
              <div class="d-flex gap-2">
                <img class="character-label-icon w-20px " :src="getAssetPath(`media/crypto/${option.value}.svg`)"
                     :alt="option.value">
                <p class="my-0 text-gray-800">{{ option.value }}</p>
              </div>
            </div>
          </template>
        </Multiselect>
      </div>
      <!--begin::Toolbar-->
      <div class="card-toolbar card-toolbar-deposit m-0 pb-1 mt-3 mt-lg-0">
        <!--begin::Tab nav-->
        <ul
            class="nav nav-stretch fs-4 text-black fw-semobold nav-line-tabs nav-line-tabs border-transparent flex-lg-nowrap"
            role="tablist"
        >
          <li class="nav-item" role="presentation">
            <a
                id="withdraw_history_tab_1"
                class="nav-link text-active-dark pb-4 pt-0 fw-bold active"
                data-bs-toggle="tab"
                role="tab"
                href="#withdraw_history_crypto"
                v-on:click="changeTab('Crypto')"
            >
              {{ $t('withdraw.crypto') }}
            </a>
          </li>

          <li class="nav-item" role="presentation">
            <a
                id="withdraw_history_tab_2"
                class="nav-link text-active-dark ms-3 pb-4 pt-0 fw-bold ms-6"
                data-bs-toggle="tab"
                role="tab"
                href="#withdraw_history_fiat"
                v-on:click="changeTab('Fiat')"
            >
              {{ $t('withdraw.fiat') }}
            </a>
          </li>

          <li class="nav-item" role="presentation">
            <a
                id="withdraw_history_tab_3"
                class="nav-link text-active-dark ms-3 pb-4 pt-0 fw-bold ms-6"
                data-bs-toggle="tab"
                role="tab"
                href="#withdraw_history_rcode"
                v-on:click="changeTab('Rcode')"
            >
              {{ $t('withdraw.rcode') }}
            </a>
          </li>
        </ul>
        <!--end::Tab nav-->
      </div>
      <!--end::Toolbar-->
    </div>
    <div class="card-body pt-0">
      <div id="withdraw_hystory_content" class="tab-content">
        <div
            id="withdraw_history_crypto"
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
            <template v-slot:createTime="{ row: withdraws }">
              <div class="d-flex text-gray-800 flex-column justify-content-center">
                {{ formatDate(withdraws.createTime) }}
              </div>
            </template>
            <template v-slot:unit="{ row: withdraws }">
              <div class="d-flex align-items-center lh-1">
                <div class="me-2 symbol symbol-15px">
                  <img
                      :alt=withdraws.unit
                      :src="getAssetPath('media/crypto/'+ withdraws.unit + '.svg')"
                  />
                </div>
                <div class="text-gray-800">
                  <p class="text-center m-0">{{ withdraws.unit }} </p>
                </div>
              </div>
            </template>
            <template v-slot:totalAmount="{ row: withdraws }">
              <div class="d-flex text-gray-800 flex-column justify-content-center">
                {{ numberFormatting(withdraws.totalAmount) }}
              </div>
            </template>
            <template v-slot:address="{ row: withdraws }">
              <div class="d-flex text-black align-items-center">
                <span>{{ maskText(withdraws.address) }}</span>
                <el-popover
                    placement="top"
                    :content=withdraws.address
                    popper-class="w-auto tooltip-history"
                >
                  <template #reference>
                    <button class="btn btn-light btn-icon btn-sm btn-history ms-4">
                      <i class="ki-solid fs-6" :class="[showAddress[withdraws.createTime] ? 'ki-eye-slash' : 'ki-eye']"></i>
                    </button>
                  </template>
                </el-popover>
                <button
                    class="btn btn-light btn-icon btn-sm btn-history ms-2"
                >
                  <i class="ki-solid ki-magnifier fs-6"></i>
                </button>
                <button
                    :data-clipboard-text="withdraws.address"
                    id="copyButton" @click="copyToClipboard"
                    class="btn btn-light btn-icon btn-sm btn-history ms-2"
                >
                  <i class="ki-solid ki-copy fs-6"></i>
                </button>
              </div>
            </template>
<!--            <template v-slot:txid="{ row: withdraws }">-->
<!--              <div class="d-flex text-black align-items-center">-->
<!--                <span>{{ maskText(withdraws.txid) }}</span>-->
<!--                <span class="position-relative">-->
<!--                  <button class="btn btn-light btn-icon btn-sm btn-history ms-4"-->
<!--                          @click="showText[withdraws.id] = !showText[withdraws.id]">-->
<!--                    <i class="ki-solid fs-6" :class="[showText[withdraws.id] ? 'ki-eye-slash' : 'ki-eye']"></i>-->
<!--                  </button>-->
<!--                  <v-tooltip class="tooltip-history badge badge-lg" v-if="showText[withdraws.id]">{{-->
<!--                      withdraws.txid-->
<!--                    }}</v-tooltip>-->
<!--                </span>-->
<!--                <button-->
<!--                    class="btn btn-light btn-icon btn-sm btn-history ms-2"-->
<!--                >-->
<!--                  <i class="ki-solid ki-magnifier fs-6"></i>-->
<!--                </button>-->
<!--                <button-->
<!--                    :data-clipboard-text="withdraws.txid"-->
<!--                    id="copyButton" @click="copyToClipboard"-->
<!--                    class="btn btn-light btn-icon btn-sm btn-history ms-2"-->
<!--                >-->
<!--                  <i class="ki-solid ki-copy fs-6"></i>-->
<!--                </button>-->
<!--              </div>-->
<!--            </template>-->
            <template v-slot:status="{ row: withdraws }">
              <div class="d-flex text-gray-600 flex-column justify-content-center">
                <div v-if="withdraws.status === 0">
                  <span class="badge badge-light-primary badge-lg">{{ $t('status.inProgress') }}</span>
                </div>
                <div v-if="withdraws.status === 1">
                  <span class="badge badge-light-warning badge-lg">{{ $t('status.await') }}</span>
                </div>
                <div v-else-if="withdraws.status === 2">
                  <span class="badge badge-light-danger badge-lg">{{ $t('status.cancel') }}</span>
                </div>
                <div v-else-if="withdraws.status === 3">
                  <span class="badge badge-light-success badge-lg">{{ $t('status.success') }}</span>
                </div>
                <div v-if="withdraws.status === 4">
                  <span class="badge badge-light-warning badge-lg">{{ $t('status.cancelUser') }}</span>
                </div>
              </div>
            </template>
          </Datatable>
        </div>
        <div
            id="withdraw_history_fiat"
            class="py-0 tab-pane fade"
            role="tabpanel"
        >
          <Datatable
              :data="dataFiat"
              :header="tableHeaderFiat"
              :itemsPerPageDropdownEnabled="false"
              :checkbox-enabled="false"
              :itemsPerPage=7
              class="table-active-orders"
              :show-total-count="true"
              empty-table-text="Данные не найдены"
          >
            <template v-slot:createTime="{ row: withdraws }">
              <div class="d-flex text-gray-800 flex-column justify-content-center">
                {{ formatDate(withdraws.creationTime) }}
              </div>
            </template>
            <template v-slot:unit="{ row: withdraws }">
              <div class="d-flex align-items-center lh-1">
                <div class="me-2 symbol symbol-15px">
                  <img
                      :alt=withdraws.unit
                      :src="getAssetPath('media/crypto/'+ withdraws.unit + '.svg')"
                  />
                </div>
                <div class="text-gray-800">
                  <p class="text-center m-0">{{ withdraws.unit }} </p>
                </div>
              </div>
            </template>
            <template v-slot:amount="{ row: withdraws }">
              <div class="d-flex text-gray-800 flex-column justify-content-center">
                {{ numberFormatting(withdraws.amount) }}
              </div>
            </template>
            <template v-slot:remark="{ row: withdraws }">
              <div class="d-flex text-gray-800 flex-column justify-content-center">
                {{ withdraws.remark }}
              </div>
            </template>
            <template v-slot:status="{ row: withdraws }">
              <div class="d-flex text-gray-600 flex-column justify-content-center">
                <div v-if="withdraws.status === 0">
                  <span class="badge badge-light-primary badge-lg">{{ $t('status.await') }}</span>
                </div>
                <div v-if="withdraws.status === 1">
                  <span class="badge badge-light-primary badge-lg">{{ $t('status.acceptProcessing') }}</span>
                </div>
                <div v-else-if="withdraws.status === 2">
                  <span class="badge badge-light-primary badge-lg">{{ $t('status.waitConfirm') }}</span>
                </div>
                <div v-else-if="withdraws.status === 3">
                  <span class="badge badge-light-success badge-lg">{{ $t('status.success') }}</span>
                </div>
                <div v-if="withdraws.status === 4">
                  <span class="badge badge-light-danger badge-lg">{{ $t('status.cancel') }}</span>
                </div>
                <div v-if="withdraws.status === 5">
                  <span class="badge badge-light-warning badge-lg">{{ $t('status.cancelUser') }}</span>
                </div>
              </div>
            </template>
          </Datatable>
        </div>
        <div
            id="withdraw_history_rcode"
            class="py-0 tab-pane fade"
            role="tabpanel"
        >
          <Datatable
              :data="dataRCode"
              :header="tableHeaderRcode"
              :itemsPerPageDropdownEnabled="false"
              :checkbox-enabled="false"
              :itemsPerPage=7
              class="table-active-orders"
              :show-total-count="true"
              empty-table-text="Данные не найдены"
          >
            <template v-slot:createTime="{ row: withdraws }">
              <div class="d-flex text-gray-800 flex-column justify-content-center">
                {{ formatDate(withdraws.createTime) }}
              </div>
            </template>
            <template v-slot:unit="{ row: withdraws }">
              <div class="d-flex align-items-center lh-1">
                <div class="me-2 symbol symbol-15px">
                  <img
                      :alt=withdraws.unit
                      :src="getAssetPath('media/crypto/'+ withdraws.unit + '.svg')"
                  />
                </div>
                <div class="text-gray-800">
                  <p class="text-center m-0">{{ withdraws.unit }} </p>
                </div>
              </div>
            </template>
            <template v-slot:amount="{ row: withdraws }">
              <div class="d-flex text-gray-800 flex-column justify-content-center">
                {{ withdraws.amount }}
              </div>
            </template>
            <template v-slot:withdrawCode="{ row: withdraws }">
              <div class="d-flex text-gray-800 align-items-center">
                <span>{{ maskText(withdraws.withdrawCode) }}</span>
                <el-popover
                    placement="top"
                    :trigger="['hover', 'click']"
                    :content=withdraws.withdrawCode
                    popper-class="w-auto tooltip-history"
                >
                  <template #reference>
                    <button class="btn btn-light btn-icon btn-sm btn-history ms-4">
                      <i class="ki-solid fs-6 ki-eye"></i>
                    </button>
                  </template>
                </el-popover>
                <button
                    :data-clipboard-text="withdraws.withdrawCode"
                    id="copyButton" @click="copyToClipboard"
                    class="btn btn-light btn-icon btn-sm btn-history ms-2"
                >
                  <i class="ki-solid ki-copy fs-6"></i>
                </button>
              </div>
            </template>
            <template v-slot:status="{ row: rcodes }">
              <div class="d-flex text-gray-600 flex-column justify-content-center">
                <div v-if="rcodes.status === 0">
                  <span class="badge badge-light-primary badge-lg">{{ getStatusRCode(rcodes.status) }}</span>
                </div>
                <div v-else-if="rcodes.status === 1">
                  <span class="badge badge-light-warning badge-lg">{{ getStatusRCode(rcodes.status) }}</span>
                </div>
                <div v-else-if="rcodes.status === 2">
                  <span class="badge badge-light-warning badge-lg">{{ getStatusRCode(rcodes.status) }}</span>
                </div>
                <div v-else-if="rcodes.status === 3">
                  <span class="badge badge-light-success badge-lg">{{ getStatusRCode(rcodes.status) }}</span>
                </div>
                <div v-else-if="rcodes.status === 4">
                  <span class="badge badge-light-danger badge-lg">{{ getStatusRCode(rcodes.status) }}</span>
                </div>
                <div v-else>
                  <span class="badge badge-light badge-lg">{{ $t('status.noResult') }}</span>
                </div>
              </div>
            </template>
          </Datatable>
        </div>
      </div>
    </div>
  </div>

</template>

<script lang="ts">
import {getAssetPath} from "@/core/helpers/assets";
import {computed, defineComponent, onMounted, reactive, ref, watch} from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import ClipboardJS from "clipboard";
import {ElMessage} from 'element-plus';
import Multiselect from '@vueform/multiselect';
import ApiService from "@/core/services/ApiService";
import Api from "@/config/api";
import {useWithdrawStore} from "@/stores/withdraw";
import {useI18n} from "vue-i18n";

export default defineComponent({
  name: "withdraw-history",
  components: {
    Datatable,
    Multiselect,
  },
  setup() {
    const showText = reactive({});
    const showAddress = reactive({});
    const showCode = reactive({});
    const showRCode = reactive({});
    const store = useWithdrawStore();
    const { t } = useI18n();
    const tableHeaderCrypto = computed( () => ([
      {
        columnName: t('withdraw.time'),
        columnLabel: "createTime",
        sortEnabled: false,
      },
      {
        columnName: t('withdraw.currency'),
        columnLabel: "unit",
        sortEnabled: false,
      },
      {
        columnName: t('withdraw.total'),
        columnLabel: "totalAmount",
        sortEnabled: false,
      },
      {
        columnName: t('deposit.addressDeposit'),
        columnLabel: "address",
        sortEnabled: false,
      },
      // {
      //   columnName: "TXID",
      //   columnLabel: "txid",
      //   sortEnabled: false,
      // },
      {
        columnName: t('withdraw.status'),
        columnLabel: "status",
        sortEnabled: false,
      },
    ]));
    const tableHeaderFiat = computed( () => ([
      {
        columnName: t('withdraw.time'),
        columnLabel: "createTime",
        sortEnabled: false,
      },
      {
        columnName: t('withdraw.currency'),
        columnLabel: "unit",
        sortEnabled: false,
      },
      {
        columnName: t('withdraw.total'),
        columnLabel: "amount",
        sortEnabled: false,
      },
      {
        columnName: t('withdraw.note'),
        columnLabel: "remark",
        sortEnabled: false,
      },
      {
        columnName: t('withdraw.status'),
        columnLabel: "status",
        sortEnabled: false,
      },
    ]));
    const tableHeaderRcode = computed( () => ([
      {
        columnName: t('withdraw.time'),
        columnLabel: "createTime",
        sortEnabled: false,
      },
      {
        columnName: t('withdraw.currency'),
        columnLabel: "unit",
        sortEnabled: false,
      },
      {
        columnName: t('withdraw.total'),
        columnLabel: "amount",
        sortEnabled: false,
      },
      {
        columnName: t('withdraw.code'),
        columnLabel: "withdrawCode",
        sortEnabled: false,
      },
      {
        columnName: t('withdraw.status'),
        columnLabel: "status",
        sortEnabled: false,
      },
    ]));

    return {
      getAssetPath,
      showText,
      showAddress,
      showCode,
      showRCode,
      store,
      tableHeaderCrypto,
      tableHeaderFiat,
      tableHeaderRcode,
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
      selectedCurrencyFiat: {
        value: "",
        placeholder: "Валюта",
        options: [],
      },
      selectedCurrencyRcode: {
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
    };
  },

  methods: {
    currentUnit(unit) {
      return this.fullDataSelected.filter(item => item["unit"] === unit)[0]
    },
    async filterDataTable(table) {
      await table;
      if (table === "Crypto") {
        this.selectedCurrencyCrypto.value ? this.dataCrypto = this.additionalDataCrypto.filter(item => item["unit"].includes(this.selectedCurrencyCrypto.value)) : this.dataCrypto = this.additionalDataCrypto;
      } else if (table === "Fiat") {
        this.selectedCurrencyFiat.value ? this.dataFiat = this.additionalDataFiat.filter(item => item["symbol"].includes(this.selectedCurrencyFiat.value)) : this.dataFiat = this.additionalDataFiat;
      } else if (table === "Rcode") {
        this.selectedCurrencyRcode.value ? this.dataRCode = this.additionalDataRCode.filter(item => item["unit"].includes(this.selectedCurrencyRcode.value)) : this.dataRCode = this.additionalDataRCode;
      }
    },
    numberFormatting(number) {
      return new Intl.NumberFormat("ru", {style: "decimal", maximumFractionDigits: 2}).format(number);
    },
    init() {
      ApiService.setHeader();
      this.getDataUnit();
      this.getDataCrypto();
      this.getDataFiat();
      this.getDataRCode();
    },
    getDataUnit() {
      ApiService.post(Api.uc.rechargeable, "").then(response => {
        this.selectedCurrencyCrypto.options = response.data.data.coins.filter(item => !item.isFiat).map(coin => coin.unit);
        this.selectedCurrencyFiat.options = response.data.data.coins.filter(item => item.isFiat).map(coin => coin.unit);
        this.selectedCurrencyRcode.options = response.data.data.coins.map(coin => coin.unit);
        this.fullDataSelected = response.data.data.coins;
      }).catch(response => {
        ElMessage.error(response.data.message)
      });
    },
    async getDataRCode() {
      await this.store.getDataRCode(this.store.user, 1, 20);
      this.dataRCode = this.additionalDataRCode = this.store.user.dataRCode["data"]["content"];
    },
    async getDataFiat() {
      await this.store.getDataFiat(this.store.user, 1, 20);
      this.dataFiat = this.additionalDataFiat = this.store.user.dataFiat["data"]["content"];
    },
    async getDataCrypto() {
      await this.store.getDataCrypto(this.store.user, 0, 10);
      this.dataCrypto = this.additionalDataCrypto = this.store.user.dataCrypto["data"]["content"];
    },
    getStatusRCode(number: number) {
      return number === 0 ? "В процессе" : number === 1 ? "Ожидание" : number === 2 ? "Ошибка" : number === 3 ? "Успешно"
          : number === 4 ? "Отмена пользователем" : number
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
  watch: {
    dataCryptoUpdate() {
      this.selectedCurrencyCrypto.value = "";
      this.dataCrypto = this.additionalDataCrypto = this.store.user.dataCrypto["data"]["content"];
    },
    dataFiatUpdate() {
      this.selectedCurrencyFiat.value = "";
      this.dataFiat = this.additionalDataFiat = this.store.user.dataFiat["data"]["content"];
    },
    dataRCodeUpdate() {
      this.selectedCurrencyRcode.value = "";
      this.dataRCode = this.additionalDataRCode = this.store.user.dataRCode["data"]["content"];
    },
    cryptoUpdate() {
      this.getDataCrypto();
    },
    fiatUpdate() {
      this.getDataFiat();
    },
    rcodeUpdate() {
      this.getDataRCode();
    }
  },
  computed: {
    dataCryptoUpdate() {
      return this.store.user.dataCrypto;
    },
    dataFiatUpdate() {
      return this.store.user.dataFiat;
    },
    dataRCodeUpdate() {
      return this.store.user.dataRCode;
    },
    cryptoUpdate() {
      return this.store.withdraw.crypto;
    },
    fiatUpdate() {
      return this.store.withdraw.fiat;
    },
    rcodeUpdate() {
      return this.store.withdraw.rcode;
    },
  },
  created() {
    this.init();
  },
});
</script>

<style lang="scss">
.multiselect-options {
  overflow-y: auto;
}
</style>