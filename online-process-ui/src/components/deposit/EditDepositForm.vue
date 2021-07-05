<template>
  <v-form>
    <h1>Hello: Edit pages {{currentTransitionState}}</h1>
    <h1>Workflow: {{workflowId}}</h1>
    <h1>Step: {{step}}</h1>
    <v-text-field
        v-model="updateInvoice.description"
        :counter="10"
        label="Description"
        required
    ></v-text-field>
    {{updateInvoice.description}}
    <v-select
        v-model="updateInvoice.approval"
        :items="approvedList"
        :rules="[v => !!v || 'Approval is required']"
        label="Approval"
        required
    />
    {{updateInvoice.approval}}
    <div v-for="(state, index) in currentTransitionState" :key="index" class="float-left m-lg-1">
      <v-btn color="success" @click="notification(index, state)">{{state}}</v-btn>
    </div>
  </v-form>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from "vue-property-decorator";
import { namespace } from "vuex-class";

const depositInvoice = namespace("DepositInvoice")
const user = namespace("User")

@Component
export default class EditDepositForm extends Vue {
  @depositInvoice.State
  public depositInvoice!: any
  @depositInvoice.State
  public currentTransitionState!: any
  @depositInvoice.State
  public workflowOfInvoice!: any
  @depositInvoice.State
  public currentStep!: any
  @depositInvoice.Action
  public getDepositInvoice!: (invoiceId: string, assignee: string) => void
  @depositInvoice.Action
  public updateDepositInvoice!: (update: any) => void
  @user.State
  public approvedList!: Array<string>
  @user.Action
  public fetchApprovalList!: () => void

  updateInvoice: any = {
    description: "",
    approval: ""
  }
  id: string = ""
  workflowId: string = ""
  step: string = ""

  mounted() {
    this.id = this.$route.params.id
    this.getDepositInvoice(this.id, "60dbf6562b51e45a9ca625a7")
    this.workflowId = this.workflowOfInvoice?._id ?? null
    this.step = this.currentStep
    debugger
    console.log("Created:: ", JSON.stringify(this.depositInvoice))
    console.log("Created currentTransitionState:: ", JSON.stringify(this.currentTransitionState))
  }
  created() {
    this.id = this.$route.params.id
    this.getDepositInvoice(this.id, "60dbf6562b51e45a9ca625a7")
    this.fetchApprovalList()
    this.workflowId = this.workflowOfInvoice?._id ?? null
    this.step = this.currentStep
    console.log("Created:: ", JSON.stringify(this.depositInvoice))
    console.log("Created currentTransitionState:: ", JSON.stringify(this.currentTransitionState))
  }

  notification(index: any, state: any) {
    const wfId = this.workflowId
    const approval = this.updateInvoice.approval
    const description = this.updateInvoice.description
    const step = this.step
    debugger
    this.updateDepositInvoice({ id: this.id, workflowId: wfId, assignee: approval,
      updateDeposit: { description, step, action: state}})
    alert(`Welcome next step ${index}`)
    this.$router.push("/deposit-invoice/list")
  }
}
</script>

<style scoped>

</style>
