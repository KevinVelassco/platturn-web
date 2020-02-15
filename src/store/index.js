import Vue from "vue";
import Vuex from "vuex";
import UsuarioLogueado from "@/modules/usuario";
import Mensajes from "@/modules/mensajes";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    UsuarioLogueado,
    Mensajes
  }
});
