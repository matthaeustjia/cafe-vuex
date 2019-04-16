<template>
  <v-app dark>
    <v-content class="mt-2 mb-5">
      <router-view></router-view>
    </v-content>
    <Navigation></Navigation>
  </v-app>
</template>

<script>
import { db } from "@/firebase";
import store from "@/store";
import Navigation from "@/Navigation.vue";

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
    db.ref("invoice")
      .orderByChild("createdAt")
      .startAt(start)
      .endAt(end)
      .on("child_added", snapshot => {
        for (let i = 0; i < snapshot.val().itemList.length; i++) {
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
  },
  components: {
    Navigation
  }
};
</script>

<style scoped>
</style>