<template>
  <v-app>
    <div>
      <v-toolbar short dark class="grey darken-3">
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title><v-btn to="/"> @work</v-btn></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn @click="cerrarSesion">
          <v-icon>power_settings_new</v-icon>
          Cerrar Sesión
        </v-btn>
      </v-toolbar>

      <v-navigation-drawer v-model="drawer" absolute temporary>
        <v-list-item>
          <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Andres</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense>
          <v-list-item
            v-for="item in menu"
            :key="item.title"
            link
            :to="{ name: item.name }"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </div>
    <v-container fluid>
      <Notifications :color="color" :mensaje="mensaje" :icono="icono" />
      <router-view />
    </v-container>
  </v-app>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Notifications from "./components/Core/Notifications/Notifications";
export default {
  name: "App",
  components: {
    Notifications
  },
  data() {
    return {
      drawer: false,
      menu: [
        {
          icon: "dashboard",
          title: "Usuarios",
          name: "usuarios"
        }
      ]
    };
  },
  computed: {
    ...mapState("messages", ["color", "mensaje", "icono"])
  },
  methods: {
    ...mapActions("userLogin", ["cerrarSesion", "leerToken"])
  },
  created() {
    this.leerToken();
  }
};
</script>
