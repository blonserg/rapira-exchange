<template>
  <!--begin::Footer-->
  <div v-if="footerDisplay" id="kt_app_footer" class="app-footer">
    <!--begin::Footer container-->
    <div
      class="app-footer-inner app-container d-flex flex-column flex-center flex-md-stack py-12 pb-10"
      :class="{
        'container-fluid': footerWidthFluid,
        'container-xxl': !footerWidthFluid,
      }"
    >
      <div class="d-flex justify-content-between w-100">
        <div>
          <img
              v-if="themeMode === 'light'"
              :src="getAssetPath('media/logos/rapira-logo.svg')"
              class="mb-5"
              alt="Logo footer"
          >
          <img
              v-else
              :src="getAssetPath('media/logos/rapira-logo-dark.svg')"
              class="mb-5"
              alt="Logo footer"
          >
          <div class="text-gray-600 lh-lg fw-semibold fs-7 w-350px">
            <span class="d-block">Лицензия №0110/587,</span>
            <span class="d-block mb-5">Financial Service & Crypto Exchange.</span>
            Rapira Group LLC зарегистрирована и действует в соответствии с законодательством Грузии, регистрационный код 412771852, адрес: Georgia, city Kutaisi, Avtomshebeli Street, N 88 (Kutaisi Hualing Free Industrial Zone).
          </div>
        </div>
        <div>
          <h4 class="fw-bolder fs-5 mb-4">Информация</h4>
          <ul class="list-style-none ps-0 fw-semibold fs-6">
            <li class="mb-2">
              <a class="text-gray-600" href="">Комиссии и лимиты</a>
            </li>
            <li class="mb-2">
              <a class="text-gray-600" href="">Центр поддержки</a>
            </li>
            <li class="mb-2">
              <a class="text-gray-600" href="">Биржевая торговля</a>
            </li>
            <li class="mb-2">
              <a class="text-gray-600" href="">P2P платформа</a>
            </li>
          </ul>
        </div>
        <div>
          <h4 class="fw-bolder fs-5 mb-4">Документы</h4>
          <ul class="list-style-none ps-0 fw-semibold fs-6">
            <li class="mb-2">
              <a class="text-gray-600" href="">Правила P2P платформы</a>
            </li>
            <li class="mb-2">
              <a class="text-gray-600" href="">Политика конфиденциальности</a>
            </li>
            <li class="mb-2">
              <a class="text-gray-600" href="">Пользовательское соглашение</a>
            </li>
            <li class="mb-2">
              <a class="text-gray-600" href="">Политика AML/KYC</a>
            </li>
            <li class="mb-2">
              <a class="text-gray-600" href="">Политика Cookie</a>
            </li>
          </ul>
        </div>
        <div>
          <h4 class="fw-bolder fs-5 mb-4">Поддержка</h4>
          <ul class="list-style-none ps-0 fw-semibold fs-6 text-gray-600">
            <li class="mb-4">
              <span class="d-block">Поддержка в Telegram</span>
              <a class="text-decoration-underline" href="">@RapiraSupportBot</a>
            </li>
            <li class="mb-4">
              <span class="d-block">Общие вопросы</span>
              <a class="text-decoration-underline" href="">support@rapira.net</a>
            </li>
            <li class="mb-4">
              <span class="d-block">AML, KYC, официальные запросы</span>
              <a class="text-decoration-underline" href="">compliance@rapira.net</a>
            </li>
            <li class="mb-2">
              <span class="d-block">Юридические вопросы</span>
              <a class="text-decoration-underline" href="">legal@rapira.net</a>
            </li>
          </ul>
        </div>
      </div>
      <!--begin::Menu-->
      <ul class="menu menu-gray-600 menu-hover-primary fw-semibold order-1 mt-9 mb-7 w-100">
        <li class="menu-item me-5">
          <a
              href=""
              target="_blank"
              class="menu-link p-0"
          >
            <TelegramSvg v-if="themeMode === 'light'" />
            <TelegramDarkSvg v-else />
            <span class="px-5 fs-4">Telegram</span>
          </a>
        </li>
        <li class="menu-item me-5">
          <a
              href=""
              target="_blank"
              class="menu-link p-0"
          >
            <VcSvg v-if="themeMode === 'light'" />
            <VcDarkSvg v-else />
            <span class="px-5 fs-4">vc.ru</span>
          </a>
        </li>
        <li class="menu-item me-5">
          <a
              href=""
              target="_blank"
              class="menu-link p-0"
          >
            <VkSvg v-if="themeMode === 'light'" />
            <VkDarkSvg v-else />
            <span class="px-5 fs-4">ВКонтакте</span>
          </a>
        </li>
        <li class="menu-item me-5">
          <a
              href=""
              target="_blank"
              class="menu-link p-0"
          >
            <InstaSvg v-if="themeMode === 'light'" />
            <InstaDarkSvg v-else />
            <span class="px-5 fs-4">Instagram</span>
          </a>
        </li>
      </ul>
      <!--end::Menu-->
      <!--begin::Copyright-->
      <div class="text-gray-600 order-2 order-md-1 text-start w-100 pt-8 border-top">
        <span class="fw-semibold fs-6">© 2023, Rapira Group LLC. Все права защищены</span>
      </div>
      <!--end::Copyright-->
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
import TelegramDarkSvg from "@/assets/svg/Footer/TelegramDarkSvg.vue";
import VcDarkSvg from "@/assets/svg/Footer/VcDarkSvg.vue";
import VkDarkSvg from "@/assets/svg/Footer/VkDarkSvg.vue";
import InstaDarkSvg from "@/assets/svg/Footer/InstaDarkSvg.vue";
import { themeMode } from "@/core/helpers/config";

export default defineComponent({
  name: "theme-footer",
  components: {
    TelegramSvg,
    VcSvg,
    VkSvg,
    InstaSvg,
    TelegramDarkSvg,
    VcDarkSvg,
    VkDarkSvg,
    InstaDarkSvg,
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
.menu-link svg {
  width: 20px;
}
</style>
