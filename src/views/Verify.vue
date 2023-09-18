<template>
  <div class="mb-10">
    <KTPageTitle />
  </div>
  <div class="mb-10">
    <!--begin::MyDeals-->
    <VerifyApp />
    <!--end::MyDeals-->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import KTPageTitle from "@/layouts/main-layout/toolbar/PageTitle.vue";
import VerifyApp from "@/components/settings/verify/VerifyApp.vue";

export default defineComponent({
  name: "verify",
  components: {
    KTPageTitle,
    VerifyApp,
  },
  setup() {

    return {
    };
  },
});
</script>
