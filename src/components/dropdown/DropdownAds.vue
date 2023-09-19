<template>
  <!--begin::Menu-->
  <div
    class="menu menu-sub menu-sub-dropdown menu-custom-color menu-column menu-state-bg-primary fw-bold w-200px py-2"
    data-kt-menu="true"
  >
    <!--begin::Menu item-->
    <div v-if="invoice.status === 1" class="menu-item py-0">
      <a
        href="#"
        class="menu-link text-gray-600 bg-hover-light-primary text-hover-primary fw-bold rounded-2 p-2 mx-2"
      >
        Изменить
      </a>
    </div>
    <!--end::Menu item-->

    <!--begin::Menu item-->
    <div
      v-if="invoice.status === 1"
      class="menu-item py-0"
      @click.prevent="takeOnPublic(invoice.id)"
    >
      <a
        href="#"
        class="menu-link text-gray-600 flex-stack bg-hover-light-primary text-hover-primary fw-bold rounded-2 p-2 mx-2"
      >
        Опубликовать
      </a>
    </div>
    <!--end::Menu item-->

    <div
      v-else-if="invoice.status === 0"
      class="menu-item py-0"
      @click.prevent="takeOfPublic(invoice.id)"
    >
      <a
        href="#"
        class="menu-link text-gray-600 flex-stack bg-hover-light-primary text-hover-primary fw-bold rounded-2 p-2 mx-2"
      >
        Снять с публикации
      </a>
    </div>

    <!--begin::Menu item-->
    <div
      v-if="invoice.status === 1"
      data-bs-toggle="modal"
      data-bs-target="#kt_delete_ad"
      class="menu-item py-0"
    >
      <a
        href="#"
        class="menu-link text-danger bg-hover-light-danger text-hover-danger fw-bold rounded-2 p-2 mx-2"
      >
        Удалить
      </a>
    </div>
    <!--end::Menu item-->
  </div>
  <!--end::Menu-->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ApiService from "@/core/services/ApiService";
import Api from "@/config/api";
import { ElMessage } from "element-plus";

export default defineComponent({
  name: "dropdown-ads",
  components: {},
  props: {
    invoice: {
      type: Object,
      default: () => {},
    },
    getMyAd: {
      type: Function,
      default: () => {},
    },
  },
  methods: {
    takeOfPublic(id) {
      let formData = new FormData();
      formData.append("id", id);
      ApiService.post(Api.otc.takeOf, formData)
        .then(() => {
          this.getMyAd();
        })
        .catch((response) => {
          ElMessage.error(response.data.message);
        });
    },
    takeOnPublic(id) {
      let formData = new FormData();
      formData.append("id", id);
      ApiService.post(Api.otc.takeOn, formData)
        .then(() => {
          this.getMyAd();
        })
        .catch((response) => {
          ElMessage.error(response.data.message);
        });
    },
  },
});
</script>

<style scoped>
.menu-custom-color .menu-item .menu-link {
  color: var(--bs-ads-dropdown);
}
</style>
