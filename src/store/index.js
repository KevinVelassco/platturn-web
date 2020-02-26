import Vue from "vue";
import Vuex from "vuex";
import userLogin from "@/modules/userLogin";
import messages from "@/modules/messages";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    userLogin,
    messages
  }
});
