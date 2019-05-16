<template>
  <v-container fluid>
    <v-form @submit.prevent="showSalesToggle">
      <v-dialog
        ref="startDialog"
        v-model="startDateModal"
        :return-value.sync="startDate"
        persistent
        lazy
        full-width
        width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="startDate"
            label="Select startDate"
            prepend-icon="event"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="startDate" scrollable>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="$refs.startDialog.save(startDate)">OK</v-btn>
        </v-date-picker>
      </v-dialog>
      <v-dialog
        ref="endDialog"
        v-model="endDateModal"
        :return-value.sync="endDate"
        persistent
        lazy
        full-width
        width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="endDate"
            label="Select endDate"
            prepend-icon="event"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="endDate" scrollable>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="$refs.endDialog.save(endDate)">OK</v-btn>
        </v-date-picker>
      </v-dialog>
      <v-btn block :disabled="buttonIsDisabled" type="submit" color="success">View Sales</v-btn>
    </v-form>
    <v-layout v-if="invoices.length > 0" column>
      <h5 class="display-1">Sales ${{totalSales}}</h5>
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
      <h5 class="display-1">Recent Order {{invoices.length}}</h5>
      <v-list class="pb-5">
        <v-card>
          <v-list-group v-for="order in invoices.slice().reverse()" no-action>
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
                  <v-list-tile-sub-title>{{new Date(order.createdAt).toLocaleDateString([], {hour: '2-digit', minute:'2-digit'})}}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
            <v-list-tile v-for="itemList in order.itemList">
              <v-list-tile-content>
                <v-list-tile-title>
                  <v-icon class="ml-1" v-if="itemList.type == 'drink'" small>fa fa-coffee</v-icon>
                  <v-icon class="ml-1" v-else small>fas fa-utensils</v-icon>
                  {{itemList.size }} {{ itemList.name }} ${{itemList.price}}
                </v-list-tile-title>
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
    </v-layout>
  </v-container>
</template>

<script>
import store from "@/store";
import { db } from "@/firebase";
export default {
  data() {
    return {
      startDate: "",
      endDate: "",
      invoices: [],
      startDateModal: false,
      endDateModal: false,
      modal: false
    };
  },

  computed: {
    buttonIsDisabled() {
      if (
        this.startDate != "" &&
        this.endDate != "" &&
        this.startDate <= this.endDate
      )
        return false;
      else return true;
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
    }
  },
  methods: {
    showSalesToggle() {
      var startDate = new Date(this.startDate).setHours(0, 0, 0, 0);
      var endDate = new Date(this.endDate).setHours(23, 59, 59, 999);
      this.invoices = [];

      db.ref("invoice")
        .orderByChild("createdAt")
        .startAt(startDate)
        .endAt(endDate)
        .once("value", snapshot => {
          this.invoices = Object.values(snapshot.val());
        });
    }
  }
};
</script>

<style scoped>
</style>
9fb6d770a7a33c8248cd77ce487ec4f7b50407af