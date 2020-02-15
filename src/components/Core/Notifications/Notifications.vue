<template src="./Notifications.html" />
<script>
export default {
  name: "Notifications",
  data: () => ({
    colors: ["info", "success", "warning", "error"],
    top: true,
    bottom: false,
    left: false,
    right: true,
    snackbar: true
  }),
  props: {
    color: String,
    mensaje: String
  },
  methods: {
    snack(...args) {
      this.top = false;
      this.bottom = false;
      this.left = false;
      this.right = false;

      for (let i of args) {
        this[i] = true;
      }

      for (let i of this.colors) {
        if (i !== this.color) {
          this.color = "error";
        }
      }

      this.snackbar = true;
    }
  }
};
</script>
