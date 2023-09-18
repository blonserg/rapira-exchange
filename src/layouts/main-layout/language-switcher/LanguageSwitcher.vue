<template>
  <!--begin::Menu-->
  <div class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-title-gray-700 menu-icon-muted menu-active-bg menu-state-primary fw-semibold py-4 fs-base w-175px"
       data-kt-menu="true"
       data-kt-element="language-switcher"
  >
    <!--begin::Menu item-->
    <div class="menu-item px-3">
      <a
          @click="setLang('ru', '0')"
          href="#"
          class="menu-link d-flex px-5 bg-hover-light-primary"
          :class="{ active: currentLanguage === 'ru' }"
      >
                  <span class="symbol symbol-20px me-4">
                    <img
                        class="rounded-4"
                        :src="getAssetPath('media/flags/russia.svg')"
                        alt="metronic"
                    />
                  </span>
        Русский
      </a>
    </div>
    <!--end::Menu item-->

    <!--begin::Menu item-->
    <div class="menu-item px-3">
      <a
          @click="setLang('en', '1')"
          href="#"
          class="menu-link d-flex px-5 bg-hover-light-primary"
          :class="{ active: currentLanguage === 'en' }"
      >
                  <span class="symbol symbol-20px me-4">
                    <img
                        class="rounded-4"
                        :src="getAssetPath('media/flags/united-states.svg')"
                        alt="metronic"
                    />
                  </span>
        English
      </a>
    </div>
    <!--end::Menu item-->

    <!--begin::Menu item-->
    <div class="menu-item px-3">
      <a
          @click="setLang('zh', '2')"
          href="#"
          class="menu-link d-flex px-5 bg-hover-light-primary"
          :class="{ active: currentLanguage === 'zh' }"
      >
                  <span class="symbol symbol-20px me-4">
                    <img
                        class="rounded-4"
                        :src="getAssetPath('media/flags/china.svg')"
                        alt="metronic"
                    />
                  </span>
        China
      </a>
    </div>
    <!--end::Menu item-->

  </div>
  <!--end::Menu-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { computed, defineComponent } from "vue";
import {useI18n} from "vue-i18n";
import ApiService from "@/core/services/ApiService";
import Api from "@/config/api";
import {ElMessage} from "element-plus";
import {useBasicRequest} from "@/stores/basicRequests";
import {useAuthStore} from "@/stores/auth";

export default defineComponent({
  name: "kt-language-switcher",
  component: {},
  setup() {
    const i18n = useI18n();
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
    const storeBasicRequest = useBasicRequest();
    const isAuthenticated = useAuthStore().isAuthenticated;

    const setLang = (lang: string, code:string) => {
      localStorage.setItem("lang", lang);
      i18n.locale.value = lang;
      if (isAuthenticated) {
        let formData = new FormData();
        formData.append("language", code);
        ApiService.post(Api.uc.changeLang, formData).then(async (response) => {
          if (response.data.code === 0 || response.data.code === 200) {
            await storeBasicRequest.initRequest();
            ElMessage.success(response.data.message);
          } else {
            ElMessage.error(response.data.message);
          }
        })
      }
    };

    const currentLanguage = computed(() => {
      return i18n.locale.value;
    });

    const currentLanguageLocale = computed(() => {
      return countries[i18n.locale.value as keyof typeof countries];
    });


    return {
      getAssetPath,
      setLang,
      currentLanguage,
      currentLanguageLocale,
    };
  },
});
</script>
