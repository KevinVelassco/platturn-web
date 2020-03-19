<template>
  <div class="container-fluid img-login">
    <div
      class="row align-items-center justify-content-center content pt-2 pb-2"
    >
      <div class="col-12 col-sm-7 col-md-6 col-lg-5 col-xl-4 login shadow-sm">
        <div
          class="col-12 panel-title shadow-lg d-flex align-content-center flex-wrap"
        >
          <div class="col-12 text-center">
            <img
              class="img-fluid"
              src="@/assets/logo1.png"
              height="80px"
              width="130px"
              alt="Platturn"
            />
          </div>
        </div>
        <div class="col-12 title">
          Iniciar Sesión
        </div>
        <validation-observer v-slot="{ handleSubmit }">
          <form name="form" @submit.prevent="handleSubmit(onSubmit)">
            <div class="form-group">
              <validation-provider rules="required|email" v-slot="{ errors }">
                <input
                  v-model="user.email"
                  type="email"
                  class="form-control"
                  name="email"
                  id="email"
                  placeholder="Email"
                />
                <span class="validation" v-if="errors[0]">{{ errors[0] }}</span>
              </validation-provider>
            </div>
            <div class="form-group">
              <validation-provider rules="required" v-slot="{ errors }">
                <input
                  v-model="user.password"
                  minlength="5"
                  maxlength="100"
                  type="password"
                  class="form-control"
                  name="password"
                  id="password"
                  placeholder="Contraseña"
                />
                <span class="validation" v-if="errors[0]">{{ errors[0] }}</span>
              </validation-provider>
            </div>
            <div class="form-group mb-4">
              <div class="row">
                <div class="col-4 text-left pl-0 pr-0">
                  <router-link
                    to="/forgot-password"
                    class="link"
                    id="forgot-password"
                  >
                    ¿Olvidaste tu clave?
                  </router-link>
                </div>
                <div class="col-8 text-right pr-0 pl-0">
                  <router-link to="/register" class="link" id="register">
                    ¿No tienes una cuenta? Regístrate
                  </router-link>
                </div>
              </div>
            </div>
            <div class="form-group text-center">
              <button class="btn btn-secondary" :disabled="loading">
                <span
                  v-show="loading"
                  class="spinner-border spinner-border-sm"
                ></span>
                <span><b>Iniciar Sesión</b></span>
              </button>
            </div>
            <div class="form-group">
              <div v-if="message" class="alert alert-danger" role="alert">
                {{ message }}
              </div>
            </div>
          </form>
        </validation-observer>
      </div>
    </div>
  </div>
</template>

<script>
import User from "../models/user";
import { ValidationProvider, ValidationObserver, extend } from "vee-validate";
import { required, email } from "vee-validate/dist/rules";
import { getFromObjectPathParsed } from "../utils/functions";

// No message specified.
extend("email", {
  ...email,
  message: "El email no es valido."
});

// Override the default message.
extend("required", {
  ...required,
  message: "Campo requerido"
});

export default {
  name: "Login",
  data() {
    return {
      user: new User({}),
      loading: false,
      message: ""
    };
  },
  components: {
    ValidationProvider,
    ValidationObserver
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    onSubmit() {
      this.loading = true;
      if (this.user.email && this.user.password) {
        this.$store.dispatch("auth/login", this.user).then(
          () => {
            this.$router.push("/dashboard");
          },
          error => {
            this.loading = false;

            this.message = getFromObjectPathParsed(
              error,
              "response.data.message"
            );

            this.message =
              this.message ||
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
          }
        );
      }
    }
  }
};
</script>

<style scoped>
.img-login {
  min-height: 100vh;
  background: linear-gradient(
      to bottom,
      rgba(92, 77, 66, 0.8) 0,
      rgba(92, 77, 66, 0.8) 100%
    ),
    url("../assets/bg-masthead.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: scroll;
  background-size: cover;
}

.content {
  min-height: 100vh;
}

.login {
  background-color: #ffffff;
  border-radius: 3px;
  margin-top: 20px;
}

.panel-title {
  margin-top: -20px;
  height: 120px;
  background-color: #ff8c12f7;
  border-radius: 3px;
}

.title {
  color: #000000;
  font-size: 22px;
  font-weight: 700;
  padding-top: 10px;
  padding-bottom: 20px;
  text-align: center;
}

span .validation {
  color: #c30000bd;
  border: 1px solid #f4000005;
  border-radius: 5px;
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 2px;
  padding-bottom: 2px;
  font-size: 12px;
  font-weight: 700;
  background-color: #c3000012;
}

.link {
  text-decoration: none;
  color: #9a9a9a;
  font-weight: 700;
  font-size: 11px;
}
.link:hover {
  color: #5e6366;
}
</style>
