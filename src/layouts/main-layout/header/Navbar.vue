<template>
  <!--begin::Navbar-->
  <div class="app-navbar flex-shrink-0">

    <!--begin::Theme mode-->
    <div class="app-navbar-item ms-1 ms-md-3">
      <!--begin::Menu toggle-->
      <a
          href="#"
          class="btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-30px h-30px w-md-40px h-md-40px"
          data-kt-menu-trigger="{default:'click', lg: 'hover'}"
          data-kt-menu-attach="parent"
          data-kt-menu-placement="bottom-end"
      >
        <i v-if="themeMode === 'light'" class="ki-outline ki-sun fs-2 fs-md-1 theme-light-show"></i>
        <i v-else class="ki-outline ki-moon fs-2 fs-md-1 theme-dark-show" style="transform: scale(-1, 1)"></i>
      </a>
      <!--begin::Menu toggle-->
      <KTThemeModeSwitcher />
    </div>
    <!--end::Theme mode-->

    <!--begin::Notifications-->
    <div class="app-navbar-item ms-1 ms-md-3 overflow-hidden">
      <!--begin::Menu- wrapper-->
      <!--begin::Balance-->
      <div class="cursor-pointer d-none d-md-flex flex-column align-items-end app-navbar-balance p-1 pe-4 ps-4"
           data-kt-menu-trigger="click"
           data-kt-menu-attach="parent"
           data-kt-menu-placement="bottom-end"
           id="wallet-modal"
      >
        <span class="fw-semibold text-muted text-right fs-8"
        >Всего USDT ≈</span>
        <div v-if="showAllBalance" class="fw-bold d-flex align-items-center fs-5">
          {{ numberFormatting(totalUSDT) }}
        </div>
        <div v-else class="fw-bold d-flex align-items-center fs-5">
          ****
        </div>
      <!--end::Balance-->
      </div>
      <KTWallet :totalUSDT="numberFormatting(totalUSDT)"/>
      <!--end::Menu wrapper-->
    </div>
    <!--end::Notifications-->

    <!--begin::User menu-->
    <div class="app-navbar-item ms-1 ms-md-3">
      <!--begin::Username-->
      <div class="cursor-pointer d-flex align-items-center  me-5 bg-hover-light-dark p-2 rounded-2"
           data-kt-menu-trigger="hover"
           data-kt-menu-attach="parent"
           data-kt-menu-placement="bottom-end">
        <i class="menu-icon ki-outline ki-profile-circle fs-1 me-2"></i>
        <div class="d-flex flex-column me-2 ">
          <span class="text-gray-800 fw-semibold" @click="">{{ username }}</span>
          <span class="text-gray-500 fw-semibold fs-8">{{ email }}</span>
        </div>
      <!--end::Username-->

      </div>
      <KTUserMenu />
      <!--end::Menu wrapper-->
    </div>
    <!--end::User menu-->

    <!--begin::Header menu toggle-->
    <div
      class="app-navbar-item d-lg-none ms-2 me-n3"
    >
      <div
        class="btn btn-icon btn-active-color-primary w-30px h-30px w-md-35px h-md-35px"
        id="kt_app_header_menu_toggle"
      >
        <KTIcon icon-name="text-align-left" icon-class="fs-2 fs-md-1" />
      </div>
    </div>
    <!--end::Header menu toggle-->
  </div>
  <!--end::Navbar-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import {defineComponent, computed, watch} from "vue";
import KTWallet from "@/layouts/main-layout/menus/Wallet.vue";
import KTUserMenu from "@/layouts/main-layout/menus/UserAccountMenu.vue";
import { useThemeStore } from "@/stores/theme";
import { ThemeModeComponent } from "@/assets/ts/layout";
import KTThemeModeSwitcher from "@/layouts/main-layout/theme-mode/ThemeModeSwitcher.vue";
import KTSidebarMenu from "@/layouts/main-layout/sidebar/SidebarMenu.vue";
import {useBasicRequest} from "@/stores/basicRequests";

export default defineComponent({
  name: "header-navbar",
  components: {
    KTWallet,
    KTUserMenu,
    KTThemeModeSwitcher,
    KTSidebarMenu
  },

  setup() {
    const store = useThemeStore();
    let storeBasicRequest = useBasicRequest();

    const themeMode = computed(() => {
      if (store.mode === "system") {
        return ThemeModeComponent.getSystemMode();
      }
      return store.mode;
    });

    let dataCrypto = computed<[]>(() => storeBasicRequest.wallet)

    let showAllBalance = computed<boolean>(() => !storeBasicRequest.showAllBalance);

    return {
      themeMode,
      getAssetPath,
      storeBasicRequest,
      dataCrypto,
      showAllBalance
    };
  },
  computed: {
    totalUSDT() {
      let total: number = 0;
      this.dataCrypto.forEach(item => {
        total += (item["balance"] + item["frozenBalance"]) * item["usdRate"];
      })
      return total;
    },
    username() {
      if (localStorage["id_token"]) {
        return this.storeBasicRequest.securitySetting.username
      } return "username"

    },
    email() {
      if (localStorage["id_token"]) {
        return this.storeBasicRequest.securitySetting.email
      }
      return "email"
    },
  },
  methods: {
    numberFormatting(number) {
      return new Intl.NumberFormat("ru", {style: "decimal", maximumFractionDigits: 2}).format(number);
    },
  },
  created() {},
});
</script>
