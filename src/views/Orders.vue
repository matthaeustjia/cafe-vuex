<template>
  <v-layout column>
    <v-tabs class="mb-4" fixed-tabs>
      <v-tab @click="showDrink = true">
        <v-icon>fa fa-coffee</v-icon>
      </v-tab>
      <v-tab @click="showDrink = false">
        <v-icon>fas fa-utensils</v-icon>
      </v-tab>
    </v-tabs>
    <v-layout v-if="showDrink" column>
      <h2>Unserved Drink</h2>
      <UnservedDrink></UnservedDrink>
      <h2>Served Drink</h2>
      <ServedDrink></ServedDrink>
    </v-layout>
    <v-layout v-else column>
      <h2>Unserved Food</h2>
      <UnservedFood></UnservedFood>
      <h2>Served Food</h2>
      <ServedFood></ServedFood>
    </v-layout>
  </v-layout>
</template>

<script>
import ServedDrink from "@/components/Orders/ServedDrink.vue";
import UnservedDrink from "@/components/Orders/UnservedDrink.vue";
import ServedFood from "@/components/Orders/ServedFood.vue";
import UnservedFood from "@/components/Orders/UnservedFood.vue";
import { db } from "@/firebase";
export default {
  data() {
    return {
      showDrink: true
    };
  },
  components: {
    ServedDrink,
    UnservedDrink,
    ServedFood,
    UnservedFood
  }
};
</script>

<style scoped>
</style>