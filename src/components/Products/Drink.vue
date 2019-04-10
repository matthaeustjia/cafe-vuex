<template>
  <div>
    <v-layout column wrap>
      <v-card width="400px" v-for="drink in drinkList">
        <v-layout row justify-space-between>
          <h1>{{drink.name}}{{drink.price}}</h1>
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
      <v-btn color="success">
        <v-icon>fa fa-plus</v-icon>
      </v-btn>
    </v-layout>
  </div>
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