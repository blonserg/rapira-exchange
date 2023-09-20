<template>
  <div class="modal fade" tabindex="-1" id="addRequisites">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">Укажите реквизиты</h3>

          <!--begin::Close-->
          <div class="btn btn-icon btn-sm btn-active-light-primary ms-2" data-bs-dismiss="modal" aria-label="Close">
            <i class="ki-duotone ki-cross fs-1"><span class="path1"></span><span class="path2"></span></i>
          </div>
          <!--end::Close-->
        </div>

        <div class="modal-body">

          <div class="alert alert-warning d-flex align-items-center p-5">
            <i class="ki-duotone ki-shield-tick fs-2hx text-warning me-4"><span class="path1"></span><span class="path2"></span></i>
            <div class="d-flex flex-column">
              <h4 class="mb-1 text-warning">This is an alert</h4>
              <span>The alert component can be used to highlight certain parts of your page for higher content visibility.</span>
            </div>
          </div>


          <div class="tittle text-dark">Укажите информацию для получения средств</div>
                      <textarea
                                class="form-control border-1 p-5 pe-10 resize-none min-h-25px"
                                rows="4"
                                placeholder="Reply.."
                                v-model="formData.autoword"
                      ></textarea>
          <p class="info text-gray" v-if="formData.auto && formData.autoword.split('').length == 0 && formData.autoword.split('').length < 250">Не больше 250 символов</p>
          <p class="info text-gray" :class="{'text-danger':formData.autoword.split('').length > 250}" v-if="formData.autoword.split('').length > 10 "><span >{{formData.autoword.split('').length}}</span> из 250 символов</p>
          <p class="info text-gray text-danger" v-if="formData.autoword.split('').length >= 0 && formData.autoword.split('').length <= 10">От <span >10 </span> до 250 символов</p>

        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-light" data-bs-dismiss="modal">Отмена</button>
          <button type="button" class="btn btn-primary">Создать заявку</button>
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
import {useP2PStore} from "@/stores/p2p";
import {useBasicRequest} from "@/stores/basicRequests";
import {useAuthStore} from "@/stores/auth";
import { defineComponent } from "vue";
export default defineComponent({
  name: "addRequisites",
  data(){
    return {
      formData:{
        paymentName:'',
        remark:'',
        country:'',
        unit:'RUB',
        autoword:'',
      },
    }
  },
  setup() {
    const p2pStore = useP2PStore();
    return {
      p2pStore,
    };
  },
  methods:{

  },
  mounted(){
    let modal = new Modal(document.getElementById('addRequisites'), {
      // backdrop:'static',
    })
    this.p2pStore.saveModal('addRequisites', modal)
  }
})
</script>

<style scoped>
#addRequisites {

}
.modal-dialog {
  max-width:438px;
}
.modal-header {
  border-bottom:1px solid #E1E3EA;
  padding: 28px 25px;
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