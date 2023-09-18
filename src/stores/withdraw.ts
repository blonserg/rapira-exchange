import {defineStore} from "pinia";
import ApiService from "@/core/services/ApiService";
import Api from "@/config/api";
import axios from "axios";

export interface User {
    dataCrypto: Array<object>,
    dataFiat: Array<object>,
    dataRCode: Array<object>,
}

export const useWithdrawStore = defineStore('withdraw', {
    state: () => ({
        withdraw: {
            crypto: '',
            fiat: '',
            rcode: '',
        },
        current: '',
        user: {} as User,
    }),

    actions: {
        getDataCrypto: async function (credentials: User, page, pageSize) {
            const formData = new FormData();
            formData.append('page', page);
            formData.append('pageSize', pageSize);
            try {
                const response = await ApiService.post(Api.uc.withdraw, formData);
                this.user.dataCrypto = response.data;
            } catch (error) {
                console.error(error);
            }
        },

        async getDataFiat(credentials: User, page, pageSize) {
            try {
                const response = await axios.get(`${Api.uc.legalWalletWithdraw}&page=${page}&pageSize=${pageSize}`);
                this.user.dataFiat = response.data;
                console.log(response.data)
            } catch (error) {
                console.error(error);
            }
        },

        async getDataRCode(credentials: User, page, pageSize) {
            const formData = new FormData();
            formData.append('page', page);
            formData.append('pageSize', pageSize);
            try {
                const response = await ApiService.post(Api.uc.withdrawCode, formData);
                this.user.dataRCode = response.data;
            } catch (error) {
                console.error(error);
            }
        },

        setCrypto(data: string) {
            this.withdraw.crypto = data;
        },

        setFiat(data: string) {
            this.withdraw.fiat = data;
        },

        setRcode(data: string) {
            this.withdraw.rcode = data;
        },

        setCurrent(data: string) {
            this.current = data;
        },
    },
});
