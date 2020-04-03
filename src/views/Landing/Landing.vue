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
    return {};
  },
  mounted() {
    if (this.currentUser) {
      this.$router.push("/dashboard");
    }
  }
};
</script>
<style src="./Landing.css" scoped></style>
