<template src="./Landing.html" />
<script>
export default {
  name: "Landing",
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  data() {
    return {
      plans: [
        {
          code: 1,
          description: "GRATIS",
          priceCode: "",
          priceValue: "Gratis",
          paymentType: "",
          color: "red",
          features: ["Consultar Clientes", "Liquidar Nomina"]
        },
        {
          code: 2,
          description: "ESTANDAR",
          priceCode: "CO",
          priceValue: "$6.000",
          paymentType: "/ mes",
          color: "#ffa000",
          features: [
            "Consultar Clientes",
            "Crear Clientes",
            "Editar Clientes",
            "Liquidar Nomina"
          ]
        },
        {
          code: 3,
          description: "PREMIUM",
          priceCode: "CO",
          priceValue: "$12.000",
          paymentType: "/ mes",
          color: "#0b00ff",
          features: [
            "Consultar Clientes",
            "Crear Clientes",
            "Editar Clientes",
            "Eliminar Clientes",
            "Liquidar Nomina"
          ]
        }
      ]
    };
  },
  mounted() {
    if (this.currentUser) {
      this.$router.push("/dashboard");
    }
  }
};
</script>
<style src="./Landing.css"></style>
