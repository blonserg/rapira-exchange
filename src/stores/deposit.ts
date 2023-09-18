import {defineStore} from "pinia";
import ApiService from "@/core/services/ApiService";
import Api from "@/config/api";
import axios from "axios";

export interface User {
    dataCrypto: Array<object>,
    dataFiat: Array<object>,
    dataRCode: Array<object>,
}


export const useDepositStore = defineStore("deposit", {
    state: () => ({
        deposit: {
            crypto: '',
            fiat: '',
            rcode: '',
        },
        current: '',
        user: {} as User,
    }),

    actions: {
        async getDataCrypto(credentials: User, type, pageNo, pageSize) {
            let formData = new FormData();
            formData.append("type", type);
            formData.append("pageNo", pageNo);
            formData.append("pageSize", pageSize);
            return ApiService.post(Api.uc.depositRecords, formData)
                .then(response => {
                    credentials.dataCrypto = response.data;
                })
                .catch(response => {
                    credentials.dataCrypto = response.data
                });
        },

        async getDataFiat(credentials: User, pageNo, pageSize) {
            return axios.get(`${Api.uc.legalWalletRecharge}&pageNo=${pageNo}&pageSize=${pageSize}`)
                .then(response => {
                    credentials.dataFiat = response.data;
                })
                .catch(response => credentials.dataFiat = response.data);
        },

        async getDataRCode(credentials: User, pageNo, pageSize) {
            let formData = new FormData();
            formData.append("page", pageNo);
            formData.append("pageSize", pageSize);
            return ApiService.post(Api.uc.withdrawCode, formData)
                .then(response => credentials.dataRCode = response.data)
                .catch(response => credentials.dataRCode = response.data);
        },

        setCrypto(data: string) {
            this.deposit.crypto = data;
        },

        setFiat(data: string) {
            this.deposit.fiat = data;
        },

        setRcode(data: string) {
            this.deposit.rcode = data;
        },

        setCurrent(data: string) {
            this.current = data;
        },
    },
});
