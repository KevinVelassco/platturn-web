<template>
  <div id="app">
    <NavBar v-bind:currentUser="currentUser" v-bind:bus="bus"></NavBar>

    <SideBar
      v-bind:currentUser="currentUser"
      v-bind:bus="bus"
      ref="sideBar"
    ></SideBar>

    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import SideBar from "./SideBar/SideBar.vue";
import NavBar from "./NavBar/NavBar.vue";

export default {
  name: "App",
  data() {
    return {
      bus: new Vue()
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {},
  components: {
    SideBar,
    NavBar
  }
};
</script>
