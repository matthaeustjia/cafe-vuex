<template>
  <v-container fluid>
    <v-layout column justify-center align-content-center>
      <v-card v-for="drink in drinkList">
        <v-layout class="mx-2" row justify-space-between>
          <h1>{{drink.name}}</h1>
          <v-btn @click="deleteDrink(drink)" small color="red">
            <v-icon>delete_forever</v-icon>
          </v-btn>
        </v-layout>
        <v-card v-for="option in drink" v-if="option.size">
          <v-layout row>
            <h2 class="ml-4">{{option.size}}</h2>
            <h2 class="ml-2">${{option.price}}</h2>
          </v-layout>
        </v-card>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import store from "@/store";
import { db } from "@/firebase";

export default {
  computed: {
    drinkList() {
      return store.getters.drinkProducts;
    }
  },
  methods: {
    deleteDrink(drink) {
      db.ref("products")
        .child(drink.key)
        .remove();
    }
  }
};
</script>

<style scoped>
</style>