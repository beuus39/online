import {Action, Module, Mutation, VuexModule} from "vuex-module-decorators";
import {DepositInvoiceDto} from "@/dtos/DepositInvoiceDto";
import axios from "axios";
import {AppConstant} from "@/constants/AppConstant";

@Module({ namespaced: true })
class DepositInvoice extends VuexModule {
    public depositInvoice: any
    public isSucceedDeposit: boolean = false
    public depositInvoices: Array<any> = []
    public workflowOfInvoice: any
    public currentTransitionState: Array<any> = []

    @Mutation
    public setWorkflowOfInvoice(workflowInvoice: any): void {
        this.workflowOfInvoice = workflowInvoice
    }

    @Mutation
    public setCurrentTransitionState(state: Array<any>): void {
        this.currentTransitionState = [...state]
    }

    @Mutation
    public setDepositInvoice(addDepositInvoice: any): void {
        this.depositInvoice = addDepositInvoice
    }

    @Mutation
    public setIsSucceedDeposit(isSucceed: boolean): void {
        this.isSucceedDeposit = isSucceed
    }

    @Mutation
    public setDepositInvoices(depositInvoices: Array<any>): void {
        this.depositInvoices = [...depositInvoices]
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

    @Action
    public getAllDepositInvoices(): void {
        axios.get(`${AppConstant.BASE_URL}/deposit-invoices/workflows/60dbf6562b51e45a9ca625a7`)
            .then((res) => {
                const response = res.data.map((invoice: any) => ({
                    id: invoice._id,
                    project: invoice?.project ?? null,
                    businessUnit: invoice?.businessUnit ?? null,
                    assignee: invoice?.assignee ?? null,
                    workflow: invoice?.workflow?.id ?? null,
                    nextStep: invoice?.workflow?.nextStep ?? null,
                    previousStep: invoice?.workflow?.previousStep ?? 1,
                    workflowAssignee: invoice?.workflow?.assignee?.name ?? null
                }))
                this.context.commit("setDepositInvoices", response)
            }).catch((err) => this.context.commit("setDepositInvoices", {}))
    }

    @Action
    public getDepositInvoice(invoiceId: string, assignee: string = "60dbf6562b51e45a9ca625a7"): void {
        console.log("Assignee:: ", assignee)
        axios.get(`${AppConstant.BASE_URL}/deposit-invoices/${invoiceId}/workflows/${assignee}`)
            .then((res) => {
                const nextStep = res.data.workflow.nextStep
                console.log("Response Data:: ", JSON.stringify(res.data))
                console.log("NextStep:: ", JSON.stringify(nextStep))
                this.context.commit("setDepositInvoice", res.data)
                axios.get(`${AppConstant.BASE_URL}/workflows/${res.data.workflow.id}/${res.data.workflow.revision}`)
                    .then((res) => {
                        const states = Object.keys(res.data.transition[`${nextStep}`])
                        console.log("States:: ", JSON.stringify(states))

                        this.context.commit("setWorkflowOfInvoice", res.data)
                        this.context.commit("setCurrentTransitionState", states)
                    }).catch((err) => this.context.commit("setWorkflowOfInvoice", undefined))
            }).catch((err) => this.context.commit("setDepositInvoice", undefined))
    }

}

export default DepositInvoice
