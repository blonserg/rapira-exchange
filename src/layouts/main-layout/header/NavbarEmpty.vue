<template>
  <!--begin::Navbar-->
  <div class="app-navbar flex-shrink-0">

    <!--begin::Theme mode-->
    <div class="app-navbar-item mx-1 ms-md-3">
      <!--begin::Menu toggle-->
      <a
          href="#"
          class="btn btn-icon btn-custom btn-icon-muted  btn-active-light btn-active-color-primary w-30px h-30px w-md-40px h-md-40px"
          data-kt-menu-trigger="{default:'click', lg: 'hover'}"
          data-kt-menu-attach="parent"
          data-kt-menu-placement="bottom-end"
      >
        <i v-if="themeMode === 'light'" class="ki-outline ki-sun fs-2 fs-md-1 theme-light-show"></i>
        <i v-else class="ki-outline ki-moon fs-2 fs-md-1 theme-dark-show" style="transform: scale(-1, 1)"></i>
      </a>
      <!--begin::Menu toggle-->
      <KTThemeModeSwitcher/>
    </div>
    <!--end::Theme mode-->

    <!--begin::Notifications-->
    <div class="app-navbar-item ms-1 ms-md-3">
      <!--begin::Menu- wrapper-->
      <a
          href="#"
          class="btn btn-icon svg_hover btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-30px h-30px w-md-40px h-md-40px"
          data-kt-menu-trigger="{default:'click', lg: 'hover'}"
          data-kt-menu-attach="parent"
          data-kt-menu-placement="bottom-end"
      >
        <span class="menu-icon">
             <GlobalSvg class="fs-2  fs-md-1"/>
        </span>

      </a>
      <KTLanguageSwitcher/>
      <!--end::Menu wrapper-->
    </div>
    <!--end::Notifications-->

    <!--begin::User menu-->
    <div class="app-navbar-item ms-1 ms-md-3">
      <!--begin::Username-->
      <div class="cursor-pointer d-flex align-items-center me-5 bg-hover-light-dark p-2 rounded-2"
           data-kt-menu-trigger="click"
           data-kt-menu-attach="parent"
           data-kt-menu-placement="bottom-end"
           v-if="isLogin"
      >

        <i class="menu-icon ki-outline ki-profile-circle fs-1 me-2"></i>
        <div class="d-flex flex-column me-2 ">
          <span class="text-gray-800 fw-semibold" @click="">{{ username }}</span>
          <span class="text-gray-500 fw-semibold fs-8">{{ email }}</span>
        </div>
        <!--end::Username-->

      </div>
      <KTUserMenu v-show="isLogin" />
      <div v-if="!isLogin" class="d-flex gap-4">
        <a
            href="#"
            class="btn btn-light-primary btn-navbar fw-bold"
            data-bs-toggle="modal"
            data-bs-target="#login-modal"
        >
          {{this.translate("mainMenu.logIn")}}
        </a>
        <a
            href="#"
            class="btn btn-primary btn-navbar fw-bold"
            data-bs-toggle="modal"
            data-bs-target="#register-modal"
        >
          {{this.translate("mainMenu.singUp")}}
        </a>
      </div>
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
        <KTIcon icon-name="text-align-left" icon-class="fs-2 fs-md-1"/>
      </div>
    </div>

    <!--end::Header menu toggle-->
  </div>
  <!--end::Navbar-->
</template>

<script lang="ts">
import {getAssetPath} from "@/core/helpers/assets";
import {defineComponent, computed} from "vue";
import {useI18n} from "vue-i18n";
import KTWallet from "@/layouts/main-layout/menus/Wallet.vue";
import KTUserMenu from "@/layouts/main-layout/menus/UserAccountMenu.vue";
import {useThemeStore} from "@/stores/theme";
import {ThemeModeComponent} from "@/assets/ts/layout";
import KTThemeModeSwitcher from "@/layouts/main-layout/theme-mode/ThemeModeSwitcher.vue";
import KTSidebarMenu from "@/layouts/main-layout/sidebar/SidebarMenu.vue";
import KTLanguageSwitcher from "@/layouts/main-layout/language-switcher/LanguageSwitcher.vue"
import GlobalSvg from "@/assets/svg/GlobalSvg.vue";
import {useBasicRequest} from "@/stores/basicRequests";

export default defineComponent({
  name: "header-navbar",
  components: {
    KTWallet,
    KTUserMenu,
    KTThemeModeSwitcher,
    KTSidebarMenu,
    KTLanguageSwitcher,
    GlobalSvg,
  },
  data() {
    return {}
  },
  setup() {
    const {t, te} = useI18n();

    const store = useThemeStore();
    const storeBasicRequest = useBasicRequest();

    const translate = (text: string) => {
      if (te(text)) {
        return t(text);
      } else {
        return text;
      }
    };

    const themeMode = computed(() => {
      if (store.mode === "system") {
        return ThemeModeComponent.getSystemMode();
      }
      return store.mode;
    });

    let dataCrypto;

    if (localStorage["id_token"]) {
      dataCrypto = computed<[]>(() => storeBasicRequest.wallet)
    }

    return {
      translate,
      themeMode,
      getAssetPath,
      storeBasicRequest,
      dataCrypto
    };
  },
  computed: {
    isLogin() {
      return !!localStorage["id_token"];
    },
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
});
</script>
<style lang="scss">
.svg_hover {
  color: #C5C5D8;
  &:hover {
    color: #3E97FF;
  }
}
</style>
<style scoped>
  .btn-navbar {
    padding-top: 8.5px !important;
    padding-bottom: 8.5px !important;
  }
</style>