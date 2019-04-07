import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/management",
      name: "management",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Products.vue")
    },
    {
      path: "/orders",
      name: "orders",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Orders.vue")
    },
    {
      path: "/report",
      name: "report",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Report.vue")
    },
    {
      path: "/register",
      name: "register",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Register.vue")
    }
  ]
});
