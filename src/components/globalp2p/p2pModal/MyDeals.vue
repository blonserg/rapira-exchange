<template>
  <button type="button" class="btn btn-flush" @click="this.openModal()">
    Мои сделки
  </button>

  <div class="modal fade" tabindex="-1" id="MyDeals">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">Мои сделки</h3>
          <!--begin::Close-->
          <div class="btn btn-icon btn-sm btn-active-light-primary ms-2" data-bs-dismiss="modal" aria-label="Close">
            <i class="ki-duotone ki-cross fs-1"><span class="path1"></span><span class="path2"></span></i>
          </div>
          <!--end::Close-->
        </div>

        <div class="modal-body">
          <div class="nav-box">
            <div class="btn-row "><button :class="{'active':toggleOrders}" @click="toggleOrders = true, this.getMyOrders(this.orederStatusActive)">Активные</button> </div>
            <div class="btn-row"><button :class="{'active':!toggleOrders}" @click="toggleOrders = false, this.getMyOrders(this.orderStatusClose)">Завершенные</button></div>
          </div>
        </div>
          <div class="scroll-box">
          <div class="modal-body" v-for="(order, index) of this.myOrders" :key="index">
            <div class="box-head">
              <div class="tittle text-danger" v-if="order.advertiseType == 1">Вывод <span class="unit">{{ order.coin.unit }}</span></div>
              <div class="tittle text-success" v-if="order.advertiseType == 0">Пополнение <span class="unit">RUB</span></div>
              <div class="status-box" v-if="order.status == 2">
                <i class="ico"></i>
                <div class="alert alert-warning d-flex align-items-center" ><span>Оплачено</span></div>
              </div>
              <div class="status-box" v-if="order.status == 4">
                <i class="ico"></i>
                <div class="alert alert-danger d-flex align-items-center" ><span>Арбитраж</span></div>
              </div>
              <div class="status-box" v-if="order.status == 3">
                <i class="ico"></i>
                <div class="alert alert-success d-flex align-items-center" ><span>Завершено</span></div>
              </div>
              <div class="status-box" v-if="order.status == 0">
                <i class="ico"></i>
                <div class="alert alert-cancel d-flex align-items-center" ><span>Отменено</span></div>
              </div>
              <div class="status-box" v-if="order.status == 1">
                <i class="ico"></i>
                <div class="alert alert-info d-flex align-items-center" ><span>Не оплачено</span></div>
              </div>


          </div>

            <div class="info-block">
              <div class="box">
              <div class="text-muted">Списано с кошелька</div>
              <div class="text-dark">{{ order.money }} {{ order.coin.unit }}</div>
              </div>
              <div class="box">
                <div class="text-muted">Комиссия</div>
                <div class="text-dark">{{ order.merchantFee * 100 }} %</div>
              </div>
              <div class="box">
                <div class="text-muted">Получил</div>
                <div class="text-dark">{{ order.number }} {{ order.coin.unit }}</div>
              </div>
              <div class="box">
                <div class="text-muted">Контрагент</div>
                <div class="text-dark"><a href="">{{order.member.username}}</a></div>
              </div>
            </div>

          </div>
          </div>

        <div class="modal-footer">
          <button type="button" data-bs-dismiss="modal" class="btn-custom"><router-link to="/p2p">Смотреть все в разделе Мой P2P</router-link></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" >
// @ts-nocheck
import {useI18n} from "vue-i18n";
import {getAssetPath} from "@/core/helpers/assets";
import ApiService from "@/core/services/ApiService";
import Api from "@/config/api";
import {useAuthStore} from "@/stores/auth";
import {useP2PStore} from "@/stores/p2p";
import {Modal} from "bootstrap";
import { defineComponent } from "vue";

export default defineComponent({
  name: "MyDeals",
  components: {
  },
  data(){
    return {
      myOrders:[],
      toggleOrders:true,
      orederStatusActive:[1,2,4],
      orderStatusClose:[0,3],
    } as any
  },
  setup() {
    const isAuthenticated = useAuthStore().isAuthenticated;
    const p2pStore = useP2PStore()
    return {
      isAuthenticated,
      p2pStore,
    };
  },

  methods:{
    init(){
      // this.getPages();
      if(this.isAuthenticated){
        this.getMyOrders(this.orederStatusActive)
      }
    },
    getMyOrders(status){
      let formData = new FormData();
      formData.append("pageNo", 0);
      formData.append("pageSize", 20);
      formData.append("status[]", status);

      ApiService.post(Api.otc.myOrder, formData).then(response => {
        this.myOrders = response.data.data.content
        console.log('getMyOrders', this.myOrders)
      })
    },
    openModal(){
      if(this.isAuthenticated == false){
        this.p2pStore.modalTrigger('login-modal').toggle()
      } else {
        this.p2pStore.modalTrigger('MyDeals').toggle()
      }
    }
  },
  created(){
    this.init()
  },
  mounted(){

    let modal = new Modal(document.getElementById('MyDeals'), {
      // backdrop:'static',
    })
    console.log('MyDeals', modal)
    this.p2pStore.saveModal('MyDeals', modal)
  }
});
</script>


<style scoped>
.modal-dialog {

}
.modal-footer {
  justify-content: center;
  border:none;
}
.btn-custom {
  color:#2884EF;
  font-size: 14px;
  line-height: 14px;
  font-weight: 600;
  padding:9px 40px;
  background:#EEF6FF;
  border:none;
  outline:none;
  border-radius:6px;
}
.scroll-box {
  max-height: 466px;
  overflow:auto;
}
.unit {
  color:#3F4254;
  font-size: 16px;
  font-weight: 600;
  line-height: 16px;
}
.text {
  background:none;
  outline:none;
  border:none;
  color:#000;
  font-weight: 500;
  font-size: 16px;
}
.modal-header {
  text-align: center;
}
.nav-box {
  display:flex;
  justify-content: flex-start;
  align-items: center;
}
.nav-box button {
  background:none;
  outline:none;
  font-size: 14px;
  font-weight: 600;
  color:#7E8299;
  border:none;
  padding:12px 16px;
  border-radius: 6px;
}
.nav-box .active {
  color:#3E97FF;
  background: #EEF6FF;
}
.btn-row {
  display:flex;
  align-items: center;
}
.btn-row span {
  height:20px;
  width:20px;
  display:flex;
  align-items: center;
  background: #3E97FF1A;
  font-size: 12px;
  font-weight: 600;
  color:#3E97FF;
  border-radius:100%;
  justify-content: center;
}

.alert-danger, .alert-success, .alert-warning, .alert-cancel, .alert-info {
  border:none;
  max-width:113px;
  padding:0.33rem 0.8rem !important;
  justify-content: center;
}
.alert-cancel {
  background:#F1F1F2;
  color:#7E8299;
}
.alert-info {
  background:#EEF6FF;
  color:#2884EF;
}
.status-box span{
  font-size: 14px;
}
.info-block {
  position:relative;
  /*margin-top: 15px;*/
}
.box {
  display:flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 3px;
}
.modal-body {
  position: relative;
  border-bottom: 1px solid #F1F1F2;
  padding: 15px 30px;
}
.modal-body:first-child {
  border-bottom:none;
}
.text-dark {
  color:#3F4254;
  font-size: 14px;
  font-weight: 600;
}
.text-muted {
  color:#7E8299;
  font-size: 14px;
  font-weight: 500;
}
.text-muted span{
  margin-left: 5px;
}
.btn {
  font-size: 16px;
  font-weight: 600;
}
.modal-body:first-child{
  border-bottom:0px solid #fff;
}
.box-head {
  display:flex;
  justify-content: space-between;
  align-items: center;
}
</style>