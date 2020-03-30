<template>
  <div class="register pt-3 pb-3">
    <div class="row justify-content-center">
      <div class="col-12 text-center" id="register-title">
        Registrate al plan
      </div>
      <div class="text-center" v-if="loadingPlan">
        <span class="spinner-border text-light"></span>
      </div>
      <div class="col-12 text-center pb-5" v-if="!loadingPlan">
        <span id="register-subtitle">{{
          messagePlan ? messagePlan : plan.code
        }}</span>
      </div>
    </div>
    <div
      class="row container-fluid justify-content-center"
      v-if="!messagePlan && !loadingPlan"
    >
      <div class="col-12 col-sm-9 col-md-6 col-lg-5 pb-5">
        <div class="col-12 panel-detail">
          <div class="col-12 text-center title-detail-plan pb-3">
            {{ plan.name }}
          </div>

          <div class="col-12 text-center font-weight-bold text-white pb-4">
            CO <span style="font-size: 30px;">30.000</span> /
            {{ plan.numberOfDays }} días
          </div>

          <div class="col-12">
            <div class="col-12 mb-2">
              <font-awesome-icon icon="check" class="icon-features-check" />
              <span class="ml-3 text-features">Consultar Clientes</span>
            </div>

            <div class="col-12 mb-2">
              <font-awesome-icon icon="check" class="icon-features-check" />
              <span class="ml-3 text-features">Crear Clientes</span>
            </div>

            <div class="col-12 mb-2">
              <font-awesome-icon icon="check" class="icon-features-check" />
              <span class="ml-3 text-features">Editar Clientes</span>
            </div>

            <div class="col-12 mb-2">
              <font-awesome-icon icon="times" class="icon-features-times" />
              <span class="ml-3 text-features">Elimiar Clientes</span>
            </div>

            <div class="col-12 mb-2">
              <font-awesome-icon icon="times" class="icon-features-times" />
              <span class="ml-3 text-features">Liquidar Nomina</span>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-9 col-md-6 col-lg-5 form-register">
        <validation-observer v-slot="{ handleSubmit }">
          <form name="form" @submit.prevent="handleSubmit(onSubmit)">
            <div v-if="!successful">
              <div class="form-group">
                <validation-provider rules="required" v-slot="{ errors }">
                  <input
                    v-model="user.fullName"
                    minlength="10"
                    maxlength="100"
                    type="text"
                    class="form-control"
                    name="fullName"
                    id="fullName"
                    placeholder="Nombre completo"
                  />
                  <span class="validation" v-if="errors[0]">{{
                    errors[0]
                  }}</span>
                </validation-provider>
              </div>
              <div class="form-group">
                <validation-provider rules="required" v-slot="{ errors }">
                  <input
                    v-model="user.document"
                    type="text"
                    class="form-control"
                    name="document"
                    id="document"
                    placeholder="Identificación"
                  />
                  <span class="validation" v-if="errors[0]">{{
                    errors[0]
                  }}</span>
                </validation-provider>
              </div>
              <div class="form-group">
                <validation-provider rules="required" v-slot="{ errors }">
                  <input
                    v-model="user.address"
                    type="text"
                    class="form-control"
                    name="address"
                    id="address"
                    placeholder="Dirección"
                  />
                  <span class="validation" v-if="errors[0]">{{
                    errors[0]
                  }}</span>
                </validation-provider>
              </div>
              <div class="form-group">
                <validation-provider rules="required" v-slot="{ errors }">
                  <input
                    v-model="user.phone"
                    type="number"
                    class="form-control"
                    name="phone"
                    id="phone"
                    placeholder="Teléfono"
                  />
                  <span class="validation" v-if="errors[0]">{{
                    errors[0]
                  }}</span>
                </validation-provider>
              </div>
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
                  <span class="validation" v-if="errors[0]">{{
                    errors[0]
                  }}</span>
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
                    placeholder="Clave"
                  />
                  <span class="validation" v-if="errors[0]">{{
                    errors[0]
                  }}</span>
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
                  <span class="validation" v-if="errors[0]">{{
                    errors[0]
                  }}</span>
                </validation-provider>
              </div>
              <div class="form-group">
                <button class="btn btn-secondary btn-block">
                  <span
                    v-show="loading"
                    class="spinner-border spinner-border-sm"
                  ></span>
                  <span>Registrarse</span>
                </button>
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
import planService from "../services/plan.service";

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
      message: "",
      messagePlan: "",
      plan: "",
      loadingPlan: true,
      loading: false
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
    this.loadPlans();
  },
  methods: {
    onSubmit() {
      this.loading = true;

      if (this.user.password !== this.user.repeatedPassword) {
        this.loading = false;
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
              this.loading = false;
              this.successful = true;
            },
            error => {
              this.loading = false;
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
          this.loading = false;
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
    loadPlans() {
      planService.getPlans().then(
        data => {
          const plans = data;
          const codePlan = this.$route.params.code;

          for (let plan of plans) {
            if (plan.code === codePlan) {
              this.plan = plan;
              break;
            }
          }

          this.plan
            ? (this.messagePlan = "")
            : (this.messagePlan =
                "El plan seleccionado no se encuentra disponible por el momento");

          this.loadingPlan = false;
        },
        error => {
          this.messagePlan = getFromObjectPathParsed(
            error,
            "response.data.message"
          );

          this.messagePlan =
            this.messagePlan ||
            (error.response && error.response.data) ||
            error.message ||
            error.toString();

          this.loadingPlan = false;
        }
      );
    }
  }
};
</script>

<style scoped>
.register {
  min-height: 100vh;
  background: linear-gradient(#7b4510f0, #7b4510f0),
    url("../assets/bg-masthead.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: scroll;
  background-size: cover;
}

#register-title {
  font-size: 40px;
  font-weight: 600;
  padding-bottom: 20px;
  color: #ffffff;
}

#register-subtitle {
  font-size: 30px;
  font-weight: 600;
  padding-bottom: 50px;
  background-color: #ff8f0085;
  color: #ffffff;
  padding-top: 2px;
  padding-bottom: 2px;
  padding-left: 8px;
  padding-right: 8px;
  border-radius: 8px;
}

.panel-detail {
  background-color: #ff8f000f;
  padding: 5px;
}

.title-detail-plan {
  color: #ffffff;
  font-weight: 600;
  font-size: 22px;
}

.icon-features-check {
  color: #03dc03;
}

.icon-features-times {
  color: #ff0000;
}

.text-features {
  color: #ffffff;
  font-weight: 600;
}

.form-register {
  background-color: white;
  border-radius: 2px;
  padding: 20px;
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
</style>
