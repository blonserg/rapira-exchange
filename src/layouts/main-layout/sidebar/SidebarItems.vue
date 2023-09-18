<template>

  <template v-for="(item, i) in MainMenuConfig" :key="i">
    <div v-if="item.heading" class="menu-item pt-5">
      <div class="menu-content">
              <span class="menu-heading fw-bold text-uppercase fs-7 text-hover-primary">
                {{ translate(item.heading) }}
              </span>
      </div>
    </div>
    <template v-for="(menuItem, j) in item.pages" :key="j">
      <template v-if="menuItem.heading">
        <div class="menu-item">
          <router-link
              v-if="menuItem.route"
              class="menu-link"
              :to="menuItem.route"
              :class="{ active: hasActiveChildren(menuItem.route) }"
          >
                  <span
                      v-if="menuItem.keenthemesIcon"
                      class="menu-icon"
                  >
                    <i
                        v-if="menuItem.keenthemesIcon"
                        :class="menuItem.keenthemesIcon"
                        class="ki-outline fs-1"
                    >
                    </i>
                  </span>
            <span class="menu-title">{{
                translate(menuItem.heading)
              }}</span>
          </router-link>
        </div>
      </template>
      <div
          v-if="menuItem.sectionTitle && menuItem.route"
          :class="{ show: hasActiveChildren(menuItem.route) }"
          class="menu-item menu-accordion"
          data-kt-menu-sub="accordion"
          data-kt-menu-trigger="click"
      >
              <span class="menu-link">
               <span
                   v-if="menuItem.keenthemesIcon"
                   class="menu-icon"
               >
                    <i
                        v-if="menuItem.keenthemesIcon"
                        :class="menuItem.keenthemesIcon"
                        class="ki-outline fs-1"
                    >
                    </i>
                  </span>
                <!--                <router-link :to="menuItem.to" class="menu-title">{{  translate(menuItem.sectionTitle) }}</router-link>-->
                <span class="menu-title">{{ translate(menuItem.sectionTitle) }}</span>
                <span class="menu-arrow"></span>
              </span>
        <div
            :class="{ show: hasActiveSection(menuItem.route) }"
            class="menu-sub menu-sub-accordion"
        >
          <template v-for="(item2, k) in menuItem.sub" :key="k">
            <div v-if="item2.heading" class="menu-item" :class="{ active: hasActiveChildrenSection(item2.route) }">
              <router-link
                  v-if="item2.route"
                  class="menu-link mx-0"
                  :to="item2.route"
                  :class="{ active: hasActiveChildrenSection(item2.route) }"
              >
                      <span class="menu-bullet">
                        <span class="bullet bullet-dot"></span>
                      </span>
                <span class="menu-title">{{
                    translate(item2.heading)
                  }}</span>
              </router-link>
            </div>
            <div
                v-if="item2.sectionTitle && item2.route"
                :class="{ show: hasActiveChildren(item2.route) }"
                class="menu-item menu-accordion"
                data-kt-menu-sub="accordion"
                data-kt-menu-trigger="click"
            >
                    <span class="menu-link">
                      <span class="menu-bullet">
                        <span class="bullet bullet-dot"></span>
                      </span>
                      <span class="menu-title">{{
                          translate(item2.sectionTitle)
                        }}</span>
                      <span class="menu-arrow"></span>
                    </span>
              <div
                  :class="{ show: hasActiveChildren(item2.route) }"
                  class="menu-sub menu-sub-accordion"
              >
                <template v-for="(item3, k) in item2.sub" :key="k">
                  <div v-if="item3.heading" class="menu-item">
                    <router-link
                        v-if="item3.route"
                        class="menu-link"
                        active-class="active"
                        :to="item3.route"
                    >
                            <span class="menu-bullet">
                              <span class="bullet bullet-dot"></span>
                            </span>
                      <span class="menu-title">{{
                          translate(item3.heading)
                        }}</span>
                    </router-link>
                  </div>
                </template>
              </div>
            </div>
          </template>
        </div>
      </div>
    </template>

    <!--begin::Menu item-->
    <div
        class="menu-item "
        data-kt-menu-trigger="hover"
        data-kt-menu-placement="left-start"
        data-kt-menu-flip="center, top"
    >
            <span class="menu-link">
              <GlobalSvg/>
              <span class="menu-title position-relative">
                 {{ translate("mainMenu.language") }}

                <span
                    class="fs-8 rounded badge badge-light-primary px-3 py-2 position-absolute translate-middle-y top-50 end-0"
                >
                  {{ currentLanguageLocale.name }}
                  <img
                      class="w-15px h-15px rounded-3 ms-2"
                      :src="currentLanguageLocale.flag"
                      alt="metronic"
                  />
                </span>
              </span>
            </span>

      <!--begin::Menu sub-->
      <div class="menu-sub menu-sub-dropdown w-175px py-4">
        <!--begin::Menu item-->
        <div class="menu-item px-3">
          <a
              @click="setLang('ru', '0')"
              href="#"
              class="menu-link d-flex px-5 bg-hover-light-secondary bg-active-light m-0"
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
              class="menu-link d-flex px-5 bg-hover-light-secondary bg-active-light m-0"
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
              class="menu-link d-flex px-5 bg-hover-light-secondary bg-active-light m-0"
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
      <!--end::Menu sub-->
    </div>
    <!--end::Menu item-->
  </template>

  <!--begin:Menu item-->
  <div class="menu-item">
    <!--begin:Menu link-->
    <a
        class="menu-link text-hover-danger"
        href="/"
        @click="signOut()"
    >
      <i
          class="menu-icon ki-outline ki-exit-left fs-1"
      >
      </i>
      <span> {{ translate("mainMenu.logOut") }}</span>
    </a>
    <!--end:Menu link-->
  </div>
  <!--end:Menu item-->

  <!--begin:hr content-->
  <div class="menu-item pt-4 px-0 mx-0">
    <div class="pb-3" style="border-top: 1px solid #E1E3EA">
    </div>
  </div>
  <!--begin:hr content-->

  <div class="menu-item ps-6 pt-4 m-0 pb-3">
    <span class="text-gray-400">RapiraNet</span>
  </div>

  <!--begin:RapiraNet content-->
  <template v-for="(item, i) in RapiraNetMenuConfig" :key="i">
    <div v-if="item.heading" class="menu-item pt-5">
      <div class="menu-content">
              <span class="menu-heading fw-bold text-uppercase fs-7">
                {{ translate(item.heading) }}
              </span>
      </div>
    </div>
    <template v-for="(menuItem, j) in item.pages" :key="j">
      <template v-if="menuItem.heading">
        <div class="menu-item">

          <a v-if="menuItem.href"
             :href="menuItem.href"
             class="menu-link" target="_blank"
             active-class="active">
            <TelegramSvg/>
            <span class="menu-title">{{
                translate(menuItem.heading)
              }}</span>
            <span class="badge badge-light-primary px-3 py-2" v-if="menuItem.span">{{ menuItem.span }}</span>
          </a>

          <router-link
              v-if="menuItem.route && !menuItem.href"
              class="menu-link "
              active-class="active"
              :to="menuItem.route"
          >
            <i
                v-if="menuItem.keenthemesIcon"
                :class="menuItem.keenthemesIcon"
                class="menu-icon ki-outline fs-1"
            >
            </i>
            <!--                  <TelegramSvg v-else-if="menuItem.svg" />-->

            <span class="menu-title">{{
                translate(menuItem.heading)
              }}</span>
            <!--                  <span class="badge badge-light-primary px-3 py-2" v-if="menuItem.span">{{ menuItem.span }}</span>-->
          </router-link>
        </div>
      </template>

    </template>
    <!--begin::Menu item-->
    <div
        class="menu-item"
        data-kt-menu-trigger="hover"
        data-kt-menu-placement="right-start"
        data-kt-menu-flip="center, top"
    >
      <div class="menu-link">
              <span class="menu-icon">
                <i
                    class="ki-outline ki-rescue fs-1"
                >
              </i>
              </span>
        <span class="menu-title">Поддержка</span>
        <span class="menu-arrow"></span>
      </div>

      <!--begin::Menu sub-->
      <div class="menu-sub menu-sub-dropdown w-220px py-4">
        <!--begin::Menu item-->
        <div class="menu-item px-3">
          <a target="_blank" href="https://t.me/RapiraSupportBot" class="menu-link px-5 ">
            Telegram поддержка
          </a>
        </div>
        <!--end::Menu item-->

        <!--begin::Menu item-->
        <div class="menu-item px-3">
          <router-link to="/dashdoard" class="menu-link px-5 ">
            Online Чат
          </router-link>
        </div>
        <!--end::Menu item-->

      </div>
      <!--end::Menu sub-->
    </div>
    <!--end::Menu item-->
  </template>
  <!--end:RapiraNet content-->

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
import {MenuComponent} from "@/assets/ts/components";
import ApiService from "@/core/services/ApiService";
import Api from "@/config/api";
import {ElMessage} from "element-plus";

export default defineComponent({
  name: "KTSidebarItems",
  components: {
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
      };
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

    const setLang = (lang: string, code: string) => {
      localStorage.setItem("lang", lang);
      i18n.locale.value = lang;
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
