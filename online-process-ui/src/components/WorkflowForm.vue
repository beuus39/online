<template>
  <v-form
      ref="form"
      v-model="workflow.valid"
      lazy-validation
  >
    <v-stepper v-model="es.e1">
      <v-stepper-header>
        <v-stepper-step
            :complete="es.e1 > 1"
            step="1"
        >
          Add Steps
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step
            :complete="es.e1 > 2"
            step="2"
        >
          Add Transitions
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3">
          Review
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-text-field
              v-model="workflow.name"
              :counter="10"
              :rules="workflow.nameRules"
              label="Name"
              required
          ></v-text-field>

          <v-text-field
              v-model="workflow.email"
              :rules="workflow.emailRules"
              label="E-mail"
              required
          ></v-text-field>

          <v-select
              v-model="workflow.select"
              :items="workflow.items"
              :rules="[v => !!v || 'Item is required']"
              label="Item"
              required
          ></v-select>

          <v-checkbox
              v-model="workflow.checkbox"
              :rules="[v => !!v || 'You must agree to continue!']"
              label="Do you agree?"
              required
          ></v-checkbox>

          <v-btn
              color="primary"
              @click="es.e1 = 2"
          >
            Continue
          </v-btn>

          <v-btn text>
            Cancel
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card
              class="mb-12"
              color="grey lighten-1"
              height="200px"
          ></v-card>

          <v-btn
              color="primary"
              @click="es.e1 = 3"
          >
            Continue
          </v-btn>

          <v-btn text>
            Cancel
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card
              class="mb-12"
              color="grey lighten-1"
              height="200px"
          ></v-card>

          <v-btn
              color="primary"
              @click="es.e1 = 1"
          >
            Continue
          </v-btn>

          <v-btn text>
            Cancel
          </v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-form>

<!--  <v-form
      ref="form"
      v-model="workflow.valid"
      lazy-validation
  >
    <v-text-field
        v-model="workflow.name"
        :counter="10"
        :rules="workflow.nameRules"
        label="Name"
        required
    ></v-text-field>

    <v-text-field
        v-model="workflow.email"
        :rules="workflow.emailRules"
        label="E-mail"
        required
    ></v-text-field>

    <v-select
        v-model="workflow.select"
        :items="workflow.items"
        :rules="[v => !!v || 'Item is required']"
        label="Item"
        required
    ></v-select>

    <v-checkbox
        v-model="workflow.checkbox"
        :rules="[v => !!v || 'You must agree to continue!']"
        label="Do you agree?"
        required
    ></v-checkbox>

    <v-btn
        :disabled="!workflow.valid"
        color="success"
        class="mr-4"
        @click="validate"
    >
      Validate
    </v-btn>

    <v-btn
        color="error"
        class="mr-4"
        @click="reset"
    >
      Reset Form
    </v-btn>

    <v-btn
        color="warning"
        @click="resetValidation"
    >
      Reset Validation
    </v-btn>

    <v-btn color="danger" @click="submit">
      Register
    </v-btn>
  </v-form>-->
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import { namespace } from "vuex-class";

const workflow = namespace("workflow")

@Component
export default class WorkflowForm extends Vue {
  private workflow: any = {
    valid: true,
    name: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters',
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    select: null,
    items: [
      'Item 1',
      'Item 2',
      'Item 3',
      'Item 4',
    ],
    checkbox: false,
  }

  validate() {
    this.$refs.form.validate()
  }

  reset () {
    this.$refs.form.reset()
  }

  resetValidation () {
    this.$refs.form.resetValidation()
  }

  private es: any = {
    e1: 1
  }

  submit(e: any) {
    e.preventDefault()
    alert(JSON.stringify(this.workflow))
  }
}
</script>

<style scoped>

</style>
