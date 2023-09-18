<template>
  <div class="mb-10">
    <KTPageTitle />
  </div>
  <div class="mb-10">
    <!--begin::AmlAlert-->
    <AmlAlert />
    <!--end::AmlAlert-->
    <!--begin::AmlApp-->
    <AmlApp />
    <!--end::AmlApp-->
    <!--begin::AmlApp-->
    <AmlHistory />
    <!--end::AmlApp-->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import KTPageTitle from "@/layouts/main-layout/toolbar/PageTitle.vue";
import AmlApp from "@/components/aml/AmlApp.vue";
import AmlAlert from "@/components/aml/AmlAlert.vue";
import AmlHistory from "@/components/aml/AmlHistory.vue";

export default defineComponent({
  name: "aml-view",
  components: {
    AmlApp,
    AmlAlert,
    AmlHistory,
    KTPageTitle,
  },
  setup() {

    return {
    };
  },
});
</script>
