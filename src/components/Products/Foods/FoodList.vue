<template>
  <v-container fluid>
    <v-layout column justify-center align-content-center>
      <v-card v-for="food in foodList">
        <v-layout class="mx-2" row justify-space-between>
          <h1>{{food.name}} ${{food.price}}</h1>
          <v-btn @click="deleteFood(food)" small color="red">
            <v-icon>delete_forever</v-icon>
          </v-btn>
        </v-layout>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import store from "@/store";
import { db } from "@/firebase";

export default {
  computed: {
    foodList() {
      return store.getters.foodProducts;
    }
  },
  methods: {
    deleteFood(food) {
      db.ref("products")
        .child(food.key)
        .remove();
    }
  }
};
</script>

<style scoped>
</style>