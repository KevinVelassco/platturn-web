import Vue from "vue";
import VueRouter from "vue-router";
import Main from "@/views/Main.vue";
import Login from "@/views/Login";
import Usuarios from "@/views/Usuarios";
import store from "@/store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
    meta: { requiereAuth: true }
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/usuarios",
    name: "usuarios",
    component: Usuarios,
    meta: { requiereAuth: true }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const rutaProtegida = to.matched.some(record => record.meta.requiereAuth);
  if (rutaProtegida && store.state.userLogin.token === "") {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
