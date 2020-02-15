import axios from "axios";

export default {
  namespaced: true,
  state: {
    usuario: []
  },
  mutations: {
    datosUsuarioLogin(state, datos) {
      state.usuario = datos;
    }
  },
  actions: {
    async obtenerDatosUsuarioLogin({ commit }) {
      const id = "5e33901a2503133da8a3e8ca";
      const response = await axios.get(`/usuario/${id}`);
      commit("datosUsuarioLogin", response.data);
    }
  }
};
