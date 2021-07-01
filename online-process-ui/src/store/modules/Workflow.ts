import {Action, Module, Mutation, VuexModule} from "vuex-module-decorators";

@Module({ namespaced: true, name: "workflow"})
class Workflow extends VuexModule {
    public applicants: Array<any> = [{
        previous: '',
        expiration: ''
    }]

    @Mutation
    public setApplicants(applicants: Array<any>) {
        this.applicants = applicants
    }

    @Action
    public updateApplicants(applicants: Array<any>) {
        this.context.commit('setApplicants', applicants)
    }
}

export default Workflow
