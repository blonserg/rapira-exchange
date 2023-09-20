<template>
  <div class="modal fade" id="reset-modal" tabindex="-1" aria-hidden="true">
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered">
      <!--begin::Modal content-->
      <div class="modal-content rounded">
        <!--begin::Modal header-->
        <div class="modal-header justify-content-end border-0 pb-0">
          <!--begin::Close-->
          <div
            class="btn btn-sm btn-icon btn-active-color-primary"
            data-bs-dismiss="modal"
          >
            <KTIcon icon-name="cross" icon-class="fs-1" />
          </div>
          <!--end::Close-->
        </div>
        <!--end::Modal header-->

        <!--begin::Modal body-->
        <div class="modal-body pt-0 pb-10 px-5 px-xl-10">
          <!--begin::Heading-->
          <div class="mb-7 text-center">
            <h1 class="mb-5 login-title">Сбросить пароль</h1>

            <div class="text-gray-400 fw-semobold fs-6 mb-1">
              Всегда проверяйте доменное имя сайта в адресной строке браузера
            </div>
            <span class="badge badge-light login-badge fs-7">
              <SecuritySvg class="me-2" />
              <span class="text-gray-400">https://</span>
              rapira.net
            </span>
          </div>
          <!--end::Heading-->
          <VForm
            class="form w-100"
            id="reset-password-form"
            @submit="onSubmitLogin"
            :validation-schema="resetPassword"
            :initial-values="{ code: '', password: '', username: '' }"
          >
            <div class="d-flex flex-column">
              <div class="mb-6">
                <div class="position-relative">
                  <div class="form-floating">
                    <Field
                      id="floatingInputLoginReset"
                      tabindex="1"
                      class="form-control text-gray-600 fs-7 fw-bold ps-14"
                      type="text"
                      name="username"
                      autocomplete="off"
                      v-model.trim="username"
                    />
                    <label
                      for="floatingInputLoginReset"
                      class="text-gray-600 fs-7 fw-semibold ps-15"
                      >Email или Телефон</label
                    >
                  </div>
                  <div
                    class="position-absolute translate-middle-y top-50 start-0 ms-3"
                  >
                    <UserSvg />
                  </div>
                </div>
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="username" />
                  </div>
                </div>
              </div>
              <div class="mb-6">
                <div class="position-relative">
                  <div class="form-floating">
                    <Field
                      id="floatingInputCode"
                      tabindex="1"
                      class="form-control text-gray-600 fs-7 fw-bold ps-14"
                      type="text"
                      name="code"
                      autocomplete="off"
                      v-model.trim="code"
                    />
                    <label
                      for="floatingInputCode"
                      class="text-gray-600 fs-7 fw-semibold ps-15"
                      >Код подтверждения</label
                    >
                  </div>
                  <div
                    class="position-absolute translate-middle-y top-50 start-0 ms-3"
                  >
                    <ShieldSvg />
                  </div>
                  <div
                    class="position-absolute translate-middle-y top-50 end-0 me-3"
                  >
                    <div
                      v-show="username"
                      class="btn btn-sm btn-light-primary btn-code"
                      @click="showRecaptcha = true"
                    >
                      Получить код
                    </div>
                  </div>
                </div>
                <div v-show="showRecaptcha" class="mt-2">
                  <vue-recaptcha
                    :sitekey="sitekey"
                    size="normal"
                    theme="light"
                    @verify="recaptchaVerified"
                    ref="vueRecaptcha"
                  >
                  </vue-recaptcha>
                </div>
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="code" />
                  </div>
                </div>
              </div>
              <div class="mb-6">
                <div class="position-relative">
                  <div class="form-floating">
                    <Field
                      id="floatingInputPasswordReset"
                      tabindex="1"
                      class="form-control text-gray-600 fs-7 fw-bold ps-14"
                      :type="typeOfInput ? 'text' : 'password'"
                      name="password"
                      autocomplete="off"
                      v-model.trim="password"
                      @input="handlePasswordInput"
                    />
                    <label
                      for="floatingInputPasswordReset"
                      class="text-gray-600 fs-7 fw-semibold ps-15"
                      >Новый пароль</label
                    >
                  </div>
                  <div
                    class="position-absolute translate-middle-y top-50 start-0 ms-3"
                  >
                    <LockNewSvg />
                  </div>
                  <div
                    class="position-absolute translate-middle-y top-50 end-0"
                  >
                    <div @click="showPassword" class="btn btn-icon">
                      <EyeSlashSvg />
                    </div>
                  </div>
                </div>
                <div
                  class="fv-plugins-message-container"
                  v-if="password === '' && isInputCheck"
                >
                  <div class="fv-help-block">
                    <ErrorMessage name="password" />
                  </div>
                </div>
                <div class="flex mt-2" v-else>
                  <span
                    class="badge me-2 mb-2 login-badge"
                    :class="{
                      'badge-light-danger': errorMin === 'error',
                      'd-none': errorMin === 'success',
                      'badge-light': errorMin === 'default',
                    }"
                  >
                    6+ символов
                  </span>
                  <span
                    class="badge me-2 mb-2 login-badge"
                    :class="{
                      'badge-light-danger': errorLower === 'error',
                      'd-none': errorLower === 'success',
                      'badge-light': errorLower === 'default',
                    }"
                  >
                    Строчная
                  </span>
                  <span
                    class="badge me-2 mb-2 login-badge"
                    :class="{
                      'badge-light-danger': errorUpper === 'error',
                      'd-none': errorUpper === 'success',
                      'badge-light': errorUpper === 'default',
                    }"
                  >
                    Заглавная
                  </span>
                  <span
                    class="badge me-2 mb-2 login-badge"
                    :class="{
                      'badge-light-danger': errorDigit === 'error',
                      'd-none': errorDigit === 'success',
                      'badge-light': errorDigit === 'default',
                    }"
                  >
                    Цифра
                  </span>
                  <span
                    class="badge me-2 mb-2 login-badge"
                    :class="{
                      'badge-light-danger': errorSpecial === 'error',
                      'd-none': errorSpecial === 'success',
                      'badge-light': errorSpecial === 'default',
                    }"
                  >
                    Спецсимвол
                  </span>
                  <span
                    class="badge me-2 mb-2 badge-light-success login-badge-success"
                    v-if="
                      errorMin === 'success' &&
                      errorSpecial === 'success' &&
                      errorLower === 'success' &&
                      errorUpper === 'success' &&
                      errorDigit === 'success'
                    "
                  >
                    <CheckSvg class="me-1" />
                    Надёжный пароль
                  </span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              class="btn btn-primary w-100 mb-7"
              ref="submitButton"
              @submit=""
            >
              Изменить пароль
            </button>
          </VForm>
          <div class="d-flex fs-6">
            <span href="" class="text-gray-600 fw-bold me-2">
              Есть пароль?
            </span>
            <a
              href=""
              class="text-primary fw-bold"
              data-bs-toggle="modal"
              data-bs-target="#login-modal"
            >
              Войти
            </a>
          </div>
        </div>
        <!--end::Modal body-->
      </div>
      <!--end::Modal content-->
    </div>
    <!--end::Modal dialog-->
  </div>
</template>

<script lang="ts">
import SecuritySvg from "@/assets/svg/SecuritySvg.vue";
import UserSvg from "@/assets/svg/UserSvg.vue";
import LockNewSvg from "@/assets/svg/LockNewSvg.vue";
import ShieldSvg from "@/assets/svg/ShieldSvg.vue";
import EyeSlashSvg from "@/assets/svg/EyeSlashSvg.vue";
import CheckSvg from "@/assets/svg/CheckSvg.vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import { getAssetPath } from "@/core/helpers/assets";
import { ref } from "vue";
import * as Yup from "yup";
import ApiService from "@/core/services/ApiService";
import Api from "@/config/api";
import Swal from "sweetalert2";
import { useAuthStore } from "@/stores/auth";

export default {
  name: "LoginModal",
  components: {
    SecuritySvg,
    UserSvg,
    LockNewSvg,
    ShieldSvg,
    EyeSlashSvg,
    CheckSvg,
    Field,
    VForm,
    ErrorMessage,
  },
  setup: function () {
    const store = useAuthStore();
    const username = ref("");
    let code = "";
    const typeOfInput = ref(false);
    const password = ref("");
    const errorMin = ref("default");
    const errorUpper = ref("default");
    const errorLower = ref("default");
    const errorSpecial = ref("default");
    const errorDigit = ref("default");
    const isInputCheck = ref(false);
    const showRecaptcha = ref(false);
    const sitekey = "6LeVqXshAAAAAMxjAwDoOrXqFpku4HPjPKbIvAkR";

    const resetPassword = Yup.object().shape({
      username: Yup.string()
        .min(
          4,
          "Минимальная длина поля Email или Телефон должна быть не менее 4 символов"
        )
        .required("Email или Телефон обязательны"),
      password: Yup.string()
        .min(6, " ")
        .matches(/[a-z]/, " ")
        .matches(/[A-Z]/, " ")
        .matches(/[!@#$%^&*(),.?":{}|<>]/, " ")
        .required("Поле обязательно для заполнения"),
      code: Yup.string().required("Код обязателен"),
    });

    const validatePassword = (password) => {
      const uppercaseRegex = /[A-Z]/;
      const lowercaseRegex = /[a-z]/;
      const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
      const digitRegex = /\d/;

      uppercaseRegex.test(password)
        ? (errorUpper.value = "success")
        : (errorUpper.value = "error");
      lowercaseRegex.test(password)
        ? (errorLower.value = "success")
        : (errorLower.value = "error");
      specialCharRegex.test(password)
        ? (errorSpecial.value = "success")
        : (errorSpecial.value = "error");
      digitRegex.test(password)
        ? (errorDigit.value = "success")
        : (errorDigit.value = "error");
      password.length > 6
        ? (errorMin.value = "success")
        : (errorMin.value = "error");
    };

    const handlePasswordInput = () => {
      validatePassword(password.value);
      isInputCheck.value = true;
    };

    const showPassword = () => {
      typeOfInput.value = !typeOfInput.value;
    };

    const sendCode = (token) => {
      let formData = new FormData();
      formData.append("account", username.value);
      formData.append("recaptchaToken", token);
      ApiService.post(Api.uc.sendCode, formData).then((response) => {
        let resp = response.data;
        if (resp.code == 0) {
          Swal.fire({
            text: "You have successfully send code!",
            icon: "success",
            buttonsStyling: false,
            confirmButtonText: "Ok, got it!",
            heightAuto: false,
            customClass: {
              confirmButton: "btn fw-semobold btn-light-primary",
            },
          });
        } else {
          Swal.fire({
            //@ts-ignore
            text: error[0] as string,
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Try again!",
            heightAuto: false,
            customClass: {
              confirmButton: "btn fw-semobold btn-light-danger",
            },
          }).then(() => {
            store.errors = {};
          });
        }
      });
    };

    const recaptchaVerified = (response) => {
      showRecaptcha.value = false;
      sendCode(response);
    };

    return {
      resetPassword,
      username,
      password,
      code,
      getAssetPath,
      typeOfInput,
      showPassword,
      validatePassword,
      handlePasswordInput,
      errorMin,
      errorUpper,
      errorLower,
      errorSpecial,
      errorDigit,
      isInputCheck,
      sendCode,
      showRecaptcha,
      sitekey,
      recaptchaVerified,
    };
  },
};
</script>

<style scoped>
.modal-dialog {
  max-width: 400px;
}

.btn:not(.btn-outline):not(.btn-dashed):not(.border-hover):not(
    .border-active
  ):not(.btn-flush):not(.btn-icon).btn-sm.btn-code {
  padding: calc(0.23rem + 1px) calc(1rem + 1px);
}

.login-badge {
  padding: 0.5rem 1rem;
}

.login-badge-success {
  padding: 0.3rem 1rem;
}
</style>
