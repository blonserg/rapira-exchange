import { ref } from "vue";
import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import Api from "@/config/api";
import axios from "axios";
import {useRouter} from "vue-router";


export interface User {
  username: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  code: string;
  token: string;
  promotionCode: string;
}

export const useAuthStore = defineStore("auth", () => {
  const errors = ref({});
  const user = ref<User>({} as User);
  const isAuthenticated = ref(!!JwtService.getToken());
  const router = useRouter();

  function setAuth(authUser: User) {
    isAuthenticated.value = true;
    user.value = authUser;
    errors.value = {};
    JwtService.saveToken(user.value.token);
    localStorage.setItem("referral", user.value.promotionCode)
  }

  function setError(error: any) {
    errors.value = { error };
  }

  function purgeAuth() {
    isAuthenticated.value = false;
    user.value = {} as User;
    errors.value = [];
    JwtService.destroyToken();
  }

  // function login(credentials: User) {
  //   let formData = new FormData();
  //   formData.append('username', credentials.username)
  //   formData.append('password', credentials.password)
  //   formData.append('code', credentials.code)
  //   return ApiService.post( Api.uc.login, formData)
  //       .then(({ data }) => {
  //         if (data.code == 200 || data.code == 0) {
  //           return setAuth(data.data);
  //         } else setError(data.message);
  //       })
  //       .catch(({ data }) => {
  //         setError(data.message);
  //       });
  // }

  function login(credentials) {
    const params = new URLSearchParams();
    params.append('username', credentials.username);
    params.append('password', credentials.password);
    params.append('code', credentials.code);

    return ApiService.post(Api.uc.login, params.toString())
        .then(({ data }) => {
          if (data.code === 200 || data.code === 0) {
            return setAuth(data.data);
          } else {
            setError(data.message);
          }
        })
        .catch(({ data }) => {
          setError(data.message);
        });
  }

  function logout() {
    return ApiService.post( Api.uc.logout, '')
        .then(() => {
          purgeAuth();
        })
        .catch(({ response }) => {
          setError(response.data.errors);
        });
  }

  function register(credentials: User) {
    return ApiService.post("register", credentials)
      .then(({ data }) => {
        setAuth(data);
      })
      .catch(({ response }) => {
        setError(response.data.errors);
      });
  }

  function forgotPassword(email: string) {
    return ApiService.post("forgot_password", email)
      .then(() => {
        setError({});
      })
      .catch(({ response }) => {
        setError(response.data.errors);
      });
  }

  function verifyAuth() {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      axios.get(Api.uc.checkLogin)
          .then((response) => {
            !response.data.data ? purgeAuth() : response.data.data;
            router.push({ name: '/' });
            // setAuth(data);
          })
          .catch(({ response }) => {
            setError(response.data.errors);
            purgeAuth();
          });
    } else {
      purgeAuth();
    }
  }

  return {
    errors,
    user,
    isAuthenticated,
    purgeAuth,
    login,
    logout,
    register,
    forgotPassword,
    verifyAuth,
  };
});
