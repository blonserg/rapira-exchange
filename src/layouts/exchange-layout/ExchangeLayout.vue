<template>
  <!--begin::App-->
  <div class="d-flex flex-column flex-root app-root" id="kt_app_root">
    <!--begin::Page-->
    <div class="app-page flex-column flex-column-fluid" id="kt_app_page">
      <KTHeader />
      <!--begin::Wrapper-->
      <div
          class="app-wrapper flex-column flex-row-fluid container-max app-wrapper-exchange"
          id="kt_app_wrapper"
      >
        <KTSidebar />
        <!--begin::Main-->
        <div id="kt_app_main">
          <!--begin::Content wrapper-->
          <div id="kt_app_content" class="app-content pb-0 flex-column-fluid">
            <KTContent></KTContent>
          </div>
          <!--end::Content wrapper-->
          <KTFooter />
        </div>
        <!--end:::Main-->
      </div>
      <!--end::Wrapper-->
    </div>
    <!--end::Page-->
  </div>
  <!--end::App-->

  <KTScrollTop />
  <KTModals />
</template>

<script lang="ts">
import {
  defineComponent,
  nextTick,
  onBeforeMount,
  onMounted,
  watch,
} from "vue";
import KTHeader from "@/layouts/main-layout/header/HeaderExchange.vue";
import KTSidebar from "@/layouts/main-layout/sidebar/Sidebar.vue";
import KTContent from "@/layouts/exchange-layout/content/Content.vue";
import KTFooter from "@/layouts/main-layout/footer/FooterEx.vue";
import KTModals from "@/layouts/main-layout/modals/Modals.vue";
import KTScrollTop from "@/layouts/main-layout/extras/ScrollTop.vue";
import { useRoute } from "vue-router";
import { reinitializeComponents } from "@/core/plugins/keenthemes";
import LayoutService from "@/core/services/LayoutService";

export default defineComponent({
  name: "default-layout",
  components: {
    KTHeader,
    KTSidebar,
    KTContent,
    KTScrollTop,
    KTModals,
    KTFooter,
  },
  setup() {
    const route = useRoute();

    onBeforeMount(() => {
      LayoutService.init();
    });

    onMounted(() => {
      nextTick(() => {
        reinitializeComponents();
      });
    });

    watch(
      () => route.path,
      () => {
        nextTick(() => {
          reinitializeComponents();
        });
      }
    );
  },
});
</script>

<style scoped>
#kt_app_content {
  min-height: calc(100vh - 107px);
}
@media (max-width: 768px) {
  .app-wrapper-exchange {
    padding-left: 9px;
    padding-right: 9px;
  }
}
</style>
