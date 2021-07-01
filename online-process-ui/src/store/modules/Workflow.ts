import {Action, Module, Mutation, VuexModule} from "vuex-module-decorators";
import axios from "axios";
import {AppConstant} from "@/constants/AppConstant";

@Module({ namespaced: true })
class Workflow extends VuexModule {
    public applicants: Array<any> = [{
        previous: '',
        expiration: ''
    }]
    public workflows: Array<any> | undefined;
    public isCheck: boolean = false;
    public workflowIds: Array<any> = ["Id_1", "ID_2", "ID_3"]

    @Mutation
    public setWorkflowIds(ids: Array<any>) {
        this.workflowIds = [...ids]
    }

    @Mutation
    public setAllWorkflows(workflows: Array<any> | undefined) {
        this.workflows = workflows
        this.isCheck = true
    }

    @Mutation
    public setApplicants(applicants: Array<any>) {
        this.applicants = applicants
    }

    @Action({ rawError: true })
    public findAllWorkflows(): void {
        axios.get(`${AppConstant.BASE_URL}/workflows`)
            .then((res) => {
                this.context.commit("setAllWorkflows", res.data)
                this.context.commit("setWorkflowIds", res.data.map((wfId: { _id: any; }) => wfId._id))
            })
            .catch((err) => this.context.commit("setAllWorkflows", undefined))
    }

    @Action
    public updateApplicants(applicants: Array<any>) {
        debugger
        this.context.commit('setApplicants', applicants)
    }
}

export default Workflow
