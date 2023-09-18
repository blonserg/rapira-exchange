<template>
  <div class="card">
    <div class="card-header border-0 pt-6 d-flex flex-column flex-md-row justify-space-between align-items-sm-start align-items-md-center">
      <h3 class="fs-3 fw-bold lh-md mb-0">
        {{ $t('widgetActive.title') }}
      </h3>
      <!--begin::Card title-->
      <div class="card-title flex-wrap">
        <!--begin::Select-->
        <span class="fw-semibold text-gray-400 fs-6">
          {{ $t('widgetActive.show') }}
        </span>
        <a
            href="#"
            class="btn btn-sm btn-bg-body btn-active-light-primary me-12"
            data-kt-menu-trigger="click"
            data-kt-menu-placement="bottom-end"
            data-kt-menu-flip="top-end"
        >{{ selectedOption }}
          <KTIcon icon-name="down" icon-class="fs-5 m-0" />
        </a>
        <!--begin::Menu-->
        <div
            class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semobold fs-7 w-125px py-4"
            data-kt-menu="true"
        >
          <!--begin::Menu item-->
          <div class="menu-item px-3" @click="chooseMainCur('Все')">
            <a :class="{'menu-link': true, 'active': selectedOption === 'Все'}" class="menu-link px-3"
            >{{ $t('widgetActive.filterAll') }}</a
            >
          </div>
          <!--end::Menu item-->
          <!--begin::Menu item-->
          <div class="menu-item px-3" @click="chooseMainCur('Фиат')">
            <a :class="{'menu-link': true, 'active': selectedOption === 'Фиат'}" class="menu-link px-3"
            >{{ $t('widgetActive.filterFiat') }}</a
            >
          </div>
          <div class="menu-item px-3" @click="chooseMainCur('Stable-coins')">
            <a :class="{'menu-link': true, 'active': selectedOption === 'Stable-coins'}" class="menu-link px-3"
            >{{ $t('widgetActive.filterStable') }}</a
            >
          </div>
          <div class="menu-item px-3" @click="chooseMainCur('Криптовалюты (все)')">
            <a :class="{'menu-link': true, 'active': selectedOption === 'Криптовалюты (все)'}" class="menu-link px-3"
            >{{ $t('widgetActive.filterCrypto') }}</a
            >
          </div>
          <div class="menu-item px-3" @click="chooseMainCur('Криптовалюты (кроме stable)')">
            <a :class="{'menu-link': true, 'active': selectedOption === 'Криптовалюты (кроме stable)'}" class="menu-link px-3"
            >{{ $t('widgetActive.filterCryptoWithout') }}</a
            >
          </div>
          <!--end::Menu item-->
        </div>
        <!--end::Menu-->
        <!--end::Select-->
        <!--begin::Search-->
        <div class="d-flex align-items-center position-relative my-1">
          <KTIcon
              icon-name="magnifier"
              icon-class="fs-4 position-absolute ms-6"
          />
          <input
              type="text"
              v-model="search"
              @input="searchItems()"
              class="form-control fs-6 w-200px ps-15"
              placeholder="Search"
          />
        </div>
        <!--end::Search-->
      </div>
    </div>
    <div class="card-body pt-0 pb-10">
<!--                @on-sort="sort"-->
      <Datatable
          :data="dataCrypto"
          :header="tableHeader"
          :itemsPerPageDropdownEnabled="false"
          :checkbox-enabled="false"
          :itemsPerPage=3
          empty-table-text="Данные не найдены"
      >
        <template v-slot:name="{ row: currency }">
          <div class="d-flex align-items-center">
            <div class="me-5 position-relative">
              <div class="symbol symbol-30px">
                <img
                    :alt=currency.name
                    :src="getAssetPath('media/crypto/'+ currency.unit + '.svg')"
                />
              </div>
            </div>
            <div class="d-flex text-gray-800 flex-column justify-content-center">
              {{ currency.name }}
              <span class="fw-semibold text-gray-400">
                {{ currency.unit }}
              </span>
            </div>
          </div>
        </template>
        <template v-slot:balance="{ row: currency }">
          <div class="d-flex text-gray-800  flex-column justify-content-center">
            {{ numberFormatting(currency.balance, currency.coinScale) }} {{ currency.unit }}
            <span class="fw-semibold text-gray-400">
              ≈ {{ numberFormatting(currency.balance * currency.rubRate, 2) }} ₽
            </span>
          </div>
        </template>
        <template v-slot:frozenBalance="{ row: currency }">
          <div class="d-flex text-gray-800  flex-column justify-content-center">
            {{ numberFormatting(currency.frozenBalance, currency.coinScale) }} {{ currency.unit }}
            <span class="fw-semibold text-gray-400">
              ≈ {{ numberFormatting(currency.frozenBalance * currency.rubRate, 2) }} ₽
            </span>
          </div>
        </template>
        <template v-slot:actions="{ row: currency }">
          <div class="d-flex justify-content-end">
            <a
                href="#"
                class="btn btn-primary btn-sm fw-bold me-4 w-100px px-0"
            >{{ $t('button.deposit') }}</a>
            <a
                href="#"
                class="btn btn-primary btn-sm fw-bold w-100px px-0"
            >{{ $t('button.withdraw') }}</a>
          </div>
        </template>
      </Datatable>
    </div>
  </div>

</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { computed, defineComponent } from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import { useI18n } from 'vue-i18n';
import {useBasicRequest} from "@/stores/basicRequests";

export default defineComponent({
  name: "customers-listing",
  components: {
    Datatable,
  },
  setup() {
    const store = useBasicRequest();
    const { t } = useI18n();
    const tableHeader = computed( () => ([
      {
        columnName: t('widgetActive.currency'),
        columnLabel: "name",
        sortEnabled: true,
        columnWidth: 125,
      },
      {
        columnName: t('widgetActive.available'),
        columnLabel: "balance",
        sortEnabled: false,
        columnWidth: 125,
      },
      {
        columnName: t('widgetActive.freeze'),
        columnLabel: "frozenBalance",
        sortEnabled: false,
        columnWidth: 125,
      },
      {
        columnName: "",
        columnLabel: "actions",
        sortEnabled: false,
        columnWidth: 135,
      },
    ]));

    let cryptoData = computed<[]>(() => store.wallet);

    return {
      store,
      getAssetPath,
      tableHeader,
      cryptoData,
    };
  },
  data() {
    return{
      dataCrypto: [], // основной массив
      additionalDataCrypto: [], // здесь хранятся данные от выбранного фильтра, чтобы не сломался поиск
      search: "",
      selectedOption: "Все"
    }
  },
  methods: {
    numberFormatting(number, count) {
      return new Intl.NumberFormat("ru", { style: "decimal", maximumFractionDigits: count }).format(number);
    },
    chooseMainCur(value) {
      this.selectedOption = value;
      if(this.selectedOption === "Фиат") {
        this.dataCrypto = this.additionalDataCrypto = this.cryptoData.filter(item => item["isFiat"]);
      } else if(this.selectedOption === "Stable-coins") {
        this.dataCrypto = this.additionalDataCrypto = this.cryptoData.filter(item => item["isStableCoin"])
      } else if(this.selectedOption === "Криптовалюты (все)") {
        this.dataCrypto = this.additionalDataCrypto = this.cryptoData.filter(item => !item["isFiat"])
      } else if(this.selectedOption === "Криптовалюты (кроме stable)") {
        this.dataCrypto = this.additionalDataCrypto = this.cryptoData.filter(item => !item["isFiat"] && !item["isStableCoin"])
      } else {
        this.dataCrypto = this.cryptoData;
      }

    },
    searchItems() {
      this.dataCrypto.splice(0, this.dataCrypto.length, ...this.dataCrypto);
      if (this.search !== "") {
        let results = [];
          for (let j = 0; j < this.cryptoData.length; j++) {
            let unit:string = this.cryptoData[j]["unit"];
            let name:string = this.cryptoData[j]["name"];
            let regExp = new RegExp(this.search, "gi");
            const isIt = unit.match(regExp) || name.match(regExp);
            if (isIt) {
              results.push(this.cryptoData[j]);
            }
          }
        this.dataCrypto = [...results];
      } else {
        if (this.selectedOption === "Все") {
          this.dataCrypto = this.cryptoData;
        } else {
          this.dataCrypto = this.additionalDataCrypto;
        }
      }
    }
  },
  created() {
    this.dataCrypto = this.cryptoData;
  },
});
</script>
