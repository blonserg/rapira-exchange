<template>
  <div class="mb-10">
    <KTPageTitle />
  </div>

  <div class="mb-10">
    <!--begin::MyDeals-->
    <SavedAddresses />
    <!--end::MyDeals-->
  </div>
  <div class="mb-10">
    <!--begin::MyDeals-->
    <HistoryAddresses />
    <!--end::MyDeals-->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import SavedAddresses from "@/components/withdraw/withdrawAddress/SavedAddresses.vue";
import HistoryAddresses from "@/components/withdraw/withdrawAddress/HistoryAddresses.vue";

export default defineComponent({
  name: "withdrawAddress",
  components: {
    SavedAddresses,
    HistoryAddresses,
  },
  setup() {

    return {
    };
  },
});
</script>
