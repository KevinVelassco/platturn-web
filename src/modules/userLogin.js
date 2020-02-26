import router from "@/router/index";
import axios from "axios";
export default {
  namespaced: true,
  state: {
    token: "",
    usuario: ""
  },
  mutations: {
    obtenerUsuarioLogin(state, dataUser) {
      if (dataUser === "") {
        state.usuario = "";
      } else {
        state.token = dataUser.accessToken;
        state.usuario = dataUser;
        router.push({ name: "main" });
      }
    }
  },
  actions: {
    guardarUsuario({ commit }, dataUser) {
      localStorage.setItem("currentUser", JSON.stringify(dataUser));
      commit("obtenerUsuarioLogin", dataUser);
    },

    async leerToken({ commit, dispatch }) {
      const currentUser = localStorage.getItem("currentUser");

      if (currentUser) {
        const token = JSON.parse(currentUser).accessToken;

        try {
          const response = await axios.get("/api/users/validate-token", {
            headers: { Authorization: `Bearer ${token}` }
          });

          if (response !== null && response.status === 200) {
            commit("obtenerUsuarioLogin", currentUser);
          } else {
            dispatch("cerrarSesion");
          }
        } catch (e) {
          dispatch("cerrarSesion");
        }
      } else {
        dispatch("cerrarSesion");
      }
    },

    cerrarSesion({ commit }) {
      commit("obtenerUsuarioLogin", "");
      localStorage.removeItem("currentUser");
      if (router.currentRoute.name !== "login") {
        router.push({ name: "login" });
      }
    }
  }
};
