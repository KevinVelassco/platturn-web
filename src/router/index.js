import Vue from "vue";
import VueRouter from "vue-router";
import Main from "@/views/Main.vue";
import Login from "@/views/Login";
import Usuarios from "@/views/Usuarios";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "main",
    component: Main
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/usuarios",
    name: "usuarios",
    component: Usuarios
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
