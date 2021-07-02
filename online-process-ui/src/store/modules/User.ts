import {Action, Module, Mutation, VuexModule} from "vuex-module-decorators";
import axios from "axios";
import {AppConstant} from "@/constants/AppConstant";

@Module({ namespaced: true })
class User extends VuexModule {
    public name: string = ''
    public approvedList: Array<String> = []

    @Mutation
    public setName(newName: string): void {
        this.name = newName
    }

    @Mutation
    public setApprovedList(approvedList: Array<string>): void {
        this.approvedList = [...approvedList]
    }

    @Action
    public fetchApprovalList(): void {
        axios.get(`${AppConstant.BASE_URL}/users`)
            .then((res) => {
                const formattedUsers = res.data.map((user: { accountId: any; fullName: any; }) => `${user.accountId}|${user.fullName}`)
                this.context.commit("setApprovedList", formattedUsers)
            }).catch((err) => this.context.commit("setApprovedList", undefined))
    }

    @Action
    public updateName(newName: string): void {
        this.context.commit('setName', newName)
    }
}

export default User
