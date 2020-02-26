<template src="./Login.html" />
<script>
import { mapActions } from "vuex";
export default {
  name: "Login",
  data: () => ({
    valid: true,
    user: { email: "kevinvelassco@gmail.com", password: "123456" },
    emailRules: [
      v => !!v || "Campo obligatorio",
      v => /.+@.+/.test(v) || "El correo es invalido"
    ],
    passwordRules: [
      v => !!v || "Campo obligatorio",
      v => v.length <= 10 || "Name must be less than 10 characters"
    ],
    mensaje: ""
  }),
  methods: {
    /*validate () {
                if (this.$refs.form.valid()) {
                    this.snackbar = true                   
                }
            }*/
    ...mapActions("userLogin", ["guardarUsuario"]),
    async login() {
      try {
        const response = await this.axios.post("/api/users/login", this.user);
        this.guardarUsuario(response.data);
      } catch (e) {
        console.log("entro al catch");
        this.mensaje = "e.response.data.message";
      }
    }
  }
};
</script>
<style src="./Login.css" />
