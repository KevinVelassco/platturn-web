<template>
  <div id="app">
    <NavBar
      v-if="useNavBar"
      v-bind:currentUser="currentUser"
      v-bind:bus="bus"
    />

    <SideBar v-bind:currentUser="currentUser" v-bind:bus="bus" ref="sideBar" />

    <div class="container" v-if="currentUser">
      <router-view />
    </div>

    <router-view v-if="!currentUser" />
  </div>
</template>

<script>
import Vue from "vue";
import SideBar from "./SideBar/SideBar.vue";
import NavBar from "./NavBar/NavBar.vue";
import userService from "../services/user.service";

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
    },
    useNavBar() {
      const currentPathRoute = this.$route.path === "/" ? true : false;
      return this.$store.state.auth.user ? true : currentPathRoute;
    }
  },
  methods: {},
  components: {
    SideBar,
    NavBar
  },
  mounted() {
    if (this.currentUser) {
      userService.validateToken().catch(error => {
        console.error(error);
        this.$router.push("/login");
      });
    }
  }
};
</script>
<style>
.row {
  margin-right: 0px !important;
  margin-left: 0px !important;
}
.form-control:focus {
  border-color: #439cfb !important;
  box-shadow: 0 0 0 0.1rem rgba(0, 123, 255, 0.25) !important;
}
</style>
