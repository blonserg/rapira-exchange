<template>
  <div class="mb-6">
    <KTPageTitle />
  </div>
  <div class="mb-3">
    <!--begin::MyDeals-->
    <InfoP2p/>
    <!--end::MyDeals-->
  </div>
  <div class="mb-6">
    <!--begin::MyDeals-->
    <P2pApp/>
    <!--end::MyDeals-->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import KTPageTitle from "@/layouts/main-layout/toolbar/PageTitle.vue";
import InfoP2p from "@/components/p2p/InfoP2P.vue";
import P2pApp from "@/components/p2p/P2PApp.vue";

export default defineComponent({
  name: "p2p",
  components: {
    P2pApp,
    InfoP2p,
    KTPageTitle
  },
  setup() {

    return {
    };
  },
});
</script>
