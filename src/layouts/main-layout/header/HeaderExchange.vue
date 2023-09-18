<template>
  <!--begin::Header-->
  <div id="kt_app_header" v-if="headerDisplay" class="app-header">
    <!--begin::Header container-->
    <div
      class="d-flex align-items-stretch justify-content-between w-100 px-6"
    >
      <KTHeaderLogo />
      <div
        v-if="layout === 'light-header' || layout === 'dark-header'"
        class="d-flex align-items-center flex-grow-1 flex-lg-grow-0 me-lg-15"
      >
        <router-link to="/">
          <img
            v-if="themeMode === 'light' && layout === 'light-header'"
            alt="Logo"
            :src="getAssetPath('media/logos/default.svg')"
            class="h-20px h-lg-30px app-sidebar-logo-default theme-light-show"
          />
          <img
            v-if="
              layout === 'dark-header' ||
              (themeMode === 'dark' && layout === 'light-header')
            "
            alt="Logo"
            :src="getAssetPath('media/logos/default-dark.svg')"
            class="h-20px h-lg-30px app-sidebar-logo-default"
          />
        </router-link>
      </div>
      <template v-else>
        <!--begin::Mobile logo-->
        <div class="d-flex align-items-center flex-grow-1 flex-lg-grow-0">
          <router-link to="/" class="d-lg-none">
            <img
              alt="Logo"
              :src="getAssetPath('media/logos/rapira-logo-minimize.svg')"
              class="h-30px"
            />
          </router-link>
        </div>
        <!--end::Mobile logo-->
      </template>
      <!--begin::Header wrapper-->
      <div
        class="app-header-wrapper d-flex align-items-stretch justify-content-between flex-lg-grow-1"
        id="kt_app_header_wrapper"
      >
        <KTHeaderMenu class="flex-lg-grow-1" />
        <KTHeaderNavbarEmpty />
      </div>
      <!--end::Header wrapper-->
    </div>
    <!--end::Header container-->
  </div>
  <!--end::Header-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent } from "vue";
import KTHeaderMenu from "@/layouts/main-layout/header/menu/Menu.vue";
import KTHeaderNavbarEmpty from "@/layouts/main-layout/header/NavbarEmpty.vue";
import KTHeaderLogo from "@/layouts/main-layout/header/HeaderLogo.vue"
import {
  headerDisplay,
  headerWidthFluid,
  layout,
  themeMode,
} from "@/core/helpers/config";

export default defineComponent({
  name: "layout-header-empty",
  components: {
    KTHeaderMenu,
    KTHeaderNavbarEmpty,
    KTHeaderLogo,
  },
  setup() {
    return {
      layout,
      headerWidthFluid,
      headerDisplay,
      themeMode,
      getAssetPath,
    };
  },
});
</script>
