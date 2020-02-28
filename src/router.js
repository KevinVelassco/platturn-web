import Vue from "vue";
import Router from "vue-router";

import Landing from "./views/Landing.vue";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import ForgotPassword from "./views/ForgotPassword.vue";
import ResetPassword from "./views/ResetPassword.vue";

Vue.use(Router);

export const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Landing
    },
    {
      path: "/home",
      component: Home
    },
    {
      path: "/login",
      component: Login
    },
    {
      path: "/forgot-password",
      component: ForgotPassword
    },
    {
      path: "/reset-password",
      component: ResetPassword
    },
    {
      path: "/register",
      component: Register
    },
    {
      path: "/profile",
      name: "profile",
      // lazy-loaded
      component: () => import("./views/Profile.vue")
    },
    {
      path: "/admin",
      name: "admin",
      // lazy-loaded
      component: () => import("./views/BoardAdmin.vue")
    },
    {
      path: "/mod",
      name: "moderator",
      // lazy-loaded
      component: () => import("./views/BoardModerator.vue")
    },
    {
      path: "/user",
      name: "user",
      // lazy-loaded
      component: () => import("./views/BoardUser.vue")
    }
  ]
});

router.beforeEach((to, from, next) => {
  console.log("---------");
  console.log("to", to);
  console.log("---------");

  const publicPages = [
    "/",
    "/login",
    "/forgot-password",
    "/reset-password",
    "/register",
    "/home"
  ];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("user");

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next("/login");
  } else {
    next();
  }
});
