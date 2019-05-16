<template>
  <v-layout row justify-center>
    <v-flex xs8 sm6 lg4>
      <div v-if="!counted">
        <h1>Expected Cash $ {{expectedCash}} (+${{totalCash}})</h1>
        <v-form @submit.prevent="submitCount()">
          <v-text-field type="number" v-model="realCash" placeholder="$" label="Real Cash"></v-text-field>
          <v-text-field v-if="this.realCash != this.expectedCash" v-model="reason" label="Reason"></v-text-field>
          <v-btn :disabled="submitted" type="Submit" color="success">Submit</v-btn>
        </v-form>
      </div>
      <div v-else>
        <v-alert v-model="counted" type="success">Register has been counted</v-alert>
      </div>
    </v-flex>
  </v-layout>
</template>


<script>
import store from "@/store";
import { db } from "@/firebase";
import { time } from "@/firebase";

export default {
  data() {
    return {
      registerHistory: [],
      invoices: [],
      reason: "",
      realCash: "",
      counted: false
    };
  },
  computed: {
    submitted() {
      if (this.counted || this.realCash == "") {
        return true;
      } else {
        return false;
      }
    },
    lastRegisterDate() {
      return this.registerHistory[0].date;
    },
    lastRegisterCount() {
      return parseFloat(this.registerHistory[0].realCash);
    },
    expectedCash() {
      if (this.registerHistory.length > 0)
        return parseFloat(this.lastRegisterCount + this.totalCash);
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
      .limitToLast(1)
      .once("value", snapshot => {
        this.registerHistory = Object.values(snapshot.val());
        db.ref("invoice")
          .orderByChild("createdAt")
          .startAt(this.lastRegisterDate)
          .once("value", snapshot => {
            this.invoices = Object.values(snapshot.val());
          });
      });
  },
  methods: {
    submitCount() {
      db.ref("registerCount").push({
        realCash: this.realCash,
        expectedCash: this.expectedCash,
        reason: this.reason,
        date: time
      });
      this.counted = true;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

