<template>
  <v-layout column justify-center align-center>
    <h1>Excepted Cash $</h1>
    <v-form>
      <v-text-field type="number" v-model="realCash" placeholder="$" label="Real Cash"></v-text-field>
    </v-form>
  </v-layout>
</template>


<script>
import store from "@/store";
import { db } from "@/firebase";

export default {
  data() {
    return {
      registerHistory: [],
      realCash: ""
    };
  },
  computed: {
    invoices() {
      return store.state.invoices;
    },
    totalCash: function() {
      let totalCash = 0;
      for (let i = 0; i < this.invoices.length; i++) {
        for (let j = 0; j < this.invoices[i].paid.length; j++) {
          if (this.invoices[i].paid[j].paymentType == "cash")
            totalCash += parseFloat(this.invoices[i].paid[j].amount);
        }
      }
      return Math.round(totalCash * 100) / 100;
    }
  },
  created() {
    db.ref("registerCount")
      .limitToLast(5)
      .once("value", snapshot => {
        this.registerHistory = Object.values(snapshot.val());
      });
  }
};
</script>

<style lang="scss" scoped>
</style>

