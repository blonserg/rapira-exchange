<template>
  <div class="modal fade" tabindex="-1" id="kt_modal_cancelModal">
    <div class="modal-dialog modal-dialog-centered">
      <div v-for="item in data" class="modal-content">
        <div class="modal-header py-3 pe-3">
          <h3 class="modal-title fs-2">Отмена ордера</h3>
          <!--begin::Close-->
          <div
            class="btn btn-icon btn-sm btn-active-light-primary ms-2"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <i class="ki-outline ki-cross fs-1"></i>
          </div>
          <!--end::Close-->
        </div>
        <div class="modal-body p-6">
          <div class="fw-semibold mb-5">
            Отменить
            <span v-if="item.direction === 'BUY'" class="text-success"
              >покупку
            </span>
            <span v-else class="text-danger">продажу </span>
            <span class="fw-bold">{{ formatPairs(item.symbol, true) }}/</span>
            <span>{{ formatPairs(item.symbol, false) }} </span>
            по
            <span v-if="item.type === 'LIMIT_PRICE'" class="fw-bold"
              >лимитному</span
            >
            <span v-else class="fw-bold">рыночному</span>
            ордеру?
          </div>
          <div class="modal-item">
            <div class="d-flex justify-content-between fw-semibold mb-3">
              <div class="text-gray-500">Ордер</div>
              <div class="text-dark">
                {{ item.orderId }}
              </div>
            </div>
            <div class="d-flex justify-content-between fw-semibold mb-3">
              <div class="text-gray-500">Отдаю</div>
              <div class="text-dark">{{ item.amount }} {{ baseSymbol }}</div>
            </div>
            <div
              v-if="item.type === 'LIMIT_PRICE'"
              class="d-flex justify-content-between fw-semibold mb-3"
            >
              <div class="text-gray-500">Курс</div>
              <div class="text-dark">
                {{ item.price }}
              </div>
            </div>
            <div
              v-if="item.type === 'LIMIT_PRICE'"
              class="d-flex justify-content-between fw-semibold mb-3"
            >
              <div class="text-gray-500">Получаю</div>
              <div v-if="item.direction === 'SELL'" class="text-dark">
                {{ item.amount * item.price * (1 - item.fee) }}
                <span>
                  {{ coinSymbol }}
                </span>
              </div>
              <div v-else class="text-dark">
                {{ item.amount * (1 - item.fee) }}
                <span>
                  {{ baseSymbol }}
                </span>
              </div>
            </div>
            <div
              v-if="item.type === 'LIMIT_PRICE'"
              class="d-flex justify-content-between fw-semibold mb-3"
            >
              <div class="text-gray-500">Обменено</div>
              <div class="text-dark">
                {{ item.turnover }}
                <span>
                  {{ baseSymbol }}
                </span>
                /
                {{ item.tradedAmount }}
                <span>
                  {{ coinSymbol }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer pt-0" style="border: none">
          <button
            type="button"
            class="btn btn-light-primary"
            data-bs-dismiss="modal"
          >
            {{ translate("button.close") }}
          </button>
          <button
            type="button"
            class="btn btn-light-danger"
            data-bs-dismiss="modal"
            @click="cancelCurrent(item.orderId)"
          >
            Отменить ордер
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import { useExchangeStore } from "@/stores/exchange";
import { parseFullSymbol } from "@/core/helpers/helpers";
import ApiService from "@/core/services/ApiService";
import Api from "@/config/api";
import { ElMessage } from "element-plus";

export default defineComponent({
  name: "exchangeSDetailModal",
  components: {},
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup(_, { emit }) {
    const { t, te } = useI18n();
    const exchangeStore = useExchangeStore();
    const baseSymbol = computed(() => exchangeStore.firstPair);
    const coinSymbol = computed(() => exchangeStore.secondPair);

    const translate = (text: string) => {
      if (te(text)) {
        return t(text);
      } else {
        return text;
      }
    };

    const formatPairs = (pair: string, base: boolean) => {
      let formatedData = parseFullSymbol(pair);
      if (formatedData) {
        return base ? formatedData.fromSymbol : formatedData.toSymbol;
      }
    };

    const cancelCurrent = (id) => {
      ApiService.post(Api.exchange.cancelOrder + `/${id}`, {})
        .then(() => {
          emit("cancel-event");
        })
        .catch((response) => {
          ElMessage.error(response.message);
        });
    };

    const formatDate = (date) => {
      return new Intl.DateTimeFormat("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "Europe/Moscow",
      }).format(date);
    };

    return {
      translate,
      formatDate,
      baseSymbol,
      coinSymbol,
      formatPairs,
      cancelCurrent,
    };
  },
});
</script>

<style scoped>
.modal-dialog {
  max-width: 440px;
}
.modal-item {
}
.modal-item + .modal-item {
  border-top: 1px solid #e9ecee;
  padding-top: 15px;
  margin-top: 20px;
}
</style>
