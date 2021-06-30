import {Action, Module, Mutation, VuexModule} from "vuex-module-decorators";

@Module({ namespaced: true, name: "user"})
class User extends VuexModule {
    public name: string = ''
    @Mutation
    public setName(newName: string): void {
        this.name = newName
    }

    @Action
    public updateName(newName: string): void {
        this.context.commit('setName', newName)
    }
}

export default User
