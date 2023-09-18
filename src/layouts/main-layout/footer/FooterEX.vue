<template>
  <!--begin::Footer-->
  <div v-if="footerDisplay" id="kt_app_footer" class="app-footer d-none d-lg-flex">
    <!--begin::Footer container-->
    <div
      class="d-flex flex-center align-items-center justify-content-between flex-md-stack px-8"
      :class="{
        'container-fluid': footerWidthFluid,
        'container-xxl': !footerWidthFluid,
      }"
    >
      <div class="d-flex align-items-center">
        <div v-if="startStatus" class="d-flex align-items-center ps-2 me-10">
              <span class="me-2 fs-7 lh-1">
                <NetworkSvg class="text-danger" />
              </span>
          <span
              class="fw-bold text-gray-800"
          >
               Соединение...
              </span>
        </div>
        <div v-if="pingTimeEnd">
          <el-popover
              placement="top-start"
              :width="160"
              trigger="hover"
              popper-class="p-3 popover-arrow"
              :show-arrow="false"
              v-if="pingTimeEnd < 200"
          >
            <p class="text-primary fw-semibold fs-8 mb-0 text-nowrap">
              Состояние сети: В сети<br />Пинг: {{ pingTimeEnd }}
            </p>
            <template #reference>
              <div class="d-flex align-items-center ps-2 me-10">
                <span class="me-2 fs-7 lh-1">
                  <NetworkSvg class="text-primary" />
                </span>
                <span
                  class="fw-bold"
                  :class="[pingTimeEnd > 1000 ? 'text-danger' : pingTimeEnd < 200 ? 'text-primary' : 'text-warning']"
                >
                 {{ connectionQuality }}
                </span>
              </div>
            </template>
          </el-popover>
          <el-popover
              placement="top-start"
              :width="232"
              trigger="hover"
              popper-class="p-3 popover-arrow"
              :show-arrow="false"
              v-if="pingTimeEnd > 200"
          >
            <p class="text-warning fw-semibold fs-8 mb-0">
              Состояние сети: В сети<br/>Пинг: {{ pingTimeEnd }}<br/>Есть задержка в обновлении данных.<br />Пожалуйста, переключитесь на<br />
              другую сеть или обратитесь<br /> в службу поддержки.
            </p>
            <template #reference>
              <div class="d-flex align-items-center ps-2 me-10">
                <span class="me-2 fs-7 lh-1">
                  <NetworkSvg class="text-warning" />
                </span>
                <span
                    class="fw-bold"
                    :class="[pingTimeEnd > 1000 ? 'text-danger' : pingTimeEnd < 200 ? 'text-primary' : 'text-warning']"
                >
                 {{ connectionQuality }}
                </span>
              </div>
            </template>
          </el-popover>
        </div>
        <el-popover
            placement="top-start"
            :width="245"
            trigger="hover"
            popper-class="p-3 popover-arrow"
            :show-arrow="false"
            v-if="!startStatus && !pingTimeEnd"
        >
          <p class="text-danger fw-semibold fs-8 mb-0">
            Состояние сети: Не в сети<br /> Есть задержка в обновлении данных.<br /> Проверьте подключение или<br /> конфигурацию сети.
          </p>
          <template #reference>
            <div class="d-flex align-items-center ps-2 me-10">
              <span class="me-2 fs-7 lh-1">
                <NetworkSvg class="text-danger" />
              </span>
              <span
                  class="fw-bold text-danger"
              >
               Ошибка соединения
              </span>
            </div>
          </template>
        </el-popover>
        <div
            v-for="(pairs, index) in tradingPairs"
            :key="index"
            class="d-flex fs-7 fw-semibold lh-1"
        >
          <div class="text-gray-800 me-2 ps-2 footer-border cursor-pointer" @click="setSymbolName(pairs.symbol)">
            {{ pairs.symbol }}
          </div>
          <div class="me-2">
            <span
                :class="[pairs.change + 0 < 0 ? 'text-danger' : 'text-success']"
            >
              <span v-if="pairs.change + 0 > 0">+</span>{{ pairs.change }}%
            </span>
          </div>
          <div class="me-2 text-gray-500">
            {{ formatNumbers(pairs.volume, '', '.', true, 2) }}
          </div>
        </div>
      </div>
      <div class="d-flex">
        <div class="d-flex align-items-center cursor-pointer py-2 me-7"
             data-kt-menu-trigger="hover"
             data-kt-menu-attach="parent"
             data-kt-menu-placement="bottom-start"
        >
          <span class="me-2">
            <SocialSvg />
          </span>
          <span class="fw-semibold fs-7">
            Соц. сети
          </span>
        </div>
        <!--begin::Menu-->
        <ul

            class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-state-bg-light-primary
        fw-bold w-150px overflow-x-visible"
            data-kt-menu="true"
            data-kt-scroll="true"
            data-kt-scroll-offset="5px"
        >
          <li class="menu-item">
            <a
                href=""
                target="_blank"
                class="menu-link p-2 text-hover-primary"
            >
              <TelegramSvg />
              <span class="ms-2 fw-semibold fs-7">Telegram</span>
            </a>
          </li>
          <li class="menu-item">
            <a
                href=""
                target="_blank"
                class="menu-link p-2 text-hover-primary text-gray-600"
            >
              <VcSvg />
              <span class="ms-2 fw-semibold fs-7">vc.ru</span>
            </a>
          </li>
          <li class="menu-item">
            <a
                href=""
                target="_blank"
                class="menu-link p-2 text-hover-primary text-gray-600"
            >
              <VkSvg />
              <span class="ms-2 fw-semibold fs-7">ВКонтакте</span>
            </a>
          </li>
          <li class="menu-item">
            <a
                href=""
                target="_blank"
                class="menu-link p-1 px-2 text-gray-600 text-hover-primary"
            >
              <InstaSvg style="width: 18px;"  />
              <span class="ms-2 fw-semibold fs-7">Instagram</span>
            </a>
          </li>
        </ul>
        <!--end::Menu-->
        <div class="d-flex align-items-center cursor-pointer pe-2">
          <span class="me-2">
            <SupportSvg />
          </span>
          <span class="fw-semibold fs-7">
            Online-поддержка
          </span>
        </div>
      </div>
    </div>
    <!--end::Footer container-->
  </div>
  <!--end::Footer-->
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, ref} from "vue";
import { footerDisplay, footerWidthFluid } from "@/core/helpers/config";
import { getAssetPath } from "@/core/helpers/assets";
import TelegramSvg from "@/assets/svg/Footer/TelegramSvg.vue";
import VcSvg from "@/assets/svg/Footer/VcSvg.vue";
import VkSvg from "@/assets/svg/Footer/VkSvg.vue";
import InstaSvg from "@/assets/svg/Footer/InstaSvg.vue";
import { themeMode } from "@/core/helpers/config";
import {useExchangeStore} from "@/stores/exchange";
import { formatNumbers } from "@/core/helpers/helpers";
import socket from "@/core/services/SocketService";
import NetworkSvg from "@/assets/svg/Footer/NetworkSvg.vue";
import SocialSvg from "@/assets/svg/Footer/SocialSvg.vue";
import SupportSvg from "@/assets/svg/Footer/SupportSvg.vue";
import ApiService from "@/core/services/ApiService";
import Api from "@/config/api";

export default defineComponent({
  name: "theme-footer",
  components: {
    TelegramSvg,
    VcSvg,
    VkSvg,
    InstaSvg,
    NetworkSvg,
    SocialSvg,
    SupportSvg,
  },
  setup() {
    const store = useExchangeStore();
    const tradingPairs = computed(() => store.tradingPairs);
    const setSymbolName = (symbol) => {
      useExchangeStore().setSymbol(symbol);
    };
    const pingTime = ref(0);
    const pingTimeEnd = ref(0);
    const connectionQuality = ref('Стабильное соединение');
    const ping = () => {
      socket.emit('ping');
    };
    const startStatus = ref(true);

    onMounted(() => {
      setTimeout(() => {
        const start = Date.now();
        ApiService.post(Api.market.symbolThumb, "").then(response => {
          pingTimeEnd.value = Date.now() - start - 100;
          if ( pingTimeEnd.value < 0 ) {
            pingTimeEnd.value = 1;
          }
          startStatus.value = false;
          if (pingTimeEnd.value > 200) {
            connectionQuality.value = 'Нестабильное соединение';
          } else {
            connectionQuality.value = 'Стабильное соединение';
          }
        });
      },8000);

      socket.on('connect', () => {
        ping();
      });

      socket.on('ping', () => {
        pingTime.value = Date.now();
      });

      socket.on('pong', () => {
        pingTimeEnd.value = Date.now() - pingTime.value;

        if (pingTimeEnd.value > 200) {
          connectionQuality.value = 'Нестабильное соединение';
        } else {
          connectionQuality.value = 'Стабильное соединение';
        }
      });
    });

    return {
      footerWidthFluid,
      footerDisplay,
      getAssetPath,
      themeMode,
      tradingPairs,
      formatNumbers,
      setSymbolName,
      connectionQuality,
      pingTimeEnd,
      startStatus,
    };
  },
});
</script>

<style scoped>
  .footer-border {
    border-left: 1px solid #DDE0E2;
  }
  .menu-link svg {
    color: #7E8299;
  }
  .menu-link span {
    color: #555B63;
  }
  .menu-link:hover svg,
  .menu-link:hover span
  {
    color: var(--bs-primary);
  }
  .app-footer {
    position: sticky;
    bottom: 0;
  }
</style>
