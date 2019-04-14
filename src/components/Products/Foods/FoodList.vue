<template>
  <v-layout column wrap>
    <v-layout column wrap justify-center align-content-center>
      <v-card width="400px" v-for="food in foodList">
        <v-layout row justify-space-between>
          <h1>{{food.name}} ${{food.price}}</h1>
          <v-btn @click="deleteFood(food)" small color="red">
            <v-icon>delete_forever</v-icon>
          </v-btn>
        </v-layout>
      </v-card>
    </v-layout>
  </v-layout>
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