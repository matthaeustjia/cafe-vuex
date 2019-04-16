<template>
  <v-layout column>
    <v-tabs class="mb-4" fixed-tabs>
      <v-tab @click="todaysales = true">Today's Sales</v-tab>
      <v-tab @click="todaysales = false">Check Sales</v-tab>
    </v-tabs>

    <v-layout v-if="todaysales" column>
      <TodaySales></TodaySales>
    </v-layout>
    <v-layout v-else column>
      <Sales></Sales>
    </v-layout>
  </v-layout>
</template>

<script>
import TodaySales from "@/components/Reports/TodaySales";
import Sales from "@/components/Reports/Sales";

export default {
  data() {
    return {
      todaysales: true
    };
  },
  components: {
    TodaySales,
    Sales
  }
};
</script>

<style scoped>
</style>