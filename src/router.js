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
    // general routes
    {
      path: "/",
      name: "landing",
      component: Landing
    },
    {
      path: "/home",
      name: "home",
      component: Home
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/forgot-password",
      name: "forgotPassword",
      component: ForgotPassword
    },
    {
      path: "/reset-password",
      name: "resetPassword",
      component: ResetPassword
    },
    {
      path: "/register",
      name: "register",
      component: Register
    },
    {
      path: "/profile",
      name: "profile",
      // lazy-loaded
      component: () => import("./views/Profile.vue")
    },
    {
      path: "/change-email",
      name: "changeEmail",
      // lazy-loaded
      component: () => import("./views/user/ChangeEmail.vue")
    },
    {
      path: "/change-password",
      name: "changePassword",
      // lazy-loaded
      component: () => import("./views/user/ChangePassword.vue")
    },
    {
      path: "/update-user-info",
      name: "updateUserInfo",
      component: () => import("./views/user/UpdateUserInfo.vue")
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
    },
    {
      name: "company",
      path: "/companies",
      component: () => import("./views/companies/HandleCompanies.vue")
    }
  ]
});

router.beforeEach((to, from, next) => {
  // console.log("---------");
  // console.log("to", to);
  // console.log("---------");

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
