<template>
  <v-layout row wrap justify-space-between>
    <v-flex xs12 v-for="product, index in drinksList">
      <v-card min-height="70px" color="success" class="py-2 ma-2">
        <v-layout column align-center justify-center>
          <h1>{{product.customerName}}</h1>
          <h2>{{product.list.size}} {{product.list.name}}</h2>
        </v-layout>

        <v-layout row justify-center>
          <v-card
            color="amber darken-4"
            class="mx-1"
            v-for="option in product.list.option"
          >{{option.name}}</v-card>
        </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import store from "@/store";
import { db } from "@/firebase";
export default {
  computed: {
    drinksList() {
      return store.state.servedDrinks.slice().reverse();
    }
  }
};
</script>

<style scoped>
.lg-btn {
  height: 100px;
}
</style>