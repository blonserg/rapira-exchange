import {defineStore} from "pinia";
import ApiService from "@/core/services/ApiService";
import Api from "@/config/api";
import {ref} from "vue";



export const useSettingsRequest = defineStore("settings", () => {

    let authUnbind = ref({} as any);
    let authBind = ref({} as any);

    const unBindGoogleAuth = (password, codes) => {
        const formData = new FormData();
        formData.append("password", password);
        formData.append("codes", codes);
        ApiService.post(Api.uc.unBindGoogleAuth, formData).then(response => {
            authUnbind.value = response.data;
        })
    }

    const bindGoogleAuth = (secret, codes) => {
        const formData = new FormData();
        formData.append("password", secret);
        formData.append("codes", codes);
        ApiService.post(Api.uc.bindGoogleAuth, formData).then(response => {
            authBind.value = response.data;
        })
    }

    return {
        unBindGoogleAuth,
        bindGoogleAuth,
        authUnbind,
        authBind,
    }
})