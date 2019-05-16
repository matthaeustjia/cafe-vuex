<template>
  <v-layout column>
    <v-tabs class="mb-4" fixed-tabs>
      <v-tab @click="countRegister = true">Count Register</v-tab>
      <v-tab @click="countRegister = false">Register History</v-tab>
    </v-tabs>
    <v-layout row wrap>
      <CountRegister v-if="countRegister"></CountRegister>
      <RegisterHistory v-else></RegisterHistory>
    </v-layout>
  </v-layout>
</template>

<script>
import CountRegister from "@/components/Register/CountRegister.vue";
import RegisterHistory from "@/components/Register/RegisterHistory.vue";
export default {
  data() {
    return {
      countRegister: true
    };
  },
  components: {
    CountRegister,
    RegisterHistory
  }
};
</script>
