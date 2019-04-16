<template>
  <v-container fluid>
    <v-layout justify-center>
      <h5 class="display-1">Today sales ${{totalSales}}</h5>
    </v-layout>
    <v-layout row justify-center>
      <h6 class="headline">
        <v-icon color="orange">far fa-credit-card</v-icon>
        ${{totalCard}}
      </h6>
      <h6 class="headline">
        <v-icon color="green">far fa-money-bill-alt</v-icon>
        ${{totalCash}}
      </h6>
    </v-layout>
    <v-layout justify-center>
      <h5 class="display-1">Recent Order {{recentOrders.length}}</h5>
    </v-layout>
    <v-list>
      <v-card>
        <v-list-group v-for="order in recentOrders" no-action>
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-content v-for="paid  in order.paid">
                <v-list-tile-title v-if="paid.paymentType == 'cash'">
                  <v-icon color="green">far fa-money-bill-alt</v-icon>
                  ${{paid.amount}}
                </v-list-tile-title>
                <v-list-tile-title v-else>
                  <v-icon color="orange">far fa-credit-card</v-icon>
                  ${{paid.amount}}
                </v-list-tile-title>
                <v-list-tile-sub-title>{{new Date(order.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
          <v-list-tile v-for="itemList in order.itemList">
            <v-list-tile-content>
              <v-list-tile-title>{{itemList.size }} {{ itemList.name }} ${{itemList.price}}</v-list-tile-title>
              <v-layout
                v-if="itemList.option"
                row
                justify-center
                align-content-center
                content-center
              >
                <v-card
                  class="px-2 mx-1"
                  color="amber darken-4"
                  v-for="option in itemList.option"
                >{{option.name}}</v-card>
              </v-layout>
            </v-list-tile-content>

            <v-list-tile-action></v-list-tile-action>
          </v-list-tile>
        </v-list-group>
      </v-card>
    </v-list>
  </v-container>
</template>

<script>
import store from "@/store";
import { db } from "@/firebase";
export default {
  data() {
    return {
      date: "",
      modal: false
    };
  },

  computed: {
    invoices() {
      return store.state.invoices;
    },
    totalSales: function() {
      let totalSales = 0;
      for (let i = 0; i < this.invoices.length; i++) {
        for (let j = 0; j < this.invoices[i].paid.length; j++) {
          totalSales += parseFloat(this.invoices[i].paid[j].amount);
        }
      }
      return Math.round(totalSales * 100) / 100;
    },
    totalCard: function() {
      let totalCard = 0;
      for (let i = 0; i < this.invoices.length; i++) {
        for (let j = 0; j < this.invoices[i].paid.length; j++) {
          if (this.invoices[i].paid[j].paymentType == "card")
            totalCard += parseFloat(this.invoices[i].paid[j].amount);
        }
      }
      return Math.round(totalCard * 100) / 100;
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
    },
    recentOrders() {
      return this.invoices.slice().reverse();
    }
  }
};
</script>

<style scoped>
</style>