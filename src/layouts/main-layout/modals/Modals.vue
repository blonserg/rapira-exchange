<template>
  <LoginModal />
  <ResetModal />
  <RegisterModal />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LoginModal from "@/components/modals/general/LoginModal.vue";
import ResetModal from "@/components/modals/general/ResetModal.vue";
import RegisterModal from "@/components/modals/general/RegisterModal.vue";

export default defineComponent({
  name: "global-modals",
  components: {
    LoginModal,
    ResetModal,
    RegisterModal,
  },
});
</script>
