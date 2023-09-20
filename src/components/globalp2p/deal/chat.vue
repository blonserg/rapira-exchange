<template>
  <div id="chat">
    <div class="chat-head">
      <div class="box-description">
        <div class="user-box">
          <div class="user-name text-dark-500 fz-16">Gleba</div>
          <div class="user-verify"><Verify width="14" height="14"/> <span>⚡</span></div>
          <div class="user-status"><span class="badge badge-light-success">Online</span></div>
        </div>
        <div class="user-trade-info text-gray-500 fz-14">Сделок: 177 • 100%</div>
      </div>
      <div class="box-nav ">
        <span><Notify/></span>
        <span class="points"><points/></span>
      </div>
    </div>
    <div class="chat-body">
      <div class="message-box end">
        <div class="message my-message">
          <div class="text">Автоответ</div>
          <div class="time">11:56 <span><DodleCheck/></span></div>
        </div>
      </div>
      <div class="message-box start">
        <div class="message user-message">
          <div class="text">Тиньк \n офф 12341234 1234 1234 Иван Иванович И.</div>
          <div class="time">12:00</div>
        </div>
    </div>

      <div class="fast-response">Быстрые ответы</div>

    </div>
    <div class="chat-footer">
      <label tabindex="10" class="ico-paper" for="1"><PaperClip/></label>
      <input type="file" @change="handleFileUpload()" id="1" class="file">
      <textarea
          @input="resizeTextarea"
          ref="chatinput"
          class="relative form-control border-1 resize-none min-h-25px"
          placeholder="Сообщение.."
          rows="1"
          v-model="chatMessage"
      ></textarea>
      <label class="ico-send"><Airplane/></label>
    </div>
  </div>
  <uploadFile :visionFile="this.visionFile"/>
</template>

<script lang="ts">
import Verify from '@/assets/svg/Verify.vue';
import Notify from '@/assets/svg/Notify.vue';
import points from '@/assets/svg/points.vue';
import DodleCheck from '@/assets/svg/DodleCheck.vue';
import Airplane from '@/assets/svg/Airplane.vue';
import PaperClip from '@/assets/svg/PaperClip.vue';
import uploadFile from '@/components/globalp2p/deal/uploadFileModal.vue'
import {useP2PStore} from "@/stores/p2p";
import { defineComponent } from "vue";

export default defineComponent({
  name: "chat",
  components:{
    Verify,
    Notify,
    points,
    DodleCheck,
    PaperClip,
    Airplane,
    uploadFile,
  },
  data(){
    return {
      files:'',
      visionFile:[],
      chatMessage:'',
      chatrows:1,
    }
  },
  setup() {
    const p2pStore = useP2PStore();
    return {
      p2pStore,
    };
  },
  watch:{
  },
  methods:{
    handleFileUpload(){
      let that = this
      that.files = event.target.files[0]
      let reader = new FileReader()
      reader.onload = function (e) {
        that.visionFile = e.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
      console.log(that.files)
      this.p2pStore.modalTrigger("uploadFileModal").toggle()
    },
    resizeTextarea() {
      this.$refs.chatinput.style.height = "auto";
      this.$refs.chatinput.style.height = `${this.$refs.chatinput.scrollHeight}px`;
    },
  },
  mounted(){

  },
})
</script>

<style scoped>
.file {
  display:none;
}
.fz-16{
  font-size: 16px;
  line-height: 16px;
}
.fz-14{
  font-size: 14px;
  line-height: 14px;
}
#chat {
  width:526px;
  min-height:720px;
  background:#fff;
  border-radius:6px;
}
.box-description {

}
.chat-head {
  display:flex;
  justify-content: space-between;
  padding:20px 30px;
  border-bottom:1px solid #F1F1F2;
}
.user-box {
  display:flex;
  align-items: center;
}
.user-verify {
  margin-left: 4px;
  font-size: 11px;
  display:flex;
  align-items: center;
}
.user-verify span {
  margin-left: 4px;
}
.user-status span{
  background: #E8FFF3;
  color:#47BE7D;
  font-size: 9px;
  line-height: 10px;
  font-weight: 600;
  padding:4px;
  margin-left: 10px;
}
.user-trade-info {
  margin-top: 10px;
}
.text-dark-500 {
  color:#3F4254;
  font-weight: 500;
}
.text-gray-500 {
  color:#7E8299 !important;
  font-weight: 500;
}
.box-nav {
  display: flex;
  align-items: center;
  cursor:pointer;
}
.points {
  margin-left: 12px;
}
.message {
  padding:6px 8px;
  border-radius:10px 10px 0px 10px;
  position: relative;
  display:flex;
  max-width: 80%;
  padding-right:65px;
}
.chat-body {
  padding:0px 20px;
  height:506px;
  position:relative;
}
.my-message {
  background:#E8FFF3;
  color:#50CD89;
  position: relative;
  margin-left: 20%;
}
.my-message:before {
  content:'';
  clip-path: polygon(0 0, 38% 58%, 86% 100%, 0% 100%);
  width:15px;
  height:9px;
  background: #E8FFF3;
  border-radius:0px 0px 5px 0px;
  position: absolute;
  right:-12px;
  bottom:0px;
}
.user-message {
  background: #EEF6FF;
  color:#3E97FF;

}
.user-message:before{
  content:'';
  clip-path: polygon(0 0, 38% 58%, 86% 100%, 0% 100%);
  width:15px;
  height:9px;
  background: #EEF6FF;
  border-radius:0px 0px 5px 0px;
  position: absolute;
  left:-12px;
  bottom:0;
}
.time {
  margin-top: 10px;
  margin-left: 6px;
  font-size: 12px;
  line-height: 12px;
  font-weight: 500;
  position: absolute;
  bottom:6px;
  right:8px;
}
.text {
  color:#3F4254;
  line-height: 22px;
  font-size: 14px;
  font-weight: 500;
  white-space: pre-line;
  width:100%;

}
.end {
  justify-content: flex-end;
}
.start {
  justify-content: flex-start;
}
.message-box {
  margin-top: 20px;
  max-width: 100%;
  display:flex;
}
.chat-footer {
  padding:10px 20px;
  position: relative;
}
.chat-footer textarea {
  border-radius:12px;
  padding:15px 44px;
  overflow-y: hidden;
  height:auto;
}
.relative {
  position: relative;
}
.ico-paper {
  position: absolute;
  cursor: pointer;
  z-index: 2;
  left: 25px;
  width: 40px;
  height: 40px;
  bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
}

.ico-send {
  position: absolute;
  cursor:pointer;
  width:40px;
  height:40px;
  right:16px;
  bottom: 15px;
  display: flex;
  align-items: center;
}
.fast-response {
  color:#5E6278;
  font-size: 14px;
  line-height: 22px;
  font-weight: 500;
  border:1px solid #F1F1F2;
  border-radius:10px;
  padding:8px 6px;
  width:133px;
  position: absolute;
  bottom:0;
  cursor:pointer;
}
</style>