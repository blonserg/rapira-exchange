<template>
  <div id="kt_app_content_inner" class="app-content pb-0 flex-column-fluid">
    <!--begin::Content container-->
    <div
      id="kt_app_content_container"
      class="px-0"
      :class="{
        'container-fluid': contentWidthFluid,
        'container-xxl': !contentWidthFluid,
      }"
    >
      <RouterView></RouterView>
    </div>
    <!--end::Content container-->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { contentWidthFluid } from "@/core/helpers/config";
import { RouterView } from "vue-router";

export default defineComponent({
  name: "default-layout-content",
  components: {
    RouterView,
  },
  setup() {
    return {
      contentWidthFluid,
    };
  },
});
</script>

<style scoped>
#kt_app_content_inner,
#kt_app_content_container{
  min-height: calc(100vh - 107px);
}
</style>
