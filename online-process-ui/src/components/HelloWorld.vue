<template>
  <v-container>
    <v-row class="text-center">
      <div class="card">
        <div class="card-header"><h3>Welcome to Workflow and Deposit setup</h3></div>
        <div class="card-body">
          <v-btn @click="addDepositInvoice" class="mr-3">Add Deposit Invoice</v-btn>
          <v-btn @click="getListProductInvoice" class="mr-3">Get List Deposit Invoice</v-btn>
        </div>
      </div>
    </v-row>
  </v-container>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  @Component
  export default class HelloWorld extends Vue {
    addDepositInvoice() {
      this.$router.push("/deposit-invoice")
    }
    getListProductInvoice() {
      this.$router.push("/deposit-invoice/list")
    }
  }
</script>
