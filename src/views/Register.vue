<template>
  <div class="row">
    <div class="col-md-4 offset-md-4">
      <div class="card card-container">
        <img
          id="profile-img"
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          class="profile-img-card"
        />

        <validation-observer v-slot="{ handleSubmit }">
          <form name="form" @submit.prevent="handleSubmit(onSubmit)">
            <div v-if="!successful">
              <div class="form-group">
                <label for="fullName">Nombre completo</label>
                <validation-provider rules="required" v-slot="{ errors }">
                  <input
                    v-model="user.fullName"
                    minlength="10"
                    maxlength="100"
                    type="text"
                    class="form-control"
                    name="fullName"
                    id="fullName"
                  />
                  <span class="validation">{{ errors[0] }}</span>
                </validation-provider>
              </div>
              <div class="form-group">
                <label for="document">Documento</label>
                <validation-provider rules="required" v-slot="{ errors }">
                  <input
                    v-model="user.document"
                    type="text"
                    class="form-control"
                    name="document"
                    id="document"
                  />
                  <span class="validation">{{ errors[0] }}</span>
                </validation-provider>
              </div>
              <div class="form-group">
                <label for="address">Dirección</label>
                <validation-provider rules="required" v-slot="{ errors }">
                  <input
                    v-model="user.address"
                    type="text"
                    class="form-control"
                    name="address"
                    id="address"
                  />
                  <span class="validation">{{ errors[0] }}</span>
                </validation-provider>
              </div>
              <div class="form-group">
                <label for="phone">Telefono</label>
                <validation-provider rules="required" v-slot="{ errors }">
                  <input
                    v-model="user.phone"
                    type="number"
                    class="form-control"
                    name="phone"
                    id="phone"
                  />
                  <span class="validation">{{ errors[0] }}</span>
                </validation-provider>
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <validation-provider rules="required|email" v-slot="{ errors }">
                  <input
                    v-model="user.email"
                    type="email"
                    class="form-control"
                    name="email"
                    id="email"
                  />
                  <span class="validation">{{ errors[0] }}</span>
                </validation-provider>
              </div>
              <div class="form-group">
                <label for="password">Clave</label>
                <validation-provider rules="required" v-slot="{ errors }">
                  <input
                    v-model="user.password"
                    minlength="5"
                    maxlength="100"
                    type="password"
                    class="form-control"
                    name="password"
                    id="password"
                  />
                  <span class="validation">{{ errors[0] }}</span>
                </validation-provider>
              </div>
              <div class="form-group">
                <label for="repeatedPassword">Confirmar clave</label>
                <validation-provider rules="required" v-slot="{ errors }">
                  <input
                    v-model="user.repeatedPassword"
                    minlength="5"
                    maxlength="100"
                    type="password"
                    class="form-control"
                    name="repeatedPassword"
                    id="repeatedPassword"
                  />
                  <span class="validation">{{ errors[0] }}</span>
                </validation-provider>
              </div>
              <div class="form-group">
                <button class="btn btn-primary btn-block">Registrarse</button>
              </div>
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
  name: "Register",
  data() {
    return {
      user: new User({}),
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
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    onSubmit() {
      if (this.user.password !== this.user.repeatedPassword) {
        this.successful = false;
        this.message = "las claves no coinciden.";
        return;
      }

      this.submitted = true;

      this.$store.dispatch("auth/register", this.user).then(
        registerDate => {
          this.user.authUid = registerDate.authUid;

          this.$store.dispatch("auth/sendConfirmationEmail", this.user).then(
            confirmationEmailData => {
              this.message = confirmationEmailData.message;
              this.successful = true;
            },
            error => {
              this.successful = false;

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
        },
        error => {
          this.successful = false;

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
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

span .validation {
  color: red;
}

.card-container.card {
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
</style>
