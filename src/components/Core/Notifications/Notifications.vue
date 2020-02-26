<template src="./Notifications.html" />
<script>
import { mapMutations } from "vuex";
export default {
  name: "Notifications",
  data: () => ({
    top: true,
    bottom: false,
    left: false,
    right: true
  }),
  props: {
    color: String,
    mensaje: String,
    icono: String
  },
  computed: {
    snackbar: {
      get: function() {
        return this.$store.state.messages.snackbar;
      },
      set: function(newValue) {
        this.$store.state.messages.snackbar = newValue;
      }
    }
  },
  methods: {
    ...mapMutations("messages", ["closemessage"])
  }
};
</script>
