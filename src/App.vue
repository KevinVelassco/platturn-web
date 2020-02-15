<template>
  <v-app>
    <div>
      <v-toolbar short dark class="grey darken-3">
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title><v-btn to="/"> @work</v-btn></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn :to="{ name: 'login' }">
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
            <v-list-item-title>{{ usuario.primerNombre }}</v-list-item-title>
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
      <!--<v-alert
        v-model="activo"
        border="left"
        dark
        dismissible
        :type="alert.type">
          {{alert.message}}
      </v-alert>-->
      <Notifications :color="color" :mensaje="mensaje" :snackbar="snackbar" />

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
          path: "/usuarios",
          name: "usuarios"
        }
      ]
    };
  },
  computed: {
    ...mapState("UsuarioLogueado", ["usuario"]),
    ...mapState("Mensajes", ["color", "mensaje", "snackbar"])
  },
  methods: {
    ...mapActions("UsuarioLogueado", ["obtenerDatosUsuarioLogin"])
  },
  created() {
    //this.obtenerDatosUsuarioLogin();
  }
};
</script>
