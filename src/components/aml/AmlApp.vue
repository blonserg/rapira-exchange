<template>
  <div class="card mb-3">
    <div class="card-body p-0">
      <div class="card-px d-flex flex-column align-items-start my-10">
        <h4 v-if="checkedNumber.length < 65" class="fs-5 mb-5">Проверка адреса</h4>
        <h4 v-else class="fs-5 mb-5">Проверка транзакции</h4>
        <div class="d-flex justify-content-between w-100 mb-3">
          <div class="d-flex align-items-center position-relative flex-grow-1">
            <i class="ki-outline ki-shield-search fs-1 position-absolute ms-3">
              <span class="path1"></span><span class="path2"></span>
            </i>
            <input type="text" class="form-control fs-7 ps-12 py-3" v-model="checkedNumber" placeholder="Введите адрес или ID транзакции">
          </div>
          <Multiselect  class="w-150px mx-4" v-model="selectedCurrency.value" v-bind="selectedCurrency">
            <template v-slot:singlelabel="{ value }">
              <div class="multiselect-single-label d-flex gap-2">
                <img class="character-label-icon w-20px" :src="getAssetPath(`media/crypto/${value.value}.svg`)"
                     :alt="value.value">
                <p class="my-0 text-gray-800">{{ value.value }}</p>
              </div>
            </template>
            <template v-slot:option="{ option }">
              <div class="d-flex justify-content-between w-100">
                <div class="d-flex gap-2">
                  <img class="character-label-icon w-20px " :src="getAssetPath(`media/crypto/${option.value}.svg`)"
                       :alt="option.value">
                  <p class="my-0 text-gray-800">{{ option.value }}</p>
                </div>
              </div>
            </template>
          </Multiselect>
          <button
              class="btn btn-primary fs-7"
              :disabled="!selectedCurrency.value || !checkedNumber"
              @click="checkOperation"
          >
            Проверить
          </button>
        </div>
        <div v-if="priceOfCheck != 0" class="fw-semibold fs-7 text-gray-500">
          Стоимость проверки: {{ priceOfCheck }}
        </div>
        <div v-if="checkedNumber.length > 64" class="d-flex mt-9">
          <div class="form-check form-check-custom form-check-solid me-6">
            <input class="form-check-input" v-model="directionCheck" name="directionCheck" type="radio" value="0" id="flexRadioDefault" checked="checked"/>
            <label class="form-check-label fw-bold text-gray-600 fs-7" for="flexRadioDefault">
              Принимал средства
            </label>
          </div>

          <label class="form-check form-check-custom form-check-solid">
            <input class="form-check-input" v-model="directionCheck" name="directionCheck" type="radio" value="1"/>
            <span class="form-check-label fw-bold text-gray-600 fs-7">
                Отправлял средства
            </span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref, watch} from "vue";
import {getAssetPath} from "@/core/helpers/assets";
import Multiselect from '@vueform/multiselect';
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import ApiService from "@/core/services/ApiService";
import Api from "@/config/api";
import {ElMessage} from "element-plus";

export default defineComponent({
  name: "aml",
  components: {
    Datatable,
    Multiselect,
  },

  setup() {
    const selectedCurrency = ref({
      value: "",
      placeholder: "Сеть",
      options: [],
    });
    const priceOfCheck = ref('0');
    const checkedNumber = ref('');
    const directionCheck = ref('2');

    const getCurrency = async () => {
      const response = await ApiService.post(Api.uc.currencies, "");
      selectedCurrency.value.options = response.data.data;
    };

    const checkPrice = async () => {
      const response = await ApiService.post(Api.uc.amlPrice, "");
      priceOfCheck.value = response.data.data;
    };

    const checkOperation = async () => {
      let formData = new FormData();
      formData.append("id", "");
      formData.append("address", checkedNumber.value);
      formData.append("direction", directionCheck.value);
      formData.append("network", selectedCurrency.value.value);
      ApiService.post(Api.uc.amlCheck, formData).then(response => {
        ElMessage.success(response.data.message);
        checkedNumber.value = "";
        selectedCurrency.value.value = "";
      }).catch(response => {
        ElMessage.error(response.data.message)
      });
    };

    watch(checkedNumber, () => {
      checkedNumber.value.length > 64 ? directionCheck.value = '0' : directionCheck.value = '2'
    });

    onMounted(() => {
      getCurrency();
      checkPrice();
    });

    return {
      getAssetPath,
      selectedCurrency,
      priceOfCheck,
      checkedNumber,
      directionCheck,
      checkOperation,
    }
  }
})
</script>

<style scoped>
.form-check-input {
  width: 20px;
  height: 20px;
}
</style>
