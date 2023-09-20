<template>
  <div class="container-deal">
  <div class="box-tittle">
    <h1 class="text-dark-600 mb-0 fz-22">Мои сделки</h1>
    <div class="text">
      <span class="text-gray-500 fz-14 pointer">Личный кабинет</span>
      -
      <span class="text-gray-500 fz-14 pointer">Мой P2P</span>
    </div>
  </div>

    <div class="box-head">
      <dealHead/>
    </div>

    <div class="box-body">
      <chat/>
      <dealBody/>
    </div>

    <div class="box-footer">

    </div>

  </div>
</template>

<script lang="ts">
import chat from '@/components/globalp2p/deal/chat.vue';
import dealBody from '@/components/globalp2p/deal/dealBody.vue';
import dealHead from '@/components/globalp2p/deal/dealHead.vue';
import { defineComponent } from "vue";
export default defineComponent({
  name: "deal",
  components:{
    dealHead,
    dealBody,
    chat,
  },
})
</script>

<style scoped>
.container-deal {
  width:1471px;
  padding:30px;
  margin:0 auto;
}
.fz-14 {
  font-size: 14px;
}
.fz-22 {
  font-size: 22px;
}
.pointer {
  cursor:pointer;
}
.mb-0 {
  margin-bottom: 0px;
}
.box-body {
  margin-top: 5px;
  display:flex;
}
</style>