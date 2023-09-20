<template>
  <div class="mb-10">
    <div class="p2p-container">
      <div class="test-box">
<!--        <button @click="this.modal = !this.modal">Modal</button>-->
<!--        <lottieAnimate-->
<!--            :data="notifyData"-->
<!--            :height="100"-->
<!--            :width="350"-->
<!--            :modalTrigger="this.modal"-->
<!--        />-->
      </div>
    <p2pFilter/>
      <div class="p2p-body">
        <div class="table">

          <div class="table-row">
            <div class="table-col-head" style="margin-bottom: 15px;">Продавец</div>
            <div class="table-col-head">Комиссия продавца</div>
            <div class="table-col-head">Лимиты</div>
            <div class="table-col-head">Способы оплаты</div>
            <div class="table-col-head"></div>
          </div>

          <div class="table-row"  v-for="(advertisement, index ) of this.store.$state.advertisements.context" :key="index">
          <template v-if="advertisementActive != index">
            <div class="table-col-body">
              <div class="trade-box">
                <div class="trader-info">
                  <div class="trader-name">{{advertisement.member.username}} <div class="verify"><Verify width="12" height="12"/></div></div>

                </div>
                <div class="transactions-info">
                  <div class="transactions-quantity">

                    <span class="tittle">{{ advertisement.member.transactions }}  </span>
                    <span class="val"> cделок</span>
                    <span class="precent">{{ Math.round(advertisement.member.sellTransactions / advertisement.member.transactions * 100)}}% ⚡</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="table-col-body">
              <div class="content">{{ Math.round(advertisement.merchantFee * 100) }} %</div>
            </div>
            <div class="table-col-body">
              <div class="content">{{ numberFormatting(advertisement.minLimit) }} — {{ numberFormatting(advertisement.maxLimit) }} RUB</div>
            </div>
            <div class="table-col-body">
              <div class="payment-types">
                <span v-for="(payment, index) of advertisement.paymentTypes.slice(0, 2)" :key="index" :style="{'color':payment.color, 'background':payment.color + 11}">{{payment.paymentName}}</span>
                <span class="payment-vol" v-if="advertisement.paymentTypes.length - 2 > 0"> +{{ advertisement.paymentTypes.length - 2 }}</span>
              </div>
            </div>
            <div class="table-col-body">
              <div class="replenish-box">
                <button class="replenish btn-text" v-if="buySellToggle == 0" @click="this.store.$state.advertisementActive = index, merchantFee = advertisement.merchantFee, this.priceMinPrecent(), this.priceMaxPrecent">Пополнить</button>
                <button class="out" v-if="buySellToggle == 1" @click="this.store.$state.advertisementActive = index, merchantFee = advertisement.merchantFee, this.priceMinPrecent(), this.priceMaxPrecent">Вывести</button>
              </div>
            </div>
          </template>
            <div class="p2p-open" v-if="advertisementActive == index">
              <div class="p2p-box-info">
                <div class="box-info-trader">

                  <div class="box-trader-name">
                    iselanov <div class="verify"><Verify width="14" height="14"/></div>
                  </div>
<!--                  <div class="box-trader-status">Online</div>-->
                </div>

                <div class="transactions-quantity">
                  <span class="tittle">Сделок: </span>
                  <span class="val">{{ advertisement.transactions }}</span>
                  <span class="precent">89.47% выполнено</span>
                </div>

                <div class="payment-info">
                  <div class="payment-info-trader">
                    <div class="trader-commission">Комиссия продаца <span>{{ Math.round(advertisement.merchantFee * 100) }} %</span></div>
                    <div class="trader-payment-time">Оплата в течение <span>{{ advertisement.timeLimit }} минут</span></div>
                  </div>
                  <div class="trader-payment-types">Способы оплаты
                      <span v-for="(payment, index) of advertisement.paymentTypes" :key="index" :style="{'color':payment.color, 'background':payment.color + 11}">{{payment.paymentName}}</span>
                  </div>
                </div>

                <div class="trader-conditions">
                  <div class="conditions-tittle">Условия сделки</div>
                  <p>{{advertisement.remark}}</p>
                </div>

              </div>
              <div class="p2p-box-payment">

                <div class="payment-head">
                  <div class="payment-limit">
                    <div class="limit-text">Лимиты</div>
                    <div class="limit-quality">
                      <span v-if="advertisement.minLimit >= 1000000">{{ formatNumbers(advertisement.minLimit, '', '.', true, 2)  }}</span>
                      <span v-if="advertisement.minLimit < 1000000">{{ numberFormatting(advertisement.minLimit) }}</span>
                      —
                      <span v-if="advertisement.maxLimit < 1000000">{{ numberFormatting(advertisement.maxLimit)}}</span>
                      <span v-if="advertisement.maxLimit >= 1000000">{{ formatNumbers(advertisement.maxLimit, '', '.', true, 2)  }}</span>
                      RUB
                    </div>
                  </div>
                  <div class="payment-available" v-if="isAuthenticated">
                    <div class="available-text">Доступно </div>
                    <div class="available-quality">{{ formatNumbers(this.balance.balance, '', '.', true, 2)  }} RUB <router-link target='_blank' class="text-dark fw-semibold" to="/wallet/deposit"><i class="ki-solid ki-plus-circle text-primary fs-3"></i></router-link></div>
                  </div>
                </div>

                <div class="payment-body">
                  <div class="get-form-tittle" v-if="buySellToggle == 0">Получу на баланс биржи</div>
                  <div class="get-form-tittle" v-if="buySellToggle == 1">Спишется с баланса биржи</div>
                  <div class="input-group input-group-solid mb-3">
                    <input type="text" class="form-control" :placeholder="numberFormatting(advertisement.minLimit) + ' - ' + numberFormatting(advertisement.maxLimit)" @focus="minLimitActive = true, maxLimitActive = false" v-model="formData.minLimit" />
                    <div class="input-group-text" v-if="buySellToggle == 1 && isAuthenticated"><span class="change-all" @click="formData.maxLimit = this.balance.balance, minLimitActive = false, maxLimitActive = true, this.priceMaxPrecent()">Все</span></div>
                    <span class="input-group-text">{{ advertisement.unit }}</span>
                  </div>
                  <div class="give-form-tittle" v-if="buySellToggle == 0">Отдам продавцу</div>
                  <div class="give-form-tittle" v-if="buySellToggle == 1">Получу от продавца</div>
                  <div class="input-group input-group-solid mb-5">
                    <input type="text" class="form-control" :placeholder="numberFormatting(advertisement.minLimit) + ' - ' + numberFormatting(advertisement.maxLimit)" @focus="minLimitActive = false, maxLimitActive = true" v-model="formData.maxLimit"/>
                    <span class="input-group-text">{{ advertisement.unit }}</span>
                  </div>
                </div>

                <div class="payment-footer">
                  <button class="cancel" @click="this.store.$state.advertisementActive = -1">Отмена</button>
                  <button class="success btn-text" v-if="buySellToggle == 0" @click="modalRequisites()">Пополнить {{ advertisement.unit }}</button>
                  <button class="danger btn-text" v-if="buySellToggle == 1" @click="modalRequisites()">Вывести {{ advertisement.unit }}</button>
                </div>

              </div>
            </div>


          </div>




        </div>
      </div>

      <div class="p2p-footer">
        <ul class="pagination">
          <li class="page-item previous disabled" @click="this.pageNo = this.pageNo - 1, getUnit()"><a href="#" class="page-link"><i class="previous"></i></a></li>
          <li v-for="index of paginateInfo.totalPage" @click="this.pageNo = index, getUnit()" :key="index" class="page-item" :class="{'active':this.pageNo === index}"><a href="#" class="page-link">{{index}}</a></li>
<!--          <li class="page-item "><a href="#" class="page-link">...</a></li>-->
<!--          <li v-for="index of paginateInfo.totalPage" @click="this.pageNo = index, getUnit()" :key="index" class="page-item "><a href="#" class="page-link">{{index}}</a></li>-->
          <li class="page-item next" @click="this.pageNo = this.pageNo + 1, getUnit()"><a href="#"  class="page-link"><i class="next"></i></a></li>
        </ul>
      </div>

    <addRequisites/>


    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import Verify from '@/assets/svg/Verify.vue';
import { parseFullSymbol, formatNumbers } from "@/core/helpers/helpers";
import {useI18n} from "vue-i18n";
import {getAssetPath} from "@/core/helpers/assets";
import ApiService from "@/core/services/ApiService";
import Api from "@/config/api";
import {useAuthStore} from "@/stores/auth";
import p2pFilter from '@/components/globalp2p/p2pFilter.vue';
import lottieAnimate from '@/components/globalp2p/p2pModal/lottieAnimate.vue';
import addRequisites from '@/components/globalp2p/p2pModal/addRequisites.vue';
import {useP2PStore} from "@/stores/p2p";
import {Modal} from "bootstrap";

export default defineComponent({
  name: "p2p",
  components: {
    Verify,
    p2pFilter,
    lottieAnimate,
    addRequisites,
  },
  data(){
    return {
      advertisements:[],
      balance:{},
      // notifyData:{
      //   emoji:'bad',
      //   modalTittle:'Объявление опубликовано',
      //   modalDescription:'Мы сообщим, когда на него откликнутся ',
      //   modalBtnText:'Открыть P2P Площадку',
      //   modalBtnLink:'#0',
      // },
      modal:false,
      formData:{
        minLimit:'',
        maxLimit:'',
      },
      minLimitActive:false,
      maxLimitActive:false,
      merchantFee:'',
      pageNo:1,
      pageSize:10,
    }
  },
  setup() {
    const isAuthenticated = useAuthStore().isAuthenticated;
    const store = useP2PStore();
    const selectedCurrencyAll = ref({
      value: "RUB",
      options: [],
    });
    return {
      store,
      getAssetPath,
      selectedCurrencyAll,
      isAuthenticated,
      formatNumbers,
    };
  },
  watch:{
  'formData.minLimit'(val){
    if(this.minLimitActive){
      this.priceMinPrecent()
    } else {}
  },
  'formData.maxLimit'(val){
    if(this.maxLimitActive){
      this.priceMaxPrecent()
    } else {}
  },
  },
  methods:{
    init(){
      // this.getDataCoin();
      this.getUnit();
      this.getMyOrders(this.store.$state.buySellFilter);
      this.getCoinParams()
      if(this.isAuthenticated){
        this.getBalanceAndMessage()
      }
      // console.log('state', this.store.$state.advertisements);
    },
    priceMinPrecent(){
      this.formData.maxLimit = this.formData.minLimit - (this.formData.minLimit * (this.merchantFee))
    },
    priceMaxPrecent(){
      if(this.merchantFee < 0){
        this.formData.minLimit = Number(this.formData.maxLimit) + this.formData.maxLimit * this.merchantFee
      } else {
        this.formData.minLimit = Number(this.formData.maxLimit) + this.formData.maxLimit * (this.merchantFee)
      }

    },
    getBalanceAndMessage(){
      ApiService.post(Api.uc.wallet, "").then(response => { this.balance = response.data.data.find(item => item.unit == 'RUB')})
    },
    // getDataCoin() {
    //   ApiService.post(Api.uc.coinFull, "").then(response => {
    //     this.selectedCurrencyAll.options = response.data.data.coin.map(coin => coin.unit);
    //     console.log(this.selectedCurrencyAll.options)
    //   })
    // },
    getMyOrders(status){
      let formData = new FormData();
      formData.append("pageNo", 1);
      formData.append("pageSize", 10);
      formData.append("status[]", status);

      ApiService.post(Api.otc.myOrder, formData).then(response => {
        this.paymentTypes = response.data.data
        console.log(this.paymentTypes)
        this.advertisementActive = -1;
      })

    },
    async getUnit(){
      await this.store.getUnit(this.pageNo, this.pageSize);
    },
    async getCoinParams(){
      await this.store.getCoinParams()
    },
    numberFormatting(number) {
      return new Intl.NumberFormat("ru", {style: "decimal", maximumFractionDigits: 2}).format(number);
    },
    modalRequisites(){
      this.store.modalTrigger('addRequisites').toggle()
    },
    // getPages(){
    //   ApiService.post(Api.otc.page, "").then(response => {
    //
    //     console.log(response.data)
    //   })
    // },
  },
  computed:{
    buySellToggle:function(){
      return this.store.$state.buySellFilter
    },
    advertisementActive:function(){
      return this.store.$state.advertisementActive
    },
    paginateInfo:function(){
      return this.store.$state.advertisements
    }

  },
  created(){
    this.init()
  }
});
</script>
<style scoped>
.currencies-box .multiselect-input {
  border:none;
}

.p2p-container {
  max-width:1337px;
  display:block;
  margin: 0 auto;
  margin-top:10px;
}
.table {
  display: table;
  max-width:1337px;
  margin:14px 0px 0px 0px;
  background-color: #fff;
  border-radius:8px 8px 0px 0px;
  padding:15px 23px;
  border-spacing: 5px; /* cellspacing:poor IE support for  this */
  position: relative;
  overflow:hidden;
  border-spacing: 0;
}
.table-row {
  display: table-row;
  width: auto;
  clear: both;
  position:relative;
}
.table-row:first-child:before {
  background: #fff;
  width:0px;
}
.table-row:before {
  content:'';
  width:110%;
  left:-5%;
  height:1px;
  background: #F1F1F2;
  top:0px;
  position: absolute;
}
.table-col-head {
  float: left; /* fix for  buggy browsers */
  display: table-column;
  width: 20%;
  text-align:left;
  color:#A1A5B7;
  background-color: #fff;
  font-size: 14px;
  line-height: 14px;
}
.table-col-body {
  float: left; /* fix for  buggy browsers */
  display: table-column;
  width: 20%;
  text-align:left;
  color:#A1A5B7;
  background-color: #fff;
  font-size: 14px;
  line-height: 14px;
  height:80px;
}
.trade-box {
  padding: 0px;
  margin-top: 20px;
}
.verify {
  margin-left: 5px;
  position:relative;
  top:-1px;
}
.trader-info {

}
.trader-name {
  font-size: 16px;
  color:#2884EF;
  font-weight: 500;
  display: flex;
  align-items: center;
}
.trader-verify {

}
.payment-types {
  display:flex;
  padding-left:0px;
  margin-top: 20px;
}
.payment-types span {
  padding:4px;
  margin-left: 14px;
}
.payment-types span:first-child {
  margin-left: 0px;
}
.transactions-info {

}

.transactions-quantity{
  color:#7E8299;
  font-size: 14px;
  font-weight: 500;
  margin-top: 10px;

}
.transactions-quantity .tittle {

}
.transactions-quantity .val {
  margin-right: 16px;
  position:relative;
}
.transactions-quantity .val:before {
  content: '';
  background: #7E8299;
  height: 5px;
  width: 5px;
  border-radius: 100%;
  position: absolute;
  right: -10px;
  top: 6px;
}
.transactions-quantity .precent {

}
.content {
  color: #181C32;
  font-size: 14px;
  font-weight: 500;
  height: 100%;
  padding-left: 0px;
  display: flex;
  align-items: center;
}

.out {
  background:#D9214E;
  padding:10px;
  color:#fff;
  border-radius:4px;
  outline:none;
  border:none;
}
.replenish {
  padding:10px;
  background: linear-gradient(0deg, #0FB05E, #0FB05E),
  linear-gradient(0deg, #50CD89, #50CD89);
  color:#fff;
  border-radius:4px;
  outline:none;
  border:none;
}
.replenish-box {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: end;
}
.p2p-open {
  background:#fff;
  display:flex;
  padding: 0px 0px 0px 0px;
  margin: 0px;
  justify-content: space-between;
}

.p2p-box-info {
  display:flex;
  width:70%;
  flex-direction: column;
  padding-top:30px;
  padding-bottom: 0px;
  padding-left: 0px;
}
.box-info-trader {
  display:flex;
}
.box-trader-name {
  display:flex;
  font-size: 16px;
  font-weight: 500;
  color:#181C32;
  align-items: center;
  line-height: 16px;
}
.box-trader-status {
  background:#E8FFF3;
  color:#47BE7D;
  font-size: 9px;
  font-weight: 600;
  display: flex;
  align-items: center;
  margin-left: 15px;
  padding:4px;
}
/*.p2p-box-info .transactions-quantity {*/
/*  margin-top: 0px;*/
/*}*/
.payment-info {
  display:flex;
  margin-top: 26px;
}
.payment-info span {
  color:#7E8299;
  font-size: 14px;
  font-weight: 500;
}
.trader-commission {
  font-size: 14px;
  color:#7E8299;
  font-weight: 500;
  position:relative;
}
.trader-commission span {
  color:#181C32;
  font-weight: 500;
  font-size: 14px;
  position: relative;
  right: -18px;
}
.trader-payment-types {
  font-size: 14px;
  color:#7E8299;
  font-weight: 500;
  margin-left: 48px;
  max-width:625px;
}

.trader-payment-types span {
  color:#181C32;
  font-weight: 500;
  font-size: 14px;
  margin-left: 20px;
  padding:4px;
  line-height: 31px;
}
.trader-payment-time {
  font-size: 14px;
  color:#7E8299;
  font-weight: 500;
  position:relative;
  margin-top: 15px;
}
.trader-payment-time span {
  color:#181C32;
  font-weight: 500;
  font-size: 14px;
  position: relative;
  right: -18px;
}
.trader-conditions {
  margin-top: 25px;
}
.conditions-tittle {
  color:#181C32;
  font-weight: 500;
  font-size: 14px;
}
.trader-conditions p {
  color:#7E8299;
  font-size: 14px;
  font-weight: 500;
  margin-top: 15px;
  line-height: 22px;
}
.p2p-box-payment {
  width: 396px;
  display: flex;
  flex-direction: column;
  padding:30px 10px 30px 30px;
  border-left:1px solid #F1F1F2;
  position: relative;
}

.payment-head {
  display:flex;
  justify-content: space-between;
  align-items: center;
}
.payment-limit {

}
.limit-text {
  color:#7E8299;
  font-size: 14px;
  font-weight: 500;
  line-height: 14px;
}
.limit-quality {
  color:#181C32;
  font-size: 16px;
  font-weight: 600;
  margin-top: 4px;
}
.payment-available {

}
.available-text {
  color:#7E8299;
  font-size: 14px;
  font-weight: 500;
  text-align: right;
  line-height: 14px;
}
.available-quality {
  color:#181C32;
  font-size: 16px;
  font-weight: 600;
  margin-top: 4px;
}
.available-quality a{
  position: relative;
  top: 1px;
  cursor:pointer;
}
.payment-body {
  width:100%;
  margin-top: 20px;
}
.change-all {
  color:#3E97FF;
  background-color: #EEF6FF;
  border-radius:4px;
  padding:4px 10px 4px 10px;
  cursor:pointer;
  max-height: 22px;
  margin:auto 0;
  font-size: 14px;
  line-height: 14px;
}

.input-group-text {
  font-size: 14px;
}
.get-form-tittle {
  color:#7E8299;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 5px;
}
.give-form-tittle {
  color:#7E8299;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 5px;
}
.payment-footer {
  display:flex;
  justify-content: space-between;
  margin-top: 10px;
}
.payment-footer button {
  line-height: 14px;
}
.cancel {
  border:none;
  outline:none;
  background: #EEF6FF;
  color:#2884EF;
  font-size: 14px;
  font-weight: 600;
  border-radius:4px;
  padding:10px;
  min-width:158px;
}
.btn-text {
  font-size: 14px;
  font-weight: 600;
  line-height: 14px;
}
.success {
  border:none;
  outline:none;
  background: linear-gradient(0deg, #0FB05E, #0FB05E),
  linear-gradient(0deg, #50CD89, #50CD89);
  color:#fff;
  border-radius:4px;
  padding:10px;
  min-width:158px;
  line-height: 14px;
}
.danger {
  border:none;
  outline:none;
  background: #D9214E;
  color:#fff;
  border-radius:4px;
  padding:10px;
  min-width:158px;
}
.payment-vol {
  background:#F1F1F2;
}
.p2p-footer {
  background:#fff;
  padding: 20px 30px;
  padding-top: 0px;
  border-radius:0px 0px 8px 8px;
  display:flex;
  justify-content: flex-end;
}
</style>