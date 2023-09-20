<template>
  <div class="modal fade" tabindex="-1" id="AddPayemntMethod">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <div class="head">
            <h3 class="modal-title">Добавьте свой способ оплаты</h3>
            <p class="modal-desc">Заявка на добавление нового способа оплаты будет рассмотрена в течение нескольких часов. Ответ поступит на Вашу почту, указанную в
              <a href="#0">Настройках</a></p>
          </div>

        </div>

        <div class="modal-body">
          <input
              type="text"
              min="0"
              v-model="formData.paymentName"
              @input="changeSellTotal"
              class="form-control mb-2 text-start"
              placeholder="Название"
          />
          <input
              type="text"
              min="0"
              v-model="formData.unit"
              @input="changeSellTotal"
              class="form-control mb-2 text-start"
              placeholder="Валюты способа оплаты (необязательно)"
          />
          <input
              type="text"
              min="0"
              v-model="formData.country"
              @input="changeSellTotal"
              class="form-control mb-2 text-start"
              placeholder="Страна (необязательно)"
          />
          <input
              type="text"
              min="0"
              v-model="formData.remark"
              @input="changeSellTotal"
              class="form-control mb-2 text-start"
              placeholder="Введите примечание (необязательно)"
          />
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-light" data-bs-dismiss="modal">Отмена</button>
          <button type="button" class="btn btn-primary" @click="addPaymentType()">Добавить</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Api from "../../../config/api";
import ApiService from "@/core/services/ApiService";
import {ElMessage} from "element-plus"
import {Modal} from "bootstrap";
import { defineComponent } from "vue";

export default defineComponent({
  name: "AddPayemntMethod",
  data(){
    return {
      formData:{
        paymentName:'',
        remark:'',
        country:'',
        unit:'RUB',
        modal:null,
      },
    }
  },
  props:{
    modalTrigger:false,
  },
  watch:{
    modalTrigger(val){
      this.modalToggle()
    }
  },
  methods:{
    addPaymentType(){
      let formsData = new FormData();

      formsData.append("paymentName", this.formData.paymentName);
      formsData.append("remark", this.formData.remark);
      formsData.append("country", this.formData.country);
      formsData.append("unit", this.formData.unit);

      ApiService.post(Api.otc.addPaymentType, formsData).then(response => {
        console.log('addPaymentType', response)
        if(response.data.code != 0 ){
          ElMessage.error(response.data.message)
        } else {
          ElMessage.success(response.data.message)
        }

      }).catch(error => {
        console.log(error)
      })
    },
    modalToggle(){
      this.modal.toggle()
    },
  },
  mounted(){
    this.modal = new Modal(document.getElementById("AddPayemntMethod"), {
      // backdrop:'static',
    })
  }
})
</script>

<style scoped>
#AddPayemntMethod {
  z-index: 10000;
}
.btn-light,.CreateOfferVerification .btn-light:hover{
  background:#EEF6FF;
  color:#3E97FF;
}
.head {
  display:block;
}
.modal-title {
  color:#181C32;
  font-size: 18px;
  font-weight: 600;
  line-height: 18px;
}
.modal-desc {
  color:#7E8299;
  font-size: 14px;
  line-height: 22px;
  font-weight: 500;
  margin-top: 20px;
}
.modal-header{
  border-bottom:none;
  position:relative;
}
.modal-content {
  max-width:440px;
}
.modal-footer {
  padding:0px;
  margin-top: 20px;
  border:none;
  padding:0px 25px 25px 25px;
}
.modal-body {
  padding:20px 25px;
  padding-bottom: 0px;
}
.modal-body input {
  height: 48px;
}
.modal-body input::placeholder {
  color:#D8D8E5;
}
</style>