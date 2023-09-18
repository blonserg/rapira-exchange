<template>
  <div class="mb-6">
    <KTPageTitle />
  </div>
  <div class="mb-6">
    <!--begin::MyDeals-->
    <HistoryTransactions />
    <!--end::MyDeals-->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import KTPageTitle from "@/layouts/main-layout/toolbar/PageTitle.vue";
import HistoryTransactions from "@/components/history/HistoryTransactions.vue";

export default defineComponent({
  name: "history",
  components: {
    KTPageTitle,
    HistoryTransactions,
  },
  setup() {

    return {
    };
  },
});
</script>
