export default {
  namespaced: true,
  state: {
    color: "",
    mensaje: "",
    icono: "",
    snackbar: false
  },
  mutations: {
    addmessageInfo(state, message) {
      state.color = "info";
      state.icono = "info";
      state.mensaje = message;
      state.snackbar = true;
    },

    addmessageOk(state, message) {
      state.color = "success";
      state.icono = "check_circle";
      state.mensaje = message;
      state.snackbar = true;
    },

    addmessageWarning(state, message) {
      state.color = "warning";
      state.icono = "warning";
      state.mensaje = message;
      state.snackbar = true;
    },

    addmessageError(state, message) {
      state.color = "error";
      state.icono = "mdi-bell-plus";
      state.mensaje = message;
      state.snackbar = true;
    },
    closemessage(state) {
      state.snackbar = false;
    }
  }
};
