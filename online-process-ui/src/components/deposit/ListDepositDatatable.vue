<template>
  <v-card>
    <v-card-title>
      <v-text-field
          v-model="mockerData.search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
        :headers="mockerData.headers"
        :items="depositInvoices"
        :search="mockerData.search"
    >
      <template v-slot:item.actions="{ item }">
        <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
            small
            @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
<!--      <template v-slot:item="props">
        <tr>
          <td v-for="(prop, key) in props.item" :key="key" @click="onClickItem(key, props.item[key])">
            {{props.item[key]}}
          </td>

          &lt;!&ndash; This is for actions &ndash;&gt;
          <td>
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)">
              mdi-delete
            </v-icon>
          </td>
        </tr>
      </template>-->
    </v-data-table>
  </v-card>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import { namespace } from "vuex-class";

const depositInvoice = namespace("DepositInvoice")

@Component
export default class ListDepositDatatable extends Vue {
  mounted() {
    this.getAllDepositInvoices()
  }

  @depositInvoice.State
  public depositInvoices!: Array<any>
  @depositInvoice.Action
  public getAllDepositInvoices!: () => void
  @depositInvoice.Action
  public removeDepositInvoiceItem!: (index: any) => void

  editItem(item: any) {
    console.log("Item:: ", item)
    this.$router.push({ name: "deposit", params: { id: item.id }})
  }

  deleteItem(item: any) {
    console.log("Delete item:: ", item)
  }

  private mockerData: any = {
    search: '',
    headers: [
      {
        text: 'Invoice ID',
        align: 'start',
        filterable: false,
        value: 'id',
      },
      { text: 'Project', value: 'project' },
      { text: 'Business Unit', value: 'businessUnit' },
      { text: 'Assignee', value: 'assignee' },
      { text: 'workflow', value: 'workflow' },
      { text: 'Next Step', value: 'nextStep' },
      { text: 'Previous Step', value: 'previousStep' },
      { text: 'Workflow Assignee', value: 'workflowAssignee' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    desserts: [
      {
        name: 'Frozen Yogurt',
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        iron: '1%',
      },
      {
        name: 'Ice cream sandwich',
        calories: 237,
        fat: 9.0,
        carbs: 37,
        protein: 4.3,
        iron: '1%',
      },
      {
        name: 'Eclair',
        calories: 262,
        fat: 16.0,
        carbs: 23,
        protein: 6.0,
        iron: '7%',
      },
      {
        name: 'Cupcake',
        calories: 305,
        fat: 3.7,
        carbs: 67,
        protein: 4.3,
        iron: '8%',
      },
      {
        name: 'Gingerbread',
        calories: 356,
        fat: 16.0,
        carbs: 49,
        protein: 3.9,
        iron: '16%',
      },
      {
        name: 'Jelly bean',
        calories: 375,
        fat: 0.0,
        carbs: 94,
        protein: 0.0,
        iron: '0%',
      },
      {
        name: 'Lollipop',
        calories: 392,
        fat: 0.2,
        carbs: 98,
        protein: 0,
        iron: '2%',
      },
      {
        name: 'Honeycomb',
        calories: 408,
        fat: 3.2,
        carbs: 87,
        protein: 6.5,
        iron: '45%',
      },
      {
        name: 'Donut',
        calories: 452,
        fat: 25.0,
        carbs: 51,
        protein: 4.9,
        iron: '22%',
      },
      {
        name: 'KitKat',
        calories: 518,
        fat: 26.0,
        carbs: 65,
        protein: 7,
        iron: '6%',
      },
    ],
  }
}
</script>

<style scoped>

</style>
