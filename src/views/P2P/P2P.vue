<template>
  <p2p/>
  <deal/>
</template>

<script lang="ts">

import { defineComponent } from "vue";
import deal from "@/components/globalp2p/deal.vue"
import p2p from "@/components/globalp2p/p2p.vue"


export default defineComponent({
  name: "p2pview",
  components: {
    p2p,
    deal,
  },
  setup() {

    return {
      active:true,
    };
  },
});
</script>
<style>

</style>