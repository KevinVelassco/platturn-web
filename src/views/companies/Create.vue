<template>
  <div class="row">
    <div class="col-md-12">
      <validation-observer ref="form" v-slot="{ handleSubmit }">
        <form name="form" @submit.prevent="handleSubmit(onSubmitCreate)">
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
            <div v-if="message" class="alert alert-danger" role="alert">
              {{ message }}
            </div>
          </div>
          <div class="form-group">
            <button class="btn btn-success btn-block" :disabled="loading">
              <span
                v-show="loading"
                class="spinner-border spinner-border-sm"
              ></span>
              <span>Crear</span>
            </button>
          </div>
        </form>
      </validation-observer>
    </div>
  </div>
</template>
<script>
import Company from "../../models/company";
import companyService from "../../services/company.service";
import { ValidationProvider, ValidationObserver, extend } from "vee-validate";
import { required, email } from "vee-validate/dist/rules";
import { getFromObjectPathParsed } from "../../utils/functions";
import message from "../../utils/message";

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
  methods: {
    async onSubmitCreate() {
      this.loading = true;

      console.log("onSubmit");

      try {
        await companyService.createCompany(this.company);
        console.log("PRE onSubmit end-creating");
        this.bus.$emit("end-creating");
        console.log("onSubmit end-creating");
        setTimeout(() => {
          this.bus.$emit("load-companies");
        }, 2000);

        message.addMessageSuccess("Registro creado exitosamente.");

        this.successful = true;
        this.loading = false;
      } catch (error) {
        console.error("error", error);
        this.successful = false;
        this.loading = false;
        this.message = getFromObjectPathParsed(error, "response.data.message");
      }
    }
  },
  components: {
    ValidationProvider,
    ValidationObserver
  }
};
</script>
<style scoped></style>
