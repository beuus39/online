import {Action, Module, Mutation, VuexModule} from "vuex-module-decorators";
import {DepositInvoiceDto} from "@/dtos/DepositInvoiceDto";
import axios from "axios";
import {AppConstant} from "@/constants/AppConstant";

@Module({ namespaced: true })
class DepositInvoice extends VuexModule {
    public depositInvoice: any
    public isSucceedDeposit: boolean = false

    @Mutation
    public setDepositInvoice(addDepositInvoice: any): void {
        this.depositInvoice = addDepositInvoice
    }

    @Mutation
    public setIsSucceedDeposit(isSucceed: boolean): void {
        this.isSucceedDeposit = isSucceed
    }

    @Action
    public createDepositInvoice(depositInvoice: DepositInvoiceDto): void {
        debugger
        axios.post(`${AppConstant.BASE_URL}/deposit-invoices`, depositInvoice)
            .then((res) => {
                this.context.commit("setDepositInvoice", res.data)
                this.context.commit("setIsSucceedDeposit", true)
            })
            .catch((err) => {
                this.context.commit("setDepositInvoice", undefined)
                this.context.commit("setIsSucceedDeposit", false)
            })
    }
}

export default DepositInvoice
