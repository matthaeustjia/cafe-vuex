<template>
  <v-layout column>
    <v-tabs class="mb-4" fixed-tabs>
      <v-tab @click="currentSelection = 'todaysales'">Today's Sales</v-tab>
      <v-tab @click="currentSelection = 'sales'">Check Sales</v-tab>
      <v-tab @click="currentSelection = 'productsales'">Product Sales</v-tab>
    </v-tabs>

    <v-layout v-if="currentSelection == 'todaysales'" column>
      <TodaySales></TodaySales>
    </v-layout>
    <v-layout v-else-if="currentSelection == 'sales'" column>
      <Sales></Sales>
    </v-layout>
    <v-layout v-else-if="currentSelection == 'productsales'" column>
      <ProductSales></ProductSales>
    </v-layout>
  </v-layout>
</template>

<script>
import TodaySales from "@/components/Reports/TodaySales";
import Sales from "@/components/Reports/Sales";
import ProductSales from "@/components/Reports/ProductSales";

export default {
  data() {
    return {
      currentSelection: "todaysales"
    };
  },
  components: {
    TodaySales,
    Sales,
    ProductSales
  }
};
</script>

<style scoped>
</style>