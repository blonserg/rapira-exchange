<template>
  <SetLoginModal/>
  <googleTurnOnModal :telegramLink="telegramLink"/>
  <VerificationModal/>
  <div class="modal fade" tabindex="-1" id="UserVerification" v-if="!this.modalOptions.verifi">

    <div class="modal-dialog" v-if="this.modalOptions.modalValidate">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title text-dark">Настройте аккаунт</h3>

          <!--begin::Close-->
          <div class="btn btn-icon btn-sm btn-active-light-primary ms-2" data-bs-dismiss="modal" aria-label="Close">
            <i class="ki-duotone ki-cross fs-1"><span class="path1"></span><span class="path2"></span></i>
          </div>
          <!--end::Close-->
        </div>

        <div class="modal-body">
          <p class="text-muted">Для использования P2P Площадки, необходимо задать логин, который будут видеть другие пользователи и включить GoogleAuth. Хотите настроить аккаунт? </p>
          <div class="alert-info-box">

            <div v-if="this.accountInfo.usernameBound == false" class="alert-danger danger-view"><span class=""><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
<path d="M7.00007 13.2766C6.54749 13.2779 6.10266 13.1591 5.7109 12.9325L2.50257 11.0833C2.11277 10.8562 1.7892 10.531 1.56406 10.1401C1.33891 9.74917 1.22003 9.30611 1.21924 8.85498V5.14498C1.22003 4.69385 1.33891 4.25078 1.56406 3.85985C1.7892 3.46892 2.11277 3.14374 2.50257 2.91664L5.7109 1.06748C6.10286 0.841181 6.54748 0.722046 7.00007 0.722046C7.45266 0.722046 7.89728 0.841181 8.28924 1.06748L11.4976 2.91664C11.8874 3.14374 12.2109 3.46892 12.4361 3.85985C12.6612 4.25078 12.7801 4.69385 12.7809 5.14498V8.85498C12.7801 9.30611 12.6612 9.74917 12.4361 10.1401C12.2109 10.531 11.8874 10.8562 11.4976 11.0833L8.28924 12.9325C7.8978 13.1599 7.45277 13.2787 7.00007 13.2766ZM7.00007 1.60998C6.70194 1.61011 6.40878 1.68641 6.1484 1.83164L2.91674 3.67498C2.66397 3.82768 2.45525 4.04348 2.31106 4.30119C2.16686 4.5589 2.09215 4.84967 2.09424 5.14498V8.85498C2.09215 9.15028 2.16686 9.44105 2.31106 9.69877C2.45525 9.95648 2.66397 10.1723 2.91674 10.325L6.12507 12.18C6.38549 12.3251 6.67864 12.4012 6.97674 12.4012C7.27484 12.4012 7.56799 12.3251 7.8284 12.18L11.0834 10.325C11.3405 10.1752 11.5539 9.96064 11.7023 9.70273C11.8507 9.44482 11.9289 9.15254 11.9292 8.85498V5.14498C11.9289 4.84742 11.8507 4.55513 11.7023 4.29722C11.5539 4.03931 11.3405 3.82478 11.0834 3.67498L7.87507 1.81998C7.60781 1.67085 7.3061 1.59441 7.00007 1.59831V1.60998Z" fill="#F1416C"/>
<path d="M6.99984 7.81664C7.15455 7.81664 7.30292 7.75518 7.41232 7.64579C7.52171 7.53639 7.58317 7.38802 7.58317 7.23331V4.51497C7.58317 4.36026 7.52171 4.21189 7.41232 4.1025C7.30292 3.9931 7.15455 3.93164 6.99984 3.93164C6.84513 3.93164 6.69675 3.9931 6.58736 4.1025C6.47796 4.21189 6.4165 4.36026 6.4165 4.51497V7.23331C6.4165 7.38802 6.47796 7.53639 6.58736 7.64579C6.69675 7.75518 6.84513 7.81664 6.99984 7.81664Z" fill="#F1416C"/>
<path d="M7.00016 10.0683C7.40287 10.0683 7.72933 9.74186 7.72933 9.33915C7.72933 8.93644 7.40287 8.60999 7.00016 8.60999C6.59746 8.60999 6.271 8.93644 6.271 9.33915C6.271 9.74186 6.59746 10.0683 7.00016 10.0683Z" fill="#F1416C"/>
</svg></span>Логин
            </div>

            <div v-if="this.accountInfo.googleStatus == 0 || this.accountInfo.googleStatus == null" class="alert-danger danger-view"><span class=""><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
<path d="M7.00007 13.2766C6.54749 13.2779 6.10266 13.1591 5.7109 12.9325L2.50257 11.0833C2.11277 10.8562 1.7892 10.531 1.56406 10.1401C1.33891 9.74917 1.22003 9.30611 1.21924 8.85498V5.14498C1.22003 4.69385 1.33891 4.25078 1.56406 3.85985C1.7892 3.46892 2.11277 3.14374 2.50257 2.91664L5.7109 1.06748C6.10286 0.841181 6.54748 0.722046 7.00007 0.722046C7.45266 0.722046 7.89728 0.841181 8.28924 1.06748L11.4976 2.91664C11.8874 3.14374 12.2109 3.46892 12.4361 3.85985C12.6612 4.25078 12.7801 4.69385 12.7809 5.14498V8.85498C12.7801 9.30611 12.6612 9.74917 12.4361 10.1401C12.2109 10.531 11.8874 10.8562 11.4976 11.0833L8.28924 12.9325C7.8978 13.1599 7.45277 13.2787 7.00007 13.2766ZM7.00007 1.60998C6.70194 1.61011 6.40878 1.68641 6.1484 1.83164L2.91674 3.67498C2.66397 3.82768 2.45525 4.04348 2.31106 4.30119C2.16686 4.5589 2.09215 4.84967 2.09424 5.14498V8.85498C2.09215 9.15028 2.16686 9.44105 2.31106 9.69877C2.45525 9.95648 2.66397 10.1723 2.91674 10.325L6.12507 12.18C6.38549 12.3251 6.67864 12.4012 6.97674 12.4012C7.27484 12.4012 7.56799 12.3251 7.8284 12.18L11.0834 10.325C11.3405 10.1752 11.5539 9.96064 11.7023 9.70273C11.8507 9.44482 11.9289 9.15254 11.9292 8.85498V5.14498C11.9289 4.84742 11.8507 4.55513 11.7023 4.29722C11.5539 4.03931 11.3405 3.82478 11.0834 3.67498L7.87507 1.81998C7.60781 1.67085 7.3061 1.59441 7.00007 1.59831V1.60998Z" fill="#F1416C"/>
<path d="M6.99984 7.81664C7.15455 7.81664 7.30292 7.75518 7.41232 7.64579C7.52171 7.53639 7.58317 7.38802 7.58317 7.23331V4.51497C7.58317 4.36026 7.52171 4.21189 7.41232 4.1025C7.30292 3.9931 7.15455 3.93164 6.99984 3.93164C6.84513 3.93164 6.69675 3.9931 6.58736 4.1025C6.47796 4.21189 6.4165 4.36026 6.4165 4.51497V7.23331C6.4165 7.38802 6.47796 7.53639 6.58736 7.64579C6.69675 7.75518 6.84513 7.81664 6.99984 7.81664Z" fill="#F1416C"/>
<path d="M7.00016 10.0683C7.40287 10.0683 7.72933 9.74186 7.72933 9.33915C7.72933 8.93644 7.40287 8.60999 7.00016 8.60999C6.59746 8.60999 6.271 8.93644 6.271 9.33915C6.271 9.74186 6.59746 10.0683 7.00016 10.0683Z" fill="#F1416C"/>
</svg></span>GoogleAuth
            </div>




            <div v-if="this.accountInfo.usernameBound == true" class="alert-success success-view"><span><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none"><g clip-path="url(#clip0_2736_16493)"><path d="M6.99984 1.54579C8.07857 1.54579 9.13308 1.86567 10.03 2.46499C10.9269 3.0643 11.626 3.91612 12.0388 4.91274C12.4516 5.90936 12.5597 7.00601 12.3492 8.06401C12.1388 9.12202 11.6193 10.0939 10.8565 10.8566C10.0937 11.6194 9.1219 12.1389 8.0639 12.3493C7.00589 12.5598 5.90924 12.4518 4.91262 12.039C3.916 11.6261 3.06418 10.9271 2.46487 10.0301C1.86555 9.1332 1.54567 8.07869 1.54567 6.99996C1.54567 5.55342 2.12031 4.16614 3.14316 3.14328C4.16602 2.12043 5.5533 1.54579 6.99984 1.54579ZM6.45734 7.86329L4.66651 6.06663C4.56189 5.9686 4.42483 5.91253 4.28151 5.90913C4.17385 5.91019 4.06888 5.94292 3.9797 6.00324C3.89052 6.06357 3.82108 6.14881 3.78002 6.24834C3.73897 6.34787 3.72812 6.45728 3.74883 6.56293C3.76955 6.66858 3.82091 6.7658 3.89651 6.84246L6.07234 9.02413C6.17917 9.11925 6.31722 9.1718 6.46026 9.1718C6.60329 9.1718 6.74135 9.11925 6.84817 9.02413L10.1148 5.75163C10.1904 5.67497 10.2418 5.57775 10.2625 5.4721C10.2832 5.36645 10.2724 5.25703 10.2313 5.1575C10.1903 5.05797 10.1208 4.97273 10.0316 4.91241C9.94246 4.85209 9.8375 4.81936 9.72984 4.81829C9.58651 4.8217 9.44946 4.87776 9.34484 4.97579L6.46317 7.89246M6.99984 0.729126C5.75959 0.729126 4.54718 1.0969 3.51595 1.78595C2.48472 2.475 1.68097 3.45437 1.20635 4.60022C0.731721 5.74606 0.607538 7.00692 0.849499 8.22334C1.09146 9.43976 1.6887 10.5571 2.56569 11.4341C3.44268 12.3111 4.56004 12.9083 5.77646 13.1503C6.99288 13.3923 8.25374 13.2681 9.39958 12.7935C10.5454 12.3188 11.5248 11.5151 12.2138 10.4838C12.9029 9.45261 13.2707 8.24021 13.2707 6.99996C13.2691 5.3373 12.608 3.74319 11.4323 2.56752C10.2566 1.39184 8.66249 0.73067 6.99984 0.729126Z" fill="#50CD89"/></g><defs><clipPath id="clip0_2736_16493"><rect width="14" height="14" fill="white"/></clipPath></defs></svg></span>
              Логин
            </div>

            <div v-if="this.accountInfo.googleStatus == 1" class="alert-success success-view"><span><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none"><g clip-path="url(#clip0_2736_16493)"><path d="M6.99984 1.54579C8.07857 1.54579 9.13308 1.86567 10.03 2.46499C10.9269 3.0643 11.626 3.91612 12.0388 4.91274C12.4516 5.90936 12.5597 7.00601 12.3492 8.06401C12.1388 9.12202 11.6193 10.0939 10.8565 10.8566C10.0937 11.6194 9.1219 12.1389 8.0639 12.3493C7.00589 12.5598 5.90924 12.4518 4.91262 12.039C3.916 11.6261 3.06418 10.9271 2.46487 10.0301C1.86555 9.1332 1.54567 8.07869 1.54567 6.99996C1.54567 5.55342 2.12031 4.16614 3.14316 3.14328C4.16602 2.12043 5.5533 1.54579 6.99984 1.54579ZM6.45734 7.86329L4.66651 6.06663C4.56189 5.9686 4.42483 5.91253 4.28151 5.90913C4.17385 5.91019 4.06888 5.94292 3.9797 6.00324C3.89052 6.06357 3.82108 6.14881 3.78002 6.24834C3.73897 6.34787 3.72812 6.45728 3.74883 6.56293C3.76955 6.66858 3.82091 6.7658 3.89651 6.84246L6.07234 9.02413C6.17917 9.11925 6.31722 9.1718 6.46026 9.1718C6.60329 9.1718 6.74135 9.11925 6.84817 9.02413L10.1148 5.75163C10.1904 5.67497 10.2418 5.57775 10.2625 5.4721C10.2832 5.36645 10.2724 5.25703 10.2313 5.1575C10.1903 5.05797 10.1208 4.97273 10.0316 4.91241C9.94246 4.85209 9.8375 4.81936 9.72984 4.81829C9.58651 4.8217 9.44946 4.87776 9.34484 4.97579L6.46317 7.89246M6.99984 0.729126C5.75959 0.729126 4.54718 1.0969 3.51595 1.78595C2.48472 2.475 1.68097 3.45437 1.20635 4.60022C0.731721 5.74606 0.607538 7.00692 0.849499 8.22334C1.09146 9.43976 1.6887 10.5571 2.56569 11.4341C3.44268 12.3111 4.56004 12.9083 5.77646 13.1503C6.99288 13.3923 8.25374 13.2681 9.39958 12.7935C10.5454 12.3188 11.5248 11.5151 12.2138 10.4838C12.9029 9.45261 13.2707 8.24021 13.2707 6.99996C13.2691 5.3373 12.608 3.74319 11.4323 2.56752C10.2566 1.39184 8.66249 0.73067 6.99984 0.729126Z" fill="#50CD89"/></g><defs><clipPath id="clip0_2736_16493"><rect width="14" height="14" fill="white"/></clipPath></defs></svg></span>
              GoogleAuth
            </div>

          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-light" data-bs-dismiss="modal">Отмена</button>
          <button type="button" class="btn btn-primary" @click="this.updateStatus()">Настроить</button>
        </div>

      </div>
    </div>

    <div class="modal-dialog" v-if="modalUpdateLoginStatus">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">Задайте логин</h3>

          <!--begin::Close-->
          <div class="btn btn-icon btn-sm btn-active-light-primary ms-2" data-bs-dismiss="modal" aria-label="Close">
            <i class="ki-duotone ki-cross fs-1"><span class="path1"></span><span class="path2"></span></i>
          </div>
          <!--end::Close-->
        </div>

        <div class="modal-body">


          <div class="alert alert-warning d-flex align-items-center p-5">
            <!--begin::Icon-->
            <i class="ki-duotone ki-shield-tick fs-2hx text-success me-4"><span class="path1"></span><span class="path2"></span></i>
            <!--end::Icon-->

            <!--begin::Wrapper-->
            <div class="d-flex flex-column">
              <!--begin::Title-->
              <h4 class="mb-1 text-dark">Обратите внимание</h4>
              <!--end::Title-->

              <!--begin::Content-->
              <span>Логин можно задать только один раз</span>
              <!--end::Content-->
            </div>
            <!--end::Wrapper-->
          </div>
        </div>

        <div class="modal-footer">

          <button data-bs-toggle="modal" data-bs-target="#kt_modal_login" class="btn btn-light-primary w-150px" >Задать</button>
          <button type="button" class="btn btn-light" @click="this.modalOptions.modalValidate = true, this.modalOptions.modalUpdateLoginStatus = false">Отмена</button>
          <button type="button" class="btn btn-primary">Задать</button>
        </div>

      </div>
    </div>


  </div>
</template>

<script lang="ts">
//@ts-nocheck
import SetLoginModal from "@/components/modals/settings/SetLoginModal.vue";
import googleTurnOnModal from "@/components/modals/settings/GoogleTurnOnModal.vue"
import VerificationModal from "@/components/modals/settings/VerificationModal.vue"
import {useP2PStore} from "@/stores/p2p";
import {Modal} from "bootstrap";
import { defineComponent } from "vue";

export default defineComponent({
  name: "UserVerification",
  components:{
    SetLoginModal,
    googleTurnOnModal,
    VerificationModal,
  },
  setup(){
    const p2pStore = useP2PStore();

    return {
      p2pStore,
    }
  },
  props:{
    telegramLink: {
      type: Object,
      default: () => {}
    },
    accountInfo: {
      type: Object,
      default: () => {}
    },
    modalOptions:{
      type: Object,
      default: () => {}
    },
  },
  methods:{
    updateStatus(){
      if(this.accountInfo.usernameBound == false) {

        this.modalOptions.modalUpdateLoginStatus = true
        this.modalOptions.modalValidate = false
      } else {
        this.modalOptions.modalUpdateLoginStatus = false
        if(this.accountInfo.phoneVerified == 0){
          this.p2pStore.modalTrigger("UserVerification").toggle()
          this.p2pStore.modalTrigger("kt_modal_verification").toggle()
          return true
        }
        if(this.accountInfo.googleStatus == 0 || this.accountInfo.googleStatus == null){
          this.modalOptions.modalUpdateGoogleStatus = true
          this.p2pStore.modalTrigger("UserVerification").toggle()
          this.p2pStore.modalTrigger("kt_modal_googleTurnOn").toggle()


          this.modalOptions.modalValidate = false
          return true
        } else {
          this.modalOptions.modalUpdateGoogleStatus = false
          this.modalOptions.modalValidate = true
        }


      }
    },
  },
  mounted(){
    let modalUser = new Modal(document.getElementById('UserVerification'), {
      // backdrop:'static',
    })
    this.p2pStore.saveModal('UserVerification', modalUser)
    let kt_modal_verification = new Modal(document.getElementById("kt_modal_verification"), {
      // backdrop:'static',
    })
    this.p2pStore.saveModal('kt_modal_verification', kt_modal_verification)
    let kt_modal_googleTurnOn = new Modal(document.getElementById("kt_modal_googleTurnOn"), {
      // backdrop:'static',
    })
    this.p2pStore.saveModal('kt_modal_googleTurnOn', kt_modal_googleTurnOn)
  }
})
</script>

<style scoped>
.btn {
  font-size: 16px;
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