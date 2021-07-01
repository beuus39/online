<template>
  <v-form
      ref="form"
      v-model="deposit.valid"
      lazy-validation
  >
<!--    Issued date-->
    <v-row justify="center">
      <v-menu
          ref="deposit.menu"
          v-model="deposit.menu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
              v-model="deposit.dateFormatted"
              label="Date"
              hint="Issued date"
              persistent-hint
              prepend-icon="mdi-calendar"
              v-bind="attrs"
              @blur="date = parseDate(deposit.dateFormatted)"
              v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
            v-model="date"
            no-title
            @input="deposit.menu = false"
        ></v-date-picker>
      </v-menu>
    </v-row>
<!--    Project-->
    <v-select
        v-model="deposit.project"
        :items="deposit.projects"
        :rules="[v => !!v || 'Item is required']"
        label="Project"
        required
    />
<!--    Business Unit-->
    <v-select
        v-model="deposit.businessUnit"
        :items="deposit.businessUnits"
        :rules="[v => !!v || 'Item is required']"
        label="Business Unit"
        required
    />

<!--    Assignee-->
    <v-select
        v-model="deposit.assignee"
        :items="deposit.assignees"
        :rules="[v => !!v || 'Item is required']"
        label="Assignee"
        required
    />
<!--    Workflow-->
    <v-select
        v-model="deposit.select"
        :items="workflowIds"
        :rules="[v => !!v || 'Workflow is required']"
        label="Workflow"
        required
    ></v-select>

<!--    <v-text-field
        v-model="deposit.name"
        :counter="10"
        :rules="deposit.nameRules"
        label="Name"
        required
    ></v-text-field>

    <v-text-field
        v-model="deposit.email"
        :rules="deposit.emailRules"
        label="E-mail"
        required
    ></v-text-field>

    <v-checkbox
        v-model="deposit.checkbox"
        :rules="[v => !!v || 'You must agree to continue!']"
        label="Do you agree?"
        required
    ></v-checkbox>-->
    <v-btn @click="addDeposit" color="warning">
      Add deposit
    </v-btn>
  </v-form>
</template>

<script lang="ts">
import {Component, Vue, Watch} from "vue-property-decorator";
import { namespace } from "vuex-class";
import {DepositInvoiceDto} from "@/dtos/DepositInvoiceDto";

const depositInvoices = namespace("DepositInvoice")
const workflow = namespace("Workflow")

@Component
export default class AddDepositForm extends Vue {
  mounted() {
    this.findAllWorkflows()
  }

  @depositInvoices.State
  public depositInvoice!: any
  @depositInvoices.State
  public isSucceedDeposit!: boolean
  @workflow.State
  public workflows!: any
  @workflow.State
  public workflowIds!: Array<any>

  @depositInvoices.Action
  public createDepositInvoice!: (deposit: DepositInvoiceDto) => void
  @workflow.Action
  public findAllWorkflows!: () => void

  date = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
  addDeposit(): void {
    console.log("Add deposit:: ", JSON.stringify(this.deposit))
    const depositDto = {
      issuedDate: this.deposit.issuedDate,
      project: this.deposit.project,
      businessUnit: this.deposit.businessUnit,
      assignee: this.deposit.assignee,
      workflow: {
        id: this.deposit.select
      },
    }
    console.log("Inserted dtos:: ", JSON.stringify(depositDto))
    this.createDepositInvoice(depositDto)
  }

  @Watch("date")
  changeDate(val) {
    this.deposit.dateFormatted = this.formatDate(this.date)
  }

  formatDate (date) {
    if (!date) return null

    const [year, month, day] = date.split('-')
    return `${month}/${day}/${year}`
  }

  parseDate (date) {
    if (!date) return null

    const [month, day, year] = date.split('/')
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
  }

  private deposit: any = {
    dateFormatted: this.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)),
    menu: false,
    valid: true,
    /*name: '',
    nameRules: [
      (v: any) => !!v || 'Name is required',
      (v: string | any[]) => (v && v.length <= 10) || 'Name must be less than 10 characters',
    ],
    email: '',
    emailRules: [
      (v: any) => !!v || 'E-mail is required',
      (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    select: null,
    items: [...this.workflowIds],
    checkbox: false,*/
    projects: ["Nova world Ho Tram", "Nova world Phan Thiet", "Aquacity"],
    assignees: ["Nguyen Thanh Cong", "Nguyen Quang Le Anh", "Nguyen Duc Tai"],
    businessUnits: ["NVL", "ACB", "MBB", "BID"],
    assignee: null,
    project: null,
    businessUnit: null,
  };
}
</script>

<style scoped>

</style>
