<template>
  <v-layout row wrap>
    <v-layout column wrap justify-center content-center>
      <v-layout v-if="!addFood" column wrap>
        <FoodList></FoodList>

        <v-btn @click="addFood = true" color="success">
          <v-icon>fa fa-plus</v-icon>
        </v-btn>
      </v-layout>
      <v-layout v-else column wrap>
        <AddFood></AddFood>
        <v-btn @click="addFood = false" color="success">Done</v-btn>
      </v-layout>
    </v-layout>
  </v-layout>
</template>

<script>
import store from "@/store";
import { db } from "@/firebase";
import AddFood from "@/components/Products/Foods/AddFood.vue";
import FoodList from "@/components/Products/Foods/FoodList.vue";

export default {
  data() {
    return {
      addFood: false
    };
  },
  computed: {
    FoodList() {
      return store.getters.foodProducts;
    }
  },
  components: {
    AddFood,
    FoodList
  }
};
</script>

<style scoped>
</style>