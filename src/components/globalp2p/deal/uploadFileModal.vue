<template>
  <div class="modal fade" tabindex="-1" id="uploadFileModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">Отправка изображения</h3>
          <!--begin::Close-->
          <div class="btn btn-icon btn-sm btn-active-light-primary ms-2" data-bs-dismiss="modal" aria-label="Close">
            <i class="ki-duotone ki-cross fs-1"><span class="path1"></span><span class="path2"></span></i>
          </div>
          <!--end::Close-->
        </div>

        <div class="modal-body">
          <div class="uploaded_file">
            <img :src="this.visionFile" alt="">
          </div>
        </div>

        <div class="modal-footer">
          <div class="chat-footer">
            <label class="ico-paper" ><PaperClip/></label>
            <textarea
                class="relative form-control border-1 resize-none min-h-25px"
                rows="1"
                placeholder="Сообщение.."
            ></textarea>
            <label class="ico-send"><Airplane/></label>
          </div>
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
import Airplane from '@/assets/svg/Airplane.vue';
import PaperClip from '@/assets/svg/PaperClip.vue';
import { defineComponent } from "vue";

export default defineComponent({
  name: "uploadFileModal",
  components:{
    Airplane,
    PaperClip,
  },
  data(){
    return {
    }
  },
  props:{
    visionFile:Object,
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
    let modal = new Modal(document.getElementById('uploadFileModal'), {
      // backdrop:'static',
    })
    this.p2pStore.saveModal('uploadFileModal', modal)
  }
})
</script>

<style scoped>
.chat-footer {
  padding:10px 20px;
  position: relative;
  width:100%;
}
.modal-body {
  padding:0px 25px;
}
.modal-footer {
  border:none;
}
.uploaded_file {
  width:100%;
  height: auto;
}
.uploaded_file img {
  width:100%;
  height:auto;
}
.chat-footer textarea {
  border-radius:12px;
  padding:15px 44px;
}
.relative {
  position: relative;
}
.ico-paper {
  position: absolute;
  cursor: pointer;
  z-index: 2;
  left: 19px;
  width: 32px;
  height: 40px;
  top: 0px;
  bottom: 0px;
  margin: auto 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.ico-send {
  position: absolute;
  cursor:pointer;
  width:40px;
  height:40px;
  right:16px;
  top:0px;
  bottom: 0px;
  margin: auto 0;
  display: flex;
  align-items: center;
}
/*.input{*/
/*  display:none;*/
/*}*/
</style>