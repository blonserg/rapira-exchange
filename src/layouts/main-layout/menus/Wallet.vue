<template>
  <!--begin::Menu-->
  <div
      class="menu menu-sub menu-sub-dropdown menu-column  hover-scroll-overlay-x w-450px w-lg-550px"
      data-kt-menu="true"
      data-kt-scroll="true"
      data-kt-scroll-activate="true"
      data-kt-scroll-offset="5px"
      data-kt-scroll-save-state="true"
  >
    <div class="card">
      <div class="card-body p-0">

        <div class="d-flex justify-content-between align-items-center">
          <div class="pt-6 px-9 pb-5">
            <div class="d-none d-md-flex flex-column align-self-start">
              <span class="fw-semibold text-muted fs-7 lh-1">
                Всего средств ≈
              </span>
              <div v-if="!showAllBalance" class="fw-bold fs-4">
                {{ totalUSDT }} USDT
              </div>
              <div v-else class="fw-bold d-flex align-items-center fs-4 text-gray-700">
                ****
              </div>
            </div>
          </div>
          <div @click="toggleShow" class="form-check form-switch form-check-custom form-check-solid p-0 pe-9">
            <label class="text-gray-700 fs-7 fw-bold m-0 pe-2 cursor-pointer" for="flexSwitchDefault">
              Скрыть балансы
            </label>
            <input v-model="showAllBalance" class="form-check-input cursor-pointer h-20px w-30px" type="checkbox" value="showAllBalance"
                   id=""/>
          </div>
        </div>

        <!--begin:hr content-->
        <div class="menu-item">
          <div style="border-top: 1px solid #E1E3EA">
          </div>
        </div>
        <!--end:hr content-->

        <!--begin:body content-->
        <div class="px-9 pt-4 pb-6">
          <div class="fw-semibold text-muted fs-6">Фиат и stable-койны</div>
          <!--begin:wallet content-->
          <div v-for="currency in getTwoElements(dataFiat)"
               class="d-flex justify-content-between align-items-center pt-5">

            <!--begin:currency content-->
            <div class="d-flex align-items-center">
              <div class="me-2 position-relative">
                <div class="symbol symbol-40px">
                  <img
                      :alt=currency.name
                      :src="getAssetPath('media/crypto/'+ currency.unit + '.svg')"
                  />
                </div>
              </div>
              <div class="d-flex fw-bold text-gray-800 fs-4 flex-column justify-content-center">
                {{ currency.unit }}
                <span class="fw-semibold text-gray-500 fs-7 lh-1">
                   {{ currency.name }}
                </span>
              </div>
            </div>
            <!--end:currency content-->

            <div class="d-flex text-gray-700">
              <!--begin:balance content-->
              <div v-if="!showAllBalance"
                   class="d-flex fw-semibold text-gray-800 flex-column justify-content-center pe-4 align-items-end fs-4">
                {{ numberFormatting(currency.balance, currency.coinScale) }}
                <span class="fw-semibold text-gray-500 fs-7 lh-1">
              ≈ {{ numberFormatting(currency.balance * currency.rubRate, 2) }} ₽
            </span>
              </div>
              <!--end:balance content-->

              <!--begin:buttons content-->
              <div class="d-flex justify-content-end align-items-center">
                <router-link
                    to="/wallet/deposit"
                    class="btn btn-primary btn-sm fw-bold me-3 w-100px px-1"
                    @click="setCurrent(currency.unit, 'deposit')"
                >{{ $t('button.deposit') }}</router-link>
                <router-link
                    to="/wallet/withdraw"
                    class="btn btn-primary btn-sm fw-bold w-100px px-1"
                    @click="setCurrent(currency.unit, 'withdraw')"
                >{{ $t('button.withdraw') }}</router-link>
              </div>
              <!--end:buttons content-->
            </div>

          </div>
          <!--end:wallet content-->

          <div class="fw-semibold text-muted fs-6 pt-5">Криптовалюты</div>
          <!--begin:wallet content-->
          <div v-for="currency in getTwoElements(dataCrypto)"
               class="d-flex justify-content-between align-items-center pt-5">

            <!--begin:currency content-->
            <div class="d-flex align-items-center">
              <div class="me-3 position-relative">
                <div class="symbol symbol-40px">
                  <img
                      :alt=currency.name
                      :src="getAssetPath('media/crypto/'+ currency.unit + '.svg')"
                  />
                </div>
              </div>
              <div class="d-flex fw-bold text-gray-800 fs-4 flex-column justify-content-center">
                {{ currency.unit }}
                <span class="fw-semibold text-gray-500 fs-7 lh-1">
                   {{ currency.name }}
              </span>
              </div>
            </div>
            <!--end:currency content-->

            <div class="d-flex">
              <!--begin:balance content-->
              <div v-if="!showAllBalance"
                   class="d-flex fw-semibold text-gray-800 flex-column justify-content-center pe-4 align-items-end fs-4">
                {{ numberFormatting(currency.balance, currency.coinScale) }}
                <span class="fw-semibold text-gray-500 fs-7 lh-1">
              ≈ {{ numberFormatting(currency.balance * currency.rubRate, 2) }} ₽
            </span>
              </div>
              <!--end:balance content-->

              <!--begin:buttons content-->
              <div class="d-flex justify-content-end align-items-center">
                <router-link
                    to="/wallet/deposit"
                    class="btn btn-primary btn-sm fw-bold me-3 w-100px px-1"
                    @click="setCurrent(currency.unit, 'deposit')"
                >{{ $t('button.deposit') }}</router-link>
                <router-link
                    to="/wallet/withdraw"
                    class="btn btn-primary btn-sm fw-bold w-100px px-1"
                    @click="setCurrent(currency.unit, 'withdraw')"
                >{{ $t('button.withdraw') }}</router-link>
              </div>
              <!--end:buttons content-->
            </div>

          </div>
          <!--end:wallet content-->

          <div
              class="text-center text-primary bg-hover-light-primary text-hover-primary bg-opacity-10 bg-primary p-2 mt-6 rounded-3 cursor-pointer fw-semibold"
              @click="onClickShowBalance" v-if="dataCrypto.length > 2 || dataFiat.length > 2">
            {{ textBalance }}
          </div>
        </div>
        <!--end:body content-->

      </div>
    </div>
  </div>

</template>

<script lang="ts">
import {getAssetPath, getIllustrationsPath} from "@/core/helpers/assets";
import {computed, defineComponent} from "vue";
import {useBasicRequest} from "@/stores/basicRequests";
import {useDepositStore} from "@/stores/deposit";
import {useWithdrawStore} from "@/stores/withdraw";

export default defineComponent({
  name: "wallet",
  components: {},
  data() {
    return {
      showAll: false,
      showAllBalance: false,
      textBalance: 'Показать все кошельки',
    }
  },
  props: {
    totalUSDT: {
      type: String,
      default: 0
    }
  },
  mounted() {
    const storedValue = localStorage.getItem('showAllBalance');
    if (storedValue) {
      this.showAllBalance = JSON.parse(storedValue);
    }
  },
  methods: {
    toggleShow() {
      this.showAllBalance = this.storeBasicRequest.showAllBalance = !this.showAllBalance;
      if(this.showAllBalance) {
        localStorage.setItem('showAllBalance', JSON.stringify(this.showAllBalance));
      } else {
        localStorage.setItem('showAllBalance', "");
      }
    },
    numberFormatting(number, count) {
      return new Intl.NumberFormat("ru", {style: "decimal", maximumFractionDigits: count}).format(number);
    },
    getTwoElements(array) {
      if (!this.showAll) {
        return array.slice(0, 2);
      } else return array;
    },
    onClickShowBalance() {
      this.showAll = !this.showAll;
      if (!this.showAll) {
        this.textBalance = "Показать все кошельки"
      } else if (this.showAll) {
        this.textBalance = "Скрыть"
      }
    },
    closeModal() {
      document.getElementById('wallet-modal')?.click();
    },
    setCurrent(data, direction) {
      direction === 'deposit' ? this.storeDeposit.setCurrent(data) : this.storeWithdraw.setCurrent(data);
      this.closeModal();
    },
  },
  setup() {
    const storeBasicRequest = useBasicRequest();
    const storeDeposit = useDepositStore();
    const storeWithdraw = useWithdrawStore();
    let cryptoData = computed<[]>(() => storeBasicRequest.wallet);
    let dataFiat = computed<[]>(() => storeBasicRequest.wallet.filter(item => item.isFiat || item.isStableCoin));
    let dataCrypto = computed<[]>(() => storeBasicRequest.wallet.filter(item => !item["isFiat"] && !item["isStableCoin"]));

    return {
      getIllustrationsPath,
      getAssetPath,
      storeBasicRequest,
      cryptoData,
      dataFiat,
      dataCrypto,
      storeDeposit,
      storeWithdraw,
    };
  },
  created() {},
});
</script>
