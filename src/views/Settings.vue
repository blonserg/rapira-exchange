<template>
  <div class="mb-6">
    <KTPageTitle />
  </div>
  <div class="mb-6">
    <!--begin::MyDeals-->
    <SettingsApp />
    <!--end::MyDeals-->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import KTPageTitle from "@/layouts/main-layout/toolbar/PageTitle.vue";
import SettingsApp from "@/components/settings/SettingsApp.vue";

export default defineComponent({
  name: "settings",
  components: {
    SettingsApp,
    KTPageTitle,
  },
  setup() {

    return {
    };
  },
});
</script>
