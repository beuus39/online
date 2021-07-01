import {Action, Module, Mutation, VuexModule} from "vuex-module-decorators";
import axios from "axios";
import {WorkflowConstant} from "@/constants/WorkflowConstant";

@Module({ namespaced: true })
class Workflow extends VuexModule {
    public applicants: Array<any> = [{
        previous: '',
        expiration: ''
    }]
    public workflows: Array<any> | undefined;
    public isCheck: boolean = false;

    @Mutation
    public setAllWorkflows(workflows: Array<any> | undefined) {
        this.workflows = workflows
        this.isCheck = true
        console.log("IS CHECK: ", this.isCheck)
    }

    @Mutation
    public setApplicants(applicants: Array<any>) {
        this.applicants = applicants
    }

    @Action({ rawError: true })
    public findAllWorkflows() {
        axios.get(`${WorkflowConstant.BASE_URL}/workflows`)
            .then((res) => this.context.commit("setAllWorkflows", res.data))
            .catch((err) => this.context.commit("setAllWorkflows", undefined))
    }

    @Action
    public updateApplicants(applicants: Array<any>) {
        debugger
        this.context.commit('setApplicants', applicants)
    }
}

export default Workflow
