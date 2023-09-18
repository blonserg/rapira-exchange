<template>
  <div class="mb-10">
    <KTPageTitle />
  </div>
  <div class="mb-10">
    <!--begin::MyDeals-->
    <RefferalApp />
    <!--end::MyDeals-->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import KTPageTitle from "@/layouts/main-layout/toolbar/PageTitle.vue";
import RefferalApp from "@/components/refferal/RefferalApp.vue";

export default defineComponent({
  name: "refferal",
  components: {
    RefferalApp,
    KTPageTitle,
  },
  setup() {

    return {
    };
  },
});
</script>
