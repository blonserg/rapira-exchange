<template>
  <div class="mb-10">
    <div class="p2p-container">

      <div class="p2p-head">

        <div class="btn-box">
          <button class="btn-deposit" @click="this.p2pStore.$state.buySellFilter = 0, getUnit()" :class="{'active':this.p2pStore.$state.buySellFilter == 0}">Пополнить</button>
          <button class="btn-take" @click="this.p2pStore.$state.buySellFilter = 1, getUnit()" :class="{'active':this.p2pStore.$state.buySellFilter == 1}">Вывести</button>
        </div>
        <div class="currencies-box">
          <div class="unit-select-box">
            <div class="unit-ico">
              <img class="character-label-icon w-20px "
                   :src="getAssetPath(`media/crypto/${this.p2pStore.coinParam.unit}.svg`)"
                   :alt="this.p2pStore.coinParam.unit">
            </div>
            <div class="unit-name">{{this.p2pStore.coinParam.unit}}</div>
<!--            <i class="bi bi-chevron-down"></i>-->
          </div>
<!--          <div class="currencies-box-active">-->
<!--            <div class="unit-select-box">-->
<!--              <div class="unit-ico">-->
<!--                <img class="character-label-icon w-20px "-->
<!--                     :src="getAssetPath(`media/crypto/${this.p2pStore.coinParam.unit}.svg`)"-->
<!--                     :alt="this.p2pStore.coinParam.unit">-->
<!--              </div>-->
<!--              <div class="unit-name">{{this.p2pStore.coinParam.unit}}</div>-->
<!--              <i class="bi bi-chevron-down"></i>-->
<!--            </div>-->
<!--          </div>-->
        </div>

        <div class="input-box">

          <div class="form-floating">
            <input type="number" class="form-control" @change="this.getUnit()" v-model="payFilterSumm" id="floatingInputValue" placeholder=""/>
            <label for="floatingInputValue">Сумма</label>
          </div>

          <div class="payment-filter">
            <div class="payment-input-box">
              <div class="position-relative">

                <div class="input-filter input-filter-top">
                  <span>Способы оплаты</span>
                  <input type="text text-dark " readonly :class="{'active':filterActive}" v-model="paymentChange" @focusout="closePayModal()" @focus="focusPayFilter = true, openPaymentFilter()">
                  <i class="bi bi-chevron-down ico" v-if="this.p2pStore.paymentActive.length <= 0"></i>
                  <i class="bi bi-x ico-x" @click="removeAllPaymentTypes(), getUnit()"  v-if="this.p2pStore.paymentActive.length >= 1"></i>
                </div>

                <div class="payment_choice" tabindex="-1" @focus="focusPayModal = true, openPaymentFilter()" @focusout="focusPayModal = false, openPaymentFilter()"  v-if="filterActive">
                  <div class="input-filter" >
                    <input type="text text-dark" v-model="paySearch" placeholder="Поиск" >
                    <i class="bi bi-search ico" ></i>
                    <i class="bi bi-x ico-x" @click="paySearch = ''" v-if="paySearch.length >= 1"></i>
                  </div>
                  <p @click="activePaymentTypes(payment)"  v-for="(payment, index) of this.p2pStore.paymentActive" :key="index">
                    <span class="payment-color" :style="'background-color:' + payment.color +';'"></span>
                    {{payment.paymentName}}
                      <i class="bi bi-check-lg"></i>
                  </p>

                  <p @click="removeAllPaymentTypes(), getUnit()">Все</p>

                    <p @click="activePaymentTypes(payment), getUnit()" v-for="(payment, index) of paymentTypesFilter" :key="index">
                      <span class="payment-color" :style="'background-color:' + payment.color +';'"></span>
                      {{payment.paymentName}}
                    </p>

                </div>

              </div>
            </div>
          </div>


        </div>

        <div class="create-box">
          <div class="create-advertisement">
            <div class="ico"><Plus/></div>
            <p class="text"><createOffer/></p>
<!--            <button @click="useModal()">check</button>-->
          </div>
          <div class="my-deal">
            <div class="ico">1</div>
            <p class="text"><MyDeals/></p>
          </div>
        </div>
        </div>

<!--        <KTModals/>-->



        </div>
      </div>
</template>

<script lang="ts">
import MyDeals from '@/components/globalp2p/p2pModal/MyDeals.vue';
import createOffer from '@/components/globalp2p/p2pModal/createOffer.vue';
import Multiselect from "@vueform/multiselect";
import ApiService from "../../core/services/ApiService";
import Api from "../../config/api";
import {useAuthStore} from "@/stores/auth";
import {computed, ref} from "vue";
import {getAssetPath} from "@/core/helpers/assets";
import Plus from '@/assets/svg/Plus.vue';
import {useP2PStore} from "@/stores/p2p";
import { Modal } from "bootstrap";
// import KTModals from "@/layouts/main-layout/modals/Modals.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "p2pFilter",
  components: {
    Multiselect,
    Plus,
    MyDeals,
    createOffer,
    // KTModals,
  },
  data(){
    return {
      advertisementActive:-1,
      advertisements:[],
      paymentTypes:[],
      paymentActive:[],
      paySearch:'',
      paymentChange:'Все',
      focusPayFilter:false,
      focusPayModal:false,
      filterActive:false,
      payFilterSumm:'',
      oldSummValue:'',
      triggerValSum:0,
      time:0,
    } as any
  },
  setup() {
    const isAuthenticated = useAuthStore().isAuthenticated;
    const selectedCurrencyAll = ref({
      value: "RUB",
      options: [],
    });
    const p2pStore = useP2PStore();

    return {
      getAssetPath,
      selectedCurrencyAll,
      isAuthenticated,
      p2pStore,
    };
  },
  watch:{
    payFilterSumm(val){
      this.p2pStore.payFilterSumm = val
      setTimeout(()=>{
        this.oldSummValue = val
        if(this.payFilterSumm.length === this.oldSummValue.length){
          this.triggerValSum = this.triggerValSum + 1
          this.time = this.time + 1
        }
      },1000)

    },
    triggerValSum(val){
      if(this.time == 1){
        console.log(this.payFilterSumm)
        this.getUnit()
        setTimeout(()=> {this.time = 0}, 1000)
      } else {

      }

    }
  },
  methods:{
    init(){
      this.getUnit();
      // this.getPaymentTypes()
      this.getPaymentTypes()
      // this.getPages();

      this.isAuthenticatedUser()
      console.log('unit',this.p2pStore.coinParam)
    },
     async getPaymentTypes(){
      await this.p2pStore.getPaymentTypes();
    },
    modalToggle(){
      var myModal = new Modal(document.getElementById("kt_modal_googleTurnOn" as HTMLElement | null), {});
      console.log(myModal)
      myModal.show()
    },

    async getUnit(){
        await this.p2pStore.getUnit(1, 10);
    },
    isAuthenticatedUser(){
      if(this.isAuthenticated){
      } else {
        return false
        console.log('!isAuthenticated')
      }
    },
    activePaymentTypes(payment){
      let coincidence = false
      this.p2pStore.paymentActive.find(pays => {if(pays.id == payment.id){coincidence = true} else {}})
      if(!coincidence){
        this.p2pStore.paymentActive.push(payment)
        this.p2pStore.$state.p2pPaymentTypes.filter((pays, index) =>  {
          if(pays.id == payment.id){
            this.p2pStore.$state.p2pPaymentTypes.splice(index, 1)
          }
        })
      } else {
        this.deactivatePaymentTypes(payment)
        this.p2pStore.$state.p2pPaymentTypes.unshift(payment)
      }

      if(this.p2pStore.paymentActive.length > 0 && this.p2pStore.paymentActive.length < 2){
        this.paymentChange = this.p2pStore.paymentActive[0].paymentName
      } else {
        this.paymentChange = 'Несколько'
      }

    },
    addAllPaymentTypes(){
      this.p2pStore.$state.p2pPaymentTypes = this.p2pStore.$state.paymentTypes
      if(this.p2pStore.$state.p2pPaymentTypes.length <= 0){

      } else {

        // for (let i=0; i < this.p2pStore.$state.p2pPaymentTypes.length; i++) {
        //   this.paymentActive.push(this.p2pStore.$state.p2pPaymentTypes[i])
        // }
        // this.p2pStore.$state.p2pPaymentTypes = []
      }
    },
    removeAllPaymentTypes(){
      if(this.p2pStore.paymentActive.length <= 0){

      } else {
        for (let i=0; i < this.p2pStore.paymentActive.length; i++) {
          this.p2pStore.$state.p2pPaymentTypes.unshift(this.p2pStore.paymentActive[i])
        }
        this.p2pStore.paymentActive = []
      }
      if(this.p2pStore.paymentActive.length <= 0){
        this.paymentChange = 'Все'
      }
    },
    deactivatePaymentTypes(payment){
      this.p2pStore.paymentActive.filter((pays, index) =>  {
        if(pays.id == payment.id){
          this.p2pStore.paymentActive.splice(index, 1)
          this.getUnit()
        }
      })
    },
    closePayModal(){

      setTimeout(() => {this.focusPayFilter = false, this.openPaymentFilter()}, 100)
    },
    openPaymentFilter(){
      console.log('focusPayFilter', this.focusPayFilter)
      console.log('focusPayModal',this.focusPayModal)
      if(this.focusPayFilter == true || this.focusPayModal == true){
        this.filterActive = true
      } else {
        this.filterActive = false
      }
    },
    // getPages(){
    //   ApiService.post(Api.otc.page, "").then(response => {
    //
    //     console.log(response.data)
    //   })
    // },

  },
  computed:{
    paymentTypesFilter:function(){
      return this.p2pStore.$state.p2pPaymentTypes.filter(pay => { return pay.paymentName.toLowerCase().indexOf(this.paySearch.toLowerCase())  > -1})
    },
  },
  created(){
    this.init()
  }
})
</script>

<style scoped>
.p2p-container {
  max-width:1337px;
  display:block;
  margin: 0 auto;
  margin-top:10px;
}
.p2p-head {
  background:#fff;
  border-radius: 8px;
  display: flex;
  height: 64px;
  align-items: center;
  padding: 0px 30px;

}
.btn-box{
  padding:5px;
  background: #F3F6F9;
  border:1px solid #F3F6F9;
  border-radius:4px;
  display:flex;
}
.btn-box button {
  border:none;
  outline:none;
  font-size:14px;
  padding:4px 15px 4px 15px;
  font-weight: 600;
}
.btn-deposit {
  color:#7E8299;
  background:inherit;
}
.btn-deposit.active{
  color:#FFF;
  background: linear-gradient(0deg, #0FB05E, #0FB05E),
  linear-gradient(0deg, #50CD89, #50CD89);

  border-radius:3px;

}
.btn-take{
  color:#7E8299;
  background: inherit;
}
.btn-take.active{
  background:#D9214E;
  border-radius:3px;
  color:#fff;

}
.btn-deposit:focus,.btn-take:focus {

}

.active-currencies {
  display:flex;
  align-items: center;
  width:auto;
}
.active-currencies p {
  display: block;
  margin: 0px 10px 0px 7px;
  font-weight: 600;
  color:#181C32;
  font-size: 14px;
}

.create-box {
  display:flex;
  align-items: center;
  width:40%;
  justify-content: flex-end;
  flex-grow: 1;
}
.create-box p {
  font-size: 16px;
  font-weight: 600;
  margin:0px;
}
.create-advertisement {
  display:flex;
  align-items: center;
  margin-right: 30px;
  cursor:pointer;
}
.my-deal {
  display:flex;
  align-items: center;
  cursor:pointer;

}
.create-advertisement  .ico {
  background: #EEF6FF;
  height:18px;
  width: 18px;
  border-radius:100px;
  margin-right:10px;
  display: flex;
  align-items: center;
  justify-content: center;

}
.my-deal .ico{
  background: #EEF6FF;
  height:18px;
  width: 18px;
  border-radius:100px;
  margin-right:10px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color:#2884EF;
  font-weight: 500;
  font-size: 14px;

}
.input-box {
  display:flex;
  margin-left: 25px;
}
.input-box input, .form-floating input {
  width:164px;
  height:40px;
}
.form-floating {
  margin: auto;
}
.input-box .form-floating label{
  font-weight: 600;
  font-size: 12px;
  color:#7E8299;
  top:2px;
}
.payment-filter {
  margin-left: 25px;
  position: relative;
}
.input-box{
  border-radius: 4px;
}
.currencies-box {
  padding:6px 10px;
  background: #F3F6F9;
  border:1px solid #F3F6F9;
  min-height: 40px;
  display:flex;
  align-items: center;
  border-radius:4px;
  margin-left: 25px;
  max-width: 110px;
  position: relative;
}
.currencies-box-active {
  position: absolute;
}
.unit-select-box {
  display:flex;
  align-items: center;
  cursor:pointer;
}
.unit-select-box .character-label-icon {
  width:22px;
  height: 22px;
  margin-left: 0px;
}
.unit-select-box .unit-name {
  font-size: 14px;
  font-weight: 600;
  line-height: 12px;
  color:#181C32;
  margin-left: 6px;
}
.unit-select-box .bi{
  font-size: 16px;
  color:#7E8299;
  margin-left: 10px;
  font-weight: 600;

}

.choice_class {
  background-color: #FFF8DD;
  color: #E9B500;
  padding: 4px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 4px;
  display: flex;
  align-items: center;
  margin-left: 5px;
  margin-top: 3px;
}
.choice_class:first-child {
  margin-left: 0px;
}
.input-filter input::placeholder {color: #E1E3EA;}
.input-filter {
  /*display:flex;*/
  /*align-items: center;*/
  /*padding:13px 15px;*/
  /*border-radius: 10px;*/
  /*border:1px solid #E1E3EA;*/
  position: relative;

  /*margin: 10px 0;*/
}
.input-filter input {
  width:100%;
  border:1px solid #E1E3EA;
  padding:10px 15px;
  border-radius:6px;
  color: #5E6278;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 0px;
}
.input-filter .active {
  border-color: #5d95ff;
  box-shadow: rgba(53, 122, 255, 0.2) 0px 0px 0px 2px;
}
.input-filter input:hover{
  border-color: #357aff;
}
.input-filter input:focus {
  border-color: #5d95ff;
  box-shadow: rgba(53, 122, 255, 0.2) 0px 0px 0px 2px;
}

.input-filter .ico{
  height: 24px;
  width: 24px;
  font-size: 14px;
  margin-left: 40px;
  background-size: 100%;
  display:flex;
  align-items: center;
  position:absolute;
  right:10px;
  top:0px;
  bottom:0px;
  margin: auto 0;
  cursor:pointer;
}

.input-filter input:focus{
  outline:none;
}
.input-filter-top input{
  font-size: 12px;
  color:#3F4254;
  line-height: 12px;
  padding-top: 21px;
  cursor:pointer;
  max-height:40px;
}
.input-filter-top span{
  position:absolute;
  color:#7E8299;
  font-size: 10px;
  line-height: 10px;
  top:6px;
  left:15px;
  pointer-events: none;
}
.payment-types-active {
  display:flex;
  width:100%;
  flex-wrap: wrap;
}
.payment-input-box {
  position: relative;
}
.payment_choice h3 {
  color: #7E8299;
  font-size: 12px;
  font-weight: 500;
  padding: 13px 15px;
  padding-bottom: 0px;
}
.payment_choice p {
  padding: 10px 5px;
  margin:0px;
  font-size: 14px;
  display:flex;
  align-items: center;
  transition: all 500ms ease;
  cursor:pointer;
}
.box-payment-limit {
  margin-top: 10px;
  margin-bottom: 20px;
}
.box-payment-limit .info {
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
}
.payment_choice p:hover {
  transition: all 500ms ease;
  background: #F5F5F5;

}
.payment_choice {
  width: 341px;
  min-height: 338px;
  position: absolute;
  border-radius: 6px;
  border: 1px solid #E1E3EA;
  overflow: scroll;
  max-height: 205px;
  z-index: 10;
  background: #fff;
  top: 47px;
  padding: 10px;
}

.payment-color {
  width:4px;
  height:12px;
  border-radius:5px;
  margin-right: 10px;
}
.box_under p {
  margin: 0;
  font-size: 14px;
}
.box_under i {
  display: inline-block;
  width: 14px;
  height: 14px;
  background-position:center;
  background-size: 100%;
  margin-right: 5px;
}
.box_under {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.payment_choice .input-filter input {
  padding-left: 33px;
  height: 36px;
  margin-bottom: 4px;
}
.payment_choice .input-filter .ico {
  left:10px;
  height: 16px;
  width: 16px;
  font-size: 16px;
  margin-left: 0px;
  top:0px;
  bottom:0px;
  margin: auto 0;
}
.input-filter-top .ico-x {
  height: 24px;
  width: 24px;
  font-size: 17px;
  margin-left: 40px;
  background-size: 100%;
  display:flex;
  align-items: center;
  position:absolute;
  right:10px;
  top:0px;
  bottom:0px;
  margin: auto 0;
  cursor:pointer;
}
.payment_choice .ico-x {
  height: 24px;
  width: 24px;
  font-size: 20px;
  margin-left: 40px;
  background-size: 100%;
  display: flex;
  align-items: center;
  position: absolute;
  right: 8px;
  top: 0px;
  bottom:0px;
  margin:auto 0;
  cursor:pointer;
}
.cross {
  display: flex;
  font-size: 14px;
  align-items: center;
  margin-left: 4px;
}
.bi-check-lg {
  color:#7E8299;
  position:absolute;
  right:22px;
}
</style>