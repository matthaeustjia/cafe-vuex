<template>
  <v-layout column wrap>
    <template>
      <v-toolbar flat color="grey">
        <v-toolbar-title>History</v-toolbar-title>
      </v-toolbar>
      <v-data-table :items="registerHistory" class="elevation-1" hide-actions hide-headers>
        <template v-slot:items="props">
          <td>{{ props.d }}</td>
          <td class="text-xs-right">{{ props.d }}</td>
        </template>
      </v-data-table>
    </template>
  </v-layout>
</template>
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