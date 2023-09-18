import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";
import Api from "@/config/api";
import axios from "axios";
import { Modal } from "bootstrap";

export const useP2PStore = defineStore("p2p", {
    state: () => ({
        buySellFilter: 0,
        advertisements: [],
        modalTrigger: "",
        paymentTypes: [],
        p2pPaymentTypes:[],
        paymentActive:[],
        payFilterSumm:'',
        modalData: [],
        advertisementActive: -1,
        coinParams: [
            {
                unit: "RUB",
                marketPrice: "1",
                name: "Rubles",
                sell_min_amount: "100.00000000",
                nameCn: "Рубли",
                id: "22",
                sort: "0",
                buy_min_amount: "100.00000000"
            }
        ]
    }),
    actions: {
        async getUnit(pageNo: number, pageSize: number) {
            this.advertisementActive = -1;
            let formData = new FormData();
            //@ts-ignore
            formData.append("pageNo", pageNo);
            //@ts-ignore
            formData.append("pageSize", pageSize);
            //@ts-ignore
            formData.append("advertiseType", this.buySellFilter);
            formData.append("unit", "RUB");
            if(this.paymentActive.length > 0){for(let i=0; i < this.paymentActive.length; i++ ){formData.append("paymentTypeId", this.paymentActive[i].id);}}
            else {formData.append("paymentTypeId", '');}
            formData.append("isCertified", "0");
            //@ts-ignore
            formData.append("sum", Number(this.payFilterSumm));
            return ApiService.post(Api.otc.unit, formData).then((response) => {
                this.advertisements = response.data.data;
                console.log(this.advertisements);
            });
        },
        async getPaymentTypes() {
            return ApiService.post(Api.uc.paymentTypes, "").then((response) => {
                this.paymentTypes = response.data.data;
                this.p2pPaymentTypes = response.data.data;
            });
        },
        async getCoinParams() {
            return ApiService.post(Api.otc.coinParams, "").then((response) => {
                this.coinParams = response.data.data;
                console.log("state", this.coinParams);
            });
        },
        setBuySell(data: number) {
            this.buySellFilter = data;
        },
        saveModal(name:string, modal:object){
            let modalInfo = {name:name, modal:modal}

            if(this.modalData.find(modal => modal.name == name)){

            } else {
                this.modalData.push(modalInfo)
                console.log('modals', this.modalData)
            }

        },
        modalTrigger(name){
            console.log(this.modalData.find(modal => modal.name == name))
            return this.modalData.find(modal => modal.name == name).modal
        }
    },
    getters: {
        coinParam: (state) => {
            return state.coinParams.find((item) => item.unit == "RUB");
        },
    }
});