<template>
  <div class="mb-6">
    <KTPageTitle />
  </div>
  <div class="mb-3">
    <!--begin::SellerProfileHeader-->
    <SellerProfileHeader/>
    <!--end::SellerProfileHeader-->
  </div>
<!--  <div class="mb-6">-->
    <!--begin::MyDeals-->

    <!--end::MyDeals-->
<!--  </div>-->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import KTPageTitle from "@/layouts/main-layout/toolbar/PageTitle.vue";
import SellerProfileHeader from "@/components/sellerProfile/SellerProfileHeader.vue";

export default defineComponent({
  name: "sellerProfile",
  components: {
    SellerProfileHeader,
    KTPageTitle
  },
  setup() {

    return {
    };
  },
});
</script>
