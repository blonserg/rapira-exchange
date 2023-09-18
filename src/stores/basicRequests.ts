import {defineStore} from "pinia";
import ApiService from "@/core/services/ApiService";
import Api from "@/config/api";
import {ref} from "vue";


export const useBasicRequest = defineStore("basicRequest", () => {

    let securitySetting = ref({} as any);
    let wallet = ref([] as any);
    let showAllBalance = ref(!!localStorage["showAllBalance"] as boolean);
    let infoSeller = ref([] as any);


    const getSetting = () => {
        ApiService.post(Api.uc.securitySetting, "").then(response => {
            if (response.data.code === 200 || response.data.code == 0) {
                securitySetting.value = response.data.data;
                return true;
            }
        })
    }

    const getWallet = () => {
        ApiService.post(Api.uc.wallet, "").then(response => {
            if (response.data.code === 200 || response.data.code == 0) {
                const arr = response.data.data;
                const value1 = "USDT";
                const value2 = "RUB";
                arr.forEach((element: any, id: number) => {
                    if (element.unit === value1) {
                        arr.unshift(arr.splice(id, 1)[0])
                    }
                })
                arr.forEach((element: any, id: number) => {
                    if (element.unit === value2) {
                        arr.unshift(arr.splice(id, 1)[0])
                    }
                })
                wallet.value = arr;
                return true;
            }
        })
    }

    const initRequest = async () => {
        ApiService.setHeader();
        getSetting();
        getWallet();
    }

    return {
        initRequest,
        getSetting,
        getWallet,
        securitySetting,
        wallet,
        showAllBalance,
        infoSeller,
    }
})