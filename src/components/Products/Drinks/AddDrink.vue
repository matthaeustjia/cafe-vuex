<template>
  <v-stepper v-model="stepper">
    <v-stepper-header>
      <v-stepper-step step="1" :complete="stepper > 1">Select campaign settings</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="2">Create an ad group</v-stepper-step>

      <v-divider></v-divider>
    </v-stepper-header>
    <v-stepper-items>
      <v-stepper-content step="1">
        <v-form @submit.prevent="submitProduct">
          <v-text-field label="Drink Name" v-model="productname"></v-text-field>
          <v-btn color="primary" type="submit">Continue</v-btn>
        </v-form>
      </v-stepper-content>
      <v-stepper-content step="2">
        <h1>{{productname}}</h1>
        <v-form @submit.prevent="submitProductSize">
          <v-select :items="sizes" v-model="size" label="Size"></v-select>
          <v-text-field type="number" label="Price" v-model="price"></v-text-field>
          <v-btn type="Submit" color="primary">Add size</v-btn>
        </v-form>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>


<script>
import { db } from "@/firebase";
export default {
  data() {
    return {
      stepper: 1,
      price: "",
      productname: "",
      key: "",
      size: "S",
      sizes: ["S", "M", "L"]
    };
  },
  methods: {
    submitProduct() {
      const nameIsValid = !!this.productname;
      if (nameIsValid) {
        this.key = db.ref("products").push({
          name: this.productname,
          type: "drink"
        }).key;
        this.stepper += 1;
      } else {
        this.$toasted.error("Name cannot be empty", {
          theme: "toasted-primary",
          fullWidth: true,
          position: "bottom-right",
          duration: 5000
        });
      }
    },
    submitProductSize() {
      db.ref("products")
        .child(this.key)
        .push({
          size: this.size,
          price: this.price
        });
      this.price = parseFloat(this.price) + 0.5;
      if (this.size == "S") this.size = "M";
      else if (this.size == "M") this.size = "L";
      else {
        this.price = "";
        this.size = "";
      }
    }
  }
};
</script>

<style scoped>
</style>