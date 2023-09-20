<template>
  <div class="modal fade" id="login-modal" tabindex="-1" aria-hidden="true">
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
            id="close"
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
            <h1 class="mb-5 login-title">Войти</h1>

            <div class="text-gray-400 fw-semobold fs-6 mb-1">
              Всегда проверяйте домен сайта в браузере
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
            id="login_signin_form"
            @submit="onSubmitLogin"
            :validation-schema="login"
            :initial-values="{ code: code, password: '', username: '' }"
          >
            <div class="d-flex flex-column">
              <div class="mb-6">
                <div class="position-relative">
                  <div class="form-floating">
                    <Field
                      id="floatingInputLogin"
                      tabindex="1"
                      class="form-control text-gray-600 fs-7 fw-bold ps-14"
                      type="text"
                      name="username"
                      autocomplete="off"
                      v-model.trim="username"
                      :validateOnBlur="false"
                      :validateOnChange="false"
                      :validateOnInput="false"
                    />
                    <label
                      for="floatingInputLogin"
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
                      id="floatingInputPassword"
                      tabindex="1"
                      class="form-control text-gray-600 fs-7 fw-bold ps-14"
                      :type="typeOfInput ? 'text' : 'password'"
                      name="password"
                      autocomplete="off"
                      v-model.trim="password"
                      :validateOnBlur="false"
                      :validateOnChange="false"
                      :validateOnInput="false"
                    />
                    <label
                      for="floatingInputPassword"
                      class="text-gray-600 fs-7 fw-semibold ps-15"
                      >Пароль</label
                    >
                  </div>
                  <div
                    class="position-absolute translate-middle-y top-50 start-0 ms-3"
                  >
                    <LockSvg />
                  </div>
                  <div
                    class="position-absolute translate-middle-y top-50 end-0"
                  >
                    <div @click="showPassword" class="btn btn-icon">
                      <EyeSlashSvg />
                    </div>
                  </div>
                </div>
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="password" />
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              class="btn btn-primary w-100 mb-7"
              ref="submitButton"
            >
              Войти
            </button>
          </VForm>
          <div class="d-flex justify-content-between fs-6">
            <a
              href=""
              class="text-primary fw-bold"
              data-bs-toggle="modal"
              data-bs-target="#register-modal"
            >
              Создать аккаунт
            </a>
            <a
              href=""
              class="text-gray-600 fw-bold"
              data-bs-toggle="modal"
              data-bs-target="#reset-modal"
            >
              Сбросить пароль
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
import LockSvg from "@/assets/svg/LockSvg.vue";
import EyeSlashSvg from "@/assets/svg/EyeSlashSvg.vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import { useI18n } from "vue-i18n";
import { getAssetPath } from "@/core/helpers/assets";
import { ref } from "vue";
import { useAuthStore, type User } from "@/stores/auth";
import { useBasicRequest } from "@/stores/basicRequests";
import { useRouter } from "vue-router";
import Swal from "sweetalert2/dist/sweetalert2.js";
import * as Yup from "yup";
import { ElMessage } from "element-plus";

export default {
  name: "LoginModal",
  components: {
    SecuritySvg,
    UserSvg,
    LockSvg,
    Field,
    VForm,
    ErrorMessage,
    EyeSlashSvg,
  },
  setup() {
    const { t, te } = useI18n();
    const store = useAuthStore();
    const storeBasicRequest = useBasicRequest();
    const router = useRouter();
    let username = "";
    let password = "";
    let code = "";
    const typeOfInput = ref(false);

    const submitButton = ref<HTMLButtonElement | null>(null);

    const showPassword = () => {
      typeOfInput.value = !typeOfInput.value;
    };

    const login = Yup.object().shape({
      username: Yup.string()
        .min(
          4,
          "Минимальная длина поля Email или Телефон должна быть не менее 4 символов"
        )
        .required("Email или Телефон обязательны"),
      password: Yup.string()
        .min(6, "Минимальная длина поля Пароль должна быть не менее 6 символов")
        .required("Пароль обязателен"),
    });

    const closeModal = () => {
      document.getElementById("close")?.click();
    };

    const translate = (text: string) => {
      if (te(text)) {
        return t(text);
      } else {
        return text;
      }
    };

    const modal2FA = async (values) => {
      let value = values;
      Swal.fire({
        title: translate("googleAuth.title2FA"),
        buttonsStyling: true,
        showCloseButton: true,
        showCancelButton: true,
        html: `
          <label style="line-height: 22px;" for="swal2-input1" class="text-start fw-semibold fs-6 text-gray-700 mb-3">${translate(
            "googleAuth.label2FA"
          )}</label>
          <div class="input-group mb-5">
            <span class="input-group-text bg-opacity-100 border-right-0" id="basic-addon1">
            <i class="ki-outline ki-key fs-3"></i>
            </span>
            <input type="text" class="form-control form-control-2fa border-secondary border-left-0 ps-0" placeholder="000 000" id="swal2-input1" aria-label="000 000" aria-describedby="basic-addon1" />
          </div>
          `,
        confirmButtonText: translate("button.confirm"),
        cancelButtonText: translate("button.cancel"),
        heightAuto: true,
        allowEnterKey: true,
        didOpen: () => {
          let input = document.getElementById("swal2-input1");
          input?.focus();
          function handleKeypress(e) {
            if (e.key === "Enter") {
              (
                document.getElementsByClassName(
                  "swal2-confirm"
                )[0] as HTMLInputElement | null
              )?.click();
              e.preventDefault();
            }
          }
          input?.addEventListener("keydown", handleKeypress);
        },
        preConfirm: () => {
          let code = (
            document.getElementById("swal2-input1") as HTMLInputElement | null
          )?.value;
          if (code?.replace(/ /g, "").length === 6) {
            value["code"] = code.replace(/ /g, "");
            onSubmitLogin(value);
          } else {
            ElMessage.error(translate("googleAuth.error2FA"));
            modal2FA(value);
          }
        },
        customClass: {
          title: "text-start mx-0 px-0 fw-bold fs-3",
          popup: "pt-4 w-450px",
          htmlContainer: "mx-0",
          input: "form-control form-control-lg form-control-solid w-auto",
          actions:
            "flex-row-reverse justify-content-start align-items-center w-100 m-0 gap-5 pt-0 border-light",
          confirmButton: "btn btn-lg btn-primary rounded mw-100 px-4 py-3 m-0",
          cancelButton: "btn btn-light rounded px-4 py-3 m-0",
        },
      });
    };

    //Form submit function
    const onSubmitLogin = async (values: any) => {
      values = values as User;
      // Clear existing errors
      store.purgeAuth();

      if (submitButton.value) {
        // eslint-disable-next-line
        submitButton.value!.disabled = true;
        // Activate indicator
        submitButton.value.setAttribute("data-kt-indicator", "on");
      }

      // Send login request
      await store.login(values);
      const error = Object.values(store.errors);

      if (error.length === 0) {
        // Go to page after successfully login
        storeBasicRequest.initRequest();
        closeModal();
        router.push({ name: "dashboard" });
      } else if (error[0] === "Need googleAuth") {
        // модальное окно 2FA
        closeModal();
        await modal2FA(values);
      } else {
        Swal.fire({
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

      //Deactivate indicator
      submitButton.value?.removeAttribute("data-kt-indicator");
      // eslint-disable-next-line
      submitButton.value!.disabled = false;
    };

    return {
      onSubmitLogin,
      login,
      submitButton,
      username,
      password,
      code,
      getAssetPath,
      showPassword,
      typeOfInput,
      storeBasicRequest,
    };
  },
};
</script>

<style scoped>
.modal-dialog {
  max-width: 400px;
}

.login-title {
  font-size: 30px;
}

.login-badge {
  padding: 0.5rem 1rem;
}

/*.form-floating > .form-control:focus {*/
/*  padding-top: 1.7rem;*/
/*}*/

/*.form-floating > .form-control:focus ~ label {*/
/*  transform: scale(0.85) translateY(-0.4rem) translateX(0.15rem);*/
/*}*/
</style>
