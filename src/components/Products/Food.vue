<template>
  <div>
    <v-layout column wrap>
      <v-card v-for="food in foodList">{{food.name}}{{food.price}}</v-card>
    </v-layout>
  </div>
</template>

<script>
import store from "@/store";
export default {
  computed: {
    foodList() {
      return store.getters.foodProducts;
    }
  }
};
</script>

<style scoped>
</style>