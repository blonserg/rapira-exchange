<template>
  <!--begin::Engage Widget 1-->
  <div class="card h-100" :class="widgetClasses">
    <!--begin::Body-->
    <div class="card-body pb-0">
      <!--begin::Wrapper-->
      <div class="d-flex flex-column justify-content-between h-100">
        <!--begin::Section-->
        <div>
            <div class="d-flex align-items-center flex-wrap">
              <!--begin::Image-->
              <TelegramSvg class="text-gray-500 me-3" v-if="widget.icon === 'telegram'" />
              <i v-else class="ki-outline fs-2x h-25px me-3" :class="widget.icon">
              </i>
              <!--begin::Title-->
              <h3 class="text-dark fs-3 fw-bold lh-md me-5 mb-0">
                {{ widget.title }}
              </h3>
              <!--end::Title-->
              <!--begin::Badge-->
              <span class="badge badge-light-danger">{{ widget.level }}</span>
              <router-link
                  v-if="widget.widgetRef"
                  class="position-absolute me-8 end-0"
                  to="/referral"
              >
                <i class="ki-outline ki-right fs-2x h-25px" :class="widget.icon">
                </i>
              </router-link>
              <!--end::Badge-->
            </div>
            <!--begin::Text-->
            <div class="text-gray-500 fs-6 fw-semibold pt-5 pb-1">
              {{ widget.description }}
            </div>
            <div v-if="widget.widgetVer">
              <div class="d-flex align-items-center pt-2">
                <i class="ki-outline ki-time text-gray-600 fs-5 me-2"></i>
                <span class="text-gray-500 fs-6 fw-semibold">
                  Время проверки: моментально
                </span>
              </div>
              <div class="d-flex align-items-center">
                <i class="ki-outline ki-badge text-gray-600 fs-5 me-2 mt-1"></i>
                <span class="text-gray-500 fs-6 fw-semibold">
                  Документы: достаточно фото на мобильный
                </span>
              </div>
            </div>
            <router-link v-if="widget.widgetRef"
                 class="text-primary fw-semibold py-1 fs-6"
                 to="/referral"
            >
              Подробнее
            </router-link>
            <!--end::Text-->
        </div>
        <!--begin::Action-->
        <div v-if="!widget.widgetRef" class="d-flex flex-end">
          <div class="text-center pt-2 pb-7">
            <a
                href="#"
                class="btn btn-primary fs-6 px-6"
                data-bs-toggle="modal"
                data-bs-target="#kt_modal_create_app"
            > {{ widget.button }}</a>
          </div>
        <!--end::Action-->
        </div>
        <div v-else class="pt-2 pb-7" >
          <div class="position-relative w-100 mt-3">
            <input v-model="addressUnit" style="padding-right: 44px;" readonly type="text"
                   class="form-control text-primary fw-bold"/>
            <div class="position-absolute translate-middle-y top-50 end-0 me-1 fw-bold fs-5">
              <button
                  :data-clipboard-text="addressUnit"
                  id="copyButton" @click="copyToClipboard"
                  class="btn btn-icon btn-sm btn-history ms-2"
              >
                <i class="ki-outline ki-copy text-primary fs-2"></i>
              </button>
            </div>
          </div>
        </div>
        <!--end::Section-->
      </div>
      <!--end::Wrapper-->
    </div>
    <!--end::Body-->
  </div>
  <!--end::Engage Widget 1-->

</template>

<script lang="ts">
import {getAssetPath} from "@/core/helpers/assets";
import {computed, defineComponent, ref} from "vue";
import TelegramSvg from "@/assets/svg/TelegramSvg.vue";
import ClipboardJS from "clipboard";
import {ElMessage} from "element-plus";

export default defineComponent({
  name: "widget-2",
  props: {
    widgetClasses: String,
    widget: {
      type: [],
      default: () => []
    },
  },
  components: {
    TelegramSvg
  },
  setup() {
    const host = 'https://rapira.net/?ref=';
    const referralCode = computed(() => localStorage.getItem('referral'));
    const addressUnit = host + referralCode.value;
    const copyToClipboard = () => {
      const clipboard = new ClipboardJS('#copyButton');
      clipboard.on('success', () => {
        clipboard.destroy();
        ElMessage.success('Скопировано в буфер обмена')
      });
      clipboard.on('error', () => {
        clipboard.destroy();
        ElMessage.error('Failed to copy to clipboard')
      });
    };

    return {
      getAssetPath,
      addressUnit,
      copyToClipboard,
      referralCode,
    };
  },
});
</script>
