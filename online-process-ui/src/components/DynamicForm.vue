<template>
  <div id="visa">
    <h1>Vue Visa Application</h1>
    <form @submit="submitVisa">
      <button @click="addVisa">Add</button>
      <div class="previous"
           v-for="(applicant, counter) in applicants"
           v-bind:key="counter">
        <span @click="deleteVisa(counter)">x</span>
        <label for="duration">{{counter+1}}. Previous Visa:</label>
        <input type="text" v-model.lazy="applicant.previous" required>
        <label for="duration">Year of expiration:</label>
        <input type="text" v-model.lazy="applicant.expiration" required>
      </div>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component
export default class DynamicForm extends Vue {
  private applicants: Array<any> = [{
    previous: '',
    expiration: ''
  }]

  addVisa() {
    this.applicants.push({
      previous: '',
      expiration: ''
    })
  }

  deleteVisa(counter: number | any) {
    this.applicants.splice(counter, 1)
  }

  submitVisa(e: any) {
    e.preventDefault()
    alert(JSON.stringify(this.applicants))
  }
}
</script>

<style scoped>
#visa {
  margin: 20px auto;
  max-width: 700px;
}
label{
  display: block;
  margin: 20px 0 10px;
}
input {
  font-size: 30px;
  border: 1px double rgb(102, 97, 96) ;
  border-radius: 4px;
}
button {
  font-size: 16px;
  background: rgb(64, 179, 140);
  padding: 0.4rem 1.3rem;
  text-align: center;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  margin: 10px;
}
span{
  width: 30px;
  float: right;
  cursor: pointer;
}
span:hover{
  color: brown;
}
.previous{
  border: 1.5px solid;
  padding:5px;
  margin-bottom: 10px;
}
</style>
