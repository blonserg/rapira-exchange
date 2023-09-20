<template>
  <div class="lottieAnimate">

    <div class="modal fade" tabindex="-1" id="lottieAnimate">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">{{data.modalTittle}}</h3>

            <!--begin::Close-->
            <div class="btn btn-icon btn-sm btn-active-light-primary ms-2" data-bs-dismiss="modal" aria-label="Close">
              <i class="ki-duotone ki-cross fs-1"><span class="path1"></span><span class="path2"></span></i>
            </div>
            <!--end::Close-->
          </div>

          <div class="modal-body">
            <p>{{data.modalDescription}}</p>
            <Vue3Lottie
                ref="lottieAnimation"
                :animationData="getEmoji()"
                :autoPlay="false"
                :loop="false"
                :height="this.height"
                :width="this.width"
            />
            <router-link @click="modalToggle()" :to="data.modalBtnLink" class="btn_comp">
              {{data.modalBtnText}}
            </router-link>
          </div>


        </div>
      </div>
    </div>

  </div>
</template>

<script>

import { Vue3Lottie } from 'vue3-lottie'
import petard from '../../../assets/lottie/petard.json'
import bad from '../../../assets/lottie/bad.json'
import police from '../../../assets/lottie/police.json'
import time from '../../../assets/lottie/time.json'
import handshake from '../../../assets/lottie/handshake.json'
import wowstar from '../../../assets/lottie/wowstar.json'
import normal from '../../../assets/lottie/normal.json'
import anger from '../../../assets/lottie/anger.json'
import moon from '../../../assets/lottie/moon.json'
import magnifier from '../../../assets/lottie/magnifier.json'
import {Modal} from "bootstrap";
import { defineComponent } from "vue";
export default defineComponent({
  name: "lottieAnimate",
  components:{
    Vue3Lottie,
  },
  data() {
    return {
      dataEmoji:[
        {name:'petard', data:petard},
        {name:'bad', data:bad},
        {name:'police', data:police},
        {name:'time', data:time},
        {name:'handshake', data:handshake},
        {name:'wowstar', data:wowstar},
        {name:'normal', data:normal},
        {name:'anger', data:anger},
        {name:'moon', data:moon},
        {name:'magnifier', data:magnifier},
      ],
      modal:'',
      emoji:null,
    }
  },
  props:{
    data: {
      type:Object,
    },
    width:null,
    height:null,
    modalTrigger:false,
  },
  watch:{
    data(val) {
      this.getEmoji()
    },
    modalTrigger(val){
        this.modalToggle()
        this.$refs.lottieAnimation.stop()
        this.$refs.lottieAnimation.play()
    }
  },
  mounted(){
    this.modal = new Modal(document.getElementById("lottieAnimate"), {
      // backdrop:'static',
    })
    // console.log('refslottie',this.$refs.animate)
  },
  methods:{
    modalToggle(){
      this.modal.toggle()
    },
    getEmoji(){
      let data = this.dataEmoji.find(em => {return em.name == this.data.emoji})
      return data.data
    }
  },
})
</script>

<style scoped>
.lottieAnimate {

}
.lottieAnimate .modal {
  max-width: 400px;
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.lottieAnimate .modal .modal-header{
  display:block;
  position: relative;
  border:none;
  padding: 25px;
  padding-bottom: 0px;
}
.lottieAnimate .btn.btn-icon:not(.btn-outline):not(.btn-dashed):not(.border-hover):not(.border-active):not(.btn-flush) {
  position: absolute;
  right: 20px;
  top: 18px;
}
.lottieAnimate .modal .modal-header .modal-title{
  text-align: center;
  font-weight: 600;
  font-size: 18px;
  line-height: 18px;
}
.modal-body p {
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  text-align: center;
  color:#5E6278;
}
.modal-body {
  padding-top:10px;
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
</style>