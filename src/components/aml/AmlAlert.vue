<template>
  <!--begin::Alert-->
  <div class="alert alert-primary bg-light-primary border-primary border-dashed d-flex flex-column flex-sm-row p-5 mb-3">
    <!--begin::Icon-->
    <i class="ki-duotone ki-information-4 fs-2hx text-primary me-4 mb-5 mb-sm-0"><span class="path1"></span><span class="path2"></span><span class="path3"></span></i>
    <!--end::Icon-->

    <!--begin::Wrapper-->
    <div class="d-flex flex-column pe-0 pe-sm-10">
      <!--begin::Title-->
      <h4 class="fw-bold fs-5">Как это работает</h4>
      <!--end::Title-->

      <!--begin::Content-->
      <span class="fw-semibold text-gray-500">Вместе с Rapira AML Вы можете провести анализ криптокошельков и транзакций в блокчейне на наличие связей с незаконной деятельностью, получив детальный отчёт</span>
      <!--end::Content-->
    </div>
    <!--end::Wrapper-->

    <!--begin::Close-->
    <button type="button" class="position-absolute m-2 m-sm-0 top-0 end-0 btn btn-icon ms-sm-auto" data-bs-dismiss="alert">
      <i class="ki-solid ki-cross fs-1 text-primary"></i>
    </button>
    <!--end::Close-->
  </div>
  <!--end::Alert-->
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";

export default defineComponent({
  name: "aml-alert",

  setup() {
  }
})
</script>
