<template>
  <div class="card card-container">
    <validation-observer ref="form" v-slot="{ handleSubmit }">
      <form name="form" @submit.prevent="handleSubmit(onSubmit)">
        <div>
          <div class="form-group">
            <label for="name">Nombre</label>
            <validation-provider rules="required" v-slot="{ errors }">
              <input
                v-model="company.name"
                minlength="2"
                maxlength="100"
                type="text"
                class="form-control"
                name="name"
                id="name"
              />
              <span class="validation">{{ errors[0] }}</span>
            </validation-provider>
          </div>
          <div class="form-group">
            <label for="code">Código</label>
            <validation-provider rules="required" v-slot="{ errors }">
              <input
                v-model="company.code"
                placeholder="example: 01BH"
                type="text"
                class="form-control"
                name="code"
                id="code"
              />
              <span class="validation">{{ errors[0] }}</span>
            </validation-provider>
          </div>
          <div class="form-group">
            <label for="document">Documento</label>
            <validation-provider rules="required" v-slot="{ errors }">
              <input
                v-model="company.document"
                type="text"
                class="form-control"
                name="document"
                id="document"
              />
              <span class="validation">{{ errors[0] }}</span>
            </validation-provider>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <validation-provider rules="required|email" v-slot="{ errors }">
              <input
                v-model="company.email"
                type="email"
                class="form-control"
                name="email"
                id="email"
              />
              <span class="validation">{{ errors[0] }}</span>
            </validation-provider>
          </div>
          <div class="form-group">
            <button class="btn btn-success btn-block" :disabled="loading">
              <span
                v-show="loading"
                class="spinner-border spinner-border-sm"
              ></span>
              Crear
            </button>
          </div>
          <div class="form-group">
            <button
              class="btn btn-secondary btn-block"
              :disabled="loading"
              v-on:click.prevent="cancelCreating"
            >
              <span
                v-show="loading"
                class="spinner-border spinner-border-sm"
              ></span>
              Cancelar
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
</template>

<script>
import Company from "../../models/company";
import companyService from "../../services/company.service";
import { ValidationProvider, ValidationObserver, extend } from "vee-validate";
import { required, email } from "vee-validate/dist/rules";
import { getFromObjectPathParsed } from "../../utils/functions";

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
  name: "CreateCompany",
  props: {
    bus: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      company: new Company({}),
      loading: false,
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
    if (!this.loggedIn) {
      this.$router.push("/login");
    }
  },
  methods: {
    onSubmit() {
      this.loading = true;

      companyService.createCompany(this.company).then(
        data => {
          this.successful = true;
          this.message = data.message;
          this.loading = false;

          this.company.name = "";
          this.company.code = "";
          this.company.document = "";
          this.company.email = "";

          // Wait until the models are updated in the UI
          this.$nextTick(() => {
            // console.log(this.$refs.form.$el);
            this.$refs.form.$el.blur();
            this.$refs.form.reset();
            this.bus.$emit("load-companies");
          });
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

          this.loading = false;
        }
      );
    },
    cancelCreating() {
      this.bus.$emit("cancel-creating");
    }
  }
};
</script>

<style scoped>
span .validation {
  color: red;
}

.card-container.card {
  padding: 1rem 1rem;
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
</style>
