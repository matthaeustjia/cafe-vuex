<template>
  <v-stepper v-model="stepper">
    <v-stepper-header>
      <v-stepper-step step="1">Food</v-stepper-step>
    </v-stepper-header>
    <v-stepper-items>
      <v-stepper-content step="1">
        <v-form @submit.prevent="submitProduct">
          <v-text-field label="Food Name" v-model="productname"></v-text-field>
          <v-text-field type="number" label="Food Price" v-model="price"></v-text-field>
          <v-btn :disabled="productname =='' || price ==''" color="primary" type="submit">Submit</v-btn>
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
      key: ""
    };
  },
  methods: {
    submitProduct() {
      const nameIsValid = !!this.productname;
      if (nameIsValid) {
        db.ref("products").push({
          name: this.productname,
          type: "food",
          price: this.price
        });
        this.$toasted.success(
          this.productname + " is added. It's $" + this.price,
          {
            theme: "toasted-primary",
            fullWidth: true,
            position: "bottom-right",
            duration: 5000
          }
        );

        this.price = "";
        this.productname = "";
      } else {
        this.$toasted.error("Name cannot be empty", {
          theme: "toasted-primary",
          fullWidth: true,
          position: "bottom-right",
          duration: 5000
        });
      }
    }
  }
};
</script>

<style scoped>
</style>