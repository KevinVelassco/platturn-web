<template>
  <div id="app">
    <NavBar
      v-if="useNavBar"
      v-bind:currentUser="currentUser"
      v-bind:bus="bus"
    />

    <SideBar v-bind:currentUser="currentUser" v-bind:bus="bus" ref="sideBar" />

    <div class="message">
      <Message></Message>
    </div>

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
import Message from "./Message/Message.vue";

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
    NavBar,
    Message
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
/*Style global*/
.row {
  margin-right: 0px !important;
  margin-left: 0px !important;
}
.form-control:focus {
  border-color: #439cfb !important;
  box-shadow: 0 0 0 0.1rem rgba(0, 123, 255, 0.25) !important;
}
.page-link:focus {
  box-shadow: 0 0 0 0.1rem rgba(0, 123, 255, 0.25) !important;
}
span .validation:not(:empty) {
  color: #c30000bd;
  border: 1px solid #f4000005;
  border-radius: 3px;
  padding-left: 8px;
  padding-right: 8px;
  padding-top: 1px;
  padding-bottom: 1px;
  font-size: 12px;
  font-weight: 700;
  background-color: #c3000012;
}
</style>
<style scoped>
/* Style local */
.message {
  position: relative;
  top: 10px;
}
</style>
