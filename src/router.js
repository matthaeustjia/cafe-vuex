import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import store from "@/store";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      beforeEnter(to, from, next) {
        if (store.state.user != null) {
          next();
        } else {
          next({
            name: "Login"
          });
        }
      }
    },
    {
      path: "/login",
      name: "Login",

      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Login.vue")
    },
    {
      path: "/management",
      name: "management",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Products.vue"),
      beforeEnter(to, from, next) {
        if (store.state.user != null) {
          next();
        } else {
          next({
            name: "Login"
          });
        }
      }
    },
    {
      path: "/orders",
      name: "orders",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Orders.vue"),
      beforeEnter(to, from, next) {
        if (store.state.user != null) {
          next();
        } else {
          next({
            name: "Login"
          });
        }
      }
    },
    {
      path: "/report",
      name: "report",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Report.vue"),
      beforeEnter(to, from, next) {
        if (store.state.user != null) {
          next();
        } else {
          next({
            name: "Login"
          });
        }
      }
    },
    {
      path: "/register",
      name: "register",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Register.vue"),
      beforeEnter(to, from, next) {
        if (store.state.user != null) {
          next();
        } else {
          next({
            name: "Login"
          });
        }
      }
    }
  ]
});
