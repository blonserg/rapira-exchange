<template>
  <div class="mb-6">
    <KTPageTitle />
  </div>
  <div class="mb-6">
    <!--begin::AssetsApp-->
    <AssetsApp />
    <!--end::AssetsApp-->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import KTPageTitle from "@/layouts/main-layout/toolbar/PageTitle.vue";
import AssetsApp from "@/components/assets/AssetsApp.vue";

export default defineComponent({
  name: "assets",
  components: {
    AssetsApp,
    KTPageTitle,
  },
  setup() {

    return {
    };
  },
});
</script>
