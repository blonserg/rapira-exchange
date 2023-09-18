<template>
  <div class="mb-6">
    <KTPageTitle />
  </div>
  <div class="mb-3">
    <!--begin::MyDeals-->
    <DepositApp />
    <!--end::MyDeals-->
  </div>
  <div class="mb-6">
    <!--begin::MyDeals-->
    <DepositHistory />
    <!--end::MyDeals-->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import KTPageTitle from "@/layouts/main-layout/toolbar/PageTitle.vue";
import DepositHistory from "@/components/deposit/DepositHistory.vue";
import DepositApp from "@/components/deposit/DepositApp.vue";

export default defineComponent({
  name: "deposit",
  components: {
    KTPageTitle,
    DepositHistory,
    DepositApp,
  },
  setup() {

    return {
    };
  },
});
</script>
