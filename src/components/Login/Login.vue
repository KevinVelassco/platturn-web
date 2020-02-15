<template src="./Login.html" />
<script>
export default {
  name: "Login",
  data: () => ({
    valid: true,
    email: "",
    password: "",
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
    async validate() {
      try {
        console.log(process.env.VUE_APP_URL);
        const response = await this.axios.post("/api/users/login", {
          email: this.email,
          password: this.password
        });
        console.log(response);
        //this.notas.push(response.data);
        //this.addmessage("success","Registro Creado Exitosamente.");
        //store.commit('addmessage', 'sucess', "funcional")
      } catch (e) {
        //console.log(Object.keys(e))
        this.mensaje = e.response.data.message;
      }
    }
  }
};
</script>
<style src="./Login.css" />
