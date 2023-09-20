<template>
  <div
      class="modal fade"
      id="register-modal"
      tabindex="-1"
      aria-hidden="true"
  >
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
            <h1 class="mb-5 login-title">Создать аккаунт</h1>

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
              id="register-form"
              @submit="createAccount"
              :validation-schema="register"
              :initial-values="{ code: '',  password: '', username: '', }"
          >
            <div class="d-flex flex-column">
              <div class="mb-6">
                <div class="position-relative">
                  <div class="form-floating">
                  <Field
                      id="registerEmail"
                      tabindex="1"
                      class="form-control text-gray-600 fs-7 fw-bold ps-14"
                      type="text"
                      name="username"
                      autocomplete="off"
                      v-model.trim="username"
                  />
                  <label for="registerEmail" class="text-gray-600 fs-7 fw-semibold ps-15">Email</label>
                </div>
                  <div class="position-absolute translate-middle-y top-50 start-0 ms-3">
                    <EmailSvg />
                  </div>
                </div>
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="username"/>
                  </div>
                </div>
              </div>
              <div class="mb-4">
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
                    <label for="floatingInputPasswordReset" class="text-gray-600 fs-7 fw-semibold ps-15">Пароль</label>
                  </div>
                  <div class="position-absolute translate-middle-y top-50 start-0 ms-3">
                    <LockNewSvg />
                  </div>
                  <div class="position-absolute translate-middle-y top-50 end-0">
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
                    <ErrorMessage name="password"/>
                  </div>
                </div>
                <div
                    class="flex mt-2"
                    v-else
                >
                  <span
                      class="badge me-2 mb-2 login-badge"
                      :class="{ 'badge-light-danger': errorMin === 'error', 'd-none': errorMin === 'success', 'badge-light':  errorMin === 'default'}"
                  >
                    6+ символов
                  </span>
                  <span
                      class="badge me-2 mb-2 login-badge"
                      :class="{ 'badge-light-danger': errorLower === 'error', 'd-none': errorLower === 'success', 'badge-light':  errorLower === 'default'}"
                  >
                    Строчная
                  </span>
                  <span
                      class="badge me-2 mb-2 login-badge"
                      :class="{ 'badge-light-danger': errorUpper === 'error', 'd-none': errorUpper === 'success', 'badge-light':  errorUpper === 'default'}"
                  >
                    Заглавная
                  </span>
                  <span
                      class="badge me-2 mb-2 login-badge"
                      :class="{ 'badge-light-danger': errorDigit === 'error', 'd-none': errorDigit === 'success', 'badge-light':  errorDigit === 'default'}"
                  >
                    Цифра
                  </span>
                  <span
                      class="badge me-2 mb-2 login-badge"
                      :class="{ 'badge-light-danger': errorSpecial === 'error', 'd-none': errorSpecial === 'success', 'badge-light':  errorSpecial === 'default'}"
                  >
                    Спецсимвол
                  </span>
                  <span
                      class="badge me-2 mb-2 badge-light-success login-badge-success"
                      v-if="errorMin === 'success' && errorSpecial === 'success' && errorLower === 'success' && errorUpper === 'success' && errorDigit === 'success'"
                  >
                    <CheckSvg class="me-1" />
                    Надёжный пароль
                  </span>
                </div>
              </div>
              <div class="mb-6">
                <div class="position-relative">
                  <div class="form-floating">
                    <Field
                        id="floatingInputCodeRegister"
                        tabindex="1"
                        class="form-control text-gray-600 fs-7 fw-bold ps-14"
                        type="text"
                        name="code"
                        autocomplete="off"
                        v-model.trim="code"
                    />
                    <label for="floatingInputCodeRegister" class="text-gray-600 fs-7 fw-semibold ps-15">Код подтверждения</label>
                  </div>
                  <div class="position-absolute translate-middle-y top-50 start-0 ms-3">
                    <ShieldSvg />
                  </div>
                  <div class="position-absolute translate-middle-y top-50 end-0 me-3">
                    <button
                        v-show="username"
                        @click="showRecaptcha = true"
                        class="btn btn-sm btn-light-primary btn-code"
                    >Получить код</button>
                  </div>
                </div>
                <div v-show="showRecaptcha" class="mt-2">
                  <vue-recaptcha
                      :sitekey="sitekey"
                      size="normal"
                      theme="light"
                      @verify="recaptchaVerified"
                      ref="vueRecaptcha">
                  </vue-recaptcha>
                </div>
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="code"/>
                  </div>
                </div>
              </div>
              <div class="mb-6">
                <div
                    data-bs-toggle="collapse" data-bs-target="#kt_accordion_1_body_3" aria-expanded="false" aria-controls="kt_accordion_1_body_3"
                    class="menu-item p-0"
                >
                  <span class="menu-link p-0 pb-1">
                    <span class="text-gray-500">Реферальный код</span>
                    <span class="menu-arrow"></span>
                  </span>
                </div>
                <div id="kt_accordion_1_body_3" class="accordion-collapse collapse" aria-labelledby="kt_accordion_1_header_3" data-bs-parent="#kt_accordion_1">
                    <div >
                      <div class="position-relative">
                        <div class="form-floating">
                          <Field
                              id="referralCode"
                              tabindex="1"
                              class="form-control text-gray-600 fs-7 fw-bold ps-14"
                              type="text"
                              name="referralCode"
                              autocomplete="off"
                              v-model.trim="referralCode"
                          />
                          <label for="referralCode" class="text-gray-600 fs-7 fw-semibold ps-15">Реферальный код</label>
                        </div>
                        <div class="position-absolute translate-middle-y top-50 start-0 ms-3">
                          <ReferalSvg />
                        </div>
                        <div class="position-absolute translate-middle-y top-50 end-0 me-3">
                          <button class="btn btn-sm btn-active-primary btn-code text-primary text-hover-white">Вставить</button>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
            </div>

            <div class="form-check mb-6">
              <input v-model="checkRegister" class="form-check-input flex-grow-1 mt-1" type="checkbox" value="" id="checkRegister" />
              <label class="form-check-label" for="checkRegister">
                Я согласен с <span class="text-primary text-decoration-underline fw-bold lh-1">Условиями использования и Политикой конфиденциальности</span>
              </label>
            </div>

            <button
                type="submit"
                class="btn btn-primary w-100 mb-7"
                :disabled="!checkRegister"
                ref="submitButton"
                @submit="createAccount"
            >
              Создать аккаунт
            </button>
          </VForm>
          <div class="d-flex fs-6">
            <span href="" class="text-gray-600 fw-bold me-2">
              Уже есть аккаунт?
            </span>
            <a
                href=""
                id="goToLogin"
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
import EmailSvg from "@/assets/svg/EmailSvg.vue";
import LockNewSvg from "@/assets/svg/LockNewSvg.vue";
import ShieldSvg from "@/assets/svg/ShieldSvg.vue";
import EyeSlashSvg from "@/assets/svg/EyeSlashSvg.vue";
import CheckSvg from "@/assets/svg/CheckSvg.vue";
import ReferalSvg from "@/assets/svg/ReferalSvg.vue";
import {ErrorMessage, Field, Form as VForm} from "vee-validate";
import {getAssetPath} from "@/core/helpers/assets";
import {onMounted, ref} from "vue";
import * as Yup from "yup";
import { useAuthStore, type User } from "@/stores/auth";
import ApiService from "@/core/services/ApiService";
import Api from "@/config/api";
import Swal from "sweetalert2";
import vueRecaptcha from 'vue3-recaptcha2';
import {getCookie} from "@/core/helpers/helpers";

export default {
  name: "registerModal",
  components: {
    SecuritySvg,
    EmailSvg,
    LockNewSvg,
    ShieldSvg,
    EyeSlashSvg,
    CheckSvg,
    ReferalSvg,
    Field,
    VForm,
    ErrorMessage,
    vueRecaptcha,
  },
  setup: function () {
    const username = ref('');
    const code = ref('');
    const typeOfInput = ref(false);
    const password = ref('');
    const errorMin = ref('default');
    const errorUpper = ref('default');
    const errorLower = ref('default');
    const errorSpecial = ref('default');
    const errorDigit = ref('default');
    const isInputCheck = ref(false);
    const store = useAuthStore();
    const checkRegister = ref(false);
    const showRecaptcha = ref(false);
    const referralCode = ref(getCookie('ref'));

    const submitButton = ref<HTMLButtonElement | null>(null);

    const register = Yup.object().shape({
      username: Yup.string()
          .min(4, 'Минимальная длина поля Email или Телефон должна быть не менее 4 символов')
          .required('Email или Телефон обязательны'),
      password: Yup.string()
          .min(6, ' ')
          .matches(/[a-z]/, ' ')
          .matches(/[A-Z]/, ' ')
          .matches(/[!@#$%^&*(),.?":{}|<>]/, ' ')
          .required('Поле обязательно для заполнения'),
      code: Yup.string()
          .required('Код обязателен')
    });

    const validatePassword = (password) => {
      const uppercaseRegex = /[A-Z]/;
      const lowercaseRegex = /[a-z]/;
      const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
      const digitRegex = /\d/;

      uppercaseRegex.test(password) ? errorUpper.value = 'success' : errorUpper.value = 'error';
      lowercaseRegex.test(password) ? errorLower.value = 'success' : errorLower.value = 'error';
      specialCharRegex.test(password) ? errorSpecial.value = 'success' : errorSpecial.value = 'error';
      digitRegex.test(password) ? errorDigit.value = 'success' : errorDigit.value = 'error';
      password.length > 6 ? errorMin.value = 'success' : errorMin.value = 'error';
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
      formData.append("email", username.value);
      formData.append("recaptchaToken", token);
      ApiService.post(Api.uc.registerCode, formData).then(response => {
        let resp = response.data;
        if (resp.code == 0) {
          Swal.fire({
            text: "You have successfully send code!",
            icon: "success",
            buttonsStyling: false,
            confirmButtonText: "Ok, got it!",
            customClass: {
              confirmButton: "btn fw-semobold btn-light-primary",
            },
          })
        } else {
          Swal.fire({
            //@ts-ignore
            text: error[0] as string,
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Try again!",
            customClass: {
              confirmButton: "btn fw-semobold btn-light-danger",
            },
          }).then(() => {
            store.errors = {};
          });
        }
      })
    };

    const recaptchaVerified = (response) => {
      showRecaptcha.value = false;
      sendCode(response);
    };

    const loadingTimeout = 30000;
    const sitekey = "6LeVqXshAAAAAMxjAwDoOrXqFpku4HPjPKbIvAkR";

    const createAccount = () => {
      let formData = new FormData();
      formData.append("phone", '');
      formData.append("email", username.value);
      formData.append("username", username.value);
      formData.append("password", password.value);
      formData.append("promotion", referralCode.value);
      formData.append("country", 'Russia');
      formData.append("superPartner", '');
      formData.append("code", code.value);
      ApiService.post(Api.uc.registerEmail, formData).then(response => {
        const resp = response.data;
        if (resp.code == 0) {
          Swal.fire({
            text: "You have successfully logged in!",
            icon: "success",
            buttonsStyling: false,
            confirmButtonText: "Ok, got it!",
            heightAuto: false,
            customClass: {
              confirmButton: "btn fw-semobold btn-light-primary",
            },
          }).then(function () {
            document.getElementById('goToLogin').click();
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
          });
        }
      });
    };

    onMounted ( () => {
      ApiService.setHeader();
    });

    return {
      register,
      submitButton,
      username,
      password,
      code,
      referralCode,
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
      checkRegister,
      createAccount,
      recaptchaVerified,
      showRecaptcha,
      loadingTimeout,
      sitekey,
    };
  },
}
</script>

<style scoped>
.modal-dialog {
  max-width: 400px;
}

.btn:not(.btn-outline):not(.btn-dashed):not(.border-hover):not(.border-active):not(.btn-flush):not(.btn-icon).btn-sm.btn-code {
  padding: calc(0.23rem + 1px) calc(1rem + 1px);
}

.login-badge {
  padding: 0.5rem 1rem;
}

.login-badge-success {
  padding: 0.3rem 1rem;
}

[aria-expanded="false"] .menu-arrow {
  transform: rotateZ(90deg);
  transition: transform 0.3s ease;
}

[aria-expanded="true"] .menu-arrow {
  transform: rotateZ(-90deg);
  transition: transform 0.3s ease;
}

</style>