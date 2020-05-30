import Vue from "vue";
import App from "./App/App.vue";
import { router } from "./router";
import store from "./store";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import {
  faHome,
  faUser,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt,
  faEdit,
  faUserCircle,
  faChalkboardTeacher,
  faCheck,
  faTimes,
  faEye,
  faTrashAlt,
  faPlus,
  faAngleDown
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faHome,
  faUser,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt,
  faEdit,
  faUserCircle,
  faChalkboardTeacher,
  faCheck,
  faTimes,
  faEye,
  faTrashAlt,
  faPlus,
  faAngleDown
);

Vue.config.productionTip = false;

Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.component("v-select", vSelect);

new Vue({
  router,
  store,
  components: {},
  render: h => h(App)
}).$mount("#app");
