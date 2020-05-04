<template>
  <div class="container-fluid img-reset-password">
    <div
      class="row align-items-center justify-content-center content pt-2 pb-2"
    >
      <div
        class="col-12 col-sm-7 col-md-6 col-lg-5 col-xl-4 reset-password shadow-sm"
      >
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
          Cambio de contraseña
        </div>
        <validation-observer v-slot="{ handleSubmit }">
          <form name="form" @submit.prevent="handleSubmit(onSubmit)">
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
                  placeholder="Clave"
                />
                <span class="validation" v-if="errors[0]">{{ errors[0] }}</span>
              </validation-provider>
            </div>
            <div class="form-group">
              <validation-provider rules="required" v-slot="{ errors }">
                <input
                  v-model="user.repeatedPassword"
                  minlength="5"
                  maxlength="100"
                  type="password"
                  class="form-control"
                  name="repeatedPassword"
                  id="repeatedPassword"
                  placeholder="Confirmar clave"
                />
                <span class="validation" v-if="errors[0]">{{ errors[0] }}</span>
              </validation-provider>
            </div>
            <div class="form-group">
              <button
                class="btn btn-secondary btn-block"
                :disabled="loading || submitted"
              >
                <span
                  v-show="loading"
                  class="spinner-border spinner-border-sm"
                ></span>
                <span>Cambiar</span>
              </button>
            </div>
          </form>
        </validation-observer>
        <div
          v-if="message"
          class="alert card"
          :class="successful ? 'alert-success' : 'alert-danger'"
        >
          {{ message }}
        </div>
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
  name: "ResetPassword",
  data() {
    return {
      user: new User({}),
      loading: false,
      successful: false,
      submitted: false,
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
    },
    code() {
      return this.$route.query.code;
    }
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
    if (!this.code) {
      this.$router.push("/");
    }
  },
  methods: {
    onSubmit() {
      this.loading = true;

      const {
        user: { password, repeatedPassword }
      } = this;

      if (password !== repeatedPassword) {
        this.loading = false;
        this.successful = false;
        this.message = "las claves no coinciden.";
        return;
      }

      if (this.user.password && this.user.repeatedPassword) {
        this.user.resetPasswordCode = this.code;

        this.$store.dispatch("auth/resetPassword", this.user).then(
          data => {
            this.loading = false;
            this.successful = true;
            this.message = data.message;
            this.submitted = true;
          },
          error => {
            this.loading = false;
            this.successful = false;
            this.submitted = true;

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
.img-reset-password {
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

.reset-password {
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
</style>
