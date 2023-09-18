<template>
  <div class="mb-10">
    <KTPageTitle />
  </div>
  <div class="mb-10">
    <!--begin::MyDeals-->
    <DealsApp />
    <!--end::MyDeals-->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import KTPageTitle from "@/layouts/main-layout/toolbar/PageTitle.vue";
import DealsApp from "@/components/deals/DealsApp.vue";

export default defineComponent({
  name: "deals",
  components: {
    DealsApp,
    KTPageTitle,
  },
  setup() {

    return {
    };
  },
});
</script>
