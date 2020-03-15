<template>
  <div
    class="row align-items-center justify-content-center img-forgot-password"
  >
    <div class="forgot-password shadow-sm">
      <div class="row justify-content-center">
        <div
          class="panel-title shadow-lg col-11 text-center d-flex align-content-center flex-wrap"
        >
          <div class="col-12">
            <img
              src="@/assets/logo1.png"
              height="90px"
              width="160px"
              alt="Platturn"
            />
          </div>
        </div>

        <div class="col-11 text-center pl-0 pr-0">
          <div class="col-12 send-email">
            Necesitamos comprobar tu identidad
          </div>
          <validation-observer v-slot="{ handleSubmit }">
            <form name="form" @submit.prevent="handleSubmit(onSubmit)">
              <div class="form-group">
                <validation-provider rules="required|email" v-slot="{ errors }">
                  <input
                    v-model="user.email"
                    type="text"
                    class="form-control"
                    name="email"
                    id="email"
                    placeholder="Ingresa tu email"
                  />
                  <span class="validation" v-if="errors[0]">{{
                    errors[0]
                  }}</span>
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
                  <span>Enviar Email</span>
                </button>
              </div>
            </form>
          </validation-observer>
          <div
            v-if="message"
            class="alert"
            :class="successful ? 'alert-success' : 'alert-danger'"
          >
            {{ message }}
          </div>
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
  name: "ForgotPassword",
  data() {
    return {
      user: new User({}),
      loading: false,
      submitted: false,
      successful: false,
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
      this.submitted = true;
      if (this.user.email) {
        this.$store.dispatch("auth/sendForgotPasswordEmail", this.user).then(
          data => {
            this.loading = false;
            this.successful = true;
            this.message = data.message;
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
      } else {
        this.loading = false;
        this.successful = false;
        this.message = "email must be valid.";
      }
    }
  }
};
</script>

<style scoped>
.img-forgot-password {
  height: 100vh;
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
  padding-top: 30px;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 30px;
}

@media (max-height: 271px) {
  .img-forgot-password {
    height: 100%;
  }
}

.forgot-password {
  width: 700px;
  background-color: #ffffff;
  border-radius: 3px;
  margin-top: 20px;
}

.panel-title {
  margin-top: -20px;
  height: 70px;
  background-color: #ff8c12f7;
  border-radius: 3px;
}

.send-email {
  color: #000000;
  font-size: 22px;
  font-weight: 700;
  padding-top: 10px;
  padding-bottom: 20px;
}

span .validation {
  color: #c30000bd;
  border: 1px solid #f4000038;
  border-radius: 5px;
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 2px;
  padding-bottom: 2px;
  font-size: 12px;
  font-weight: 700;
  background-color: #c3000012;
}
</style>
