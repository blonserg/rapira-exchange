<template>
  <!--begin::App-->
  <div class="d-flex flex-column flex-root app-root" id="kt_app_root">
    <!--begin::Page-->
    <div class="app-page flex-column flex-column-fluid" id="kt_app_page">
      <KTHeaderEmpty />
      <!--begin::Wrapper-->
      <div
          class="app-wrapper flex-column flex-row-fluid container-max"
          id="kt_app_wrapper"
      >
<!--        <KTSidebar />-->
        <!--begin::Main-->
        <div class="app-main flex-column flex-row-fluid" id="kt_app_main">
          <!--begin::Content wrapper-->
          <div class="d-flex flex-column flex-column-fluid">
            <div id="kt_app_content" class="app-content flex-column-fluid my-10">
              <KTContent></KTContent>
            </div>
          </div>
          <!--end::Content wrapper-->
        </div>
        <!--end:::Main-->
      </div>
      <!--end::Wrapper-->
      <KTFooter />
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
import KTHeaderEmpty from "@/layouts/main-layout/header/HeaderEmpty.vue";
import KTSidebar from "@/layouts/main-layout/sidebar/Sidebar.vue";
import KTContent from "@/layouts/main-layout/content/Content.vue";
import KTFooter from "@/layouts/main-layout/footer/Footer.vue";
import KTScrollTop from "@/layouts/main-layout/extras/ScrollTop.vue";
import { useRoute } from "vue-router";
import { reinitializeComponents } from "@/core/plugins/keenthemes";
import LayoutService from "@/core/services/LayoutService";
import KTModals from "@/layouts/main-layout/modals/Modals.vue";

export default defineComponent({
  name: "empty-layout",
  components: {
    KTHeaderEmpty,
    KTContent,
    KTSidebar,
    KTFooter,
    KTScrollTop,
    KTModals,
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
