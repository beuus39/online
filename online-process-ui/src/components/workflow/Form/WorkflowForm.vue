<template>
  <v-form v-model="valid" lazy-validation>
    <v-stepper v-model="currentStep">
      <v-stepper-header>
        <v-stepper-step :complete="currentStep > 1" step="1">Create Steps</v-stepper-step>
        <v-stepper-step :complete="currentStep > 2" step="2">Create Transitions</v-stepper-step>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content step="1">
          <v-container fluid>
            <v-row>
              <v-col cols="12">
                <v-text-field
                    v-model="name"
                    :counter="255"
                    label="Workflow Name"
                    required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-card v-for="(step, index) in steps" v-bind:key="step.id" class="mx-auto" outlined>
                <v-row>
                  <v-col cols="11">
                    <v-card-title>New Step</v-card-title>
                  </v-col>
                  <v-col cols="1">
                    <v-card-actions>
                      <v-btn class="mx-2" fab dark small color="red" @click="onRemoveWorkflowStep(step.id)">
                        <v-icon dark>
                          mdi-minus
                        </v-icon>
                      </v-btn>
                    </v-card-actions>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="1">
                    <v-card-text>
                      <v-text-field
                          v-model="step.order"
                          label="Order"
                          disabled
                      ></v-text-field>
                    </v-card-text>
                  </v-col>
                  <v-col cols="2">
                    <v-card-text>
                      <v-text-field
                          v-model="step.name"
                          :counter="255"
                          label="Step Name"
                      ></v-text-field>
                    </v-card-text>
                  </v-col>
                  <v-col cols="4">
                    <v-card-text>
                      <v-combobox
                          clearable
                          multiple
                          small-chips
                          deletable-chips
                          label="Status"
                          :items="STATUS_STEP"
                          item-text="value"
                          item-value="id"
                          return-object
                          v-model="step.expectedStatus"
                      ></v-combobox>
                    </v-card-text>
                  </v-col>
                  <v-col cols="5">
                    <v-card-text>
                      <v-combobox
                          clearable
                          multiple
                          small-chips
                          deletable-chips
                          label="Assignee(s)"
                          :items="ASSIGNEES"
                          item-text="name"
                          item-value="id"
                          return-object
                          v-model="step.approvedList"
                      ></v-combobox>
                    </v-card-text>
                  </v-col>
                </v-row>
              </v-card>
              <v-row>
                <div class="text-center" justify="center">
                  <v-btn class="ma-2" color="secondary" @click="onAddWorkflowStep">Add Step</v-btn>
                </div>
              </v-row>
            </v-row>
          </v-container>
          <div class="text-right">
            <v-btn class="ma-2" color="primary" @click="onNextFormStep">Next</v-btn>
          </div>
        </v-stepper-content>
        <v-stepper-content step="2">
          <v-container fluid>
            <v-card v-for="transition in transitions" v-bind:key="transition.id" class="mx-auto" outlined>
              <v-row>
                <v-col cols="1">
                  <v-card-text>
                    <v-text-field
                        v-model="transition.order"
                        label="Step Order"
                        disabled
                    ></v-text-field>
                  </v-card-text>
                </v-col>
                <v-col cols="2">
                  <v-card-text>
                    <v-text-field
                        v-model="transition.name"
                        label="Step Name"
                        disabled
                    ></v-text-field>
                  </v-card-text>
                </v-col>
                <v-col>
                  <v-card-text>
                    <v-row v-for="status in transition.expectedStatus" v-bind:key="status.id">
                      <v-col cols="6">
                        <v-text-field
                            v-model="status.status"
                            label="Status"
                            disabled
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6">
                        <v-select
                            v-model="status.nextStep"
                            label="Next Step"
                            :items="steps.map(step => `${step.order} | ${step.name}`)"
                        ></v-select>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-col>
              </v-row>

            </v-card>
          </v-container>
          <div class="text-right">
            <v-btn class="ma-2" @click="onPreviousFormStep">Back</v-btn>
            <v-btn class="ma-2" color="primary" @click="onSave">Save</v-btn>
            <!--            <v-btn class="ma-2" color="primary" @click="onPublish">Publish</v-btn>-->
          </div>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-form>
</template>

<script lang="ts">

import {Component, Vue} from "vue-property-decorator";
import {namespace} from "vuex-class";
import {v4 as uuidv4} from 'uuid';

const workflow = namespace('Workflow')

interface Step {
  id: string,
  order: number,
  name: string,
  expectedStatus: any[],
  approvedList: any[],
}

interface Workflow {
  name: string,
  status: string,
  step: any,
  transition: any,
}

@Component({})
export default class WorkflowForm extends Vue {

  private ASSIGNEES = [
    {id: uuidv4(), name: "Nguyen Van A"},
    {id: uuidv4(), name: "Nguyen Van B"},
    {id: uuidv4(), name: "Nguyen Van C"},
    {id: uuidv4(), name: "Nguyen Van D"},
  ]

  private STATUS_STEP = [
    {id: uuidv4(), value: "APPROVED"},
    {id: uuidv4(), value: "VIEWED"},
    {id: uuidv4(), value: "REJECTED"},
    {id: uuidv4(), value: "CONFIRMED"},
  ]

  private STATUS_WORKFLOW = [
    "DRAFT",
    "PUBLISHED"
  ]

  private valid: boolean = true;
  private currentStep: number = 1;
  private minStep: number = 1;
  private maxStep: number = 2;
  private workflow = {
    name: '',
    status: this.STATUS_WORKFLOW[0],
    steps: {},
    transition: {},
  }
  private name: string = '';
  private status: string = this.STATUS_WORKFLOW[0];
  private steps: Step[] = [];
  private transitions: any[] = [];

  onNextFormStep(): void {
    this.transitions = this.steps.map(step => {
      const transition = {...step};
      transition.expectedStatus = transition.expectedStatus.map(status => ({
        id: status.id,
        status: status.value,
        nextStep: ''
      }));
      return transition;
    })
    this.currentStep = this.maxStep
  }

  onPreviousFormStep(): void {
    this.currentStep = this.minStep;
  }

  onAddWorkflowStep() {
    this.steps.push({id: uuidv4(), order: this.steps.length + 1, name: '', expectedStatus: [], approvedList: []});
  }

  onRemoveWorkflowStep(id: string) {
    this.steps = this.steps.filter(step => step.id !== id);
    this.steps.forEach((step, index) => {
      step.order = index + 1;
    })
  }

  formatData(): any {
    const parsedSteps: any = this.steps.reduce((acc, curr) => ({...acc, [curr.order]: {...curr}}), {});
    for (const step in parsedSteps) {
      const {expectedStatus, approvedList, name} = parsedSteps[step];
      const parsedStatus = expectedStatus.reduce((acc: any, curr: any) => ({...acc, [curr.value]: curr.value}), {});
      const parsedApprovedList = approvedList.reduce((acc: any, curr: any) => ({...acc, [curr.id]: curr.name}), {});
      parsedSteps[step] = {name, approvedList: parsedApprovedList, expectedStatus: parsedStatus};
    }

    const parsedTransitions: any = this.transitions.reduce((acc: any, curr: any) => ({
      ...acc,
      [curr.order]: {...curr}
    }), {});
    for (const transition in parsedTransitions) {
      const {expectedStatus} = parsedTransitions[transition];
      const parsedStatus = expectedStatus.reduce((acc: any, curr: any) => ({...acc, [curr.status]: curr.nextStep.split(" | ")[0]}), {});
      parsedTransitions[transition] = parsedStatus;
    }

    return {name: this.name, status: this.status, step: parsedSteps, transition: parsedTransitions};
  }

  onSave() {
    console.log(this.formatData());
  }

}
</script>

<style scoped>

</style>