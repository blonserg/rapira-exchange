<template>
  <div class="modal fade" tabindex="-1" id="kt_modal_detailModal">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header py-3 pe-3">
          <h3 class="modal-title fs-2">Детали ордера</h3>
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
          <div v-for="item in data" class="modal-item">
            <div class="d-flex justify-content-between fw-semibold mb-3">
              <div class="text-gray-500">Дата</div>
              <div class="text-dark">
                {{ formatDate(item.time) }}
              </div>
            </div>
            <div class="d-flex justify-content-between fw-semibold mb-3">
              <div class="text-gray-500">Цена</div>
              <div class="text-dark">
                {{ item.price }}
              </div>
            </div>
            <div class="d-flex justify-content-between fw-semibold mb-3">
              <div class="text-gray-500">Количество</div>
              <div class="text-dark">
                {{ item.amount }}
                <span>
                  {{ formatPairs(symbol, true) }}
                </span>
              </div>
            </div>
            <div class="d-flex justify-content-between fw-semibold mb-3">
              <div class="text-gray-500">Комиссия</div>
              <div class="text-dark">
                {{ item.fee }}
                <span>
                  {{ formatPairs(symbol, true) }}
                </span>
              </div>
            </div>
            <div class="d-flex justify-content-between fw-semibold mb-3">
              <div class="text-gray-500">Оборот</div>
              <div class="text-dark">
                {{ item.amount }}
                <span>
                  {{ formatPairs(symbol, true) }}
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
            {{ this.translate("button.close") }}
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

export default defineComponent({
  name: "exchangeSDetailModal",
  components: {},
  props: {
    data: {
      type: Object,
      required: true,
    },
    direction: {
      type: String,
      required: true,
    },
    symbol: {
      type: String,
      required: true,
    },
  },
  setup() {
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
