import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // = data
    invoices: [],
    todayDate: new Date().toLocaleDateString("en-AU", {
      timeZone: "Australia/Sydney"
    }),
    products: [],
    unservedDrinks: [],
    servedDrinks: [],
    unservedFoods: [],
    servedFoods: []
  },
  getters: {
    foodProducts(state, getters) {
      return state.products.filter(product => product.type == "food");
    },
    drinkProducts(state, getters) {
      return state.products.filter(product => product.type == "drink");
    }
  },
  mutations: {
    // = setting and updating the state
    setInvoices(state, invoice) {
      state.invoices.push(invoice);
    },
    setProducts(state, product) {
      state.products.push(product);
    },
    setUnservedDrinks(state, unservedDrink) {
      state.unservedDrinks.push(unservedDrink);
    },
    setServedDrinks(state, servedDrink) {
      state.servedDrinks.push(servedDrink);
    },
    setUnservedFoods(state, unservedFood) {
      state.unservedFoods.push(unservedFood);
    },
    setServedFoods(state, servedFood) {
      state.servedFoods.push(servedFood);
    },
    servedDrink(state, {
      product,
      index
    }) {
      state.unservedDrinks.splice(index, 1);
      state.servedDrinks.push(product);
    },
    servedFood(state, {
      product,
      index
    }) {
      state.unservedFoods.splice(index, 1);
      state.servedFoods.push(product);
    }
  },
  actions: {
    // = methods
  }
});