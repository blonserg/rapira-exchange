<template>
  <div class="mb-6">
    <KTPageTitle />
  </div>
  <div class="mb-3">
    <!--begin::MyDeals-->
    <WithdrawApp />
    <!--end::MyDeals-->
  </div>

  <div class="mb-6">
    <!--begin::MyDeals-->
    <WithdrawHistory />
    <!--end::MyDeals-->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import KTPageTitle from "@/layouts/main-layout/toolbar/PageTitle.vue";
import WithdrawApp from "@/components/withdraw/WithdrawApp.vue";
import WithdrawHistory from "@/components/withdraw/WithdrawHistory.vue";

export default defineComponent({
  name: "withdraw",
  components: {
    KTPageTitle,
    WithdrawHistory,
    WithdrawApp,
  },
  setup() {

    return {
    };
  },
});
</script>
