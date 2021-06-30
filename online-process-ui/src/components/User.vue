<template>
  <div>
    <div>User: {{nameUpperCase}}</div>
    <input :value="name" @keydown="updateName($event.tab.value)">
  </div>
</template>

<script lang="ts">
import {Vue} from "vue-property-decorator";
import Component from "vue-class-component";
import { namespace } from "vuex-class";

const user = namespace("user")

@Component
export default class User extends Vue {
  @user.State
  public name!: string

  @user.Getter
  public nameUpperCase!: string

  @user.Action
  public updateName!: (newName: string) => void
}
</script>

<style scoped>

</style>
