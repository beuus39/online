<template>
  <div>
    <h1>Hello: Edit pages {{currentTransitionState}}</h1>
    <div v-for="(state, index) in currentTransitionState" :key="index" class="float-left m-lg-1">
      <v-btn color="success" @click="notification(index)">{{state}}</v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from "vue-property-decorator";
import { namespace } from "vuex-class";

const depositInvoice = namespace("DepositInvoice")

@Component
export default class EditDepositForm extends Vue {
  @depositInvoice.State
  public depositInvoice!: any
  @depositInvoice.State
  public currentTransitionState!: any
  @depositInvoice.Action
  public getDepositInvoice!: (invoiceId: string, assignee: string) => void

  mounted() {
    const id = this.$route.params.id
    this.getDepositInvoice(id, "60dbf6562b51e45a9ca625a7")
    console.log("Created:: ", JSON.stringify(this.depositInvoice))
    console.log("Created currentTransitionState:: ", JSON.stringify(this.currentTransitionState))
  }
  created() {
    const id = this.$route.params.id
    this.getDepositInvoice(id, "60dbf6562b51e45a9ca625a7")
    console.log("Created:: ", JSON.stringify(this.depositInvoice))
    console.log("Created currentTransitionState:: ", JSON.stringify(this.currentTransitionState))
  }

  notification(index: any) {
    alert(`Welcome next step ${index}`)
    this.$router.push("/deposit-invoice/list")
  }
}
</script>

<style scoped>

</style>
