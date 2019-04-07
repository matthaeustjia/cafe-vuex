<template>
  <v-layout column>
    <v-tabs class="mb-4" fixed-tabs>
      <v-tab @click="drinkSelection = true">
        <v-icon>fa fa-coffee</v-icon>
      </v-tab>
      <v-tab @click="drinkSelection = false">
        <v-icon>fas fa-utensils</v-icon>
      </v-tab>
    </v-tabs>
    <v-layout row wrap justify-space-around>
      <Drink v-if="drinkSelection"></Drink>
      <Food v-else></Food>
    </v-layout>
  </v-layout>
</template>

<script>
import Food from "@/components/Products/Food.vue";
import Drink from "@/components/Products/Drink.vue";
export default {
  data() {
    return {
      drinkSelection: true
    };
  },
  components: {
    Food,
    Drink
  }
};
</script>

<style scoped>
</style>