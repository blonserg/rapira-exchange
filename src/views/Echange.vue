<template>
  <div id="exchange-container" class="d-flex flex-column h-100">
    <el-skeleton
        :rows="20"
        animated
        loading
        class="vh-100"
        v-if="isLoading"
    />
    <component :is="renderComponents" />
  </div>

</template>

<script lang="ts">
import {computed, defineAsyncComponent, defineComponent, onMounted, ref, watch} from "vue";
import {useExchangeStore} from "@/stores/exchange";
import ApiService from "@/core/services/ApiService";
import Api from "@/config/api";
import {ElMessage} from "element-plus";
import socket from "@/core/services/SocketService";

export default defineComponent({
  name: "exchange",
  setup() {
    const isMobile = ref(false);
    const isDesktopSmall = ref(false);
    const isDesktopMedium = ref(false);
    const isDesktopLarge = ref(false);
    const store = useExchangeStore();
    const symbolBase = computed(() => store.firstPair);
    const symbolRate = computed(() => store.secondPair);
    const symbolBaseHistory = ref('');
    const symbolRateHistory = ref('');
    const isLoading = ref(true);

    const updateSizes = () => {
      isMobile.value = window.matchMedia('(max-width: 768px)').matches;
      isDesktopSmall.value = window.matchMedia('(min-width: 1200px)').matches;
      isDesktopMedium.value = window.matchMedia('(min-width: 1765px)').matches;
      isDesktopLarge.value = window.matchMedia('(min-width: 2037px)').matches;
    };

    const getTradingPairs = async () => {
      let formData = new FormData();
      ApiService.post(Api.market.symbolThumb, formData).then(response => {
        store.setTradingPairs(response.data);
      }).catch(response => {
        ElMessage.error(response.data.message)
      });
    };

    const getSubscribtion  = async () => {
      const symbolFirst = await Promise.resolve(symbolBase.value);
      const symbolSecond = await Promise.resolve(symbolRate.value);

      const topics = [
        `spot@public.depth@${symbolFirst}_${symbolSecond}`,
        `spot@public.deals@${symbolFirst}_${symbolSecond}`,
        `spot@public.ticker`,
        `spot@public.kline@${symbolFirst}_${symbolSecond}`
      ];

      socket.emit('SUBSCRIBE', topics);
    };

    const getChangePair = () => {
      socket.on('ticker', data => {
        store.setCurrentTradingPair(data);
      })
    };

    watch(symbolBase, () => {
      if (symbolBaseHistory.value) {
        socket.emit('UNSUBSCRIBE', [`spot@public.depth@${symbolBaseHistory.value}_${symbolRateHistory.value}`,
            `spot@public.deals@${symbolBaseHistory.value}_${symbolRateHistory.value}`,
            `spot@public.ticker`,
            `spot@public.kline@${symbolBaseHistory.value}_${symbolRateHistory.value}`]);
      }
      getSubscribtion();
      symbolBaseHistory.value = symbolBase.value;
      symbolRateHistory.value = symbolRate.value;
    })

    onMounted(() => {
      updateSizes();
      getTradingPairs();
      window.addEventListener('resize', updateSizes);
      symbolBaseHistory.value = symbolBase.value;
      symbolRateHistory.value = symbolRate.value;
      getChangePair();
      setTimeout(() => {
        isLoading.value = false;
      }, 2000);
    });

    const MobileLayout = defineAsyncComponent(() => import('../layouts/exchange-layout/ExchangeMobile.vue'));
    const DesktopLayoutSmall = defineAsyncComponent(() => import('../layouts/exchange-layout/ExchangeDesktopSmall.vue'));
    const DesktopLayoutMedium = defineAsyncComponent(() => import('../layouts/exchange-layout/ExchangeDesktopMedium.vue'));
    const DesktopLayoutLarge = defineAsyncComponent(() => import('../layouts/exchange-layout/ExchangeDesktopLarge.vue'));

    const renderComponents = computed(() => {
      if (isDesktopLarge.value) {
        return DesktopLayoutLarge;
      }
      if (isDesktopMedium.value) {
        return DesktopLayoutMedium;
      }
      if (isDesktopSmall.value) {
        return DesktopLayoutSmall;
      } else {
        return MobileLayout;
      }
    });

    return {
      renderComponents,
      isLoading,
    };
  },
});
</script>

<style scoped>
#exchange-container {
  min-height: calc(100vh - 107px);
}
</style>
