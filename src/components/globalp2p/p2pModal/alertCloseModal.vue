<template>
  <div class="alertCloseModal">

    <div class="modal fade" tabindex="-1" id="alertCloseModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">Выйти из редактирования</h3>

            <!--begin::Close-->
            <div @click="this.p2pStore.modalTrigger(modalSecondName).toggle()" class="btn btn-icon btn-sm btn-active-light-primary ms-2" data-bs-dismiss="modal" aria-label="Close">
              <i class="ki-duotone ki-cross fs-1"><span class="path1"></span><span class="path2"></span></i>
            </div>
            <!--end::Close-->
          </div>

          <div class="modal-body">
            <p>Вы можете создать объявление без публикации, оно будет доступно в разделе “Мои объявлени”.
              Вы уверены, что хотите удалить объявление?</p>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-danger" @click="modalToggle()">Выйти</button>
            <button type="button" class="btn btn-light" @click="this.p2pStore.modalTrigger(modalSecondName).toggle()" data-bs-dismiss="modal">Отмена</button>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts">


import {Modal} from "bootstrap";
import {useP2PStore} from "@/stores/p2p";
import { defineComponent } from "vue";
export default defineComponent({
  name: "alertCloseModal",
  components:{
  },
  setup(){

    const p2pStore = useP2PStore();

    return {
      p2pStore,
    }
  },
  data() {
    return {
      modal:'',
    }
  },
  props:{
    modalTrigger:Boolean,
    modalSecondName:String,
  },
  watch:{
    modalTrigger(val){
      this.modalToggle()
      this.p2pStore.modalTrigger(this.modalSecondName).toggle()
    }
  },
  mounted(){
    this.modal = new Modal(document.getElementById("alertCloseModal"), {
      // backdrop:'static',
    })
    // console.log('refslottie',this.$refs.animate)
  },
  methods:{
    modalToggle(){
      this.modal.toggle()
    },
  },
})
</script>

<style scoped>
.alertCloseModal {

}
.alertCloseModal .modal {
  max-width: 400px;
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.alertCloseModal .modal .modal-header{
  display:block;
  position: relative;
  border:none;
  padding: 25px;
  padding-bottom: 0px;
}
.alertCloseModal .btn.btn-icon:not(.btn-outline):not(.btn-dashed):not(.border-hover):not(.border-active):not(.btn-flush) {
  position: absolute;
  right: 20px;
  top: 18px;
}
.alertCloseModal .modal .modal-header .modal-title{
  text-align: left;
  font-weight: 600;
  font-size: 18px;
  line-height: 18px;
  color:#181C32;
}
.modal-body p {
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  text-align: left;
  color:#5E6278;
}
.modal-body {
  padding-top:10px;
  padding-bottom: 0px;
}
.btn_comp {
  background:#EEF6FF;
  padding:12px 16px;
  font-weight: 700;
  font-size: 13px;
  line-height: 14px;
  text-align: center;
  margin:0 auto;
  display:block;
  max-width: 192px;
  margin-top: 35px;
}
.alertCloseModal .btn-light {
  background: #EEF6FF;
  color: #3E97FF;
}
.alertCloseModal .modal-footer{
  border:none;
  padding-top: 0px;
}
</style>