<template>
  <v-layout row wrap>
    <CountRegister></CountRegister>
  </v-layout>
</template>

<script>
import CountRegister from "@/components/Register/CountRegister.vue";
export default {
  components: {
    CountRegister
  }
};
</script>
