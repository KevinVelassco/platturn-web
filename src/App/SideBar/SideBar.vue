<template>
  <div
    v-if="currentUser && renderSideBar"
    id="mySidebar"
    class="sidebar bg-dark"
    v-on:show-side-bar="showSideBar"
  >
    <a href="#" class="closebtn" v-on:click="closeSideBer">
      ×
    </a>
    <a data-toggle="collapse" href="#collapseExample">Menu</a>
    <div
      class="collapse"
      id="collapseExample"
      v-for="screen in screens"
      :key="screen.name"
    >
      <a href="#">{{ screen.name }}</a>
    </div>
  </div>
</template>
<script>
import userService from "../../services/user.service";

export default {
  props: {
    currentUser: {
      type: Object,
      default: null
    },
    bus: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      renderSideBar: false,
      screens: []
    };
  },
  watch: {
    currentUser: function(val) {
      console.log("val", val);
      if (val) this.loadScreens();
    }
  },
  methods: {
    showSideBar() {
      if (!this.currentUser) {
        const {
          currentRoute: { path }
        } = this.$router;

        if (path == "/") return;
        this.$router.push("/");
        return;
      }
      this.renderSideBar = true;
    },
    closeSideBer() {
      this.renderSideBar = false;
    },
    loadScreens() {
      userService.getUserScreens().then(
        data => {
          this.screens = data;
          console.log("this.screens", data);
        },
        error => {
          console.error(error);
        }
      );
    }
  },
  mounted() {
    this.bus.$on("showsidebar", this.showSideBar);
    if (this.currentUser) this.loadScreens();
  }
};
</script>
<style scoped>
.sidebar {
  height: 100%;
  width: 170px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 60px;
}

.sidebar a {
  padding: 8px 8px 8px 10px;
  text-decoration: none;
  font-size: 1rem;
  color: #818181;
  display: block;
  transition: 0.3s;
}

.sidebar div a {
  padding: 8px 8px 8px 20px;
}

.sidebar a:hover {
  color: #f1f1f1;
}

.sidebar .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
}

/* On smaller screens, where height is less than 450px, change the style of the sidenav (less padding and a smaller font size) */
@media screen and (max-height: 450px) {
  .sidebar {
    padding-top: 15px;
  }
  .sidebar a {
    font-size: 1rem;
  }
}
</style>
