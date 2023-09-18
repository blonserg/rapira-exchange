<template>
  <div class="card">
    <div class="card-header border-0 pt-9 d-flex flex-column">
    <section class="mw-800px w-100">
      <div class="d-flex flex-column">
        <h3 class="fs-3 fw-bold lh-md mb-5 me-lg-20">
          {{ $t('withdraw.addAddress') }}
        </h3>

        <div class="mb-8 gap-3 d-flex flex-wrap flex-md-nowrap justify-content-between align-items-center w-100 me-5">

          <div class="mw-400px w-100">
            <Multiselect class="address_multiselect" v-model="currentCoinUnit" v-bind="dataUnit" @change="changeCoin()">
              <template v-slot:singlelabel="{ value }">
                <div class="multiselect-single-label d-flex gap-2  align-items-center">
                  <img class="character-label-icon w-20px" :src="getAssetPath(`media/crypto/${value.value}.svg`)"
                       :alt="value.value">
                  <p class="my-0 text-gray-800">{{ value.value }}</p>
                  <p class="my-0 text-muted">{{ currentUnit(value.value).name }}</p>
                </div>
              </template>
              <template v-slot:option="{ option }">
                <div class="d-flex justify-content-between w-100">
                  <div class="d-flex gap-2">
                    <img class="character-label-icon w-20px " :src="getAssetPath(`media/crypto/${option.value}.svg`)"
                         :alt="option.value">
                    <p class="my-0 text-gray-800">{{ option.value }}</p>
                    <p class="my-0 text-muted">{{ currentUnit(option.value).name }}</p>
                  </div>
                  <p class="my-0 text-muted d-flex align-items-center">
                    {{
                      numberFormatting(unitBalance(option.value).balance, unitBalance(option.value)["coinScale"])
                    }}</p>
                </div>
              </template>
            </Multiselect>
          </div>

            <input
                v-model="address"
                type="text"
                class="form-control min-w-100px mw-400px fs-6"
                placeholder="Адрес кошелька"
            />
            <input
                v-model="remark"
                type="text"
                class="form-control min-w-100px mw-400px fs-6"
                placeholder="Примечание"
            />

          <button class="btn btn-primary mw-400px min-w-100px fs-7 w-100" @click="handleSubmit">{{ $t('button.add') }}</button>
        </div>
      </div>
    </section>


    </div>

  </div>

</template>

<script lang="ts">
import {getAssetPath} from "@/core/helpers/assets";
import {defineComponent, computed} from "vue";


import Multiselect from '@vueform/multiselect';
import ApiService from "@/core/services/ApiService";
import Api from "@/config/api";
import axios from "axios";
import {ElMessage} from "element-plus";
import {useBasicRequest} from "@/stores/basicRequests";


export default defineComponent({
  name: "withdrawal-application",
  components: {
    Multiselect,
  },
  setup() {
    let storeBasicRequest = useBasicRequest();

    let needVerification = computed(() => !storeBasicRequest.securitySetting.realName)

    let wallet = computed<[]>(() => storeBasicRequest.wallet)

    let balanceRub = computed<[]>(() => storeBasicRequest.wallet.filter(item => item.unit === "RUB")[0]["balance"])

    return {
      getAssetPath,
      storeBasicRequest,
      needVerification,
      wallet,
      balanceRub,
    };
  },
  data() {
    return {
      balanceRub: 0,
      mainAmountCrypto: 0,
      currentCoinUnit: "",
      currentMethodDeposit: "",
      address: "",
      remark: "",
      needVerification: false,
      title: "",
      wallet: [],
      paymentsTypeFiat: [] as any,
      paymentsTypeCrypto: [] as any,
      networks: [] as any,
      dataUnit: {
        placeholder: "Выберите валюту",
        options: [] as any,
        data: [],
      },
    };
  },
  methods: {
    init() {
      ApiService.setHeader();
      this.getDataUnit();
      this.getPaymentsTypeFiat();
    },
    changeCurrentMethodDeposit(name) {
      this.currentMethodDeposit = name;
      this.getMinAmountCrypto();
    },
    async changeCoin() {
      await this.changeCurrentMethodDeposit("");
      await this.getPaymentsTypeCrypto();
      await this.getMinAmountCrypto();
    },
    getMinAmountCrypto() {
      if (this.currentCoinUnit) {
        let coinName = this.currentUnit(this.currentCoinUnit);
        return this.networks.filter(item => item.name === coinName["name"])["min"];
      }
    },
    getPaymentsTypeCrypto() {
      if (this.currentCoinUnit) {
        let coinName = this.currentUnit(this.currentCoinUnit);
        this.paymentsTypeCrypto = this.networks.filter(item => coinName["name"] === item.coinName);
        this.paymentsTypeCrypto.push({
          coinName: "rCode",
          name: "rCode",
        })
      }
    },
    numberFormatting(number, count) {
      return new Intl.NumberFormat("ru", {style: "decimal", maximumFractionDigits: count}).format(number);
    },
    currentPaymentTypeFiat(paymentType) {
      return this.paymentsTypeFiat.filter(item => item.paymentName === paymentType)[0];
    },
    currentUnit(unit) {
      return this.dataUnit.data.filter(item => item["unit"] === unit)[0]
    },
    unitBalance(unit) {
      return this.wallet.filter(item => item["unit"] === unit)[0] || {
        balance: 0,
      }
    },
    getPaymentsTypeFiat() {
      // axios.get(Api.uc.paymentTypesRecharge).then(response => {
      //   this.paymentsTypeFiat = response.data.data;
      //   this.paymentsTypeFiat.push({
      //     paymentName: "rCode"
      //   })
      // }).catch(response => {
      //   ElMessage.error(response.data.message);
      // })
    },
    getDataUnit() {
      ApiService.post(Api.uc.rechargeable, "").then(response => {
        this.dataUnit.options = response.data.data.coins.filter(item => item["isFiat"]).map(coin => coin.unit);
        this.dataUnit.options = [...this.dataUnit.options, ...response.data.data.coins.filter(item => !item["isFiat"]).map(coin => coin.unit)]
        this.dataUnit.data = response.data.data.coins;
        this.networks = response.data.data.networks;
      }).catch(response => {
        ElMessage.error(response.data.message);
      });
    },
    handleSubmit() {
      if (!this.currentCoinUnit) {
        return ElMessage.error('Выберите валюту');
      } if (!this.address) {
        return ElMessage.error('Введите адрес');
      }
      let formData = new FormData;
      formData.append('address', this.currentCoinUnit);
      formData.append('address', this.remark);
      formData.append('address', this.address);
      ApiService.post(Api.uc.addAddress, formData);
      this.remark = '';
      this.address = '';
      console.log(formData);
    }
  },
  computed: {},
  created() {
    this.init();
  },
});
</script>
<style lang="scss">
.address_multiselect {
  width: 100%;
  min-width: 285px;
  max-width: 400px;
}
@media(max-width: 400px) {
  .address_multiselect {
    min-width: 100px;
  }
}

</style>