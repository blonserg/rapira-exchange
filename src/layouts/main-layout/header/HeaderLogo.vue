<template>
  <!--begin::Logo-->
  <div class="app-sidebar-logo pe-20" id="kt_app_sidebar_logo">
    <!--begin::Logo image-->
    <router-link to="/">
      <img
        v-if="themeMode === 'dark' && layout === 'dark-sidebar'"
        alt="Logo"
        :src="getAssetPath('media/logos/rapira-logo-dark.svg')"
        class="h-45px app-sidebar-logo-default"
      />
      <img
        v-if="themeMode === 'light' && layout === 'dark-sidebar'"
        alt="Logo"
        :src="getAssetPath('media/logos/rapira-logo.svg')"
        class="h-45px app-sidebar-logo-default"
      />
      <img
        alt="Logo"
        :src="getAssetPath('media/logos/rapira-logo-minimize.svg')"
        class="h-45px app-sidebar-logo-minimize"
      />
    </router-link>
    <!--end::Logo image-->
  </div>
  <!--end::Logo-->
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { ToggleComponent } from "@/assets/ts/components";
import { getAssetPath } from "@/core/helpers/assets";
import { layout, sidebarToggleDisplay, themeMode } from "@/core/helpers/config";

interface IProps {
  sidebarRef: HTMLElement | null;
}

const props = defineProps<IProps>();

const toggleRef = ref<HTMLFormElement | null>(null);

onMounted(() => {
  setTimeout(() => {
    const toggleObj = ToggleComponent.getInstance(
      toggleRef.value!
    ) as ToggleComponent | null;

    if (toggleObj === null) {
      return;
    }

    // Add a class to prevent sidebar hover effect after toggle click
    toggleObj.on("kt.toggle.change", function () {
      // Set animation state
      props.sidebarRef?.classList.add("animating");

      // Wait till animation finishes
      setTimeout(function () {
        // Remove animation state
        props.sidebarRef?.classList.remove("animating");
      }, 300);
    });
  }, 1);
});
</script>
