<template>
  <v-layout justify-center row>
    <v-flex xs12>
      <v-card class="mb-3 py-2" v-for="history in registerHistory.slice().reverse()">
        <v-icon v-if="history.realCash > history.expectedCash" color="green">fas fa-arrow-up</v-icon>
        <v-icon v-else-if="history.realCash < history.expectedCash" color="red">fas fa-arrow-down</v-icon>
        <v-icon v-else color="blue">fas fa-minus</v-icon>
        <h1>Date {{new Date(history.date).toLocaleDateString([], {hour: '2-digit', minute:'2-digit'})}}</h1>
        <h1>Expected ${{history.expectedCash}}</h1>
        <h1>Real ${{history.realCash}}</h1>
        <h1 v-if="history.reason">Reason : {{history.reason}}</h1>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import store from "@/store";
import { db } from "@/firebase";
export default {
  data() {
    return {
      registerHistory: []
    };
  },
  created() {
    db.ref("registerCount")
      .limitToLast(10)
      .once("value", snapshot => {
        this.registerHistory = Object.values(snapshot.val());
      });
  }
};
</script>

<style lang="scss" scoped>
</style>