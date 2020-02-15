import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "@babel/polyfill";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(VueAxios, axios);

//Se agrega la URL base de nuestra API
axios.defaults.baseURL = process.env.VUE_APP_URL;
//axios.defaults.baseURL = 'http://localhost:3000/api'
//axios.defaults.baseURL = 'http://192.168.101.8:3000/api'

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
