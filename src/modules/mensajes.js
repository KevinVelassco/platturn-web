export default {
  namespaced: true,
  state: {
    color: "",
    mensaje: "",
    snackbar: false
  },
  mutations: {
    addmessage(state, type, message) {
      state.color = type;
      state.mensaje = message;
      state.state = true;
    }
  }
};
