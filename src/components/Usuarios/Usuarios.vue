<template src="./Usuarios.html" />
<script>
import { mapMutations } from "vuex";
export default {
  methods: {
    ...mapMutations("messages", [
      "addmessageOk",
      "addmessageWarning",
      "addmessageInfo",
      "addmessageError"
    ]),
    ejecutarMensaje() {
      this.addmessageError("Mensaje funcionando");
    }
  }
};
</script>
<style src="./Usuarios.css" />
