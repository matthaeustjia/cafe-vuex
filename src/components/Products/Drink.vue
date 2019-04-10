<template>
  <v-layout row wrap>
    <v-layout column wrap justify-center content-center>
      <v-layout v-if="!addDrink" column wrap>
        <DrinkList></DrinkList>

        <v-btn @click="addDrink = true" color="success">
          <v-icon>fa fa-plus</v-icon>
        </v-btn>
      </v-layout>
      <v-layout v-else column wrap>
        <AddDrink></AddDrink>
        <v-btn @click="addDrink = false" color="success">Done</v-btn>
      </v-layout>
    </v-layout>
  </v-layout>
</template>

<script>
import store from "@/store";
import { db } from "@/firebase";
import AddDrink from "@/components/Products/Drinks/AddDrink.vue";
import DrinkList from "@/components/Products/Drinks/DrinkList.vue";

export default {
  data() {
    return {
      addDrink: false
    };
  },
  computed: {
    drinkList() {
      return store.getters.drinkProducts;
    }
  },
  components: {
    AddDrink,
    DrinkList
  }
};
</script>

<style scoped>
</style>