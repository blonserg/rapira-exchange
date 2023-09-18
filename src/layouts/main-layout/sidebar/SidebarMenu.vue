<template>
  <!--begin::sidebar menu-->
  <div class="app-sidebar-menu overflow-hidden flex-column-fluid">
    <!--begin::Menu wrapper-->
    <div
        id="kt_app_sidebar_menu_wrapper"
        class="app-sidebar-wrapper hover-scroll-overlay-x my-10"
        data-kt-scroll="true"
        data-kt-scroll-activate="true"
        data-kt-scroll-height="auto"
        data-kt-scroll-dependencies="#kt_app_sidebar_logo, #kt_app_sidebar_footer"
        data-kt-scroll-wrappers="#kt_app_sidebar_menu"
        data-kt-scroll-offset="5px"
        data-kt-scroll-save-state="true"
    >
      <!--begin::Menu-->
      <div
          id="#kt_app_sidebar_menu"
          class="menu menu-column menu-rounded menu-sub-indention px-3 text-gray-600 fw-bold"
          data-kt-menu="true"
      >
        <KTSidebarItems></KTSidebarItems>

      </div>
      <!--end::Menu-->
    </div>
    <!--end::Menu wrapper-->
  </div>
  <!--end::sidebar menu-->
</template>

<script lang="ts">
import {getAssetPath} from "@/core/helpers/assets";
import {computed, defineComponent, onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import MainMenuConfig from "@/core/config/MainMenuConfig";
import RapiraNetMenuConfig from "@/core/config/RapiraNetMenuConfig";
import {sidebarMenuIcons} from "@/core/helpers/config";
import {useI18n} from "vue-i18n";
import {useAuthStore} from "@/stores/auth";
import TelegramSvg from "@/assets/svg/TelegramSvg.vue";
import GlobalSvg from "@/assets/svg/GlobalSvg.vue";
import {useBasicRequest} from "@/stores/basicRequests";
import KTSidebarItems from "@/layouts/main-layout/sidebar/SidebarItems.vue";

export default defineComponent({
  name: "sidebar-menu",
  components: {
    KTSidebarItems,
    GlobalSvg,
    TelegramSvg
  },
  setup() {
    const {t, te} = useI18n();
    const route = useRoute();
    const scrollElRef = ref<null | HTMLElement>(null);

    const router = useRouter();
    const i18n = useI18n();
    const store = useAuthStore();
    const storeBasicRequest = useBasicRequest();

    onMounted(() => {
      if (scrollElRef.value) {
        scrollElRef.value.scrollTop = 0;
      }
    });

    const translate = (text: string) => {
      if (te(text)) {
        return t(text);
      } else {
        return text;
      }
    };

    const hasActiveChildren = (match: string) => {
      return route.path.includes(match);
    };

    const hasActiveChildrenSection = (match: string) => {
      return `${match}` === `${route.fullPath}`
    };

    const hasActiveSection = (match: string) => {
      return route.path.includes(match) || match.includes(route.path);
    }

    const countries = {
      ru: {
        flag: getAssetPath("media/flags/russia.svg"),
        name: "Русский",
      },
      en: {
        flag: getAssetPath("media/flags/united-states.svg"),
        name: "English",
      },
      zh: {
        flag: getAssetPath("media/flags/china.svg"),
        name: "China",
      },
    };

    const signOut = () => {
      store.logout();
      router.push({name: "sign-in"});
    };

    const setLang = (lang: string) => {
      localStorage.setItem("lang", lang);
      i18n.locale.value = lang;
    };

    const currentLanguage = computed(() => {
      return i18n.locale.value;
    });

    const currentLanguageLocale = computed(() => {
      return countries[i18n.locale.value as keyof typeof countries];
    });


    let username = computed(() => storeBasicRequest.securitySetting.username || "username");
    let email = computed(() => storeBasicRequest.securitySetting.email || "email");
    let realVerified = computed(() => storeBasicRequest.securitySetting.realVerified);
    let id = computed(() => storeBasicRequest.securitySetting.id || "0");

    return {
      hasActiveChildren,
      hasActiveSection,
      hasActiveChildrenSection,
      MainMenuConfig,
      RapiraNetMenuConfig,
      sidebarMenuIcons,
      translate,
      getAssetPath,
      signOut,
      setLang,
      currentLanguage,
      currentLanguageLocale,
      countries,
      username,
      email,
      realVerified,
      id
    };
  },
  methods: {},
});
</script>

<style lang="scss">
.popover-base.el-popover.el-popper {
  background-color: #FFFFFF;
  border-radius: 0.425rem;
  color: #7E8299;
}

.popover-base.el-popover.el-popper .el-popper__arrow::before {
  background-color: #FFFFFF;
}

[data-kt-app-layout=dark-sidebar] .app-sidebar .menu .menu-item.show > .menu-link .menu-icon {
  color: #C5C5D8;
}

[data-kt-app-layout=dark-sidebar] .app-sidebar .menu .menu-item.show > .menu-link {
  .menu-icon i, .menu-title, .menu-arrow:after {
    color: #3E97FF;
  }

  .menu-arrow:after {
    background: #3E97FF;
  }

}
</style>