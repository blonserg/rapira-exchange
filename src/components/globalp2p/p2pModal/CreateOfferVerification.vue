<template>
  <div class="CreateOfferVerification" >
    <div class="modal fade" tabindex="-1" id="CreateOfferVerification">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">

            <div class="step-chips" >

              <div class="step" @click="activeStep(index)" v-for="(step, index) of this.steps" :key="index">
                <div class="step-tittle " :class="{'active':stepsActive == step.id}">{{ step.id }}</div>
                <div class="step-desc text-dark" v-if="stepsActive == step.id">{{ step.tittle }}</div>
              </div>

            </div>

            <div class="progress-bar">
              <div class="progress" :style="{'width':progress + '%'}"></div>
            </div>



            <!--begin::Close-->
            <div class="btn btn-icon btn-sm btn-active-light-primary ms-2" @click="this.alertCloseModal = !this.alertCloseModal" aria-label="Close">
              <i class="ki-duotone ki-cross fs-1"><span class="path1"></span><span class="path2"></span></i>
            </div>
            <!--end::Close-->
          </div>

          <div class="modal-body">

            <div class="form-step" v-if="stepsActive == 1">
              <div class="tittle text-dark">Я хочу</div>
              <div class="btn-box">
                <button class="btn-deposit" @click="formData.advertiseType = 0" :class="{'active':formData.advertiseType == 0}">Пополнить</button>
                <button class="btn-take" @click="formData.advertiseType = 1" :class="{'active':formData.advertiseType == 1}">Вывести</button>
              </div>
              <div class="desc">Средства спишутся с баланса биржи после того, как покупатель передаст вам фиатные средства</div>
              <div class="input-box">
                <div class="input-tittle text-dark">Моя комиссия</div>

                <div class="position-relative">
                  <label class="position-absolute no-focus translate-middle-y top-50 start-0 text-gray-600 form-label ms-4"
                  >
                    <span class="fw-semibold" v-if="Number(formData.merchantFee) > 0 || formData.merchantFee == ''">Я получаю доплату</span>
                    <span class="fw-semibold" v-if="Number(formData.merchantFee) < 0">Я доплачивают</span>
                  </label>
                  <input
                      type="number"
                      min="0"
                      v-model="formData.merchantFee"
                      @input="changeSellTotal"
                      class="form-control mb-2 text-end"
                      placeholder="0"
                  />
                  <div class="position-absolute no-focus translate-middle-y top-50 end-0 me-5 fw-semibold text-gray fz-16"> %</div>
                </div>
                <span class="fw-semibold error-style text-danger fz-12" v-if="formValidate.price">Укажите комиссию</span>
              </div>
              <div class="limit-box">
                <div class="box-limit">
                  <div class="input-box">
                    <div class="input-tittle text-dark">Лимиты сделки</div>

                    <div class="position-relative">
                      <label class="position-absolute no-focus translate-middle-y top-50 start-0 text-gray-600 form-label ms-4"
                      >
                        <span class="fw-semibold text-gray">от</span>
                      </label>
                      <input v-if="this.formData.advertiseType == 0"
                             type="number"
                             min="0"
                             v-model="formData.minLimit"
                             @input="changeSellTotal"
                             class="form-control mb-2 text-end"
                             :placeholder="Math.round(this.coinParams.buy_min_amount)"
                      />
                      <input v-if="this.formData.advertiseType == 1"
                             type="number"
                             min="0"
                             v-model="formData.minLimit"
                             @input="changeSellTotal"
                             class="form-control mb-2 text-end"
                             :placeholder="Math.round(this.coinParams.sell_min_amount)"
                      />
                      <div class="position-absolute no-focus translate-middle-y top-50 end-0 me-5 fw-semibold text-gray fz-16"> RUB</div>
                    </div>
                    <span class="fw-semibold error-style text-danger fz-12" v-if="formValidate.minLimit || formValidate.maxLimit">Задайте лимиты сделки</span>
                    <span class="fw-semibold error-style text-danger fz-12" v-if="formValidate.currentLimit && this.formData.advertiseType == 0">Задайте верные лимиты</span>
                    <span class="fw-semibold error-style text-danger fz-12" v-if="formValidate.currentLimit && this.formData.advertiseType == 1">Задайте верные лимиты</span>
                  </div>
                </div>
                <div class="box-balance">
                  <div class="input-box">
                    <div class="input-tittle text-gray text-left">Доступно
                      <span class="fw-500" :class="{'text-danger':formValidate.minBalance, 'text-danger':formValidate.maxBalance, 'text-dark':!formValidate.minBalance, 'text-dark':!formValidate.maxBalance}" @click="this.formData.maxLimit = this.balance.balance">{{ formatNumbers(this.balance.balance, '', '.', true, 2) }} RUB </span><router-link target='_blank' class="text-dark fw-semibold" to="/wallet/deposit"><i class="ki-solid ki-plus-circle text-primary fs-3"></i></router-link></div>

                    <div class="position-relative">
                      <label class="position-absolute no-focus translate-middle-y top-50 start-0 text-gray-600 form-label ms-4"
                      >
                        <span class="fw-semibold text-gray">до</span>
                      </label>
                      <input v-if="this.formData.advertiseType == 0"
                             type="number"
                             min="0"
                             v-model="formData.maxLimit"
                             @input="changeSellTotal"
                             class="form-control mb-2 text-end"
                             :placeholder="Math.round(this.coinParams.buy_min_amount)"
                      />
                      <input v-if="this.formData.advertiseType == 1"
                             type="number"
                             min="0"
                             v-model="formData.maxLimit"
                             @input="changeSellTotal"
                             class="form-control mb-2 text-end"
                             :placeholder="Math.round(this.coinParams.sell_min_amount)"
                      />
                      <div class="position-absolute no-focus translate-middle-y top-50 end-0 me-5 fw-semibold text-gray fz-16"> RUB</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div class="form-step" v-if="stepsActive == 2">
              <div class="tittle text-dark">Способы оплаты</div>
              <div class="main_box">

                <div class="payment-input-box">
                  <div class="payment-types-active">
                    <template  v-for="(active, index) of paymentActive" :key="index">
                      <span @click="deactivatePaymentTypes(active)" class="choice_class" :style="{'color':active.color, 'background':active.color + 11}">{{active.paymentName}} <i class="cross bi bi-x" :style="{'color':active.color}"></i></span>
                    </template>
                  </div>
                  <div class="position-relative">

                    <div class="input-filter" >
                      <input type="text text-dark" :class="{'active':filterActive}"  @focusout="closePayModal()" @focus="focusPayFilter = true, openPaymentFilter()" v-model="paySearch" placeholder="Введите название" >
                      <i class="bi bi-chevron-down ico" v-if="!filterActive"></i>
                      <i class="bi bi-search ico" v-if="filterActive"></i>
                    </div>

                    <span class="fw-semibold text-danger error-style fz-12" v-if="formValidate.payType">Выберите способ оплаты или добавьте свой</span>

                    <div class="payment_choice" tabindex="-1"  @focus="focusPayModal = true, openPaymentFilter()" @focusout="focusPayModal = false, openPaymentFilter()"  v-if="filterActive">
                      <h3>Способы оплаты</h3>
                      <p @click="activePaymentTypes(payment)" v-for="(payment, index) of paymentTypesFilter" :key="index">
                        <span class="payment-color" :style="'background-color:' + payment.color +';'"></span>
                        {{payment.paymentName}}
                        <template v-for="(payActive, index) of this.paymentActive" :key="index">
                          <i v-if="payment.id == payActive.id" class="bi bi-check-lg"></i>
                        </template>

                      </p>
                    </div>

                  </div>
                  <div class="box_under" v-if="paymentActive.length < 5">
                    <i class="bi bi-plus-circle-fill text-primary"></i>
                    <p @click="payMethodTrigger = !payMethodTrigger">Предложить способ оплаты</p>
                  </div>
                  <div class="box-payment-limit" v-if="paymentActive.length > 4"><div class="info text-gray">Вы можете выбрать максимум 5 способов оплаты</div></div>
                </div>

              </div>

              <div class="tittle text-dark">Оплатить в течение</div>
              <Multiselect class="w-125px" @change="formData.timeLimit = selectedCurrencyRcode.value"
                           v-model="selectedCurrencyRcode.value" v-bind="selectedCurrencyRcode">
                <template v-slot:option="{ option }"  >
                  <div class="d-flex justify-content-between w-100">
                    <div class="d-flex gap-2">
                      <p class="my-0 text-gray-800">{{ option.label }}</p>
                    </div>
                  </div>
                </template>
              </Multiselect>

              <div class="tittle text-dark mtp-20">Условия сделки</div>
              <textarea
                  class="form-control border-1 p-5 pe-10 resize-none min-h-25px"
                  rows="4"
                  placeholder="Reply.."
                  v-model="formData.remark"
              ></textarea>
              <p class="info text-gray" v-if="formData.remark.split('').length == 0 && formData.remark.split('').length < 250 && !formValidate.remarkHight">Не больше 250 символов</p>
              <p class="info text-gray" :class="{'text-danger':formData.remark.split('').length > 250}" v-if="formData.remark.split('').length > 10 "><span >{{formData.remark.split('').length}}</span> из 250 символов</p>
              <p class="info text-gray text-danger" v-if="formValidate.remarkLow && formData.remark.split('').length >= 0 && formData.remark.split('').length <= 10 ">От <span >10 </span> до 250 символов</p>
            </div>

            <div class="form-step" v-if="stepsActive == 3">
              <div class="form-check form-switch form-switch-lg">
                <input v-model="formData.onlyCertified" class="form-check-input custom-check" type="checkbox" id="flexSwitchCheckDefault">
                <label class="form-check-label text-dark text-small" for="flexSwitchCheckDefault">Только верифицированные</label>
              </div>
              <div class="form-check form-switch form-switch-lg">
                <input v-model="formData.auto" class="form-check-input custom-check" type="checkbox" id="flexSwitchCheckDefault">
                <label class="form-check-label text-dark text-small" for="flexSwitchCheckDefault">Автоответ</label>
              </div>
              <textarea v-if="formData.auto"
                        class="form-control border-1 p-5 pe-10 resize-none min-h-25px"
                        rows="4"
                        placeholder="Reply.."
                        v-model="formData.autoword"
              ></textarea>
              <p class="info text-gray" v-if="formData.auto && formData.autoword.split('').length == 0 && formData.autoword.split('').length < 250 && !formValidate.autowordHight">Не больше 250 символов</p>
              <p class="info text-gray" :class="{'text-danger':formData.autoword.split('').length > 250}" v-if="formData.auto && formData.autoword.split('').length > 10 "><span >{{formData.autoword.split('').length}}</span> из 250 символов</p>
              <p class="info text-gray text-danger" v-if="formData.auto && formData.autoword.split('').length >= 0 && formData.autoword.split('').length <= 10 && formValidate.autowordLow">От <span >10 </span> до 250 символов</p>
            </div>

            <div class="form-step" v-if="stepsActive == 4">
              <div class="finish-order-box">
                <div class="order-tittle text-gray">Я хочу</div>
                <div class="order-desc sell" style="color:#D9214E" v-if="formData.advertiseType == 1">Вывести</div>
                <div class="order-desc buy" style="color:#0FB05E" v-if="formData.advertiseType == 0">Пополнить</div>
              </div>
              <div class="finish-order-box">
                <div class="order-tittle text-gray">Моя комиссия</div>
                <div class="order-desc text-dark">{{ formData.merchantFee }}%</div>
              </div>
              <div class="finish-order-box">
                <div class="order-tittle text-gray">Лимиты</div>
                <div class="order-desc text-dark">{{ formData.minLimit }} — {{ formData.maxLimit }}</div>
              </div>
              <div class="finish-order-box">
                <div class="order-tittle text-gray">Способы оплаты</div>
                <div class="order-desc text-dark">
                  <div class="payment-types-active">
                    <template  v-for="(active, index) of paymentActive" :key="index">
                      <span class="choice_class" :style="{'color':active.color, 'background':active.color + 11}">{{active.paymentName}}</span>
                    </template>
                  </div>
                </div>
              </div>
              <div class="finish-order-box">
                <div class="order-tittle text-gray">Оплата в течение</div>
                <div class="order-desc text-dark">{{ formData.timeLimit }}</div>
              </div>
              <div class="tittle text-gray mtp-20">Условия сделки</div>
              <p class="text-dark finish-order-text">{{formData.remark}}</p>
            </div>

            <div class="form-step" v-if="addNewPaymentMethod">

            </div>

          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-light" data-bs-dismiss="modal" v-if="stepsActive == 1 && stepsActive != 4">Отмена</button>
            <button type="button" class="btn btn-light" @click="prevStep()" v-if="stepsActive > 1 && stepsActive != 4" >Назад</button>
            <button type="button" class="btn btn-primary" @click="nextStep()" v-if="stepsActive != 4">Далее</button>
            <button type="button" class="btn btn-light" v-if="stepsActive == 4" @click="modal2FA('create')" >Сохранить</button>
            <button type="button" class="btn btn-primary" v-if="stepsActive == 4" @click="modal2FA('shelves')" >Опубликовать</button>
          </div>

        </div>
      </div>
    </div>
    <AddPayemntMethod
        :modalTrigger="this.payMethodTrigger"
    />
    <lottieAnimate
        :data="notifyData"
        :height="100"
        :width="350"
        :modalTrigger="this.lottieModal"
    />
    <alertCloseModal
        :modalTrigger="this.alertCloseModal"
        modalSecondName = 'CreateOfferVerification'
    />
  </div>
</template>

<script lang="ts">
//@ts-nocheck
import AddPayemntMethod from '@/components/globalp2p/p2pModal/AddPayemntMethod.vue'
import Multiselect from '@vueform/multiselect';
import {useP2PStore} from "@/stores/p2p";
import {Modal} from "bootstrap";
import {useDepositStore} from "@/stores/deposit";
import {useBasicRequest} from "@/stores/basicRequests";
import ApiService from "@/core/services/ApiService";
import Api from "@/config/api";
import { parseFullSymbol, formatNumbers } from "@/core/helpers/helpers";
import {ElMessage} from "element-plus";
import Swal from "sweetalert2/dist/sweetalert2.js";
import {useI18n} from "vue-i18n";
import lottieAnimate from '@/components/globalp2p/p2pModal/lottieAnimate.vue';
import alertCloseModal from '@/components/globalp2p/p2pModal/alertCloseModal.vue';
import {useAuthStore} from "@/stores/auth";

import { defineComponent } from "vue";

export default defineComponent({
  name: "CreateOfferVerification",
  components:{
    Multiselect,
    AddPayemntMethod,
    lottieAnimate,
    alertCloseModal,
  },
  watch:{

  },
  setup(){
    const p2pStore = useP2PStore();
    const storeBasicRequest = useBasicRequest();
    const isAuthenticated = useAuthStore().isAuthenticated;
    const {t, te} = useI18n();

    const translate = (text: string) => {
      if (te(text)) {
        return t(text);
      } else {
        return text;
      }
    };

    return {
      p2pStore,
      storeBasicRequest,
      formatNumbers,
      translate,
      isAuthenticated,
    }
  },
  data(){
    return {
      steps:[
        {id:1, tittle:'Создайте Объявление',},
        {id:2, tittle:'Способы и условия оплаты',},
        {id:3, tittle:'Настройте объявление',},
        {id:4, tittle:'Проверьте объявление',},
      ],
      notifyData:{
        emoji:'petard',
        modalTittle:'Объявление опубликовано',
        modalDescription:'Мы сообщим, когда на него откликнутся ',
        modalBtnText:'Открыть P2P Площадку',
        modalBtnLink:'/dashboard',
      },
      lottieModal:false,
      alertCloseModal:false,
      payMethodTrigger:false,
      balance:[],
      filterActive:false,
      focusPayFilter:false,
      focusPayModal:false,
      prevStepsActive:1,
      stepsActive:1,
      progress:20,
      paymentActive:[],
      paySearch:'',
      addNewPaymentMethod:false,
      formValidate:{
        price:false,
        advertiseType:false,
        maxBalance:false,
        minBalance:false,
        minLimit:false,
        maxLimit:false,
        currentLimit:false,
        payType:false,
        remarkLow:false,
        remarkHight:false,
        autowordLow:false,
        autowordHight:false,

        timeLimit:false,
        country:false,
        onlyCertified:false,
        priceType:false,
        premiseRate:false,

        minRegistrationDays:false,
        code:false,
        auto:false,

      },
      formDataNull:{},
      formData: {
        price: '',
        merchantFee: '',
        advertiseType: 0,
        coin: 22,
        minLimit: '',
        maxLimit: '',
        timeLimit: 15,
        country: 'Russia',
        onlyCertified: false,
        priceType: false,
        remark: '',
        minRegistrationDays: null,
        pay: [],
        jyPassword: '',
        auto: false,
        autoword: '',
      },
      selectedCurrencyRcode: {
        value: "15",
        placeholder: "Время",
        options:[
          { value: "15", label: "15 минут" },
          { value: "30", label: "30 минут" },
          { value: "60", label: "1 час" },
          { value: "240", label: "4 часа" },
          { value: "720", label: "12 часов" },
          { value: "1440", label: "24 часа" },],
      },
    } as any
  },
  methods:{
    init(){
      this.getBalanceAndMessage()
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
    validateStepFirst(){
      if(this.formData.advertiseType == 0){
        this.formValidate.minLimit = this.fromValidator(this.formData.minLimit, this.coinParams.buy_min_amount, 'number')
        this.formValidate.maxLimit = this.fromValidator(this.formData.maxLimit, this.coinParams.buy_min_amount, 'number')
      }
      if(this.formData.advertiseType == 1){
        this.formValidate.minLimit = this.fromValidator(this.formData.minLimit, this.coinParams.sell_min_amount, 'number')
        this.formValidate.maxLimit = this.fromValidator(this.formData.maxLimit, this.coinParams.sell_min_amount, 'number')
      }
      this.formValidate.price = this.fromValidator(this.formData.merchantFee, 0, 'str')
      this.formValidate.currentLimit = this.fromValidator(this.formData.maxLimit, this.formData.minLimit, 'number')
      if(!this.formValidate.price && !this.formValidate.minLimit && !this.formValidate.maxLimit && !this.formValidate.currentLimit){
        return true

      } else {
        return false

      }
    },
    validateStepSecond(){
      this.formValidate.payType = this.fromValidator(this.paymentActive, 0, 'len')

      this.formValidate.remarkLow = this.fromValidator(this.formData.remark,10, 'str')
      this.formValidate.remarkHight = this.fromValidator(this.formData.remark,250, 'str')


      if(!this.formValidate.remarkLow && this.formValidate.remarkHight && !this.formValidate.payType){
        return true
      } else {
        return false
      }


    },
    validateStepThird(){
      if(this.formData.auto == true){
        this.formValidate.autowordLow = this.fromValidator(this.formData.autoword, 10, 'str')
        this.formValidate.autowordHight = this.fromValidator(this.formData.autoword,250 , 'str')
      } else {
        this.formValidate.autowordLow = false
        this.formValidate.autowordHight = true
      }
      if(!this.formValidate.autowordLow && this.formValidate.autowordHight){
        return true
      } else {
        return false
      }

    },
    // validateStepFourth(){
    //
    //     this.stepsActive = this.stepsActive + 1
    //     let progress = 20
    //     this.progress = progress * this.stepsActive
    //
    // },
    ValidateOfferForm(step){
      if(step > 1 && !this.validateStepFirst()){
        this.stepsActive  = 1;
        return false
      }
      if(step > 2 && !this.validateStepSecond()){
        this.stepsActive  = 2;
        return false
      }
      if(step > 3 && !this.validateStepThird()){
        this.stepsActive  = 3;
        return false
      }
      this.stepsActive = step
      let progress = 20
      this.progress = progress * this.stepsActive
      return true
    },
    activeStep(index){
      let step = index + 1
      this.ValidateOfferForm(step)
      // this.validateStepFirst()
      // this.validateStepSecond()
    },
    nextStep(){
      if(this.stepsActive < 4 && this.stepsActive > 0){
        let stepSave = this.stepsActive + 1
        this.ValidateOfferForm(stepSave)

      } else {

      }
    },
    fromValidator(param, val, type){
      if(type == 'len'){
        if(param.length <= val) {
          return true
        } else {
          return false
        }
      } else {}
      if(type == 'number'){
        if(Number(param) < Number(val)) {
          return true
        } else {
          return false
        }
      } else {}
      if(type == 'str'){
        if(Number(String(param).split('').length) <= Number(val)) {
          return true
        } else {
          return false
        }
      } else {}
    },
    modal2FA(offer){
      this.p2pStore.modalTrigger("CreateOfferVerification").toggle()
      Swal.fire({
        title: this.translate("googleAuth.title2FA"),
        buttonsStyling: true,
        showCloseButton: true,
        showCancelButton: true,
        html: `
          <label for="swal2-input1" class="text-start mb-3">${this.translate("googleAuth.label2FA")}</label>
          <div class="input-group mb-5">
            <span class="input-group-text bg-opacity-100 border-right-0" id="basic-addon1">
            <i class="ki-outline ki-key fs-3"></i>
            </span>
            <input type="text" class="form-control border-secondary border-left-0 ps-0" placeholder="000 000" id="swal2-input1" aria-label="000 000" aria-describedby="basic-addon1" />
          </div>
          `,
        confirmButtonText: this.translate("button.confirm"),
        cancelButtonText: this.translate("button.cancel"),
        heightAuto: true,
        allowEnterKey: true,
        didOpen: () => {
          let input = document.getElementById("swal2-input1");
          input?.focus();

          function handleKeypress(e) {
            if (e.key === "Enter") {
              (document.getElementsByClassName("swal2-confirm")[0] as HTMLInputElement | null)?.click();
              e.preventDefault();
            }
          }

          input?.addEventListener("keydown", handleKeypress);
        },
        preConfirm: () => {
          let code = (document.getElementById("swal2-input1") as HTMLInputElement | null)?.value;

          if (code?.replace(/ /g, '').length === 6) {
            console.log(code.replace(/ /g, ''))
            if(offer == 'create'){
              this.createOffer(code)
              console.log(code)
            }
            if(offer == 'shelves'){
              this.createOfferShelves(code)
              console.log(code)
            }


          } else {
            ElMessage.error(this.translate('googleAuth.error2FA'));
            this.modal2FA()
          }
        },
        customClass: {
          title: "text-start mx-0 px-0",
          htmlContainer: "mx-0",
          input: "form-control form-control-lg form-control-solid w-auto",
          actions: "flex-row-reverse justify-content-start align-items-center w-100 m-0 gap-5 pt-0 border-light",
          confirmButton: "btn btn-lg btn-primary mw-100 rounded px-4 py-3 m-0",
          cancelButton: "btn btn-light rounded px-4 py-3 m-0",
        },
      })
    },
    prevStep(){
      this.stepsActive = this.stepsActive - 1
      let progress = 20
      this.progress = progress * this.stepsActive
    },

    getBalanceAndMessage() {
      ApiService.post(Api.uc.wallet, "").then(response => { this.balance = response.data.data.find(item => item.unit == 'RUB')})
    },
    createOffer(code: string){
      let price = this.formData.merchantFee / 100
      let pay = []
      for (let i = 0; i < this.paymentActive.length; i++){
        pay.push(this.paymentActive[i].id)
      }
      let auto = 0
      this.formData.auto ? auto = 1 : auto = 0
      let onlyCertified = 1
      this.formData.onlyCertified ? onlyCertified = 0 : onlyCertified = 1
      let formsData = new FormData();

      formsData.append("merchantFee", price);
      formsData.append("advertiseType", this.formData.advertiseType);
      formsData.append("coin.id", 22);
      formsData.append("minLimit", this.formData.minLimit);
      formsData.append("maxLimit", this.formData.maxLimit);
      formsData.append("timeLimit", this.formData.timeLimit.split(' ')[0]);
      formsData.append("country", this.formData.country);
      formsData.append("onlyCertified", onlyCertified);
      formsData.append("priceType", 0);
      formsData.append("remark", this.formData.remark);
      formsData.append("minRegistratinDays", 10);
      formsData.append("pay[]", pay);
      formsData.append("code", code);
      formsData.append("auto", auto);
      formsData.append("autoword", this.formData.autoword);

      ApiService.post(Api.otc.createOffer, formsData).then(
          response => {
            console.log(response)
            this.formData = this.formDataNull
            alert(this.formData)
            ElMessage.success(response.data.message)
          })
    },
    createOfferShelves(code){
      let price = this.formData.merchantFee / 100
      let pay = []
      for (let i = 0; i < this.paymentActive.length; i++){
        pay.push(this.paymentActive[i].id)
      }
      let auto = 0
      this.formData.auto ? auto = 1 : auto = 0
      let onlyCertified = 1
      this.formData.onlyCertified ? onlyCertified = 0 : onlyCertified = 1
      let formsData = new FormData();

      formsData.append("merchantFee", price);
      formsData.append("advertiseType", this.formData.advertiseType);
      formsData.append("coin.id", 22);
      formsData.append("minLimit", this.formData.minLimit);
      formsData.append("maxLimit", this.formData.maxLimit);
      formsData.append("timeLimit", this.formData.timeLimit);
      formsData.append("country", this.formData.country);
      formsData.append("onlyCertified", onlyCertified);
      formsData.append("priceType", 0);
      formsData.append("remark", this.formData.remark);
      formsData.append("minRegistratinDays", 10);
      formsData.append("pay[]", pay);
      formsData.append("code", code);
      formsData.append("auto", auto);
      formsData.append("autoword", this.formData.autoword);

      ApiService.post(Api.otc.createOfferShelves, formsData).then(
          response => {
            this.formData = this.formDataNull
            console.log(response.data.code)
            if(response.data.code == 0){
              this.lottieModal = !this.lottieModal
            } else {
              ElMessage.error(response.data.message)
            }

          })
    },
    activePaymentTypes(payment){
      console.log(this.paymentActive.length)
      if(this.paymentActive.length >= 5){
        // this.filterActive = false
        this.deactivatePaymentTypes(payment)
      } else {
        if(this.paymentActive.length <= 0){
          this.paymentActive.push(payment)
        }
        else {
          let coincidence = false
          this.paymentActive.find(pays => {if(pays.id == payment.id){coincidence = true} else {}})
          if(!coincidence){
            this.paymentActive.push(payment)
          } else {
            this.deactivatePaymentTypes(payment)
          }
        }
      }
    },
    deactivatePaymentTypes(payment){
      this.paymentActive.filter((pays, index) =>  {
        if(pays.id == payment.id){
          this.paymentActive.splice(index, 1)
        }
      })
    },
  },
  computed:{
    paymentTypesFilter:function(){
      return this.p2pStore.$state.paymentTypes.filter(pay => { return pay.paymentName.toLowerCase().indexOf(this.paySearch.toLowerCase())  > -1})
    },
    coinParams:function(){
      return this.p2pStore.$state.coinParams.find(item => item.unit == 'RUB')
    }
  },
  created(){
    // this.formDataNull = this.formData
    this.init()
  },
  mounted(){
    let modal = null
    modal = new Modal(document.getElementById('CreateOfferVerification'), {
      backdrop:'static'
    })
    this.p2pStore.saveModal('CreateOfferVerification', modal)
  },
});
</script>

<style scoped>
.step .active{
  background:#3E97FF;
  color:#fff;
}
.CreateOfferVerification .mtp-20{
  margin-top: 20px;
}
.step-chips {
  display:flex;
  align-items: center;
  justify-content: space-around;
  width:100%;
}
.step {
  display:flex;
  align-items: center;
}
.step-tittle {
  display:flex;
  align-items: center;
  font-size: 14px;
  line-height: 14px;
  font-weight: 600;
  width: 24px;
  height:24px;
  background:#EEF6FF;
  color:#3E97FF;
  border-radius:100%;
  justify-content: center;
}
.step-desc {
  font-size: 18px;
  line-height: 18px;
  font-weight: 600;
  color:#181C32;
  margin-left: 20px;
  width:170px;
}
.CreateOfferVerification .modal-header{
  border-bottom:none;
  position:relative;
}
.CreateOfferVerification .modal {
  max-width:440px;
  position: absolute;
  margin:auto;
  top:0px;
  bottom:0px;
  left:0px;
  right:0px;
}
.CreateOfferVerification .modal-footer {
  padding:0px;
  margin-top: 20px;
  border:none;
  padding:0px 25px 25px 25px;
}
.CreateOfferVerification .modal-body {
  padding:20px 25px;
  padding-bottom: 0px;
}
.CreateOfferVerification .w-125px {
  width:100% !important;
}
.CreateOfferVerification .form-step .multiselect  input{
  height:52px;
  border-radius:6px;
}
.progress-bar {
  position: absolute;
  bottom: 0px;
  left: 0px;
  right: 0;
  width: 100%;
  height: 4px;
}
.progress-bar .progress {
  height:4px;
  background:#3E97FF;
  border-radius:0px 2px 0px 0px;
  transition: all 500ms ease;
}
.btn-deposit {
  color:#7E8299;
  background:inherit;
}
.btn-deposit.active{
  color:#FFF;
  background: linear-gradient(0deg, #0FB05E, #0FB05E),
  linear-gradient(0deg, #50CD89, #50CD89);
  font-size: 16px;
  border-radius:3px;
  padding: 8px 0px;
}
.btn-box{
  padding:5px;
  background: #F3F6F9;
  border:1px solid #F3F6F9;
  border-radius:4px;
}
.btn-box button {
  border:none;
  outline:none;
  font-size:16px;
  padding:4px 15px 4px 15px;
  font-weight: 600;
  width:50%;
}
.btn-take{
  color:#7E8299;
  background: inherit;

}
.btn-take.active{
  background:#D9214E;
  border-radius:3px;
  color:#fff;
  font-size: 16px;
  border-radius:3px;
  padding: 8px 0px;
}
.btn-deposit:focus,.btn-take:focus {

}
.form-step .tittle{
  font-size: 14px;
  line-height: 14px;
  font-weight: 500;
  margin-bottom: 10px;
}
.desc {
  font-size: 14px;
  line-height: 22px;
  color:#7E8299;
  font-weight: 400;
  margin-top: 10px;
}
.input-box {
  margin-top: 25px;

}

.input-box .form-control{
  padding: 10px;
  padding-right: 35px;
  font-size: 16px;
}
.fz-16{
  font-size: 16px;
}
.input-tittle {
  font-size: 14px;
  line-height: 17px;
  margin-bottom: 10px;
  font-weight: 400;
  color:#3F4254;
}
.input-box {

}
.text-dark {
  color:#3F4254;
}
.text-gray {
  color:#7E8299;
}
.limit-box {
  display:flex;
}
.box-limit {
  width:50%;
  margin-right: 5px;
}
.box-balance {
  margin-left: 5px;
  width:50%;
}
.limit-box .form-control{
  padding-right: 55px;
}

.CreateOfferVerification .btn-light,.CreateOfferVerification .btn-light:hover{
  background:#EEF6FF;
  color:#3E97FF;
}
.CreateOfferVerification .multiselect-input{
  height: 52px;
}
.payment_choice h3 {
  color: #7E8299;
  font-size: 12px;
  font-weight: 500;
  padding: 13px 15px 13px 0px;
  padding-bottom: 0px;
}
.payment_choice .input-filter input {
  height:36px;
  margin-bottom: 4px;
}
.payment_choice p {
  padding: 10px 5px;
  margin:0px;
  font-size: 14px;
  display:flex;
  align-items: center;
  transition: all 500ms ease;
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
  width: 100%;
  min-height: 338px;
  position: absolute;
  border-radius: 6px;
  border: 1px solid #E1E3EA;
  overflow: scroll;
  max-height: 205px;
  z-index: 10;
  background: #fff;
  top:60px;
  padding: 10px;
  z-index: 10;
}
.payment-color {
  width:4px;
  height:12px;
  border-radius:5px;
  margin-right: 10px;
}
.box_under {
  margin-top: 5px;
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
p {
  color: #3F4254;
}
.cross {
  display: flex;
  font-size: 14px;
  align-items: center;
  margin-left: 4px;
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
.input-filter .active {
  border-color: #5d95ff;
  box-shadow: rgba(53, 122, 255, 0.2) 0px 0px 0px 2px;
}
.input-filter input {
  width:100%;
  border:1px solid #E1E3EA;
  padding:10px 15px;
  border-radius:6px;
  color: #5E6278;
  font-size: 14px;
  font-weight: 500;
  margin:10px 0px;
  margin-bottom: 0px;
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
  font-size: 20px;
  margin-left: 40px;
  background-size: 100%;
  display:flex;
  align-items: center;
  position:absolute;
  right:18px;
  top:20px;
}

.input-filter input:focus{
  outline:none;
}
.payment-types-active {
  display:flex;
  width:100%;
  flex-wrap: wrap;
}
.payment-input-box {
  position: relative;
}
.info {
  font-size: 12px;
  line-height: 12px;
  margin-top: 10px;
  font-weight: 400;
  margin-bottom: 0px;
}
.finish-order-box {
  display:flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}
.finish-order-box .order-tittle{
  display:flex;
  font-size: 14px;
  line-height: 14px;
  width:40%;
  margin-right: 10px;
  font-weight: 500;
}
.finish-order-box .order-desc{
  width:60%;
  font-size: 14px;
  line-height: 22px;
  display:block;
  font-weight: 500;
}
.finish-order-text {
  font-size: 14px;
  line-height: 22px;
  font-weight: 500;
}
.form-check:nth-of-type(2){
  margin-top: 20px;
  margin-bottom: 10px;
}
.custom-check {
  width: 38px;
  height: 26px;
  cursor:pointer;
}
.text-small {
  font-weight: 600;
  font-size: 14px;
  line-height: 14px;
}
.text-left {
  justify-content: flex-end;
  display: flex;
  width:100%;
  align-items: center;
}
.fw-500 {
  font-weight: 500;

}
.input-tittle a {
  display:flex;
  align-items: center;
  margin-left: 4px;
}
.text-left span {
  margin-left: 4px;
}
.fz-12 {
  font-size: 12px;
}
.finish-order-box .sell {
  color:#D9214E;
}
.finish-order-box .buy {
  color:#D9214E;
}
.error-style {
  position: relative;
  top:-3px;
}
.position-relative label{
  pointer-events: none;
  cursor:pointer;
}
.bi-check-lg {
  color:#7E8299;
  position:absolute;
  right:25px;
}
.no-focus {
  pointer-events: none;
}
</style>