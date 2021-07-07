import {Action, Module, Mutation, VuexModule} from "vuex-module-decorators";
import axios from "axios";
import {AppConstant} from "@/constants/AppConstant";

@Module({namespaced: true})
class Workflow extends VuexModule {
    public workflow: any;
    public isLoading: boolean = false;
    public isSucceed: boolean = false;
    public isError: boolean = false;


    @Mutation
    public setWorkflow(workflow: any) {
        this.workflow = workflow;
    }

    @Mutation
    public setIsLoading(isLoading: boolean) {
        this.isLoading = isLoading;
    }

    @Mutation
    public setIsSucceed(isSucceed: boolean) {
        this.isSucceed = isSucceed;
    }

    @Mutation
    public setIsError(isError: boolean) {
        this.isError = isError;
    }

    @Action
    public createWorkflow(workflow: any): void {
        axios.post(`${AppConstant.BASE_URL}/workflow`, workflow)
            .then(resp => this.context.commit(`setWorkflow`, resp.data))
            .catch(() => this.context.commit(`setWorkflow`, undefined))
    }

    @Action
    public updateWorkflow(id: string, workflow: any): void {
        axios.put(`${AppConstant.BASE_URL}/workflow/${id}`, workflow)
            .then(resp => this.context.commit(`setWorkflow`, resp.data))
            .catch(() => this.context.commit(`setWorkflow`, undefined))
    }
}

export default Workflow