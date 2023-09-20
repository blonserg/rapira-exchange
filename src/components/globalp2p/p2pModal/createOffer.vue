<template>
  <button @click="CreateOffer()" type="button" class="btn btn-flush">
    Создать объявление
  </button>


<!--  <UserVerification-->
<!--      :accountInfo="this.accountInfo"-->
<!--      :telegramLink="this.telegramLink"-->
<!--      :modalOptions="this.modalOptions"-->
<!--  />-->
  <CreateOfferVerification/>
<!--  <googleTurnOffModal/>-->
<!--<VerificationModal/>-->



</template>

<script lang="ts">
import ApiService from "../../../core/services/ApiService";
import Api from "../../../config/api";
import {useAuthStore} from "@/stores/auth";
import {useBasicRequest} from "@/stores/basicRequests";
// import UserVerification from '@/components/globalp2p/p2pModal/UserVerification.vue'
import CreateOfferVerification from '@/components/globalp2p/p2pModal/CreateOfferVerification.vue'
import {ElMessage} from "element-plus";
import {Modal} from "bootstrap";
import {useP2PStore} from "@/stores/p2p";
import { defineComponent } from "vue";

export default defineComponent({
  name: "createOffer",
  components: {
    // UserVerification,
    CreateOfferVerification,
    // googleTurnOffModal,
  },
  data(){
    return {
      authModal:null,
      myOrders:[],
      accountInfo:{
        usernameBound:false,
        googleStatus:null,
      },
      telegramLink:{},
      modalOptions:{
        verifi:false,
        modalValidate:true,
        modalUpdateLoginStatus:false,
        modalUpdateGoogleStatus:false,
      },
    }
  },
  setup() {
    const p2pStore = useP2PStore();
    const storeBasicRequest = useBasicRequest();
    const isAuthenticated = useAuthStore().isAuthenticated;
    return {
      storeBasicRequest,
      isAuthenticated,
      p2pStore,
    };
  },

  methods:{
    init(){
      this.getUserSetting()
    },
    CreateOffer(){
      if(this.isAuthenticatedUser() == false) {
        this.p2pStore.modalTrigger("login-modal").toggle()
        return false
      } else {
        if(this.modalOptions.verifi == false){
          this.p2pStore.modalTrigger("UserVerification").toggle()
        } else {
          this.p2pStore.modalTrigger("CreateOfferVerification").toggle()
        }
      }
    },
    getUserSetting() {
      ApiService.post(Api.uc.securitySetting, "").then(response => {
          this.accountInfo = response.data.data
          this.accountValidate()
          console.log(this.accountInfo.usernameBound, this.accountInfo.googleStatus)
          // this.accountValidate()

      })
    },
    isAuthenticatedUser() {
      if (this.isAuthenticated) {
        this.getUserSetting()
      } else {
        return false
      }
    },
    accountValidate(){
      if(this.accountInfo.usernameBound == false || this.accountInfo.googleStatus == null){
        this.modalOptions.modalValidate = true
      }
      if(this.accountInfo.usernameBound == true && this.accountInfo.googleStatus == 1){
        this.modalOptions.verifi = true
      }
    },
    getLinkTelegram() {
      ApiService.post(Api.uc.telegramUrl, "").then(response => {
        this.telegramLink = response.data.data;
        console.log(this.telegramLink)
      }).catch(response => {
        ElMessage.error(response.message)
      })
    },
    async toGetTelegram() {
      await this.getLinkTelegram();
    },
    // createOffer(){
    //     let formData = new FormData();
    //     formData.append("pageNo", 1);
    //     formData.append("pageSize", 10);
    //     formData.append("status[]", status);
    //
    //     ApiService.post(Api.otc.myOrder, formData).then(response => {
    //       this.paymentTypes = response.data.data
    //       console.log(this.paymentTypes)
    //     })
    // }
  },
  created(){
    this.init()
    },
  mounted(){
    let modal = new Modal(document.getElementById("login-modal"), {
      // backdrop:'static',
    })
    this.p2pStore.saveModal('login-modal', modal)
  }
});
</script>

<style scoped>
.btn {
  font-size: 16px;
  font-weight: 600;
}
.text-dark {
  font-size: 18px;
  font-weight: 600;
}
.text-muted {
  font-size: 14px;
  color:#5E6278;
  font-weight: 500;
}

.alert-info-box {
  display:flex;
}
.alert-info-box span {
  margin-right: 5px;
  height: 14px;
  width: 14px;
  display: flex;
}
.danger-view {
  color:#D9214E;
  background: #FFF5F8;
  padding:6px;
  display:flex;
  align-items: center;
  border-radius:5px;
  margin-left: 10px;
}
.success-view {
  background:#E8FFF3;
  color:#47BE7D;
  padding:6px;
  display:flex;
  align-items: center;
  border-radius:5px;
  margin-left: 10px;
}
.danger-view:first-child, .success-view:first-child {
  margin-left: 0px;
}
.btn-light {
  background:#EEF6FF;
  color:#3E97FF;
}
.modal-footer .btn-light:hover {
  background-color:#EEF6FF;
  background:#EEF6FF;
  color:#3E97FF;
}

</style>