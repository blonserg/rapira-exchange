<template>
  <!--begin::Footer-->
  <div v-if="footerDisplay" id="kt_app_footer" class="app-footer mx-6">
    <!--begin::Footer container-->
    <div
      class="app-container d-flex flex-center align-items-center justify-content-between flex-md-stack py-4"
      :class="{
        'container-fluid': footerWidthFluid,
        'container-xxl': !footerWidthFluid,
      }"
    >
      <!--begin::Copyright-->
      <div class="me-6">
        <Logo />
      </div>
      <div class="text-gray-500 order-2 order-md-1 text-start w-100">
        <span class="fw-semibold fs-6">© 2023, Rapira Group LLC. Все права защищены</span>
      </div>
      <!--end::Copyright-->
      <!--begin::Menu-->
      <ul class="menu menu-gray-600 menu-hover-primary fw-semibold order-1 d-flex align-items-center">
        <li class="menu-item me-5">
          <a
              href=""
              target="_blank"
              class="menu-link p-0"
          >
            <TelegramSvg />
          </a>
        </li>
        <li class="menu-item me-5">
          <a
              href=""
              target="_blank"
              class="menu-link p-0"
          >
            <VcSvg />
          </a>
        </li>
        <li class="menu-item me-5">
          <a
              href=""
              target="_blank"
              class="menu-link p-0"
          >
            <VkSvg />
          </a>
        </li>
        <li class="menu-item me-0" style="width: 20px;">
          <a
              href=""
              target="_blank"
              class="menu-link p-0"
          >
            <InstaSvg  />
          </a>
        </li>
      </ul>
      <!--end::Menu-->
    </div>
    <!--end::Footer container-->
  </div>
  <!--end::Footer-->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { footerDisplay, footerWidthFluid } from "@/core/helpers/config";
import { getAssetPath } from "@/core/helpers/assets";
import TelegramSvg from "@/assets/svg/Footer/TelegramSvg.vue";
import VcSvg from "@/assets/svg/Footer/VcSvg.vue";
import VkSvg from "@/assets/svg/Footer/VkSvg.vue";
import InstaSvg from "@/assets/svg/Footer/InstaSvg.vue";
import Logo from "@/assets/svg/Footer/LogoMinGreySvg.vue";
import { themeMode } from "@/core/helpers/config";

export default defineComponent({
  name: "theme-footer",
  components: {
    TelegramSvg,
    VcSvg,
    VkSvg,
    InstaSvg,
    Logo,
  },
  setup() {
    return {
      footerWidthFluid,
      footerDisplay,
      getAssetPath,
      themeMode,
    };
  },
});
</script>

<style scoped>
.app-footer {
  background: transparent;
}
</style>
