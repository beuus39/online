<template>
  <h1>Hello: Edit pages</h1>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from "vue-property-decorator";
import { namespace } from "vuex-class";

const depositInvoice = namespace("DepositInvoice")

@Component
export default class EditDepositForm extends Vue {
  created() {
    const id = this.$route.params.id
    this.getDepositInvoice(id)
    console.log("Created:: ", JSON.stringify(this.depositInvoice))
  }

  @depositInvoice.State
  public depositInvoice!: any
  @depositInvoice.Action
  public getDepositInvoice!: (invoiceId: string, assignee: string) => void
}
</script>

<style scoped>

</style>
