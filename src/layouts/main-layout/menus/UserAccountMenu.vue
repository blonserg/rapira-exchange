<template>
  <!--begin::Menu-->
  <div
    class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-state-bg-light-primary
      fw-bold w-300px overflow-x-visible pb-80px"
    data-kt-menu="true"
    data-kt-scroll="true"
    data-kt-scroll-activate="true"
    data-kt-scroll-height="auto"
    data-kt-scroll-offset="5px"
    data-kt-scroll-save-state="true"
  >
    <div class="overflow-y-scroll menu-sub-custom pb-10">
      <UserMenuItems />
    </div>
  </div>
  <!--end::Menu-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { computed, defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import UserMenuItems from "@/layouts/main-layout/menus/UserMenuItems.vue";

export default defineComponent({
  name: "kt-user-menu",
  components: {UserMenuItems},
  setup() {
    const router = useRouter();
    const i18n = useI18n();
    const store = useAuthStore();

    i18n.locale.value = localStorage.getItem("lang")
      ? (localStorage.getItem("lang") as string)
      : "en";

    const countries = {
      en: {
        flag: getAssetPath("media/flags/united-states.svg"),
        name: "English",
      },
      ru: {
        flag: getAssetPath("media/flags/russia.svg"),
        name: "Russian",
      },
      zh: {
        flag: getAssetPath("media/flags/china.svg"),
        name: "China",
      },
    };

    const signOut = () => {
      store.logout();
      router.push({ name: "/" });
    };

    const setLang = (lang: string) => {
      localStorage.setItem("lang", lang);
      i18n.locale.value = lang;
    };

    const currentLanguage = computed(() => {
      return i18n.locale.value;
    });

    const currentLangugeLocale = computed(() => {
      return countries[i18n.locale.value as keyof typeof countries];
    });

    return {
      signOut,
      setLang,
      currentLanguage,
      currentLangugeLocale,
      countries,
      getAssetPath,
    };
  },
});
</script>

<style lang="scss" scoped>
.pb-80px {
  padding-bottom: 80px;
}

.menu-sub-dropdown {
  background-color: inherit;
  box-shadow: inherit;
}

.menu-sub-custom {
  background-color: var(--bs-menu-dropdown-bg-color);
  box-shadow: var(--bs-menu-dropdown-box-shadow);
  border-radius: 12px;
  border: 1px solid var(--gray-gray-200, #F1F1F2);
  max-height: 100vh;
}

.menu.menu-sub {
  max-height: 100vh;
}

.menu-sub-custom .menu-sub.menu-sub-dropdown {
  background-color: var(--bs-menu-dropdown-bg-color);
  box-shadow: var(--bs-menu-dropdown-box-shadow);
}
</style>
