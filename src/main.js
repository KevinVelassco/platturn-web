import Vue from "vue";
import App from "./App.vue";
import { router } from "./router";
import store from "./store";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { ValidationProvider, extend } from "vee-validate";
import { required } from "vee-validate/dist/rules";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faHome,
  faUser,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";

library.add(faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt);

Vue.config.productionTip = false;

extend("required", {
  ...required,
  message: "This field is required"
});

// Vue.use(VeeValidate);
Vue.component("font-awesome-icon", FontAwesomeIcon);

new Vue({
  router,
  store,
  components: {
    ValidationProvider
  },
  render: h => h(App)
}).$mount("#app");
