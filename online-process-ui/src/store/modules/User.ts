import {Action, Module, Mutation, VuexModule} from "vuex-module-decorators";

@Module({ namespaced: true })
class User extends VuexModule {
    public name: string = ''
    @Mutation
    public setName(newName: string): void {
        this.name = newName
        debugger
    }

    @Action
    public updateName(newName: string): void {
        this.context.commit('setName', newName)
    }
}

export default User
