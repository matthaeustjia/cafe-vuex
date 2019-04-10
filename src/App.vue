
<template>
  <v-app dark>
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-bottom-nav dark fixed :value="true">
      <v-btn to="/" flat color="light-blue">
        <span>Home</span>
        <v-icon>home</v-icon>
      </v-btn>

      <v-btn to="/orders" flat color="light-blue">
        <span>Order</span>
        <v-icon>shopping_basket</v-icon>
      </v-btn>

      <v-btn to="/management" flat color="light-blue">
        <span>Management</span>
        <v-icon>fastfood</v-icon>
      </v-btn>

      <v-btn to="/report" flat color="light-blue">
        <span>Report</span>
        <v-icon>description</v-icon>
      </v-btn>

      <v-btn to="/register" flat color="light-blue">
        <span>Register</span>
        <v-icon>money</v-icon>
      </v-btn>
    </v-bottom-nav>
  </v-app>
</template>

<script>
import { db } from "@/firebase";
import store from "@/store";

export default {
  data() {
    return {};
  },
  computed: {
    todayDate() {
      return store.state.todayDate;
    }
  },
  created() {
    var start = new Date().setHours(0, 0, 0, 0);
    var end = new Date().setHours(23, 59, 59, 999);
    console.log(start);
    console.log(end);
    db.ref("invoice")
      .orderByChild("createdAt")
      .startAt(start)
      .endAt(end)
      .on("child_added", snapshot => {
        for (let i = 0; i < snapshot.val().itemList.length; i++) {
          console.log(snapshot.val());
          if (snapshot.val().itemList[i].type == "drink") {
            if (!snapshot.val().itemList[i].served)
              store.commit("setUnservedDrinks", {
                list: snapshot.val().itemList[i],
                index: i,
                key: snapshot.key,
                customerName: snapshot.val().customerName
              });
            else
              store.commit("setServedDrinks", {
                list: snapshot.val().itemList[i],
                index: i,
                key: snapshot.key,
                customerName: snapshot.val().customerName
              });
          } else if (snapshot.val().itemList[i].type == "food") {
            if (!snapshot.val().itemList[i].served)
              store.commit("setUnservedFoods", {
                list: snapshot.val().itemList[i],
                index: i,
                key: snapshot.key,
                customerName: snapshot.val().customerName
              });
            else
              store.commit("setServedFoods", {
                list: snapshot.val().itemList[i],
                index: i,
                key: snapshot.key,
                customerName: snapshot.val().customerName
              });
          }
        }
        store.commit("setInvoices", { key: snapshot.key, ...snapshot.val() });
      });
    db.ref("products").on("child_added", snapshot => {
      store.commit("setProducts", { ...snapshot.val(), key: snapshot.key });
    });

    db.ref("products").on("child_removed", snapshot => {
      const deletedProduct = store.state.products.find(
        product => product.key == snapshot.key
      );
      const index = store.state.products.indexOf(deletedProduct);
      store.state.products.splice(index, 1);
    });
  }
};
</script>

<style scoped>
</style>